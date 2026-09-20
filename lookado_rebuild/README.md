# LOOKADO

LOOKADO is a beauty-booking web app/PWA with a customer experience and a business **LOOKADO Pro** area.

## Current repository baseline

This repository consolidates the web app into a versionable source tree instead of distributing ZIP-only builds.

Key points:
- Customer home / discovery / bookings
- Dedicated LOOKADO Pro dashboard
- Fixed Pro navigation: routes use `proBusiness`
- Supabase-ready configuration
- PWA service worker + manifest
- Cloudflare Pages compatible build
- Capacitor Android packaging
- GitHub Actions workflow that produces a debug APK artifact

## Local development

```bash
npm install
cp config.example.js config.js
npm run dev
```

Open the local URL shown by Vite.

## Supabase

Copy `config.example.js` to `config.js` and set:

```js
window.LOOKADO_CONFIG = {
  supabaseUrl: "https://YOUR_PROJECT.supabase.co",
  supabaseAnonKey: "YOUR_ANON_KEY"
};
```

`config.js` is intentionally ignored by Git so credentials/configuration are not committed.

## Cloudflare Pages

Recommended settings:
- Build command: `npm run build`
- Output directory: `dist`

## Android APK

The repository includes Capacitor. Locally:

```bash
npm install
npm run build
npm run android:prepare
npm run android:apk
```

The debug APK will be under:

`android/app/build/outputs/apk/debug/app-debug.apk`

You can also run the **Build LOOKADO Android APK** workflow in GitHub Actions and download the APK artifact.

## Version

Baseline: **18.1-repo**
