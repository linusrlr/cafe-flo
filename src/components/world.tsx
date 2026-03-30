"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const cards = [
  {
    title: "Bäckerei",
    description:
      "Ehrliches Brot mit Charakter. Wir setzen auf lange Fermentation und Rohstoffe aus der Region für unvergleichlichen Geschmack.",
    tags: ["Sauerteig", "Regional"],
    image: "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=800&q=80",
    alt: "Frische Brotlaibe in der Bäckereiauslage",
  },
  {
    title: "Frühstück",
    description:
      'Unser beliebtes "Etageren-Frühstück" bietet alles, was das Herz begehrt. Von ofenwarmen Brötchen bis zu feinsten Aufstrichen.',
    tags: ["Etageren", "Gemütlich"],
    image: "https://images.unsplash.com/photo-1563438962385-0d3dd8319200?w=800&q=80",
    alt: "Europäisches Frühstück mit Brötchen und Aufschnitt",
  },
  {
    title: "Torten & Patisserie",
    description:
      "Täglich frisch: Von der veganen Birnentorte bis zu unseren legendären Zimtschnecken – süße Sünden in höchster Qualität.",
    tags: ["Vegan", "Hausgemacht"],
    image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800&q=80",
    alt: "Dekorierte Torte aus der Patisserie",
  },
];

export function World() {
  return (
    <section
      className="py-32 bg-surface-container-low px-6 lg:px-8"
      id="unsere-welt"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20 space-y-5"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cafe-primary">
            Unsere Genusswelt
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-[2px] w-20 bg-cafe-secondary mx-auto origin-center"
          />
          <p className="text-on-surface-variant text-lg max-w-xl mx-auto">
            Entdecken Sie, was FLO Schwesterherz so besonders macht.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 50, rotateY: -5 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="glass-card rounded-2xl overflow-hidden group cursor-pointer shadow-lg shadow-black/[0.04] hover:shadow-2xl hover:shadow-cafe-primary/10 transition-shadow duration-500"
            >
              <div className="h-72 overflow-hidden relative">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-8 space-y-4">
                <h3 className="font-serif text-2xl text-cafe-primary group-hover:text-gradient transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-on-surface-variant leading-relaxed text-[15px]">
                  {card.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-1.5 bg-cafe-primary/5 text-xs font-bold rounded-full text-cafe-primary uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
