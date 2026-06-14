"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  const isStaffRoute = pathname?.startsWith("/staff");
  const isPrivateRoute = isAdminRoute || isStaffRoute;

  return (
    <>
      {!isPrivateRoute && <Navbar />}
      <main className={`flex-grow ${isPrivateRoute ? "p-0" : ""}`}>{children}</main>
      {!isPrivateRoute && <Footer />}
    </>
  );
}
