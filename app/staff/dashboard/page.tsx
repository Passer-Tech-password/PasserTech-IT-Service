"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ProtectedRoute } from "@/lib/auth";
import { 
  Users, 
  BookOpen, 
  Calendar, 
  Upload, 
  Search, 
  ChevronRight, 
  Play, 
  Clock,
  MoreVertical,
  CheckCircle2
} from "lucide-react";

const StaffDashboard = () => {
  const [activeTab, setActiveTab] = useState("classes");

  const myClasses = [
    { title: "HTML & CSS in Igbo", students: 42, nextLesson: "Today, 4:00 PM", progress: 65 },
    { title: "Python for Beginners", students: 28, nextLesson: "Tomorrow, 10:00 AM", progress: 30 },
  ];

  const students = [
    { name: "Chinedu Okeke", course: "HTML & CSS", status: "Active", attendance: "95%" },
    { name: "Adaobi Nwosu", course: "Python", status: "Active", attendance: "88%" },
    { name: "Emeka Uzor", course: "HTML & CSS", status: "Inactive", attendance: "45%" },
  ];

  return (
    <ProtectedRoute allowedRoles={["staff", "admin"]}>
      <div className="min-h-screen pt-24 bg-african-pattern flex flex-col lg:flex-row">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-72 p-6 border-r border-white/5 space-y-2 shrink-0">
          <button
            onClick={() => setActiveTab("classes")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              activeTab === "classes" ? "bg-primary text-background shadow-lg" : "text-foreground/60 hover:bg-white/5"
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span>My Classes</span>
          </button>
          <button
            onClick={() => setActiveTab("students")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              activeTab === "students" ? "bg-primary text-background shadow-lg" : "text-foreground/60 hover:bg-white/5"
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Students</span>
          </button>
          <button
            onClick={() => setActiveTab("schedule")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              activeTab === "schedule" ? "bg-primary text-background shadow-lg" : "text-foreground/60 hover:bg-white/5"
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span>Schedule</span>
          </button>
        </aside>

        {/* Mobile Tabs */}
        <div className="lg:hidden flex border-b border-white/5 p-2 gap-2 overflow-x-auto">
          {["classes", "students", "schedule"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest ${
                activeTab === tab ? "bg-primary text-background" : "bg-white/5 text-foreground/40"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <main className="flex-grow p-4 md:p-8 lg:p-12 overflow-y-auto">
          {activeTab === "classes" && (
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h1 className="text-3xl font-extrabold mb-2">Instructor Dashboard</h1>
                  <p className="text-foreground/60">Manage your courses and interact with your students.</p>
                </div>
                <button className="flex items-center justify-center gap-2 bg-accent text-background px-6 py-3 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-accent/20">
                  <Upload className="w-5 h-5" />
                  Quick Upload
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {myClasses.map((cls, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-8 rounded-3xl bg-slate-900 border border-white/5 group hover:border-primary/20 transition-all"
                  >
                    <div className="flex items-start justify-between mb-8">
                      <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                        <Play className="w-6 h-6 text-primary fill-primary" />
                      </div>
                      <button className="p-2 rounded-full hover:bg-white/5 transition-colors">
                        <MoreVertical className="w-5 h-5 text-foreground/40" />
                      </button>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{cls.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-foreground/40 mb-8">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4" />
                        {cls.students} Students
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {cls.nextLesson}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                        <span className="text-foreground/40">Course Progress</span>
                        <span className="text-primary">{cls.progress}%</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${cls.progress}%` }}
                          className="h-full bg-primary"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "students" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Student List</h2>
                <div className="relative hidden sm:block">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                  <input 
                    type="text" 
                    placeholder="Search students..." 
                    className="bg-white/5 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>
              </div>

              <div className="bg-slate-900 border border-white/5 rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="px-8 py-6 text-xs font-bold uppercase tracking-wider text-foreground/40">Name</th>
                        <th className="px-8 py-6 text-xs font-bold uppercase tracking-wider text-foreground/40">Course</th>
                        <th className="px-8 py-6 text-xs font-bold uppercase tracking-wider text-foreground/40">Status</th>
                        <th className="px-8 py-6 text-xs font-bold uppercase tracking-wider text-foreground/40">Attendance</th>
                        <th className="px-8 py-6"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {students.map((student, i) => (
                        <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold uppercase">
                                {student.name.charAt(0)}
                              </div>
                              <span className="font-bold text-sm">{student.name}</span>
                            </div>
                          </td>
                          <td className="px-8 py-6 text-sm text-foreground/60">{student.course}</td>
                          <td className="px-8 py-6">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                              student.status === "Active" ? "bg-primary/10 text-primary" : "bg-red-500/10 text-red-500"
                            }`}>
                              {student.status}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-sm font-medium">{student.attendance}</td>
                          <td className="px-8 py-6 text-right">
                            <button className="p-2 rounded-lg hover:bg-white/5 transition-colors text-foreground/20 hover:text-foreground">
                              <ChevronRight className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default StaffDashboard;
