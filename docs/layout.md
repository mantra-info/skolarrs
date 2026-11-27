# Layout and scaling

The desktop design width is 1920px and the content width is 1620px. From the
64rem breakpoint, `html` uses `font-size: calc(100vw / 120)`, without clamping.
Below that breakpoint, the browser's default root font size applies.

Use `container-x` for section alignment. Its maximum content width is 101.25rem,
plus a gutter on each side: 1rem on phones, 1.5rem from 48rem, and 4rem from
64rem. At 1920px the outer container is 1748px wide; at 1280px it is approximately
1165.33px wide.

Convert design dimensions to rem (design pixels / 16), including typography,
inline styles, icon dimensions and positioning. Borders, shadows and outlines
may stay in pixels. Keep desktop arrangements at `lg`; do not introduce larger
breakpoints to make content fit. Do not scale the page with zoom, transforms or
JavaScript. Existing image-only decorative transforms do not affect page layout.

Phone/tablet content uses normal flow, wrapping and stacked sections. The small
home promotional tiles use aspect ratios, percentage positioning and container
query typography. About/Services hero artwork follows the copy on mobile.

Below 48rem, sets of large cards use the `mobile-rail` utility (globals.css): a
swipeable, snap-scrolling row that bleeds to the screen edges with the next card
peeking in. Set the card width with `[--rail-item:80%]`. Small items (destination
and course tiles) use two-column grids instead. Every phone-only change is
scoped with `max-md:` or the rail's own media query, so `md` and `lg` layouts
render pixel-identical to before.

## Verification

Run `npm run build` and `npm run start -- --hostname 127.0.0.1` in separate steps.
With Playwright available (and Chrome plus Playwright WebKit installed), run:

```sh
node scripts/check-layout.cjs
```

`PLAYWRIGHT_MODULE` can point to an existing Playwright or playwright-core
installation. `BASE_URL` can override the local preview URL. No browser dependency
is added to the website's runtime dependencies.

The check covers all 26 routes in Chrome and WebKit at 360, 390, 768, 1023, 1024,
1280, 1440 and 1920px. It verifies HTTP success, horizontal page overflow, root
font size, every shared container's width, text spill, card text containment,
and the mobile navigation dropdown's placement at phone and tablet widths.

No Figma file or mobile frame was supplied for this change. Exact Figma heading
line counts and mobile-frame fidelity therefore require a separate comparison
when the source design is available. The existing artwork and supplied project
dimensions are the design reference used here.
