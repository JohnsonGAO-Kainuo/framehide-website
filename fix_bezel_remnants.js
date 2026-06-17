const fs = require('fs');

// src/app/[locale]/products/page.tsx
{
  let code = fs.readFileSync('src/app/[locale]/products/page.tsx', 'utf8');
  // I already manually fixed this file with replace_string, but let's be sure.
}

// src/app/[locale]/products/[slug]/page.tsx
{
  let code = fs.readFileSync('src/app/[locale]/products/[slug]/page.tsx', 'utf8');
  // already replaced
}
