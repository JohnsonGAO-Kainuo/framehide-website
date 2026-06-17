import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { Parallax } from "@/components/Parallax";
import { Marquee } from "@/components/Marquee";
import { Link } from "@/i18n/navigation";
import { getAllProducts, getProductCopy } from "@/lib/products";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const common = await getTranslations("common");

  const product = getAllProducts()[0];
  const copy = getProductCopy(product, locale);
  const marquee = t.raw("marquee") as string[];

  return (
    <>
      {/* 1. Hero - Full screen immersive vertical film aesthetic */}
      <section className="relative min-h-[93svh] w-full flex items-center justify-center overflow-hidden bg-ink">
        <div className="absolute inset-0 z-0">
          <Parallax amount={15} className="relative h-full w-full">
            <Image
              src="/assets/lifestyle_extended/coffee-desk-x100.jpg"
              alt={t("hero.imageAlt")}
              fill
              priority
              sizes="100vw"
              className="scale-[1.03] object-cover object-[center_45%] film opacity-60"
            />
          </Parallax>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-ink/30 mix-blend-multiply pointer-events-none" />
          <div className="absolute inset-0 bg-ink/10 pointer-events-none" />
        </div>

        <Reveal className="relative z-10 w-full max-w-4xl px-5 text-center sm:px-8 mt-20">
          <span className="inline-flex items-center gap-2 border-b border-paper/30 pb-1 text-xs uppercase tracking-[0.2em] text-paper/90">
            <span className="size-1.5 rounded-full bg-paper" />
            {t("badge")}
          </span>
          <h1 className="mt-8 font-display text-[clamp(2.8rem,7vw,5.5rem)] leading-[1.05] text-paper drop-shadow-md">
            {t("hero.title")}
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-paper/85 drop-shadow-sm">
            {t("hero.subtitle")}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <CTA href="/contact" variant="dark">
              {t("hero.primary")}
            </CTA>
            <CTA href={`/products/${product.slug}`} variant="ghost" className="!text-paper hover:!text-paper/80">
              {t("hero.secondary")}
            </CTA>
          </div>
        </Reveal>
      </section>

      {/* 2. Marquee */}
      <Marquee items={marquee} />

      {/* 3. The Ethos - Editorial Split with Staggered Photography */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 lg:py-40 border-b border-line">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-center">
          <Reveal className="max-w-xl">
            <h2 className="font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-tight text-ink">
              {t("intro.title")}
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-ink-soft">
              {t("intro.body")}
            </p>
            <Link
              href="/about"
              className="mt-10 inline-flex items-center gap-1.5 border-b border-ink/20 pb-0.5 text-base font-medium text-ink hover:text-coffee"
            >
              {t("studio.cta")}
              <ArrowUpRight size={18} weight="bold" />
            </Link>
          </Reveal>

          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <Reveal delay={0.05} className="mt-12 sm:mt-24">
              <div className="relative w-full rounded-[2rem] overflow-hidden bg-ink shadow-sm" style={{ aspectRatio: "4/5" }}>
                <Parallax amount={15} className="relative h-full w-full">
                  <Image
                    src="/assets/lifestyle_extended/hands-holding-cam.jpg"
                    alt="FrameHide ethos"
                    fill
                    sizes="(max-width: 768px) 50vw, 30vw"
                    className="scale-105 object-cover film-soft opacity-95 mix-blend-luminosity"
                  />
                </Parallax>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="relative w-full rounded-[2rem] overflow-hidden bg-ink shadow-sm" style={{ aspectRatio: "3/4" }}>
                <Parallax amount={20} className="relative h-full w-full">
                  <Image
                    src="/assets/lifestyle_extended/street-photographer.jpg"
                    alt="Street photography"
                    fill
                    sizes="(max-width: 768px) 50vw, 30vw"
                    className="scale-105 object-cover film-soft opacity-95 mix-blend-luminosity"
                  />
                </Parallax>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. Product Spotlight - The Entry Point to the Collection */}
      <section className="bg-paper relative overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 lg:py-40">
          <Reveal className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
            <p className="text-xs uppercase tracking-[0.2em] text-coffee border-b border-coffee/30 pb-1 inline-block">
              {t("featured.colorsLabel")}
            </p>
            <h2 className="mt-6 font-display text-[clamp(2.4rem,5vw,4rem)] leading-tight text-ink">
              {t("lineup.title")}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              {t("lineup.body")}
            </p>
          </Reveal>

          <div className="relative mx-auto max-w-[1000px]">
            <Reveal delay={0.05}>
              <div className="relative aspect-[4/3] sm:aspect-[16/9] w-full rounded-[2rem] overflow-hidden bg-cream shadow-sm p-4 sm:p-8">
                <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] bg-gradient-to-br from-white/40 to-transparent">
                  <Image
                    src={product.threeColors}
                    alt={copy.title}
                    fill
                    sizes="100vw"
                    className="object-contain film-soft p-4 sm:p-12 hover:scale-105 transition-transform duration-[2000ms] ease-out"
                  />
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="mt-12 text-center">
            <CTA href={`/products/${product.slug}`} className="px-8 py-3 text-lg">
              {common("viewCase")}
            </CTA>
          </Reveal>
        </div>
      </section>

      {/* 5. Cinematic Mood Board - Z-Axis Cascade */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 lg:py-40 border-t border-line">
        <Reveal className="text-center mb-16 lg:mb-24">
            <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] text-ink">
              {t("studio.title")}
            </h2>
        </Reveal>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <Reveal delay={0.05}>
            <div className="relative rounded-[2rem] overflow-hidden bg-ink shadow-sm break-inside-avoid">
               <Image
                src="/assets/lifestyle_extended/workspace-notebook.jpg"
                alt="Workspace"
                width={800} height={1200}
                className="w-full h-auto object-cover film-soft opacity-95 transition-transform duration-700 hover:scale-105"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative rounded-[2rem] overflow-hidden bg-ink shadow-sm break-inside-avoid mt-8 lg:mt-16">
               <Image
                src="/assets/lifestyle_extended/film-roll-desk.jpg"
                alt="Film rolls"
                width={800} height={1000}
                className="w-full h-auto object-cover film-soft opacity-95 transition-transform duration-700 hover:scale-105"
              />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative rounded-[2rem] overflow-hidden bg-ink shadow-sm break-inside-avoid">
               <Image
                src="/assets/lifestyle_extended/minimal-desk-flatlay.jpg"
                alt="Minimal flatlay"
                width={800} height={1000}
                className="w-full h-auto object-cover film-soft opacity-95 transition-transform duration-700 hover:scale-105"
              />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="relative rounded-[2rem] overflow-hidden bg-ink shadow-sm break-inside-avoid mt-8">
               <Image
                src="/assets/lifestyle_extended/black-cam-leather.jpg"
                alt="Leather case"
                width={800} height={1200}
                className="w-full h-auto object-cover film-soft opacity-95 transition-transform duration-700 hover:scale-105"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative rounded-[2rem] overflow-hidden bg-ink shadow-sm break-inside-avoid mt-8 lg:-mt-12">
               <Image
                src="/assets/lifestyle_extended/coffee-mac-cam.jpg"
                alt="Coffee and Mac"
                width={800} height={800}
                className="w-full h-auto object-cover film-soft opacity-95 transition-transform duration-700 hover:scale-105"
              />
            </div>
          </Reveal>
        </div>
      </section>

    </>
  );
}
