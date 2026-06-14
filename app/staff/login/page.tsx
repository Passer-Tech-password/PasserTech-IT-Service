"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn, Loader2, UserCheck } from "lucide-react";
import Link from "next/link";

const StaffLogin = () => {
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
      router.push("/staff/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
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
          <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <UserCheck className="w-8 h-8 text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Staff Login</h1>
          <p className="text-foreground/60">Welcome back, PasserTech staff!</p>
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
                placeholder="staff@passertech.com"
                className="w-full bg-background border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-500 transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/70 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
              <input
                required
                type="password"
                placeholder="••••••••"
                className="w-full bg-background border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-500 transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all disabled:opacity-50 text-lg"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Staff Log In"}
          </button>
        </form>

        <p className="text-center mt-8 text-foreground/50 text-sm">
          Not a staff member yet?{" "}
          <Link href="/staff/register" className="text-primary font-bold hover:underline">
            Join the Team
          </Link>
        </p>

        <p className="text-center mt-4 text-foreground/50 text-sm">
          <Link href="/" className="text-foreground/40 hover:text-foreground/60">
            ← Back to Home
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default StaffLogin;
