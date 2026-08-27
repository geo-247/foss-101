"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { SectionLabel, TerminalWindow } from "./primitives";

export function InteractiveSummary() {
  const [activeGame, setActiveGame] = useState<1 | 2 | 3 | 4>(1);
  const reduced = useReducedMotion();

  // Game 1 State
  const [unlocked, setUnlocked] = useState(false);

  // Game 2 State
  const [bugFixed, setBugFixed] = useState(false);
  const [game2Selection, setGame2Selection] = useState<number | null>(null);
  const [shakeCount, setShakeCount] = useState(0);

  // Game 3 State
  const [merged, setMerged] = useState(false);
  const [isMerging, setIsMerging] = useState(false);

  // Game 2 Options
  const game2Options = [
    { text: `console.log("Goodbye!");`, isCorrect: false },
    { text: `console.log("Hello!");`, isCorrect: true },
    { text: `console.log("Maybe?");`, isCorrect: false },
  ];

  const handleGame2Select = (index: number, isCorrect: boolean) => {
    setGame2Selection(index);
    if (isCorrect) {
      setBugFixed(true);
    } else {
      setShakeCount((prev) => prev + 1);
      // Reset shake count after animation finishes
      setTimeout(() => setShakeCount(0), 400);
    }
  };

  const triggerMergeAnimation = () => {
    if (merged || isMerging) return;
    setIsMerging(true);
    setTimeout(() => {
      setMerged(true);
      setIsMerging(false);
    }, 1200); // matches transition duration
  };

  const handleScrollToGect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const el = document.getElementById("gect");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleReset = () => {
    setActiveGame(1);
    setUnlocked(false);
    setBugFixed(false);
    setGame2Selection(null);
    setShakeCount(0);
    setMerged(false);
    setIsMerging(false);
  };

  return (
    <section
      id="interactive"
      className="relative border-t-2 border-ink/15 py-20 sm:py-28 bg-background"
    >
      {/* Background Dot Grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 dot-paper opacity-50"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-10">
        <SectionLabel index="05" color="text-yellow">
          Interactive FOSS Summary
        </SectionLabel>

        {/* Section Introduction */}
        <div className="mt-8 max-w-2xl">
          <h2 className="display-tight text-[clamp(2.2rem,7vw,4.6rem)]">
            Okay, but what does FOSS actually mean?
          </h2>
          <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-ink-soft sm:text-lg font-mono uppercase tracking-[0.1em]">
            Enough reading. Try it yourself.
          </p>
        </div>

        {/* Continuous Interactive Workspace Card */}
        <div className="mt-12 mx-auto max-w-2xl overflow-hidden rounded-xl ink-border bg-paper p-6 sm:p-8 hard-shadow-lg relative">
          {/* Continuous Experience Header: Steps Indicator */}
          <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-b-2 border-ink/12 pb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft sm:text-xs">
            <span
              className={cn(
                "transition-colors duration-300",
                activeGame === 1
                  ? "text-blue font-bold"
                  : activeGame > 1
                    ? "text-ink/30 line-through"
                    : "text-ink/30",
              )}
            >
              01. Unlock Code
            </span>
            <span className="text-ink/25">→</span>
            <span
              className={cn(
                "transition-colors duration-300",
                activeGame === 2
                  ? "text-yellow font-bold"
                  : activeGame > 2
                    ? "text-ink/30 line-through"
                    : "text-ink/30",
              )}
            >
              02. Fix Bug
            </span>
            <span className="text-ink/25">→</span>
            <span
              className={cn(
                "transition-colors duration-300",
                activeGame === 3
                  ? "text-coral font-bold"
                  : activeGame > 3
                    ? "text-ink/30 line-through"
                    : "text-ink/30",
              )}
            >
              03. Merge Code
            </span>
          </div>

          {/* Continuous Experience Workspace Area */}
          <div className="min-h-[280px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {activeGame === 1 && (
                <motion.div
                  key="game1"
                  initial={reduced ? undefined : { opacity: 0, y: 10 }}
                  animate={reduced ? undefined : { opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col gap-5 flex-1"
                >
                  <div className="space-y-1">
                    <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-blue font-bold">
                      Game 1 — Unlock the Code
                    </h3>
                    <p className="text-sm leading-relaxed text-ink-soft">
                      Open source means anyone is free to access and inspect the
                      source code.
                    </p>
                  </div>

                  <div className="relative">
                    <TerminalWindow title="greet.js" className="w-full">
                      <div className="relative min-h-[75px] font-mono text-[11px] sm:text-xs select-none">
                        {unlocked ? (
                          <motion.div
                            initial={reduced ? undefined : { opacity: 0 }}
                            animate={reduced ? undefined : { opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-1"
                          >
                            <div>
                              <span className="text-violet">function</span>{" "}
                              <span className="text-blue">greetUser</span>(){" "}
                              {"{"}
                            </div>
                            <div className="pl-4">
                              <span className="text-blue">return</span>{" "}
                              <span className="text-lime">"Hello, FOSS!"</span>;
                            </div>
                            <div>{"}"}</div>
                            <div className="text-paper/40 mt-2">
                              {"// The code is fully visible now."}
                            </div>
                          </motion.div>
                        ) : (
                          <div className="space-y-1 blur-[3.5px] opacity-40">
                            <div>function greetUser() {"{"}</div>
                            <div className="pl-4">return "Hello, FOSS!";</div>
                            <div>{"}"}</div>
                          </div>
                        )}

                        {/* Lock Overlay */}
                        {!unlocked && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-ink/75 rounded-md border border-paper/10">
                            <span className="text-3xl mb-1.5" aria-hidden>
                              🔒
                            </span>
                            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-paper/70">
                              Source Code Encrypted
                            </span>
                          </div>
                        )}
                      </div>
                    </TerminalWindow>
                  </div>

                  <div className="mt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-ink/8 pt-4">
                    {unlocked ? (
                      <>
                        <div className="flex items-center gap-2">
                          <span
                            className="text-lime font-bold text-sm"
                            aria-hidden
                          >
                            🔓
                          </span>
                          <span className="font-mono text-xs uppercase tracking-[0.1em] text-ink font-bold">
                            You can see the code.
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveGame(2)}
                          className="w-full sm:w-auto rounded-full ink-border bg-blue text-paper px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] hard-shadow hover:-translate-y-0.5 active:translate-y-0 transition-transform cursor-pointer"
                        >
                          Fix the Bug →
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="font-mono text-[11px] text-ink-soft uppercase tracking-[0.08em] text-center sm:text-left">
                          Click below to inspect the source code
                        </span>
                        <button
                          type="button"
                          onClick={() => setUnlocked(true)}
                          className="w-full sm:w-auto rounded-full ink-border bg-lime px-4 py-2.5 font-mono text-xs uppercase tracking-[0.16em] hard-shadow hover:-translate-y-0.5 active:translate-y-0 transition-transform cursor-pointer flex items-center justify-center gap-2"
                        >
                          <span>Unlock Code</span>
                          <span className="text-sm">🔑</span>
                        </button>
                      </>
                    )}
                  </div>
                </motion.div>
              )}

              {activeGame === 2 && (
                <motion.div
                  key="game2"
                  initial={reduced ? undefined : { opacity: 0, y: 10 }}
                  animate={reduced ? undefined : { opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col gap-5 flex-1"
                >
                  <div className="space-y-1">
                    <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-yellow font-bold">
                      Game 2 — Fix the Bug
                    </h3>
                    <p className="text-sm leading-relaxed text-ink-soft">
                      Open source means you can modify software. Anyone can find
                      and fix errors.
                    </p>
                  </div>

                  <motion.div
                    animate={
                      shakeCount > 0 ? { x: [-8, 8, -6, 6, -4, 4, 0] } : {}
                    }
                    transition={{ duration: 0.35 }}
                  >
                    <TerminalWindow
                      title="hello.js"
                      className={cn(
                        "w-full transition-colors duration-300",
                        bugFixed ? "border-lime" : "",
                      )}
                    >
                      <div className="min-h-[75px] font-mono text-[11px] sm:text-xs">
                        <div>
                          <span className="text-violet">function</span>{" "}
                          <span className="text-blue">sayHello</span>() {"{"}
                        </div>
                        <div className="pl-4">
                          {bugFixed ? (
                            <motion.span
                              key="fixed-code"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-lime brightness-95 font-bold"
                            >
                              console.log("Hello!");
                            </motion.span>
                          ) : (
                            <span className="text-coral brightness-110 line-through decoration-2">
                              console.log("Goodbye!");
                            </span>
                          )}
                        </div>
                        <div>{"}"}</div>
                        <div className="text-paper/40 mt-2">
                          {bugFixed
                            ? "// Fixed! You corrected the logic."
                            : "// Something's wrong. It greets with goodbye."}
                        </div>
                      </div>
                    </TerminalWindow>
                  </motion.div>

                  <div className="border-t border-ink/8 pt-4">
                    {bugFixed ? (
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-lime text-sm" aria-hidden>
                              🐛
                            </span>
                            <span className="font-mono text-xs uppercase tracking-[0.1em] text-lime font-bold">
                              Bug Fixed!
                            </span>
                          </div>
                          <span className="font-mono text-[11px] text-ink-soft">
                            You just made a change.
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveGame(3)}
                          className="w-full sm:w-auto rounded-full ink-border bg-blue text-paper px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] hard-shadow hover:-translate-y-0.5 active:translate-y-0 transition-transform cursor-pointer"
                        >
                          Merge Contribution →
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <p className="font-mono text-xs uppercase tracking-[0.12em] text-ink font-bold">
                          Something&apos;s wrong. Can you fix it?
                        </p>
                        <div className="flex flex-col gap-2">
                          {game2Options.map((opt, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() =>
                                handleGame2Select(i, opt.isCorrect)
                              }
                              className={cn(
                                "w-full text-left font-mono text-xs p-2.5 rounded border-2 transition-all cursor-pointer",
                                game2Selection === i
                                  ? opt.isCorrect
                                    ? "bg-lime/15 border-lime text-ink font-bold"
                                    : "bg-coral/10 border-coral text-ink"
                                  : "border-ink/15 bg-paper hover:bg-ink/5 hover:border-ink/30",
                              )}
                            >
                              <span className="mr-2 text-ink-soft font-mono select-none">
                                [{i + 1}]
                              </span>
                              {opt.text}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeGame === 3 && (
                <motion.div
                  key="game3"
                  initial={reduced ? undefined : { opacity: 0, y: 10 }}
                  animate={reduced ? undefined : { opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col gap-5 flex-1"
                >
                  <div className="space-y-1">
                    <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-coral font-bold">
                      Game 3 — Merge the Contribution
                    </h3>
                    <p className="text-sm leading-relaxed text-ink-soft">
                      Open source projects are built collaboratively. Merge your
                      branch back into the main project.
                    </p>
                  </div>

                  {/* SVG Git Branch Visualization */}
                  <div className="relative rounded-lg ink-border bg-paper p-4 overflow-hidden h-[120px] flex items-center justify-center">
                    <div
                      aria-hidden
                      className="absolute inset-0 dot-paper opacity-30"
                    />

                    <svg
                      viewBox="0 0 300 100"
                      className="w-full h-full overflow-visible z-10"
                    >
                      {/* Main line */}
                      <line
                        x1="20"
                        y1="30"
                        x2="260"
                        y2="30"
                        stroke="var(--ink)"
                        strokeWidth="2.5"
                      />

                      {/* Main commit nodes */}
                      {[25, 100].map((cx) => (
                        <circle
                          key={cx}
                          cx={cx}
                          cy="30"
                          r="4.5"
                          fill="var(--paper)"
                          stroke="var(--ink)"
                          strokeWidth="2.5"
                        />
                      ))}

                      {/* Branch line */}
                      <path
                        d="M100 30 C130 30, 120 75, 150 75 H200"
                        stroke="var(--blue)"
                        strokeWidth="2"
                        strokeDasharray="4 3"
                        fill="none"
                      />

                      {/* Target node on main */}
                      <circle
                        cx="220"
                        cy="30"
                        r="6"
                        className={cn(
                          "transition-colors duration-500",
                          merged ? "fill-lime" : "fill-paper",
                        )}
                        stroke="var(--ink)"
                        strokeWidth="2.5"
                      />

                      {/* Text Labels */}
                      <text
                        x="25"
                        y="18"
                        className="font-mono text-[9px] fill-ink-soft/80 tracking-[0.1em]"
                      >
                        MAIN BRANCH
                      </text>
                      <text
                        x="145"
                        y="90"
                        className="font-mono text-[9px] fill-blue/80 tracking-[0.1em]"
                      >
                        YOUR BRANCH
                      </text>

                      {/* Draggable/Animated Moving Node */}
                      <motion.circle
                        cx={180}
                        cy={75}
                        r="6.5"
                        animate={
                          merged
                            ? { cx: 220, cy: 30, scale: [1, 1.4, 1] }
                            : isMerging
                              ? { cx: 220, cy: 30 }
                              : { y: [0, -3, 0] }
                        }
                        transition={
                          merged
                            ? { duration: 0.4, ease: "easeOut" }
                            : isMerging
                              ? { duration: 1.1, ease: "easeInOut" }
                              : {
                                  duration: 2,
                                  repeat: Number.POSITIVE_INFINITY,
                                  ease: "easeInOut",
                                }
                        }
                        className={cn(
                          "cursor-pointer outline-none focus:ring-2 focus:ring-coral",
                          merged ? "fill-lime" : "fill-coral",
                        )}
                        stroke="var(--ink)"
                        strokeWidth="2.5"
                        onClick={triggerMergeAnimation}
                      />

                      {/* Connected merge node */}
                      {merged && (
                        <motion.circle
                          initial={{ scale: 0 }}
                          animate={{ scale: [1, 2.5, 0] }}
                          transition={{ duration: 0.8 }}
                          cx="220"
                          cy="30"
                          r="12"
                          fill="var(--lime)"
                          fillOpacity="0.35"
                        />
                      )}
                    </svg>
                  </div>

                  <div className="border-t border-ink/8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    {merged ? (
                      <>
                        <div className="flex flex-col gap-0.5">
                          <span className="font-mono text-xs uppercase tracking-[0.1em] text-coral font-bold">
                            Contribution merged!
                          </span>
                          <span className="font-mono text-[11px] text-ink-soft">
                            Open source is built together.
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveGame(4)}
                          className="w-full sm:w-auto rounded-full ink-border bg-lime px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] hard-shadow hover:-translate-y-0.5 active:translate-y-0 transition-transform cursor-pointer"
                        >
                          Complete Summary →
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="font-mono text-[11px] text-ink-soft uppercase tracking-[0.08em] text-center sm:text-left">
                          Click the contribution node or the button to merge
                        </span>
                        <button
                          type="button"
                          disabled={isMerging}
                          onClick={triggerMergeAnimation}
                          className="w-full sm:w-auto rounded-full ink-border bg-coral text-paper px-4 py-2.5 font-mono text-xs uppercase tracking-[0.16em] hard-shadow hover:-translate-y-0.5 active:translate-y-0 transition-transform disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                        >
                          {isMerging ? "Merging..." : "Merge Pull Request 🚀"}
                        </button>
                      </>
                    )}
                  </div>
                </motion.div>
              )}

              {activeGame === 4 && (
                <motion.div
                  key="game4"
                  initial={reduced ? undefined : { opacity: 0, scale: 0.96 }}
                  animate={reduced ? undefined : { opacity: 1, scale: 1 }}
                  exit={reduced ? undefined : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center text-center py-6 flex-1 gap-6"
                >
                  <div className="space-y-4">
                    <div className="flex flex-col gap-1.5">
                      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-soft">
                        Summary
                      </span>
                      <div className="flex flex-col gap-2 items-center justify-center mt-2">
                        <span className="display-tight text-3xl sm:text-4xl text-blue">
                          See it.
                        </span>
                        <span className="display-tight text-3xl sm:text-4xl text-yellow">
                          Change it.
                        </span>
                        <span className="display-tight text-3xl sm:text-4xl text-coral">
                          Share it.
                        </span>
                      </div>
                    </div>

                    <h3 className="display-tight text-[clamp(2.5rem,8vw,4.5rem)] text-ink">
                      That&apos;s FOSS.
                    </h3>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-2">
                    <button
                      type="button"
                      onClick={handleScrollToGect}
                      className="w-full sm:w-auto rounded-full ink-border bg-lime px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] hard-shadow hover:-translate-y-0.5 active:translate-y-0 transition-transform cursor-pointer"
                    >
                      Meet the Community →
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="w-full sm:w-auto rounded-full ink-border bg-paper px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] hard-shadow hover:-translate-y-0.5 active:translate-y-0 transition-transform cursor-pointer text-ink-soft hover:text-ink"
                    >
                      Try Again ↺
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
