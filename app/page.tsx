import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { About } from "@/components/sections/About";
import { Contacts } from "@/components/sections/Contacts";
import { DailyLife } from "@/components/sections/DailyLife";
import { Documents } from "@/components/sections/Documents";
import { Gallery } from "@/components/sections/Gallery";
import { Groups } from "@/components/sections/Groups";
import { Hero } from "@/components/sections/Hero";
import { Nutrition } from "@/components/sections/Nutrition";
import { Schedule } from "@/components/sections/Schedule";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Groups />
        <DailyLife />
        <Nutrition />
        <Gallery />
        <Schedule />
        <Documents />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
