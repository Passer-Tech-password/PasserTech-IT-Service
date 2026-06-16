"use client";

import React from "react";

export const CourseManagerDashboard = () => {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold">Course Manager Dashboard</h1>
        <p className="text-foreground/60">Create, update, and manage all PasserTech courses.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-white/5 rounded-3xl p-6">
          <h3 className="text-foreground/60 text-sm font-medium mb-2">Total Courses</h3>
          <p className="text-3xl font-bold">12</p>
        </div>
        <div className="bg-slate-900 border border-white/5 rounded-3xl p-6">
          <h3 className="text-foreground/60 text-sm font-medium mb-2">Published</h3>
          <p className="text-3xl font-bold">8</p>
        </div>
        <div className="bg-slate-900 border border-white/5 rounded-3xl p-6">
          <h3 className="text-foreground/60 text-sm font-medium mb-2">Draft</h3>
          <p className="text-3xl font-bold">4</p>
        </div>
      </div>

      {/* Course List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">All Courses</h2>
          <button className="px-4 py-2 bg-primary text-background rounded-xl font-medium">+ New Course</button>
        </div>
        <div className="space-y-4">
          {["HTML & CSS in Igbo", "Python for Beginners", "JavaScript Fundamentals", "Cloud Computing"].map((course, i) => (
            <div key={i} className="bg-slate-900 border border-white/5 rounded-3xl p-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">{course}</h3>
                <p className="text-foreground/60 text-sm">Published • 42 students</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-white/5 text-white rounded-xl font-medium">Edit</button>
                <button className="px-4 py-2 bg-red-500/10 text-red-500 rounded-xl font-medium">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
