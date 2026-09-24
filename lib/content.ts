import {
  Apple,
  Baby,
  Bike,
  Brain,
  HeartHandshake,
  Languages,
  Lightbulb,
  Palette,
  ShieldCheck,
  Sparkles,
  UserRound,
  UsersRound,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

export const navItems = [
  { href: "#home", label: "Басты бет" },
  { href: "#about", label: "Біз туралы" },
  { href: "#groups", label: "Топтар" },
  { href: "#advantages", label: "Артықшылықтар" },
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

export type Feature = { icon: LucideIcon; title: string; text: string };

export const advantages: Feature[] = [
  {
    icon: UserRound,
    title: "Жеке көзқарас",
    text: "Әр баланың мінезі, қызығушылығы мен даму ерекшеліктерін ескереміз.",
  },
  {
    icon: Lightbulb,
    title: "Дамытушы сабақтар",
    text: "Балалардың ойлау, сөйлеу, шығармашылық және танымдық қабілеттерін дамытуға көмектесеміз.",
  },
  {
    icon: Apple,
    title: "5 рет тамақтану",
    text: "Балаларға күн бойы құнарлы әрі теңгерімді тамақ ұсынылады.",
  },
  {
    icon: HeartHandshake,
    title: "Қамқор тәрбиешілер",
    text: "Балаларға мейірімділікпен және үлкен жауапкершілікпен қараймыз.",
  },
  {
    icon: Languages,
    title: "Қазақ тіліндегі тәрбие",
    text: "Балалардың ана тілінде еркін сөйлеп, ұлттық құндылықтарды бойына сіңіруіне жағдай жасаймыз.",
  },
  {
    icon: ShieldCheck,
    title: "Қауіпсіз және жайлы орта",
    text: "Балалардың күнделікті өзін еркін әрі қауіпсіз сезінуіне ерекше мән береміз.",
  },
];

export const dailyActivities: { icon: LucideIcon; title: string }[] = [
  { icon: Palette, title: "Шығармашылық" },
  { icon: Brain, title: "Танымдық даму" },
  { icon: Bike, title: "Белсенді ойындар" },
  { icon: Sparkles, title: "Достық пен қарым-қатынас" },
];
