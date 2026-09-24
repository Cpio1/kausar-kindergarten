"use client";

import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { navItems } from "@/lib/content";
import { phoneHref, site } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Logo } from "./Logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Блокируем прокрутку страницы, пока открыто мобильное меню
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full px-3 py-2 transition-all duration-500 sm:px-4",
          scrolled || open ? "bg-milk/90 shadow-soft ring-1 ring-lime-100 backdrop-blur-md" : "bg-transparent",
        )}
      >
        <a href="#home" onClick={close} aria-label="«Кәусар» — басты бет" className="rounded-2xl pl-1">
          <Logo />
        </a>

        <nav aria-label="Негізгі мәзір" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-3.5 py-2 text-[0.93rem] font-bold whitespace-nowrap text-ink-soft transition hover:bg-lime-100 hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contacts"
            className="hidden rounded-full bg-lime-400 px-5 py-3 text-sm font-extrabold text-ink shadow-[0_10px_24px_-12px_rgb(111_150_42/0.8)] transition hover:-translate-y-0.5 hover:bg-lime-300 sm:inline-flex"
          >
            Бізбен байланысу
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Мәзірді жабу" : "Мәзірді ашу"}
            className="grid size-11 place-items-center rounded-full bg-white text-ink shadow-soft ring-1 ring-lime-100 xl:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      <div
        id="mobile-menu"
        className={cn(
          "mx-auto mt-2 max-w-7xl origin-top overflow-hidden rounded-[2rem] bg-milk/95 shadow-lift ring-1 ring-lime-100 backdrop-blur-md transition-all duration-300 xl:hidden",
          open ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0",
        )}
      >
        <nav aria-label="Мобильді мәзір" className="p-4">
          <ul className="grid gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={close}
                  tabIndex={open ? 0 : -1}
                  className="block rounded-2xl px-4 py-3 text-lg font-bold text-ink transition hover:bg-lime-100"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <a
              href="#contacts"
              onClick={close}
              tabIndex={open ? 0 : -1}
              className="rounded-full bg-lime-400 px-5 py-3.5 text-center font-extrabold text-ink"
            >
              Бізбен байланысу
            </a>
            <a
              href={phoneHref}
              tabIndex={open ? 0 : -1}
              className="flex items-center justify-center gap-2 rounded-full bg-lemon-200 px-5 py-3.5 font-extrabold text-ink"
            >
              <Phone className="size-4" />
              {site.phone}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
