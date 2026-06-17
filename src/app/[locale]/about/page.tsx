import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const common = await getTranslations("common");

  const values = t.raw("values") as { title: string; body: string }[];

  return (
    <>
      <section className="mx-auto max-w-[1400px] px-5 pt-16 pb-12 sm:px-8 lg:pt-24">
        <Reveal className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-coffee">{t("kicker")}</p>
          <h1 className="mt-5 font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.05] text-ink">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">{t("lead")}</p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 pb-16 sm:px-8">
        <Reveal>
          <div className="bezel">
            <div className="bezel-inner relative aspect-[16/8] overflow-hidden">
              <Image
                src="/assets/lifestyle/making-case.jpg"
                alt={t("imageAlt")}
                fill
                sizes="100vw"
                className="object-cover film"
              />
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-12 px-5 pb-20 sm:px-8 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="space-y-5 text-base leading-relaxed text-ink-soft">
          <p>{t("body1")}</p>
          <p>{t("body2")}</p>
          <p>{t("body3")}</p>
        </Reveal>

        <Reveal delay={0.08} className="space-y-6">
          {values.map((v) => (
            <div key={v.title} className="border-t border-ink/15 pt-4">
              <h3 className="font-display text-xl text-ink">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{v.body}</p>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 pb-8 sm:px-8">
        <Reveal>
          <div className="flex flex-col items-start gap-6 rounded-card bg-olive/12 px-6 py-12 sm:px-12 sm:py-14">
            <h2 className="max-w-xl font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-tight text-ink">
              {t("lead")}
            </h2>
            <CTA href="/contact">{common("requestQuote")}</CTA>
          </div>
        </Reveal>
      </section>
    </>
  );
}
