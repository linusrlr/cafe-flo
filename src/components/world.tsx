"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const cards = [
  {
    title: "Bäckerei",
    description:
      "Ehrliches Brot mit Charakter. Wir setzen auf lange Fermentation und Rohstoffe aus der Region für unvergleichlichen Geschmack.",
    tags: ["Sauerteig", "Regional"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAhQWHut-nOO6hmE9txmVg21vdBIuipIGKVffSQmn1oEq-KvHmPbMW1eohqpEmTTGB5Sa4NIQQeNZd0sC9Yhm4Zd-PJ-rV3qJI4lnYBHpK_jSKseRX-ZVZTx520-ZlYzy20_Y4SoeVFqgmRwKj3GfJDQDtvQv_1UIgg5Vq1m1uTcy1DnfeAfaM8WdrdGorvWNNPRYHAGfwN6JocnNwsmVmq5Q4iKqrvHY7BvSmFt1jrBfeO7IZdNKyrWbk8PvqKWpLF-qCtUXJS0ik",
    alt: "Verschiedene Brotsorten auf einem rustikalen Holzregal",
  },
  {
    title: "Frühstück",
    description:
      'Unser beliebtes "Etageren-Frühstück" bietet alles, was das Herz begehrt. Von ofenwarmen Brötchen bis zu feinsten Aufstrichen.',
    tags: ["Etageren", "Gemütlich"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBNUEleHy8fUKmc_iai0N0lkR-KdeHlEDue4T3vvtU6_7XStl_ZSvU7iKprvDw0FNBoF0HRLqOPuA1L_gD5VmJum9SChKmToGAoL7sRlnde37qrJZJhyO-hi5Hv2yjIueb6_8nf-yCHfqealMEU9p0WZRn0ruRveLpkpHH3LisOinmmQS4VFVNDYLkhmBcsaMg1pW-WVhTMTc4tqz-CQyY7zwe4zlhK3ZVFAZPfo9K_saHFQ5fodh1x94G7nTXQtW10fYcPmO_njic",
    alt: "Elegantes Frühstücksangebot mit Croissants und Marmeladen",
  },
  {
    title: "Torten & Patisserie",
    description:
      "Täglich frisch: Von der veganen Birnentorte bis zu unseren legendären Zimtschnecken – süße Sünden in höchster Qualität.",
    tags: ["Vegan", "Hausgemacht"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCrkDzenmnwLM6shWUwN1VyZDi_6H81yunBs4Hu4GMHx_QCWBBaprZu7jkz9P2uMMDa9-EMIDjRpY6hWduM5dAmhFC67XcT3zjuil9Qjaq-GH1iGAqAM9QT6qDRAlBuTl3H-G7LH5BLlIISbfBzCSfeJp4dMmPxeSwbiqm3orGcBSdCOSYZj6W38FDD8ZCDHv_ym3fw_ZN4_CMZCfZOmup5H588rIN3L-hc4RQDNjrKD4EGRikeSvLRJq1nreo3S5cT2BSo1PQzBBE",
    alt: "Exquisite Torten und Gebäck",
  },
];

export function World() {
  return (
    <section
      className="py-24 bg-surface-container-low px-6 lg:px-8"
      id="unsere-welt"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-cafe-primary">
            Unsere Genusswelt
          </h2>
          <div className="h-1 w-20 bg-cafe-secondary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm group hover:shadow-xl transition-all duration-500"
            >
              <div className="h-72 overflow-hidden relative">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-8 space-y-4">
                <h3 className="font-serif text-2xl text-cafe-primary">
                  {card.title}
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  {card.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-surface-container text-xs font-bold rounded-full text-cafe-primary uppercase tracking-tighter"
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
