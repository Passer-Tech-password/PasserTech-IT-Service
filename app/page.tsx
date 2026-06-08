"use client";

import Hero from "@/components/Hero";
import Services from "@/components/Services";
import AcademyHighlight from "@/components/AcademyHighlight";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <AcademyHighlight />
      <Portfolio />
      <Testimonials />
    </>
  );
}
