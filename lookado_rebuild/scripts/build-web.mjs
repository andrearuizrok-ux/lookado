import { mkdir, copyFile, rm } from "node:fs/promises";
const files = [
  "index.html","styles.css","app.js","manifest.webmanifest",
  "service-worker.js","_headers","_redirects"
];
await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
for (const file of files) await copyFile(file, `dist/${file}`);
console.log("Copied verified LOOKADO v18.1 source to dist/");
