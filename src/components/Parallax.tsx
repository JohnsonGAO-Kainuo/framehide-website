"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Pixels of vertical travel across the scroll range. */
  amount?: number;
};

/**
 * Subtle scroll parallax for a single image. Motivated: gives key product
 * photography a sense of depth as it passes through the viewport.
 */
export function Parallax({ children, className, amount = 40 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y }} className="relative h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
