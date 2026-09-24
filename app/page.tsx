import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { About } from "@/components/sections/About";
import { Advantages } from "@/components/sections/Advantages";
import { Contacts } from "@/components/sections/Contacts";
import { DailyLife } from "@/components/sections/DailyLife";
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
        <Advantages />
        <DailyLife />
        <Nutrition />
        <Gallery />
        <Schedule />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
