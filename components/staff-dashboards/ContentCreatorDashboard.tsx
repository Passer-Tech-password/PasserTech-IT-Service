"use client";

import React from "react";

export const ContentCreatorDashboard = () => {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold">Content Creator Dashboard</h1>
        <p className="text-foreground/60">Create and manage educational content in multiple languages.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-white/5 rounded-3xl p-6">
          <h3 className="text-foreground/60 text-sm font-medium mb-2">Total Lessons</h3>
          <p className="text-3xl font-bold">120</p>
        </div>
        <div className="bg-slate-900 border border-white/5 rounded-3xl p-6">
          <h3 className="text-foreground/60 text-sm font-medium mb-2">Pending Review</h3>
          <p className="text-3xl font-bold">10</p>
        </div>
        <div className="bg-slate-900 border border-white/5 rounded-3xl p-6">
          <h3 className="text-foreground/60 text-sm font-medium mb-2">Languages Supported</h3>
          <p className="text-3xl font-bold">4</p>
        </div>
      </div>

      {/* Content Management */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Content Management</h2>
          <button className="px-4 py-2 bg-primary text-background rounded-xl font-medium">+ Create Content</button>
        </div>
        <div className="space-y-4">
          {[
            { title: "Flexbox Layouts - Igbo", status: "Published", language: "Igbo" },
            { title: "Loops in Python - Hausa", status: "Review", language: "Hausa" },
            { title: "DOM Manipulation - Yoruba", status: "Draft", language: "Yoruba" },
          ].map((item, i) => (
            <div key={i} className="bg-slate-900 border border-white/5 rounded-3xl p-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-foreground/60 text-sm">Language: {item.language} • Status: {item.status}</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-white/5 text-white rounded-xl font-medium">Edit</button>
                {item.status === "Draft" && (
                  <button className="px-4 py-2 bg-primary text-background rounded-xl font-medium">Submit for Review</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
