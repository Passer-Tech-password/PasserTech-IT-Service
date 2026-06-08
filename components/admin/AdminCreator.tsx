"use client";

import React, { useState } from "react";
import { doc, updateDoc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2, ShieldCheck, AlertCircle } from "lucide-react";

const AdminCreator = () => {
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const makeAdmin = async () => {
    if (!userId) return;
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        await updateDoc(userRef, {
          role: "admin",
          isApproved: true,
          updatedAt: serverTimestamp()
        });
        setMessage({ type: "success", text: `User ${userId} is now an Admin!` });
      } else {
        // Create the profile if it doesn't exist (useful for first-time setup)
        await setDoc(userRef, {
          uid: userId,
          role: "admin",
          isApproved: true,
          createdAt: serverTimestamp()
        });
        setMessage({ type: "success", text: `New Admin profile created for ${userId}!` });
      }
    } catch (error: any) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-slate-900 border border-white/10 rounded-3xl max-w-md">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <ShieldCheck className="w-6 h-6 text-primary" />
        Promote to Admin
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-foreground/40 uppercase mb-2">User UID</label>
          <input
            type="text"
            placeholder="Paste Firebase UID here"
            className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>

        {message.text && (
          <div className={`p-4 rounded-xl text-sm flex items-center gap-3 ${
            message.type === "success" ? "bg-primary/10 text-primary" : "bg-red-500/10 text-red-500"
          }`}>
            {message.type === "success" ? <ShieldCheck className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {message.text}
          </div>
        )}

        <button
          onClick={makeAdmin}
          disabled={loading || !userId}
          className="w-full bg-primary text-background font-bold py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 hover:bg-primary/90 transition-all"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Set Admin Role"}
        </button>
      </div>
    </div>
  );
};

export default AdminCreator;
