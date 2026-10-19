"use client";

import { useI18n } from "@/lib/i18n/LanguageProvider";
import type { Photo } from "@/lib/images";
import { Cloud, Star } from "@/components/ui/Decor";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GalleryGrid } from "./GalleryGrid";

export function Gallery({ photos }: { photos: Photo[] }) {
  const { t } = useI18n();

  return (
    <section id="gallery" className="relative overflow-hidden bg-cream py-12 sm:py-28 lg:py-20">
      <Cloud className="absolute top-12 right-[6%] hidden w-28 text-white sm:block lg:w-20" />
      <Star className="absolute top-32 left-[5%] hidden w-7 animate-float text-lemon-300 sm:block" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.gallery.eyebrow}
          title={t.gallery.title}
          subtitle={t.gallery.subtitle}
        />
        <div className="mt-6 sm:mt-14 lg:mt-10">
          <GalleryGrid photos={photos} />
        </div>
      </div>
    </section>
  );
}
