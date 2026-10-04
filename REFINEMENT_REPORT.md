# VRGIL refinement review

Completed 5 October 2026 (Singapore). Official tagline: **Built for Businesses.**

The requested refinement is implemented on the local branch `refinement/premium-ui`. The original `main` remains at `0f0fad96d80d59a28a1711a93d297b5f9daf41fd`; nothing was pushed, merged or deployed. Remote write access was blocked by the GitHub integration in the preceding workflow, so this delivery includes the complete project ZIP, a Git bundle and a patch for review.

## Launch decision

**Technically ready for review and a configured staging deployment. Public launch remains conditional.** The confirmed application defects are fixed. Before publication, the owner must supply the actual public HTTPS origin, hosting/privacy practices and standard ownership/handover terms. No domain, host, retention period, data-protection officer or commercial promise has been invented.

The ordinary local build intentionally has noindex/disallowed crawling when no origin is configured. `npm run build:release` rejects a missing/invalid/non-HTTPS/local/test origin. The QA build used `http://127.0.0.1:3003` solely as its real local test origin; this value is not committed or supplied as a business domain.

## Inspection checklist and implementation

The authoritative `VRGIL_redesign_complete (1)(1).zip` matched the existing source. Both attached screenshots were inspected. The earlier independent audit report was reviewed, and both enquiry defects were reproduced with synthetic data before editing.

| Area / relevant files | Completed refinement |
|---|---|
| Header, `site-header.tsx` and shared CSS | Desktop navigation raised from 11px to 16px; mobile menu begins below 1151px to avoid overlap at intermediate widths. Existing keyboard/Escape/outside-dismiss behaviour retained. |
| Hero, `page.tsx` and CSS | Preserved headline, paragraph, both CTAs, browser frame, genuine desktop screenshot and overlapping phone. Removed eyebrow, note, promotional strip, green outer wrapper and decorative label/arrow. Simplified caption into a named project link. |
| Shared section headings | Title and description form one vertical group; removed detached right-side text and numbered eyebrows. |
| Problem and benefits | Removed decorative problem numbering and repeated benefit labels. Kept all useful copy and icons; raised supporting text. |
| Services | Kept every service description; larger text and consistent card padding. One column on phones prevents narrow text columns. |
| Selected Work | Retained the dark green section and genuine Bloom project. Larger title/tags, visible Explore Project and Visit Website buttons with equal 52px minimum height and 14px gap. Removed the conflicting caption/aria-label combination. |
| Pricing and add-ons | Preserved S$599/S$999, page scope, features, revisions, delivery estimates, seven add-on prices, 50% deposit and exclusions. Removed decorative indices/labels; important notes are 16px. Phone feature lists use one column. |
| Five-step journey | All five steps, descriptions and milestones retained. Removed repeated Step 0X labels. Descriptions are 16px, milestones 14px; horizontal on wide desktops and vertical below 1151px. |
| About and FAQs | Independent freelancer positioning retained. Larger text, clearer disclosure rhythm and no decorative question numbering. |
| Contact, `quote-form.tsx` | 14px labels, 16px inputs, one-column phone fields. Form remains inert until hydration. Package choices retain fields/add-ons and change the package without a reload. Honest review/email/WhatsApp draft handoff retained. |
| Footer and social image | Official tagline used deliberately in both. Original logo, contacts, privacy and terms links retained. Phone footer uses one column so the email and WhatsApp details have adequate room. |
| Case study and supporting pages | Typography updated consistently; accurate project-specific image alternatives now live in project data. Removed public preparation wording from privacy copy, and documented the script-disabled contact fallback. Missing operational facts remain owner decisions. |
| Release/tooling | Shared origin validation, guarded release command, Node >=22.19 with Node 24 selector, portable Windows startup helper. No new framework, backend, tracking provider or animation library. |

CSS uses shared type tokens and existing palette/spacing tokens. Existing component rules and breakpoints were revised and repeated selectors consolidated. This is a refinement of the approved design and architecture.

## Measured before-and-after changes

At 1440px, the actual hero browser preview grew from 541px to approximately 598px: **10.5% wider**. At 1920px it grew approximately 10.6%; on smaller screens the removed padding gives proportionally more room.

| Text at 1440px | Before | After |
|---|---:|---:|
| Desktop navigation | 11px | 16px |
| Hero paragraph | 15px | 18px |
| Service descriptions | 12px | 16px |
| Pricing notes / deposit / exclusions | 10px | 16px |
| Journey descriptions | 11px | 16px |
| Journey milestones | 9px | 14px |
| Form labels | 10px | 14px |
| FAQ questions | 13px | 17px |

The original logo and both approved Bloom screenshot assets are byte-for-byte unchanged. Palette remains off-white, charcoal and forest green. No fabricated projects, client statistics, testimonials or business facts were added.

## Regression and accessibility results

The final production build, TypeScript check, ESLint, formatting check and Git whitespace check passed. **19 browser tests passed, zero failed/skipped**, including all original test coverage, the added 1920px viewport and four targeted test groups.

- Package selection preserves name, business, email, phone, multiline brief and selected extras before review, after editing and while review is open. It produces no navigation request and no website query string.
- With JavaScript disabled, private fields and Review enquiry are disabled. Activating the disabled control creates no additional request; URL and request bodies contain no enquiry fields. Direct email and WhatsApp links remain available. The server-rendered form uses POST as an additional safeguard against GET serialisation.
- Required-field validation, review focus, edit retention, correct WhatsApp recipient, encoded email/WhatsApp drafts and honest unsent status passed. No messages were sent.
- Automated axe scans cover homepage, genuine case study, privacy, terms and 404 at 390/1440px, plus extras/review states. WCAG 2/2.1/2.2 A/AA tags and the explicitly enabled label-content-name-mismatch rule report zero violations.
- Keyboard navigation, menu dismissal, all FAQ disclosures, reduced motion, script-disabled content, local routes and genuine/unknown portfolio paths passed.
- Missing and invalid release-origin checks fail deliberately. Both unconfigured preview metadata and configured canonical/social/robots/sitemap output were checked. Configured sitemap has exactly four public page entries.

