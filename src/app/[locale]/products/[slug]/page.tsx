import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { Link } from "@/i18n/navigation";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { ProductColorViewer } from "@/components/ProductColorViewer";
import { getAllProducts, getProduct, getProductCopy } from "@/lib/products";
import { routing, type Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllProducts().map((p) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const copy = getProductCopy(product, locale);
  return { title: `${copy.title} · FrameHide`, description: copy.summary };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = getProduct(slug);
  if (!product) notFound();

  const copy = getProductCopy(product, locale);
  const t = await getTranslations("product");
  const common = await getTranslations("common");

  return (
    <article>
      {/* Header + colour viewer */}
      <section className="mx-auto max-w-[1400px] px-5 pt-10 pb-16 sm:px-8 lg:pt-16">
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink"
        >
          <ArrowLeft size={15} weight="bold" />
          {t("backToCases")}
        </Link>

        <div className="mt-8 grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <ProductColorViewer
              colors={product.colors}
              colorNames={copy.colorNames}
              title={copy.title}
              label={t("colorsLabel")}
              priority
            />
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="font-display text-[clamp(2rem,4.4vw,3.2rem)] leading-tight text-ink">
              {copy.title}
            </h1>
            <p className="mt-3 text-lg text-coffee">{copy.tagline}</p>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
              {copy.summary}
            </p>
            <div className="mt-8">
              <CTA href="/contact">{common("requestQuote")}</CTA>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section className="bg-paper">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Reveal>
              <p className="text-xs uppercase tracking-[0.2em] text-coffee">
                {t("featuresLabel")}
              </p>
            </Reveal>
            <div className="mt-8 grid gap-x-10 gap-y-9 sm:grid-cols-2">
              {copy.features.map((f, i) => (
                <Reveal key={f.title} delay={0.03 * i}>
                  <div className="border-t border-ink/15 pt-5">
                    <span className="font-display text-sm text-ink/40">0{i + 1}</span>
                    <h3 className="mt-2 text-lg font-medium text-ink">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{f.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.06}>
            <div className="relative aspect-[1/1] w-full rounded-[2rem] overflow-hidden shadow-sm">
              <Image
                src={product.featuresImage}
                alt={copy.title}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* In the field - full gallery, each image shown whole */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8">
        <Reveal className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-coffee">{t("galleryLabel")}</p>
        </Reveal>
        {/* FIX: Improved layout structure so no gaps / empty regions */}
        <div className="mt-8 grid gap-6 sm:gap-8 lg:grid-cols-[1.5fr_1fr] items-center">
          <Reveal delay={0.05} className="w-full">
             <div className="relative overflow-hidden rounded-[2rem] bg-ink shadow-sm aspect-[16/9] w-full">
               <Image
                 src={product.gallery[2].src}
                 alt={copy.title}
                 fill
                 sizes="(max-width: 640px) 100vw, 60vw"
                 className="object-cover film-soft"
               />
             </div>
          </Reveal>
          <div className="flex flex-col gap-6 sm:gap-8 w-full h-full justify-between">
             <Reveal delay={0.1}>
               <div className="relative overflow-hidden rounded-[2rem] bg-ink shadow-sm aspect-[4/3] w-full">
                 <Image
                   src={product.gallery[0].src}
                   alt={copy.title}
                   fill
                   sizes="(max-width: 640px) 100vw, 40vw"
                   className="object-cover film-soft"
                 />
               </div>
             </Reveal>
              <Reveal delay={0.15}>
               <div className="relative overflow-hidden rounded-[2rem] bg-ink shadow-sm aspect-[4/3] w-full">
                 <Image
                   src={product.gallery[1].src}
                   alt={copy.title}
                   fill
                   sizes="(max-width: 640px) 100vw, 40vw"
                   className="object-cover film-soft"
                 />
               </div>
             </Reveal>
          </div>
        </div>
      </section>

      {/* The full picture - detail sheet shown whole */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8">
          <Reveal className="max-w-2xl text-center mx-auto">
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3vw,2.4rem)] text-ink">
              {copy.title}
            </h2>
            <p className="mt-3 mx-auto max-w-md text-base text-ink-soft">{t("sheetBody")}</p>
          </Reveal>
          <Reveal className="mt-12" delay={0.05}>
            {/* FIX: Removed ugly nested borders for details sheet */}
             <div className="overflow-hidden rounded-[2rem] shadow-sm bg-cream">
              <Image
                src={product.detailSheet}
                alt={copy.title}
                width={1800}
                height={2400}
                sizes="100vw"
                className="h-auto w-full object-contain"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Specs, grouped clusters */}
      <section className="mx-auto max-w-[1400px] px-5 pb-20 sm:px-8">
        <Reveal>
          <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] text-ink">
            {t("specsLabel")}
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-10 sm:grid-cols-3 border-t border-line pt-12">
          {copy.specGroups.map((group, gi) => (
            <Reveal key={group.label} delay={0.05 * gi}>
              <p className="text-xs uppercase tracking-[0.18em] text-coffee">
                {group.label}
              </p>
              <dl className="mt-4 space-y-3">
                {group.items.map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4 text-sm">
                    <dt className="text-ink-soft">{label}</dt>
                    <dd className="text-right font-medium text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1400px] px-5 pb-8 sm:px-8">
        <Reveal>
          <div className="overflow-hidden rounded-[2rem] bg-ink px-6 py-16 text-center sm:px-12">
            <h2 className="mx-auto max-w-xl font-display text-[clamp(1.8rem,3.4vw,2.6rem)] leading-tight text-paper">
              {t("ctaTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base text-paper/75">
              {t("ctaBody")}
            </p>
            <div className="mt-8 flex justify-center">
              <CTA href="/contact" variant="dark">{common("requestQuote")}</CTA>
            </div>
          </div>
        </Reveal>
      </section>
    </article>
  );
}
