const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/products/[slug]/page.tsx', 'utf8');

code = code.replace(
  /src="\/assets\/lifestyle\/street.jpg"/g,
  `src="/assets/lifestyle/desk-setup.jpg"`
);

code = code.replace(
  /product.gallery\[1\] \?\? product.gallery\[0\]/g,
  `"/assets/lifestyle/desk-setup.jpg"`
);

fs.writeFileSync('src/app/[locale]/products/[slug]/page.tsx', code);
