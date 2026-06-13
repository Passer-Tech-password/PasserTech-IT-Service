"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { Clock, GraduationCap, Users, Zap, Heart, Loader2, Globe, ArrowRight } from "lucide-react";
import JoinFreeClassModal from "@/components/JoinFreeClassModal";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

const AcademyClient = () => {
  const { language, t } = useLanguage();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null);

  const communities = [
    { id: "igbo", name: (t.academy as any).communities.igbo, color: "bg-orange-500" },
    { id: "hausa", name: (t.academy as any).communities.hausa, color: "bg-green-500" },
    { id: "yoruba", name: (t.academy as any).communities.yoruba, color: "bg-blue-500" },
    { id: "english", name: (t.academy as any).communities.english, color: "bg-purple-500" },
    { id: "pidgin", name: (t.academy as any).communities.pidgin, color: "bg-red-500" },
  ];

  useEffect(() => {
    const q = query(collection(db, "courses"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        setCourses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      },
      (error) => {
        console.log("Course snapshot error (likely permissions - normal when no courses yet):", error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleJoinCommunity = (communityId: string) => {
    setSelectedCommunity(communityId);
    // Save to local storage or session to persist the choice during registration
    localStorage.setItem("selectedCommunity", communityId);
    router.push("/academy/register");
  };

  if (!selectedCommunity) {
    return (
      <div className="pt-32 pb-24 bg-african-pattern min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
              {(t.academy as any).communityTitle}
            </h1>
            <p className="text-xl text-foreground/60">
              {(t.academy as any).communitySubtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {communities.map((community, i) => (
              <motion.div
                key={community.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-8 rounded-[2.5rem] bg-slate-900 border border-white/5 hover:border-primary/30 transition-all overflow-hidden text-center"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${community.color}/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:${community.color}/10 transition-colors`} />
                <div className={`w-16 h-16 ${community.color}/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                  <Globe className={`w-8 h-8 ${community.color.replace('bg-', 'text-')}`} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{community.name}</h3>
                <button
                  onClick={() => handleJoinCommunity(community.id)}
                  className={`w-full ${community.color} text-background font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95`}
                >
                  {(t.academy as any).joinCommunity}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24">
      {/* Hero Section */}
      <section className="container mx-auto px-4 md:px-6 mb-12 md:mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-widest mb-6">
            <Globe className="w-4 h-4" />
            {communities.find(c => c.id === selectedCommunity)?.name}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Learn Tech in Your <span className="text-primary">Mother Tongue</span>
          </h1>
          <p className="text-base md:text-xl text-foreground/60 leading-relaxed px-4">
            Breaking language barriers in tech education. We provide high-quality
            software engineering courses taught primarily in your chosen community language.
          </p>
        </motion.div>
      </section>

      {/* Courses Grid */}
      <section className="container mx-auto px-4 md:px-6 mb-24 md:mb-32">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {courses.map((course, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-900 border border-white/5 rounded-3xl overflow-hidden hover:border-primary/30 transition-all group flex flex-col"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={course.imageUrl || "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800"}
                    alt={course.title?.[language] || "Course Image"}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-primary text-background rounded-full text-xs font-bold shadow-lg">
                      {course.price}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold mb-4 min-h-[56px] line-clamp-2 group-hover:text-primary transition-colors">
                    {course.title?.[language] || course.title?.en}
                  </h3>
                  <div className="flex flex-col gap-3 mb-8 mt-auto">
                    <div className="flex items-center gap-2 text-sm text-foreground/50">
                      <Clock className="w-4 h-4 text-primary" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground/50">
                      <GraduationCap className="w-4 h-4 text-primary" />
                      {course.level}
                    </div>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-white/5 hover:bg-primary hover:text-background py-4 rounded-2xl font-bold transition-all border border-white/10 hover:border-primary active:scale-95 shadow-sm"
                  >
                    {t.academy.enroll}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Empowerment Section */}
      <section className="bg-slate-950 py-16 md:py-24 border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="space-y-6 md:space-y-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                Empowering <span className="text-accent">Marginalized Youths</span> for the Future
              </h2>
              <p className="text-base md:text-lg text-foreground/60 leading-relaxed">
                We empower marginalized youths to build global careers without language barriers — in Igbo, Hausa, Yoruba, and Pidgin.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Community Driven</h4>
                    <p className="text-xs text-foreground/50 leading-snug">Built by the community, for the community.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-accent/20 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Zap className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Fast Tracked</h4>
                    <p className="text-xs text-foreground/50 leading-snug">Intensive curriculum designed for real jobs.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/20 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Heart className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Scholarships</h4>
                    <p className="text-xs text-foreground/50 leading-snug">Free classes for those who need it most.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative mt-12 lg:mt-0 px-4 sm:px-0">
              <div className="aspect-square max-w-md mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000"
                  alt="Students learning"
                  className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute -bottom-6 -left-2 sm:-bottom-8 sm:-left-8 bg-primary p-6 sm:p-8 rounded-3xl shadow-2xl">
                <div className="text-3xl sm:text-4xl font-extrabold text-background mb-1">95%</div>
                <div className="text-background/80 font-bold text-xs sm:text-sm">Employment Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <JoinFreeClassModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default AcademyClient;
