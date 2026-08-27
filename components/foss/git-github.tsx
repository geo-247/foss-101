"use client";

import Image from "next/image";
import { useRef, useState } from "react";
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

const data = initiatives[1];

type Commit = {
  cx: number;
  cy: number;
  at: number;
  branch: "main" | "feature" | "fix";
};

const COMMITS: Commit[] = [
  { cx: 20, cy: 60, at: 0.12, branch: "main" },
  { cx: 80, cy: 60, at: 0.2, branch: "main" },
  { cx: 140, cy: 60, at: 0.28, branch: "main" },
  { cx: 200, cy: 24, at: 0.38, branch: "feature" },
  { cx: 260, cy: 24, at: 0.46, branch: "feature" },
  { cx: 200, cy: 96, at: 0.54, branch: "fix" },
  { cx: 320, cy: 60, at: 0.66, branch: "main" },
];

const BRANCH_COLOR: Record<Commit["branch"], string> = {
  main: "var(--ink)",
  feature: "var(--blue)",
  fix: "var(--violet)",
};

const PR_STATES = [
  { label: "OPEN", tone: "bg-lime" },
  { label: "IN REVIEW", tone: "bg-yellow" },
  { label: "MERGED", tone: "bg-violet" },
] as const;

function CommitDot({
  commit,
  progress,
  reduced,
}: {
  commit: Commit;
  progress: MotionValue<number>;
  reduced: boolean | null;
}) {
  const scale = useScrollRange(
    progress,
    [commit.at - 0.05, commit.at + 0.02],
    [0, 1],
  );
  return (
    <motion.circle
      cx={commit.cx}
      cy={commit.cy}
      r="8"
      fill={BRANCH_COLOR[commit.branch]}
      stroke="var(--ink)"
      strokeWidth="2.5"
      style={
        reduced
          ? undefined
          : { scale, transformBox: "fill-box", transformOrigin: "center" }
      }
    />
  );
}

export function GitGithub() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [pr, setPr] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const mainLen = useScrollRange(scrollYProgress, [0.08, 0.32], [0, 1]);
  const featureLen = useScrollRange(scrollYProgress, [0.3, 0.5], [0, 1]);
  const fixLen = useScrollRange(scrollYProgress, [0.46, 0.6], [0, 1]);
  const mergeLen = useScrollRange(scrollYProgress, [0.58, 0.72], [0, 1]);
  const photoY = useScrollRange(scrollYProgress, [0, 1], [40, -50]);

  return (
    <div ref={ref} className="relative py-16 sm:py-24">
      <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        {/* graph */}
        <div className="relative order-2 lg:order-1">
          <div className="relative rounded-xl ink-border bg-paper p-5 hard-shadow-lg sm:p-7">
            <div
              aria-hidden
              className="absolute inset-0 dot-paper opacity-60"
            />
            <svg viewBox="0 0 360 130" className="relative w-full" aria-hidden>
              <motion.path
                d="M20 60 H140"
                stroke="var(--ink)"
                strokeWidth="3"
                fill="none"
                style={reduced ? undefined : { pathLength: mainLen }}
              />
              <motion.path
                d="M140 60 C170 60 170 24 200 24 H260"
                stroke="var(--blue)"
                strokeWidth="3"
                fill="none"
                style={reduced ? undefined : { pathLength: featureLen }}
              />
              <motion.path
                d="M140 60 C170 60 170 96 200 96"
                stroke="var(--violet)"
                strokeWidth="3"
                fill="none"
                style={reduced ? undefined : { pathLength: fixLen }}
              />
              <motion.path
                d="M260 24 C290 24 290 60 320 60"
                stroke="var(--blue)"
                strokeWidth="3"
                fill="none"
                strokeDasharray="0"
                style={reduced ? undefined : { pathLength: mergeLen }}
              />
              <motion.path
                d="M200 96 C240 96 280 60 320 60"
                stroke="var(--violet)"
                strokeWidth="3"
                fill="none"
                style={reduced ? undefined : { pathLength: mergeLen }}
              />
              {COMMITS.map((c) => (
                <CommitDot
                  key={`${c.cx}-${c.cy}`}
                  commit={c}
                  progress={scrollYProgress}
                  reduced={reduced}
                />
              ))}
            </svg>
            <div className="relative mt-3 flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full border border-ink bg-ink" />{" "}
                main
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full border border-ink bg-blue" />{" "}
                new feature
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full border border-ink bg-violet" />{" "}
                bug fix
              </span>
            </div>
          </div>

          <motion.figure
            style={reduced ? undefined : { y: photoY }}
            className="absolute -bottom-10 -right-3 w-32 rotate-[5deg] rounded-sm ink-border bg-paper p-1.5 hard-shadow sm:w-40 lg:-right-10"
          >
            <Image
              src={data.photos[0].src || "/placeholder.svg"}
              alt={data.photos[0].alt}
              width={320}
              height={240}
              className="h-24 w-full object-cover sm:h-28"
            />
            <figcaption className="pt-1.5 text-center font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft">
              {data.photos[0].caption}
            </figcaption>
          </motion.figure>
        </div>

        {/* copy */}
        <div className="order-1 lg:order-2">
          <InitiativeHeading
            index={data.index}
            title={data.title}
            tagline={data.tagline}
            accent="text-blue"
          />

          <dl className="mt-7 space-y-5">
            <div>
              <dt className="display-tight text-2xl sm:text-3xl">GIT</dt>
              <dd className="mt-1.5 max-w-sm text-base leading-relaxed text-ink-soft">
                Tracks your work. Every change is saved, so nothing is ever
                really lost.
              </dd>
            </div>
            <div>
              <dt className="display-tight text-2xl sm:text-3xl">
                GIT<span className="text-blue">HUB</span>
              </dt>
              <dd className="mt-1.5 max-w-sm text-base leading-relaxed text-ink-soft">
                A website where those projects live, so strangers can work on
                the same thing without stepping on each other.
              </dd>
            </div>
          </dl>

          <div className="mt-7 flex flex-wrap gap-2.5">
            {data.highlights.map((h) => (
              <Sticker key={h} tone="blue">
                {h}
              </Sticker>
            ))}
          </div>

          {/* PR state toy */}
          <div className="mt-9 max-w-sm rounded-xl ink-border bg-paper p-4 hard-shadow">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
              a pull request - hover to advance
            </p>
            <button
              type="button"
              onMouseEnter={() =>
                setPr((p) => Math.min(p + 1, PR_STATES.length - 1))
              }
              onFocus={() =>
                setPr((p) => Math.min(p + 1, PR_STATES.length - 1))
              }
              onClick={() => setPr((p) => (p + 1) % PR_STATES.length)}
              aria-label={`Pull request status: ${PR_STATES[pr].label}. Activate to advance.`}
              className="mt-3 flex w-full items-center gap-3 rounded-lg border-2 border-ink/20 px-3 py-2.5 text-left outline-none transition-colors hover:border-ink focus-visible:border-ink"
            >
              <span
                className={
                  "rounded-full border-2 border-ink px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors " +
                  PR_STATES[pr].tone
                }
              >
                {PR_STATES[pr].label}
              </span>
              <span className="font-mono text-[11px] text-ink-soft">
                fix: typo in README
              </span>
              <span
                aria-hidden
                className="ml-auto font-mono text-[11px] text-ink/40"
              >
                {pr === PR_STATES.length - 1 ? "✓" : "→"}
              </span>
            </button>
            <p className="mt-2.5 text-[13px] leading-relaxed text-ink-soft">
              A pull request is just you saying:{" "}
              <em>&quot;here&apos;s my change - want it?&quot;</em>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
