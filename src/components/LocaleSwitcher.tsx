"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { useTransition } from "react";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: string) {
    if (next === locale) return;
    startTransition(() => {
      router.replace(
        // @ts-expect-error params shape is route-dependent
        { pathname, params },
        { locale: next }
      );
    });
  }

  return (
    <div
      className="inline-flex items-center rounded-full border border-ink/15 p-0.5 text-xs"
      role="group"
      aria-label="Language"
      data-pending={isPending ? "" : undefined}
    >
      {routing.locales.map((loc) => {
        const active = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => switchTo(loc)}
            aria-pressed={active}
            className={`rounded-full px-2.5 py-1 font-medium transition-colors ${
              active ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"
            }`}
          >
            {loc === "en" ? "EN" : "中文"}
          </button>
        );
      })}
    </div>
  );
}
