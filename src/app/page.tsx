import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { World } from "@/components/world";
import { Atmosphere } from "@/components/atmosphere";
import { Location } from "@/components/location";
import { Footer } from "@/components/footer";
import { WaveDivider } from "@/components/wave-divider";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WaveDivider fill="#fdf8f5" bg="transparent" />
        <About />
        <WaveDivider fill="#f8f3f0" bg="#fdf8f5" />
        <World />
        <WaveDivider fill="#fdf8f5" bg="#f8f3f0" />
        <Atmosphere />
        <WaveDivider fill="#f8f3f0" bg="#fdf8f5" />
        <Location />
      </main>
      <Footer />
    </>
  );
}
