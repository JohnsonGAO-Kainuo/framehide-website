import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/Reveal";
import { getAllProducts, getProductCopy } from "@/lib/products";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("products");
  const products = getAllProducts();

  return (
    <section className="mx-auto max-w-[1180px] px-5 pt-16 pb-32 sm:px-8 lg:pt-24">
      <Reveal className="max-w-3xl mx-auto text-center">
        <h1 className="font-display text-[clamp(2.4rem,5vw,3.8rem)] leading-tight text-ink">
          Our Collection
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-lg text-ink-soft">
          Designed with intention. Crafted to last.
        </p>
      </Reveal>

      <div className="mt-16">
        <div className="grid gap-7 md:grid-cols-2">
          {products.map((product, i) => {
            const copy = getProductCopy(product, locale);
            return (
              <Reveal key={product.slug} delay={0.05 * i}>
                <Link
                  href={`/products/${product.slug}`}
                  className="group block h-full overflow-hidden rounded-[2rem] bg-paper shadow-[0_18px_50px_rgba(62,42,26,0.08)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(62,42,26,0.14)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-ink">
                    <Image
                      src={product.editorial}
                      alt={copy.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 520px"
                      className="object-cover film-soft transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-start justify-between gap-4 p-6 sm:p-7">
                    <div>
                      <h2 className="font-display text-[clamp(1.45rem,2.3vw,2rem)] leading-tight text-ink">
                        {copy.title}
                      </h2>
                      <p className="mt-3 max-w-md text-[0.7rem] font-medium uppercase tracking-[0.18em] text-coffee">
                        {copy.cardFit}
                      </p>
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
                        {copy.tagline}
                      </p>
                      <div className="mt-5 flex items-center gap-2.5">
                        {product.colors.map((c) => (
                          <span
                            key={c.id}
                            className="size-4 rounded-full shadow-[inset_0_1px_3px_rgba(0,0,0,0.2)]"
                            style={{ backgroundColor: c.hex }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-cream transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:bg-coffee group-hover:text-paper">
                      <ArrowRight size={22} weight="bold" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
