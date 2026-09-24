import { getGalleryPhotos } from "@/lib/images";
import { Cloud, Star } from "@/components/ui/Decor";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GalleryGrid } from "./GalleryGrid";

export function Gallery() {
  const photos = getGalleryPhotos();

  return (
    <section id="gallery" className="relative overflow-hidden bg-cream py-20 sm:py-28">
      <Cloud className="absolute top-12 right-[6%] w-28 text-white" />
      <Star className="absolute top-32 left-[5%] w-7 animate-float text-lemon-300" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Фотосуреттер"
          title="Балабақшадағы жарқын сәттер"
          subtitle="Балалардың күнделікті қызықты сәттері мен балабақшамыздың жылы атмосферасы."
        />
        <div className="mt-14">
          <GalleryGrid photos={photos} />
        </div>
      </div>
    </section>
  );
}
