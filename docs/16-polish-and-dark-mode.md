> Historical record: dark mode and its toggle were removed in the subsequent update.

# Website polish and dark mode - 4 November 2026

## Scope

Keep the four-page, call-first informational website, full doctor name, confirmed clinic details, original photographs and navy editorial identity. Do not add appointment submissions, patient information collection, testimonials, new clinical claims or dependencies. Preserve prior versions outside the public repository.

## Design rules

- Newsreader 500 for display headings; Manrope 400/600 for reading and controls. Keep comfortable leading and restrained heading tracking.
- Light mode: warm paper, navy text, blue actions and pale blue supporting surfaces. Dark mode: layered blue surfaces, off-white text, softer secondary text and pale blue actions. Hero/footer have independent inverse colors.
- All colors remain tokens. Verify text/control combinations in both themes; do not invert photographs or map tiles.
- Theme toggle is a 44px keyboard-accessible button. Honor the system preference initially and remember an explicit choice locally. No account, cookie, external request or personal data is involved.
- Preserve visible content without JavaScript. Keep normal browser scrolling. Animate only short opacity/transform entrances, once per element; cancel for reduced motion.
- Share section spacing, button geometry and a capped content container. Collapse navigation at 1050px so the full doctor name and controls fit. Keep visual and keyboard order aligned.
- Preserve the portrait's intentional bottom crop: the source has a white strip. Serve responsive AVIF/WebP/JPEG; use accurate sizes hints rather than inventing source detail.

## Changes

Added readable dark surfaces and an accessible sun/moon theme toggle with saved preference, cross-page initialization and system preference updates. Reduced section motion to 460ms/10px, grouped entrances to 420ms/8px with a capped 135ms stagger. Corrected inverse pressed-link contrast and header keyboard order.

Added Sunday/Friday information to the homepage overview from existing practice data. Expanded the doctor page with explanations of the existing degrees and a clear distinction between hospital appointments and residence consultations. Added consultation preparation and practical phone-booking FAQs. No new credentials, service availability, fees or outcomes are claimed.

Moved the map note into the content grid. Deferred the Leaflet library until the map nears the viewport. Corrected the doctor-page photograph's responsive size hints at tablet widths. Retained the intentional portrait crop and original photo appearance.

## Verification

Astro check reports no errors/warnings/hints; the static production build passes. All generated HTML routes contain one H1, local linked assets resolve, and every inline script has a generated production CSP hash. No dependency changes.

Browser checks: all four routes at 320, 768, 1100 and 1280px, with no horizontal overflow in the measured layouts. Light/dark toggle works and the choice persists across pages. Mobile menu opens and closes with Escape; desktop controls follow visual order. FAQs open by click and close using Enter. The interactive map loads its tiles and location marker after scrolling into range. Corrected tablet photo selects the 768px asset for a 720px display.

Emulated reduced motion: scroll behavior auto, content visible. With JavaScript disabled at 375px: navigation remains visible, enhancement controls stay hidden, content remains visible, and no overflow occurs. Testing overrides were restored.

Calculated key text and control contrast pairs exceed 4.5:1 in both themes (lowest tested normal-text pair: light muted text on the pale-blue surface, 5.01:1). This is not a full accessibility certification. The deferred Leaflet chunk is about 42KB gzip; the visit loader is about 7KB gzip, including its marker assets. These are build-file compression measurements, not field performance or Lighthouse scores.

An independent source finish review and focused read-only security review found no unresolved concrete issue in this change. The security review covers the theme/content diff and CSP generation, not a full security audit or a guarantee of safety. Production deployment/header verification is recorded separately in the handoff.
