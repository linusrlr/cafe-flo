"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const images = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJFB4oPLgzq37n9OuoSJNUW0jXOUvTiAycEJldhZfLiTJFZZORD90way-3K15uzmpv_6SertSBJtKHmskcrmLUo-si2JGs70opl0PXEC2g7SncbESeXK1Exds80RUVsd8SaFgbbABMpUXrlPiOQCi1YG9PnIi6KaHXcaTlTc7vvaqjNiyfRMuvmQ4EVUOu8UAAPzxZWHQNDc9jUnD6caCYctM9VzYCxVZPtI84uO7LFzicsd1yP_d-uva1V3_DzfvzSYobSvHCC6I",
    alt: "Latte Art in einer Keramiktasse",
    className: "col-span-2 row-span-2",
    overlay: "Kaffeegenuss",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8blb6D4vBrcUKjsYWWJBBqsNsYP5Sco_52f7V1f7jqV6jEWiODoF6F5CTJ3a7fQV9FBNv1ywCsxLw2xcYUuIA6vWgX-qPvIfxEvTLc-djzVGESV_AdHq5JtsYgWSdxaHh2_jrHEFCJKHdR39Ak2I2h5z_07c4EN6CYGoI6LIhtg2mcOFjn3D8d2lmmu40Dx26Cj5a9XySzQloTuT803sQKcI3GmXH1L4_Dz1LkCetFVHwokp08u4MWlKyWwB8eiQgHj1QDwoz7HI",
    alt: "Gemütliche Café-Atmosphäre",
    className: "",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoM3TshjgDKs1zB7SaR6_AOvYTNKcAYZb-pMhS1IeyfP7ciiVDv9H3xf1El_5GFAXKcouYV-dlHHuIpE8t06Ep3UkZIWQZ_6XgxUzMoQQtLpDMaw6TBiDv2U0HNhoyXZMfTEajQNlu-TboTHrz-9vGwRiPtBE2zrXCIz4Nk6EY5HEiCvKAUJdcq4-b9sA5gIP-yEkhKKt8jvaEpdGVv32ErkREwIl2pUObvUOS5stqYt7bxgu-iEAEozQSGm-fl_W-UDMORXYSHGw",
    alt: "Brotauslage in der Bäckerei",
    className: "",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuADPsEdInF_6SaqMh8qYEedkRKNMrVXYCnPm4Rdjuz53SKtgtUWsXHGbejB0_q-CyI824dKCHnQReFdX-D43VexT8IgWGupk-zLiDgBrqSSK4KcBdAvYWWEeb3wSit9Uqvgo6X7siqJuXR4DfEGLuYblXZU8ks1ShpVqt_-f_Uc0iLlxrAT8dFrGw_cn8oezpVd8hBe1Gig-ajUAtAuZ6GPX2EGXhv0gU2XJN4NJnaf2_tVqJD4Jdpltaxg-Ml3aF2oEeQnCid7Eno",
    alt: "Freundliches Teammitglied",
    className: "col-span-1 row-span-2",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuARLP4J5KOYHX27FJ6kwzlLEIx1F7TRh3LRVVTVowt0iLcLMCuTHqK7DuTYmC32ADXfyx4om1DZUgyn1aSnDHtuS20xb2aoq7rLFyLcTClYKJ3Ui7kNaMy8hXjJ9X4CkcM3Wid0UXIQw6aDIFHWKSf9owQ9wx60hVws0TaZBX9ikFDzufVLyTMFNNzfYz9GYzs8z3yRgofUSRWCE8VijqRBPgoFkJPdlzL3mpbVHOusfG00aNBAvmKPs1wRDrN0alYFjrG58ln1Glo",
    alt: "Blättrige Croissant-Schichten",
    className: "",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA74YEIg7pR5e2jGR8fNyEpZzAeEu5_bmdnMztoNfCRroyIc04u0k1_xPUhrzMbDITJkwN3hbgQmAUNR8CW-Q81MMh_vxLOz7YsNRo8ZuaI-w4REvNyHrIhQyJKWLfgww3jYmH6_xhpEtq9dOU6ylmCJ4TwbPGnkDngGJG6rj1Dvp5RgMtnVGWwMd-MMKIu6phS0myvqrt1YGi9PuAhRAE5NzR51_WrblT47sAOQaNyV6YH2ogKddurD40wxmL52isPpypKVOzkfgM",
    alt: "Sonnenlicht auf dem Frühstückstisch",
    className: "col-span-2",
  },
];

export function Atmosphere() {
  return (
    <section className="py-24 bg-surface px-6 lg:px-8" id="atmosphaere">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-cafe-primary">
            Atmosphäre
          </h2>
          <div className="h-1 w-20 bg-cafe-secondary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative group overflow-hidden rounded-xl ${img.className}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes={
                  img.className.includes("col-span-2")
                    ? "(max-width: 768px) 100vw, 50vw"
                    : "(max-width: 768px) 50vw, 25vw"
                }
              />
              {img.overlay && (
                <div className="absolute inset-0 bg-cafe-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-serif text-xl">
                    {img.overlay}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
