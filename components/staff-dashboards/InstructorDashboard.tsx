"use client";

import React from "react";

export const InstructorDashboard = () => {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold">Instructor Dashboard</h1>
        <p className="text-foreground/60">Manage your courses and engage with your students.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-white/5 rounded-3xl p-6">
          <h3 className="text-foreground/60 text-sm font-medium mb-2">Total Students</h3>
          <p className="text-3xl font-bold">105</p>
        </div>
        <div className="bg-slate-900 border border-white/5 rounded-3xl p-6">
          <h3 className="text-foreground/60 text-sm font-medium mb-2">Active Courses</h3>
          <p className="text-3xl font-bold">3</p>
        </div>
        <div className="bg-slate-900 border border-white/5 rounded-3xl p-6">
          <h3 className="text-foreground/60 text-sm font-medium mb-2">Upcoming Lessons</h3>
          <p className="text-3xl font-bold">5</p>
        </div>
      </div>

      {/* My Courses */}
      <div>
        <h2 className="text-xl font-bold mb-4">My Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["HTML & CSS in Igbo", "Python for Beginners", "JavaScript Fundamentals"].map((course, i) => (
            <div key={i} className="bg-slate-900 border border-white/5 rounded-3xl p-6 hover:border-primary/20 transition-all">
              <h3 className="text-xl font-bold mb-2">{course}</h3>
              <p className="text-foreground/60 text-sm mb-4">42 students enrolled</p>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-primary text-background rounded-xl font-medium">View Course</button>
                <button className="px-4 py-2 bg-white/5 text-white rounded-xl font-medium">Manage Students</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
