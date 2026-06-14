"use client";

import React, { useState } from "react";
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
  User
} from "lucide-react";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const StaffDashboard = () => {
  const [activeTab, setActiveTab] = useState("classes");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { profile } = useAuth();
  const router = useRouter();
  const [requestingID, setRequestingID] = useState(false);

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/");
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
    { title: "HTML & CSS in Igbo", students: 42, nextLesson: "Today, 4:00 PM", progress: 65 },
    { title: "Python for Beginners", students: 28, nextLesson: "Tomorrow, 10:00 AM", progress: 30 },
  ];

  const students = [
    { name: "Chinedu Okeke", course: "HTML & CSS", status: "Active", attendance: "95%" },
    { name: "Adaobi Nwosu", course: "Python", status: "Active", attendance: "88%" },
    { name: "Emeka Uzor", course: "HTML & CSS", status: "Inactive", attendance: "45%" },
  ];

  const menuItems = [
    { id: "classes", icon: BookOpen, label: "My Classes" },
    { id: "students", icon: Users, label: "Students" },
    { id: "schedule", icon: Calendar, label: "Schedule" },
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
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-white/5 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold hidden md:block">
                {menuItems.find(item => item.id === activeTab)?.label}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="bg-white/5 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-all"
                />
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 p-2 rounded-xl hover:bg-white/5 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </header>

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

          {activeTab === "schedule" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Class Schedule</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { 
                    time: "Today, 4:00 PM", 
                    course: "HTML & CSS in Igbo", 
                    students: 42, 
                    type: "Live Session" 
                  },
                  { 
                    time: "Tomorrow, 10:00 AM", 
                    course: "Python for Beginners", 
                    students: 28, 
                    type: "Tutorial" 
                  },
                  { 
                    time: "Wednesday, 2:00 PM", 
                    course: "JavaScript Fundamentals", 
                    students: 35, 
                    type: "Workshop" 
                  },
                  { 
                    time: "Thursday, 6:00 PM", 
                    course: "React Basics", 
                    students: 22, 
                    type: "Q&A Session" 
                  }
                ].map((item, i) => (
                  <div 
                    key={i} 
                    className="p-6 rounded-3xl bg-slate-900 border border-white/5 hover:border-primary/20 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-1">
                          {item.time}
                        </p>
                        <h3 className="text-lg font-bold">{item.course}</h3>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                        {item.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-foreground/60">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {item.students} Students
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
                    <div className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-500 font-bold text-sm">
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
              {/* ID Card Preview */}
              <div id="printable-id-card" className="w-[350px] h-[500px] bg-slate-900 border-2 border-primary/30 rounded-[2.5rem] overflow-hidden relative shadow-2xl flex flex-col items-center p-8 text-center print:shadow-none print:border-primary">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-32 bg-primary/10 -skew-y-6 origin-top-left" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl" />
                
                {/* Logo */}
                <div className="relative z-10 mb-8 mt-4">
                  <div className="flex items-center gap-3 bg-slate-900/80 backdrop-blur-sm px-6 py-3 rounded-3xl border border-white/10">
                    <div className="relative w-10 h-10 overflow-hidden rounded-xl">
                      <img 
                        src="/logo.png" 
                        alt="PasserTech"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <h1 className="text-lg font-bold tracking-tight text-white">
                        Passer<span className="text-primary">Tech</span>
                      </h1>
                      <p className="text-xs text-foreground/40">Official Staff ID</p>
                    </div>
                  </div>
                </div>

                  {/* Photo Placeholder */}
                  <div className="relative z-10 w-32 h-32 rounded-3xl border-4 border-primary/20 p-1 mb-6 bg-slate-800">
                    <div className="w-full h-full rounded-2xl bg-slate-700 flex items-center justify-center overflow-hidden">
                      <Users className="w-12 h-12 text-foreground/20" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="relative z-10 space-y-1 mb-8">
                    <h2 className="text-2xl font-bold text-white uppercase tracking-tight">{profile?.displayName || "Staff Member"}</h2>
                    <p className="text-primary font-bold uppercase tracking-widest text-xs">{profile?.position || "Staff"}</p>
                  </div>

                  {/* Details */}
                  <div className="relative z-10 w-full grid grid-cols-1 gap-4 text-left border-t border-white/5 pt-8 mb-8">
                    <div>
                      <p className="text-[10px] text-foreground/40 font-bold uppercase tracking-widest mb-1">Employee ID</p>
                      <p className="text-sm font-mono text-white">PT-{profile?.uid.substring(0, 8).toUpperCase()}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-foreground/40 font-bold uppercase tracking-widest mb-1">Email</p>
                      <p className="text-sm font-medium text-white truncate w-full">{profile?.email}</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="relative z-10 mt-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Official Staff</span>
                    </div>
                  </div>

                  {/* Signature area */}
                  <div className="absolute bottom-12 right-8 opacity-20">
                    <div className="w-24 h-0.5 bg-white/50 mb-1" />
                    <p className="text-[8px] text-white/50 text-right uppercase">Authorized Signature</p>
                  </div>
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
            visibility: visible;
          }
          #printable-id-card {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            border: 2px solid #22c55e !important;
            background-color: #0f172a !important;
            -webkit-print-color-adjust: exact;
          }
          .bg-slate-900 { background-color: #0f172a !important; }
          .bg-primary { background-color: #22c55e !important; }
          .text-primary { color: #22c55e !important; }
          .text-white { color: #ffffff !important; }
          .bg-primary\/10 { background-color: rgba(34, 197, 94, 0.1) !important; }
        }
      `}</style>
    </ProtectedRoute>
  );
};

export default StaffDashboard;
