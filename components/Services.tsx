"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { 
  Code, 
  Cloud, 
  Headphones, 
  Layout, 
  Shield, 
  Database, 
  Smartphone, 
  Globe, 
  Palette,
  Loader2
} from "lucide-react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

const iconMap: Record<string, any> = {
  Code, Cloud, Headphones, Layout, Shield, Database, Smartphone, Globe, Palette
};

const Services = () => {
  const { language, t } = useLanguage();
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "services"), orderBy("order", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setServices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-slate-900/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{t.services.title}</h2>
          <p className="text-sm md:text-base text-foreground/60 max-w-2xl mx-auto px-4">
            We provide top-tier IT services to help businesses thrive in the digital age,
            leveraging the latest technologies and best practices.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {services.map((service, i) => {
              const Icon = iconMap[service.iconName] || Code;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group p-6 md:p-8 rounded-3xl bg-background border border-white/5 hover:border-primary/20 transition-all hover:shadow-2xl hover:shadow-primary/5 flex flex-col items-center sm:items-start text-center sm:text-left"
                >
                  <div className={`w-14 h-14 rounded-2xl ${service.color}/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-7 h-7 ${service.color.replace('bg-', 'text-')}`} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-4">
                    {service.title?.[language] || service.title?.en}
                  </h3>
                  <p className="text-foreground/60 text-xs md:text-sm leading-relaxed mb-6">
                    {service.description?.[language] || service.description?.en}
                  </p>
                  <button className="mt-auto text-primary text-sm font-bold flex items-center gap-2 group-hover:translate-x-1 transition-transform bg-primary/5 px-4 py-2 rounded-xl hover:bg-primary hover:text-background">
                    Learn More <Code className="w-4 h-4" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
