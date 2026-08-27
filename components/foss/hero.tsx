"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useScrollRange } from "@/lib/use-scroll-range";
import { Sticker, TerminalWindow } from "./primitives";

type Item = {
  id: string;
  label: string;
  blurb: string;
  x: number;
  y: number;
  depth: number;
  tone: "paper" | "lime" | "yellow" | "coral" | "blue" | "violet" | "ink";
  icon: string;
  kind?: "sticker" | "terminal" | "browser" | "code" | "branch";
};

const ITEMS: Item[] = [
  {
    id: "linux",
    label: "Linux",
    blurb: "The system running most of the internet - and your phone.",
    x: -30,
    y: -26,
    depth: 1.1,
    tone: "yellow",
    icon: "/software-icons/linux.png",
    kind: "terminal",
  },
  {
    id: "firefox",
    label: "Firefox",
    blurb: "A web browser anyone is allowed to inspect and improve.",
    x: 31,
    y: -30,
    depth: 0.75,
    tone: "coral",
    icon: "/software-icons/firefox.ico",
    kind: "browser",
  },
  {
    id: "git",
    label: "Git",
    blurb: "The tool that remembers every change you ever made.",
    x: 35,
    y: 12,
    depth: 1.35,
    tone: "blue",
    icon: "/software-icons/git.ico",
    kind: "branch",
  },
  {
    id: "python",
    label: "Python",
    blurb: "The language a lot of you will write your first program in.",
    x: -34,
    y: 16,
    depth: 0.9,
    tone: "lime",
    icon: "/software-icons/python.ico",
    kind: "code",
  },
  {
    id: "vlc",
    label: "VLC",
    blurb: "That traffic-cone media player that plays literally anything.",
    x: -21,
    y: 34,
    depth: 1.5,
    tone: "paper",
    icon: "/software-icons/vlc.ico",
  },
  {
    id: "blender",
    label: "Blender",
    blurb: "Free 3D software used in real films and games.",
    x: 20,
    y: 36,
    depth: 1.15,
    tone: "violet",
    icon: "/software-icons/blender.ico",
  },
  {
    id: "postgres",
    label: "PostgreSQL",
    blurb: "A database that stores the data behind countless apps.",
    x: 40,
    y: -6,
    depth: 0.6,
    tone: "paper",
    icon: "/software-icons/postgres.ico",
  },
  {
    id: "vscodium",
    label: "VS Code",
    blurb: "The editor you'll probably write your assignments in.",
    x: -40,
    y: -4,
    depth: 0.5,
    tone: "paper",
    icon: "/software-icons/vscode.ico",
  },
  {
    id: "krita",
    label: "Krita",
    blurb: "A painting app artists use, made by volunteers.",
    x: 8,
    y: -40,
    depth: 1.25,
    tone: "paper",
    icon: "/software-icons/krita.ico",
  },
  {
    id: "android",
    label: "Android",
    blurb: "Built on top of open source foundations.",
    x: -8,
    y: 46,
    depth: 0.7,
    tone: "paper",
    icon: "/software-icons/android.ico",
  },
];

const MOBILE_ITEM_IDS = new Set(["linux", "vscodium", "git", "firefox"]);
const MOBILE_ROTATIONS: Record<string, number> = {
  linux: -8,
  vscodium: 6,
  git: -5,
  firefox: 9,
};

