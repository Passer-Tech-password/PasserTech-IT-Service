"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp, collection, getDocs } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { UserPlus, Mail, Lock, Phone, User, Briefcase, Loader2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";

// Predefined job positions for PasserTech
const JOB_POSITIONS = [
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Mobile App Developer",
  "Full Stack Developer",
  "UI/UX Designer",
  "Product Designer",
  "Graphic Designer",
  "Tutor / Instructor",
  "Senior Tutor",
  "Academic Coordinator",
  "IT Support Specialist",
  "DevOps Engineer",
  "Cloud Engineer",
  "Data Scientist",
  "Product Manager",
  "Marketing Manager",
  "Social Media Manager",
  "Content Creator",
  "Customer Support Representative",
  "Operations Manager",
  "Finance Officer",
  "Human Resources (HR)",
  "Chief Technology Officer (CTO)",
  "Chief Executive Officer (CEO)",
  "Other (Please specify below)",
];

const StaffRegister = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    customPosition: "",
    role: "staff",
    password: "",
  });
  const [availablePositions, setAvailablePositions] = useState<string[]>(JOB_POSITIONS);
  const [loading, setLoading] = useState(false);
  const [fetchingPositions, setFetchingPositions] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const { profile, loading: authLoadingState } = useAuth();

  // Helper to check if a role is a staff-like role
  const isStaffRole = (role: any) => {
    return ["instructor", "course_manager", "content_creator", "staff"].includes(role);
  };

  // Check if already logged in and redirect
  useEffect(() => {
    if (!authLoadingState) {
      if (isStaffRole(profile?.role) && profile?.isApproved) {
        router.replace("/staff/dashboard");
      } else if (profile?.role === "admin") {
        router.replace("/admin/dashboard");
      } else if (profile && isStaffRole(profile?.role) && !profile?.isApproved) {
        router.replace("/staff/pending");
      }
      setAuthLoading(false);
    }
  }, [profile, authLoadingState, router]);

  // Fetch existing positions to filter out taken ones
  useEffect(() => {
    const fetchTakenPositions = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        const takenPositions: string[] = [];
        
        usersSnapshot.forEach((doc) => {
          const userData = doc.data();
          if (userData.position) {
            takenPositions.push(userData.position);
          }
        });

        // Filter out taken positions from predefined list
        const filtered = JOB_POSITIONS.filter(pos => !takenPositions.includes(pos));
        setAvailablePositions(filtered);
      } catch (err) {
        console.error("Error fetching positions:", err);
        // If error, show all positions
        setAvailablePositions(JOB_POSITIONS);
      } finally {
        setFetchingPositions(false);
      }
    };

    fetchTakenPositions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Determine the actual position to save
      const finalPosition = formData.position === "Other (Please specify below)" 
        ? formData.customPosition 
        : formData.position;

      if (!finalPosition) {
        setError("Please select or enter a job position");
        setLoading(false);
        return;
      }

      // 1. Create Auth User
      const { user } = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      // 2. Update Profile
      await updateProfile(user, { displayName: formData.fullName });

      // 3. Create Firestore User Profile
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        position: finalPosition,
        role: "staff",
        isApproved: false, // Must be approved by an existing admin
        createdAt: serverTimestamp(),
      });

      router.push("/staff/pending");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || fetchingPositions) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-slate-950 text-white flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
          <p className="text-foreground/70 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-slate-950 text-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-slate-900 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <UserPlus className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Staff Onboarding</h1>
          <p className="text-foreground/60">Join the PasserTech team and help build the future.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl mb-8 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/70 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <input
                  required
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-background border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary transition-colors"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/70 ml-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <input
                  required
                  type="tel"
                  placeholder="+234..."
                  className="w-full bg-background border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary transition-colors"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/70 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
              <input
                required
                type="email"
                placeholder="john@passertech.com"
                className="w-full bg-background border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary transition-colors"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/70 ml-1">Job Position / Role</label>
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <select
                  required
                  className="w-full bg-background border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary transition-colors appearance-none"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                >
                  <option value="">Select your role</option>
                  {availablePositions.map((pos, idx) => (
                    <option key={idx} value={pos}>{pos}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Custom position field only shown if "Other" is selected */}
            {formData.position === "Other (Please specify below)" && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/70 ml-1">Enter Your Role</label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                  <input
                    required
                    type="text"
                    placeholder="e.g. Video Editor, QA Tester"
                    className="w-full bg-background border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary transition-colors"
                    value={formData.customPosition}
                    onChange={(e) => setFormData({ ...formData, customPosition: e.target.value })}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/70 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
              <input
                required
                type="password"
                placeholder="••••••••"
                className="w-full bg-background border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary transition-colors"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-background font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all disabled:opacity-50 text-lg shadow-lg shadow-primary/20 mt-4"
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Complete Registration"
            )}
          </button>
        </form>

        <p className="text-center mt-8 text-foreground/50 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-bold hover:underline">
            Log In
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default StaffRegister;
