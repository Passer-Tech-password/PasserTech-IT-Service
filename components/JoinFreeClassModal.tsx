"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const JoinFreeClassModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "HTML & CSS in Igbo",
    experience: "Beginner",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await addDoc(collection(db, "enrollments"), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      setStatus("success");
      setTimeout(() => {
        onClose();
        setStatus("idle");
        setFormData({ name: "", email: "", course: "HTML & CSS in Igbo", experience: "Beginner" });
      }, 3000);
    } catch (error) {
      console.error("Error submitting enrollment:", error);
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {status === "success" ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Registration Successful!</h3>
                <p className="text-foreground/60">
                  Daalụ! We've received your enrollment. Check your email for next steps.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">Join Our Free Class</h3>
                  <p className="text-foreground/60">
                    Fill out the form below to secure your spot in our next cohort.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground/70">Full Name</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground/70">Email Address</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground/70">Select Course</label>
                    <select
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors appearance-none"
                    >
                      <option>HTML & CSS in Igbo</option>
                      <option>Python in Igbo</option>
                      <option>Web Development for Beginners</option>
                    </select>
                  </div>

                  <button
                    disabled={status === "loading"}
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-background font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {status === "loading" ? "Processing..." : "Submit Registration"}
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default JoinFreeClassModal;
