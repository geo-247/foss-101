"use client"

import { useSpring, useTransform, type MotionValue } from "motion/react"

/**
 * Motion can hand scroll-linked accelerated properties (opacity, transform) off
 * to a native scroll timeline that ignores the per-element scroll offsets, which
 * makes the value track the whole document instead of the target section.
 * Routing the transform through a stiff spring keeps it JS-driven and correct.
 */
export function useScrollRange(progress: MotionValue<number>, input: number[], output: number[]) {
  return useSpring(useTransform(progress, input, output), {
    stiffness: 500,
    damping: 70,
    restDelta: 0.0005,
  })
}
