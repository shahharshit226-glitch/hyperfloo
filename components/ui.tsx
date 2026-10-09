"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { TZ } from "@/config";
const EASE = "cubic-bezier(.76,0,.24,1)";

/** SlideUpButton: label slides up, duplicate rises from below */
export function SlideUp({ label, href, onClick, dark }: { label: string; href?: string; onClick?: () => void; dark?: boolean }) {
  const cls = `group relative inline-flex overflow-hidden rounded-full border px-6 py-3 text-xs tracking-[.18em] ${dark ? "border-paper text-paper" : "border-ink"}`;
  const t = { transition: `transform .55s ${EASE}` };
  const inner = <>
    <span className="block group-hover:-translate-y-[150%]" style={t}>{label} ↗</span>
    <span className="absolute inset-0 flex translate-y-[150%] items-center justify-center group-hover:translate-y-0" style={t} aria-hidden>{label} ↗</span>
  </>;
  return href ? <a href={href} className={cls}>{inner}</a> : <button type={onClick ? "button" : "submit"} onClick={onClick} className={cls}>{inner}</button>;
}

/** SplitTextHover: letters slide up with stagger */
export function SplitHover({ text, className = "" }: { text: string; className?: string }) {
  return <span className={`inline-flex overflow-hidden ${className}`} aria-label={text}>
    {[...text].map((c, i) => <span key={i} aria-hidden className="relative inline-block whitespace-pre">
      <span className="block group-hover:-translate-y-full" style={{ transition: `transform .5s ${EASE} ${i * 12}ms` }}>{c}</span>
      <span className="absolute left-0 top-full block group-hover:-translate-y-full" style={{ transition: `transform .5s ${EASE} ${i * 12}ms` }}>{c}</span>
    </span>)}
  </span>;
}

/** Scroll-tied line reveal: opacity + y + blur */
function Line({ children }: { children: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start 0.95", "start 0.6"] });
  const opacity = useTransform(p, [0, 1], [0.08, 1]);
  const y = useTransform(p, [0, 1], ["60%", "0%"]);
  const filter = useTransform(p, [0, 1], ["blur(8px)", "blur(0px)"]);
  return <div ref={ref} className="overflow-hidden"><motion.div className="max-md:!filter-none" style={{ opacity, y, filter }}>{children}</motion.div></div>;
}
export function ScrollText({ lines, className = "" }: { lines: string[]; className?: string }) {
  return <h2 className={`font-medium leading-[.92] tracking-tight ${className}`}>{lines.map(l => <Line key={l}>{l}</Line>)}</h2>;
}

/** Ignite reveal: controlled clip-path wipe + settle. Use sparingly. */
export function Ignite({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const on = useInView(ref, { once: true, margin: "-15%" });
  return <motion.div ref={ref} className={className}
    initial={{ clipPath: "inset(0 0 100% 0)", scale: 1.06 }}
    animate={on ? { clipPath: "inset(0 0 0% 0)", scale: 1 } : {}}
    transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}>{children}</motion.div>;
}

/** Live clock — Intl, Asia/Kathmandu, ticks every second */
export function Clock({ className = "" }: { className?: string }) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => { setNow(new Date()); const i = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(i); }, []);
  if (!now) return <div className={className}>&nbsp;<br />&nbsp;</div>;
  const date = new Intl.DateTimeFormat("en-GB", { timeZone: TZ, day: "2-digit", month: "short", year: "numeric" }).format(now).toUpperCase();
  const time = new Intl.DateTimeFormat("en-US", { timeZone: TZ, hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(now);
  return <div className={`leading-snug tabular-nums ${className}`}>NEPAL · UTC+05:45<br />{date} · {time}</div>;
}

/** Service hover visuals — monochrome SVG */
export function Visual({ i }: { i: number }) {
  const s = { fill: "none", stroke: "currentColor", strokeWidth: 1.5 };
  const k = [0, 1, 1, 2, 3, 0][i];
  return <svg viewBox="0 0 200 140" className="h-full w-full">
    {k === 0 && <g {...s}><rect x="20" y="15" width="160" height="110" rx="6" /><path d="M20 38h160M36 60h70M36 76h100M36 92h50" /></g>}
    {k === 1 && <g {...s}><circle cx="85" cy="70" r="40" /><circle cx="115" cy="70" r="40" /><path d="M100 30v80" /></g>}
    {k === 2 && <g {...s}><circle cx="30" cy="70" r="9" /><circle cx="100" cy="30" r="9" /><circle cx="100" cy="110" r="9" /><circle cx="170" cy="70" r="9" /><path d="M39 66l52-31M39 74l52 31M109 35l52 31M109 105l52-31" /></g>}
    {k === 3 && <g {...s}><circle cx="100" cy="70" r="14" />{[[40,30],[160,30],[40,110],[160,110],[100,12],[100,128]].map(([x,y],n)=><g key={n}><circle cx={x} cy={y} r="6" /><path d={`M100 70L${x} ${y}`} /></g>)}</g>}
  </svg>;
}
