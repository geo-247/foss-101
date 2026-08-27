"use client";

import Image from "next/image";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { SectionLabel } from "./primitives";

const RECAP = [
  "You&apos;ve used FOSS.",
  "You know what it means.",
  "You&apos;ve seen what we do.",
];

export function FinalCta() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <section
      id="join"
      className="relative overflow-hidden border-t-2 border-ink/15"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-paper opacity-45"
      />
      <div
        ref={ref}
        className="relative mx-auto max-w-6xl px-5 py-24 sm:px-10 sm:py-32"
      >
        <SectionLabel index="08" color="text-lime">
          What can you do?
        </SectionLabel>

        <p className="mt-10 display-tight text-[clamp(3rem,14vw,9rem)]">SO…</p>

        <ul className="mt-6 space-y-2">
          {[
            "You've used FOSS.",
            "You know what it means.",
            "You've seen what we do.",
          ].map((line, i) => (
            <motion.li
              key={line}
              initial={reduced ? undefined : { opacity: 0, x: -14 }}
              animate={inView && !reduced ? { opacity: 1, x: 0 } : undefined}
              transition={{ delay: 0.25 + i * 0.28, duration: 0.45 }}
              className="flex items-center gap-3 text-lg text-ink-soft sm:text-xl"
            >
              <span
                aria-hidden
                className="size-2 shrink-0 rounded-full bg-lime ring-2 ring-ink"
              />
              {line}
            </motion.li>
          ))}
        </ul>

        <motion.h2
          initial={reduced ? undefined : { opacity: 0, y: 26 }}
          animate={inView && !reduced ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 1.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 max-w-4xl display-tight text-[clamp(2.4rem,9vw,6.4rem)]"
        >
          WHY NOT{" "}
          <span className="relative inline-block">
            <span className="relative z-10">BUILD</span>
            <span
              aria-hidden
              className="absolute inset-x-[-3%] bottom-[10%] z-0 h-[34%] -rotate-1 bg-lime"
            />
          </span>{" "}
          WITH US<span className="text-coral">?</span>
        </motion.h2>

        <p className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-ink-soft sm:text-lg">
          Your first contribution could start here. You don&apos;t need to know
          Linux, Git, or anything yet - that&apos;s the whole point of showing
          up.
        </p>

        <div className="mt-11 flex flex-wrap gap-3.5">
          <a
            href="https://chat.whatsapp.com/ILFscyYQCXmIKXjMl00gSv?s=sw&p=a&mlu=0"
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-lg ink-border bg-ink px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.16em] text-paper transition-transform hover:-translate-y-0.5 hard-shadow"
          >
            Join the community
          </a>
          <a
            href="https://www.instagram.com/fossgect/"
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-lg ink-border bg-paper px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.16em] transition-transform hover:-translate-y-0.5 hard-shadow"
          >
            Explore our events
          </a>
          <a
            href="https://github.com/fossgect"
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-lg ink-border bg-paper px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.16em] transition-transform hover:-translate-y-0.5 hard-shadow"
          >
            GitHub ↗
          </a>
        </div>
      </div>

      <footer className="relative border-t-2 border-ink/15 bg-paper">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-10">
          <div>
            <p className="display-tight text-3xl sm:text-4xl">
              <Image
                src="/foss-logo.png"
                alt="FOSS GECT"
                width={120}
                height={120}
                className="size-24 object-contain sm:size-28"
              />
            </p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
              Learn. Build. Contribute.
            </p>
          </div>
          <p className="max-w-xs font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.14em] text-ink-soft">
            Government Engineering College Thrissur
            <br />
            Kerala, India
          </p>
        </div>
      </footer>
    </section>
  );
}
