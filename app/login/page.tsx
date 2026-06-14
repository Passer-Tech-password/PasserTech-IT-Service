"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn, Loader2, Chrome, GraduationCap } from "lucide-react";
import Link from "next/link";

const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/academy");
    } catch (err: any) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/academy");
    } catch (err: any) {
      setError(err.message || "Google login failed.");
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-african-pattern flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Student Login</h1>
          <p className="text-foreground/60">Continue your learning journey</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl mb-8 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/70 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
              <input
                required
                type="email"
                placeholder="student@email.com"
                className="w-full bg-background border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-green-500 transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between ml-1">
              <label className="text-sm font-medium text-foreground/70">Password</label>
              <Link href="#" className="text-xs text-primary hover:underline">Forgot Password?</Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
              <input
                required
                type="password"
                placeholder="••••••••"
                className="w-full bg-background border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-green-500 transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all disabled:opacity-50 text-lg"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Student Log In"}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-slate-900 px-4 text-foreground/40">Or continue with</span></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-foreground font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95"
        >
          <Chrome className="w-5 h-5" />
          Google
        </button>

        <p className="text-center mt-8 text-foreground/50 text-sm">
          New here?{" "}
          <Link href="/academy" className="text-primary font-bold hover:underline">
            Join the Academy
          </Link>
        </p>

        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-center text-foreground/50 text-sm mb-4">Looking for other login options?</p>
          <div className="flex gap-4 justify-center">
            <Link href="/staff/login" className="text-sm text-blue-500 hover:text-blue-400 font-medium">
              Staff Login
            </Link>
            <span className="text-foreground/30">•</span>
            <Link href="/admin/login" className="text-sm text-red-500 hover:text-red-400 font-medium">
              Admin Login
            </Link>
          </div>
        </div>

        <p className="text-center mt-8 text-foreground/50 text-sm">
          <Link href="/" className="text-foreground/40 hover:text-foreground/60">
            ← Back to Home
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default StudentLogin;
