import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ArrowUpRight
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
  const common = await getTranslations("common");

  const fitItems = t.raw("fit.items") as TextItem[];
  const sampleItems = t.raw("sample.items") as TextItem[];
  const supportItems = t.raw("support.items") as string[];
  const mailHref = mailtoLink(t("emailSubject"), t("emailTemplate"));
  const waHref = whatsappLink(t("whatsappTemplate"));

  return (
    <article>
      {/* 1. Hero - Editorial Split */}
      <section className="mx-auto max-w-[1400px] px-5 pt-16 pb-24 sm:px-8 lg:pt-32 lg:pb-40 border-b border-line">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-24 items-center">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-coffee border-b border-line pb-1 inline-block">
              {t("kicker")}
            </p>
            <h1 className="mt-8 font-display text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.05] text-ink">
              {t("title")}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              {t("lead")}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <CTA href={mailHref}>{t("primaryCta")}</CTA>
              <CTA href={waHref} variant="ghost" target="_blank" rel="noopener noreferrer">
                {t("whatsappCta")}
              </CTA>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative aspect-[3/4] w-full rounded-[2rem] overflow-hidden bg-ink shadow-sm">
              <Image
                src="/assets/lifestyle_extended/workspace-notebook.jpg"
                alt={t("heroImageAlt") || "Workspace overview"}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover film-soft transition-transform duration-1000 hover:scale-105"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Fit - Typographic List (no boxes, no icons) */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1000px] px-5 py-24 sm:px-8 lg:py-40">
          <Reveal>
            <h2 className="font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-tight text-ink text-center">
              {t("fit.title")}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-center text-lg leading-relaxed text-ink-soft">
              {t("fit.body")}
            </p>
          </Reveal>

          <div className="mt-20 divide-y divide-line border-t border-line">
            {fitItems.map((item, index) => (
              <Reveal key={item.title} delay={0.04 * index}>
                <div className="group flex flex-col gap-4 py-10 transition-colors hover:bg-black/5 sm:flex-row sm:items-baseline sm:gap-12 px-6 rounded-card">
                  <span className="font-display text-3xl text-coffee/60 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-2xl text-ink sm:text-3xl transition-transform duration-500 ease-out group-hover:translate-x-2">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-md text-base leading-relaxed text-ink-soft">
                      {item.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Sample - Z-Axis offset images + clean text */}
      <section className="border-y border-line bg-cream overflow-hidden">
        <div className="mx-auto grid max-w-[1400px] gap-16 px-5 py-24 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:py-40 items-center">
          <Reveal className="order-2 lg:order-1">
             <div className="relative aspect-square w-full rounded-[2rem] overflow-hidden shadow-sm">
                <Image
                  src="/assets/lifestyle_extended/minimal-desk-flatlay.jpg"
                  alt="A low risk sample"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover film-soft transition-transform duration-[2000ms] hover:scale-105 ease-out"
                />
              </div>
          </Reveal>
          
          <div className="order-1 lg:order-2 lg:pl-10">
            <Reveal>
              <h2 className="font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-tight text-ink">
                {t("sample.title")}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-ink-soft max-w-lg">
                {t("sample.body")}
              </p>
            </Reveal>

            <div className="mt-12 grid gap-10">
              {sampleItems.map((item, index) => (
                <Reveal key={item.title} delay={0.05 * index}>
                  <div className="relative pl-6 border-l-2 border-line">
                    <span className="absolute -left-[5px] top-2 size-2 rounded-full bg-coffee shadow-sm" />
                    <h3 className="font-display text-xl text-ink">{item.title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-ink-soft max-w-sm">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Support Details - Dark block */}
      <section className="bg-ink text-paper">
        <div className="mx-auto grid max-w-[1400px] gap-16 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:py-40 items-start">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-paper/50">
               {t("sampleLabel")}
            </p>
            <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.2rem)] leading-tight">
              {t("line.title")}
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-paper/70">
              {t("line.body")}
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="rounded-[2rem] bg-paper p-10 ring-1 ring-white/10 sm:p-16">
              <h2 className="font-display text-3xl text-ink">
                {t("support.title")}
              </h2>
              <div className="mt-8 space-y-6">
                {supportItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 pb-6 border-b border-line last:border-0 last:pb-0"
                  >
                    <span className="mt-1 h-px w-6 shrink-0 bg-coffee" />
                    <span className="text-base text-ink-soft leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. Clean CTA Section */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 lg:py-32">
        <Reveal>
          <div className="overflow-hidden rounded-[2rem] bg-paper px-6 py-20 text-center sm:px-12 shadow-sm ring-1 border-line border">
            <h2 className="mx-auto max-w-xl font-display text-[clamp(2rem,4vw,3.2rem)] leading-tight text-ink">
              {t("cta.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg text-ink-soft">
              {t("cta.body")}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <CTA href={mailHref} variant="dark">
                {t("cta.email")}
              </CTA>
              <CTA href={waHref} variant="ghost" target="_blank" rel="noopener noreferrer">
                {t("cta.whatsapp")}
              </CTA>
            </div>
          </div>
        </Reveal>
      </section>
    </article>
  );
}
