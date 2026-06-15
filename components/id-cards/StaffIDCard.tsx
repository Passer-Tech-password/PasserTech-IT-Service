"use client";

import React from "react";
import { motion } from "framer-motion";
import { IDCard } from "./IDCard";
import { 
  ShieldCheck, 
  User, 
  Mail, 
  Calendar, 
  QrCode,
  Fingerprint
} from "lucide-react";

interface StaffIDCardProps {
  data: {
    fullName: string;
    position: string;
    department?: string;
    employeeId: string;
    email: string;
    issueDate: string;
    expiryDate: string;
    avatar?: string;
  };
}

export const StaffIDCard = ({ data }: StaffIDCardProps) => {
  return (
    <IDCard>
      {/* Background Glow Effects */}
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-green-500/20 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-green-500/10 blur-3xl" />
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-[linear-gradient(rgba(0,230,118,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,230,118,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 flex items-center justify-center">
              <img src="/logo.png" alt="PasserTech" className="w-10 h-10 rounded-xl" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight">
                Passer<span className="text-green-400">Tech</span>
              </h2>
              <p className="text-xs font-semibold text-green-400/80 uppercase tracking-widest">
                Official Staff Identification
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <ShieldCheck className="w-8 h-8 text-green-400" />
            <span className="text-[10px] font-bold text-green-400/80 uppercase tracking-widest">
              VERIFIED
            </span>
          </div>
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-5 mb-6">
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border-4 border-green-500/40 shadow-lg shadow-green-500/20 flex items-center justify-center overflow-hidden">
              {data.avatar ? (
                <img src={data.avatar} alt={data.fullName} className="w-full h-full object-cover" />
              ) : (
                <User className="w-14 h-14 text-slate-400" />
              )}
            </div>
            <div className="absolute -bottom-1 -right-1">
              <div className="w-8 h-8 rounded-full bg-green-500 border-4 border-slate-950 flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-black text-white mb-1 leading-tight">
              {data.fullName.toUpperCase()}
            </h3>
            <p className="text-sm font-semibold text-green-400/90 uppercase tracking-wider">
              {data.position}
            </p>
            {data.department && (
              <p className="text-xs font-medium text-slate-400 mt-1">
                {data.department}
              </p>
            )}
          </div>
        </div>

        {/* Info Grid */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5 mb-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                <Fingerprint className="w-5 h-5 text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Employee ID
                </p>
                <p className="text-sm font-semibold text-white font-mono">
                  {data.employeeId}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Email Address
                </p>
                <p className="text-sm font-medium text-white truncate">
                  {data.email}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-700/50">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-green-400" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Issued
                  </p>
                  <p className="text-xs font-medium text-white">
                    {data.issueDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-green-400" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Expires
                  </p>
                  <p className="text-xs font-medium text-white">
                    {data.expiryDate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* QR and Security Footer */}
        <div className="flex items-end justify-between gap-4">
          <div className="p-3 bg-white rounded-xl border-2 border-green-500/30">
            <QrCode className="w-24 h-24 text-black" />
          </div>
          <div className="flex-1 text-right">
            <div className="text-xs font-semibold text-slate-400 mb-2">
              Digital Signature
            </div>
            <div className="h-12 bg-gradient-to-r from-transparent via-green-500/20 to-transparent rounded-lg flex items-center justify-center">
              <p className="text-[10px] font-mono text-green-400/70">
                ********** VERIFIED **********
              </p>
            </div>
          </div>
        </div>

        {/* Security Strip */}
        <div className="
          absolute bottom-0 left-0 right-0 h-12
          bg-gradient-to-r from-green-500 via-green-400 to-green-500
          flex items-center justify-center overflow-hidden
        ">
          <div className="absolute inset-0 opacity-30">
            <div className="w-full h-full bg-[repeating-linear-gradient(-45deg,transparent,transparent_10px,rgba(0,0,0,0.1)_10px,rgba(0,0,0,0.1)_20px)]"></div>
          </div>
          <div className="relative flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-slate-950" />
            <span className="text-xs font-black text-slate-950 uppercase tracking-[0.3em]">
              Official Staff Badge • Official Staff Badge • 
            </span>
          </div>
        </div>
      </div>
    </IDCard>
  );
};
