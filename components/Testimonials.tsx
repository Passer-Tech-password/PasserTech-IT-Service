"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Quote, Star, Loader2 } from "lucide-center"; // Fixed icon library
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Fixed imports for Lucide icons
import { Quote as QuoteIcon, Star as StarIcon } from "lucide-react";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "testimonials"), orderBy("order", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTestimonials(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <section className="py-24 bg-slate-900/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">What People Say</h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Real stories from our students and clients across Nigeria.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-background border border-white/5 relative flex flex-col"
              >
                <QuoteIcon className="absolute top-8 right-8 w-10 h-10 text-primary/10" />
                <div className="flex gap-0.5 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <StarIcon key={j} className={`w-4 h-4 ${j < (t.rating || 5) ? "text-accent fill-accent" : "text-foreground/10"}`} />
                  ))}
                </div>
                <p className="text-foreground/70 mb-8 italic leading-relaxed">
                  "{t.text}"
                </p>
                <div className="mt-auto flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-white/5 border border-white/10">
                    {t.avatarUrl ? (
                      <img
                        src={t.avatarUrl}
                        alt={t.name}
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-foreground/20 bg-white/5">
                        <StarIcon className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold">{t.name}</h4>
                    <p className="text-xs text-primary font-semibold">{t.role}</p>
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

export default Testimonials;
