const fs = require('fs');

let page = fs.readFileSync('src/app/[locale]/page.tsx', 'utf8');

const heroRegex = /\{\/\* 1\. Hero - [^]*?<\/section>/m;
const newHero = `{/* 1. Hero - Full screen immersive background with overlaid text */}
      <section className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden bg-ink">
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
            <CTA href="/contact" className="!bg-paper !text-ink hover:!bg-cream border-transparent">
              {t("hero.primary")}
            </CTA>
            <CTA href={\`/products/\${product.slug}\`} variant="ghost" className="!text-paper hover:!text-paper/80">
              {t("hero.secondary")}
            </CTA>
          </div>
        </Reveal>
      </section>`;

page = page.replace(heroRegex, newHero);
fs.writeFileSync('src/app/[locale]/page.tsx', page);
