/**
 * Основные данные сайта в одном месте.
 * Чтобы поменять телефон, адрес или ссылку — правьте значения здесь.
 */

export const site = {
  company: "ЖШС «АқАтам»",
  shortName: "«Кәусар»",
  name: "«Кәусар» бөбекжай балабақшасы",
  description:
    "«Кәусар» бөбекжай балабақшасы — Боралдайдағы 2–5 жастағы балаларға арналған қазақ тіліндегі балабақша. 3 топ, күніне 5 рет тамақтану, қамқор тәрбиешілер және қауіпсіз орта.",
  /** Домен сайта для SEO (canonical, Open Graph). Задайте через NEXT_PUBLIC_SITE_URL. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kausar.kz",
  phone: "+7 775 684 35 93",
  instagram: "https://www.instagram.com/p/DZJ-1qroaRT/?stkn=YjVydHllazg0ODZ6",
  region: "Алматы облысы, Іле ауданы",
  address:
    "Алматы облысы, Іле ауданы, Боралдай округы, Жайнақ ықшам ауданы, Ә. Молдағұлова көшесі, 8 үй",
  /** Поисковый запрос для ссылки на карту */
  mapQuery: "Боралдай, Жайнақ, Молдағұлова көшесі 8",
  hours: {
    workdays: "Дүйсенбі – Жұма",
    time: "07:20 – 18:00",
    weekend: "Сенбі – Жексенбі",
  },
} as const;

/** Ссылка вида tel:+77756843593 */
export const phoneHref = `tel:${site.phone.replace(/[^\d+]/g, "")}`;

export const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`;
