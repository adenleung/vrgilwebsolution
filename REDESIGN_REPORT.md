# VRGIL — Redesign and implementation report

The VRGIL website has been redesigned and implemented from the existing repository, with a public business homepage, genuine portfolio work, retained prices and a working enquiry draft handoff. The complete source is ready for review. No production deployment was performed.

## Repository and delivery

- Authoritative repository: https://github.com/adenleung/VRGIL
- Starting commit: `0f0fad96d80d59a28a1711a93d297b5f9daf41fd`.
- Local development branch: `redesign/editorial-studio`.
- Redesign commit: `deed494`. QA and documentation are recorded in a following local commit; see `REVIEW_COMMITS.txt` in the ZIP for its exact ID.
- GitHub's connected integration rejected creating the remote branch with HTTP 403, “Resource not accessible by integration.” The redesign was not pushed and no pull request was created. This is a complete ZIP delivery fallback.
- The original local and remote `main` remain at the original baseline. No merge or deployment was performed.
- The ZIP contains the full modified project, dependency lockfile, setup instructions, screenshots, Lighthouse JSON/HTML reports, browser test results, dependency audit reports, a patch series and a Git bundle. It excludes `node_modules`, build output, machine-specific browser binaries, environment secrets and the working `.git` directory.

## Original audit

The repository was a small Next.js application with a 251-line client homepage, a heavily overridden stylesheet, animated UI helpers and three placeholder portfolio routes. It also contained an access-code gate, delayed audio welcome, animated display text, unsupported marketing statistics, illustrative testimonials and a WhatsApp form that did not address a recipient.

The original production build passed. Its homepage reported 175 kB first-load JavaScript. The initial production dependency audit reported three high and one critical finding across Next.js and its dependency tree. The redesign retains the repository, framework, route structure and authentic logo rather than starting a different application.

## What changed

### Visual design

- Warm off-white `#F8F7F4` canvas; neutral `#F0F0EB` surfaces; deep charcoal `#202420` text; muted forest green `#496D60` accent; `#DDDFD8` borders.
- Secondary text is a slightly darker neutral for readable contrast.
- Manrope provides contemporary, clear body text. Cormorant Garamond supplies restrained editorial emphasis and the case-study title. Fonts are bundled and served by Next.js.
- Consistent button treatments, card borders, spacing, heading hierarchy, focus indicators and responsive breakpoints.
- Dark green is reserved for the project showcase and footer.
- The hero demonstrates a genuine website using actual desktop and mobile screenshots, arranged in browser and phone frames.
- The original `public/vrgil-logo.png` is byte-identical to the baseline, verified by SHA-256. The layout uses proportional scaling and crops transparent padding; CSS supplies its dark version on light backgrounds.

### Business narrative

The homepage opens immediately with “Your business deserves a better website.” It moves through practical owner concerns, website benefits, services, verified work, package comparison, delivery milestones, direct studio communication, FAQs and contact. It positions VRGIL as an independent freelance studio without invented company registrations or team size.

Messaging explains credibility, discoverability, convenient enquiries and control over business information. It avoids revenue, ranking and conversion guarantees. A dedicated services section covers landing pages, business websites, redesign, responsive layouts, basic SEO, contact/WhatsApp, booking integrations and individually quoted extras.

### Removed legacy features

- Access-code input and code `123` gate.
- “Access Granted” transition, audio welcome and timed welcome screen.
- Continuously changing headline, animated paths and moving workflow lens.
- Custom scroll interception and animation loop.
- Floating portfolio command menu and full-screen contact overlay.
- Illustrative client testimonials and star ratings.
- Unsupported percentages, enquiry multipliers, conversion statistics and the speculative revenue calculator.
- “Most Popular” package claim and inconsistent fixed-day process dates.
- Placeholder healthcare, construction and hospitality projects and their generic case-study content.
- Unused animation/UI dependencies and associated code, portal artwork, audio and duplicate logo assets. The actual original logo is retained.

### Genuine portfolio

Bloom Hair Place was explicitly selected by the owner. The implementation was checked against `adenleung/BloomHairPlaceSSG` at commit `5edb80382e81b8a67891de34fe2d73685f200248`.

The live URL `https://bloomhairplace.com` returned HTTP 200 with the expected salon title and content. The portfolio WebP images are screenshots of that actual live website at 1440×1000 and 390×844, captured on 4 October 2026. Browser-frame treatments do not replace the underlying screenshots with fabricated designs.

The project has an industry label, brief, approach, features and live website link, with its own route at `/portfolio/bloom-hair-place`. Project data is maintained in `src/lib/projects.ts`; future entries can be added without duplicating route code. Unsupported old projects and unknown slugs return 404.

### Pricing and service terms

The starting package prices remain **Landing Page S$599** and **Business Website S$999**. Page counts, included responsive/contact/WhatsApp/Maps/SEO/social features, revision rounds and business-day delivery estimates match the supplied specification.

Add-ons remain: additional page S$100; logo design S$100; copywriting S$100; booking integration S$200; blog setup S$150; additional revision S$50; priority delivery S$200. All are starting prices, with custom requirements quoted individually.

