const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/about/page.tsx', 'utf8');

code = code.replace(
  /src="\/assets\/lifestyle\/hands-camera.jpg"/g,
  `src="/assets/lifestyle/making-case.jpg"`
);

fs.writeFileSync('src/app/[locale]/about/page.tsx', code);
