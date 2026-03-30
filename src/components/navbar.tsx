"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_URL =
  "https://wa.me/4971145981882?text=Hallo%2C%20ich%20möchte%20gerne%20einen%20Tisch%20reservieren.%0AName%3A%20%0ADatum%3A%20%0AUhrzeit%3A%20%0APersonenanzahl%3A%20";

const navLinks = [
  { href: "#ueber-uns", label: "Über uns" },
  { href: "#unsere-welt", label: "Unsere Welt" },
  { href: "#atmosphaere", label: "Atmosphäre" },
  { href: "#standort", label: "Standort" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 h-20 ${
        scrolled
          ? "bg-white/70 backdrop-blur-xl shadow-lg shadow-black/[0.03]"
          : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 lg:px-8 h-full">
        <a
          href="#"
          className={`text-2xl font-serif italic tracking-tight transition-colors duration-500 ${
            scrolled ? "text-cafe-primary" : "text-white"
          }`}
        >
          FLO Schwesterherz
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className={`relative font-sans font-medium text-[15px] tracking-wide pb-1 transition-colors duration-300 group ${
                scrolled ? "text-on-surface/70 hover:text-cafe-primary" : "text-white/80 hover:text-white"
              }`}
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-cafe-secondary group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </div>

        {/* CTA Button */}
        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`hidden md:flex items-center gap-2 px-7 py-2.5 rounded-full font-semibold text-sm transition-all duration-500 hover:scale-[1.03] active:scale-[0.97] ${
            scrolled
              ? "bg-cafe-primary text-white shadow-md hover:shadow-lg"
              : "bg-white/15 backdrop-blur-md border border-white/25 text-white hover:bg-white/25"
          }`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Reservieren
        </motion.a>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 relative z-50"
          aria-label="Menü öffnen"
        >
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              mobileOpen
                ? "rotate-45 translate-y-2 bg-cafe-primary"
                : scrolled ? "bg-cafe-primary" : "bg-white"
            }`}
          />
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              mobileOpen
                ? "opacity-0"
                : scrolled ? "bg-cafe-primary" : "bg-white"
            }`}
          />
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              mobileOpen
                ? "-rotate-45 -translate-y-2 bg-cafe-primary"
                : scrolled ? "bg-cafe-primary" : "bg-white"
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at top right)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed inset-0 top-0 bg-surface/98 backdrop-blur-2xl z-40"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="font-serif text-3xl text-cafe-primary hover:text-cafe-secondary transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-cafe-primary text-white px-10 py-4 rounded-full font-semibold mt-4"
              >
                Tisch reservieren
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
