"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Photo } from "@/lib/images";
import { cn } from "@/lib/cn";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Размер плитки подбирается по ориентации фото, чтобы обрезка была минимальной:
 * горизонтальные — шире, вертикальные — выше, а каждое 5-е фото — крупная плитка 2×2.
 */
function tileSpan(photo: Photo, index: number) {
  const ratio = photo.width / photo.height;
  if (index % 5 === 0) return "col-span-2 row-span-2";
  if (ratio > 1.25) return "col-span-2";
  if (ratio < 0.85) return "row-span-2";
  return "";
}

const placeholderSpans = ["col-span-2 row-span-2", "row-span-2", "", "", "col-span-2", "row-span-2", "", ""];

export function GalleryGrid({ photos }: { photos: Photo[] }) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setActive((i) => (i === null ? i : (i + dir + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, step]);

  const gridClass =
    "grid grid-flow-row-dense auto-rows-[9.5rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] sm:gap-4 md:grid-cols-3 lg:auto-rows-[13.5rem] lg:grid-cols-4";

  if (!photos.length) {
    return (
      <div>
        <ul className={gridClass}>
          {placeholderSpans.map((span, i) => (
            <li key={i} className={span}>
              <PhotoFrame
                photo={null}
                tone={(["lime", "lemon", "mint"] as const)[i % 3]}
                sizes="25vw"
                className="h-full rounded-[1.75rem]"
              />
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center font-semibold text-ink-soft">Фотосуреттер жақында қосылады</p>
      </div>
    );
  }

  const current = active === null ? null : photos[active];

  return (
    <>
      <ul className={gridClass}>
        {photos.map((photo, i) => (
          <Reveal as="li" key={photo.src} delay={(i % 4) * 70} className={tileSpan(photo, i)}>
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Фотоны үлкейту: ${photo.alt}`}
              className="group relative block size-full overflow-hidden rounded-[1.75rem] bg-lime-50 shadow-soft"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 50vw, (min-width: 768px) 66vw, 100vw"
                className="object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
                style={{ objectPosition: photo.position }}
              />
              <span className="absolute inset-0 bg-linear-to-t from-ink/25 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
            </button>
          </Reveal>
        ))}
      </ul>

      {/* Просмотр фото целиком, без обрезки */}
      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/85 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <div className="relative h-[80vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
          </div>

          <button
            type="button"
            onClick={close}
            aria-label="Жабу"
            className="absolute top-4 right-4 grid size-12 place-items-center rounded-full bg-white/90 text-ink transition hover:bg-white"
          >
            <X className="size-5" />
          </button>
          {photos.length > 1 &&
            ([-1, 1] as const).map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(dir);
                }}
                aria-label={dir === -1 ? "Алдыңғы фото" : "Келесі фото"}
                className={cn(
                  "absolute top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink transition hover:bg-white",
                  dir === -1 ? "left-3 sm:left-6" : "right-3 sm:right-6",
                )}
              >
                {dir === -1 ? <ChevronLeft className="size-6" /> : <ChevronRight className="size-6" />}
              </button>
            ))}
        </div>
      )}
    </>
  );
}
