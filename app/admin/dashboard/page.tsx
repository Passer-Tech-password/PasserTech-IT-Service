"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ProtectedRoute } from "@/lib/auth";
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
  ArrowUpRight
} from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, query, getDocs, orderBy, limit, doc, updateDoc, deleteDoc } from "firebase/firestore";

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
  const { content } = useContent();
  const [stats, setStats] = useState({
    students: 0,
    courses: 0,
    messages: 0,
    staffPending: 0
  });
  const [recentRegistrations, setRecentRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      // Mocking some data for now, in real app you'd fetch from Firestore
      setStats({
        students: 542,
        courses: 12,
        messages: 28,
        staffPending: 3
      });

      // Fetch recent enrollments
      const q = query(collection(db, "enrollments"), orderBy("createdAt", "desc"), limit(5));
      const querySnapshot = await getDocs(q);
      const regs: any[] = [];
      querySnapshot.forEach((doc) => regs.push({ id: doc.id, ...doc.data() }));
      setRecentRegistrations(regs);
      setLoading(false);
    };

    fetchStats();
  }, []);

  const SidebarItem = ({ id, icon: Icon, label }: { id: string, icon: any, label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
        activeTab === id ? "bg-primary text-background shadow-lg shadow-primary/20" : "text-foreground/60 hover:bg-white/5 hover:text-foreground"
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen pt-24 bg-african-pattern flex flex-col lg:flex-row">
        {/* Mobile Nav Header */}
        <div className="lg:hidden flex overflow-x-auto gap-2 p-4 border-b border-white/5 bg-slate-950/50 backdrop-blur-xl">
          {["overview", "courses", "messages", "users"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${
                activeTab === tab ? "bg-primary text-background" : "bg-white/5 text-foreground/50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-72 p-6 border-r border-white/5 space-y-2 shrink-0">
          <SidebarItem id="overview" icon={LayoutDashboard} label="Overview" />
          <SidebarItem id="content" icon={Settings} label="Manage Content" />
          <SidebarItem id="courses" icon={BookOpen} label="Manage Courses" />
          <SidebarItem id="services" icon={BookOpen} label="Services" />
          <SidebarItem id="projects" icon={LayoutDashboard} label="Projects" />
          <SidebarItem id="testimonials" icon={MessageSquare} label="Testimonials" />
          <SidebarItem id="messages" icon={MessageSquare} label="Messages" />
          <SidebarItem id="users" icon={Users} label="User Management" />
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-4 md:p-8 lg:p-12 overflow-y-auto">
          {activeTab === "overview" && (
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold mb-2">Admin Dashboard</h1>
                  <p className="text-foreground/60">Welcome back, Admin. Here's what's happening today.</p>
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
                      recentRegistrations.map((reg, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                              {reg.name?.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-sm">{reg.name}</p>
                              <p className="text-xs text-foreground/40">{reg.course}</p>
                            </div>
                          </div>
                          <p className="text-[10px] text-foreground/40 font-medium">{new Date(reg.createdAt?.seconds * 1000).toLocaleDateString()}</p>
                        </div>
                      ))
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

          {activeTab === "content" && (
            <div className="space-y-12">
              <div>
                <h1 className="text-3xl font-extrabold mb-2">Manage Site Content</h1>
                <p className="text-foreground/60">Edit the global sections of your website in all supported languages.</p>
              </div>

              <div className="space-y-8">
                <section>
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">01</span>
                    Hero Section
                  </h3>
                  <div className="grid grid-cols-1 gap-6">
                    <EditableField 
                      label="Main Headline"
                      section="hero"
                      field="title"
                      initialValues={content?.hero?.title || {}}
                    />
                    <EditableField 
                      label="Sub-headline"
                      section="hero"
                      field="subtitle"
                      initialValues={content?.hero?.subtitle || {}}
                    />
                  </div>
                </section>
                
                {/* Additional sections for Services, Testimonials etc would be added here */}
              </div>
            </div>
          )}

          {activeTab === "courses" && (
            <CourseManagement />
          )}

          {activeTab === "services" && (
            <ServiceManagement />
          )}

          {activeTab === "projects" && (
            <ProjectManagement />
          )}

          {activeTab === "testimonials" && (
            <TestimonialManagement />
          )}

          {activeTab === "messages" && (
            <MessageManagement />
          )}

          {activeTab === "users" && (
            <UserManagement />
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;
