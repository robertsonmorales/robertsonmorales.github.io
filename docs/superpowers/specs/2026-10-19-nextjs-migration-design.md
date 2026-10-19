# Next.js Migration — Design

**Status:** agreed in chat 2026-10-19 (approach B + dark mode). Awaiting written review.

## Goal

Rebuild robertsonmorales.com as a Next.js app restyled with Tailwind CSS. Content and layout stay the same, dark mode is turned on, and the site is still hosted on GitHub Pages.

The owner's goals, in this order:
1. **Maintainability.** Each piece of content lives in one data file. Project cards are no longer duplicated between `index.html` and `works.html`.
2. **Room to grow.** Blog posts are MDX files, so a new post means a new file.
3. **Performance/SEO.** No jQuery, Bootstrap, ScrollReveal, Feather or Lottie at runtime. Fonts are self-hosted through `next/font`, and per-page metadata is generated.

## Decisions

| Topic | Decision |
|---|---|
| Hosting | GitHub Pages. Next `output: 'export'`, built and deployed by a GitHub Actions workflow. Custom domain stays configured in repo settings. |
| Framework | Next.js 16 App Router, React 19, TypeScript (strict). |
| Styling | Tailwind CSS v4 (CSS-first `@theme`). All SCSS and Bootstrap are removed. Visual target is parity with the current site at 375 / 768 / 1280px widths; small drift is acceptable, layout and hierarchy changes are not. |
| Colors | Semantic tokens as CSS variables, redefined under `html[data-theme="dark"]` so components rarely need `dark:` classes. Light values come from `_variables.scss`; dark values come from the `--dm-*` block in `style.scss`. |
| Dark mode | Enabled. Inline head script picks `localStorage.theme`, falling back to `prefers-color-scheme`. Toggle in the navbar on every page. `<meta name="theme-color">` is `#fafafa` / `#131114`. Follows OS changes live until the visitor chooses. |
| Icons | `lucide-react` for UI icons. Social brand icons (Facebook, Instagram, LinkedIn, Dribbble) are inline SVG components, because lucide no longer ships brand icons. |
| Animation | ScrollReveal replaced by a `<Reveal>` component (IntersectionObserver + CSS transition). Content is visible without JS and under `prefers-reduced-motion`. The Lottie mouse-scroll indicator is replaced by a CSS-only one. Glitch words and the hero cursor-glow are kept. |
| Testimonials | Bootstrap carousel replaced by a small React carousel: prev/next, auto-advance every 5s, pauses on hover/focus, no auto-advance under reduced motion. |
| Contact form | React component posting JSON to `https://submit-form.com/qEKUSDCs3`, same field names as today. Changes: "How did you find me?" is validated and sent (today it is silently dropped); a non-2xx response goes to `/error` (today it goes to `/success`); email check accepts any TLD length (today `.studio` / `.info` are rejected); the ipify IP lookup is dropped (nothing reads it). |
| Blog | `@next/mdx`. Posts at `content/blog/<slug>.mdx` are served at `/blog/<slug>`. No blog index page yet. |
| URLs | Export without trailing slashes, so `/works.html`, `/privacy-policy.html`, `/success.html`, `/error.html`, `/404.html`, `/503.html` keep resolving on GitHub Pages. `/resources/blogs/what-is-ui-ux.html` becomes a meta-refresh redirect to `/blog/what-is-ui-ux`. Images keep their `/resources/images/...` URLs (copied to `public/resources/images/`) so the og:image and indexed image URLs survive. |
| SEO | Next `metadata` per page (title, description, canonical, OG, Twitter), with `metadataBase` `https://www.robertsonmorales.com`. `app/sitemap.ts` generates `sitemap.xml`. `robots.txt` and the Google verification file are carried over. |
| Analytics | GA4 `G-NCR2QZVRF6` and the Metricool tracker (hash `df229b453a95a1d2b7a757462c19a130`) via `next/script`. The `book_consultation` event with `cta_location` fires for every `data-cta` element, as today. |
| Testing | Vitest + Testing Library for logic and interactive components. `scripts/check-export.mjs` asserts the exported `out/` contains every required file and tag. Visual parity is checked manually against the live site. |

## Out of scope

- Blog index page, CMS, i18n, contact-form backend changes.
- New sections or copy changes.
- Image re-encoding (images are already `.webp` / `.png` as today; `next/image` runs with `unoptimized: true`, which static export requires).
