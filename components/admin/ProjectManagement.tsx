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
  Image as ImageIcon,
  ExternalLink,
  Github,
  Type,
  Tag
} from "lucide-react";
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ImageUpload from "@/components/ImageUpload";

const ProjectManagement = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    imageUrl: "",
    tags: "",
    liveUrl: "",
    githubUrl: "",
    order: 0
  });

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("order", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleOpenModal = (project: any = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title || "",
        category: project.category || "",
        description: project.description || "",
        imageUrl: project.imageUrl || "",
        tags: project.tags?.join(", ") || "",
        liveUrl: project.liveUrl || "",
        githubUrl: project.githubUrl || "",
        order: project.order || 0
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: "",
        category: "",
        description: "",
        imageUrl: "",
        tags: "",
        liveUrl: "",
        githubUrl: "",
        order: projects.length
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const projectData = {
      ...formData,
      tags: formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag !== ""),
      updatedAt: serverTimestamp()
    };

    try {
      if (editingProject) {
        await updateDoc(doc(db, "projects", editingProject.id), projectData);
      } else {
        await addDoc(collection(db, "projects"), {
          ...projectData,
          createdAt: serverTimestamp()
        });
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving project:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteDoc(doc(db, "projects", id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Portfolio Management</h2>
          <p className="text-foreground/40 text-sm">Showcase your best work and success stories.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary text-background px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-primary/20"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div
              layout
              key={project.id}
              className="bg-slate-900 border border-white/5 rounded-3xl overflow-hidden group hover:border-primary/20 transition-all flex flex-col"
            >
              <div className="aspect-video relative bg-white/5">
                {project.imageUrl ? (
                  <img src={project.imageUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-foreground/20">
                    <ImageIcon className="w-12 h-12" />
                  </div>
                )}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleOpenModal(project)} className="p-2 bg-background/80 backdrop-blur-md rounded-lg text-primary hover:bg-primary hover:text-background transition-all"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(project.id)} className="p-2 bg-background/80 backdrop-blur-md rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-all"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="p-6">
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1 block">{project.category}</span>
                <h3 className="font-bold mb-2 truncate">{project.title}</h3>
                <div className="flex flex-wrap gap-1">
                  {project.tags?.map((tag: string, i: number) => (
                    <span key={i} className="px-2 py-0.5 bg-white/5 rounded text-[10px] text-foreground/40">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-background/80 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-4xl bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-xl font-bold">{editingProject ? "Edit Project" : "Add New Project"}</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full"><X className="w-5 h-5" /></button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-foreground/40 uppercase tracking-widest ml-1">Project Title</label>
                      <input required className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-foreground/40 uppercase tracking-widest ml-1">Category (e.g. EdTech, Mobile App)</label>
                      <input required className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-foreground/40 uppercase tracking-widest ml-1">Description</label>
                      <textarea required rows={4} className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary resize-none" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-foreground/40 uppercase tracking-widest ml-1">Tags (comma separated)</label>
                      <div className="relative">
                        <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20" />
                        <input className="w-full bg-background border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary" placeholder="Next.js, Firebase, Tailwind" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-foreground/40 uppercase tracking-widest ml-1">Project Image</label>
                      <ImageUpload path="projects" onUploadComplete={(url) => setFormData({ ...formData, imageUrl: url })} />
                      {formData.imageUrl && (
                        <div className="mt-2 relative w-full aspect-video rounded-xl overflow-hidden border border-white/5">
                          <img src={formData.imageUrl} className="w-full h-full object-cover" />
                          <button type="button" onClick={() => setFormData({ ...formData, imageUrl: "" })} className="absolute top-2 right-2 p-1.5 bg-red-500 rounded-lg text-white"><X className="w-4 h-4" /></button>
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-foreground/40 uppercase tracking-widest ml-1 flex items-center gap-2"><ExternalLink className="w-3 h-3" /> Live URL</label>
                        <input className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary" value={formData.liveUrl} onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-foreground/40 uppercase tracking-widest ml-1 flex items-center gap-2"><Github className="w-3 h-3" /> GitHub URL</label>
                        <input className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary" value={formData.githubUrl} onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-foreground/40 uppercase tracking-widest ml-1">Display Order</label>
                      <input type="number" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })} />
                    </div>
                  </div>
                </div>

                <button disabled={saving} type="submit" className="w-full bg-primary text-background font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50">
                  {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  {editingProject ? "Update Project" : "Add Project"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectManagement;
