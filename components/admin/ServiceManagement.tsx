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
  Code, 
  Cloud, 
  Headphones, 
  Layout, 
  Shield, 
  Database, 
  Smartphone, 
  Globe,
  Palette
} from "lucide-react";
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { languages, SupportedLanguage } from "@/lib/translations";

const iconMap: Record<string, any> = {
  Code, Cloud, Headphones, Layout, Shield, Database, Smartphone, Globe, Palette
};

const ServiceManagement = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [activeLang, setActiveLang] = useState<SupportedLanguage>("en");
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: languages.reduce((acc, lang) => ({ ...acc, [lang.code]: "" }), {} as Record<string, string>),
    description: languages.reduce((acc, lang) => ({ ...acc, [lang.code]: "" }), {} as Record<string, string>),
    iconName: "Code",
    color: "bg-blue-500",
    order: 0
  });

  useEffect(() => {
    const q = query(collection(db, "services"), orderBy("order", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setServices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleOpenModal = (service: any = null) => {
    if (service) {
      setEditingService(service);
      setFormData({
        title: service.title || {},
        description: service.description || {},
        iconName: service.iconName || "Code",
        color: service.color || "bg-blue-500",
        order: service.order || 0
      });
    } else {
      setEditingService(null);
      setFormData({
        title: languages.reduce((acc, lang) => ({ ...acc, [lang.code]: "" }), {} as Record<string, string>),
        description: languages.reduce((acc, lang) => ({ ...acc, [lang.code]: "" }), {} as Record<string, string>),
        iconName: "Code",
        color: "bg-blue-500",
        order: services.length
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingService) {
        await updateDoc(doc(db, "services", editingService.id), {
          ...formData,
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, "services"), {
          ...formData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving service:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      await deleteDoc(doc(db, "services", id));
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Services Management</h2>
          <p className="text-foreground/40 text-sm">Manage the professional IT services you offer.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary text-background px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-primary/20"
        >
          <Plus className="w-5 h-5" />
          Add Service
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = iconMap[service.iconName] || Code;
            return (
              <motion.div
                layout
                key={service.id}
                className="bg-slate-900 border border-white/5 rounded-3xl p-6 group hover:border-primary/20 transition-all flex flex-col"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-12 h-12 rounded-xl ${service.color}/10 flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${service.color.replace('bg-', 'text-')}`} />
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleOpenModal(service)} className="p-2 hover:bg-white/5 rounded-lg text-primary"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(service.id)} className="p-2 hover:bg-white/5 rounded-lg text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                <h3 className="font-bold mb-2">{service.title?.en}</h3>
                <p className="text-xs text-foreground/40 line-clamp-2 mb-4">{service.description?.en}</p>
                <div className="mt-auto text-[10px] font-bold text-foreground/20 uppercase tracking-widest">
                  Order: {service.order}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-background/80 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-xl font-bold">{editingService ? "Edit Service" : "Add New Service"}</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full"><X className="w-5 h-5" /></button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">
                <div className="flex gap-2 bg-background p-1 rounded-xl w-fit">
                  {languages.map((lang) => (
                    <button key={lang.code} type="button" onClick={() => setActiveLang(lang.code as SupportedLanguage)} className={`px-4 py-2 rounded-lg text-xs font-bold uppercase ${activeLang === lang.code ? "bg-primary text-background" : "text-foreground/40"}`}>{lang.code}</button>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-foreground/40 uppercase tracking-widest ml-1">Service Title ({activeLang})</label>
                    <input required className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary" value={formData.title[activeLang] || ""} onChange={(e) => setFormData({ ...formData, title: { ...formData.title, [activeLang]: e.target.value } })} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-foreground/40 uppercase tracking-widest ml-1">Description ({activeLang})</label>
                    <textarea required rows={3} className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary resize-none" value={formData.description[activeLang] || ""} onChange={(e) => setFormData({ ...formData, description: { ...formData.description, [activeLang]: e.target.value } })} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-foreground/40 uppercase tracking-widest ml-1">Icon</label>
                    <select className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary appearance-none" value={formData.iconName} onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}>
                      {Object.keys(iconMap).map(icon => <option key={icon} value={icon}>{icon}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-foreground/40 uppercase tracking-widest ml-1">Display Order</label>
                    <input type="number" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground/40 uppercase tracking-widest ml-1">Accent Color Class (Tailwind)</label>
                  <select className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary appearance-none" value={formData.color} onChange={(e) => setFormData({ ...formData, color: e.target.value })}>
                    <option value="bg-blue-500">Blue</option>
                    <option value="bg-green-500">Green</option>
                    <option value="bg-purple-500">Purple</option>
                    <option value="bg-orange-500">Orange</option>
                    <option value="bg-red-500">Red</option>
                    <option value="bg-yellow-500">Yellow</option>
                  </select>
                </div>

                <button disabled={saving} type="submit" className="w-full bg-primary text-background font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50">
                  {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  {editingService ? "Update Service" : "Add Service"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceManagement;
