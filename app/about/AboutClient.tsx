"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { 
  Target, 
  Lightbulb, 
  Rocket, 
  Users, 
  ShieldCheck, 
  Zap,
  CheckCircle2
} from "lucide-react";

const AboutClient = () => {
  const { t } = useLanguage();
  const about = t.about;

  return (
    <div className="pt-32 pb-24 bg-african-pattern min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center mb-24"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-8">
            {about.title}
          </h1>
          <p className="text-xl md:text-2xl text-foreground/70 leading-relaxed italic">
            "{about.vision}"
          </p>
        </motion.div>

        {/* Executive Summary & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-sm uppercase tracking-widest">
              <Zap className="w-4 h-4" />
              Executive Summary
            </div>
            <p className="text-lg md:text-xl text-foreground/60 leading-relaxed">
              {about.summary}
            </p>
            <div className="p-8 rounded-3xl bg-slate-900 border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/10 transition-colors" />
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Target className="w-6 h-6 text-primary" />
                Our Mission
              </h3>
              <p className="text-foreground/60 leading-relaxed italic">
                {about.mission}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-6"
          >
            <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 p-8 rounded-[2.5rem] relative">
              <h3 className="text-2xl font-bold mb-8">Company Objectives</h3>
              <div className="space-y-6">
                {about.objectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-foreground/70">{obj}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{about.values.title}</h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {about.values.items.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-[2.5rem] bg-slate-900 border border-white/5 hover:border-primary/20 transition-all text-center group"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                  {i === 0 ? <Users className="w-8 h-8 text-primary" /> : 
                   i === 1 ? <Lightbulb className="w-8 h-8 text-primary" /> : 
                   <ShieldCheck className="w-8 h-8 text-primary" />}
                </div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-foreground/50">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-12 md:p-20 rounded-[3rem] bg-primary text-background text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-extrabold mb-8 relative z-10">
            Ready to Build the Future in Your Tongue?
          </h2>
          <p className="text-lg md:text-xl font-medium mb-12 opacity-90 max-w-2xl mx-auto relative z-10">
            Join thousands of youths mastering technology without language barriers.
          </p>
          <div className="flex flex-wrap justify-center gap-6 relative z-10">
            <button className="bg-background text-primary px-10 py-5 rounded-2xl font-extrabold hover:scale-105 transition-all shadow-xl shadow-black/10">
              {t.hero.ctaStart}
            </button>
            <button className="bg-transparent border-2 border-background text-background px-10 py-5 rounded-2xl font-extrabold hover:bg-background hover:text-primary transition-all">
              {t.nav.contact}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutClient;
