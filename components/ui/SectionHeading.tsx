import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ eyebrow, title, subtitle, align = "center", className }: SectionHeadingProps) {
  return (
    <Reveal className={cn(align === "center" ? "mx-auto text-center" : "text-left", "max-w-2xl", className)}>
      {eyebrow && (
        <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-lime-100 px-3 py-1 text-[0.8125rem] font-bold text-lime-700 sm:mb-4 sm:px-4 sm:py-1.5 sm:text-sm">
          <span className="size-1.5 rounded-full bg-lime-500" />
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-[1.8rem] leading-tight font-bold text-balance text-ink sm:text-4xl lg:text-[2.6rem]">
        {title}
      </h2>
      {subtitle && <p className="mt-2.5 text-[0.95rem] leading-relaxed text-pretty text-ink-soft sm:mt-4 sm:text-lg">{subtitle}</p>}
    </Reveal>
  );
}
