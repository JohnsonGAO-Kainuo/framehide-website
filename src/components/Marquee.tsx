"use client";

import { motion, useReducedMotion } from "motion/react";

export function Marquee({ items }: { items: string[] }) {
  const reduce = useReducedMotion();
  const loop = [...items, ...items];

  return (
    <div className="relative flex overflow-hidden border-y border-ink/15 bg-coffee py-4 text-paper">
      <motion.div
        className="flex shrink-0 items-center gap-10 pr-10"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 26, ease: "linear", repeat: Infinity }}
      >
        {loop.map((item, i) => (
          <span key={i} className="flex shrink-0 items-center gap-10">
            <span className="font-display text-lg italic">{item}</span>
            <span className="size-1.5 rounded-full bg-shutter" aria-hidden="true" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