The site clarifies that delivery depends on receiving required materials and approvals. Domain, hosting, third-party subscriptions and ongoing maintenance are separate unless explicitly included. The 50% deposit and final payment wording comes from the original repository. Ownership, source files, licences, access and after-launch support are referred to the written quotation; unconfirmed promises are not invented.

### Customer journey

An ordered five-step timeline explains:

1. Discovery — discuss the business, customers and requirements.
2. Planning — agree objectives, pages, features, content, direction, scope and quotation.
3. Design & development — create the website to the approved brief.
4. Review & refinement — client review and included revision rounds.
5. Launch & handover — deploy after approval and payment, then complete the agreed handover.

Each step has a concrete milestone rather than a fixed date. Desktop connects five steps horizontally; tablet and mobile use a vertical sequence. IntersectionObserver subtly changes node colour as the visitor reaches each step. Text is always visible, and reduced motion removes transitions.

### Enquiry functionality

The contact form collects name, business name, email, optional phone, package, project description and optional add-ons. Package CTAs select the appropriate interest. Browser validation and a whitespace check prevent empty required details.

“Review enquiry” shows the actual draft. The visitor then chooses a WhatsApp link addressed to **6583635900** or an email draft addressed to **adenleung08@gmail.com**, both sourced from the original repository. Details are correctly URI-encoded, including ampersands, Unicode and line breaks. The visitor sends the draft from their chosen app.

The page never claims a message was sent. It has no form delivery backend, database or paid service. The visitor can edit their details, copy the draft or use direct contact links. Clipboard failure leaves the text available for manual copying. No client entries are persisted in local storage.

### SEO and accessibility

Public title and description replace “Private Proposal” metadata. Pages have semantic structure, descriptive image text, one primary heading, labelled form controls, keyboard-operable native FAQ accordions, a skip link, visible focus styling and accessible mobile menu state. Opening the mobile menu moves focus to its first link; Escape returns focus to the toggle. Native scrolling respects sticky-header offsets and reduced motion.

Canonical URLs, absolute share-image URLs and sitemap entries derive from `NEXT_PUBLIC_SITE_URL`. The origin is deliberately not invented. When unset, these domain-dependent values are omitted and the sitemap has no entries. `/api/og` independently serves a verified PNG share image. The footer links to accurately scoped website privacy information and website terms; project terms still belong in the quotation.

## Actual validation

Validated using Node.js 24.19.0, Next.js 15.5.27 and Chromium 153 in this execution environment.

| Check | Result |
| --- | --- |
| Dependency installation | Passed; lockfile updated and `npm ci --dry-run --ignore-scripts` passed |
| TypeScript | `npm run typecheck` passed |
| Lint | `npm run lint` passed with no warnings in final source |
| Production build | `npm run build` passed with no warnings |
| Formatting | `npm run format:check` passed |
| Browser suite | **14 passed**, final run using normal Chromium networking |
| Homepage widths | 320, 375, 390, 768, 1024 and 1440 px passed; no horizontal overflow |
| Case-study widths | 320, 390, 768 and 1440 px passed; no horizontal overflow |
| Navigation | All six navigation destinations, package CTAs, menu opening/closing, outside dismissal and Escape passed |
| FAQ keyboard controls | Enter and Space toggle every native accordion |
| Enquiries | Required validation, selected package, add-ons, Unicode/ampersand/line-break encoding, exact recipients, draft review, edit retention and no false success state passed |
| Routes | Homepage, genuine case study, privacy, terms, robots, sitemap and PNG share image passed; removed and unknown projects return 404 |
| Automated accessibility | Zero WCAG 2/2.1 A/AA axe violations on homepage, case study, privacy, terms and 404 at 390 and 1440 px |
| Reduced motion / script-disabled browser | Journey text and primary content stay available; reduced-motion scrolling/transitions and native FAQs passed; direct email remains available |
| Production dependency audit | **0 vulnerabilities** via `npm audit --omit=dev` |
| Logo preservation | Original and delivered PNG have the same SHA-256 |
| Manual visual review | Desktop and mobile homepage, full-page layouts, pricing, journey, case study and share image inspected |

The browser suite prepared and inspected enquiry drafts without sending a message to the owner. Actual inbox delivery and external-app send confirmation were not exercised, because sending is an explicit visitor action. No production host or domain integration for VRGIL was changed.

### Lighthouse results

Measured on the production build, using Lighthouse's mobile and desktop lab profiles. These are local lab results, not promises about a future host, real customer device or network.

| Profile | Performance | Accessibility | Best practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| Mobile | 97 | 100 | 100 | 100 |
| Desktop | 100 | 100 | 100 | 100 |

| Profile | FCP | LCP | Total blocking time | Layout shift |
| --- | ---: | ---: | ---: | ---: |
| Mobile | 0.9 s | 2.6 s | 20 ms | 0 |
| Desktop | 0.3 s | 0.6 s | 0 ms | 0 |

Both audits completed without run warnings. Homepage first-load JavaScript is **116 kB**, compared with the original build's **175 kB**. Static business content does not hydrate as one large animated page. Screenshots use local WebP assets and Next.js image optimisation; continuous animation and welcome payloads are removed.

