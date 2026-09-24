import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

/**
 * Фотографии подхватываются из public/images автоматически — достаточно положить файл:
 *
 *   public/images/hero.jpg              — главное фото (если нет — берётся первое фото галереи)
 *   public/images/groups/balausa.jpg    — фото группы «Балауса» (также baldyrgan, sultan)
 *   public/images/food/*.jpg            — фото еды для блока «Тамақтану»
 *   public/images/daily/*.jpg           — фото для блока «Баланың әр күні» (если нет — из галереи)
 *   public/images/*.jpg                 — все остальные фото попадают в галерею
 *
 * Файлы сортируются по имени с учётом чисел: photo2 идёт раньше photo10.
 */

const PUBLIC_DIR = path.join(process.cwd(), "public");
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** CSS object-position — точка фокуса при обрезке. По умолчанию верхняя треть, чтобы не резать головы. */
  position: string;
};

/**
 * Необязательные настройки для конкретных фото: подпись и точка фокуса.
 * Пример: "/images/photo3.jpg": { alt: "Таңғы жаттығу", position: "50% 15%" }
 */
const imageOverrides: Record<string, Partial<Pick<Photo, "alt" | "position">>> = {};

const DEFAULT_POSITION = "50% 25%";

function readPhoto(src: string, alt: string): Photo | null {
  try {
    const buffer = fs.readFileSync(path.join(PUBLIC_DIR, src));
    const { width, height } = imageSize(buffer);
    if (!width || !height) return null;
    return { src, width, height, alt, position: DEFAULT_POSITION, ...imageOverrides[src] };
  } catch {
    return null;
  }
}

function listFiles(dir: string) {
  try {
    return fs
      .readdirSync(path.join(PUBLIC_DIR, dir), { withFileTypes: true })
      .filter((entry) => entry.isFile() && IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
  } catch {
    return [];
  }
}

function listPhotos(dir: string, altPrefix: string, exclude: (name: string) => boolean = () => false) {
  return listFiles(dir)
    .filter((name) => !exclude(name))
    .map((name, i) => readPhoto(`/${dir}/${name}`, `${altPrefix} — фото ${i + 1}`))
    .filter((photo): photo is Photo => photo !== null);
}

function findPhoto(dir: string, baseName: string, alt: string) {
  const file = listFiles(dir).find((name) => path.parse(name).name.toLowerCase() === baseName);
  return file ? readPhoto(`/${dir}/${file}`, alt) : null;
}

const isHero = (name: string) => path.parse(name).name.toLowerCase() === "hero";

export function getGalleryPhotos() {
  return listPhotos("images", "«Кәусар» балабақшасы", isHero);
}

export function getHeroPhoto() {
  return findPhoto("images", "hero", "«Кәусар» балабақшасындағы балалар") ?? getGalleryPhotos()[0] ?? null;
}

export function getGroupPhoto(slug: string, name: string, fallbackIndex: number) {
  return (
    findPhoto("images/groups", slug, `«${name}» тобы`) ??
    getGalleryPhotos()[fallbackIndex] ??
    null
  );
}

export function getFoodPhotos() {
  return listPhotos("images/food", "Балабақшадағы тамақтану");
}

export function getDailyPhotos() {
  const daily = listPhotos("images/daily", "Балабақшадағы күн");
  if (daily.length) return daily.slice(0, 3);
  const gallery = getGalleryPhotos();
  // Берём фото из середины галереи, чтобы не повторять hero и фото групп
  return gallery.length > 6 ? gallery.slice(4, 7) : gallery.slice(0, 3);
}
