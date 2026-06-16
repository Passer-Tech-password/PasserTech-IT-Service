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
import {
  InstructorDashboard,
  CourseManagerDashboard,
  ContentCreatorDashboard,
} from "@/components/staff-dashboards";

const StaffDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
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

  // Get role-specific menu items
  const getMenuItems = () => {
    const baseItems = [
      { id: "profile", icon: User, label: "My Profile" },
      { id: "idcard", icon: Contact2, label: "ID Card" },
    ];

    switch (profile?.role) {
      case "instructor":
        return [
          { id: "dashboard", icon: BookOpen, label: "Dashboard" },
          { id: "classes", icon: BookOpen, label: "My Classes" },
          { id: "students", icon: Users, label: "Students" },
          { id: "schedule", icon: Calendar, label: "Schedule" },
          { id: "attendance", icon: CalendarCheck, label: "Attendance" },
          ...baseItems,
        ];
      case "course_manager":
        return [
          { id: "dashboard", icon: BookOpen, label: "Dashboard" },
          { id: "courses", icon: FileText, label: "Manage Courses" },
          ...baseItems,
        ];
      case "content_creator":
        return [
          { id: "dashboard", icon: BookOpen, label: "Dashboard" },
          { id: "content", icon: FileText, label: "Content Management" },
          ...baseItems,
        ];
      default:
        return [
          { id: "dashboard", icon: BookOpen, label: "Dashboard" },
          ...baseItems,
        ];
    }
  };

  const menuItems = getMenuItems();

  // Render the correct dashboard based on role
  const renderDashboard = () => {
    switch (profile?.role) {
      case "instructor":
        return <InstructorDashboard />;
      case "course_manager":
        return <CourseManagerDashboard />;
      case "content_creator":
        return <ContentCreatorDashboard />;
      default:
        return (
          <div className="p-6 space-y-8">
            <div>
              <h1 className="text-3xl font-extrabold">Staff Dashboard</h1>
              <p className="text-foreground/60">Welcome to PasserTech Staff Panel</p>
            </div>
          </div>
        );
    }
  };

  return (
    <ProtectedRoute allowedRoles={["instructor", "course_manager", "content_creator", "admin"]}>
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
            {activeTab === "dashboard" && renderDashboard()}
            {activeTab === "classes" && <div className="p-6">{"My Classes Placeholder"}</div>}
            {activeTab === "students" && <div className="p-6">{"Students Placeholder"}</div>}
            {activeTab === "schedule" && <div className="p-6">{"Schedule Placeholder"}</div>}
            {activeTab === "attendance" && <div className="p-6">{"Attendance Placeholder"}</div>}
            {activeTab === "courses" && <div className="p-6">{"Manage Courses Placeholder"}</div>}
            {activeTab === "content" && <div className="p-6">{"Content Management Placeholder"}</div>}

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
