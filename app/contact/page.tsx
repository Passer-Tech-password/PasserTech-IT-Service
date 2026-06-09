"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { Send, Phone, Mail, MapPin, MessageSquare } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with PasserTech IT Service for software development projects or academy enrollments.",
};

const ContactPage = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await addDoc(collection(db, "contacts"), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("error");
    }
  };

  return (
    <div className="pt-32 pb-24">
      <section className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-12"
            >
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
                Let's <span className="text-primary">Connect</span>
              </h1>
              <p className="text-xl text-foreground/60 leading-relaxed">
                Have a project in mind or want to join our academy? 
                We're here to help you build the future.
              </p>
            </motion.div>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Call Us</h4>
                  <p className="text-foreground/60">+234 9050 979 342</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Email Us</h4>
                  <p className="text-foreground/60">passertech.ent@gmail.com</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Visit Us</h4>
                  <p className="text-foreground/60">Awka,Anambar, Nigeria</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 md:p-12 rounded-3xl bg-slate-900 border border-white/5 shadow-2xl"
          >
            {status === "success" ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-foreground/60">
                  Daalụ! We'll get back to you as soon as possible.
                </p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="mt-8 text-primary font-bold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground/70">{t.contact.name}</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground/70">{t.contact.email}</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground/70">Subject</label>
                  <input
                    required
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground/70">{t.contact.message}</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>
                <button
                  disabled={status === "loading"}
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-background font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {status === "loading" ? "Sending..." : t.contact.send}
                  <Send className="w-5 h-5" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
