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
    <section className="mx-auto max-w-[1000px] px-5 pt-16 pb-32 sm:px-8 lg:pt-24">
      <Reveal className="max-w-3xl mx-auto text-center">
        <h1 className="font-display text-[clamp(2.4rem,5vw,3.8rem)] leading-tight text-ink">
          Our Collection
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-lg text-ink-soft">
          Designed with intention. Crafted to last.
        </p>
      </Reveal>

      <div className="mt-20">
        <div className="grid gap-12 sm:grid-cols-1">
          {products.map((product, i) => {
            const copy = getProductCopy(product, locale);
            return (
              <Reveal key={product.slug} delay={0.05 * i}>
                <Link
                  href={`/products/${product.slug}`}
                  className="group block overflow-hidden rounded-[2rem] bg-paper transition-shadow hover:shadow-md"
                >
                  {/* FIX: Removed double frame padding, straight to edge image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-ink">
                    <Image
                      src={product.editorial}
                      alt={copy.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover film-soft transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-start justify-between gap-4 p-8 sm:p-10">
                    <div>
                      <h2 className="font-display text-3xl text-ink">{copy.title}</h2>
                      <p className="mt-3 max-w-md text-base text-ink-soft">{copy.tagline}</p>
                      <div className="mt-6 flex items-center gap-3">
                        {product.colors.map((c) => (
                          <span
                            key={c.id}
                            className="size-5 rounded-full shadow-[inset_0_1px_3px_rgba(0,0,0,0.2)]"
                            style={{ backgroundColor: c.hex }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-cream transition-colors group-hover:bg-coffee group-hover:text-paper">
                      <ArrowRight size={24} weight="bold" />
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
