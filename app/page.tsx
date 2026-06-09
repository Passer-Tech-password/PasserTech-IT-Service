"use client";

import Hero from "@/components/Hero";
import Services from "@/components/Services";
import AcademyHighlight from "@/components/AcademyHighlight";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "PasserTech IT Service",
    "description": "Empowering marginalized youths to build global careers without language barriers in Igbo, Hausa, Yoruba, and Pidgin.",
    "url": "https://passertech.com",
    "logo": "https://passertech.com/logo.png",
    "sameAs": [
      "https://facebook.com/passertech",
      "https://twitter.com/passertech",
      "https://linkedin.com/company/passertech"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Enugu",
      "addressRegion": "EN",
      "addressCountry": "NG"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Services />
      <AcademyHighlight />
      <Portfolio />
      <Testimonials />
    </>
  );
}
