"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ProtectedRoute, useAuth } from "@/lib/auth";
import { auth } from "@/lib/firebase";
import { 
  Users, 
  BookOpen, 
  MessageSquare, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle,
  LayoutDashboard,
  Search,
  MoreVertical,
  ArrowUpRight,
  User,
  Contact2,
  Printer,
  ShieldCheck,
  LogOut,
  Menu,
  X,
  Briefcase,
  FolderKanban
} from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, query, getDocs, orderBy, limit, doc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";

import EditableField from "@/components/admin/EditableField";
import { useContent } from "@/lib/ContentContext";

import AdminCreator from "@/components/admin/AdminCreator";
import CourseManagement from "@/components/admin/CourseManagement";
import UserManagement from "@/components/admin/UserManagement";
import ServiceManagement from "@/components/admin/ServiceManagement";
import ProjectManagement from "@/components/admin/ProjectManagement";
import TestimonialManagement from "@/components/admin/TestimonialManagement";
import MessageManagement from "@/components/admin/MessageManagement";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { content } = useContent();
  const { profile, logout } = useAuth();
  const router = useRouter();
  const [adminData, setAdminData] = useState<any>(null);
  const [profileForm, setProfileForm] = useState({
    fullName: "",
    position: "",
    phone: ""
  });

  const [stats, setStats] = useState({
    students: 0,
    courses: 0,
    messages: 0,
    staffPending: 0
  });
  const [recentRegistrations, setRecentRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile?.uid) {
      const unsubscribe = onSnapshot(
        doc(db, "users", profile.uid), 
        (doc) => {
          if (doc.exists()) {
            const data = doc.data();
            setAdminData(data);
            setProfileForm({
              fullName: data.fullName || "",
              position: data.position || "",
              phone: data.phone || ""
            });
          }
        },
        (error) => {
          console.log("Snapshot listener error (likely permissions - normal when first setting up):", error);
        }
      );
      return () => unsubscribe();
    }
  }, [profile]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile?.uid) return;
    try {
      await updateDoc(doc(db, "users", profile.uid), {
        ...profileForm,
        isApproved: true
      });
      alert("Profile updated!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/");
  };

  useEffect(() => {
    const fetchStats = async () => {
      setStats({
        students: 542,
        courses: 12,
        messages: 28,
        staffPending: 3
      });
      
      const q = query(collection(db, "enrollments"), orderBy("createdAt", "desc"), limit(5));
      const querySnapshot = await getDocs(q);
      const regs: any[] = [];
      querySnapshot.forEach((doc) => regs.push({ id: doc.id, ...doc.data() }));
      setRecentRegistrations(regs);
      setLoading(false);
    };
    fetchStats();
  }, []);

  const menuItems = [
    { id: "overview", icon: LayoutDashboard, label: "Overview" },
    { id: "profile", icon: User, label: "My Profile" },
    { id: "idcard", icon: Contact2, label: "ID Card" },
    { id: "content", icon: Settings, label: "Manage Content" },
    { id: "courses", icon: BookOpen, label: "Manage Courses" },
    { id: "services", icon: Briefcase, label: "Services" },
    { id: "projects", icon: FolderKanban, label: "Projects" },
    { id: "testimonials", icon: MessageSquare, label: "Testimonials" },
    { id: "messages", icon: MessageSquare, label: "Messages" },
    { id: "users", icon: Users, label: "User Management" },
  ];

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
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
                <p className="text-xs text-foreground/40">Admin Panel</p>
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
            <div className="bg-slate-950/50 rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  {adminData?.fullName?.charAt(0) || "A"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">{adminData?.fullName || "Admin"}</p>
                  <p className="text-xs text-foreground/40 truncate">{profile?.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-red-500/10 hover:text-red-500 text-xs font-medium transition-all"
              >
                <LogOut className="w-4 h-4" />
                Log Out
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Top Header */}
          <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-white/5 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex-1">
              <h2 className="text-lg font-bold">{menuItems.find(m => m.id === activeTab)?.label || "Admin"}</h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/5">
                <Search className="w-4 h-4 text-foreground/40" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent text-sm border-0 outline-none w-40"
                />
              </div>
            </div>
          </header>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10">
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-extrabold mb-2">Admin Dashboard</h1>
                    <p className="text-foreground/60">Welcome back, {adminData?.fullName || "Admin"}! Here's what's happening today.</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-primary text-background px-4 py-2 rounded-xl font-bold text-sm">
                      <Plus className="w-4 h-4" />
                      New Course
                    </button>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: "Total Students", value: stats.students, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
                    { label: "Active Courses", value: stats.courses, icon: BookOpen, color: "text-primary", bg: "bg-primary/10" },
                    { label: "Unread Messages", value: stats.messages, icon: MessageSquare, color: "text-orange-500", bg: "bg-orange-500/10" },
                    { label: "Staff Pending", value: stats.staffPending, icon: CheckCircle, color: "text-purple-500", bg: "bg-purple-500/10" }
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-6 rounded-3xl bg-slate-900 border border-white/5 flex items-center gap-6"
                    >
                      <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center shrink-0`}>
                        <stat.icon className={`w-7 h-7 ${stat.color}`} />
                      </div>
                      <div>
                        <p className="text-sm text-foreground/40 font-medium mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-bold">{stat.value}</h3>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-slate-900 border border-white/5 rounded-3xl p-8">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-xl font-bold">Recent Registrations</h3>
                      <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
                        View All <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-6">
                      {loading ? (
                        [1, 2, 3].map(i => <div key={i} className="h-16 bg-white/5 animate-pulse rounded-2xl" />)
                      ) : (
                        recentRegistrations.length > 0 ? (
                          recentRegistrations.map((reg, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                  {reg.name?.charAt(0) || "U"}
                                </div>
                                <div>
                                  <p className="font-bold text-sm">{reg.name || "User"}</p>
                                  <p className="text-xs text-foreground/40">{reg.course || "Enrolled in course"}</p>
                                </div>
                              </div>
                              <p className="text-[10px] text-foreground/40 font-medium">
                                {reg.createdAt?.seconds ? new Date(reg.createdAt.seconds * 1000).toLocaleDateString() : "Recent"}
                              </p>
                            </div>
                          ))
                        ) : (
                          <div className="p-10 text-center text-foreground/40">
                            No recent registrations yet.
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-white/5 rounded-3xl p-8">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-xl font-bold">Quick Actions</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "Send Newsletter", icon: MessageSquare },
                        { label: "Approve Staff", icon: CheckCircle },
                        { label: "Course Reports", icon: BookOpen },
                        { label: "System Health", icon: Settings }
                      ].map((action, i) => (
                        <button key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 hover:bg-primary/5 transition-all text-left group">
                          <action.icon className="w-6 h-6 text-primary mb-4 group-hover:scale-110 transition-transform" />
                          <p className="font-bold text-sm">{action.label}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-extrabold mb-2">My Profile</h1>
                  <p className="text-foreground/60">Manage your administrative profile and credentials.</p>
                </div>
                <div className="max-w-2xl bg-slate-900 border border-white/5 rounded-3xl p-8">
                  <form onSubmit={handleUpdateProfile} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground/70 ml-1">Full Name</label>
                        <input 
                          type="text"
                          className="w-full bg-slate-950 border border-white/10 rounded-xl py-4 px-4 focus:outline-none focus:border-primary transition-colors"
                          value={profileForm.fullName}
                          onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground/70 ml-1">Phone Number</label>
                        <input 
                          type="tel"
                          className="w-full bg-slate-950 border border-white/10 rounded-xl py-4 px-4 focus:outline-none focus:border-primary transition-colors"
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground/70 ml-1">Job Position (e.g. CTO & CEO)</label>
                      <input 
                        type="text"
                        className="w-full bg-slate-950 border border-white/10 rounded-xl py-4 px-4 focus:outline-none focus:border-primary transition-colors"
                        value={profileForm.position}
                        onChange={(e) => setProfileForm({ ...profileForm, position: e.target.value })}
                      />
                    </div>
                    <div className="pt-4 flex items-center gap-4">
                      <button 
                        type="submit"
                        className="bg-primary text-background font-bold px-8 py-4 rounded-xl hover:scale-105 transition-all flex items-center gap-2"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Save Profile
                      </button>
                      {adminData?.isApproved && (
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                          <ShieldCheck className="w-4 h-4 text-primary" />
                          <span className="text-xs font-bold text-primary uppercase">Official Admin</span>
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            )}

            {activeTab === "idcard" && (
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h1 className="text-3xl font-extrabold mb-2">Admin ID Card</h1>
                    <p className="text-foreground/60">Generate your official executive ID card.</p>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={handlePrint}
                      className="flex items-center justify-center gap-2 bg-primary text-background px-6 py-3 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
                    >
                      <Printer className="w-5 h-5" />
                      Print Executive ID
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center py-12">
                  {/* Printable ID Card */}
                  <div id="printable-admin-id-card" className="w-[360px] h-[520px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-3 border-primary/30 rounded-[2.8rem] overflow-hidden relative shadow-2xl shadow-primary/20 flex flex-col items-center p-8 text-center print:shadow-none print:border-none">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-br from-primary/30 via-primary/10 to-transparent -skew-y-12 origin-top-left" />
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -mr-32 -mt-32 blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full -ml-24 -mb-24 blur-3xl" />
                    
                    {/* Company Logo Header */}
                    <div className="relative z-10 w-full flex items-center justify-center mb-8 mt-2">
                      <div className="flex items-center gap-4 bg-slate-900/80 backdrop-blur-sm px-6 py-3 rounded-3xl border border-white/10">
                        <div className="relative w-12 h-12 overflow-hidden rounded-xl border-2 border-primary/30">
                          <img 
                            src="/logo.png" 
                            alt="PasserTech"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-left">
                          <h1 className="text-xl font-extrabold tracking-tight text-white">
                            Passer<span className="text-primary">Tech</span>
                          </h1>
                          <p className="text-[10px] text-foreground/50 font-medium tracking-wider uppercase">Official Executive ID</p>
                        </div>
                      </div>
                    </div>

                    {/* Photo Section */}
                    <div className="relative z-10 w-36 h-36 rounded-[2rem] border-4 border-primary/50 p-2 mb-8 bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg shadow-primary/10">
                      <div className="w-full h-full rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center overflow-hidden border border-white/5">
                        <User className="w-16 h-16 text-primary/30" />
                      </div>
                    </div>

                    {/* Name and Position */}
                    <div className="relative z-10 space-y-2 mb-10 px-4">
                      <h2 className="text-2xl font-black text-white uppercase tracking-tighter leading-tight">
                        {adminData?.fullName || "PasserTech Admin"}
                      </h2>
                      <p className="text-primary font-bold uppercase tracking-[0.25em] text-[11px] bg-primary/10 px-3 py-1 rounded-full inline-block border border-primary/20">
                        {adminData?.position || "CTO & CEO"}
                      </p>
                    </div>

                    {/* EXECUTIVE BOARD - Highlighted */}
                    <div className="relative z-10 mb-8">
                      <div className="bg-gradient-to-r from-primary via-green-400 to-primary bg-clip-text text-transparent animate-pulse">
                        <span className="text-sm font-black uppercase tracking-[0.4em] drop-shadow-lg">EXECUTIVE BOARD</span>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="relative z-10 w-full space-y-6 border-t-2 border-primary/20 pt-8">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="space-y-1">
                          <p className="text-[9px] text-foreground/40 font-extrabold uppercase tracking-[0.3em] mb-1">ID Number</p>
                          <p className="text-sm font-mono font-bold text-white bg-slate-800/60 px-3 py-2 rounded-xl border border-white/5">
                            EXEC-{profile?.uid?.substring(0, 8).toUpperCase() || "ADMIN001"}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[9px] text-foreground/40 font-extrabold uppercase tracking-[0.3em] mb-1">Access Level</p>
                          <p className="text-sm font-black text-primary bg-primary/10 px-3 py-2 rounded-xl border border-primary/30">
                            LEVEL 0
                          </p>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] text-foreground/50 font-medium">Full Administrative Access</p>
                      </div>
                    </div>

                    {/* Hologram/Verification Badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/40 to-transparent rounded-full flex items-center justify-center border border-primary/50 rotate-12 backdrop-blur-sm">
                        <ShieldCheck className="w-7 h-7 text-primary/90" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-12 max-w-md text-center">
                    <p className="text-foreground/40 text-sm leading-relaxed">
                      This executive ID card grants full administrative access to all PasserTech facilities and systems.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "content" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-extrabold mb-2">Manage Site Content</h1>
                  <p className="text-foreground/60">Edit content for all sections of the PasserTech website.</p>
                </div>
                
                <div className="space-y-8">
                  {/* Hero Section */}
                  <div className="bg-slate-900 border border-white/5 rounded-3xl p-8">
                    <h3 className="text-xl font-bold mb-6">Hero Section</h3>
                    <div className="space-y-6">
                      <EditableField
                        label="Hero Title"
                        section="hero"
                        field="title"
                        initialValues={content?.hero?.title || { en: "", ig: "", ha: "", yo: "", pcm: "" }}
                      />
                      <EditableField
                        label="Hero Subtitle"
                        section="hero"
                        field="subtitle"
                        initialValues={content?.hero?.subtitle || { en: "", ig: "", ha: "", yo: "", pcm: "" }}
                      />
                    </div>
                  </div>

                  {/* Placeholder sections for future use */}
                  <div className="bg-slate-900 border border-white/5 rounded-3xl p-8">
                    <h3 className="text-xl font-bold mb-4 text-foreground/40">More sections coming soon</h3>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "courses" && <CourseManagement />}
            {activeTab === "services" && <ServiceManagement />}
            {activeTab === "projects" && <ProjectManagement />}
            {activeTab === "testimonials" && <TestimonialManagement />}
            {activeTab === "messages" && <MessageManagement />}
            {activeTab === "users" && <UserManagement />}
          </div>
        </main>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-admin-id-card, #printable-admin-id-card * {
            visibility: visible !important;
          }
          #printable-admin-id-card {
            position: absolute !important;
            left: 50% !important;
            top: 50% !important;
            transform: translate(-50%, -50%) !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          /* Ensure gradients and backgrounds print */
          .bg-gradient-to-br {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </ProtectedRoute>
  );
};

export default AdminDashboard;
