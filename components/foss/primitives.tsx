"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function SectionLabel({
  index,
  children,
  color = "text-ink-soft",
}: {
  index: string
  children: ReactNode
  color?: string
}) {
  return (
    <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em]">
      <span className={cn("tabular-nums", color)}>{index}</span>
      <span aria-hidden className="h-px w-8 bg-ink/25" />
      <span className="text-ink-soft">{children}</span>
    </div>
  )
}

export function Sticker({
  children,
  className,
  tone = "paper",
}: {
  children: ReactNode
  className?: string
  tone?: "paper" | "lime" | "yellow" | "coral" | "blue" | "violet" | "ink"
}) {
  const tones: Record<string, string> = {
    paper: "bg-paper text-ink",
    lime: "bg-lime text-ink",
    yellow: "bg-yellow text-ink",
    coral: "bg-coral text-paper",
    blue: "bg-blue text-paper",
    violet: "bg-violet text-paper",
    ink: "bg-ink text-paper",
  }
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full ink-border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] hard-shadow",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function TerminalWindow({
  title = "bash",
  children,
  className,
}: {
  title?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn("overflow-hidden rounded-lg ink-border bg-ink hard-shadow", className)}>
      <div className="flex items-center gap-1.5 border-b-2 border-ink/40 bg-ink px-3 py-1.5">
        <span className="size-2 rounded-full bg-coral" />
        <span className="size-2 rounded-full bg-yellow" />
        <span className="size-2 rounded-full bg-lime" />
        <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/60">{title}</span>
      </div>
      <div className="bg-ink px-3 py-2.5 font-mono text-[11px] leading-relaxed text-paper/90 sm:text-xs">{children}</div>
    </div>
  )
}

export function BigWord({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("display-tight block", className)}>{children}</span>
}
