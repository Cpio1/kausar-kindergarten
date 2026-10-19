import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
};

const variants = {
  primary:
    "bg-lime-400 text-ink shadow-[0_10px_24px_-10px_rgb(111_150_42/0.7)] hover:bg-lime-300 hover:-translate-y-0.5",
  secondary: "bg-white text-ink shadow-soft ring-1 ring-lime-200 hover:ring-lime-300 hover:-translate-y-0.5",
  ghost: "bg-lemon-200 text-ink hover:bg-lemon-300 hover:-translate-y-0.5",
};

/** Ссылка в виде кнопки-«таблетки». */
export function ButtonLink({ variant = "primary", className, children, ...props }: ButtonLinkProps) {
  return (
    <a
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-2.5 [&>svg]:shrink-0 text-[0.9375rem] font-extrabold whitespace-nowrap transition duration-300 sm:px-6 sm:py-3 sm:text-[0.95rem] sm:whitespace-normal",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
