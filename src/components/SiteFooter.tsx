import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { site, mailtoLink } from "@/lib/site";

export function SiteFooter() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-line bg-paper">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="max-w-xs">
            <p className="font-display text-2xl text-ink">{site.name}</p>
            <p className="mt-3 text-sm text-ink-soft">{t("tagline")}</p>
          </div>

          <nav className="flex flex-col gap-3 text-sm">
            <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">
              {t("nav")}
            </p>
            <Link href="/products" className="text-ink/80 hover:text-ink">
              {nav("products")}
            </Link>
            <Link href="/wholesale" className="text-ink/80 hover:text-ink">
              {nav("wholesale")}
            </Link>
            <Link href="/about" className="text-ink/80 hover:text-ink">
              {nav("about")}
            </Link>
            <Link href="/contact" className="text-ink/80 hover:text-ink">
              {nav("contact")}
            </Link>
          </nav>

          <div className="flex flex-col gap-3 text-sm">
            <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">
              {t("contact")}
            </p>
            <a href={mailtoLink("Enquiry from FrameHide")} className="text-ink/80 hover:text-ink">
              {site.email}
            </a>
            <span className="text-ink-soft">{site.whatsappDisplay}</span>
          </div>
        </div>

        <div className="mt-14 border-t border-line pt-6">
          <p className="text-xs text-ink-soft">{t("note")}</p>
          <div className="mt-4 flex flex-col gap-2 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {year} {t("rights")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
