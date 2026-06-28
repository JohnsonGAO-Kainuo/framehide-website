"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ProductColor, ProductVariant } from "@/lib/products";

type Props = {
  colors: ProductColor[];
  colorNames: Record<string, string>;
  variants?: ProductVariant[];
  variantNames?: Record<string, { title: string; body: string; meta: string }>;
  variantLabel?: string;
  title: string;
  label: string;
  priority?: boolean;
};

export function ProductColorViewer({
  colors,
  colorNames,
  variants,
  variantNames,
  variantLabel,
  title,
  label,
  priority,
}: Props) {
  const [activeColor, setActiveColor] = useState(0);
  const [activeVariant, setActiveVariant] = useState(0);
  const reduce = useReducedMotion();
  const color = colors[activeColor];
  const variant = variants?.[activeVariant];
  const image = variant?.images?.[activeColor] ?? variant?.image ?? color.image;
  const variantTitle = variant ? variantNames?.[variant.id]?.title : undefined;

  return (
    <div className="flex flex-col gap-6">
      <div className="relative aspect-square w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-paper-deep to-cream mix-blend-multiply" />
        <AnimatePresence mode="wait">
          <motion.div
              key={`${variant?.id ?? "case"}-${color.id}`}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={image}
                alt={`${title} in ${colorNames[color.id] ?? color.id}${
                  variantTitle ? ` · ${variantTitle}` : ""
                }`}
                fill
                priority={priority}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain film-soft"
              />
            </motion.div>
        </AnimatePresence>
      </div>

      {variants?.length && variantNames ? (
        <div className="flex flex-wrap items-center gap-3">
          <p className="mr-1 text-[0.7rem] uppercase tracking-[0.16em] text-ink-soft">
            {variantLabel}
          </p>
          {variants.map((v, index) => {
            const isActive = index === activeVariant;
            const copy = variantNames[v.id];
            if (!copy) return null;

            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setActiveVariant(index)}
                aria-pressed={isActive}
                className={`rounded-full px-4 py-2 text-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isActive
                    ? "bg-ink text-paper shadow-sm"
                    : "bg-paper text-ink-soft ring-1 ring-ink/10 hover:-translate-y-0.5 hover:text-ink"
                }`}
              >
                {copy.title}
              </button>
            );
          })}
        </div>
      ) : null}

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {colors.map((c, i) => {
            const isActive = i === activeColor;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveColor(i)}
                aria-label={colorNames[c.id] ?? c.id}
                aria-pressed={isActive}
                className={`size-8 rounded-full transition-transform duration-300 ${
                  isActive ? "ring-2 ring-ink ring-offset-2 ring-offset-cream" : "hover:scale-110"
                }`}
                style={{ backgroundColor: c.hex }}
              />
            );
          })}
        </div>
        <p className="text-sm text-ink-soft">
          <span className="uppercase tracking-[0.16em] text-[0.7rem]">{label}</span>
          <span className="mx-2 text-ink/30">/</span>
          <span className="text-ink">{colorNames[color.id] ?? color.id}</span>
        </p>
      </div>
    </div>
  );
}
