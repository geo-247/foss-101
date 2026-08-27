"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { SectionLabel } from "./primitives";

export function FreeClarification() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();

  return (
    <section
      id="free"
      className="relative overflow-hidden border-t-2 border-ink/15 py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-paper opacity-40"
      />
      <div ref={ref} className="relative mx-auto max-w-6xl px-5 sm:px-10">
        <SectionLabel index="03" color="text-coral">
          One quick misunderstanding
        </SectionLabel>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <h2 className="display-tight text-[clamp(3.5rem,16vw,10rem)]">
              FREE<span className="text-coral">?</span>
            </h2>
            <div className="mt-4 space-y-2">
              <motion.p
                initial={reduced ? undefined : { opacity: 0, y: 10 }}
                animate={inView && !reduced ? { opacity: 1, y: 0 } : undefined}
                transition={{ delay: 0.2 }}
                className="display-tight text-3xl sm:text-4xl"
              >
                Yes.
              </motion.p>
              <motion.p
                initial={reduced ? undefined : { opacity: 0, y: 10 }}
                animate={inView && !reduced ? { opacity: 1, y: 0 } : undefined}
                transition={{ delay: 1.1 }}
                className="max-w-sm text-pretty text-lg leading-relaxed text-ink-soft"
              >
                But not necessarily free of charge.
              </motion.p>
              <motion.p
                initial={reduced ? undefined : { opacity: 0, y: 10 }}
                animate={inView && !reduced ? { opacity: 1, y: 0 } : undefined}
                transition={{ delay: 1.6 }}
                className="max-w-md pt-4 text-pretty text-base leading-relaxed sm:text-lg"
              >
                In FOSS,{" "}
                <strong className="font-bold">
                  &quot;free&quot; means freedom
                </strong>{" "}
                - free as in free speech, not free as in free pizza. (Though
                it&apos;s often both.)
              </motion.p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* price tag falls away */}
            <div className="relative overflow-hidden rounded-xl ink-border bg-paper p-6 hard-shadow">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
                not this
              </p>
              <p className="mt-3 display-tight text-2xl">
                FREE AS IN <span className="text-ink/35">PRICE</span>
              </p>
              <div className="relative mt-8 grid h-24 place-items-center">
                <motion.div
                  initial={
                    reduced ? undefined : { y: 0, rotate: -6, opacity: 1 }
                  }
                  animate={
                    inView && !reduced
                      ? { y: 120, rotate: 40, opacity: 0 }
                      : undefined
                  }
                  transition={{ delay: 0.8, duration: 1, ease: "easeIn" }}
                >
                  <svg width="96" height="60" viewBox="0 0 96 60" aria-hidden>
                    <path
                      d="M4 12 L64 12 L92 30 L64 48 L4 48 Z"
                      fill="var(--yellow)"
                      stroke="var(--ink)"
                      strokeWidth="2.5"
                    />
                    <circle
                      cx="72"
                      cy="30"
                      r="4"
                      fill="var(--paper)"
                      stroke="var(--ink)"
                      strokeWidth="2.5"
                    />
                    <text
                      x="30"
                      y="37"
                      fontFamily="var(--font-mono)"
                      fontSize="18"
                      fontWeight="700"
                      fill="var(--ink)"
                      textAnchor="middle"
                    >
                      ₹0
                    </text>
                  </svg>
                </motion.div>
                <span className="absolute bottom-0 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
                  price falls away
                </span>
              </div>
            </div>

            {/* lock opens */}
            <div className="relative overflow-hidden rounded-xl ink-border bg-lime p-6 hard-shadow">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/60">
                this
              </p>
              <p className="mt-3 display-tight text-2xl">FREE AS IN FREEDOM</p>
              <div className="relative mt-8 grid h-24 place-items-center">
                <svg width="72" height="86" viewBox="0 0 72 86" aria-hidden>
                  <motion.path
                    d="M20 40 V26 a16 16 0 0 1 32 0 V40"
                    stroke="var(--ink)"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                    initial={reduced ? undefined : { rotate: 0, x: 0 }}
                    animate={
                      inView && !reduced ? { rotate: -26, x: 12 } : undefined
                    }
                    transition={{
                      delay: 1.3,
                      type: "spring",
                      stiffness: 140,
                      damping: 12,
                    }}
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "bottom right",
                    }}
                  />
                  <rect
                    x="10"
                    y="40"
                    width="52"
                    height="40"
                    rx="7"
                    fill="var(--paper)"
                    stroke="var(--ink)"
                    strokeWidth="3"
                  />
                  <circle cx="36" cy="60" r="5" fill="var(--ink)" />
                </svg>
                <span className="absolute bottom-0 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/60">
                  the lock opens
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
