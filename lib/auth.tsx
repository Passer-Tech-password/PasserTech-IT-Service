"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { useRouter } from "next/navigation";

export type UserRole = "admin" | "staff" | "student";

interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: UserRole;
  isApproved: boolean;
  position?: string;
  phone?: string;
  idCardRequested?: boolean;
  idCardStatus?: "pending" | "approved" | "rejected";
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load cached profile from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const cachedProfile = localStorage.getItem("passertech_user_profile");
      if (cachedProfile) {
        try {
          setProfile(JSON.parse(cachedProfile));
        } catch (e) {
          console.error("Failed to parse cached profile:", e);
        }
      }
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          let userProfile: UserProfile;
          if (docSnap.exists()) {
            userProfile = docSnap.data() as UserProfile;
          } else {
            // Check if we have a cached profile first, otherwise default to student
            const cachedProfile = localStorage.getItem("passertech_user_profile");
            if (cachedProfile) {
              try {
                const parsed = JSON.parse(cachedProfile);
                if (parsed.uid === user.uid) {
                  userProfile = parsed;
                } else {
                  userProfile = {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    role: "student",
                    isApproved: true,
                  };
                }
              } catch {
                userProfile = {
                  uid: user.uid,
                  email: user.email,
                  displayName: user.displayName,
                  role: "student",
                  isApproved: true,
                };
              }
            } else {
              userProfile = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                role: "student",
                isApproved: true,
              };
            }
          }
          setProfile(userProfile);
          // Cache the profile in localStorage
          if (typeof window !== "undefined") {
            localStorage.setItem("passertech_user_profile", JSON.stringify(userProfile));
          }
        } catch (error) {
          console.log("Error fetching user profile, using cached profile if available:", error);
          // If Firestore fails, use cached profile or default
          const cachedProfile = localStorage.getItem("passertech_user_profile");
          let userProfile: UserProfile;
          if (cachedProfile) {
            try {
              const parsed = JSON.parse(cachedProfile);
              if (parsed.uid === user.uid) {
                userProfile = parsed;
              } else {
                userProfile = {
                  uid: user.uid,
                  email: user.email,
                  displayName: user.displayName,
                  role: "student",
                  isApproved: true,
                };
              }
            } catch {
              userProfile = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                role: "student",
                isApproved: true,
              };
            }
          } else {
            userProfile = {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              role: "student",
              isApproved: true,
            };
          }
          setProfile(userProfile);
        }
      } else {
        setProfile(null);
        // Clear cached profile on logout
        if (typeof window !== "undefined") {
          localStorage.removeItem("passertech_user_profile");
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await auth.signOut();
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const ProtectedRoute: React.FC<{ 
  children: React.ReactNode; 
  allowedRoles?: UserRole[];
}> = ({ children, allowedRoles }) => {
  const { profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!profile) {
        // Redirect to appropriate login based on allowed roles
        if (allowedRoles?.includes("admin")) {
          router.push("/admin/login");
        } else if (allowedRoles?.includes("staff")) {
          router.push("/staff/login");
        } else {
          router.push("/login");
        }
      } else if (allowedRoles && !allowedRoles.includes(profile.role)) {
        router.push("/");
      } else if (profile.role === "staff" && !profile.isApproved) {
        router.push("/staff/pending");
      }
    }
  }, [profile, loading, allowedRoles, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!profile || (allowedRoles && !allowedRoles.includes(profile.role))) {
    return null;
  }

  return <>{children}</>;
};
