"use client"

import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

export function InitiativeHeading({
  index,
  title,
  tagline,
  accent,
}: {
  index: string
  title: string
  tagline: string
  accent: string
}) {
  const reduced = useReducedMotion()

  return (
    <div>
      <div className="flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-[0.22em]">
        <span className={cn("tabular-nums", accent)}>Initiative {index}</span>
        <span aria-hidden className="h-px flex-1 bg-ink/20" />
      </div>
      <motion.h3
        initial={reduced ? undefined : { opacity: 0, y: 22 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mt-3 display-tight text-[clamp(2rem,6.5vw,4.2rem)]"
      >
        {title}
      </motion.h3>
      <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-ink-soft sm:text-[13px]">{tagline}</p>
    </div>
  )
}
