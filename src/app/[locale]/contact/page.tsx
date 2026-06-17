import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { EnvelopeSimple, WhatsappLogo, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/Reveal";
import { site, mailtoLink, whatsappLink } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  const emailHref = mailtoLink(
    "Enquiry from FrameHide",
    "Hi FrameHide, I'm interested in:\nCamera:\nColour:\nCountry:\n"
  );
  const waHref = whatsappLink(
    "Hi FrameHide, I'm interested in a leather case. Camera / colour:"
  );

  return (
    <>
      <section className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 pt-16 pb-16 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:pt-24">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-coffee">{t("kicker")}</p>
          <h1 className="mt-5 font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.05] text-ink">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">{t("lead")}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="bezel">
            <div className="bezel-inner relative aspect-[5/4] overflow-hidden">
              <Image
                src="/assets/lifestyle/crafting.jpg"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover film"
              />
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 pb-16 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <Reveal>
            <a
              href={emailHref}
              className="group flex h-full flex-col rounded-card border border-line bg-paper p-8 transition-colors hover:border-ink/25"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-full bg-ink text-paper">
                <EnvelopeSimple size={20} />
              </span>
              <h2 className="mt-5 font-display text-2xl text-ink">{t("emailTitle")}</h2>
              <p className="mt-2 text-sm text-ink-soft">{t("emailBody")}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-coffee">
                {site.email}
                <ArrowUpRight size={15} weight="bold" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.06}>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-card border border-line bg-paper p-8 transition-colors hover:border-ink/25"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-full bg-olive text-paper">
                <WhatsappLogo size={20} />
              </span>
              <h2 className="mt-5 font-display text-2xl text-ink">{t("whatsappTitle")}</h2>
              <p className="mt-2 text-sm text-ink-soft">{t("whatsappBody")}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-coffee">
                {site.whatsappDisplay}
                <ArrowUpRight size={15} weight="bold" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <div className="mt-4 rounded-card bg-coffee px-8 py-10 text-paper">
            <h2 className="font-display text-2xl">{t("wholesaleTitle")}</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-paper/85">
              {t("wholesaleBody")}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mt-8 text-center text-sm text-ink-soft">{t("responseNote")}</p>
        </Reveal>
      </section>
    </>
  );
}
