import {
  Baby,
  Bike,
  Brain,
  Languages,
  Palette,
  Sparkles,
  UsersRound,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

export const navItems = [
  { href: "#home", label: "Басты бет" },
  { href: "#about", label: "Біз туралы" },
  { href: "#groups", label: "Топтар" },
  { href: "#gallery", label: "Фотосуреттер" },
  { href: "#documents", label: "Құжаттар" },
  { href: "#contacts", label: "Байланыс" },
];

export const heroFacts = ["2–5 жас", "3 топ", "Қазақ тілі", "5 рет тамақтану"];

export type Stat = { icon: LucideIcon; value: string; label: string };

export const aboutStats: Stat[] = [
  { icon: Baby, value: "2–5 жас", label: "Балалардың жасы" },
  { icon: UsersRound, value: "3 топ", label: "Жас ерекшелігіне қарай" },
  { icon: Languages, value: "Қазақша", label: "Оқыту тілі" },
  { icon: UtensilsCrossed, value: "5 рет", label: "Күнделікті тамақтану" },
];

export type Group = {
  slug: string;
  name: string;
  level: string;
  text: string;
  /** Цветовая тема карточки */
  tone: "lime" | "lemon" | "mint";
};

export const groups: Group[] = [
  {
    slug: "balausa",
    name: "Балауса",
    level: "Кіші топ",
    text: "Балалардың жас ерекшелігіне сәйкес бейімделуге, алғашқы дағдыларды қалыптастыруға және қоршаған ортамен танысуға бағытталған топ.",
    tone: "mint",
  },
  {
    slug: "baldyrgan",
    name: "Балдырған",
    level: "Орта топ",
    text: "Балалардың сөйлеу, ойлау, шығармашылық және қарым-қатынас дағдыларын дамытуға арналған топ.",
    tone: "lemon",
  },
  {
    slug: "sultan",
    name: "Сұлтан",
    level: "Ересек топ",
    text: "Балалардың дербестігін, білімге деген қызығушылығын және мектепке дайындық дағдыларын дамытуға бағытталған топ.",
    tone: "lime",
  },
];

export const dailyActivities: { icon: LucideIcon; title: string }[] = [
  { icon: Palette, title: "Шығармашылық" },
  { icon: Brain, title: "Танымдық даму" },
  { icon: Bike, title: "Белсенді ойындар" },
  { icon: Sparkles, title: "Достық пен қарым-қатынас" },
];
