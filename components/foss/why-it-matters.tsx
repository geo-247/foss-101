"use client"

import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"
import { useScrollRange } from "@/lib/use-scroll-range"
import { SectionLabel } from "./primitives"

type Node = {
  id: string
  x: number
  y: number
  at: number
  label: string
  action: string
  color: string
}

const NODES: Node[] = [
  { id: "a", x: 22, y: 26, at: 0.2, label: "Meera", action: "fixed a bug", color: "var(--coral)" },
  { id: "b", x: 78, y: 24, at: 0.3, label: "Kenji", action: "improved the docs", color: "var(--blue)" },
  { id: "c", x: 14, y: 68, at: 0.4, label: "Amal", action: "added a feature", color: "var(--lime)" },
  { id: "d", x: 84, y: 70, at: 0.5, label: "Sofía", action: "translated it", color: "var(--violet)" },
  { id: "e", x: 50, y: 12, at: 0.58, label: "Rin", action: "wrote a test", color: "var(--yellow)" },
  { id: "f", x: 50, y: 86, at: 0.64, label: "Dev", action: "reported an issue", color: "var(--coral)" },
  { id: "g", x: 8, y: 44, at: 0.7, label: "Yara", action: "designed an icon", color: "var(--blue)" },
  { id: "h", x: 92, y: 46, at: 0.76, label: "Tobi", action: "made it faster", color: "var(--lime)" },
]

const STAGES = ["ONE PROJECT", "PEOPLE", "COLLABORATION", "COMMUNITY"]

function NetworkNode({ node, progress, reduced }: { node: Node; progress: MotionValue<number>; reduced: boolean | null }) {
  const opacity = useScrollRange(progress, [node.at - 0.05, node.at + 0.03], [0, 1])
  const scale = useScrollRange(progress, [node.at - 0.05, node.at + 0.05], [0.3, 1])

  return (
    <motion.div
      style={reduced ? { left: `${node.x}%`, top: `${node.y}%` } : { left: `${node.x}%`, top: `${node.y}%`, opacity, scale }}
      className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
    >
      <div className="flex flex-col items-center gap-1.5">
        <span
          className="size-5 rounded-full border-2 border-ink sm:size-6"
          style={{ backgroundColor: node.color }}
          aria-hidden
        />
        <span className="whitespace-nowrap rounded-full border border-ink/25 bg-paper/90 px-1.5 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.1em] sm:text-[9.5px]">
          {node.action}
        </span>
      </div>
    </motion.div>
  )
}

function Edge({ node, progress, reduced }: { node: Node; progress: MotionValue<number>; reduced: boolean | null }) {
  const pathLength = useScrollRange(progress, [node.at - 0.04, node.at + 0.06], [0, 1])
  return (
    <motion.line
      x1="50"
      y1="50"
      x2={node.x}
      y2={node.y}
      stroke="var(--ink)"
      strokeOpacity="0.35"
      strokeWidth="0.4"
      style={reduced ? undefined : { pathLength }}
    />
  )
}

export function WhyItMatters() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })

  const stageIndex = useTransform(scrollYProgress, [0.18, 0.36, 0.54, 0.72], [0, 1, 2, 3])
  const coreScale = useScrollRange(scrollYProgress, [0.1, 0.3], [1, 0.82])

  return (
    <section id="why" className="relative border-t-2 border-ink/15 bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-10">
        <SectionLabel index="04" color="text-lime">
          Why does it matter?
        </SectionLabel>

        <div className="mt-8 max-w-2xl">
          <h2 className="display-tight text-[clamp(2.2rem,7vw,4.6rem)]">
            One person starts it.
            <br />
            <span className="text-ink-soft">Everyone else</span> makes it good.
          </h2>
        </div>

        <div ref={ref} className="relative mt-14">
          <div className="relative mx-auto aspect-square w-full max-w-2xl">
            <div aria-hidden className="absolute inset-0 dot-paper opacity-60" />

            <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden preserveAspectRatio="none">
              {NODES.map((n) => (
                <Edge key={n.id} node={n} progress={scrollYProgress} reduced={reduced} />
              ))}
            </svg>

            {/* core project */}
            <motion.div
              style={reduced ? undefined : { scale: coreScale }}
              className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="rounded-lg ink-border bg-ink px-4 py-3 text-center hard-shadow">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-lime">repository</p>
                <p className="mt-0.5 font-mono text-xs font-bold text-paper sm:text-sm">tiny-tool</p>
              </div>
            </motion.div>

            {NODES.map((n) => (
              <NetworkNode key={n.id} node={n} progress={scrollYProgress} reduced={reduced} />
            ))}
          </div>

          {/* stage ladder */}
          <ol className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em]">
            {STAGES.map((s, i) => (
              <li key={s} className="flex items-center gap-3">
                <StageChip label={s} index={i} stageIndex={stageIndex} reduced={reduced} />
                {i < STAGES.length - 1 && (
                  <span aria-hidden className="text-ink/30">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>

        <div className="mx-auto mt-14 max-w-2xl text-center">
          <p className="display-tight text-[clamp(1.6rem,4.6vw,2.9rem)]">
            Open source lets people build on{" "}
            <span className="relative inline-block">
              <span className="relative z-10">each other&apos;s work.</span>
              <span aria-hidden className="absolute inset-x-0 bottom-1 z-0 h-[26%] bg-lime" />
            </span>
          </p>
          <p className="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">
            That&apos;s how software gets better together.
          </p>
        </div>
      </div>
    </section>
  )
}

function StageChip({
  label,
  index,
  stageIndex,
  reduced,
}: {
  label: string
  index: number
  stageIndex: MotionValue<number>
  reduced: boolean | null
}) {
  const opacity = useTransform(stageIndex, [index - 0.6, index], [0.3, 1])
  return (
    <motion.span
      style={reduced ? undefined : { opacity }}
      className="rounded-full border-2 border-ink bg-background px-3 py-1"
    >
      {label}
    </motion.span>
  )
}
