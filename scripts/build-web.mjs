import { mkdir, copyFile, rm, access } from "node:fs/promises";
const files=["index.html","styles.css","app.js","manifest.webmanifest","service-worker.js","_headers","_redirects"];
await rm("dist",{recursive:true,force:true}); await mkdir("dist",{recursive:true});
for(const f of files){try{await access(f);await copyFile(f,`dist/${f}`)}catch{}}
console.log("LOOKADO v19 international ready");
