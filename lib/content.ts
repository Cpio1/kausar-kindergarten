import {
  Apple,
  Baby,
  Bike,
  Brain,
  Carrot,
  Languages,
  Palette,
  Soup,
  Sparkles,
  UsersRound,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

/** Структура сайта без текстов — сами тексты лежат в lib/i18n (kz.ts, ru.ts). */

export const navItems = [
  { href: "#home", key: "home" },
  { href: "#about", key: "about" },
  { href: "#groups", key: "groups" },
  { href: "#gallery", key: "gallery" },
  { href: "#documents", key: "documents" },
  { href: "#contacts", key: "contacts" },
] as const;

/** Иконки карточек «Біз туралы» — по порядку t.about.stats */
export const aboutStatIcons: LucideIcon[] = [Baby, UsersRound, Languages, UtensilsCrossed];

export type GroupSlug = "balausa" | "baldyrgan" | "sultan";

export type Group = {
  slug: GroupSlug;
  /** Официальное название группы — одинаково на обоих языках */
  name: string;
  /** Значок в бейдже уровня группы */
  emoji: string;
  /** Цветовая тема карточки */
  tone: "lime" | "lemon" | "mint";
};

export const groups: Group[] = [
  { slug: "balausa", name: "Балауса", emoji: "🧸", tone: "mint" },
  { slug: "baldyrgan", name: "Балғын", emoji: "🎨", tone: "lemon" },
  { slug: "sultan", name: "Сұлтан", emoji: "🎓", tone: "lime" },
];

/** Иконки блока «Баланың әр күні» — по порядку t.daily.activities */
export const dailyActivityIcons: LucideIcon[] = [Palette, Brain, Bike, Sparkles];

/** Иконки блока «Тамақтану» — по порядку t.nutrition.highlights */
export const nutritionIcons: LucideIcon[] = [Soup, Carrot, Apple];
