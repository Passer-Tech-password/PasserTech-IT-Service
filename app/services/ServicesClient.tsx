"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { Code, Cloud, Headphones, Layout, Shield, Database } from "lucide-react";

const ServicesClient = () => {
  const { t } = useLanguage();

  const allServices = [
    {
      title: t.services.software,
      icon: Code,
      desc: "Custom software solutions tailored to your business needs. From enterprise systems to specialized tools.",
      features: ["Custom CRM", "ERP Solutions", "API Integrations"],
      color: "text-blue-500",
    },
    {
      title: t.services.cloud,
      icon: Cloud,
      desc: "Scalable cloud infrastructure and deployment strategies to keep your business running 24/7.",
      features: ["AWS/Azure Setup", "Docker & Kubernetes", "Cloud Migration"],
      color: "text-purple-500",
    },
    {
      title: t.services.itSupport,
      icon: Headphones,
      desc: "Reliable technical support and system maintenance for businesses of all sizes.",
      features: ["24/7 Monitoring", "Hardware Support", "Network Security"],
      color: "text-green-500",
    },
    {
      title: t.services.customApps,
      icon: Layout,
      desc: "Modern mobile and web applications built for growth and exceptional user experience.",
      features: ["React/Next.js", "Mobile Apps", "UI/UX Design"],
      color: "text-orange-500",
    },
    {
      title: "Cybersecurity",
      icon: Shield,
      desc: "Protecting your digital assets with advanced security protocols and threat detection.",
      features: ["Penetration Testing", "Security Audits", "Data Encryption"],
      color: "text-red-500",
    },
    {
      title: "Database Management",
      icon: Database,
      desc: "Optimizing your data storage and retrieval for maximum efficiency and speed.",
      features: ["SQL/NoSQL", "Data Backup", "Performance Tuning"],
      color: "text-yellow-500",
    },
  ];

  return (
    <div className="pt-32 pb-24">
      <section className="container mx-auto px-4 md:px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            Tech Solutions for <span className="text-primary">Global Impact</span>
          </h1>
          <p className="text-xl text-foreground/60 leading-relaxed">
            We combine technical excellence with local understanding to deliver
            world-class IT services that drive growth and innovation.
          </p>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allServices.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-slate-900 border border-white/5 hover:border-primary/20 transition-all group"
            >
              <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${service.color}`}>
                <service.icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-foreground/60 mb-8 leading-relaxed">
                {service.desc}
              </p>
              <ul className="space-y-3">
                {service.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-foreground/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ServicesClient;
