"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Key, Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";

import Image from "next/image";

import { languages, SupportedLanguage } from "@/lib/translations";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: "/" },
    { name: t.nav.about, href: "/about" },
    { name: t.nav.services, href: "/services" },
    { name: t.nav.academy, href: "/academy" },
    { name: t.nav.projects, href: "/projects" },
    { name: t.nav.blog, href: "/blog" },
    { name: t.nav.contact, href: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-white/10 py-2" : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-12 h-12 md:w-14 md:h-14 overflow-hidden rounded-xl">
              <Image
                src="/logo.png"
                alt="PasserTech Logo"
                fill
                className="object-cover group-hover:scale-110 transition-transform"
                priority
              />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Passer<span className="text-primary">Tech</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === link.href ? "text-primary" : "text-foreground/70"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4 border-l border-white/10 pl-8">
              <div className="relative">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-1.5 text-sm font-medium hover:text-primary transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  {languages.find((l) => l.code === language)?.name}
                </button>
                
                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-4 w-40 bg-slate-900 border border-white/10 rounded-xl overflow-hidden shadow-2xl"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code as SupportedLanguage);
                            setIsLangOpen(false);
                          }}
                          className={cn(
                            "w-full text-left px-4 py-3 text-sm hover:bg-white/5 transition-colors",
                            language === lang.code ? "text-primary font-bold" : "text-foreground/70"
                          )}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <Link
                href="/academy"
                className="bg-primary hover:bg-primary/90 text-background px-5 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95"
              >
                {t.nav.joinFree}
              </Link>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-background/95 backdrop-blur-xl" 
              onClick={() => setIsOpen(false)} 
            />
            
            {/* Menu Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-background border-l border-white/10 p-8 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between mb-12">
                <span className="text-xl font-bold">Menu</span>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-2xl font-bold transition-all hover:text-primary block py-2",
                        pathname === link.href ? "text-primary translate-x-2" : "text-foreground/70"
                      )}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto pt-8 flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as SupportedLanguage);
                        setIsOpen(false);
                      }}
                      className={cn(
                        "flex items-center justify-center gap-2 p-4 rounded-2xl border transition-all text-sm font-bold",
                        language === lang.code 
                          ? "bg-primary/10 border-primary text-primary" 
                          : "bg-white/5 border-transparent text-foreground/70"
                      )}
                    >
                      <Globe className="w-4 h-4" />
                      {lang.name}
                    </button>
                  ))}
                </div>
                <Link
                  href="/academy"
                  onClick={() => setIsOpen(false)}
                  className="bg-primary text-background text-center py-5 rounded-2xl font-extrabold text-xl shadow-lg shadow-primary/20 active:scale-95 transition-transform mt-4"
                >
                  {t.nav.joinFree}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
