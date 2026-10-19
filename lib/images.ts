import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

/**
 * Фотографии подхватываются из public/images автоматически — достаточно положить файл:
 *
 *   public/images/main-page.jpg         — главное фото (можно и public/main-page.jpg; запасной вариант — hero.jpg,
 *                                         а если нет и его — первое фото галереи)
 *   public/images/main-page2.jpg        — фото для блока «Кәусар балабақшасы туралы» (необязательно)
 *   public/images/groups/balausa.jpg    — фото группы «Балауса» (также baldyrgan, sultan)
 *   public/images/food/*.jpg            — фото еды для блока «Тамақтану»
 *   public/images/daily/*.jpg           — фото для блока «Баланың әр күні» (если нет — из галереи)
 *   public/images/*.jpg                 — все остальные фото попадают в галерею
 *
 * Файлы сортируются по имени с учётом чисел: photo2 идёт раньше photo10.
 * Одинаковые по содержимому файлы в галерею попадают один раз.
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
  /** CSS object-fit: "contain" для коллажей, которые нельзя обрезать */
  fit: "cover" | "contain";
};

/**
 * Необязательные настройки для конкретных фото: подпись и точка фокуса.
 * Пример: "/images/photo3.jpg": { alt: "Таңғы жаттығу", position: "50% 15%" }
 */
const imageOverrides: Record<string, Partial<Pick<Photo, "alt" | "position" | "fit">>> = {
  // Вывеска справа — сдвигаем кадр, чтобы она целиком попала в вертикальную рамку
  "/main-page.jpeg": { alt: "«Кәусар» бөбекжай балабақшасының ғимараты", position: "97% 50%" },
  "/images/image3.jpeg": { fit: "contain" },
  "/images/image6.jpeg": { position: "50% 65%" },
  "/images/image9.jpeg": { position: "50% 45%" },
  "/images/image10.jpeg": { fit: "contain" },
  "/images/image11.jpeg": { position: "50% 80%" },
  "/images/image12.jpeg": { position: "50% 55%" },
  "/images/image13.jpeg": { position: "50% 45%" },
};

/**
 * Порядок фото в разделе «Фотосуреттер»: первые 5 видны сразу, остальные — по кнопке «Тағы көру».
 * Фото, которых нет в списке, идут следом по имени файла.
 */
const galleryOrder = [
  "image9", "image12", "image2", "image8", "image13",
  "image11", "image10", "image1", "image4", "image5",
  "image7", "image6", "image3",
];

const DEFAULT_POSITION = "50% 25%";

function readPhoto(src: string, alt: string): Photo | null {
  try {
    const buffer = fs.readFileSync(path.join(PUBLIC_DIR, src));
    const { width, height } = imageSize(buffer);
    if (!width || !height) return null;
    return { src, width, height, alt, position: DEFAULT_POSITION, fit: "cover", ...imageOverrides[src] };
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

/** dir — путь внутри public; пустая строка — сам public */
function findPhoto(dir: string, baseName: string, alt: string) {
  const file = listFiles(dir).find((name) => baseNameOf(name) === baseName);
  return file ? readPhoto(`/${dir ? `${dir}/` : ""}${file}`, alt) : null;
}

const baseNameOf = (name: string) => path.parse(name).name.toLowerCase();

const SPECIAL_PHOTOS = new Set(["hero", "main-page", "main-page2"]);

function fileHash(src: string) {
  try {
    return crypto.createHash("md5").update(fs.readFileSync(path.join(PUBLIC_DIR, src))).digest("hex");
  } catch {
    return src;
  }
}

export function getGalleryPhotos() {
  const seen = new Set<string>();
  return listPhotos("images", "«Кәусар» балабақшасы", (name) => SPECIAL_PHOTOS.has(baseNameOf(name))).filter(
    (photo) => {
      const hash = fileHash(photo.src);
      if (seen.has(hash)) return false;
      seen.add(hash);
      return true;
    },
  );
}

/** Фото для раздела «Фотосуреттер» в порядке galleryOrder */
export function getShowcasePhotos() {
  const rank = (photo: Photo) => {
    const i = galleryOrder.indexOf(baseNameOf(photo.src));
    return i === -1 ? galleryOrder.length : i;
  };
  // sort стабилен — фото вне списка сохраняют порядок по имени
  return [...getGalleryPhotos()].sort((a, b) => rank(a) - rank(b));
}

export function getHeroPhoto() {
  const alt = "«Кәусар» балабақшасы";
  return (
    findPhoto("images", "main-page", alt) ??
    findPhoto("", "main-page", alt) ??
    findPhoto("images", "hero", "«Кәусар» балабақшасындағы балалар") ??
    getGalleryPhotos()[0] ??
    null
  );
}

export function getAboutPhoto() {
  const alt = "«Кәусар» балабақшасы";
  return findPhoto("images", "main-page2", alt) ?? findPhoto("", "main-page2", alt);
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
