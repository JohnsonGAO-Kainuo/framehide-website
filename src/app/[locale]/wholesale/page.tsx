import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ArrowUpRight,
  Camera,
  EnvelopeSimple,
  Package,
  Storefront,
  Truck,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { mailtoLink, whatsappLink } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "wholesale.meta" });
  return { title: t("title"), description: t("description") };
}

type TextItem = {
  title: string;
  body: string;
};

export default async function WholesalePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("wholesale");

  const fitItems = t.raw("fit.items") as TextItem[];
  const sampleItems = t.raw("sample.items") as TextItem[];
  const supportItems = t.raw("support.items") as string[];
  const mailHref = mailtoLink(t("emailSubject"), t("emailTemplate"));
  const waHref = whatsappLink(t("whatsappTemplate"));

  const sampleIcons = [Package, Camera, Truck];

  return (
    <>
      <section className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 pt-16 pb-20 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:pt-24 lg:pb-28">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-medium text-coffee">{t("kicker")}</p>
          <h1 className="mt-5 font-display text-[clamp(2.45rem,5.5vw,4.9rem)] leading-[1.02] text-ink">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            {t("lead")}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <CTA href="/contact">{t("primaryCta")}</CTA>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-sm font-medium text-ink transition-[transform,border-color,background-color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-ink/45 hover:bg-paper active:scale-[0.98]"
            >
              <WhatsappLogo size={18} />
              {t("whatsappCta")}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-ink shadow-sm">
              <Image
                src="/assets/products/x100vi/three-colors.jpg"
                alt={t("heroImageAlt")}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-cover film-soft"
              />
            </div>
            <div className="absolute -bottom-6 left-6 right-6 rounded-[1.5rem] bg-paper/95 p-5 shadow-[0_24px_80px_rgba(65,42,20,0.16)] ring-1 ring-line backdrop-blur">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-coffee">
                {t("sampleLabel")}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {t("sampleNote")}
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:py-28">
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,4vw,3.3rem)] leading-tight text-ink">
              {t("fit.title")}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-soft">
              {t("fit.body")}
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-3">
            {fitItems.map((item, index) => (
              <Reveal key={item.title} delay={0.04 * index}>
                <div className="h-full rounded-card bg-cream p-6 ring-1 ring-line">
                  <Storefront size={24} className="text-coffee" />
                  <h3 className="mt-5 font-display text-2xl text-ink">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:py-28">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-tight text-ink">
            {t("sample.title")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-soft">{t("sample.body")}</p>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {sampleItems.map((item, index) => {
            const Icon = sampleIcons[index] ?? Package;
            return (
              <Reveal key={item.title} delay={0.04 * index}>
                <div className="h-full rounded-card border border-line bg-paper p-7">
                  <span className="inline-flex size-11 items-center justify-center rounded-full bg-coffee text-paper">
                    <Icon size={21} />
                  </span>
                  <h3 className="mt-6 font-display text-2xl text-ink">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-8 px-5 pb-20 sm:px-8 lg:grid-cols-[1fr_1fr] lg:pb-28">
        <Reveal>
          <div className="h-full rounded-[2rem] bg-ink p-8 text-paper sm:p-10">
            <Camera size={28} className="text-paper/85" />
            <h2 className="mt-8 font-display text-[clamp(2rem,4vw,3.2rem)] leading-tight">
              {t("line.title")}
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-paper/78">
              {t("line.body")}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="h-full rounded-[2rem] bg-paper p-8 ring-1 ring-line sm:p-10">
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-tight text-ink">
              {t("support.title")}
            </h2>
            <div className="mt-8 grid gap-3">
              {supportItems.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-input bg-cream px-4 py-3 text-sm leading-relaxed text-ink-soft"
                >
                  <span className="mt-2 h-px w-5 shrink-0 bg-coffee" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="bg-coffee text-paper">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:py-20">
          <Reveal className="max-w-2xl">
            <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-tight">
              {t("cta.title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-paper/82">{t("cta.body")}</p>
          </Reveal>
          <Reveal delay={0.06} className="flex flex-wrap gap-4">
            <a
              href={mailHref}
              className="inline-flex items-center gap-3 rounded-full bg-paper py-2 pl-5 pr-2 text-sm font-medium text-ink transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <EnvelopeSimple size={18} />
              {t("cta.email")}
              <span className="flex size-8 items-center justify-center rounded-full bg-ink/10">
                <ArrowUpRight size={15} weight="bold" />
              </span>
            </a>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-paper/35 py-2 pl-5 pr-2 text-sm font-medium text-paper transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:bg-paper/10 active:scale-[0.98]"
            >
              <WhatsappLogo size={18} />
              {t("cta.whatsapp")}
              <span className="flex size-8 items-center justify-center rounded-full bg-paper/12">
                <ArrowUpRight size={15} weight="bold" />
              </span>
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
