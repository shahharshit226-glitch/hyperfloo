"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { AGENCY_NAME } from "@/config";
const KEY = "intro-seen";
const PATHS = [
  { d: "M100 300 A200 200 0 0 1 500 300", m: true }, { d: "M500 300 A200 200 0 0 1 100 300", m: true },
  { d: "M20 300H580", m: true }, { d: "M300 40V560", m: true },
  { d: "M130 130L470 470", m: false }, { d: "M470 130L130 470", m: false },
  { d: "M170 300 A130 130 0 1 1 430 300", m: false },
];
export default function Intro({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(true);
  const [phase, setPhase] = useState(0);
  const [pct, setPct] = useState(0);
  const [go, setGo] = useState(false);
  const [k, setK] = useState(1);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const finish = () => { timers.current.forEach(clearTimeout); localStorage.setItem(KEY, "1"); setOpen(false); setTimeout(onDone, 900); };
  useEffect(() => {
    const f = reduce ? 0.2 : localStorage.getItem(KEY) ? 0.4 : 1; setK(f);
    let ready = false, p = 0; const t0 = performance.now();
    Promise.all([new Promise<void>(r => document.readyState === "complete" ? r() : addEventListener("load", () => r())), document.fonts?.ready]).then(() => { ready = true; });
    const li = setInterval(() => {
      const tg = ready && performance.now() - t0 > 800 * Math.max(f, .4) ? 100 : Math.min(88, p + 2.2);
      p += (tg - p) * .18; setPct(Math.round(p));
      if (ready && p > 99.4) { clearInterval(li); setPct(100); setGo(true);
        timers.current = [2800, 4000, 5400, 6400].map((ms, i) => setTimeout(() => i < 3 ? setPhase(i + 1) : finish(), ms * f)); }
    }, 40);
    return () => { clearInterval(li); timers.current.forEach(clearTimeout); }; // eslint-disable-next-line
  }, []);
  return <AnimatePresence>{open && <motion.div key="i" className="fixed inset-0 z-[100] flex h-screen flex-col items-center justify-center bg-paper"
    exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: .9, ease: [.76, 0, .24, 1] }}>
    <div role="status" className="absolute bottom-6 left-5 w-[min(220px,50vw)] text-[11px] tracking-[.2em] transition-opacity duration-500 md:left-10" style={{ opacity: go ? 0 : 1 }}><div className="mb-2.5 h-px bg-ink/20"><div className="h-full bg-ink" style={{ width: `${pct}%` }} /></div>LOADING {pct}%</div>
    <button onClick={finish} className="absolute bottom-6 right-6 text-[11px] tracking-[.2em]">SKIP INTRO →</button>
    <svg viewBox="0 0 600 600" className="absolute h-[70vmin] w-[70vmin]" fill="none" stroke="#0c0c0b" strokeWidth="1" aria-hidden>
      {PATHS.map((p, i) => <motion.path key={i} d={p.d} className={p.m ? "" : "hidden md:block"} initial={{ pathLength: reduce ? 1 : 0 }}
        animate={{ pathLength: go ? 1 : 0, opacity: phase > 0 ? .15 : 1 }} transition={{ pathLength: { duration: 1.8 * k, delay: i * .22 * k, ease: [.65, 0, .35, 1] }, opacity: { duration: .8 } }} />)}
    </svg>
    <div className="relative text-center">
      <motion.h1 initial={{ opacity: 0, y: 24 }} animate={phase > 0 ? { opacity: 1, y: 0 } : {}} transition={{ duration: .9, ease: [.76, 0, .24, 1] }} className="text-4xl font-medium tracking-tight md:text-7xl">{AGENCY_NAME}</motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={phase > 1 ? { opacity: 1 } : {}} transition={{ duration: .8 }} className="mt-4 text-xs tracking-[.3em]">CREATIVE TECHNOLOGY STUDIO</motion.p>
      <motion.p initial={{ opacity: 0 }} animate={phase > 1 ? { opacity: .5 } : {}} transition={{ duration: .8, delay: .3 }} className="mt-3 text-[10px] tracking-[.3em]">WEB · BRAND · AUTOMATION · AI</motion.p>
    </div>
  </motion.div>}</AnimatePresence>;
}
