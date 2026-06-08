"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

import { useContent } from "@/lib/ContentContext";

const Hero = () => {
  const { language, t } = useLanguage();
  const { content } = useContent();

  const title = content?.hero?.title?.[language] || t.hero.title;
  const subtitle = content?.hero?.subtitle?.[language] || t.hero.subtitle;

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-african-pattern">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-semibold mb-6">
              🚀 Empowering the Next Generation
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight">
              {title.split(".")[0]}.
              {title.split(".")[1] && (
                <span className="text-primary block mt-2">{title.split(".")[1]}</span>
              )}
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 mb-10 max-w-2xl leading-relaxed">
              {subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/academy"
                className="bg-primary hover:bg-primary/90 text-background px-8 py-5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 text-lg"
              >
                {t.hero.ctaStart}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/services"
                className="bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 text-lg"
              >
                {t.hero.ctaHire}
              </Link>
            </div>
          </motion.div>

          {/* Stats/Trust */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 border-t border-white/5 pt-12"
          >
            {[
              { label: "Students Trained", value: "500+" },
              { label: "Projects Completed", value: "120+" },
              { label: "Expert Mentors", value: "15+" },
              { label: "Igbo Tech Courses", value: "10+" },
            ].map((stat, i) => (
              <div key={i} className="text-center sm:text-left">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-xs md:text-sm text-foreground/50 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating Elements (Visual Decoration) */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="hidden lg:block absolute top-1/3 right-[10%] w-64 h-64 border border-white/5 rounded-3xl rotate-12 -z-10"
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="hidden lg:block absolute bottom-[20%] right-[15%] w-32 h-32 border-2 border-primary/20 rounded-full border-dashed -z-10"
      />
    </section>
  );
};

export default Hero;
