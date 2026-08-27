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
import { Sticker } from "./primitives";

const LEVELS = [
  { label: "WORLD", at: 0.08 },
  { label: "INDIA", at: 0.22 },
  { label: "KERALA", at: 0.36 },
  { label: "THRISSUR", at: 0.5 },
  { label: "GECT", at: 0.63 },
];

function LevelWord({
  level,
  progress,
}: {
  level: (typeof LEVELS)[number];
  progress: MotionValue<number>;
}) {
  const opacity = useScrollRange(
    progress,
    [level.at - 0.06, level.at, level.at + 0.09, level.at + 0.14],
    [0, 1, 1, 0],
  );
  const rawScale = useScrollRange(
    progress,
    [level.at - 0.06, level.at + 0.14],
    [0.75, 1.6],
  );
  const transform = useTransform(rawScale, (s) => `scale(${s})`);
  return (
    <motion.span
      style={{ opacity, transform }}
      className="absolute display-tight text-[clamp(2.4rem,12vw,8rem)] text-ink"
    >
      {level.label}
    </motion.span>
  );
}

export function ZoomToGect() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const dotScale = useScrollRange(scrollYProgress, [0, 0.7], [1, 46]);
  const dotOpacity = useScrollRange(scrollYProgress, [0.6, 0.72], [1, 0]);
  const netOpacity = useScrollRange(scrollYProgress, [0, 0.35], [0.55, 0]);
  const revealOpacity = useScrollRange(scrollYProgress, [0.68, 0.8], [0, 1]);
  const revealScale = useScrollRange(scrollYProgress, [0.68, 0.85], [0.86, 1]);

  return (
    <section
      ref={ref}
      id="gect"
      className="relative h-[300svh] border-t-2 border-ink/15"
    >
      <div className="sticky top-0 grid h-svh place-items-center overflow-hidden px-5">
        {/* fading global network */}
        <motion.svg
          aria-hidden
          viewBox="0 0 100 100"
          style={reduced ? { opacity: 0 } : { opacity: netOpacity }}
          className="absolute inset-0 size-full"
          preserveAspectRatio="none"
        >
          {[
            [12, 18],
            [30, 74],
            [68, 22],
            [86, 62],
            [46, 90],
            [58, 44],
            [22, 48],
            [78, 88],
          ].map(([x, y], i) => (
            <g key={i}>
              <line
                x1="50"
                y1="50"
                x2={x}
                y2={y}
                stroke="var(--ink)"
                strokeOpacity="0.25"
                strokeWidth="0.3"
              />
              <circle cx={x} cy={y} r="1" fill="var(--ink)" fillOpacity="0.5" />
            </g>
          ))}
        </motion.svg>

        {/* zooming dot */}
        <motion.div
          aria-hidden
          style={
            reduced ? { opacity: 0 } : { scale: dotScale, opacity: dotOpacity }
          }
          className="absolute size-16 rounded-full bg-blue/12 ring-2 ring-blue/40"
        />

        {/* level words */}
        <div
          aria-hidden={reduced ? true : undefined}
          className="relative grid place-items-center"
        >
          {!reduced &&
            LEVELS.map((l) => (
              <LevelWord key={l.label} level={l} progress={scrollYProgress} />
            ))}
        </div>

        {/* the reveal */}
        <motion.div
          style={
            reduced
              ? { opacity: 1, scale: 1 }
              : { opacity: revealOpacity, scale: revealScale }
          }
          className="relative z-20 mx-auto max-w-3xl text-center"
        >
          <div className="mb-6 flex justify-center">
            <Sticker tone="lime">Now zoom in</Sticker>
          </div>
          <h2 className="display-tight text-[clamp(2.8rem,13vw,9rem)]">
            <Image
              src="/foss-logo.png"
              alt="FOSS GECT"
              width={240}
              height={240}
              className="mx-auto size-40 object-contain sm:size-52"
            />
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-pretty text-base leading-relaxed text-ink-soft sm:text-lg">
            A student community at Government Engineering College Thrissur,
            exploring, learning and contributing to open source.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-2.5">
            <Sticker tone="paper">Learn</Sticker>
            <Sticker tone="paper">Build</Sticker>
            <Sticker tone="paper">Contribute</Sticker>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