function FloatingThing({
  item,
  progress,
  reduced,
}: {
  item: Item;
  progress: MotionValue<number>;
  reduced: boolean | null;
}) {
  const [open, setOpen] = useState(false);

  // Converge toward center as the user scrolls through the hero.
  const x = useTransform(progress, [0, 0.85], [item.x, 0]);
  const y = useTransform(progress, [0, 0.85], [item.y, 0]);
  const scale = useScrollRange(progress, [0, 0.7, 0.9], [1, 0.9, 0.25]);
  const opacity = useScrollRange(progress, [0, 0.55, 0.85], [1, 1, 0]);
  const drift = useTransform(progress, [0, 1], [0, -18 * item.depth]);

  const sx = useSpring(x, { stiffness: 60, damping: 22 });
  const sy = useSpring(y, { stiffness: 60, damping: 22 });

  const translateX = useTransform(sx, (v) => `${v - item.x}%`);
  const translateY = useTransform(
    [sy, drift],
    ([v, d]: number[]) => `calc(${v - item.y}% + ${d}px)`,
  );

  const position = { left: `${50 + item.x}%`, top: `${50 + item.y}%` };
  const mobileRotation = MOBILE_ROTATIONS[item.id] ?? 0;

  return (
    <motion.div
      style={
        reduced
          ? position
          : { ...position, x: translateX, y: translateY, scale, opacity }
      }
      className="pointer-events-auto absolute z-10 -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        animate={reduced ? undefined : { y: [0, -7, 0] }}
        transition={{
          duration: 4 + item.depth * 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <button
          type="button"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onClick={() => setOpen((v) => !v)}
          aria-label={`${item.label}: ${item.blurb}`}
          className="relative block cursor-help rounded-lg outline-none transition-transform duration-200 hover:-rotate-2 hover:scale-105 focus-visible:ring-2 focus-visible:ring-blue"
        >
          <div
            className="sm:hidden"
            style={{ transform: `rotate(${mobileRotation}deg)` }}
          >
            <Image
              src={item.icon}
              alt=""
              width={32}
              height={32}
              className="size-8 object-contain"
            />
          </div>
          <div className="hidden sm:block">
            {item.kind === "terminal" ? (
              <TerminalWindow
                title="linux"
                className="w-[170px] rotate-[-3deg] sm:w-[200px]"
              >
                <div className="text-lime">$ sudo apt install curiosity</div>
                <div className="text-paper/60">
                  Reading package lists... Done
                </div>
              </TerminalWindow>
            ) : item.kind === "browser" ? (
              <div className="w-[150px] rotate-[3deg] overflow-hidden rounded-lg ink-border bg-paper hard-shadow sm:w-[180px]">
                <div className="flex items-center gap-1.5 border-b-2 border-ink px-2 py-1.5">
                  <span className="size-1.5 rounded-full bg-ink/30" />
                  <span className="size-1.5 rounded-full bg-ink/30" />
                  <span className="ml-1 h-3 flex-1 rounded-full bg-coral/25" />
                </div>
                <div className="px-2.5 py-2 text-left">
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-coral">
                    Firefox
                  </div>
                  <div className="mt-1 h-1.5 w-full rounded bg-ink/10" />
                  <div className="mt-1 h-1.5 w-2/3 rounded bg-ink/10" />
                </div>
              </div>
            ) : item.kind === "branch" ? (
              <div className="rotate-[2deg] rounded-lg ink-border bg-paper px-3 py-2.5 hard-shadow">
                <svg
                  width="104"
                  height="52"
                  viewBox="0 0 104 52"
                  aria-hidden
                  className="overflow-visible"
                >
                  <path d="M6 14 H98" stroke="var(--ink)" strokeWidth="2" />
                  <path
                    d="M34 14 C50 14 50 40 66 40 H96"
                    stroke="var(--blue)"
                    strokeWidth="2"
                    fill="none"
                  />
                  {[6, 34, 62, 90].map((cx) => (
                    <circle
                      key={cx}
                      cx={cx}
                      cy="14"
                      r="4.5"
                      fill="var(--paper)"
                      stroke="var(--ink)"
                      strokeWidth="2"
                    />
                  ))}
                  {[66, 94].map((cx) => (
                    <circle
                      key={cx}
                      cx={cx}
                      cy="40"
                      r="4.5"
                      fill="var(--blue)"
                      stroke="var(--ink)"
                      strokeWidth="2"
                    />
                  ))}
                </svg>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-blue">
                  git
                </div>
              </div>
            ) : item.kind === "code" ? (
              <div className="w-[160px] rotate-[-2deg] rounded-lg ink-border bg-paper px-3 py-2.5 text-left hard-shadow sm:w-[185px]">
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                  python
                </div>
                <pre className="mt-1 font-mono text-[10.5px] leading-snug text-ink">
                  <span className="text-violet">def</span> hello():{"\n"}
                  {"  "}print(
                  <span className="text-lime brightness-75">
                    &quot;hi, GECT&quot;
                  </span>
                  )
                </pre>
              </div>
            ) : (
              <Sticker tone={item.tone}>{item.label}</Sticker>
            )}
          </div>
        </button>

        <div
          role="tooltip"
          className={
            "pointer-events-none absolute left-1/2 top-full z-30 mt-2 w-44 -translate-x-1/2 rounded-lg ink-border bg-ink px-2.5 py-2 text-left font-mono text-[10.5px] leading-snug text-paper transition-all duration-200 " +
            (open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0")
          }
        >
          {item.blurb}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const headingOpacity = useScrollRange(scrollYProgress, [0, 0.35], [1, 0]);
  const headingY = useScrollRange(scrollYProgress, [0, 0.5], [0, -80]);
  const fossScale = useScrollRange(scrollYProgress, [0.45, 0.95], [0.4, 1]);
  const fossOpacity = useScrollRange(scrollYProgress, [0.5, 0.75], [0, 1]);
  const gridY = useScrollRange(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section ref={ref} id="hero" className="relative h-[220svh]">
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
        <motion.div
          aria-hidden
          style={reduced ? undefined : { y: gridY }}
          className="pointer-events-none absolute inset-[-15%] grid-paper opacity-60"
        />

        <header className="relative z-30 flex items-center justify-between px-5 py-5 sm:px-10">
          <a href="#hero" className="flex items-center gap-2.5">
            <Image
              src="/foss-logo.png"
              alt="FOSS GECT"
              width={40}
              height={40}
              className="size-10 rounded-md bg-white object-contain"
              priority
            />
          </a>
          <a
            href="https://chat.whatsapp.com/ILFscyYQCXmIKXjMl00gSv?s=sw&p=a&mlu=0"
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-full ink-border bg-paper px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] transition-transform hover:-translate-y-0.5 hard-shadow"
          >
            Join
          </a>
        </header>

        <div className="relative flex flex-1 items-center justify-center px-5">
          {/* floating ecosystem */}
          <div
            aria-hidden={false}
            className="pointer-events-none absolute inset-0"
          >
            {ITEMS.filter((item) => MOBILE_ITEM_IDS.has(item.id)).map(
              (item) => (
                <FloatingThing
                  key={item.id}
                  item={item}
                  progress={scrollYProgress}
                  reduced={reduced}
                />
              ),
            )}
          </div>

          <motion.div
            style={
              reduced ? undefined : { opacity: headingOpacity, y: headingY }
            }
            className="relative z-20 mx-auto max-w-3xl text-center"
          >
            <div className="mb-5 flex justify-center">
              <Sticker tone="paper">
                <span className="size-1.5 rounded-full bg-lime" />
                Scroll Down
              </Sticker>
            </div>
            <h1 className="display-tight text-[clamp(2.6rem,11vw,7.5rem)]">
              <span className="block">YOU ALREADY</span>
              <span className="block">
                USE{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">FOSS</span>
                  <span
                    aria-hidden
                    className="absolute inset-x-[-4%] bottom-[8%] z-0 h-[38%] -rotate-1 bg-lime"
                  />
                </span>
                <span className="text-coral">.</span>
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-md text-pretty text-base leading-relaxed text-ink-soft sm:text-lg">
              You probably just don&apos;t call it that. Let&apos;s fix that in
              about two minutes.
            </p>
          </motion.div>

          {/* convergence target */}
          <motion.div
            aria-hidden
            style={
              reduced
                ? { opacity: 0 }
                : { scale: fossScale, opacity: fossOpacity }
            }
            className="absolute inset-0 z-20 grid place-items-center"
          >
            <span className="display-tight text-[clamp(4rem,22vw,16rem)]">
              F<span className="text-blue">O</span>S
              <span className="text-coral">S</span>
            </span>
          </motion.div>

          <motion.div
            aria-hidden={reduced ? true : undefined}
            style={reduced ? { opacity: 0 } : { opacity: fossOpacity }}
            animate={reduced ? undefined : { y: [10, 0], scale: [0.96, 1] }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="absolute left-1/2 top-[calc(50%+clamp(3rem,11vw,7rem))] z-20 w-[calc(100%-2.5rem)] -translate-x-1/2 text-center font-mono text-sm font-bold uppercase tracking-[0.14em] text-ink sm:text-base"
          >
            <span className="relative inline-block">
              <span className="relative z-10">Free</span>
              <motion.span
                aria-hidden
                initial={reduced ? undefined : { scaleX: 0 }}
                animate={reduced ? undefined : { scaleX: 1 }}
                transition={{ duration: 0.55, delay: 0.45, ease: "easeOut" }}
                className="absolute inset-x-[-8%] bottom-[1%] z-0 h-[38%] origin-left bg-lime"
              />
            </span>{" "}
            and Open Source Software
          </motion.div>
        </div>

        <div className="relative z-20 flex items-end justify-between px-5 pb-6 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft sm:px-10">
          <span>Govt. Engineering College Thrissur</span>
          <motion.span
            animate={reduced ? undefined : { y: [0, 5, 0] }}
            transition={{
              duration: 1.8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="hidden sm:block"
          >
            ↓ scroll
          </motion.span>
        </div>

        <a
          href="#free"
          aria-label="Scroll down to continue"
          className="absolute bottom-5 left-1/2 z-30 -translate-x-1/2 rounded-full p-2 text-ink/45 outline-none transition-colors hover:text-coral focus-visible:ring-2 focus-visible:ring-blue"
        >
          <span className="flex h-8 w-5 justify-center rounded-full border-2 border-current">
            <motion.span
              animate={reduced ? undefined : { y: [0, 4, 0] }}
              transition={{
                duration: 1.8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="mt-1.5 h-2 w-1 rounded-full bg-current"
            />
          </span>
        </a>
      </div>
    </section>
  );
}
