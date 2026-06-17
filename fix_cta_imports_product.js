const fs = require('fs');

let page = fs.readFileSync('src/app/[locale]/products/[slug]/page.tsx', 'utf8');

page = page.replace(
  /<CTA href="\/contact" className="bg-paper text-ink hover:bg-cream">\s*\{common\("requestQuote"\)\}\s*<\/CTA>/g,
  '<CTA href="/contact" variant="dark">{common("requestQuote")}</CTA>'
);

fs.writeFileSync('src/app/[locale]/products/[slug]/page.tsx', page);
