import { cp, mkdir, rm, writeFile, access } from 'node:fs/promises';

const dist = new URL('../dist/', import.meta.url);
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

const required = ['index.html', 'styles.css', 'app.js', 'manifest.webmanifest', 'sw.js'];
for (const name of required) {
  await cp(new URL(`../${name}`, import.meta.url), new URL(`../dist/${name}`, import.meta.url));
}

try {
  await access(new URL('../config.js', import.meta.url));
  await cp(new URL('../config.js', import.meta.url), new URL('../dist/config.js', import.meta.url));
} catch {
  await cp(new URL('../config.example.js', import.meta.url), new URL('../dist/config.js', import.meta.url));
}

await writeFile(new URL('../dist/_headers', import.meta.url), `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(self), geolocation=(self)
`);
console.log('LOOKADO web build ready in dist/');
