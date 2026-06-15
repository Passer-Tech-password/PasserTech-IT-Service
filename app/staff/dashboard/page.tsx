"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ProtectedRoute, useAuth } from "@/lib/auth";
import { auth } from "@/lib/firebase";
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
  CheckCircle2,
  Contact2,
  Printer,
  Download,
  Loader2,
  LogOut,
  Menu,
  X,
  User,
  Settings,
  FileText,
  Bell,
  TrendingUp,
  GraduationCap,
  CalendarCheck
} from "lucide-react";
import { db } from "@/lib/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { StaffIDCard } from "@/components/id-cards";

const StaffDashboard = () => {
  const [activeTab, setActiveTab] = useState("classes");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({
    fullName: "",
    phone: "",
    position: ""
  });
  const [loadingProfile, setLoadingProfile] = useState(false);
  const { profile } = useAuth();
  const router = useRouter();
  const [requestingID, setRequestingID] = useState(false);

  // Prevent body scrolling when mobile sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  // Load profile data
  useEffect(() => {
    if (profile?.uid) {
      setProfileForm({
        fullName: profile.fullName || "",
        phone: profile.phone || "",
        position: profile.position || ""
      });
    }
  }, [profile]);

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/");
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile?.uid) return;
    setLoadingProfile(true);
    try {
      await updateDoc(doc(db, "users", profile.uid), {
        ...profileForm
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleRequestID = async () => {
    if (!profile) return;
    setRequestingID(true);
    try {
      const userRef = doc(db, "users", profile.uid);
      await updateDoc(userRef, {
        idCardRequested: true,
        idCardStatus: "pending"
      });
      alert("ID Card request submitted successfully!");
    } catch (error) {
      console.error("Error requesting ID card:", error);
      alert("Failed to request ID card.");
    } finally {
      setRequestingID(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const myClasses = [
    { id: 1, title: "HTML & CSS in Igbo", students: 42, nextLesson: "Today, 4:00 PM", progress: 65, language: "Igbo" },
    { id: 2, title: "Python for Beginners", students: 28, nextLesson: "Tomorrow, 10:00 AM", progress: 30, language: "English" },
    { id: 3, title: "JavaScript Fundamentals", students: 35, nextLesson: "Wednesday, 2:00 PM", progress: 50, language: "Pidgin" },
  ];

  const students = [
    { id: 1, name: "Chinedu Okeke", course: "HTML & CSS", status: "Active", attendance: "95%" },
    { id: 2, name: "Adaobi Nwosu", course: "Python", status: "Active", attendance: "88%" },
    { id: 3, name: "Emeka Uzor", course: "HTML & CSS", status: "Inactive", attendance: "45%" },
    { id: 4, name: "Fatima Abdullahi", course: "JavaScript", status: "Active", attendance: "92%" },
  ];

  const upcomingLessons = [
    { id: 1, time: "Today, 4:00 PM", course: "HTML & CSS in Igbo", topic: "Advanced Flexbox", type: "Live" },
    { id: 2, time: "Tomorrow, 10:00 AM", course: "Python for Beginners", topic: "Loops & Conditionals", type: "Tutorial" },
    { id: 3, time: "Wednesday, 2:00 PM", course: "JavaScript Fundamentals", topic: "DOM Manipulation", type: "Workshop" },
  ];

  const attendanceRecords = [
    { id: 1, date: "June 13, 2026", course: "HTML & CSS", present: 38, absent: 4 },
    { id: 2, date: "June 11, 2026", course: "Python", present: 25, absent: 3 },
    { id: 3, date: "June 9, 2026", course: "JavaScript", present: 32, absent: 3 },
  ];

  const menuItems = [
    { id: "classes", icon: BookOpen, label: "My Classes" },
    { id: "students", icon: Users, label: "Students" },
    { id: "schedule", icon: Calendar, label: "Schedule" },
    { id: "attendance", icon: CalendarCheck, label: "Attendance" },
    { id: "profile", icon: User, label: "My Profile" },
    { id: "idcard", icon: Contact2, label: "ID Card" },
  ];

  return (
    <ProtectedRoute allowedRoles={["staff", "admin"]}>
      <div className="min-h-screen bg-slate-950 text-white flex">
        {/* Mobile Menu Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-72 bg-slate-900 border-r border-white/10
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          flex flex-col overflow-y-auto
        `}>
          <div className="p-6 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 overflow-hidden rounded-xl">
                <img 
                  src="/logo.png" 
                  alt="PasserTech"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="font-bold text-lg">Passer<span className="text-primary">Tech</span></h1>
                <p className="text-xs text-foreground/40">Staff Panel</p>
              </div>
            </div>
          </div>

          <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  activeTab === item.id ? "bg-primary text-background shadow-lg shadow-primary/20" : "text-foreground/60 hover:bg-white/5 hover:text-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-white/10 shrink-0">
            <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-white/5">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                {(profile?.displayName?.charAt(0) || "S").toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{profile?.displayName || "Staff Member"}</p>
                <p className="text-xs text-foreground/40 truncate">{profile?.position || "Staff"}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Log Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Header Bar */}
          <header className="flex items-center justify-between p-4 md:p-6 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl hover:bg-white/5 transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h2 className="text-xl font-bold hidden md:block">
                {menuItems.find(item => item.id === activeTab)?.label}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative hidden sm:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="bg-white/5 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-all"
                />
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-xl hover:bg-white/5 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-grow p-4 md:p-6 lg:p-8 overflow-y-auto">
            {activeTab === "classes" && (
              <div className="space-y-8">
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

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-6 bg-slate-900 border border-white/5 rounded-3xl">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-foreground/40 font-medium">Total Students</p>
                        <p className="text-2xl font-bold text-white">105</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-slate-900 border border-white/5 rounded-3xl">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-green-500" />
                      </div>
                      <div>
                        <p className="text-sm text-foreground/40 font-medium">Active Courses</p>
                        <p className="text-2xl font-bold text-white">3</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-slate-900 border border-white/5 rounded-3xl">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-sm text-foreground/40 font-medium">Upcoming Lessons</p>
                        <p className="text-2xl font-bold text-white">3</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-slate-900 border border-white/5 rounded-3xl">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-purple-500" />
                      </div>
                      <div>
                        <p className="text-sm text-foreground/40 font-medium">Avg Attendance</p>
                        <p className="text-2xl font-bold text-white">89%</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {myClasses.map((cls, i) => (
                    <motion.div
                      key={cls.id}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-8 rounded-3xl bg-slate-900 border border-white/5 group hover:border-primary/20 transition-all"
                    >
                      <div className="flex items-start justify-between mb-8">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                            <Play className="w-7 h-7 text-primary fill-primary" />
                          </div>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-foreground/40">
                              {cls.language}
                            </p>
                          </div>
                        </div>
                        <button className="p-2 rounded-full hover:bg-white/5 transition-colors">
                          <MoreVertical className="w-5 h-5 text-foreground/40" />
                        </button>
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{cls.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-foreground/60 mb-8">
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

                {/* Upcoming Lessons */}
                <div className="mt-12">
                  <h2 className="text-2xl font-bold mb-6">Upcoming Lessons</h2>
                  <div className="bg-slate-900 border border-white/5 rounded-3xl overflow-hidden">
                    <div className="divide-y divide-white/5">
                      {upcomingLessons.map((lesson, i) => (
                        <div key={lesson.id} className="p-6 hover:bg-white/5 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                              <Clock className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <p className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-1">{lesson.time}</p>
                              <h3 className="text-lg font-bold text-white">{lesson.course}</h3>
                              <p className="text-sm text-foreground/60">Topic: {lesson.topic}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="px-4 py-2 rounded-full bg-green-500/10 text-green-500 text-xs font-bold uppercase tracking-wider">{lesson.type}</span>
                            <button className="p-3 rounded-xl bg-primary hover:bg-primary/90 text-background transition-colors">
                              <ChevronRight className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "students" && (
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h2 className="text-2xl font-bold">Student List</h2>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                    <input 
                      type="text" 
                      placeholder="Search students..." 
                      className="w-full sm:w-auto bg-white/5 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-all"
                    />
                  </div>
                </div>

                {/* Mobile: Card view, Desktop: Table view */}
                <div className="bg-slate-900 border border-white/5 rounded-3xl overflow-hidden">
                  {/* Desktop Table */}
                  <div className="hidden md:block overflow-x-auto">
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
                          <tr key={student.id} className="hover:bg-white/[0.02] transition-colors group">
                            <td className="px-8 py-6">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-xs font-bold uppercase text-primary">
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
                              <button className="p-2 rounded-xl hover:bg-white/5 transition-colors text-foreground/20 hover:text-foreground">
                                <ChevronRight className="w-5 h-5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="md:hidden divide-y divide-white/5">
                    {students.map((student, i) => (
                      <div key={student.id} className="p-6 hover:bg-white/[0.02] transition-colors">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-xs font-bold uppercase text-primary">
                              {student.name.charAt(0)}
                            </div>
                            <span className="font-bold">{student.name}</span>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                            student.status === "Active" ? "bg-primary/10 text-primary" : "bg-red-500/10 text-red-500"
                          }`}>
                            {student.status}
                          </span>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-foreground/60">Course</span>
                            <span>{student.course}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-foreground/60">Attendance</span>
                            <span className="font-medium">{student.attendance}</span>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <button className="p-2 rounded-xl hover:bg-white/5 transition-colors text-foreground/20 hover:text-foreground">
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "schedule" && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Class Schedule</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {upcomingLessons.map((lesson, i) => (
                    <div 
                      key={lesson.id} 
                      className="p-6 rounded-3xl bg-slate-900 border border-white/5 hover:border-primary/20 transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-1">
                            {lesson.time}
                          </p>
                          <h3 className="text-lg font-bold">{lesson.course}</h3>
                          <p className="text-sm text-foreground/60 mt-2">{lesson.topic}</p>
                        </div>
                        <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                          {lesson.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "attendance" && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Attendance Records</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {attendanceRecords.map((record, i) => (
                    <div key={record.id} className="p-6 rounded-3xl bg-slate-900 border border-white/5">
                      <div className="flex items-center justify-between mb-6">
                        <p className="text-sm font-medium text-foreground/60">{record.date}</p>
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                          <CalendarCheck className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                      <h3 className="text-lg font-bold mb-4">{record.course}</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-green-500/10 rounded-2xl">
                          <p className="text-2xl font-bold text-green-500">{record.present}</p>
                          <p className="text-xs font-bold uppercase tracking-widest text-foreground/40">Present</p>
                        </div>
                        <div className="p-4 bg-red-500/10 rounded-2xl">
                          <p className="text-2xl font-bold text-red-500">{record.absent}</p>
                          <p className="text-xs font-bold uppercase tracking-widest text-foreground/40">Absent</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="max-w-2xl mx-auto space-y-8">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-primary to-primary/60 rounded-3xl flex items-center justify-center mx-auto mb-6 text-4xl font-bold text-background">
                    {(profile?.displayName?.charAt(0) || "S").toUpperCase()}
                  </div>
                  <h1 className="text-3xl font-extrabold mb-2">{profile?.displayName || "Staff Member"}</h1>
                  <p className="text-foreground/60">{profile?.position || "Staff"}</p>
                </div>

                <form onSubmit={handleUpdateProfile} className="space-y-6 bg-slate-900 border border-white/5 rounded-3xl p-8">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground/70 ml-1">Full Name</label>
                      <input
                        required
                        type="text"
                        className="w-full bg-background border border-white/10 rounded-xl py-4 px-4 focus:outline-none focus:border-primary transition-colors"
                        value={profileForm.fullName}
                        onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground/70 ml-1">Email Address</label>
                      <input
                        required
                        type="email"
                        disabled
                        className="w-full bg-slate-800 border border-white/10 rounded-xl py-4 px-4 text-foreground/50 cursor-not-allowed"
                        value={profile?.email || ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground/70 ml-1">Phone Number</label>
                      <input
                        type="tel"
                        className="w-full bg-background border border-white/10 rounded-xl py-4 px-4 focus:outline-none focus:border-primary transition-colors"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground/70 ml-1">Job Position</label>
                      <input
                        required
                        type="text"
                        className="w-full bg-background border border-white/10 rounded-xl py-4 px-4 focus:outline-none focus:border-primary transition-colors"
                        value={profileForm.position}
                        onChange={(e) => setProfileForm({ ...profileForm, position: e.target.value })}
                      />
                    </div>
                  </div>

                  <button
                    disabled={loadingProfile}
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-background font-bold py-4 rounded-2xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                  >
                    {loadingProfile ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Saving Changes...</span>
                      </div>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </form>
              </div>
            )}

            {activeTab === "idcard" && (
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h1 className="text-3xl font-extrabold mb-2">Staff ID Card</h1>
                    <p className="text-foreground/60">Generate and print your official PasserTech ID card.</p>
                  </div>
                  <div className="flex gap-4">
                    {!profile?.idCardRequested ? (
                      <button 
                        onClick={handleRequestID}
                        disabled={requestingID}
                        className="flex items-center justify-center gap-2 bg-accent text-background px-6 py-3 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-accent/20 disabled:opacity-50"
                      >
                        {requestingID ? <Loader2 className="w-5 h-5 animate-spin" /> : <Contact2 className="w-5 h-5" />}
                        Request ID Card
                      </button>
                    ) : profile?.idCardStatus !== "approved" ? (
                      <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-500 font-bold text-sm">
                        <Clock className="w-5 h-5" />
                        ID Request Pending
                      </div>
                    ) : (
                      <button 
                        onClick={handlePrint}
                        className="flex items-center justify-center gap-2 bg-primary text-background px-6 py-3 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
                      >
                        <Printer className="w-5 h-5" />
                        Print ID Card
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center py-12">
                  <div id="printable-id-card" className="print:w-full print:max-w-full">
                    <StaffIDCard 
                      data={{
                        fullName: profile?.displayName || "Staff Member",
                        position: profile?.position || "Staff",
                        department: "Technology",
                        employeeId: `PT-${profile?.uid?.substring(0, 8).toUpperCase() || "STAFF001"}`,
                        email: profile?.email || "staff@passertech.com",
                        issueDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
                        expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
                        avatar: undefined,
                      }}
                    />
                  </div>

                  <div className="mt-12 max-w-md text-center">
                    <p className="text-foreground/40 text-sm leading-relaxed">
                      Note: This ID card is only valid for active PasserTech staff. For official use only.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-id-card, #printable-id-card * {
            visibility: visible !important;
          }
          #printable-id-card {
            position: absolute !important;
            left: 50% !important;
            top: 50% !important;
            transform: translate(-50%, -50%) !important;
            width: 100% !important;
            max-width: none !important;
            box-shadow: none !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>
    </ProtectedRoute>
  );
};

export default StaffDashboard;
