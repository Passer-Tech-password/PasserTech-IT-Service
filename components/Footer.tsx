"use client";

import React from "react";
import Link from "next/link";
import { Key, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

import Image from "next/image";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-12 h-12 overflow-hidden rounded-lg">
                <Image
                  src="/logo.png"
                  alt="PasserTech Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Passer<span className="text-primary">Tech</span>
              </span>
            </Link>
            <p className="text-foreground/60 text-sm leading-relaxed">
              Empowering marginalized youths to build global careers without language barriers — in Igbo, Hausa, Yoruba, and Pidgin.
            </p>
            <div className="flex items-center gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-background transition-all"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {[t.nav.home, t.nav.services, t.nav.academy, t.nav.projects, t.nav.blog].map((link, i) => (
                <li key={i}>
                  <Link href="#" className="text-foreground/60 hover:text-primary transition-colors text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6">Services</h3>
            <ul className="space-y-4">
              {[t.services.software, t.services.cloud, t.services.itSupport, t.services.customApps].map((service, i) => (
                <li key={i}>
                  <Link href="#" className="text-foreground/60 hover:text-primary transition-colors text-sm">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-foreground/60">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>Enugu, Nigeria</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground/60">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+234 800 123 4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground/60">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>hello@passertech.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-foreground/40">
          <p>© {new Date().getFullYear()} PasserTech IT Service. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
