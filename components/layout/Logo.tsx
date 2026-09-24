import { cn } from "@/lib/cn";

/** Логотип: солнце-листок + название. */
export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <span className="relative grid size-11 shrink-0 place-items-center rounded-2xl bg-lemon-200 shadow-soft">
        <svg viewBox="0 0 40 40" aria-hidden className="size-7">
          <circle cx="20" cy="17" r="8" fill="#f2cf45" />
          <path d="M8 34c0-8 6-13 12-13s12 5 12 13" fill="#a5cc4c" />
          <path d="M20 34c0-6 3-10 8-12-1 6-3 10-8 12Z" fill="#6f962a" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-semibold tracking-tight text-ink">«Кәусар»</span>
        {!compact && (
          <span className="mt-1 text-[0.7rem] font-bold tracking-wide text-ink-soft">бөбекжай балабақшасы</span>
        )}
      </span>
    </span>
  );
}
