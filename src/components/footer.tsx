const WHATSAPP_URL =
  "https://wa.me/4971145981882?text=Hallo%2C%20ich%20möchte%20gerne%20einen%20Tisch%20reservieren.%0AName%3A%20%0ADatum%3A%20%0AUhrzeit%3A%20%0APersonenanzahl%3A%20";

export function Footer() {
  return (
    <footer className="w-full py-12 border-t border-outline-variant/20 bg-surface-container-low">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="space-y-4">
          <span className="text-lg font-serif text-cafe-primary italic">
            FLO Schwesterherz
          </span>
          <p className="text-sm tracking-wide text-on-surface/60">
            &copy; {new Date().getFullYear()} FLO Schwesterherz. Handgefertigt
            mit Liebe.
          </p>
        </div>
        <div className="flex md:justify-center items-center gap-8">
          <a
            href="/impressum"
            className="text-sm tracking-wide text-on-surface/60 hover:text-cafe-primary transition-colors"
          >
            Impressum
          </a>
          <a
            href="/datenschutz"
            className="text-sm tracking-wide text-on-surface/60 hover:text-cafe-primary transition-colors"
          >
            Datenschutz
          </a>
        </div>
        <div className="flex md:justify-end items-center gap-8">
          <a
            href="#standort"
            className="text-sm tracking-wide text-on-surface/60 hover:text-cafe-primary transition-colors"
          >
            Kontakt
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm tracking-wide text-cafe-secondary underline opacity-80 hover:opacity-100 transition-opacity"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
