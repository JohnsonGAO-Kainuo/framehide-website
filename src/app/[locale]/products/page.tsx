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
  const home = await getTranslations("home");
  const products = getAllProducts();
  const roadmap = home.raw("roadmap.items") as { title: string; body: string }[];

  return (
    <section className="mx-auto max-w-[1400px] px-5 pt-16 pb-16 sm:px-8 lg:pt-24">
      <Reveal className="max-w-2xl">
        <h1 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-tight text-ink">
          {t("title")}
        </h1>
        <p className="mt-5 max-w-md text-lg text-ink-soft">{t("subtitle")}</p>
      </Reveal>

      <div className="mt-14 grid items-start gap-10 lg:grid-cols-[1.35fr_1fr]">
        {/* Available now - featured case */}
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-coffee">{t("available")}</p>
          <div className="mt-5 grid gap-8 sm:grid-cols-1">
            {products.map((product, i) => {
              const copy = getProductCopy(product, locale);
              return (
                <Reveal key={product.slug} delay={0.05 * i}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="group block overflow-hidden rounded-card border border-line bg-paper transition-colors hover:border-ink/25"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-b from-paper to-cream">
                      <Image
                        src={product.threeColors}
                        alt={copy.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        className="object-contain film-soft transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="flex items-start justify-between gap-4 p-6 pt-4">
                      <div>
                        <h2 className="font-display text-2xl text-ink">{copy.title}</h2>
                        <p className="mt-2 max-w-sm text-sm text-ink-soft">{copy.tagline}</p>
                        <div className="mt-4 flex items-center gap-2">
                          {product.colors.map((c) => (
                            <span
                              key={c.id}
                              className="size-4 rounded-full ring-1 ring-ink/10"
                              style={{ backgroundColor: c.hex }}
                            />
                          ))}
                        </div>
                      </div>
                      <ArrowRight
                        size={20}
                        weight="bold"
                        className="mt-1 shrink-0 text-ink-soft transition-transform group-hover:translate-x-1 group-hover:text-coffee"
                      />
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Roadmap - fills the right rail */}
        <Reveal delay={0.1}>
          <div className="rounded-card border border-line bg-paper p-7 sm:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-coffee">{t("roadmapTitle")}</p>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">{t("roadmapBody")}</p>
            <ol className="mt-7 divide-y divide-ink/12 border-t border-ink/12">
              {roadmap.map((item, i) => (
                <li key={item.title} className="flex items-baseline gap-4 py-5">
                  <span className="font-display text-base text-coffee tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-lg text-ink">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
