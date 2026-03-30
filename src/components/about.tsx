"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const sentence = "Handwerk, das man schmecken kann.";
const words = sentence.split(" ");

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section ref={sectionRef} className="py-32 bg-surface px-6 lg:px-8" id="ueber-uns">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-10 order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-block px-5 py-1.5 bg-cafe-secondary/10 text-cafe-secondary rounded-full tracking-[0.2em] text-xs uppercase font-bold"
            >
              Seit Generationen
            </motion.div>

            {/* Word-by-word heading */}
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cafe-primary leading-[1.15]">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block mr-[0.25em]"
                >
                  {word}
                </motion.span>
              ))}
            </h2>

            <div className="text-lg text-on-surface-variant leading-relaxed space-y-6">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Bei FLO Schwesterherz verschmilzt die Leidenschaft für
                traditionelle Backkunst mit moderner Kaffeekultur. In der 3.
                Generation bewahren wir das Erbe unserer Familie und
                interpretieren es jeden Tag neu.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.65, duration: 0.6 }}
              >
                Jedes Brot, das unsere Backstube verlässt, hatte die Zeit, die
                es braucht. Lange Teigführung, regionale Zutaten und echte
                Handarbeit sind für uns keine Trends, sondern ein Versprechen an
                unsere Gäste.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="font-serif italic text-xl text-cafe-primary/80 border-l-2 border-cafe-secondary pl-6"
              >
                &ldquo;Unsere Liebe zum Detail ist die wichtigste Zutat in jedem
                Rezept.&rdquo;
              </motion.p>
            </div>
          </motion.div>

          {/* Images with parallax */}
          <div ref={imgRef} className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-5 gap-4"
            >
              {/* Main image with parallax */}
              <div className="col-span-3 relative rounded-2xl overflow-hidden shadow-2xl shadow-cafe-primary/10 h-[400px] md:h-[520px]">
                <motion.div className="absolute inset-0 h-[120%] -top-[10%]" style={{ y: imgY }}>
                  <Image
                    src="https://images.unsplash.com/flagged/photo-1561668038-2742fcef75d7?w=800&q=80"
                    alt="Bäcker knetet Teig mit den Händen"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 60vw, 30vw"
                  />
                </motion.div>
              </div>

              {/* Side column */}
              <div className="col-span-2 flex flex-col gap-4">
                <div className="relative rounded-2xl overflow-hidden shadow-xl h-[250px] md:h-[330px]">
                  <Image
                    src="https://images.unsplash.com/photo-1426174840074-541ae41efdb9?w=600&q=80"
                    alt="Latte Art Kaffee"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 40vw, 20vw"
                  />
                </div>
                <div className="flex-1 bg-gradient-to-br from-cafe-secondary/10 to-cafe-primary/5 rounded-2xl flex items-center justify-center min-h-[140px]">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="text-cafe-secondary/30"
                  >
                    <svg className="w-14 h-14" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
