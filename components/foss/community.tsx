"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useScrollRange } from "@/lib/use-scroll-range";
import { SectionLabel, Sticker, TerminalWindow } from "./primitives";

const LABELS = [
  "LEARN",
  "BUILD",
  "SHARE",
  "COLLABORATE",
  "CONTRIBUTE",
] as const;

export function Community() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const slowY = useScrollRange(scrollYProgress, [0, 1], [40, -40]);
  const fastY = useScrollRange(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section className="relative overflow-hidden border-t-2 border-ink/15 bg-paper py-20 sm:py-28">
      <div ref={ref} className="mx-auto max-w-6xl px-5 sm:px-10">
        <SectionLabel index="07" color="text-violet">
          It doesn&apos;t end there
        </SectionLabel>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <h2 className="display-tight text-[clamp(2rem,6vw,4rem)]">
              Events are just the
              <br />
              <span className="text-violet">excuse</span> to meet.
            </h2>
            <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-ink-soft sm:text-lg">
              In between the big ones, it&apos;s smaller stuff - someone stuck
              on an error, someone showing off a side project, someone
              explaining a thing they just figured out.
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {LABELS.map((l, i) => (
                <motion.span
                  key={l}
                  initial={reduced ? undefined : { opacity: 0, y: 12 }}
                  whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  <Sticker tone={i % 2 === 0 ? "violet" : "paper"}>{l}</Sticker>
                </motion.span>
              ))}
            </div>
          </div>

          {/* collage */}
          <div className="relative min-h-[22rem] sm:min-h-[26rem]">
            <motion.div
              style={reduced ? undefined : { y: slowY }}
              className="absolute left-0 top-2 w-[58%] rotate-[-3deg]"
            >
              <TerminalWindow title="doubts">
                <div className="text-lime">$ git push origin main</div>
                <div className="text-coral brightness-125">
                  ! rejected (non-fast-forward)
                </div>
                <div className="text-paper/55">
                  {"// someone will explain this to you"}
                </div>
              </TerminalWindow>
            </motion.div>

            <motion.div
              style={reduced ? undefined : { y: fastY }}
              className="absolute right-0 top-24 w-[52%] rotate-[4deg] rounded-lg ink-border bg-lime px-4 py-3.5 hard-shadow"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/60">
                side project
              </p>
              <p className="mt-1 text-sm font-bold leading-snug">
                &quot;I made a bot that pings me before the bus leaves&quot;
              </p>
            </motion.div>

            <motion.div
              style={reduced ? undefined : { y: slowY }}
              className="absolute bottom-14 left-4 w-[54%] -rotate-2 rounded-lg ink-border bg-paper px-4 py-3.5 hard-shadow"
            >
              <div className="flex items-center gap-1.5">
                {["bg-coral", "bg-blue", "bg-yellow", "bg-violet"].map((c) => (
                  <span
                    key={c}
                    className={`size-6 rounded-full border-2 border-ink ${c}`}
                    aria-hidden
                  />
                ))}
                <span className="ml-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                  + you
                </span>
              </div>
              <p className="mt-2.5 text-sm leading-snug text-ink-soft">
                Seniors, juniors, and a lot of arguing about editors.
              </p>
            </motion.div>

            <motion.div
              style={reduced ? undefined : { y: fastY }}
              className="absolute bottom-0 right-2 rotate-[-5deg] rounded-lg ink-border bg-ink px-3.5 py-2.5 hard-shadow"
            >
              <p className="font-mono text-[11px] text-paper">
                <span className="text-yellow">git</span> commit -m{" "}
                <span className="text-lime">&quot;learned a thing&quot;</span>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
