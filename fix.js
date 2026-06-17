const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/page.tsx', 'utf8');

code = code.replace(
  /<Reveal className="mt-16".*?<\/Reveal>/s,
  `<div className="mt-16 grid gap-4 grid-cols-1 md:grid-cols-2">
          <Reveal delay={0.05} className="h-full">
            <div className="relative aspect-[4/3] md:min-h-[60vh] w-full overflow-hidden bg-ink">
              <Parallax amount={15} className="relative h-full w-full">
                <Image
                  src="/assets/lifestyle/leather-tools.jpg"
                  alt={t("intro.imageAlt")}
                  fill
                  sizes="50vw"
                  className="scale-110 object-cover film opacity-90 mix-blend-luminosity"
                />
              </Parallax>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="h-full">
            <div className="relative aspect-[4/3] md:min-h-[60vh] w-full overflow-hidden bg-ink">
              <Parallax amount={25} className="relative h-full w-full">
                <Image
                  src="/assets/lifestyle/making-case.jpg"
                  alt={t("intro.imageAlt")}
                  fill
                  sizes="50vw"
                  className="scale-110 object-cover film opacity-90 mix-blend-luminosity"
                />
              </Parallax>
            </div>
          </Reveal>
        </div>`
);

code = code.replace(
  /src="\/assets\/lifestyle\/hands-camera.jpg"/g,
  `src="/assets/lifestyle/shoulder-carry.jpg"`
);

fs.writeFileSync('src/app/[locale]/page.tsx', code);