Automated accessibility checks are evidence of these checks, not a full conformance certification. Native Safari, assistive-technology users and actual external-app sending were not tested.

## Responsive visual QA

Real Chromium screenshots were inspected at **320, 375, 390, 768, 1024, 1440 and 1920px**. All homepage widths fit the viewport; the case study was checked at the same seven widths. Hero overlap, readable navigation, section grouping, project buttons, pricing notes, journey and form were reviewed. Phones use stacked CTAs where needed and one-column services, pricing features and form fields. No confirmed horizontal overflow or meaningful text clipping remains.

`qa/before/` contains baseline captures from the authoritative source; `qa/after/` contains refined captures and computed measurements. Each has seven full-page home captures, seven hero captures and six section crops at desktop/mobile. Full-page/hero captures are unaltered. Section crops temporarily hide the sticky header and skip link to prevent capture obstruction; this does not change delivered UI. All enquiry evidence uses synthetic data. The QA host initially served stale generated route-cache files; these were cleared before final validation.

## Fresh performance and dependencies

Performance was measured against the final optimized build on the local origin with Lighthouse 13.5 and Chromium 153. Mobile used default simulated throttling; desktop used the existing desktop audit profile. Scores are laboratory measurements, not real-user guarantees.

| Measure | Mobile | Desktop |
|---|---:|---:|
| Performance | 96 | 100 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO (configured local test origin) | 100 | 100 |
| LCP | 2.7s | 0.6s |
| CLS | 0 | 0 |
| Total blocking time | 40ms | 0ms |

The prior independent audit's 93 mobile / 100 desktop is a reference from another execution environment; it is not a controlled performance experiment. Final Lighthouse JSON/HTML and exact metric values are included in `qa/`.

Production dependency audit: **0 vulnerabilities**. Full audit: **7 high affected development packages**, zero critical, from the same braces advisory chain. Registry latest is still braces 3.0.3 and the official advisory lists no patched version. A forced major Tailwind/ESLint migration was not made; avoid processing untrusted glob patterns in the build tools and review upstream patches when available.

Source: [GitHub reviewed advisory GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm), checked 5 October 2026. This is a development-tool issue, not seven independent production findings.

## Prior audit disposition

| ID | Status / remaining work |
|---|---|
| VR-01 no-script privacy | Fixed and request/URL regression passed. |
| VR-02 package state loss | Fixed; full draft and extras retained without reload. |
| VR-03 release origin / SEO | Guarded and metadata tested. Actual owned HTTPS origin still required before release. |
| VR-04 label in name | Fixed; explicit rule passed, including review state. |
| VR-05 small meaningful text | Fixed and measured in real browser. |
| VR-06 privacy operations | Preparation wording removed; form behaviour clarified. Actual host, retention/deletion practices and responsible privacy contact role remain unconfirmed. |
| VR-07 dev dependencies | Rechecked; no patched braces release available. Seven affected development packages remain, runtime audit zero. |
| VR-08 ownership clarity | Owner must confirm standard ownership after payment, source delivery/account access and third-party exceptions. Existing honest scope/quotation wording retained. |
| VR-09 Node/tool mismatch | Fixed: >=22.19, Node 24 selector and documentation. |
| VR-10 Windows helper | Fixed: starts from its own folder and uses npm from PATH. |
| VR-11 project hardcoding | Fixed: names and project-specific image alternatives derive from project data. |

## Final business-owner review

The opening identifies website design/development immediately, supported by the original genuine project imagery. Fewer labels and larger text reduce visual noise. CTAs are clearly distinguished; packages retain all buying information; the journey explains what comes next; direct contact and the unsent draft status are clear. The result is more coherent without changing the approved visual direction. The remaining credibility gaps are the actual operational privacy and standard ownership facts, which code cannot establish.

## Deployment instructions

1. Review the ZIP or restore the included Git bundle on a separate branch. Keep main/production unchanged until approval.
2. Use Node >=22.19 (Node 24 recommended by the project selector), run `npm ci`, then `npm run dev` for local review.
3. Confirm the public domain and the owner facts listed above. Update privacy/ownership copy with actual practices. Set `NEXT_PUBLIC_SITE_URL` in the host's build environment or `.env.local` to the confirmed HTTPS origin only.
4. Run `npm run build:release`, `npm run lint`, `npm run typecheck`, `npm test`, and `npm run audit:site` with an installed Chromium binary. Use `CHROMIUM_EXECUTABLE_PATH` only if needed. The release guard must pass; the current missing-domain failure is intentional.
5. Check every canonical URL, the four sitemap URLs, robots sitemap reference and social image against the real release origin. Confirm original contact recipients and live portfolio link in the staging build.
6. Deploy through the existing hosting workflow only after approval. Do not use the local test origin in production. Run a post-deploy smoke check of navigation, mobile menu, FAQ, no-script fallback, enquiry review/edit/drafts and 404s. Actual sending should be performed by the owner if desired.

The ZIP omits dependencies, generated builds, environment secrets and the live .git directory. It includes source/config/lockfile, tests/scripts, reports, screenshots, raw QA evidence and recoverable Git history. No source overwrite, production deployment or message sending was performed.
