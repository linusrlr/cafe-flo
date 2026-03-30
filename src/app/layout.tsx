import type { Metadata } from "next";
import { Noto_Serif, Manrope } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "600", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FLO Schwesterherz | Bäckerei & Café in Esslingen",
  description:
    "Handwerk & Tradition seit 3 Generationen. Brotkultur & Kaffeeglück in Esslingen am Neckar. Bäckerei, Frühstück, Torten & Patisserie.",
  keywords: [
    "Bäckerei Esslingen",
    "Café Esslingen",
    "FLO Schwesterherz",
    "Frühstück Esslingen",
    "Sauerteigbrot",
    "Patisserie",
  ],
  openGraph: {
    title: "FLO Schwesterherz | Bäckerei & Café in Esslingen",
    description:
      "Handwerk & Tradition seit 3 Generationen. Brotkultur & Kaffeeglück in Esslingen am Neckar.",
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${notoSerif.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
