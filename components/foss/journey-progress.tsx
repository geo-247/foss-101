"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useSpring } from "motion/react"

const STOPS = [
  { id: "hero", label: "You already use it" },
  { id: "what", label: "What is it?" },
  { id: "free", label: "Free?" },
  { id: "why", label: "Why it matters" },
  { id: "interactive", label: "Try FOSS" },
  { id: "gect", label: "Who we are" },
  { id: "initiatives", label: "What we've done" },
  { id: "join", label: "What you can do" },
]

export function JourneyProgress() {
  const { scrollYProgress } = useScroll()
  const width = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  const [active, setActive] = useState("hero")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    )
    for (const stop of STOPS) {
      const el = document.getElementById(stop.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  const activeIndex = Math.max(
    0,
    STOPS.findIndex((s) => s.id === active),
  )

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX: width }}
        className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-ink"
      />
      <nav
        aria-label="Journey progress"
        className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
      >
        {STOPS.map((stop, i) => (
          <a
            key={stop.id}
            href={`#${stop.id}`}
            className="group flex items-center gap-2.5 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-blue"
          >
            <span
              aria-hidden
              className={
                "size-2.5 shrink-0 rounded-full border-2 border-ink transition-all duration-300 " +
                (i === activeIndex ? "scale-125 bg-lime" : i < activeIndex ? "bg-ink" : "bg-transparent")
              }
            />
            <span
              className={
                "font-mono text-[10px] uppercase tracking-[0.16em] transition-opacity duration-300 " +
                (i === activeIndex
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-70 group-focus-visible:opacity-100")
              }
            >
              {stop.label}
            </span>
            <span className="sr-only">Go to section: {stop.label}</span>
          </a>
        ))}
      </nav>
    </>
  )
}
