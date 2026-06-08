"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  X, 
  Save, 
  Loader2, 
  Edit, 
  Trash2, 
  Quote, 
  User, 
  Star,
  Type
} from "lucide-react";
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ImageUpload from "@/components/ImageUpload";

const TestimonialManagement = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    text: "",
    avatarUrl: "",
    rating: 5,
    order: 0
  });

  useEffect(() => {
    const q = query(collection(db, "testimonials"), orderBy("order", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTestimonials(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleOpenModal = (testimonial: any = null) => {
    if (testimonial) {
      setEditingTestimonial(testimonial);
      setFormData({
        name: testimonial.name || "",
        role: testimonial.role || "",
        text: testimonial.text || "",
        avatarUrl: testimonial.avatarUrl || "",
        rating: testimonial.rating || 5,
        order: testimonial.order || 0
      });
    } else {
      setEditingTestimonial(null);
      setFormData({
        name: "",
        role: "",
        text: "",
        avatarUrl: "",
        rating: 5,
        order: testimonials.length
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingTestimonial) {
        await updateDoc(doc(db, "testimonials", editingTestimonial.id), {
          ...formData,
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, "testimonials"), {
          ...formData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving testimonial:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await deleteDoc(doc(db, "testimonials", id));
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Testimonials Management</h2>
          <p className="text-foreground/40 text-sm">Manage reviews from students and clients.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary text-background px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-primary/20"
        >
          <Plus className="w-5 h-5" />
          Add Testimonial
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <motion.div
              layout
              key={t.id}
              className="bg-slate-900 border border-white/5 rounded-3xl p-6 group hover:border-primary/20 transition-all flex flex-col"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/5 overflow-hidden border border-white/10">
                    {t.avatarUrl ? (
                      <img src={t.avatarUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-foreground/20">
                        <User className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{t.name}</h4>
                    <p className="text-xs text-primary">{t.role}</p>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleOpenModal(t)} className="p-2 hover:bg-white/5 rounded-lg text-primary"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(t.id)} className="p-2 hover:bg-white/5 rounded-lg text-red-500"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <p className="text-xs text-foreground/60 italic line-clamp-3 mb-4">"{t.text}"</p>
              <div className="mt-auto flex items-center justify-between">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < t.rating ? "text-accent fill-accent" : "text-foreground/10"}`} />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-foreground/20 uppercase">Order: {t.order}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-background/80 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-xl font-bold">{editingTestimonial ? "Edit Testimonial" : "Add Testimonial"}</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full"><X className="w-5 h-5" /></button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-foreground/40 uppercase tracking-widest ml-1">Name</label>
                    <input required className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-foreground/40 uppercase tracking-widest ml-1">Role/Company</label>
                    <input required className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground/40 uppercase tracking-widest ml-1">Testimonial Text</label>
                  <textarea required rows={4} className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary resize-none" value={formData.text} onChange={(e) => setFormData({ ...formData, text: e.target.value })} />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground/40 uppercase tracking-widest ml-1">User Avatar</label>
                  <ImageUpload path="testimonials" onUploadComplete={(url) => setFormData({ ...formData, avatarUrl: url })} />
                  {formData.avatarUrl && (
                    <div className="mt-2 relative w-20 h-20 rounded-full overflow-hidden border border-white/5">
                      <img src={formData.avatarUrl} className="w-full h-full object-cover" />
                      <button type="button" onClick={() => setFormData({ ...formData, avatarUrl: "" })} className="absolute inset-0 flex items-center justify-center bg-red-500/50 opacity-0 hover:opacity-100 transition-opacity"><X className="w-6 h-6 text-white" /></button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-foreground/40 uppercase tracking-widest ml-1">Rating (1-5)</label>
                    <select className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary appearance-none" value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}>
                      {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} Stars</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-foreground/40 uppercase tracking-widest ml-1">Display Order</label>
                    <input type="number" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })} />
                  </div>
                </div>

                <button disabled={saving} type="submit" className="w-full bg-primary text-background font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50">
                  {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  {editingTestimonial ? "Update Testimonial" : "Add Testimonial"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TestimonialManagement;
