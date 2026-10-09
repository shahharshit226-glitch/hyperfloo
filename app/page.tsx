"use client";
import { useState } from "react";
import Intro from "@/components/Intro";
import Logo from "@/components/Logo";
import Paint from "@/components/Paint";
import { SlideUp, SplitHover, ScrollText, Ignite, Clock, Visual } from "@/components/ui";
import { motion, AnimatePresence } from "framer-motion";
import { AGENCY_NAME, EMAIL, SOCIALS, PROJECTS, SERVICES, SERVICE_INFO } from "@/config";

const NAV = ["WORK", "SERVICES", "ABOUT", "PROCESS"];
const MQ = ["WEB DESIGN", "BRANDING", "AI", "AUTOMATION", "DIGITAL PRODUCTS"];
const STEPS = ["DISCOVER", "DESIGN", "BUILD", "AUTOMATE", "LAUNCH"];
const TECH = ["REACT", "NEXT.JS", "TYPESCRIPT", "PYTHON", "FASTAPI", "SUPABASE", "NODE", "MONGODB", "AI", "AUTOMATION"];
const Label = ({ t }: { t: string }) => <p className="mb-8 text-xs tracking-[.2em]">{t}</p>;

export default function Page() {
  const [ready, setReady] = useState(false);
  const [svc, setSvc] = useState(0);
  const [menu, setMenu] = useState(false);
  const send = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); const form = new FormData(e.currentTarget);
    const d = Object.fromEntries(["name", "email", "business", "need", "budget", "details"].map(k => [k, String(form.get(k) ?? "")])) as Record<string, string>;
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Project inquiry — " + d.name)}&body=${encodeURIComponent(Object.entries(d).map(([k, v]) => `${k.toUpperCase()}: ${v}`).join("\n"))}`;
  };
  const input = "w-full border-b border-paper/30 bg-transparent py-4 text-sm outline-none placeholder:text-paper/40 focus:border-paper";
  return <>
    <Intro onDone={() => setReady(true)} />
    <main className={ready ? "" : "h-screen overflow-hidden"}>
      {menu && <div className="fixed inset-0 z-40 flex flex-col justify-center gap-1.5 bg-paper px-6">{[...NAV, "CONTACT"].map(n => <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setMenu(false)} className="text-[13vw] font-medium leading-none tracking-tight">{n}</a>)}</div>}
      <nav className="fixed inset-x-0 top-0 z-50 flex items-start justify-between px-5 py-5 text-[11px] tracking-[.18em] mix-blend-difference text-white md:px-10">
        <a href="#top" className="flex items-center gap-2.5 font-medium"><Logo />{AGENCY_NAME}</a>
        <div className="hidden gap-8 md:flex">{NAV.map(n => <a key={n} href={`#${n.toLowerCase()}`} className="group"><SplitHover text={n} /></a>)}</div>
        <Clock className="hidden text-right text-[10px] md:block" />
        <button className="py-1.5 md:hidden" aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? "CLOSE" : "MENU"}</button>
      </nav>

      <section id="top" className="relative flex min-h-[100svh] flex-col justify-end px-5 pb-10 pt-32 md:px-10 md:pb-16">
        <Paint />
        <ScrollText lines={["WE BUILD", "DIGITAL", "THINGS."]} className="text-[17vw] md:text-[13vw]" />
        <div className="mt-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <p className="max-w-sm text-sm leading-relaxed">We design and build websites, brands, intelligent systems and automations for businesses ready to move forward.</p>
          <div className="flex flex-wrap gap-3"><SlideUp label="START A PROJECT" href="#contact" /><SlideUp label="VIEW OUR WORK" href="#work" /></div>
        </div>
        <Clock className="mt-10 text-[10px] tracking-[.18em] md:hidden" />
      </section>

      <div className="overflow-hidden border-y border-ink py-5 text-sm tracking-[.2em]">
        <div className="mq flex w-max gap-10 whitespace-nowrap">{[...MQ, ...MQ, ...MQ, ...MQ].map((m, i) => <span key={i} className="flex gap-10">{m}<span>✦</span></span>)}</div>
      </div>

      <section className="px-5 py-32 md:px-10">
        <Label t="01 — WHAT WE DO" />
        <ScrollText lines={["WE TURN IDEAS", "INTO DIGITAL", "EXPERIENCES."]} className="text-[10vw]" />
        <p className="mt-12 max-w-md text-sm leading-relaxed md:ml-auto">We combine design, development, automation and AI to create digital experiences that are useful, memorable and built for real businesses.</p>
      </section>

      <section id="work" className="px-5 pb-24 md:px-10">
        <Label t="SELECTED WORK" />
        {PROJECTS.map((p, i) => <article key={p.slug} className="mb-32">
          <div className="mb-4 flex items-baseline justify-between"><span className="text-xs">{p.n}</span><span className="text-xs tracking-[.2em]">{p.tag}</span></div>
          <h3 className="mb-6 text-[9vw] font-medium leading-none tracking-tight">{p.name}</h3>
          <div>
            <div className="relative aspect-video overflow-hidden bg-ink">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${p.video}?autoplay=1&mute=1&loop=1&playlist=${p.video}&rel=0&modestbranding=1`}
                title={`${p.name} project video`}
                allow="autoplay; encrypted-media; picture-in-picture"
                loading="eager"
                allowFullScreen
              />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs"><span className="tracking-widest opacity-60">{p.stack}</span>
            <a href={p.href} target="_blank" rel="noreferrer" className="group tracking-[.18em]"><SplitHover text="VIEW PROJECT ↗" /></a></div>
        </article>)}
      </section>

      <section id="services" className="px-5 py-32 md:px-10">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col justify-between gap-12">
            <div>
              <Label t="02 — SERVICES" />
              <ScrollText lines={["FROM VISUAL IDENTITY", "TO INTELLIGENT SYSTEMS."]} className="text-[9vw] md:text-[4.2vw]" />
              <p className="mt-8 max-w-sm text-sm leading-relaxed">Design, development, automation and AI, combined into products that work for real businesses.</p>
            </div>
            <div className="hidden aspect-[4/3] max-w-xs items-center justify-center rounded-2xl bg-ink/5 p-8 md:flex"><Visual i={svc} /></div>
          </div>
          <div className="flex flex-col gap-3">
            {SERVICES.map((s, i) => { const on = svc === i; return (
              <motion.button layout key={s} type="button" aria-expanded={on} onMouseEnter={() => setSvc(i)} onFocus={() => setSvc(i)} onClick={() => setSvc(i)}
                className={`rounded-3xl p-6 text-left transition-colors duration-500 ${on ? "bg-ink text-paper" : "bg-ink/5 text-ink/60"}`}>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-xl font-medium tracking-tight md:text-3xl">{s}</span><span className="text-xs opacity-60">(0{i + 1})</span>
                </div>
                <AnimatePresence initial={false}>{on && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .5, ease: [.76, 0, .24, 1] }} className="overflow-hidden">
                    <p className="mt-4 max-w-md text-sm leading-relaxed opacity-80">{SERVICE_INFO[i].d}</p>
                    <div className="mt-5 flex flex-wrap gap-2">{SERVICE_INFO[i].chips.map(c => <span key={c} className="rounded-full bg-paper/10 px-3 py-1.5 text-[11px]">{c}</span>)}</div>
                  </motion.div>)}
                </AnimatePresence>
              </motion.button>); })}
          </div>
        </div>
      </section>

      <section className="bg-ink px-5 py-40 text-paper md:px-10">
        <ScrollText lines={["WE DON'T JUST", "MAKE THINGS", "LOOK GOOD.", "", "WE MAKE THEM", "WORK."].filter(Boolean)} className="text-[10vw]" />
      </section>

      <section id="process" className="px-5 py-32 md:px-10">
        <Label t="03 — PROCESS" />
        {STEPS.map((s, i) => <ScrollText key={s} lines={[`0${i + 1}  ${s}`]} className="border-t border-ink py-6 text-[8vw]" />)}
      </section>

      <section id="about" className="px-5 pb-32 md:px-10">
        <ScrollText lines={["SMALL STUDIO.", "BIG DIGITAL THINKING."]} className="text-[9vw]" />
        <p className="mt-12 max-w-lg text-sm leading-relaxed">A focused independent studio. Founder of ResaleBrt, a live local marketplace in Biratnagar, and developer of the Elabs Society website at KIIT University. We build real products and ship them.</p>
        <p className="mt-16 text-3xl font-medium leading-tight tracking-tight md:text-6xl">{TECH.join("  /  ")}</p>
      </section>

      <section id="contact" className="bg-ink px-5 py-32 text-paper md:px-10">
        <ScrollText lines={["WHAT ARE YOU", "BUILDING NEXT?"]} className="text-[10vw]" />
        <Ignite className="mt-12"><SlideUp label="START A PROJECT" href="#form" dark /></Ignite>
        <form id="form" onSubmit={send} className="mt-24 grid max-w-3xl gap-6 text-sm">
          <input name="name" required placeholder="NAME" className={input} /><input name="email" type="email" required placeholder="EMAIL" className={input} />
          <input name="business" placeholder="BUSINESS" className={input} />
          <select name="need" className={input + " [&>option]:text-ink"}>{["Website", "Branding", "Creative design", "Automation", "AI solution", "Custom product / MVP"].map(o => <option key={o}>{o}</option>)}</select>
          <input name="budget" placeholder="BUDGET" className={input} /><textarea name="details" rows={4} placeholder="PROJECT DETAILS" className={input} />
          <div><SlideUp label="SEND INQUIRY" dark /></div>
        </form>
      </section>

      <footer className="bg-ink px-5 pb-10 pt-20 text-paper md:px-10">
        <div className="mb-6"><Logo size={72} /></div><p className="text-[9vw] font-medium leading-none tracking-tight">{AGENCY_NAME}</p>
        <div className="mt-12 grid gap-8 text-[11px] tracking-[.18em] md:grid-cols-4">
          <div>CREATIVE TECHNOLOGY STUDIO<br />WEB · BRAND · AI · AUTOMATION</div><div>NEPAL / WORLDWIDE<br /><Clock /></div>
          <div>{SOCIALS.map(([n, h]) => <a key={n} href={h} className="block">{n} ↗</a>)}</div>
          <div><a href={`mailto:${EMAIL}`}>{EMAIL}</a><br /><button className="mt-3 opacity-60" onClick={() => { localStorage.removeItem("intro-seen"); location.reload(); }}>REPLAY INTRO</button></div>
        </div>
      </footer>
    </main>
  </>;
}
