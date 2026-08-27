"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useScrollRange } from "@/lib/use-scroll-range";
import { SectionLabel } from "./primitives";

export function WhatIsFoss() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Lid opening
  const lidRotate = useScrollRange(scrollYProgress, [0.28, 0.55], [0, -108]);
  const lidOpacity = useScrollRange(scrollYProgress, [0.5, 0.62], [1, 0.15]);
  const codeOpacity = useScrollRange(scrollYProgress, [0.4, 0.58], [0, 1]);
  const codeY = useScrollRange(scrollYProgress, [0.4, 0.62], [24, 0]);
  const labelOpacity = useScrollRange(scrollYProgress, [0.2, 0.33], [1, 0]);

  return (
    <section
      id="what"
      className="relative border-t-2 border-ink/15 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-10">
        <SectionLabel index="02" color="text-blue">
          So… what is FOSS?
        </SectionLabel>

        <div className="mt-8 grid items-center gap-14 lg:grid-cols-2 lg:gap-8">
          <div>
            <h2 className="display-tight text-[clamp(2.2rem,7vw,4.6rem)]">
              Every app is a{" "}
              <span className="relative inline-block">
                <span className="relative z-10">box</span>
                <svg
                  aria-hidden
                  viewBox="0 0 200 20"
                  className="absolute inset-x-[-6%] bottom-[-6%] z-0 h-3 w-[112%] text-blue"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 14 C 60 4, 140 18, 198 6"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              .
            </h2>
            <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-ink-soft sm:text-lg">
              Most software is a closed box. You can press the buttons, but you
              can never look inside to see how it works.
            </p>
            <p className="mt-4 max-w-md text-pretty text-base leading-relaxed sm:text-lg">
              <strong className="font-bold">
                Open source software leaves the box open.
              </strong>{" "}
              The instructions inside - the{" "}
              <span className="font-mono text-sm text-blue">source code</span> -
              are there for anyone to read.
            </p>

            <div className="mt-8 rounded-lg border-l-4 border-ink bg-paper px-4 py-3 hard-shadow">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft">
                Plain english
              </p>
              <p className="mt-1.5 text-sm leading-relaxed sm:text-base">
                Source code is just the human-written text that tells a computer
                what to do. Like a recipe.
              </p>
            </div>
          </div>

          {/* The opening box */}
          <div ref={ref} className="relative mx-auto w-full max-w-md">
            <div className="relative aspect-[4/3.4] [perspective:900px]">
              {/* body */}
              <div className="absolute inset-x-0 bottom-0 top-[22%] overflow-hidden rounded-lg ink-border bg-paper hard-shadow-lg">
                <motion.div
                  style={
                    reduced ? undefined : { opacity: codeOpacity, y: codeY }
                  }
                  className="h-full overflow-hidden bg-ink px-4 py-4 font-mono text-[11px] leading-relaxed text-paper/85 sm:text-xs"
                >
                  <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-lime">
                    source code
                  </div>
                  <div>
                    <span className="text-violet brightness-150">function</span>{" "}
                    greet(name) {"{"}
                  </div>
                  <div className="pl-4">
                    <span className="text-blue brightness-150">return</span>{" "}
                    <span className="text-lime brightness-90">
                      {"`hello, ${name}`"}
                    </span>
                  </div>
                  <div>{"}"}</div>
                  <div className="mt-2 text-paper/45">
                    {"// anyone can read this. that's the whole idea."}
                  </div>
                </motion.div>
              </div>

              {/* lid */}
              <motion.div
                style={
                  reduced
                    ? { transformOrigin: "50% 100%", opacity: 0.15 }
                    : {
                        rotateX: lidRotate,
                        opacity: lidOpacity,
                        transformOrigin: "50% 100%",
                      }
                }
                className="absolute inset-x-0 top-0 h-[34%] rounded-lg ink-border bg-yellow hard-shadow"
              >
                <motion.div
                  style={reduced ? undefined : { opacity: labelOpacity }}
                  className="grid h-full place-items-center"
                >
                  <span className="font-mono text-xs uppercase tracking-[0.28em] sm:text-sm">
                    software
                  </span>
                </motion.div>
              </motion.div>
            </div>
            <p className="mt-5 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
              keep scrolling - the lid opens
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
