import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { Parallax } from "@/components/Parallax";
import { Marquee } from "@/components/Marquee";
import { Link } from "@/i18n/navigation";
import { ProductColorViewer } from "@/components/ProductColorViewer";
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
  const roadmap = t.raw("roadmap.items") as { title: string; body: string }[];

  return (
    <>
      {/* 1. Hero - Full screen immersive background with overlaid text */}
      <section className="relative min-h-[93svh] w-full flex items-center justify-center overflow-hidden bg-ink">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Parallax amount={15} className="relative h-full w-full">
            <Image
              src="/assets/lifestyle/hero-vertical-1.jpg"
              alt={t("hero.imageAlt")}
              fill
              priority
              sizes="100vw"
              className="scale-[1.03] object-cover object-[center_45%] film opacity-60"
            />
          </Parallax>
          {/* Dark overlay gradients for text readability and cinematic feel */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-ink/40 mix-blend-multiply pointer-events-none" />
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

      {/* 2. Marquee - vintage ticker */}
      <Marquee items={marquee} />

      {/* 3. Intro - centered statement + atmospheric banner */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 lg:py-32">
        <Reveal className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-tight text-ink">
            {t("intro.title")}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
            {t("intro.body")}
          </p>
        </Reveal>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-6">
          <Reveal delay={0.05}>
            {/* making-case is 1066x1600 -> 2/3 portrait */}
            <div className="relative w-full overflow-hidden bg-ink" style={{ aspectRatio: "2/3" }}>
              <Parallax amount={20} className="relative h-full w-full">
                <Image
                  src="/assets/lifestyle/making-case.jpg"
                  alt="Making the case"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="scale-105 object-cover film opacity-95 mix-blend-luminosity"
                />
              </Parallax>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            {/* leather-tools is 1600x1066 -> 3/2 landscape, offset to look organic */}
            <div className="relative w-full overflow-hidden bg-ink md:mt-24" style={{ aspectRatio: "3/2" }}>
              <Parallax amount={25} className="relative h-full w-full">
                <Image
                  src="/assets/lifestyle/leather-tools.jpg"
                  alt="Leather tools"
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="scale-105 object-cover film opacity-95 mix-blend-luminosity"
                />
              </Parallax>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. Featured product - Product Color Viewer */}
      <section className="border-y border-line bg-paper">
        <div className="mx-auto grid max-w-[1400px] items-center gap-16 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:py-32">
          <Reveal>
            <ProductColorViewer
              colors={product.colors}
              colorNames={copy.colorNames}
              title={copy.title}
              label={t("featured.colorsLabel")}
            />
          </Reveal>
          <Reveal delay={0.08} className="lg:pl-8">
            <h2 className="font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-tight text-ink">
              {t("featured.title")}
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
              {t("featured.body")}
            </p>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
              {copy.summary}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <CTA href={`/products/${product.slug}`}>{common("viewCase")}</CTA>
              <CTA href="/contact" variant="ghost">
                {common("requestQuote")}
              </CTA>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. Lineup - massive full exact 1:1 square constraint */}
      <section className="w-full bg-gradient-to-b from-paper to-cream py-20 lg:py-32">
        <Reveal className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <h2 className="font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-tight text-ink">
            {t("lineup.title")}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-ink-soft">{t("lineup.body")}</p>
        </Reveal>
        <Reveal className="mx-auto mt-16 max-w-[1200px] px-5 sm:px-8" delay={0.05}>
          {/* three-colors.jpg is exactly 1800x1800 -> 1/1 */}
          <div className="relative aspect-square w-full">
            <Image
              src={product.threeColors}
              alt={t("lineup.imageAlt")}
              fill
              sizes="100vw"
              className="object-contain film-soft"
            />
          </div>
        </Reveal>
      </section>

      {/* 6. Features - asymmetric layout with 2:3 image matching vintage-strap */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div className="pt-8">
            <Reveal>
              <h2 className="font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-tight text-ink">
                {t("features.title")}
              </h2>
              <p className="mt-5 max-w-lg text-lg text-ink-soft">{t("features.body")}</p>
            </Reveal>
            
            <div className="mt-12 flex flex-col gap-6">
              {copy.features.slice(0, 3).map((f, i) => (
                <Reveal key={f.title} delay={0.04 * (i + 1)}>
                  <article className="border-t border-line pt-6">
                    <span className="font-display text-sm text-coffee">0{i + 1}</span>
                    <h3 className="mt-3 text-xl font-medium text-ink">{f.title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-ink-soft">{f.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
          
          <Reveal delay={0.08}>
            {/* vintage-strap.jpg is 1066x1600 -> 2/3 */}
            <div className="relative w-full overflow-hidden bg-ink" style={{ aspectRatio: "2/3" }}>
              <Parallax amount={15} className="relative h-full w-full">
                <Image
                  src="/assets/lifestyle/vintage-strap.jpg"
                  alt={copy.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="scale-105 object-cover film opacity-95"
                />
              </Parallax>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 7. Glance - matching features image size 1:1 */}
      <section className="border-y border-line bg-paper">
        <div className="mx-auto grid max-w-[1400px] items-center gap-16 px-5 py-24 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:py-32">
          <Reveal>
            {/* features image is exactly 1800x1800 -> 1/1 */}
            <div className="relative aspect-square w-full mix-blend-multiply">
              <Image
                src={product.featuresImage}
                alt={t("glance.imageAlt")}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-contain"
              />
            </div>
          </Reveal>
          <Reveal delay={0.08} className="lg:pl-8">
            <h2 className="font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-tight text-ink">
              {t("glance.title")}
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
              {t("glance.body")}
            </p>
            <div className="mt-10">
              <CTA href={`/products/${product.slug}`}>{common("viewCase")}</CTA>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 8. Roadmap - clean lined rows */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 lg:py-32">
        <Reveal className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-coffee">{t("roadmap.kicker")}</p>
          <h2 className="mt-5 font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-tight text-ink">
            {t("roadmap.title")}
          </h2>
          <p className="mt-6 max-w-md text-lg text-ink-soft">{t("roadmap.body")}</p>
        </Reveal>

        <div className="mt-16 divide-y divide-line border-t border-line">
          {roadmap.map((item, i) => (
            <Reveal key={item.title} delay={0.04 * i}>
              <div className="group flex flex-col gap-4 py-8 transition-colors hover:bg-black/5 sm:flex-row sm:items-baseline sm:gap-12">
                <span className="font-display text-3xl text-coffee/60 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="flex-1 font-display text-2xl text-ink transition-transform duration-500 ease-out group-hover:translate-x-2 sm:text-3xl lg:text-4xl">
                  {item.title}
                </h3>
                <p className="max-w-sm text-base text-ink-soft">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <Link
            href="/products"
            className="mt-10 inline-flex items-center gap-1.5 text-base font-medium text-ink hover:text-coffee"
          >
            {common("viewAll")}
            <ArrowUpRight size={18} weight="bold" />
          </Link>
        </Reveal>
      </section>

      {/* 9. Studio - 4:3 image with parallax */}
      <section className="border-t border-line bg-paper">
        <div className="mx-auto grid max-w-[1400px] items-center gap-16 px-5 py-24 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:py-32">
          <Reveal>
            {/* crafting.jpg is 1600x1200 -> 4/3 */}
            <div className="relative w-full overflow-hidden bg-ink" style={{ aspectRatio: "4/3" }}>
              <Parallax amount={20} className="relative h-full w-full">
                <Image
                  src="/assets/lifestyle/crafting.jpg"
                  alt={t("studio.imageAlt")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="scale-105 object-cover opacity-90 film"
                />
              </Parallax>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="lg:pl-8">
            <p className="text-xs uppercase tracking-[0.2em] text-coffee">
              {t("studio.kicker")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-tight text-ink">
              {t("studio.title")}
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
              {t("studio.body")}
            </p>
            <Link
              href="/about"
              className="mt-10 inline-flex items-center gap-1.5 border-b border-ink/20 pb-0.5 text-base font-medium text-ink hover:text-coffee"
            >
              {t("studio.cta")}
              <ArrowUpRight size={18} weight="bold" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 10. CTA */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 lg:py-32">
        <Reveal>
          <div className="relative overflow-hidden bg-ink px-6 py-24 text-center sm:px-12 lg:py-32">
            <h2 className="mx-auto max-w-3xl font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] text-paper">
              {t("cta.title")}
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-paper/75">
              {t("cta.body")}
            </p>
            <div className="mt-12 flex justify-center">
              <CTA href="/contact" variant="dark">
                {t("cta.primary")}
              </CTA>
            </div>
            <p className="mt-8 text-sm text-paper/55">{t("cta.note")}</p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
