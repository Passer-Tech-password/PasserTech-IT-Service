"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { GraduationCap, Clock, BookOpen, Star } from "lucide-react";
import Link from "next/link";

const AcademyHighlight = () => {
  const { t } = useLanguage();

  const courses = [
    {
      title: t.academy.courses.html,
      level: "Beginner",
      duration: "4 Weeks",
      students: "120+",
      image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: t.academy.courses.python,
      level: "Beginner",
      duration: "6 Weeks",
      students: "85+",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: t.academy.courses.webDev,
      level: "Intermediate",
      duration: "8 Weeks",
      students: "60+",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800",
    },
  ];

  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-primary font-bold mb-4">
              <GraduationCap className="w-6 h-6" />
              <span>Academy</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">{t.academy.title}</h2>
            <p className="text-foreground/60 text-lg">
              {t.academy.subtitle} We empower marginalized youths to build global careers without language barriers.
            </p>
          </div>
          <Link
            href="/academy"
            className="text-primary font-bold flex items-center gap-2 hover:underline underline-offset-8"
          >
            View All Courses <BookOpen className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {courses.map((course, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-slate-900 border border-white/5 rounded-3xl overflow-hidden hover:border-primary/30 transition-all flex flex-col"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-background/80 backdrop-blur-md rounded-full text-xs font-bold text-primary">
                    {course.level}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors line-clamp-2">
                  {course.title}
                </h3>
                <div className="flex items-center gap-4 text-xs md:text-sm text-foreground/50 mb-8 mt-auto">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-primary" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-accent" />
                    {course.students} Students
                  </div>
                </div>
                <button className="w-full bg-primary/10 hover:bg-primary text-primary hover:text-background py-4 rounded-2xl font-bold transition-all active:scale-95">
                  {t.academy.enroll}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AcademyHighlight;
