const fs = require('fs');

let page = fs.readFileSync('src/app/[locale]/page.tsx', 'utf8');

page = page.replace(
  /<CTA href="\/contact" className="!bg-paper !text-ink hover:!bg-cream border-transparent">([^]+?)<\/CTA>/g,
  '<CTA href="/contact" variant="dark">$1</CTA>'
);

page = page.replace(
  /<CTA href={`\/products\/\${product.slug}`} variant="ghost" className="!text-paper hover:!text-paper\/80">([^]+?)<\/CTA>/g,
  '<CTA href={`/products/${product.slug}`} variant="ghost" className="!text-paper hover:!text-paper/80">$1</CTA>'
);

page = page.replace(
  /<CTA\s+href="\/contact"\s+className="border-transparent bg-paper text-ink hover:bg-cream"\s*>([^]+?)<\/CTA>/g,
  '<CTA href="/contact" variant="dark">$1</CTA>'
);

page = page.replace(
  /<CTA href="\/contact" className="bg-paper text-ink hover:bg-cream">([^]+?)<\/CTA>/g,
  '<CTA href="/contact" variant="dark">$1</CTA>'
);

fs.writeFileSync('src/app/[locale]/page.tsx', page);
