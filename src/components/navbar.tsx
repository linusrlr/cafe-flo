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
    const onScroll = () => setScrolled(window.scrollY > 20);
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
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 h-20 ${
        scrolled
          ? "bg-surface/90 backdrop-blur-md shadow-sm"
          : "bg-surface/85 backdrop-blur-md"
      }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 lg:px-8 h-full">
        <a
          href="#"
          className="text-2xl font-serif italic text-cafe-primary tracking-tight"
        >
          FLO Schwesterherz
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-serif font-medium text-lg text-on-surface/70 pb-1 hover:text-cafe-secondary transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 bg-gradient-to-r from-cafe-primary to-cafe-primary-container text-white px-8 py-3 rounded-xl font-semibold shadow-sm hover:opacity-90 transition-transform active:scale-95"
        >
          <svg
            className="w-5 h-5"
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
          Tisch reservieren
        </a>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menü öffnen"
        >
          <span
            className={`block w-6 h-0.5 bg-cafe-primary transition-transform duration-300 ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-cafe-primary transition-opacity duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-cafe-primary transition-transform duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-20 left-0 w-full bg-surface/95 backdrop-blur-xl shadow-lg border-t border-outline-variant/20"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-serif text-lg text-on-surface/70 hover:text-cafe-secondary transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-cafe-primary to-cafe-primary-container text-white px-8 py-3 rounded-xl font-semibold mt-2"
              >
                Tisch reservieren
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
