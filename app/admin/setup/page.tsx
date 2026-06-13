"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { db, auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, updateDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { Shield, CheckCircle, AlertCircle, Loader2, Mail, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const ADMIN_EMAIL = "passertech.ent@gmail.com";
const ADMIN_PASSWORD = "Passertech.ent@2026";

const AdminSetupPage = () => {
  const { profile, user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [statusType, setStatusType] = useState<"success" | "error" | "info">("info");
  const router = useRouter();

  useEffect(() => {
    if (profile) {
      if (profile.role === "admin" && user?.email === ADMIN_EMAIL) {
        setStatus("✅ Admin account is ready! Redirecting to dashboard...");
        setStatusType("success");
        setTimeout(() => router.push("/admin/dashboard"), 1500);
      } else if (profile.role === "admin") {
        setStatus(`✅ You are an admin, but this setup is for ${ADMIN_EMAIL}.`);
        setStatusType("info");
      } else {
        setStatus(`Current role: ${profile.role}. Click below to set up the admin account.`);
        setStatusType("info");
      }
    } else if (!user) {
      setStatus("Not signed in. Click below to create the admin account.");
      setStatusType("info");
    }
  }, [profile, user, router]);

  const setupAdminAccount = async () => {
    setIsProcessing(true);
    try {
      setStatus("🔧 Setting up admin account...");
      setStatusType("info");
      
      await auth.signOut();
      
      let userCredential;
      try {
        userCredential = await createUserWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
      } catch (e: any) {
        if (e.code === "auth/email-already-in-use") {
          setStatus("⚠️ Admin email exists, signing in instead...");
          userCredential = await signInWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
        } else {
          throw e;
        }
      }
      
      const adminUser = userCredential.user;
      
      const userRef = doc(db, "users", adminUser.uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        await updateDoc(userRef, {
          role: "admin",
          isApproved: true,
          updatedAt: serverTimestamp()
        });
      } else {
        await setDoc(userRef, {
          uid: adminUser.uid,
          email: ADMIN_EMAIL,
          displayName: "PasserTech Admin",
          position: "CTO & CEO",
          role: "admin",
          isApproved: true,
          createdAt: serverTimestamp()
        });
      }
      
      setStatus("✅ Admin account created and configured! Redirecting to dashboard...");
      setStatusType("success");
      setTimeout(() => router.push("/admin/dashboard"), 2000);
      
    } catch (error: any) {
      console.error(error);
      setStatus(`❌ Error: ${error.message}`);
      setStatusType("error");
    } finally {
      setIsProcessing(false);
    }
  };

  const promoteCurrentUser = async () => {
    if (!user?.uid) return;
    setIsProcessing(true);
    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        await updateDoc(userRef, {
          role: "admin",
          isApproved: true,
          updatedAt: serverTimestamp()
        });
      } else {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "Admin",
          role: "admin",
          isApproved: true,
          createdAt: serverTimestamp()
        });
      }
      
      setStatus("✅ Successfully promoted to Admin! Redirecting...");
      setStatusType("success");
      setTimeout(() => router.push("/admin/dashboard"), 2000);
      
    } catch (error: any) {
      console.error(error);
      setStatus(`❌ Error: ${error.message}`);
      setStatusType("error");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-foreground/60 hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        <div className="bg-slate-900 border border-white/10 rounded-3xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Admin Setup</h1>
            <p className="text-foreground/60 text-sm">Configure the official administrator account.</p>
          </div>

          <div className={`p-4 rounded-2xl mb-6 flex items-center gap-3 ${
            statusType === "success" ? "bg-primary/10 border border-primary/20 text-primary" :
            statusType === "error" ? "bg-red-500/10 border border-red-500/20 text-red-500" :
            "bg-white/5 border border-white/10 text-foreground/70"
          }`}>
            {statusType === "success" ? <CheckCircle className="w-5 h-5" /> :
             statusType === "error" ? <AlertCircle className="w-5 h-5" /> :
             <Shield className="w-5 h-5" />}
            {status}
          </div>

          <div className="space-y-4 mb-6 p-4 bg-white/5 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2 text-xs font-bold text-foreground/40 uppercase tracking-wider">
              <Mail className="w-4 h-4" />
              <span>Admin Email</span>
            </div>
            <p className="font-mono text-sm">{ADMIN_EMAIL}</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={setupAdminAccount}
              disabled={isProcessing}
              className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 text-background font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Setting up admin...
                </>
              ) : "Setup Official Admin Account"}
            </button>
            
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase font-bold text-foreground/30">
                <span className="bg-slate-900 px-2">or</span>
              </div>
            </div>

            {profile && profile.role !== "admin" && (
              <button
                onClick={promoteCurrentUser}
                disabled={isProcessing}
                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-50 text-foreground font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all"
              >
                Promote Current User ({user?.email?.substring(0, 20)}...)
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSetupPage;
