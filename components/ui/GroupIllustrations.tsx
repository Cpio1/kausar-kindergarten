import type { ReactNode } from "react";
import type { GroupSlug } from "@/lib/content";
import { cn } from "@/lib/cn";

/**
 * Декоративные «мягкие 3D» композиции для карточек групп.
 * Объём — за счёт вертикальных градиентов, бликов и размытой тени; цвета — из палитры сайта.
 * У каждой композиции свой префикс id, чтобы градиенты разных SVG не пересекались.
 */

const C = {
  ink: "#2b3a24",
  milk: "#fffdf6",
  cream: "#faf6e8",
  creamDeep: "#f3edd6",
  lime200: "#d6eaa6",
  lime300: "#bddc74",
  lime400: "#a5cc4c",
  lime500: "#8cb836",
  lime600: "#6f962a",
  lime700: "#557323",
  lemon100: "#fff5c2",
  lemon200: "#ffec94",
  lemon300: "#fbe06a",
  lemon400: "#f2cf45",
  mint100: "#e2f1d9",
  mint200: "#cbe6bd",
  mint400: "#9fcf86",
  honey: "#f1cf7c",
  honeyDeep: "#d9a947",
};

/** Набор градиентов «светлый верх → тёмный низ» и фильтр мягкой тени */
function Defs({ p }: { p: string }) {
  const grads: [string, string, string][] = [
    ["lime", C.lime300, C.lime500],
    ["limeSoft", C.lime200, C.lime400],
    ["lemon", C.lemon200, C.lemon400],
    ["mint", C.mint100, C.mint400],
    ["milk", C.milk, C.creamDeep],
    ["honey", C.honey, C.honeyDeep],
    ["green", C.lime500, C.lime700],
  ];
  return (
    <defs>
      {grads.map(([id, from, to]) => (
        <linearGradient key={id} id={`${p}-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      ))}
      <filter id={`${p}-ground`} x="-20%" y="-200%" width="140%" height="500%">
        <feGaussianBlur stdDeviation="5" />
      </filter>
      <filter id={`${p}-soft`} x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor={C.ink} floodOpacity="0.14" />
      </filter>
    </defs>
  );
}

const fill = (p: string, id: string) => `url(#${p}-${id})`;

function Ground({ p, cx = 120, rx = 92 }: { p: string; cx?: number; rx?: number }) {
  return <ellipse cx={cx} cy="158" rx={rx} ry="7" fill={C.ink} opacity="0.13" filter={`url(#${p}-ground)`} />;
}

/** Мягкий кубик: передняя грань, верх и бок со скруглёнными углами */
function Cube({ x, y, s, front, top, side, p }: { x: number; y: number; s: number; front: string; top: string; side: string; p: string }) {
  const d = s * 0.24;
  return (
    <g filter={`url(#${p}-soft)`} strokeLinejoin="round">
      <path d={`M${x + 2} ${y} L${x + s - 2} ${y} L${x + s + d} ${y - d} L${x + d + 2} ${y - d} Z`} fill={top} stroke={top} strokeWidth="5" />
      <path d={`M${x + s} ${y + 2} L${x + s + d} ${y - d + 2} L${x + s + d} ${y + s - d - 2} L${x + s} ${y + s - 2} Z`} fill={side} stroke={side} strokeWidth="5" />
      <rect x={x} y={y} width={s} height={s} rx={s * 0.2} fill={front} />
      <rect x={x + s * 0.14} y={y + s * 0.14} width={s * 0.72} height={s * 0.72} rx={s * 0.16} fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="2" />
      <ellipse cx={x + s * 0.32} cy={y + s * 0.28} rx={s * 0.14} ry={s * 0.08} fill="#fff" opacity="0.45" />
    </g>
  );
}

function Star({ cx, cy, r, color, opacity = 1 }: { cx: number; cy: number; r: number; color: string; opacity?: number }) {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = (Math.PI / 5) * i - Math.PI / 2;
    const rad = i % 2 ? r * 0.48 : r;
    return `${(cx + rad * Math.cos(a)).toFixed(1)},${(cy + rad * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
  return <polygon points={pts} fill={color} stroke={color} strokeWidth={r * 0.35} strokeLinejoin="round" opacity={opacity} />;
}

/** Карандаш, лежащий горизонтально от (0,0) вправо; поворот и позиция — через transform */
function Pencil({ body, dark, length = 92, transform, p }: { body: string; dark: string; length?: number; transform: string; p: string }) {
  return (
    <g transform={transform} filter={`url(#${p}-soft)`}>
      <rect x="0" y="-6" width="12" height="12" rx="4" fill={C.lemon100} />
      <rect x="8" y="-6" width="6" height="12" fill={C.mint200} />
      <rect x="13" y="-6" width={length - 30} height="12" rx="2" fill={body} />
      <rect x="13" y="-6" width={length - 30} height="4" fill="#fff" opacity="0.35" />
      <path d={`M${length - 17} -6 L${length} 0 L${length - 17} 6 Z`} fill={C.honey} />
      <path d={`M${length - 6} -2.2 L${length} 0 L${length - 6} 2.2 Z`} fill={dark} />
    </g>
  );
}

function Frame({ children, p, className }: { children: ReactNode; p: string; className?: string }) {
  return (
    <svg viewBox="0 0 240 180" aria-hidden className={cn("overflow-visible", className)}>
      <Defs p={p} />
      {children}
    </svg>
  );
}

/** Балауса: плюшевый мишка, мягкие кубики, мячик и звёздочка */
function BalausaArt({ className }: { className?: string }) {
  const p = "gi-balausa";
  return (
    <Frame p={p} className={className}>
      <Ground p={p} />

      {/* Кубики слева */}
      <Cube p={p} x={26} y={114} s={40} front={fill(p, "lime")} top={C.lime200} side={C.lime500} />
      <Cube p={p} x={36} y={76} s={34} front={fill(p, "lemon")} top={C.lemon100} side={C.lemon400} />

      {/* Мишка */}
      <g filter={`url(#${p}-soft)`}>
        <circle cx="99" cy="57" r="11" fill={fill(p, "honey")} />
        <circle cx="141" cy="57" r="11" fill={fill(p, "honey")} />
        <circle cx="99" cy="58" r="5.5" fill={C.lemon100} />
        <circle cx="141" cy="58" r="5.5" fill={C.lemon100} />
        <ellipse cx="91" cy="119" rx="11" ry="17" transform="rotate(24 91 119)" fill={fill(p, "honey")} />
        <ellipse cx="149" cy="119" rx="11" ry="17" transform="rotate(-24 149 119)" fill={fill(p, "honey")} />
        <ellipse cx="120" cy="123" rx="31" ry="31" fill={fill(p, "honey")} />
        <ellipse cx="120" cy="127" rx="17" ry="19" fill={C.lemon100} opacity="0.75" />
        <ellipse cx="103" cy="150" rx="14" ry="9" fill={fill(p, "honey")} />
        <ellipse cx="137" cy="150" rx="14" ry="9" fill={fill(p, "honey")} />
        <ellipse cx="103" cy="151" rx="7" ry="5" fill={C.lemon100} />
        <ellipse cx="137" cy="151" rx="7" ry="5" fill={C.lemon100} />
        <circle cx="120" cy="79" r="27" fill={fill(p, "honey")} />
        <ellipse cx="120" cy="89" rx="12" ry="9" fill={C.lemon100} />
        <ellipse cx="120" cy="85" rx="4.2" ry="3.2" fill={C.ink} />
        <path d="M116 91 Q120 94.5 124 91" stroke={C.ink} strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <circle cx="110.5" cy="75" r="2.8" fill={C.ink} />
        <circle cx="129.5" cy="75" r="2.8" fill={C.ink} />
        <circle cx="111.4" cy="74" r="0.9" fill="#fff" />
        <circle cx="130.4" cy="74" r="0.9" fill="#fff" />
        <ellipse cx="106" cy="82" rx="4" ry="2.4" fill={C.lemon400} opacity="0.55" />
        <ellipse cx="134" cy="82" rx="4" ry="2.4" fill={C.lemon400} opacity="0.55" />
        <g strokeLinejoin="round">
          <path d="M120 105 L108 98 L108 112 Z" fill={C.lime400} stroke={C.lime400} strokeWidth="3" />
          <path d="M120 105 L132 98 L132 112 Z" fill={C.lime400} stroke={C.lime400} strokeWidth="3" />
          <circle cx="120" cy="105" r="3.6" fill={C.lime600} />
        </g>
        <ellipse cx="109" cy="64" rx="9" ry="5" fill="#fff" opacity="0.35" transform="rotate(-20 109 64)" />
      </g>

      {/* Кубик и мячик справа */}
      <Cube p={p} x={186} y={124} s={30} front={fill(p, "mint")} top={C.mint100} side={C.mint400} />
      <g filter={`url(#${p}-soft)`}>
        <circle cx="168" cy="143" r="15" fill={fill(p, "lemon")} />
        <path d="M154 139 Q168 132 182 141" stroke={C.lime400} strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M157 152 Q168 158 180 150" stroke={C.lime400} strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.8" />
        <ellipse cx="162" cy="135" rx="5" ry="3" fill="#fff" opacity="0.6" />
      </g>

      <Star cx={192} cy={58} r={10} color={C.lemon400} />
      <Star cx={56} cy={42} r={5} color={C.lime400} opacity={0.8} />
    </Frame>
  );
}

/** Балғын: лист бумаги, палитра, карандаши, кисточка и цветок */
function BaldyrganArt({ className }: { className?: string }) {
  const p = "gi-baldyrgan";
  return (
    <Frame p={p} className={className}>
      <Ground p={p} />

      {/* Лист с детским рисунком */}
      <g transform="rotate(-7 128 92)" filter={`url(#${p}-soft)`}>
        <rect x="84" y="30" width="96" height="118" rx="8" fill={fill(p, "milk")} />
        <circle cx="152" cy="58" r="11" fill={C.lemon300} />
        <path d="M100 116 Q116 92 132 112 T164 104" stroke={C.lime400} strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M104 132 L160 132" stroke={C.mint200} strokeWidth="4" strokeLinecap="round" />
      </g>

      {/* Палитра */}
      <g filter={`url(#${p}-soft)`}>
        <path
          d="M30 126 C26 100 52 84 84 86 C114 88 124 104 116 118 C110 128 96 122 94 132 C92 144 104 148 96 154 C84 162 36 158 30 126 Z"
          fill={fill(p, "milk")}
        />
        <path d="M34 124 C32 104 54 90 82 91" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.8" />
        <ellipse cx="82" cy="138" rx="7" ry="6" fill={C.creamDeep} />
        <circle cx="48" cy="114" r="8" fill={fill(p, "lime")} />
        <circle cx="68" cy="102" r="8" fill={fill(p, "lemon")} />
        <circle cx="92" cy="104" r="7" fill={fill(p, "mint")} />
        <circle cx="52" cy="138" r="8" fill={fill(p, "green")} />
        <circle cx="45.5" cy="111.5" r="2.4" fill="#fff" opacity="0.6" />
        <circle cx="65.5" cy="99.5" r="2.4" fill="#fff" opacity="0.6" />
      </g>

      {/* Карандаши */}
      <Pencil p={p} body={fill(p, "lime")} dark={C.lime600} transform="translate(146 156) rotate(-52)" />
      <Pencil p={p} body={fill(p, "lemon")} dark={C.lemon400} length={84} transform="translate(168 158) rotate(-72)" />
      <Pencil p={p} body={fill(p, "mint")} dark={C.lime500} length={78} transform="translate(192 156) rotate(-94)" />

      {/* Кисточка */}
      <g transform="translate(112 150) rotate(-16)" filter={`url(#${p}-soft)`}>
        <rect x="0" y="-3.5" width="64" height="7" rx="3.5" fill={fill(p, "honey")} />
        <rect x="62" y="-5" width="14" height="10" rx="2" fill={C.mint200} />
        <path d="M76 -5 Q92 -3 98 0 Q92 3 76 5 Z" fill={C.lime500} />
      </g>

      {/* Цветок */}
      <g transform="translate(204 52)">
        {Array.from({ length: 5 }, (_, i) => (
          <ellipse key={i} cx="0" cy="-8" rx="5.5" ry="8" fill={C.lemon300} transform={`rotate(${i * 72})`} />
        ))}
        <circle r="5" fill={C.lime400} />
      </g>
      <Star cx={44} cy={52} r={6} color={C.lime400} opacity={0.85} />
    </Frame>
  );
}

/** Сұлтан: книги, геометрические фигуры, конструктор, карандаш и шапочка выпускника */
function SultanArt({ className }: { className?: string }) {
  const p = "gi-sultan";
  return (
    <Frame p={p} className={className}>
      <Ground p={p} />

      {/* Стопка книг */}
      <g filter={`url(#${p}-soft)`}>
        <rect x="48" y="128" width="100" height="24" rx="6" fill={fill(p, "lime")} />
        <rect x="54" y="132" width="90" height="12" rx="3" fill={C.milk} />
        <path d="M58 136 H140 M58 140 H140" stroke={C.creamDeep} strokeWidth="1.5" />
        <rect x="56" y="106" width="86" height="22" rx="6" fill={fill(p, "lemon")} />
        <rect x="62" y="110" width="76" height="11" rx="3" fill={C.milk} />
        <rect x="76" y="106" width="10" height="22" fill={C.lime400} opacity="0.75" />
      </g>

      {/* Пирамидка и шар на книгах */}
      <g filter={`url(#${p}-soft)`} strokeLinejoin="round">
        <path d="M86 104 L106 62 L114 104 Z" fill={C.mint200} stroke={C.mint200} strokeWidth="4" />
        <path d="M114 104 L106 62 L130 104 Z" fill={C.mint400} stroke={C.mint400} strokeWidth="4" />
        <circle cx="132" cy="92" r="12" fill={fill(p, "lemon")} />
        <ellipse cx="128" cy="87" rx="4" ry="2.6" fill="#fff" opacity="0.6" />
      </g>

      {/* Деталь конструктора */}
      <g filter={`url(#${p}-soft)`}>
        <rect x="160" y="128" width="48" height="26" rx="6" fill={fill(p, "lime")} />
        <rect x="160" y="128" width="48" height="7" rx="3" fill="#fff" opacity="0.25" />
        {[172, 196].map((cx) => (
          <g key={cx}>
            <rect x={cx - 7} y="120" width="14" height="9" fill={C.lime500} />
            <ellipse cx={cx} cy="120" rx="7" ry="3" fill={C.lime300} />
          </g>
        ))}
      </g>
      {/* Кубик-цилиндр слева */}
      <g filter={`url(#${p}-soft)`}>
        <rect x="20" y="130" width="24" height="24" fill={fill(p, "mint")} />
        <ellipse cx="32" cy="154" rx="12" ry="4" fill={C.mint400} />
        <ellipse cx="32" cy="130" rx="12" ry="4" fill={C.mint100} />
      </g>

      {/* Карандаш перед книгами */}
      <Pencil p={p} body={fill(p, "lemon")} dark={C.lime600} length={80} transform="translate(70 162) rotate(-6)" />

      {/* Шапочка выпускника */}
      <g transform="translate(176 66) rotate(-12)" filter={`url(#${p}-soft)`}>
        <path d="M-14 4 L-14 16 Q0 24 14 16 L14 4 Z" fill={fill(p, "green")} />
        <path d="M-30 0 L0 -13 L30 0 L0 13 Z" fill={C.lime600} stroke={C.lime600} strokeWidth="3" strokeLinejoin="round" />
        <path d="M-30 0 L0 -13 L30 0" stroke="#fff" strokeOpacity="0.3" strokeWidth="2" fill="none" />
        <path d="M0 0 Q18 2 22 6 L22 20" stroke={C.lemon400} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="22" cy="22" r="3.5" fill={C.lemon400} />
      </g>
      <Star cx={48} cy={64} r={6} color={C.lemon400} />
      <Star cx={210} cy={104} r={4.5} color={C.lime400} opacity={0.8} />
    </Frame>
  );
}

const arts: Record<GroupSlug, (props: { className?: string }) => ReactNode> = {
  balausa: BalausaArt,
  baldyrgan: BaldyrganArt,
  sultan: SultanArt,
};

export function GroupIllustration({ slug, className }: { slug: GroupSlug; className?: string }) {
  const Art = arts[slug];
  return <Art className={className} />;
}
