"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";
import type { Photo } from "@/lib/images";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { Cloud, Leaf, Sun } from "./Decor";

type PhotoFrameProps = {
  photo: Photo | null;
  /** Подпись фото на текущем языке; по умолчанию — photo.alt */
  alt?: string;
  /** Значение атрибута sizes для next/image */
  sizes: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  /** Подпись заглушки, пока фото не добавлено */
  placeholderLabel?: string;
  tone?: "lime" | "lemon" | "mint";
};

const toneStyles = {
  lime: "from-lime-100 via-lime-50 to-lemon-50 text-lime-600",
  lemon: "from-lemon-100 via-lemon-50 to-milk text-lemon-400",
  mint: "from-mint-100 via-mint-50 to-lime-50 text-lime-500",
};

/**
 * Фото с заполнением контейнера (object-cover + корректный object-position).
 * Если фото ещё не добавлено в public/images — показывает аккуратную иллюстрированную заглушку.
 */
export function PhotoFrame({
  photo,
  alt,
  sizes,
  className,
  imageClassName,
  priority,
  placeholderLabel,
  tone = "lime",
}: PhotoFrameProps) {
  const { t } = useI18n();
  const placeholder = placeholderLabel ?? t.photo.placeholder;
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {photo ? (
        <Image
          src={photo.src}
          alt={alt ?? photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(photo.fit === "contain" ? "object-contain" : "object-cover", imageClassName)}
          style={{ objectPosition: photo.position }}
        />
      ) : (
        <div className={cn("absolute inset-0 bg-linear-to-br", toneStyles[tone])} role="img" aria-label={placeholder}>
          <Sun className="absolute -right-6 -top-6 w-28 text-lemon-300/80" />
          <Cloud className="absolute bottom-6 left-4 w-24 text-white/80" />
          <Leaf className="absolute bottom-10 right-8 w-10 rotate-12 opacity-60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-ink-soft/60">
            <ImageIcon className="size-8" strokeWidth={1.5} />
            {placeholderLabel && <span className="px-4 text-center text-sm font-semibold">{placeholderLabel}</span>}
          </div>
        </div>
      )}
    </div>
  );
}
