"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Filter, Loader2 } from "lucide-react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Explore our recent projects in mobile app development, e-commerce, and community portals across Nigeria.",
};

const ProjectsPage = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("order", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="pt-32 pb-24">
      <section className="container mx-auto px-4 md:px-6 mb-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
              Our <span className="text-primary">Portfolio</span>
            </h1>
            <p className="text-xl text-foreground/60 leading-relaxed">
              Showcasing our journey in building impactful digital products
              that solve real-world problems.
            </p>
          </motion.div>
          <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-all">
            <Filter className="w-5 h-5" />
            Filter Projects
          </button>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-slate-900 border border-white/5 rounded-3xl overflow-hidden hover:border-primary/30 transition-all flex flex-col"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={project.imageUrl || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800"}
                    alt={project.title}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-primary text-xs font-bold uppercase tracking-widest mb-1 block">
                        {project.category}
                      </span>
                      <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <div className="flex gap-2">
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-primary hover:text-background transition-all">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-foreground/60 text-sm mb-6 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {project.tags?.map((tag: string, j: number) => (
                      <span key={j} className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-white/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProjectsPage;
