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
        <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-lime-100 px-4 py-1.5 text-sm font-bold text-lime-700">
          <span className="size-1.5 rounded-full bg-lime-500" />
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-[1.7rem] leading-tight font-bold text-balance text-ink sm:text-4xl lg:text-[2.6rem]">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-pretty text-ink-soft sm:text-lg">{subtitle}</p>}
    </Reveal>
  );
}
