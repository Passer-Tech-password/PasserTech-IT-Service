"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, CheckCircle, Home } from "lucide-react";
import Link from "next/link";

const StaffPending = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-african-pattern flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl p-12 text-center shadow-2xl"
      >
        <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
          <Clock className="w-10 h-10 text-accent" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Registration Received!</h1>
        <p className="text-foreground/60 text-lg leading-relaxed mb-10">
          Daalụ! Your staff account has been created. For security reasons, 
          an administrator must approve your role before you can access the staff dashboard.
        </p>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
            <CheckCircle className="w-6 h-6 text-primary shrink-0" />
            <p className="text-sm text-left font-medium">Account created successfully</p>
          </div>
          <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
            <Clock className="w-6 h-6 text-accent shrink-0" />
            <p className="text-sm text-left font-medium">Waiting for Admin approval</p>
          </div>
        </div>

        <Link
          href="/"
          className="mt-12 inline-flex items-center gap-2 bg-primary text-background font-bold px-8 py-4 rounded-2xl hover:bg-primary/90 transition-all active:scale-95"
        >
          <Home className="w-5 h-5" />
          Back to Homepage
        </Link>
      </motion.div>
    </div>
  );
};

export default StaffPending;
