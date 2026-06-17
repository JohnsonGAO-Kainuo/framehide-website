"use client";

import { motion, useReducedMotion, type Variant } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "span";
};

export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();

  const hidden: Variant = reduce
    ? { opacity: 0 }
    : { opacity: 0, y: 26, filter: "blur(8px)" };
  const shown: Variant = { opacity: 1, y: 0, filter: "blur(0px)" };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      variants={{ hidden, shown }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
