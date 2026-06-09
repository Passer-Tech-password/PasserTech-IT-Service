"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  UserX, 
  CheckCircle, 
  XCircle, 
  Loader2,
  Search,
  Mail,
  Phone,
  Briefcase
} from "lucide-react";
import { 
  collection, 
  query, 
  onSnapshot, 
  doc, 
  updateDoc, 
  deleteDoc, 
  orderBy 
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import AdminCreator from "./AdminCreator";

const UserManagement = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "staff" | "admin">("all");

  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleApprove = async (userId: string) => {
    try {
      await updateDoc(doc(db, "users", userId), {
        isApproved: true
      });
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };

  const handleApproveID = async (userId: string) => {
    try {
      await updateDoc(doc(db, "users", userId), {
        idCardStatus: "approved"
      });
      alert("ID Card request approved!");
    } catch (error) {
      console.error("Error approving ID card:", error);
    }
  };

  const handleToggleRole = async (userId: string, currentRole: string) => {
    const newRole = currentRole === "admin" ? "staff" : "admin";
    if (!window.confirm(`Are you sure you want to change this user to ${newRole}?`)) return;
    try {
      await updateDoc(doc(db, "users", userId), {
        role: newRole
      });
    } catch (error) {
      console.error("Error toggling role:", error);
    }
  };

  const handleDelete = async (userId: string) => {
    if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
    try {
      await deleteDoc(doc(db, "users", userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === "pending") return matchesSearch && !user.isApproved && user.role !== "student";
    if (filter === "staff") return matchesSearch && user.role === "staff";
    if (filter === "admin") return matchesSearch && user.role === "admin";
    return matchesSearch;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-foreground/40 text-sm">Approve staff, manage roles, and oversee the community.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <input 
              type="text" 
              placeholder="Search users..." 
              className="bg-background border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-primary transition-all w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="bg-background border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all appearance-none"
            value={filter}
            onChange={(e: any) => setFilter(e.target.value)}
          >
            <option value="all">All Users</option>
            <option value="pending">Pending Approval</option>
            <option value="staff">Staff Only</option>
            <option value="admin">Admins Only</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
          ) : (
            <div className="bg-slate-900 border border-white/5 rounded-3xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/[0.02]">
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-foreground/40">User</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-foreground/40">Role</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-foreground/40">Status</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-foreground/40 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-white/[0.01] transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                              {user.fullName?.charAt(0) || user.email?.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-sm">{user.fullName || "Unnamed User"}</p>
                              <p className="text-xs text-foreground/40">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {user.role === "admin" ? (
                              <ShieldCheck className="w-4 h-4 text-primary" />
                            ) : user.role === "staff" ? (
                              <Briefcase className="w-4 h-4 text-accent" />
                            ) : (
                              <Users className="w-4 h-4 text-blue-500" />
                            )}
                            <div className="flex flex-col">
                              <span className="text-xs font-bold capitalize">{user.role}</span>
                              {user.position && <span className="text-[10px] text-foreground/40">{user.position}</span>}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            {user.role !== "student" && (
                              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest inline-block text-center ${
                                user.isApproved ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
                              }`}>
                                {user.isApproved ? "Approved" : "Pending"}
                              </span>
                            )}
                            {user.idCardRequested && (
                              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest inline-block text-center ${
                                user.idCardStatus === "approved" ? "bg-blue-500/10 text-blue-500" : "bg-orange-500/10 text-orange-500"
                              }`}>
                                ID: {user.idCardStatus || "pending"}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            {!user.isApproved && user.role !== "student" && (
                              <button 
                                onClick={() => handleApprove(user.id)}
                                className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-background transition-all"
                                title="Approve Staff"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                            )}
                            {user.idCardRequested && user.idCardStatus !== "approved" && (
                              <button 
                                onClick={() => handleApproveID(user.id)}
                                className="p-2 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-all"
                                title="Approve ID Card"
                              >
                                <Contact2 className="w-4 h-4" />
                              </button>
                            )}
                            <button 
                              onClick={() => handleToggleRole(user.id, user.role)}
                              className="p-2 rounded-lg bg-white/5 text-foreground/40 hover:text-foreground transition-all"
                              title="Change Role"
                            >
                              <Shield className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDelete(user.id)}
                              className="p-2 rounded-lg bg-white/5 text-foreground/40 hover:text-red-500 transition-all"
                              title="Delete User"
                            >
                              <UserX className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-8">
          <AdminCreator />
          
          <div className="bg-slate-900 border border-white/5 rounded-3xl p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-accent" />
              Security Overview
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-xs text-foreground/40 mb-1">Pending Approvals</p>
                <p className="text-2xl font-bold">{users.filter(u => !u.isApproved && u.role !== "student").length}</p>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-xs text-foreground/40 mb-1">Total Staff Members</p>
                <p className="text-2xl font-bold">{users.filter(u => u.role === "staff").length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
