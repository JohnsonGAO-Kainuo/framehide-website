import { Link } from "@/i18n/navigation";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "dark";

const base =
  "group/cta inline-flex items-center gap-3 rounded-full text-sm font-medium transition-[transform,background-color,border-color,color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coffee";

const variants: Record<Variant, string> = {
  primary: "bg-coffee text-paper hover:bg-coffee-deep pl-6 pr-2 py-2",
  secondary:
    "border border-ink/25 text-ink hover:border-ink/55 hover:bg-ink/[0.04] pl-6 pr-2 py-2",
  ghost: "text-ink hover:text-coffee px-1 py-2",
  dark: "bg-paper text-ink hover:bg-cream pl-6 pr-2 py-2",
};

const knobTone: Record<Variant, string> = {
  primary: "bg-paper/15 text-paper",
  secondary: "bg-ink/8 text-ink",
  ghost: "bg-transparent text-current",
  dark: "bg-ink/10 text-ink",
};

type CTAProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: ComponentProps<typeof Link>["href"];
  variant?: Variant;
  children: ReactNode;
  /** Show the nested circular arrow knob. Defaults to true for primary/secondary. */
  withArrow?: boolean;
};

export function CTA({
  href,
  variant = "primary",
  className = "",
  children,
  withArrow,
  ...rest
}: CTAProps) {
  const showArrow = withArrow ?? variant !== "ghost";

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      <span>{children}</span>
      {showArrow ? (
        <span
          className={`flex size-8 items-center justify-center rounded-full transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-px ${knobTone[variant]}`}
        >
          <ArrowRight size={15} weight="bold" />
        </span>
      ) : (
        <ArrowRight
          size={15}
          weight="bold"
          className="transition-transform duration-300 group-hover/cta:translate-x-0.5"
        />
      )}
    </Link>
  );
}
