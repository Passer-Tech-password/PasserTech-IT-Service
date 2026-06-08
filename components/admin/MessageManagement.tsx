"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  Trash2, 
  Loader2, 
  Mail, 
  User, 
  Clock, 
  CheckCircle2, 
  Circle,
  Search,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

const MessageManagement = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  useEffect(() => {
    const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleMarkAsRead = async (msg: any) => {
    if (msg.read) return;
    try {
      await updateDoc(doc(db, "contacts", msg.id), {
        read: true,
        readAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await deleteDoc(doc(db, "contacts", id));
      if (selectedMessage?.id === id) setSelectedMessage(null);
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const filteredMessages = messages.filter(msg => 
    msg.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    msg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.subject?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold">Contact Messages</h2>
          <p className="text-foreground/40 text-sm">View and manage inquiries from the contact form.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
          <input 
            type="text" 
            placeholder="Search messages..." 
            className="bg-background border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-primary transition-all w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-grow overflow-hidden">
          {/* List */}
          <div className="lg:col-span-1 bg-slate-900 border border-white/5 rounded-3xl overflow-hidden flex flex-col h-[600px]">
            <div className="p-4 border-b border-white/5 bg-white/[0.02]">
              <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Inbox ({messages.filter(m => !m.read).length} Unread)</span>
            </div>
            <div className="overflow-y-auto divide-y divide-white/5">
              {filteredMessages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => {
                    setSelectedMessage(msg);
                    handleMarkAsRead(msg);
                  }}
                  className={`w-full p-6 text-left hover:bg-white/[0.02] transition-colors group relative ${
                    selectedMessage?.id === msg.id ? "bg-primary/5" : ""
                  }`}
                >
                  {!msg.read && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                  )}
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-bold ${msg.read ? "text-foreground/40" : "text-primary"}`}>
                      {msg.name}
                    </span>
                    <span className="text-[10px] text-foreground/20">
                      {msg.createdAt?.seconds ? new Date(msg.createdAt.seconds * 1000).toLocaleDateString() : "Just now"}
                    </span>
                  </div>
                  <h4 className={`text-sm font-bold truncate mb-1 ${msg.read ? "text-foreground/60" : "text-foreground"}`}>
                    {msg.subject || "No Subject"}
                  </h4>
                  <p className="text-xs text-foreground/40 line-clamp-1">{msg.message}</p>
                </button>
              ))}
              {filteredMessages.length === 0 && (
                <div className="p-12 text-center text-foreground/20">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-10" />
                  <p className="text-sm font-medium">No messages found</p>
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-2 bg-slate-900 border border-white/5 rounded-3xl overflow-hidden flex flex-col h-[600px]">
            {selectedMessage ? (
              <div className="flex flex-col h-full">
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                      {selectedMessage.name?.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold">{selectedMessage.name}</h3>
                      <p className="text-xs text-foreground/40">{selectedMessage.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleDelete(selectedMessage.id)}
                      className="p-3 rounded-xl bg-white/5 hover:bg-red-500/10 text-foreground/40 hover:text-red-500 transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="p-8 overflow-y-auto flex-grow space-y-8">
                  <div>
                    <span className="text-[10px] font-bold text-foreground/20 uppercase tracking-widest block mb-2">Subject</span>
                    <h2 className="text-xl font-bold">{selectedMessage.subject || "Inquiry from website"}</h2>
                  </div>
                  
                  <div>
                    <span className="text-[10px] font-bold text-foreground/20 uppercase tracking-widest block mb-2">Message</span>
                    <p className="text-foreground/70 leading-relaxed whitespace-pre-wrap">
                      {selectedMessage.message}
                    </p>
                  </div>
                  
                  <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row gap-4">
                    <a 
                      href={`mailto:${selectedMessage.email}`}
                      className="flex-grow bg-primary text-background font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all"
                    >
                      <Mail className="w-5 h-5" />
                      Reply via Email
                    </a>
                  </div>
                </div>
                
                <div className="p-4 bg-white/[0.01] border-t border-white/5 text-[10px] text-foreground/20 flex justify-between">
                  <span>ID: {selectedMessage.id}</span>
                  <span>Received: {selectedMessage.createdAt?.seconds ? new Date(selectedMessage.createdAt.seconds * 1000).toLocaleString() : "Recently"}</span>
                </div>
              </div>
            ) : (
              <div className="flex-grow flex flex-col items-center justify-center text-center p-12">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                  <MessageSquare className="w-10 h-10 text-foreground/10" />
                </div>
                <h3 className="text-lg font-bold mb-2">Select a message</h3>
                <p className="text-sm text-foreground/40 max-w-xs">
                  Choose a conversation from the left to view full details and reply.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageManagement;
