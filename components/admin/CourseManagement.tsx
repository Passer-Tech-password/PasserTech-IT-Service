"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  X, 
  Save, 
  Loader2, 
  Type, 
  Clock, 
  BarChart, 
  Globe,
  Trash2,
  Edit,
  Image as ImageIcon
} from "lucide-react";
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ImageUpload from "@/components/ImageUpload";
import { languages, SupportedLanguage } from "@/lib/translations";

const CourseManagement = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    title: languages.reduce((acc, lang) => ({ ...acc, [lang.code]: "" }), {} as Record<string, string>),
    description: languages.reduce((acc, lang) => ({ ...acc, [lang.code]: "" }), {} as Record<string, string>),
    duration: "4 Weeks",
    level: "Beginner",
    price: "Free",
    imageUrl: "",
    isActive: true
  });

  const [activeLang, setActiveLang] = useState<SupportedLanguage>("en");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "courses"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setCourses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleOpenModal = (course: any = null) => {
    if (course) {
      setEditingCourse(course);
      setFormData({
        title: course.title || {},
        description: course.description || {},
        duration: course.duration || "4 Weeks",
        level: course.level || "Beginner",
        price: course.price || "Free",
        imageUrl: course.imageUrl || "",
        isActive: course.isActive ?? true
      });
    } else {
      setEditingCourse(null);
      setFormData({
        title: languages.reduce((acc, lang) => ({ ...acc, [lang.code]: "" }), {} as Record<string, string>),
        description: languages.reduce((acc, lang) => ({ ...acc, [lang.code]: "" }), {} as Record<string, string>),
        duration: "4 Weeks",
        level: "Beginner",
        price: "Free",
        imageUrl: "",
        isActive: true
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingCourse) {
        await updateDoc(doc(db, "courses", editingCourse.id), {
          ...formData,
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, "courses"), {
          ...formData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving course:", error);
      alert("Failed to save course. Check your permissions.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await deleteDoc(doc(db, "courses", id));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Course Management</h2>
          <p className="text-foreground/40 text-sm">Create and manage Academy courses across all languages.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary text-background px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-primary/20"
        >
          <Plus className="w-5 h-5" />
          Add New Course
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {courses.map((course) => (
            <motion.div
              layout
              key={course.id}
              className="bg-slate-900 border border-white/5 rounded-3xl overflow-hidden group hover:border-primary/20 transition-all"
            >
              <div className="aspect-video relative bg-white/5">
                {course.imageUrl ? (
                  <img src={course.imageUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-foreground/20">
                    <ImageIcon className="w-12 h-12" />
                  </div>
                )}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => handleOpenModal(course)}
                    className="p-2 bg-background/80 backdrop-blur-md rounded-lg text-primary hover:bg-primary hover:text-background transition-all"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="p-2 bg-background/80 backdrop-blur-md rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 truncate">{course.title?.en}</h3>
                <div className="flex items-center gap-4 text-xs text-foreground/40 font-medium">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {course.duration}</span>
                  <span className="flex items-center gap-1"><BarChart className="w-3 h-3" /> {course.level}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-slate-900/50 backdrop-blur-xl sticky top-0 z-20">
                <div>
                  <h3 className="text-2xl font-bold">{editingCourse ? "Edit Course" : "Add New Course"}</h3>
                  <p className="text-sm text-foreground/40">Fill in the details for the Academy course.</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-8">
                {/* Language Selector for Translatable Fields */}
                <div className="flex gap-2 bg-background p-1 rounded-xl w-fit">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => setActiveLang(lang.code as SupportedLanguage)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${
                        activeLang === lang.code ? "bg-primary text-background" : "text-foreground/40 hover:text-foreground"
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-foreground/40 uppercase tracking-widest ml-1 flex items-center gap-2">
                        <Type className="w-3 h-3" /> Course Title ({activeLang})
                      </label>
                      <input
                        required
                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-primary transition-colors"
                        value={formData.title[activeLang] || ""}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          title: { ...formData.title, [activeLang]: e.target.value } 
                        })}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-foreground/40 uppercase tracking-widest ml-1 flex items-center gap-2">
                        <Globe className="w-3 h-3" /> Description ({activeLang})
                      </label>
                      <textarea
                        required
                        rows={5}
                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-primary transition-colors resize-none"
                        value={formData.description[activeLang] || ""}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          description: { ...formData.description, [activeLang]: e.target.value } 
                        })}
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-foreground/40 uppercase tracking-widest ml-1">Duration</label>
                        <select
                          className="w-full bg-background border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-primary transition-colors appearance-none"
                          value={formData.duration}
                          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        >
                          <option>4 Weeks</option>
                          <option>6 Weeks</option>
                          <option>8 Weeks</option>
                          <option>12 Weeks</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-foreground/40 uppercase tracking-widest ml-1">Level</label>
                        <select
                          className="w-full bg-background border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-primary transition-colors appearance-none"
                          value={formData.level}
                          onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                        >
                          <option>Beginner</option>
                          <option>Intermediate</option>
                          <option>Advanced</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-foreground/40 uppercase tracking-widest ml-1">Price (e.g. Free or ₦25,000)</label>
                      <input
                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-primary transition-colors"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-foreground/40 uppercase tracking-widest ml-1">Course Banner Image</label>
                      <ImageUpload 
                        path="courses" 
                        onUploadComplete={(url) => setFormData({ ...formData, imageUrl: url })} 
                      />
                      {formData.imageUrl && (
                        <div className="mt-2 relative w-full aspect-video rounded-xl overflow-hidden border border-white/5">
                          <img src={formData.imageUrl} className="w-full h-full object-cover" />
                          <button 
                            type="button"
                            onClick={() => setFormData({ ...formData, imageUrl: "" })}
                            className="absolute top-2 right-2 p-1.5 bg-red-500 rounded-lg text-white"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5 sticky bottom-0 bg-slate-900 pb-8 mt-auto z-10 flex gap-4">
                  <button
                    disabled={saving}
                    type="submit"
                    className="flex-grow bg-primary hover:bg-primary/90 text-background font-extrabold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                  >
                    {saving ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
                    {editingCourse ? "Update Course" : "Publish Course"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-8 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseManagement;
