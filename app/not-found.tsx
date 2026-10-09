"use client";
import Ghost from "@/components/Ghost";
import { SlideUp } from "@/components/ui";
export default function NotFound() {
  return <div role="alert" className="fixed inset-0 overflow-hidden text-paper" style={{ background: "radial-gradient(circle at 50% 40%,#22221f 0%,#0c0c0b 72%)" }}>
    <p aria-hidden className="absolute inset-0 flex items-center justify-center text-[42vw] font-medium tracking-[-.06em] text-transparent md:text-[30vw]" style={{ WebkitTextStroke: "1px rgba(236,235,230,.14)" }}>404</p>
    <Ghost />
    <div className="absolute bottom-10 left-5 z-10 md:bottom-16 md:left-10">
      <p className="mb-5 text-[11px] tracking-[.2em]">PAGE NOT FOUND</p>
      <h1 className="mb-8 text-[11vw] font-medium leading-[.92] tracking-tight md:text-[7vw]">THIS PAGE<br />DRIFTED OFF.</h1>
      <SlideUp label="BACK HOME" href="/" dark />
    </div></div>;
}
