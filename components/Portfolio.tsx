"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Loader2 } from "lucide-react";
import { collection, query, orderBy, onSnapshot, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";

const Portfolio = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("order", "asc"), limit(4));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-african-pattern">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Recent Projects</h2>
          <p className="text-sm md:text-base text-foreground/60 max-w-2xl mx-auto px-4">
            Explore our latest work where technology meets local impact.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-white/5 shadow-xl"
              >
                <div className="aspect-[16/9] md:aspect-[16/9] overflow-hidden">
                  <img
                    src={project.imageUrl || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800"}
                    alt={project.title}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 opacity-70 md:opacity-60 group-hover:opacity-100"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent p-6 md:p-8 flex flex-col justify-end">
                  <div className="space-y-3 md:space-y-4">
                    <div>
                      <span className="text-primary text-[10px] md:text-xs font-extrabold tracking-widest uppercase mb-1 md:mb-2 block">
                        {project.category}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold">{project.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.tags?.map((tag: string, j: number) => (
                        <span key={j} className="text-[10px] font-bold px-2 py-1 rounded bg-white/10 text-white/70 border border-white/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4 pt-2 md:pt-4 md:opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 md:p-3 rounded-xl bg-primary text-background shadow-lg shadow-primary/20 hover:scale-110 transition-transform">
                          <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 md:p-3 rounded-xl bg-white/10 text-white hover:bg-white/20 hover:scale-110 transition-transform">
                          <Github className="w-4 h-4 md:w-5 md:h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
