"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "./firebase";
import { useRouter } from "next/navigation";

export type UserRole = 
  | "admin" 
  | "instructor" 
  | "course_manager" 
  | "content_creator" 
  | "staff"  // For backwards compatibility
  | "student";

interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  fullName?: string;
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

  useEffect(() => {
    let unsubscribeUser: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      console.log("[Auth] Auth state changed:", user?.uid);
      setUser(user);
      
      // Unsubscribe from previous user's profile listener if any
      if (unsubscribeUser) {
        unsubscribeUser();
        unsubscribeUser = null;
      }

      if (user) {
        console.log("[Auth] Fetching profile for user:", user.uid);
        const docRef = doc(db, "users", user.uid);
        unsubscribeUser = onSnapshot(docRef, (docSnap) => {
          let userProfile: UserProfile;
          if (docSnap.exists()) {
            userProfile = docSnap.data() as UserProfile;
            console.log("[Auth] Got profile from Firestore:", userProfile);
          } else {
            // Default to student profile if not found in Firestore
            userProfile = {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              role: "student",
              isApproved: true,
            };
            console.log("[Auth] No profile found, using default:", userProfile);
          }
          setProfile(userProfile);
          setLoading(false);
        }, (error) => {
          console.error("[Auth] Error listening to user profile:", error);
          // Default to student profile if Firestore fails
          setProfile({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            role: "student",
            isApproved: true,
          });
          setLoading(false);
        });
      } else {
        console.log("[Auth] User logged out");
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeUser) {
        unsubscribeUser();
      }
    };
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

  // Helper to check if a role is a staff-like role
  const isStaffRole = (role: UserRole) => {
    return ["instructor", "course_manager", "content_creator", "staff"].includes(role);
  };

  useEffect(() => {
    if (!loading) {
      if (!profile) {
        // Redirect to appropriate login based on allowed roles
        if (allowedRoles?.includes("admin")) {
          router.push("/admin/login");
        } else if (allowedRoles?.some(role => isStaffRole(role))) {
          router.push("/staff/login");
        } else {
          router.push("/login");
        }
      } else if (allowedRoles && !allowedRoles.includes(profile.role)) {
        router.push("/");
      } else if (isStaffRole(profile.role) && !profile.isApproved) {
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
