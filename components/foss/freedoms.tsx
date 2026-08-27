"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { SectionLabel } from "./primitives";

type Freedom = {
  key: "use" | "study" | "modify" | "share";
  word: string;
  line: string;
  accent: string;
  ring: string;
};

const FREEDOMS: Freedom[] = [
  {
    key: "use",
    word: "USE",
    line: "Run it, for anything, without asking permission.",
    accent: "bg-lime",
    ring: "ring-lime",
  },
  {
    key: "study",
    word: "STUDY",
    line: "Look inside and learn exactly how it works.",
    accent: "bg-blue",
    ring: "ring-blue",
  },
  {
    key: "modify",
    word: "MODIFY",
    line: "Change it so it does what you actually need.",
    accent: "bg-yellow",
    ring: "ring-yellow",
  },
  {
    key: "share",
    word: "SHARE",
    line: "Pass your version on to everyone else.",
    accent: "bg-coral",
    ring: "ring-coral",
  },
];

function Stage({ active }: { active: Freedom["key"] }) {
  const reduced = useReducedMotion();

  return (
    <div className="relative grid aspect-square w-full place-items-center overflow-hidden rounded-xl ink-border bg-paper hard-shadow-lg">
      <div aria-hidden className="absolute inset-0 dot-paper opacity-70" />

      <AnimatePresence mode="wait">
        {active === "use" && (
          <motion.div
            key="use"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.28 }}
            className="relative z-10 w-[72%]"
          >
            <div className="overflow-hidden rounded-lg ink-border bg-paper">
              <div className="flex items-center gap-1.5 border-b-2 border-ink px-2.5 py-1.5">
                <span className="size-2 rounded-full bg-coral" />
                <span className="size-2 rounded-full bg-yellow" />
                <span className="size-2 rounded-full bg-lime" />
              </div>
              <div className="space-y-2.5 p-4">
                <div className="h-2 w-3/4 rounded bg-ink/12" />
                <div className="h-2 w-full rounded bg-ink/12" />
                <motion.div
                  animate={reduced ? undefined : { scale: [1, 0.94, 1] }}
                  transition={{
                    duration: 1.6,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                  className="mt-4 inline-block rounded-md ink-border bg-lime px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em]"
                >
                  run it
                </motion.div>
              </div>
            </div>
            <motion.div
              aria-hidden
              animate={reduced ? undefined : { x: [0, -10, 0], y: [0, -8, 0] }}
              transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY }}
              className="absolute bottom-6 left-[34%] text-2xl"
            >
              <svg width="26" height="30" viewBox="0 0 26 30" aria-hidden>
                <path
                  d="M3 2 L3 22 L8 17 L12 27 L16 25 L12 15 L20 15 Z"
                  fill="var(--paper)"
                  stroke="var(--ink)"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </motion.div>
        )}

        {active === "study" && (
          <motion.div
            key="study"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.28 }}
            className="relative z-10 w-[76%]"
          >
            <div className="rounded-lg ink-border bg-ink px-4 py-4 font-mono text-[11px] leading-relaxed text-paper/80">
              <div>{"function render() {"}</div>
              <div className="pl-3 text-lime">{"  draw(pixels)"}</div>
              <div className="pl-3">{"  return frame"}</div>
              <div>{"}"}</div>
            </div>
            <motion.div
              aria-hidden
              animate={
                reduced ? undefined : { x: [-30, 40, -30], y: [10, -14, 10] }
              }
              transition={{
                duration: 4.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <svg width="88" height="88" viewBox="0 0 88 88" aria-hidden>
                <circle
                  cx="36"
                  cy="36"
                  r="26"
                  fill="var(--blue)"
                  fillOpacity="0.16"
                  stroke="var(--ink)"
                  strokeWidth="3"
                />
                <path
                  d="M56 56 L80 80"
                  stroke="var(--ink)"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          </motion.div>
        )}

        {active === "modify" && (
          <motion.div
            key="modify"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.28 }}
            className="relative z-10 w-[76%]"
          >
            <div className="space-y-1.5 rounded-lg ink-border bg-ink px-4 py-4 font-mono text-[11px] text-paper/80">
              <div className="rounded bg-coral/20 px-1.5 py-0.5 text-coral brightness-125">
                <span className="mr-1.5 text-paper/40">-</span> speed = 1
              </div>
              <motion.div
                animate={reduced ? undefined : { opacity: [0.2, 1] }}
                transition={{
                  duration: 0.9,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                className="rounded bg-lime/20 px-1.5 py-0.5 text-lime brightness-90"
              >
                <span className="mr-1.5 text-paper/40">+</span> speed = 10
              </motion.div>
              <div className="px-1.5 py-0.5 text-paper/45">
                {"// you decide how it behaves"}
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <span className="rounded-full ink-border bg-yellow px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em]">
                your version
              </span>
            </div>
          </motion.div>
        )}

        {active === "share" && (
          <motion.div
            key="share"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.28 }}
            className="relative z-10 w-[80%]"
          >
            <svg viewBox="0 0 240 170" className="w-full" aria-hidden>
              <path d="M28 85 H92" stroke="var(--ink)" strokeWidth="2.5" />
              <motion.path
                d="M92 85 C120 85 120 32 150 32 H206"
                stroke="var(--coral)"
                strokeWidth="2.5"
                fill="none"
                initial={reduced ? undefined : { pathLength: 0 }}
                animate={reduced ? undefined : { pathLength: 1 }}
                transition={{ duration: 1, delay: 0.15 }}
              />
              <motion.path
                d="M92 85 H206"
                stroke="var(--blue)"
                strokeWidth="2.5"
                fill="none"
                initial={reduced ? undefined : { pathLength: 0 }}
                animate={reduced ? undefined : { pathLength: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              />
              <motion.path
                d="M92 85 C120 85 120 138 150 138 H206"
                stroke="var(--violet)"
                strokeWidth="2.5"
                fill="none"
                initial={reduced ? undefined : { pathLength: 0 }}
                animate={reduced ? undefined : { pathLength: 1 }}
                transition={{ duration: 1, delay: 0.45 }}
              />
              <circle
                cx="28"
                cy="85"
                r="9"
                fill="var(--lime)"
                stroke="var(--ink)"
                strokeWidth="2.5"
              />
              {[
                { cx: 210, cy: 32, fill: "var(--coral)" },
                { cx: 210, cy: 85, fill: "var(--blue)" },
                { cx: 210, cy: 138, fill: "var(--violet)" },
              ].map((c) => (
                <motion.circle
                  key={c.cy}
                  cx={c.cx}
                  cy={c.cy}
                  r="9"
                  fill={c.fill}
                  stroke="var(--ink)"
                  strokeWidth="2.5"
                  initial={reduced ? undefined : { scale: 0 }}
                  animate={reduced ? undefined : { scale: 1 }}
                  transition={{ delay: 0.9, type: "spring", stiffness: 260 }}
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "center",
                  }}
                />
              ))}
            </svg>
            <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
              one project → many copies
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Freedoms() {
  const [active, setActive] = useState<Freedom["key"]>("use");

  return (
    <section className="relative overflow-hidden border-t-2 border-ink/15 bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-10">
        <SectionLabel index="02·b" color="text-violet">
          Four things you&apos;re allowed to do
        </SectionLabel>

        <h2 className="mt-6 display-tight text-[clamp(2rem,6vw,4rem)]">
          Open source gives you{" "}
          <span className="whitespace-nowrap">
            four <span className="text-violet">freedoms</span>.
          </span>
        </h2>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-start lg:gap-14">
          <ul className="divide-y-2 divide-ink/12 border-y-2 border-ink/12">
            {FREEDOMS.map((f, i) => {
              const isActive = active === f.key;
              return (
                <li key={f.key}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(f.key)}
                    onFocus={() => setActive(f.key)}
                    onClick={() => setActive(f.key)}
                    aria-pressed={isActive}
                    className="group flex w-full items-center gap-4 py-5 text-left outline-none focus-visible:bg-background sm:gap-6"
                  >
                    <span className="w-6 shrink-0 font-mono text-[11px] tabular-nums text-ink-soft">
                      0{i + 1}
                    </span>
                    <span className="relative">
                      <span
                        className={
                          "display-tight block text-[clamp(2rem,7vw,4.2rem)] transition-all duration-300 " +
                          (isActive
                            ? "translate-x-1.5"
                            : "text-ink/35 group-hover:text-ink/60")
                        }
                      >
                        {f.word}
                      </span>
                      {isActive && (
                        <motion.span
                          layoutId="freedom-highlight"
                          aria-hidden
                          className={
                            "absolute inset-x-0 bottom-1 -z-10 h-[30%] " +
                            f.accent
                          }
                        />
                      )}
                    </span>
                    <span
                      className={
                        "ml-auto hidden max-w-[15rem] text-sm leading-relaxed transition-opacity duration-300 sm:block " +
                        (isActive ? "opacity-100" : "opacity-0")
                      }
                    >
                      {f.line}
                    </span>
                  </button>
                  <p className="pb-5 text-sm leading-relaxed text-ink-soft sm:hidden">
                    {f.line}
                  </p>
                </li>
              );
            })}
          </ul>

          <div className="lg:sticky lg:top-24">
            <Stage active={active} />
            <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
              hover a word - the illustration changes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
