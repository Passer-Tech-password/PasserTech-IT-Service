"use client";

import React from "react";
import { motion } from "framer-motion";
import { IDCard } from "./IDCard";
import { 
  ShieldCheck, 
  User, 
  Calendar, 
  QrCode,
  Fingerprint,
  Lock,
  Key,
  Crown
} from "lucide-react";

interface ExecutiveIDCardProps {
  data: {
    fullName: string;
    title: string;
    accessLevel: string;
    executiveId: string;
    issueDate: string;
    expiryDate: string;
    avatar?: string;
  };
}

export const ExecutiveIDCard = ({ data }: ExecutiveIDCardProps) => {
  return (
    <IDCard className="
      bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900
      border-2 border-purple-500/30
    ">
      {/* Background Glow Effects */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-green-500/15 blur-3xl" />
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-15">
        <div className="w-full h-full bg-[linear-gradient(rgba(124,58,237,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,230,118,0.1)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <img src="/logo.png" alt="PasserTech" className="w-12 h-12 rounded-xl" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                Passer<span className="text-green-400">Tech</span>
              </h2>
              <p className="text-xs font-semibold text-purple-400/90 uppercase tracking-[0.3em]">
                Executive Identification
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30">
              <Crown className="w-7 h-7 text-purple-400" />
            </div>
            <span className="text-[10px] font-black text-purple-400/90 uppercase tracking-[0.3em]">
              EXECUTIVE
            </span>
          </div>
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-6 mb-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border-4 border-purple-500/50 shadow-xl shadow-purple-500/30 flex items-center justify-center overflow-hidden">
              {data.avatar ? (
                <img src={data.avatar} alt={data.fullName} className="w-full h-full object-cover" />
              ) : (
                <User className="w-16 h-16 text-slate-400" />
              )}
            </div>
            <div className="absolute -bottom-1 -right-1">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 border-4 border-slate-950 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-3xl font-black text-white mb-2 leading-tight">
              {data.fullName.toUpperCase()}
            </h3>
            <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-purple-600/10 border border-purple-500/30">
              <p className="text-sm font-bold text-purple-400 uppercase tracking-wider">
                {data.title}
              </p>
            </div>
          </div>
        </div>

        {/* Access Panel */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-500/10 via-purple-500/5 to-green-500/10 border border-purple-500/30 rounded-2xl p-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-2">
                  Status
                </p>
                <p className="text-xl font-black text-purple-400">
                  FULL ACCESS
                </p>
              </div>
              <div className="text-center border-x border-purple-500/20 px-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-2">
                  Level
                </p>
                <p className="text-xl font-black text-green-400">
                  LEVEL 0
                </p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-2">
                  Role
                </p>
                <p className="text-xl font-black text-white">
                  SUPER ADMIN
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 gap-5">
            <div className="flex items-center gap-5">
              <div className="w-11 h-11 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                <Fingerprint className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Executive ID
                </p>
                <p className="text-base font-semibold text-white font-mono">
                  {data.executiveId}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5 pt-4 border-t border-slate-700/50">
              <div className="flex items-center gap-4">
                <Calendar className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Issue Date
                  </p>
                  <p className="text-xs font-medium text-white">
                    {data.issueDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Calendar className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Expiry
                  </p>
                  <p className="text-xs font-medium text-white">
                    {data.expiryDate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Features */}
        <div className="flex items-end justify-between gap-6">
          <div className="flex gap-4 items-center">
            <div className="p-4 bg-white rounded-2xl border-3 border-purple-500/40 shadow-lg shadow-purple-500/20">
              <QrCode className="w-28 h-28 text-black" />
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-2">
                Digital Signature
              </p>
              <div className="h-14 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent rounded-xl flex items-center justify-center">
                <p className="text-[10px] font-mono text-purple-400/70">
                  ********** BLOCKCHAIN VERIFIED **********
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30">
                <Lock className="w-5 h-5 text-purple-400" />
              </div>
              <div className="p-2 rounded-xl bg-green-500/10 border border-green-500/30">
                <Key className="w-5 h-5 text-green-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Security Strip */}
        <div className="
          absolute bottom-0 left-0 right-0 h-14
          bg-gradient-to-r from-purple-500 via-purple-400 to-green-400
          flex items-center justify-center overflow-hidden
        ">
          <div className="absolute inset-0 opacity-30">
            <div className="w-full h-full bg-[repeating-linear-gradient(-45deg,transparent,transparent_12px,rgba(0,0,0,0.15)_12px,rgba(0,0,0,0.15)_24px)]"></div>
          </div>
          <div className="relative flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-slate-950" />
            <span className="text-xs font-black text-slate-950 uppercase tracking-[0.4em]">
              EXECUTIVE • OFFICIAL • EXECUTIVE • OFFICIAL • 
            </span>
          </div>
        </div>
      </div>
    </IDCard>
  );
};
