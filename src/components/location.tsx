"use client";

import { motion } from "framer-motion";

const WHATSAPP_URL =
  "https://wa.me/4971145981882?text=Hallo%2C%20ich%20möchte%20gerne%20einen%20Tisch%20reservieren.%0AName%3A%20%0ADatum%3A%20%0AUhrzeit%3A%20%0APersonenanzahl%3A%20";

const MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2633.5!2d9.3058!3d48.7433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4799c4b7c8e7a1a3%3A0x0!2sBahnhofstra%C3%9Fe+28%2C+73728+Esslingen+am+Neckar!5e0!3m2!1sde!2sde!4v1700000000000!5m2!1sde!2sde";

export function Location() {
  return (
    <section
      className="py-24 bg-surface-container-low px-6 lg:px-8"
      id="standort"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="space-y-12"
          >
            <div className="space-y-4">
              <h2 className="font-serif text-4xl text-cafe-primary">
                Besuchen Sie uns
              </h2>
              <p className="text-on-surface-variant text-lg">
                Mitten im Herzen von Esslingen freuen wir uns auf Ihren Besuch.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Öffnungszeiten */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-cafe-secondary">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h4 className="font-bold uppercase tracking-widest text-sm">
                    Öffnungszeiten
                  </h4>
                </div>
                <ul className="space-y-2 text-on-surface-variant">
                  <li className="flex justify-between border-b border-outline-variant/30 pb-1">
                    <span>Mo - Fr</span>
                    <span>06:30 - 18:30 Uhr</span>
                  </li>
                  <li className="flex justify-between border-b border-outline-variant/30 pb-1">
                    <span>Samstag</span>
                    <span>06:30 - 17:00 Uhr</span>
                  </li>
                  <li className="flex justify-between border-b border-outline-variant/30 pb-1">
                    <span>Sonntag</span>
                    <span>08:00 - 17:00 Uhr</span>
                  </li>
                </ul>
              </div>

              {/* Kontakt */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-cafe-secondary">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <h4 className="font-bold uppercase tracking-widest text-sm">
                    Kontakt
                  </h4>
                </div>
                <div className="text-on-surface-variant space-y-1">
                  <p className="font-semibold">FLO Schwesterherz</p>
                  <p>Bahnhofstraße 28</p>
                  <p>73728 Esslingen</p>
                  <p className="pt-2">Tel: +49 711 45981882</p>
                </div>
              </div>
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 bg-[#25D366] text-white px-10 py-5 rounded-xl font-bold text-lg hover:shadow-lg transition-all hover:scale-[1.02]"
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Jetzt per WhatsApp reservieren
            </a>
          </motion.div>

          {/* Google Maps */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="h-[500px] w-full rounded-xl overflow-hidden shadow-sm"
          >
            <iframe
              src={MAPS_EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="FLO Schwesterherz Standort - Bahnhofstraße 28, Esslingen"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