## Remaining limitations and publication steps

1. **GitHub write access:** the remote branch and PR could not be created. Local commits, a Git bundle and the complete source ZIP are provided. `main` is untouched.
2. **VRGIL public origin:** set `NEXT_PUBLIC_SITE_URL` to the confirmed public origin and rebuild before publication. Final domain-dependent canonical/social/sitemap values cannot be validated against a domain that has not been supplied.
3. **Commercial wording:** confirm the quotation's ownership, account access, deposit, handover, maintenance and support arrangements before accepting projects. Website information pages should be checked against the actual hosting provider. The site does not pretend these replace a signed project agreement.
4. **Development-tool advisories:** the full audit has seven high findings in the Tailwind/ESLint glob-pattern dependency tree (`braces`, `chokidar`, `micromatch`, `fast-glob`, Tailwind and the Next lint packages). Production audit is clean. No risky forced framework migration or unverified override was used to hide these upstream dev-tool findings; the raw audit is included.
5. **Test coverage boundaries:** Chromium desktop/mobile emulation was tested. Physical iOS Safari/Android devices and a deployed VRGIL host were not tested. Automated accessibility checks complement manual keyboard and layout review; they do not establish universal accessibility certification.
6. **Enquiry delivery:** the handoff is implemented and tested, with an email/copy fallback. External account status, WhatsApp availability and sending the draft are controlled by the visitor and external provider.

## Final customer review

The first screen names the offering and presents a quote CTA and starting price. The original logo, honest independent-studio positioning, transparent costs, actual Bloom project and direct contact details support credibility. Pricing cards can be compared without guessing what domain/hosting/support includes. The milestone journey explains what follows the first enquiry. Mobile layouts retain readable headings, appropriately sized inputs and accessible controls. No fake testimonial, invented project or performance promise is used to make the website feel established.

## File inventory

The table includes the complete source/configuration change set relative to the original repository. Screenshot and raw audit outputs under `qa/` are delivered evidence, not tracked application files. Unchanged configuration files and the original logo remain in the full project ZIP.

| Change | File |
| --- | --- |
| Added | `.env.example` |
| Modified | `.gitignore` |
| Added | `README.md` |
| Added | `REDESIGN_REPORT.md` |
| Removed | `components.json` |
| Added | `eslint.config.mjs` |
| Modified | `package-lock.json` |
| Modified | `package.json` |
| Added | `playwright.config.ts` |
| Removed | `public/portal-background.png` |
| Removed | `public/vrgil-exact-logo.png` |
| Removed | `public/vrgil-lockup.svg` |
| Removed | `public/vrgil-logo-upscaled.jpeg` |
| Removed | `public/vrgil-logo.jpg` |
| Removed | `public/vrgil-symbol.png` |
| Removed | `public/vrgil-symbol.svg` |
| Removed | `public/welcome-vrgil.mp3` |
| Added | `public/work/bloom-desktop.webp` |
| Added | `public/work/bloom-mobile.webp` |
| Added | `scripts/audit.mjs` |
| Added | `src/app/api/og/route.tsx` |
| Modified | `src/app/globals.css` |
| Modified | `src/app/layout.tsx` |
| Added | `src/app/not-found.tsx` |
| Modified | `src/app/page.tsx` |
| Modified | `src/app/portfolio/[slug]/page.tsx` |
| Added | `src/app/privacy/page.tsx` |
| Added | `src/app/robots.ts` |
| Added | `src/app/sitemap.ts` |
| Added | `src/app/terms/page.tsx` |
| Added | `src/components/brand.tsx` |
| Added | `src/components/journey-enhancement.tsx` |
| Added | `src/components/quote-form.tsx` |
| Added | `src/components/site-footer.tsx` |
| Added | `src/components/site-header.tsx` |
| Removed | `src/components/ui/background-paths.tsx` |
| Removed | `src/components/ui/button.tsx` |
| Removed | `src/components/ui/coss-accordion.tsx` |
| Removed | `src/components/ui/dia-text-reveal.tsx` |
| Removed | `src/components/ui/expandable-tabs.tsx` |
| Removed | `src/components/ui/faq-accordion-block-shadcnui.tsx` |
| Added | `src/lib/projects.ts` |
| Added | `src/lib/site-data.ts` |
| Removed | `src/lib/utils.ts` |
| Added | `tests/site.spec.ts` |

## Inspect the deliverables

- `qa/desktop-preview.png`, `qa/mobile-preview.png`: first-screen previews.
- `qa/home-*.png`: full homepage screenshots at all six requested widths.
- `qa/case-*.png`: responsive case-study screenshots.
- `qa/social-preview.png`: actual generated share image.
- `qa/lighthouse-mobile.html`, `qa/lighthouse-desktop.html`: interactive Lighthouse reports, with their JSON counterparts.
- `qa/playwright-results.json`: final browser-suite result.
- `qa/production-dependency-audit.json`, `qa/dependency-audit.json`: exact dependency audit output.
- `patches/`, `VRGIL-redesign.bundle`, `REVIEW_COMMITS.txt`: review/apply material for the local Git history.
