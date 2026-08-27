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
import { initiatives } from "@/lib/initiatives";
import { Sticker, TerminalWindow } from "./primitives";
import { InitiativeHeading } from "./initiative-heading";

const data = initiatives[0];

const DISTROS = [
  { name: "Ubuntu", tone: "coral" as const },
  { name: "Fedora", tone: "blue" as const },
  { name: "Arch", tone: "paper" as const },
  { name: "Mint", tone: "lime" as const },
  { name: "Debian", tone: "paper" as const },
];

export function LinuxExpo() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const photoAY = useScrollRange(scrollYProgress, [0, 1], [50, -60]);
  const photoBY = useScrollRange(scrollYProgress, [0, 1], [-30, 70]);
  const lidRotate = useScrollRange(scrollYProgress, [0.15, 0.45], [-72, 0]);

  return (
    <div ref={ref} className="relative py-16 sm:py-24">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
        <div>
          <InitiativeHeading
            index={data.index}
            title={data.title}
            tagline={data.tagline}
            accent="text-yellow"
          />

          <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-ink-soft sm:text-lg">
            Linux is a free operating system - an alternative to Windows or
            macOS that anyone can study and change. At the expo, freshers
            watched it get installed on real laptops and then poked at it
            themselves.
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            {data.highlights.map((h) => (
              <Sticker key={h} tone="yellow">
                {h}
              </Sticker>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {DISTROS.map((d) => (
              <span
                key={d.name}
                className="rounded-md border border-ink/25 bg-paper px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-soft"
              >
                {d.name}
              </span>
            ))}
            <span className="px-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink/40">
              + more
            </span>
          </div>
        </div>

        {/* laptop + polaroids */}
        <div className="relative mx-auto w-full max-w-lg">
          <div className="relative mx-auto w-[85%] [perspective:1000px]">
            <motion.div
              style={
                reduced
                  ? { transformOrigin: "50% 100%" }
                  : { rotateX: lidRotate, transformOrigin: "50% 100%" }
              }
              className="relative z-10 overflow-hidden rounded-t-lg ink-border bg-ink"
            >
              <TerminalWindow
                title="gect@expo"
                className="rounded-none border-0 shadow-none"
              >
                <div className="text-lime">$ sudo apt install curiosity</div>
                <div className="text-paper/55">Unpacking curiosity (1.0) …</div>
                <div className="text-paper/55">Setting up curiosity …</div>
                <div className="text-yellow">$ uname -o</div>
                <div className="text-paper/85">GNU/Linux</div>
                <div className="mt-1 text-paper/40">
                  {"# it's yours to break and fix"}
                </div>
              </TerminalWindow>
            </motion.div>
            <div
              aria-hidden
              className="h-3.5 rounded-b-xl ink-border border-t-0 bg-paper hard-shadow"
            />
            <div
              aria-hidden
              className="mx-auto h-1.5 w-1/3 rounded-b-md bg-ink/15"
            />
          </div>

          {/* floating polaroids */}
          <motion.figure
            style={reduced ? undefined : { y: photoAY }}
            className="absolute -left-2 -top-6 w-32 rotate-[-7deg] rounded-sm ink-border bg-paper p-1.5 hard-shadow sm:w-40 lg:-left-14"
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

          <motion.figure
            style={reduced ? undefined : { y: photoBY }}
            className="absolute -bottom-8 -right-2 w-32 rotate-[6deg] rounded-sm ink-border bg-paper p-1.5 hard-shadow sm:w-40 lg:-right-12"
          >
            <Image
              src={data.photos[1].src || "/placeholder.svg"}
              alt={data.photos[1].alt}
              width={320}
              height={240}
              className="h-24 w-full object-cover sm:h-28"
            />
            <figcaption className="pt-1.5 text-center font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft">
              {data.photos[1].caption}
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </div>
  );
}
