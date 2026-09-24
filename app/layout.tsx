import type { Metadata, Viewport } from "next";
import { Montserrat, Nunito } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

// Кириллица + cyrillic-ext нужны для казахских букв (ә, ғ, қ, ң, ө, ұ, ү, һ, і)
const nunito = Nunito({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-nunito",
  display: "swap",
});

// Шрифт заголовков: полностью поддерживает казахскую кириллицу (ә ғ қ ң ө ұ ү һ і и заглавные)
const montserrat = Montserrat({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const title = "«Кәусар» бөбекжай балабақшасы — Боралдай, Іле ауданы";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: "%s | «Кәусар» балабақшасы",
  },
  description: site.description,
  keywords: [
    "Кәусар балабақшасы",
    "Кәусар бөбекжай",
    "балабақша Боралдай",
    "балабақша Іле ауданы",
    "қазақ тілді балабақша",
    "жеке балабақша Алматы облысы",
    "детский сад Боралдай",
    "детский сад Кәусар",
  ],
  applicationName: site.name,
  authors: [{ name: site.company }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "kk_KZ",
    url: "/",
    siteName: site.name,
    title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  themeColor: "#fffdf6",
  width: "device-width",
  initialScale: 1,
};

// Структурированные данные для поисковиков
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Preschool",
  name: site.name,
  legalName: site.company,
  description: site.description,
  url: site.url,
  telephone: site.phone,
  sameAs: [site.instagram],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ә. Молдағұлова көшесі, 8 үй, Жайнақ ықшам ауданы",
    addressLocality: "Боралдай",
    addressRegion: "Алматы облысы, Іле ауданы",
    addressCountry: "KZ",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "07:20",
    closes: "18:00",
  },
  inLanguage: "kk",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="kk" className={`${nunito.variable} ${montserrat.variable}`}>
      <body className="font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
