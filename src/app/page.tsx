import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { World } from "@/components/world";
import { Atmosphere } from "@/components/atmosphere";
import { Location } from "@/components/location";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <World />
        <Atmosphere />
        <Location />
      </main>
      <Footer />
    </>
  );
}
