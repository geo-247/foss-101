"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useScrollRange } from "@/lib/use-scroll-range";
import type { Initiative } from "@/lib/initiatives";
import { Sticker } from "./primitives";
import { InitiativeHeading } from "./initiative-heading";

const accentStyles = {
  yellow: { text: "text-yellow", bg: "bg-yellow", wash: "bg-yellow/20" },
  blue: { text: "text-blue", bg: "bg-blue", wash: "bg-blue/15" },
  coral: { text: "text-coral", bg: "bg-coral", wash: "bg-coral/15" },
  lime: { text: "text-lime", bg: "bg-lime", wash: "bg-lime/25" },
  violet: { text: "text-violet", bg: "bg-violet", wash: "bg-violet/15" },
} as const;

export function PastEvent({
  event,
  reverse = false,
}: {
  event: Initiative;
  reverse?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useScrollRange(scrollYProgress, [0, 1], [44, -44]);
  const imageRotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [reverse ? 4 : -4, 0, reverse ? -3 : 3],
  );
  const contentX = useScrollRange(
    scrollYProgress,
    [0.05, 0.3],
    [reverse ? 24 : -24, 0],
  );
  const accent = accentStyles[event.accent];

  return (
    <article ref={ref} className="relative py-14 sm:py-20">
      <div
        className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${reverse ? "lg:[&>div:first-child]:order-2" : ""}`}
      >
        <motion.div
          style={reduced ? undefined : { x: contentX }}
          className="relative z-10"
        >
          <InitiativeHeading
            index={event.index}
            title={event.title}
            tagline={event.tagline}
            accent={accent.text}
          />
          <p className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-ink-soft sm:text-lg">
            {event.description}
          </p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            {event.highlights.map((highlight) => (
              <Sticker
                key={highlight}
                tone={event.accent === "violet" ? "paper" : event.accent}
              >
                {highlight}
              </Sticker>
            ))}
          </div>
        </motion.div>

        <div className="relative min-h-[18rem] sm:min-h-[22rem]">
          <motion.div
            aria-hidden
            style={reduced ? undefined : { rotate: imageRotate }}
            className={`absolute inset-5 rounded-[2rem] ${accent.wash} rotate-3`}
          />
          <motion.a
            href={event.instagramUrl}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`View the ${event.title.toLowerCase()} Instagram post`}
            style={reduced ? undefined : { y: imageY, rotate: imageRotate }}
            className="relative mx-auto block max-w-md overflow-hidden rounded-xl ink-border bg-paper p-2 hard-shadow-lg"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-ink/10">
              <Image
                src={event.photos[0].src}
                alt={event.photos[0].alt}
                fill
                sizes="(max-width: 1024px) 90vw, 42vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
              <span
                className={`absolute bottom-4 left-4 rounded-full border-2 border-ink px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] ${accent.bg} text-ink`}
              >
                {event.photos[0].caption}
              </span>
            </div>
            {event.photos.length > 1 && (
              <div className="mt-2 grid grid-cols-2 gap-2">
                {event.photos.slice(1).map((photo) => (
                  <div
                    key={photo.src}
                    className="relative aspect-[4/3] overflow-hidden rounded-md bg-ink/10"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="20vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
            <figcaption className="flex items-center justify-between px-1 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
              <span>FOSS GECT / archive</span>
              <span className={accent.text}>View post ↗</span>
            </figcaption>
          </motion.a>
        </div>
      </div>
    </article>
  );
}
