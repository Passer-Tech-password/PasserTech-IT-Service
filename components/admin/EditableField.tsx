"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { Save, Loader2, Globe } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { SupportedLanguage, languages } from "@/lib/translations";

interface EditableFieldProps {
  label: string;
  section: string;
  field: string;
  initialValues: Record<SupportedLanguage, string>;
  onSave?: () => void;
}

const EditableField: React.FC<EditableFieldProps> = ({ 
  label, 
  section, 
  field, 
  initialValues,
  onSave 
}) => {
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [activeLang, setActiveLang] = useState<SupportedLanguage>("en");

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, "siteContent", section);
      await updateDoc(docRef, {
        [field]: values
      });
      if (onSave) onSave();
    } catch (error) {
      console.error("Error updating content:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <label className="text-sm font-bold text-foreground/50 uppercase tracking-wider">{label}</label>
        <div className="flex gap-2 bg-background p-1 rounded-lg">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setActiveLang(lang.code as SupportedLanguage)}
              className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase transition-all ${
                activeLang === lang.code ? "bg-primary text-background" : "text-foreground/40 hover:text-foreground"
              }`}
            >
              {lang.code}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {field.includes("subtitle") || field.includes("desc") ? (
          <textarea
            className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors min-h-[100px] text-sm"
            value={values[activeLang]}
            onChange={(e) => setValues({ ...values, [activeLang]: e.target.value })}
          />
        ) : (
          <input
            type="text"
            className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm"
            value={values[activeLang]}
            onChange={(e) => setValues({ ...values, [activeLang]: e.target.value })}
          />
        )}

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="flex items-center gap-2 bg-primary/10 hover:bg-primary text-primary hover:text-background px-4 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save {languages.find(l => l.code === activeLang)?.name} Version
        </button>
      </div>
    </div>
  );
};

export default EditableField;
