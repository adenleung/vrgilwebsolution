# VRGIL Web Solutions

An independent Singapore web studio website, redesigned from the original Next.js repository with its latest refinement on `refinement/premium-ui`. The original `main` baseline is `0f0fad96d80d59a28a1711a93d297b5f9daf41fd`. No production deployment was performed.

## Run locally

Use Node.js 22.19 or later for the application and QA tooling; `.nvmrc` selects Node 24. Validation used Node.js 24.19.0.

```bash
npm ci
npm run dev
```

For a production preview:

```bash
npm run build
npm run start
```

The default URL is `http://localhost:3000`. In environments that cannot enumerate network interfaces, use `npm run start -- -H 0.0.0.0` or `npm run dev -- -H 0.0.0.0`.

## Before publication

1. Review the design, content, portfolio permission and commercial wording.
2. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the **confirmed public origin**, for example the domain you actually control. Do not include a path, query string or fragment. Rebuild after changing it.
3. Confirm the actual host, retention/deletion practices, privacy request contact role, and standard ownership/source/account handover terms. Update the public privacy page and ownership FAQ with those facts. These owner decisions remain release requirements.
4. Run `npm run build:release`, which refuses a missing, malformed, local, non-HTTPS or reserved test origin. Run tests against that build and verify the homepage/case-study/privacy/terms canonical URLs, four sitemap entries, robots sitemap reference and social image.
5. Follow your existing host's reviewed deployment workflow after approval. Do not replace production or main without that review.

Without a configured public origin, local previews intentionally have `noindex`, disallow crawling, omit canonical URLs and absolute social image URLs, and leave the sitemap empty. Invalid configured origins fail instead of being silently ignored. It does not invent a business domain. `/api/og` serves the generated share image independently.

## What to edit

| File | Content |
| --- | --- |
| `src/lib/site-data.ts` | Email, WhatsApp, navigation, packages, add-ons, service descriptions, FAQs and process milestones |
| `src/lib/projects.ts` | Approved project entries and source provenance |
| `public/work/` | Genuine portfolio screenshots |
| `src/app/page.tsx` | Server-rendered homepage structure and business narrative |
| `src/app/globals.css` | Centralised palette, typography, spacing, components and responsive layouts |
| `src/components/quote-form.tsx` | Enquiry review and client-side draft handoff |
| `src/app/privacy/page.tsx`, `src/app/terms/page.tsx` | Website information pages |

The original `public/vrgil-logo.png` is byte-for-byte unchanged. CSS crops its transparent outer padding and scales it proportionally; a colour filter supplies the dark version on light backgrounds.

## Enquiries

The website uses a real, explicit handoff rather than a simulated submission:

1. The visitor enters contact details, package selection, optional add-ons and a project description.
2. **Review enquiry** validates the form and shows the draft.
3. The visitor chooses WhatsApp (addressed to `6583635900`) or email (addressed to `adenleung08@gmail.com`).
4. The external app opens with the draft. The visitor sends it there.

The form is disabled in server-rendered HTML until its JavaScript handler is ready. Without JavaScript, visitors use direct email/WhatsApp links; no enquiry fields can be entered or submitted. The form also uses POST as a safeguard against GET serialisation. Package CTAs use `#contact` and update the select in place, retaining typed fields and add-ons before and after review.

The website itself does not send messages, create a database record, or claim an enquiry was sent. If email opening or clipboard access is unavailable, the draft remains selectable and direct contact links remain available. No submitted details are stored in local storage. Do not add tracking or form delivery providers without revisiting the privacy wording.

## Portfolio evidence

Bloom Hair Place was explicitly selected by the owner for this redesign. Its website was verified against `adenleung/BloomHairPlaceSSG` at `5edb80382e81b8a67891de34fe2d73685f200248` and the live website at `https://bloomhairplace.com`. The supplied WebP assets are genuine desktop and mobile screenshots of that live website, captured on 4 October 2026. They are not fabricated website mockups.

To add a project, verify the work and public-use permission, add the screenshots, and create an entry in `src/lib/projects.ts`. A live link must be independently checked before setting `liveUrl`; otherwise leave it `null`. The route generates from that data. Unknown slugs return 404.

## Validation

```bash
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm test
npm run audit:site
npm audit --omit=dev
npm run format:check
```

`npm test` starts the production server, so build first. Playwright covers all seven requested widths (320, 375, 390, 768, 1024, 1440 and 1920px), navigation, keyboard disclosure, FAQ behaviour, enquiry validation and draft encoding, real recipients, known and unknown routes, WCAG 2/2.1/2.2 A/AA automated checks plus explicit label-in-name checks, reduced motion and a browser with script execution disabled.

`npm run audit:site` runs mobile and desktop Lighthouse audits, checks the case-study layout at seven widths, and creates screenshots and JSON/HTML reports in `qa/`.

If using an existing browser binary, set `CHROMIUM_EXECUTABLE_PATH` to its absolute path. `BROWSER_FETCH_BRIDGE=1` is an optional local-test transport workaround for restricted execution hosts; the final test run used normal Chromium networking.

See `REFINEMENT_REPORT.md` for the latest measured results, screenshots, audit disposition and launch requirements. `REDESIGN_REPORT.md` is historical. The delivered ZIP includes `qa/`, which is intentionally ignored by Git. Production dependency audit passed with zero findings at the time of validation; the full development-tool audit still identifies seven high affected development packages from the unpatched braces advisory chain. The production audit has zero findings; this does not justify a forced major Tailwind/ESLint migration.

## Stack and scope

Next.js 15.5.27, React 18, TypeScript, Tailwind 3 and custom CSS. Content is rendered on the server; only navigation, enquiry review and a small progressive timeline enhancement hydrate on the client. Google fonts are bundled by Next.js and served locally. No authentication, CMS, database, paid form service or continuous animation is introduced.

## Screenshot comparisons

`CHROMIUM_EXECUTABLE_PATH=/absolute/browser node scripts/capture.mjs after` captures the seven homepage widths, desktop/mobile sections, actual font sizes and enquiry safeguards. The delivery includes `qa/before/` from the authoritative ZIP and `qa/after/` from the refined source. Full-page and hero captures are unaltered; section crops temporarily hide the sticky header and skip link so they cannot obscure section content.

The brand tagline is **Built for Businesses.**, used in the footer and generated social image. Approved project details, the logo and screenshots, S$599/S$999 scope and all five journey steps are preserved.
