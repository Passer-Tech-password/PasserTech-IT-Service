"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface IDCardProps {
  children: React.ReactNode;
  className?: string;
}

export const IDCard = ({ children, className = "" }: IDCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className={`
        relative w-full max-w-sm lg:max-w-md overflow-hidden rounded-3xl shadow-2xl
        ${className}
      `}
    >
      {/* Glassmorphism Card */}
      <div className="
        relative z-10 p-6 md:p-8
      ">
        {children}
      </div>
    </motion.div>
  );
};
