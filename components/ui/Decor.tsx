import { cn } from "@/lib/cn";

/** Небольшие декоративные SVG-элементы: солнце, листочек, облако, звёздочка, органическая форма. */

type DecorProps = { className?: string };

export function Sun({ className }: DecorProps) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={cn("pointer-events-none", className)}>
      <g className="origin-center animate-spin-slow" stroke="currentColor" strokeWidth="5" strokeLinecap="round">
        {Array.from({ length: 12 }, (_, i) => (
          <line key={i} x1="50" y1="6" x2="50" y2="16" transform={`rotate(${i * 30} 50 50)`} />
        ))}
      </g>
      <circle cx="50" cy="50" r="24" fill="currentColor" />
    </svg>
  );
}

export function Leaf({ className }: DecorProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={cn("pointer-events-none", className)}>
      <path d="M8 56C8 28 26 8 58 6c0 32-20 50-50 50Z" fill="currentColor" />
      <path d="M10 54C24 40 36 28 50 14" stroke="white" strokeOpacity=".55" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function Cloud({ className }: DecorProps) {
  return (
    <svg viewBox="0 0 120 64" aria-hidden className={cn("pointer-events-none", className)}>
      <path
        d="M30 60a22 22 0 0 1-3-43.8A28 28 0 0 1 80 12a20 20 0 0 1 30 18.5A16 16 0 0 1 104 60Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Star({ className }: DecorProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={cn("pointer-events-none", className)}>
      <path
        d="M24 3c1.6 0 2.4 1 3.2 2.8l3.7 8 8.6 1.1c3.6.5 4.3 2.8 1.7 5.3l-6.3 6.1 1.6 8.6c.7 3.5-1.3 5-4.5 3.3L24 34l-7.9 4.2c-3.2 1.7-5.2.2-4.5-3.3l1.6-8.6-6.3-6.1c-2.6-2.5-1.9-4.8 1.7-5.3l8.6-1.1 3.7-8C21.6 4 22.4 3 24 3Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Blob({ className }: DecorProps) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden className={cn("pointer-events-none", className)}>
      <path
        d="M45.1-58.6C57.6-46.9 66.1-31.5 70.4-14.4 74.6 2.7 74.6 21.4 66.2 35.6 57.8 49.8 41 59.6 23.2 66.3 5.4 73 -13.4 76.6-30.6 71.5-47.8 66.4-63.4 52.6-70.7 35.6-78 18.6-77 -1.6-69.9-18.4-62.8-35.2-49.6-48.5-35-60.1-20.4-71.7-4.3-81.5 10.8-80 26-78.5 32.6-70.3 45.1-58.6Z"
        transform="translate(100 100)"
        fill="currentColor"
      />
    </svg>
  );
}

/** Мягкая волна-разделитель между секциями */
export function Wave({ className }: DecorProps) {
  return (
    <svg viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden className={cn("pointer-events-none block w-full", className)}>
      <path d="M0 40c180 30 360 40 540 24S900 0 1080 8s300 40 360 48v24H0Z" fill="currentColor" />
    </svg>
  );
}
