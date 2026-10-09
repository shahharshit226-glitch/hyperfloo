"use client";
import { useEffect, useRef } from "react";
import Logo from "./Logo";
import { AGENCY_NAME } from "@/config";
/** Desktop-only brush reveal: erases wherever the cursor passes over the card. */
export default function Paint() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!, x = c.getContext("2d")!, mq = matchMedia("(max-width:767px)");
    let dpr = 1, W = 0, px: number | null = null, py = 0, R = 0, dirty = false;
    const init = (force = false) => { if (mq.matches) return; const r = c.getBoundingClientRect(); if (!r.width || (!force && Math.abs(r.width - W) < 2)) return;
      W = r.width; dpr = Math.min(2, devicePixelRatio || 1); R = r.width * dpr * .13;
      const w = (c.width = r.width * dpr), h = (c.height = r.height * dpr);
      x.globalCompositeOperation = "source-over"; x.fillStyle = "#d8d7d1"; x.fillRect(0, 0, w, h);
      for (let i = 0; i < 600; i++) { x.fillStyle = `rgba(12,12,11,${Math.random() * .07})`; x.fillRect(Math.random() * w, Math.random() * h, dpr * 1.5, dpr * 1.5); }
      x.fillStyle = "#0c0c0b"; x.font = `${11 * dpr}px sans-serif`; x.textAlign = "center"; x.fillText("PAINT TO REVEAL", w / 2, h / 2); x.fillText("✦", w / 2, h / 2 + 20 * dpr); dirty = false; };
    const onResize = () => init();
    const paint = (X: number, Y: number) => { x.globalCompositeOperation = "destination-out";
      const n = px == null ? 1 : Math.max(1, Math.ceil(Math.hypot(X - px, Y - py) / (R * .3)));
      for (let i = 1; i <= n; i++) { const a = px == null ? X : px + (X - px) * i / n, b = px == null ? Y : py + (Y - py) * i / n, g = x.createRadialGradient(a, b, 0, a, b, R);
        g.addColorStop(0, "rgba(0,0,0,1)"); g.addColorStop(.65, "rgba(0,0,0,.85)"); g.addColorStop(1, "rgba(0,0,0,0)"); x.fillStyle = g; x.beginPath(); x.arc(a, b, R, 0, 7); x.fill(); }
      px = X; py = Y; dirty = true; };
    const move = (e: PointerEvent) => { if (mq.matches || e.pointerType === "touch") return; const r = c.getBoundingClientRect();
      if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) paint((e.clientX - r.left) * dpr, (e.clientY - r.top) * dpr); else px = null; };
    init(true); document.fonts?.ready.then(() => { if (!dirty) init(true); });
    addEventListener("resize", onResize); addEventListener("pointermove", move, { passive: true });
    return () => { removeEventListener("resize", onResize); removeEventListener("pointermove", move); };
  }, []);
  return <div className="absolute right-10 top-[104px] hidden aspect-[4/5] w-[clamp(220px,24vw,360px)] overflow-hidden rounded-2xl bg-ink text-paper md:block">
    <div className="absolute inset-0 flex flex-col justify-between p-5 text-[11px] tracking-[.18em]"><Logo size={48} /><b className="text-xl font-medium tracking-tight">{AGENCY_NAME}</b><span>WEB · BRAND<br />AUTOMATION · AI</span></div>
    <canvas ref={ref} aria-label="Paint to reveal" className="absolute inset-0 h-full w-full cursor-crosshair" />
  </div>;
}
