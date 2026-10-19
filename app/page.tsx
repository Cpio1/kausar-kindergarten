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
import { groups } from "@/lib/content";
import {
  getAboutPhoto,
  getDailyPhotos,
  getFoodPhotos,
  getGroupPhoto,
  getHeroPhoto,
  getShowcasePhotos,
} from "@/lib/images";

export default function HomePage() {
  // Фото читаются из public/images на сервере, а секции — клиентские (тексты переключаются по языку)
  const groupPhotos = groups.map((group, i) => getGroupPhoto(group.slug, group.name, i + 1));

  return (
    <>
      <Header />
      <main>
        <Hero photo={getHeroPhoto()} />
        <About photo={getAboutPhoto()} />
        <Groups photos={groupPhotos} />
        <DailyLife photos={getDailyPhotos()} />
        <Nutrition photos={getFoodPhotos().slice(0, 5)} />
        <Gallery photos={getShowcasePhotos()} />
        <Schedule />
        <Documents />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
