# Migration Notes: Stable Move to v2

Goal: migrate `index.html` toward `C:/Users/iampr/Desktop/v2/index.html` step-by-step without breaking site availability.

## Why this process exists

- The site had intermittent opening issues in the user environment.
- Full replacement with the heavy v2 variant caused instability before.
- We now migrate in small, verifiable steps with strict rollback safety.

## Current status (DONE)

1. Restored known-good baseline from `Downloads/index (3).html`.
2. Applied safe head improvements:
   - updated viewport to `width=device-width, initial-scale=1, viewport-fit=cover`
   - added `theme-color`
   - added `format-detection`
   - added FAQ JSON-LD
3. Performance-safe cleanup:
   - removed external hero Unsplash background
   - removed preload image block and related preload JS
4. Header visual refresh (v2-like, light version):
   - chip-style nav buttons
   - improved phone pill and spacing
   - adjusted main offset for fixed header
5. Hero moved to v2-like light structure:
   - replaced old trust+hero with `hero-bento` style block
   - kept gradient-only background (no heavy remote images)
   - preserved `reviewCount` ID and counter behavior

## Constraints to keep

- Do NOT add forced domain redirects in HTML (`window.location.replace`, meta refresh).
- Avoid heavy external dependencies where possible.
- Keep compatibility-first CSS and simple JS.
- After each step:
  - verify page opens
  - do hard refresh (`Ctrl+F5`)
  - only then continue.

## Next planned step (IN PROGRESS)

Step 3:
- Start migrating catalog/cards toward v2 layout in two sub-steps:
  1) [DONE] visual markup/CSS only
  2) [IN PROGRESS] calculator/interactive behavior
     - [DONE] safe interactive reveal for prices in product cards
     - [NEXT] lightweight calculator logic
- Keep existing phone CTA behavior intact.

## Fast rollback strategy

- If a new step breaks opening, immediately restore `index.html` from the last known good local copy before retrying.

