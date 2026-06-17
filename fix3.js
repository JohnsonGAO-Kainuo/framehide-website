const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/contact/page.tsx', 'utf8');

code = code.replace(
  /src="\/assets\/lifestyle\/hands-camera.jpg"/g,
  `src="/assets/lifestyle/crafting.jpg"`
);

fs.writeFileSync('src/app/[locale]/contact/page.tsx', code);
