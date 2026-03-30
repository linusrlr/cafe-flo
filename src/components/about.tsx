"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function About() {
  return (
    <section className="py-24 bg-surface px-6 lg:px-8" id="ueber-uns">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="space-y-8 order-2 lg:order-1"
          >
            <div className="inline-block px-4 py-1 bg-cafe-secondary-container/20 text-cafe-secondary rounded-full tracking-widest text-xs uppercase font-bold">
              Seit Generationen
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-cafe-primary leading-tight">
              Handwerk, das man schmecken kann.
            </h2>
            <div className="text-lg text-on-surface-variant leading-relaxed space-y-6">
              <p>
                Bei FLO Schwesterherz verschmilzt die Leidenschaft für
                traditionelle Backkunst mit moderner Kaffeekultur. In der 3.
                Generation bewahren wir das Erbe unserer Familie und
                interpretieren es jeden Tag neu.
              </p>
              <p>
                Jedes Brot, das unsere Backstube verlässt, hatte die Zeit, die
                es braucht. Lange Teigführung, regionale Zutaten und echte
                Handarbeit sind für uns keine Trends, sondern ein Versprechen an
                unsere Gäste.
              </p>
              <p className="font-serif italic text-xl text-cafe-primary">
                &ldquo;Unsere Liebe zum Detail ist die wichtigste Zutat in jedem
                Rezept.&rdquo;
              </p>
            </div>
          </motion.div>

          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 gap-4 order-1 lg:order-2"
          >
            <div className="space-y-4 pt-12">
              <div className="relative rounded-xl overflow-hidden shadow-sm h-[350px]">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjRCzkHfoxEYSfogNG9zG2FSiHhnVtZUpFDzMK3lvlAR-JDdAWMUbfd-EEgSg5-Zhww7gcqwnTKyswtijF5oWaw3SNnki-awqELYlrYfKc_5kT5LvSfOvYxXQrYn50-guSjenkJrvdq24cm7J64nL9Zu-Dy796sh8Aa1yKZCpJPxhA2qPCmgva1vtG42IVspsLs1kMaHyeUIp6vfXs3isoGv6NvF0ItDHK_LACWpNDUb6ukotD95_SXmY_2qTRiiaLynzqUhn5sXM"
                  alt="Gemütliches Bäckerei-Interieur"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="h-40 bg-cafe-secondary-container/10 rounded-xl flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-cafe-secondary opacity-30"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
            </div>
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden shadow-sm h-[500px]">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBW2opZr1NuYk4ICaJ75uqDIRcwlxOHKY_0qyV0Go2Tam82T-VFpXV42l02M5uMsxvgbnynEFlch4LqernpQdP0Wn8mjN_vp4wW05YV8cTSevjVhO71Db3ydfv9Kd6V3ATIhlKF9ZScJlwoW8pfD6mTNKPFlrHjtSjx7D2w7AkRc4-PM40APnAGIYmDkBIpBw5AOjFw6bHbeY1r2uUoAUZiBF8QThmPRXOaMQ4lMkNd2AkbJPVUEftZJ1QIJ68WoiFpeTUNd5LeWPU"
                  alt="Bäckerhände kneten Teig"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
