"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const images = [
  {
    src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80",
    alt: "Latte Art in einer Keramiktasse",
    className: "col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80",
    alt: "Gemütliche Café-Atmosphäre",
    className: "",
  },
  {
    src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
    alt: "Kaffeetasse auf einem Holztisch",
    className: "",
  },
  {
    src: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=600&q=80",
    alt: "Frische Croissants aus der Backstube",
    className: "col-span-1 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=600&q=80",
    alt: "Rustikales Brot frisch aus dem Ofen",
    className: "",
  },
  {
    src: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&q=80",
    alt: "Sonnenlicht im Café",
    className: "col-span-2",
  },
];

function ParallaxImage({ src, alt, className }: { src: string; alt: string; className: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`relative group overflow-hidden rounded-2xl ${className}`}
    >
      <motion.div className="absolute inset-0 h-[115%] -top-[7.5%]" style={{ y }}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes={
            className.includes("col-span-2")
              ? "(max-width: 768px) 100vw, 50vw"
              : "(max-width: 768px) 50vw, 25vw"
          }
        />
      </motion.div>
      <div className="absolute inset-0 bg-cafe-primary/0 group-hover:bg-cafe-primary/15 transition-colors duration-500" />
    </motion.div>
  );
}

export function Atmosphere() {
  return (
    <section className="py-32 bg-surface px-6 lg:px-8" id="atmosphaere">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20 space-y-5"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cafe-primary">
            Atmosphäre
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-[2px] w-20 bg-cafe-secondary mx-auto origin-center"
          />
          <p className="text-on-surface-variant text-lg max-w-xl mx-auto">
            Ein Ort zum Wohlfühlen, Genießen und Verweilen.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[240px]">
          {images.map((img, i) => (
            <ParallaxImage key={i} {...img} />
          ))}
        </div>
      </div>
    </section>
  );
}
