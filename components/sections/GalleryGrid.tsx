"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, X } from "lucide-react";
import type { Photo } from "@/lib/images";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";

/** Сколько фото видно до нажатия «Тағы көру»: на компьютере и планшете — 5, на телефоне — 4 */
const INITIAL_COUNT = 5;
const INITIAL_COUNT_MOBILE = 4;

type Tile = { span: string; shape: string; size: "big" | "wide" | "small" };

/** Мягкие «органические» формы для обычных плиток — чередуются по кругу */
const smallShapes = [
  "rounded-[1.5rem] rounded-br-[3rem] sm:rounded-[2rem] sm:rounded-br-[5rem]",
  "rounded-[2rem_1rem] sm:rounded-[3rem_1.25rem]",
  "rounded-[1.5rem] rounded-t-[3.5rem] sm:rounded-[2rem] sm:rounded-t-[6rem]",
  "rounded-[1.5rem] rounded-tr-[3rem] sm:rounded-[2rem] sm:rounded-tr-[5rem]",
];
const wideShape = "rounded-[1.5rem] rounded-bl-[3rem] sm:rounded-[2.5rem] sm:rounded-bl-[6rem]";

/**
 * С sm фото раскладываются блоками по 5: крупная плитка 2×2 + четыре обычные. Такой блок ровно заполняет
 * сетку и на планшете (2 колонки), и на компьютере (4 колонки); в нечётных блоках крупное фото справа.
 * Неполный последний блок собирается из широких плиток, чтобы в сетке не оставалось дыр.
 * На телефоне все плитки одного размера в 2 колонки — ряды чередуют высоту (см. gridClass).
 */
function tileLayout(index: number, total: number): Tile {
  const block = Math.floor(index / 5);
  const pos = index % 5;
  const blockSize = Math.min(5, total - block * 5);
  const mirrored = block % 2 === 1;
  const small: Tile = { span: "", shape: smallShapes[(index + block) % smallShapes.length], size: "small" };
  const wide: Tile = { span: "sm:col-span-2", shape: wideShape, size: "wide" };
  const big: Tile = {
    span: cn("sm:col-span-2 sm:row-span-2", mirrored && "lg:col-start-3"),
    shape: mirrored
      ? "rounded-[1.5rem] rounded-tr-[3rem] sm:rounded-[2.5rem] sm:rounded-tr-[8rem]"
      : "rounded-[1.5rem] rounded-tl-[3rem] sm:rounded-[2.5rem] sm:rounded-tl-[8rem]",
    size: "big",
  };

  if (blockSize === 5 || blockSize === 4) {
    if (pos === 0) return big;
    return blockSize === 4 && pos === 3 ? wide : small;
  }
  if (blockSize === 3) return pos === 0 ? wide : small;
  if (blockSize === 2) return wide;
  return { ...wide, span: "sm:col-span-2 lg:col-start-2" };
}

const tileSizes = {
  big: "(min-width: 1024px) 600px, (min-width: 640px) 100vw, 50vw",
  wide: "(min-width: 1024px) 600px, (min-width: 640px) 100vw, 50vw",
  small: "(min-width: 1024px) 300px, 50vw",
};

const placeholderSpans = ["col-span-2 row-span-2", "row-span-2", "", "", "col-span-2", "row-span-2", "", ""];

export function GalleryGrid({ photos }: { photos: Photo[] }) {
  const { t } = useI18n();
  const [active, setActive] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const gridRef = useRef<HTMLUListElement>(null);

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
    // На телефоне ряды чередуют высоту: почти квадрат и чуть ниже — без вертикальных плиток, чтобы не резать лица
    "grid grid-flow-row-dense auto-rows-[9.75rem_8.25rem] grid-cols-2 gap-2.5 sm:auto-rows-[13rem] sm:gap-4 lg:auto-rows-[12.5rem] lg:grid-cols-4 lg:gap-5";

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
        <p className="mt-6 text-center font-semibold text-ink-soft">{t.gallery.empty}</p>
      </div>
    );
  }

  const current = active === null ? null : photos[active];
  const altOf = (i: number) => t.gallery.photoAlt(i + 1);
  const visible = expanded ? photos : photos.slice(0, INITIAL_COUNT);

  const toggle = () => {
    // При сворачивании возвращаемся к началу галереи, чтобы не остаться ниже неё
    if (expanded) gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setExpanded(!expanded);
  };

  return (
    <>
      <ul ref={gridRef} id="gallery-grid" className={cn(gridClass, "scroll-mt-28")}>
        {visible.map((photo, i) => {
          const tile = tileLayout(i, visible.length);
          return (
            <Reveal
              as="li"
              key={photo.src}
              delay={(i % 5) * 70}
              className={cn(
                "relative",
                tile.span,
                // Телефон: до раскрытия видно 4 фото; нечётное последнее фото растягиваем на обе колонки
                !expanded && i >= INITIAL_COUNT_MOBILE && "max-sm:hidden",
                expanded && i === visible.length - 1 && visible.length % 2 === 1 && "max-sm:col-span-2 max-sm:row-span-2",
              )}
            >
              {tile.size === "big" && (
                <span
                  aria-hidden
                  className={cn("absolute inset-0 hidden translate-x-3 translate-y-3 bg-lemon-200 sm:block", tile.shape)}
                />
              )}
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`${t.gallery.zoom}: ${altOf(i)}`}
                className={cn(
                  "group relative block size-full overflow-hidden bg-lime-50 shadow-soft ring-4 ring-white transition duration-300 hover:shadow-lift",
                  tile.shape,
                )}
              >
                <Image
                  src={photo.src}
                  alt={altOf(i)}
                  fill
                  sizes={tileSizes[tile.size]}
                  className={cn(
                    "transition duration-700 ease-out group-hover:scale-[1.05]",
                    photo.fit === "contain" ? "object-contain" : "object-cover",
                  )}
                  style={{ objectPosition: photo.position }}
                />
                <span className="absolute inset-0 bg-linear-to-t from-ink/25 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
              </button>
            </Reveal>
          );
        })}
      </ul>

      {photos.length > INITIAL_COUNT_MOBILE && (
        <div className={cn("mt-6 flex justify-center sm:mt-10", photos.length <= INITIAL_COUNT && "sm:hidden")}>
          <button
            type="button"
            onClick={toggle}
            aria-expanded={expanded}
            aria-controls="gallery-grid"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-2.5 text-[0.9375rem] font-extrabold sm:py-3 sm:text-[0.95rem] text-ink shadow-soft ring-1 ring-lime-200 transition duration-300 hover:-translate-y-0.5 hover:ring-lime-300 sm:w-auto"
          >
            {expanded ? t.gallery.showLess : t.gallery.showMore}
            {expanded ? <ChevronUp className="size-4 text-lime-600" /> : <ChevronDown className="size-4 text-lime-600" />}
          </button>
        </div>
      )}

      {/* Просмотр фото целиком, без обрезки */}
      {current && active !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={altOf(active)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/85 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <div className="relative h-[80vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image src={current.src} alt={altOf(active)} fill sizes="100vw" className="object-contain" />
          </div>

          <button
            type="button"
            onClick={close}
            aria-label={t.gallery.close}
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
                aria-label={dir === -1 ? t.gallery.prev : t.gallery.next}
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
