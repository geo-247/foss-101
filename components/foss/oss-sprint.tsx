"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useScrollRange } from "@/lib/use-scroll-range";
import { initiatives } from "@/lib/initiatives";
import { Sticker } from "./primitives";
import { InitiativeHeading } from "./initiative-heading";

const data = initiatives[2];

const STEPS = [
  { at: 0.16, title: "DISCOVER", line: "Browse real projects that need help." },
  {
    at: 0.3,
    title: "PICK ONE",
    line: "A typo, a bug, a missing example - anything counts.",
  },
  { at: 0.44, title: "MAKE A CHANGE", line: "Edit the code on your own copy." },
  { at: 0.58, title: "PULL REQUEST", line: "Send it back to the project." },
  {
    at: 0.72,
    title: "MERGED",
    line: "Your name is now in software other people use.",
  },
];

function Step({
  step,
  i,
  progress,
  reduced,
}: {
  step: (typeof STEPS)[number];
  i: number;
  progress: MotionValue<number>;
  reduced: boolean | null;
}) {
  const opacity = useScrollRange(
    progress,
    [step.at - 0.09, step.at],
    [0.22, 1],
  );
  const x = useScrollRange(
    progress,
    [step.at - 0.09, step.at],
    [i % 2 === 0 ? -26 : 26, 0],
  );

  return (
    <motion.li
      style={reduced ? undefined : { opacity, x }}
      className="relative pl-12 sm:pl-16"
    >
      <span
        aria-hidden
        className="absolute left-0 top-1 grid size-8 place-items-center rounded-full ink-border bg-paper font-mono text-[11px] font-bold sm:size-9"
      >
        {i + 1}
      </span>
      <p className="display-tight text-[clamp(1.5rem,4.4vw,2.6rem)]">
        {step.title}
        {i === STEPS.length - 1 && <span className="text-coral"> ✓</span>}
      </p>
      <p className="mt-1.5 max-w-sm text-[15px] leading-relaxed text-ink-soft">
        {step.line}
      </p>
    </motion.li>
  );
}

export function OssSprint() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const railScale = useScrollRange(scrollYProgress, [0.1, 0.78], [0, 1]);
  const mergeScale = useScrollRange(scrollYProgress, [0.7, 0.82], [0.6, 1]);
  const mergeOpacity = useScrollRange(scrollYProgress, [0.68, 0.8], [0, 1]);
  const photoY = useScrollRange(scrollYProgress, [0, 1], [60, -60]);
  const photoY2 = useScrollRange(scrollYProgress, [0, 1], [-20, 60]);

  return (
    <div ref={ref} className="relative py-16 sm:py-24">
      <InitiativeHeading
        index={data.index}
        title={data.title}
        tagline={data.tagline}
        accent="text-coral"
      />

      <div className="mt-12 grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-10">
        <div className="relative">
          <motion.span
            aria-hidden
            style={reduced ? undefined : { scaleY: railScale }}
            className="absolute left-4 top-2 h-[calc(100%-1rem)] w-0.5 origin-top bg-ink/25 sm:left-[1.1rem]"
          />
          <ol className="space-y-10">
            {STEPS.map((s, i) => (
              <Step
                key={s.title}
                step={s}
                i={i}
                progress={scrollYProgress}
                reduced={reduced}
              />
            ))}
          </ol>
        </div>

        <div className="relative">
          <div className="lg:sticky lg:top-28">
            {/* merged card */}
            <motion.div
              style={
                reduced
                  ? undefined
                  : { scale: mergeScale, opacity: mergeOpacity }
              }
              className="relative z-10 overflow-hidden rounded-xl ink-border bg-paper hard-shadow-lg"
            >
              <div className="flex items-center gap-2 border-b-2 border-ink bg-coral px-4 py-2.5">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-paper">
                  merged
                </span>
                <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-paper/75">
                  +14 −3
                </span>
              </div>
              <div className="space-y-1.5 bg-ink px-4 py-4 font-mono text-[11px] leading-relaxed">
                <div className="text-coral brightness-125">
                  - typo: &quot;recieve&quot;
                </div>
                <div className="text-lime brightness-90">
                  + fix: &quot;receive&quot;
                </div>
                <div className="pt-2 text-paper/45">
                  {"// your first contribution. really, that's it."}
                </div>
              </div>
              <div className="flex items-center gap-2 border-t-2 border-ink px-4 py-3">
                <span
                  className="size-6 rounded-full border-2 border-ink bg-lime"
                  aria-hidden
                />
                <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-soft">
                  contributor #1 - you
                </p>
              </div>
            </motion.div>

            <motion.figure
              style={reduced ? undefined : { y: photoY }}
              className="absolute -left-4 -top-14 w-28 rotate-[-8deg] rounded-sm ink-border bg-paper p-1.5 hard-shadow sm:w-36"
            >
              <Image
                src={data.photos[0].src || "/placeholder.svg"}
                alt={data.photos[0].alt}
                width={320}
                height={240}
                className="h-20 w-full object-cover sm:h-24"
              />
              <figcaption className="pt-1.5 text-center font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft">
                {data.photos[0].caption}
              </figcaption>
            </motion.figure>

            <motion.figure
              style={reduced ? undefined : { y: photoY2 }}
              className="absolute -bottom-16 -right-2 w-28 rotate-[7deg] rounded-sm ink-border bg-paper p-1.5 hard-shadow sm:w-36"
            >
              <Image
                src={data.photos[1].src || "/placeholder.svg"}
                alt={data.photos[1].alt}
                width={320}
                height={240}
                className="h-20 w-full object-cover sm:h-24"
              />
              <figcaption className="pt-1.5 text-center font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft">
                {data.photos[1].caption}
              </figcaption>
            </motion.figure>
          </div>
        </div>
      </div>

      <div className="mt-24 max-w-2xl lg:mt-16">
        <p className="display-tight text-[clamp(1.5rem,4.4vw,2.7rem)]">
          From learning about open source to{" "}
          <span className="relative inline-block">
            <span className="relative z-10">contributing to it.</span>
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-1 z-0 h-[26%] bg-coral/35"
            />
          </span>
        </p>
        <div className="mt-6 flex flex-wrap gap-2.5">
          {data.highlights.map((h) => (
            <Sticker key={h} tone="coral">
              {h}
            </Sticker>
          ))}
        </div>
      </div>
    </div>
  );
}
