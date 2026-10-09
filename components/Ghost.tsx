"use client";
import { useEffect, useRef } from "react";
/** Interactive ghost: follows pointer with trailing echoes; floats on its own when idle (touch-friendly). */
export default function Ghost() {
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const els = Array.from(box.current!.children) as HTMLElement[];
    const S = els.map((el, i) => ({ el, x: innerWidth / 2, y: innerHeight / 2, f: [.14, .09, .06, .04][i], ey: el.querySelector(".ey") as SVGGElement }));
    let mx = innerWidth / 2, my = innerHeight * .45, last = -9999, raf = 0;
    const mv = (e: PointerEvent) => { mx = e.clientX; my = e.clientY; last = performance.now(); };
    addEventListener("pointermove", mv);
    const loop = (t: number) => {
      const idle = t - last > 2500, w = innerWidth, h = innerHeight;
      const tx = idle ? w / 2 + Math.cos(t / 1400) * w * .15 : Math.min(w - 60, mx + 80), ty = idle ? h * .42 + Math.sin(t / 900) * 30 : Math.min(h - 70, my + 60);
      S.forEach((g, i) => {
        g.x += (tx - g.x) * g.f; g.y += (ty - g.y) * g.f;
        const dx = idle ? 0 : Math.max(-5, Math.min(5, (mx - g.x) / 12)), dy = idle ? 0 : Math.max(-4, Math.min(4, (my - g.y) / 12));
        g.el.style.transform = `translate(${g.x - g.el.offsetWidth / 2}px,${g.y - g.el.offsetHeight / 2 + Math.sin(t / 500 + i) * 6}px)`;
        g.ey.setAttribute("transform", `translate(${dx} ${dy})`);
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); removeEventListener("pointermove", mv); };
  }, []);
  return <div ref={box} aria-hidden>{[1, .35, .2, .1].map((o, i) =>
    <div key={i} className="pointer-events-none absolute left-0 top-0 h-[86px] w-[72px] will-change-transform md:h-[120px] md:w-[100px]" style={{ opacity: o }}>
      <svg viewBox="0 0 100 120" className="h-full w-full overflow-visible fill-paper" style={{ filter: "drop-shadow(0 0 26px rgba(236,235,230,.22))" }}>
        <path d="M10 112V50a40 40 0 0 1 80 0v62l-13-10-13 10-14-10-14 10-13-10-13 10z" />
        <g className="ey fill-ink"><circle cx="35" cy="52" r="7" /><circle cx="65" cy="52" r="7" /></g>
      </svg></div>)}</div>;
}
