import { mkdir, copyFile, rm } from "node:fs/promises";
const files=["index.html","styles.css","app.js","manifest.webmanifest","service-worker.js","_headers","_redirects"];
await rm("dist",{recursive:true,force:true});
await mkdir("dist",{recursive:true});
for (const f of files) await copyFile(f,`dist/${f}`);
console.log("LOOKADO full build copied to dist/");
