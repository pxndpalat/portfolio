# Bilingual Astro portfolio

A static, single-page portfolio with English and Thai routes built with Astro, strict TypeScript, Tailwind CSS, and Content Collections.

## Commands

```sh
npm install
npm run dev
npm run check
npm run build
npm run preview
npm run format
```

The development server prints the local URL. Open `/en/` or `/th/`; `/` redirects to `/en/`.

## Replace the placeholders

- Edit profile, contact, skill, language, and translated navigation data in `src/data/site.ts`.
- Add or edit YAML entries under `src/content/projects`, `experiences`, `educations`, and `certificates`.
- Keep both `en` and `th` values in each localized field and use `order` to control display order.
- Replace `site` in `astro.config.mjs` and the sitemap URL in `public/robots.txt` with the production domain.
- Replace `public/og-placeholder.svg` with the final social sharing image and update its path in `src/layouts/BaseLayout.astro` if the filename changes.

The current visual styling is intentionally minimal so a final theme can be added later.
