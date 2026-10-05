# VRGIL pricing pitch redesign

Implemented and verified locally on 5 October 2026. Preview: http://localhost:3010/#pricing. No production deployment performed.

The pricing section now leads with “Choose the website your business needs.” Package identities (“Start simple” and “Built to grow”) help customers self-select. Short italic pitch phrases use the existing Cormorant Garamond; names, prices, scope, features and actions retain Manrope.

Large page-count headings and restrained green accent lines emphasize the difference between a single scrolling page and up to five separate pages. Repeated introductory copy and the optional example disclosure were removed from the cards. Shared features use muted 15px text, while revisions and delivery remain readable above consistently sized CTAs. Prices are grouped with their currency so they cannot split across lines. Cards stack below 901px; phone layouts use their own spacing and price-note arrangement.

Prices, included features, delivery windows, revision allowances, add-on terms and existing package-selection behaviour are preserved. No new client component, dependency or animation was added. The production homepage reports 117 kB first-load JavaScript, the same rounded size as before; this is a build measurement, not a Lighthouse performance audit.

## Screenshots

Captured from the real local site with Chromium-based Microsoft Edge. Screenshots include the complete pricing section and its existing add-ons. The 320px and 1440px after screenshots were visually inspected.

| Width | Before | After |
| --- | --- | --- |
| 320px | [Before](before/pricing-320.png) | [After](after/pricing-320.png) |
| 375px | [Before](before/pricing-375.png) | [After](after/pricing-375.png) |
| 390px | [Before](before/pricing-390.png) | [After](after/pricing-390.png) |
| 768px | [Before](before/pricing-768.png) | [After](after/pricing-768.png) |
| 1024px | [Before](before/pricing-1024.png) | [After](after/pricing-1024.png) |
| 1440px | [Before](before/pricing-1440.png) | [After](after/pricing-1440.png) |
| 1920px | [Before](before/pricing-1920.png) | [After](after/pricing-1920.png) |

## Verification

- Production build: passed.
- TypeScript: passed.
- ESLint: passed.
- Prettier check: passed.
- Playwright: all 26 tests passed in 1.1 minutes.
- Coverage includes seven viewport widths, pricing against shared configuration, identity and pitch text, horizontal overflow, mobile card stacking, keyboard navigation, form validation, draft handoffs, package switching without navigation or lost fields, JavaScript-free fallback, reduced motion, and automated WCAG A/AA checks at 390px and 1440px.

No known blocking issues remain for this pricing implementation. Automated accessibility checks do not replace a full manual assistive-technology audit. No conversion uplift is claimed; that requires actual customer evidence. Production publishing remains subject to the existing release requirements and owner approval.
