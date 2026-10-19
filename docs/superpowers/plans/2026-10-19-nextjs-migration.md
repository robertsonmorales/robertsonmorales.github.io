# Next.js Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the hand-written static site with a Next.js 16 + Tailwind v4 app, statically exported to GitHub Pages, with the same content and look, and with dark mode enabled.

**Architecture:** App Router with `output: 'export'`. Content (services, projects, skills, testimonials, certifications, socials) lives in typed `data/*.ts` modules that the section components render. The home page and `/works` share one `ProjectCard`. Theme is a `data-theme` attribute on `<html>`, set by an inline head script; Tailwind colors are CSS variables redefined per theme.

**Tech Stack:** Next.js 16, React 19, TypeScript strict, Tailwind CSS v4, `@next/mdx`, `lucide-react`, Vitest + Testing Library + jsdom.

**Spec:** `docs/superpowers/specs/2026-10-19-nextjs-migration-design.md`

## Global Constraints

- Node 24 (local is v24.15.0; CI uses `node-version: 24`). npm, no other package manager.
- `next.config.ts`: `output: 'export'`, `trailingSlash: false`, `images: { unoptimized: true }`, `pageExtensions: ['ts','tsx','md','mdx']`.
- Runtime dependencies allowed: `next`, `react`, `react-dom`, `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `lucide-react`. Dev: `typescript`, `@types/*`, `tailwindcss`, `@tailwindcss/postcss`, `@tailwindcss/typography`, `vitest`, `@vitejs/plugin-react`, `jsdom`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`, plus whatever `create-next-app` adds for ESLint. **No** jQuery, Bootstrap, ScrollReveal, feather-icons, Lottie, or analytics packages.
- Old markup is the source of truth for copy, links, alt text and order. Read it from the working tree (`index.html`, `works.html`, …) until Task 9 deletes it. Copy text verbatim.
- To translate styles, read the matching selectors in `resources/sass/{_custom,_overwrite,_breakpoint}.scss` and `style.scss` and express them with Tailwind utilities. Reach for an `@layer components` rule in `app/globals.css` only for effects utilities can't express (glitch keyframes, cursor glow, glassmorphism, preloader).
- Light tokens: bg `#fafafa`, surface `#ffffff`, card `#ffffff`, elevated `#ffffff`, fg `#0E0E11`, muted `#595959`, border `rgba(231,234,243,.7)`, primary `#01328D`, primary-fg (primary used as text) `#01328D`, secondary `#4e31cd`, light `#E3E1D2`, yellow `#DBFF40`, verified badge `#6440ff`.
- Dark tokens: bg `#131114`, surface `#1B191D`, card `#232126`, elevated `#2C2A30`, fg `#F4F3F1`, muted `#A5A3AA`, border `rgba(255,255,255,.09)`, primary-fg `#9D85FF`. Primary (button fill), secondary, light, yellow are unchanged.
- Radii: card `16px`, input `8px`, pill `200px`. Base font size `18px`, line-height `1.6`. Container max width `1140px`, `px-4` gutter.
- Body background images: `/resources/images/body-background.svg` (light), `/resources/images/body-background-dark.svg` (dark).
- Fonts via `next/font/local` from `app/fonts/`: Euclid Circular A Regular (400), Medium (500), SemiBold (600), exposed as `--font-sans`.
- localStorage key `theme`, values `'light' | 'dark'`. `theme-color` meta `#fafafa` light, `#131114` dark.
- Booking URL: `https://calendar.app.google/GmVbpk2VFME6SuT18`. Form endpoint: `https://submit-form.com/qEKUSDCs3`. GA id `G-NCR2QZVRF6`. Metricool hash `df229b453a95a1d2b7a757462c19a130`. Site URL `https://www.robertsonmorales.com`.
- Routes: the home page anchors are `/#services`, `/#works`, `/#about-me`, `/#testimonials`, `/#contact`; the form redirects to `/success` and `/error`.
- Work on branch `feat/nextjs` (create from `updates/seo-and-dark-mode`). Don't commit the user's uncommitted `.gitignore` / `claude.md` edits.

## Review Focus

1. **Dark-mode first paint.** A visitor with `theme=dark` stored, or with a dark OS and nothing stored, must never see a light flash, and React must not log a hydration mismatch for `<html>`. Pinned by the `THEME_INIT_SCRIPT` test in Task 2 and `suppressHydrationWarning` on `<html>`.
2. **Real-world emails.** `jane@studio.design` and `a@b.info` must be accepted; `a@b`, `a@@b.com` and `a b@c.com` must be rejected. Pinned in Task 7.
3. **Submission failures.** A non-2xx response or a network error goes to `/error`, never `/success`. The submit button stays disabled while a request is in flight, so double clicks send once. Pinned in Task 7.
4. **Old URLs.** `/works.html`, `/privacy-policy.html`, `/success.html`, `/error.html`, `/404.html`, `/503.html`, `/resources/blogs/what-is-ui-ux.html` and `/resources/images/social-share.jpg` all exist in `out/`. Pinned by `scripts/check-export.mjs` (Tasks 1, 8).
5. **Content without JS / reduced motion.** `<Reveal>` content is visible in server HTML and under `prefers-reduced-motion`; only after mount, with motion allowed, does it start hidden and animate in. The carousel doesn't auto-advance under reduced motion. Pinned in Tasks 4 and 6.

---

### Task 1: Scaffold, build, test harness, export check

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `vitest.config.ts`, `vitest.setup.ts`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `app/fonts/*.woff2`, `mdx-components.tsx`, `scripts/check-export.mjs`
- Create: `public/resources/images/**` (copy of `resources/images/**`), `public/robots.txt`, `public/google6b3c1547419faca7.html`, `public/favicon.ico` (from `resources/images/me/favicon.ico`)
- Modify: `.gitignore` (append `.next/`, `out/`, `next-env.d.ts`, `*.tsbuildinfo`; leave the user's existing edits in place)

**Interfaces:**
- Produces: `npm run dev | build | test | check` scripts. `check` = `node scripts/check-export.mjs`, run after `build`. Path alias `@/*` → repo root.

- [ ] **Step 1:** Scaffold into a temp dir with `npx create-next-app@latest` (TypeScript, Tailwind, ESLint, App Router, no `src/`, alias `@/*`), then move its files into the repo root. Don't overwrite `README.md`, `LICENSE` or `.gitignore`. Add `@next/mdx @mdx-js/loader @mdx-js/react @types/mdx lucide-react` and the dev test deps from Global Constraints.
- [ ] **Step 2:** Configure `next.config.ts` exactly as in Global Constraints, wrapped with `createMDX()`. Add `mdx-components.tsx` exporting `useMDXComponents(components)` that returns `components`.
- [ ] **Step 3:** Configure Vitest: jsdom environment, `@vitejs/plugin-react`, `@` alias, setup file importing `@testing-library/jest-dom/vitest`.
- [ ] **Step 4:** Copy the assets listed under Files. Copy the three Euclid woff2 files to `app/fonts/`. Append `Sitemap: https://www.robertsonmorales.com/sitemap.xml` to `public/robots.txt`.
- [ ] **Step 5:** Write `scripts/check-export.mjs`. It exits 1 and lists every missing item. Required files in `out/`: `index.html`, `works.html`, `privacy-policy.html`, `success.html`, `error.html`, `404.html`, `503.html`, `blog/what-is-ui-ux.html`, `resources/blogs/what-is-ui-ux.html`, `resources/images/social-share.jpg`, `sitemap.xml`, `robots.txt`, `google6b3c1547419faca7.html`. Required strings in `out/index.html`: `G-NCR2QZVRF6`, `rel="canonical"`, `data-theme`. Keep the list in one array so later tasks just make it pass.
- [ ] **Step 6:** Replace `app/page.tsx` with a placeholder `<main>`. Run `npm run build && npm run check`. Expected: build succeeds; check FAILS listing the pages not built yet (proves the checker works).
- [ ] **Step 7:** Run `npm test`. Expected: "No test files found" (exit 0 with `--passWithNoTests` in the script).
- [ ] **Step 8:** Commit: `chore: scaffold Next.js app with static export and test harness`.

### Task 2: Theme tokens, fonts, theme init and toggle

**Files:**
- Create: `lib/theme.ts`, `lib/theme.test.ts`, `components/ThemeToggle.tsx`, `components/ThemeToggle.test.tsx`
- Modify: `app/globals.css`, `app/layout.tsx`

**Interfaces:**
- Produces: `type Theme = 'light' | 'dark'`; `getInitialTheme(stored: string | null, prefersDark: boolean): Theme`; `applyTheme(theme: Theme): void` (sets `data-theme`, updates the `theme-color` meta); `THEME_INIT_SCRIPT: string`; `<ThemeToggle />` (client). Tailwind color utilities `bg-bg`, `bg-surface`, `bg-card`, `bg-elevated`, `text-fg`, `text-muted`, `border-border`, `bg-primary`, `text-primary-fg`, `bg-secondary`, `bg-light`, `bg-yellow`, `text-verified`, radius utilities `rounded-card`, `rounded-input`, `rounded-pill`, and a `dark:` variant bound to `[data-theme=dark]`.

- [ ] **Step 1: Failing tests** in `lib/theme.test.ts`:
  - `getInitialTheme('dark', false) === 'dark'`; `getInitialTheme('light', true) === 'light'`; `getInitialTheme(null, true) === 'dark'`; `getInitialTheme(null, false) === 'light'`; `getInitialTheme('garbage', true) === 'dark'`.
  - `THEME_INIT_SCRIPT`: with `localStorage.theme='dark'` and a `<meta name="theme-color" content="#fafafa">` in `document.head`, `new Function(THEME_INIT_SCRIPT)()` sets `document.documentElement.dataset.theme === 'dark'` and the meta content to `#131114`. Stub `window.matchMedia` in the test.
  - `components/ThemeToggle.test.tsx`: starting from `data-theme="light"`, a click sets `data-theme="dark"`, `localStorage.theme === 'dark'`, `aria-pressed="true"`, `aria-label="Switch to light theme"`; a second click reverts all four.
- [ ] **Step 2:** Run `npx vitest run lib/theme.test.ts components/ThemeToggle.test.tsx`. Expected: FAIL (modules missing).
- [ ] **Step 3:** Implement `lib/theme.ts`. `THEME_INIT_SCRIPT` is a self-contained IIFE string with the same rule as `getInitialTheme`, wrapped in try/catch so blocked storage falls back to the OS preference.
- [ ] **Step 4:** Implement `ThemeToggle` (client): Moon icon in light and Sun icon in dark (lucide), the aria attributes above, and a `matchMedia('(prefers-color-scheme: dark)')` change listener that applies the OS theme only while `localStorage.theme` is unset. Read the initial state from `document.documentElement.dataset.theme` in an effect, not during render.
- [ ] **Step 5:** In `app/globals.css`: `@import "tailwindcss"`, `@plugin "@tailwindcss/typography"`, `@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *))`. In `@theme`, map the color/radius tokens to `var(--…)`, with light values on `:root` and dark values on `html[data-theme="dark"]` (values from Global Constraints). Set the body background image per theme, `color-scheme`, base font size/line-height, `scroll-behavior: smooth` (disabled under reduced motion), and `scroll-margin-top` on `section[id]` for the fixed navbar.
- [ ] **Step 6:** In `app/layout.tsx`: `<html lang="en" suppressHydrationWarning>`; load the font with `next/font/local` and apply its variable; in `<head>`, `<meta name="theme-color" content="#fafafa" />` followed by `<script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />`. Export a `metadata` object with `metadataBase`, the home title/description/keywords/author/robots, the `google-site-verification` and `facebook-domain-verification` values, OG/Twitter (copied from `index.html` lines 7–61), and `icons: '/favicon.ico'`.
- [ ] **Step 7:** Run `npm test`. Expected: PASS. Run `npm run build`. Expected: success.
- [ ] **Step 8:** Commit: `feat: theme tokens, fonts and dark mode toggle`.

### Task 3: Site chrome: navbar, mobile menu, footer, preloader, analytics

**Files:**
- Create: `components/Navbar.tsx`, `components/MobileMenu.tsx`, `components/Footer.tsx`, `components/Preloader.tsx`, `components/Analytics.tsx`, `components/icons/social.tsx`, `data/site.ts`, `components/Navbar.test.tsx`, `components/Analytics.test.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `ThemeToggle` (Task 2).
- Produces: `data/site.ts` exporting `BOOKING_URL`, `SITE_URL`, `navItems: { id: string; label: string; mobileLabel?: string }[]` (`hero`/Home, `services`/Services, `works`/Works, `about-me`/Meet Rob (mobile "About Rob"), `testimonials`/Testimonials, `contact`/Contact), `socials: { name: 'facebook'|'instagram'|'linkedin'|'dribbble'; href: string; label: string }[]`, `contact: { email, emailHref, phone, phoneHref, location, locationHref }`. `SocialIcon({ name })`. Layout renders `<Preloader/> <Navbar/> {children} <Footer/> <Analytics/>`.

- [ ] **Step 1: Failing tests**
  - `Navbar.test.tsx`: the desktop links point to `/#services`, `/#works`, and so on (Home → `/`). Clicking "Open navigation" shows a dialog-role mobile menu and sets `document.body.style.overflow === 'hidden'`. Pressing Escape or clicking "Close navigation" hides it and restores overflow. Clicking a mobile link closes it. The scroll state: firing `scroll` with `window.scrollY = 10` adds the scrolled class or data attribute (assert on `data-scrolled="true"`).
  - `Analytics.test.tsx`: with `window.gtag = vi.fn()`, clicking an element inside `<a data-cta="hero">` calls `gtag('event','book_consultation',{ cta_location: 'hero' })`. With `gtag` undefined, the click doesn't throw.
- [ ] **Step 2:** Run the two test files. Expected: FAIL.
- [ ] **Step 3:** Implement `Navbar` (client): brand "Robertson" with a primary-colored ".", centered links, `ThemeToggle`, a "Book a Call" button (`data-cta="navbar"`, hidden below md), and a hamburger below lg. It is fixed to the top and sets `data-scrolled` when `scrollY > 0`. The active link is the last one clicked; Home is the default. Links are plain `<a href>`; no `navSelected`.
- [ ] **Step 4:** Implement `MobileMenu`: full-screen glassmorphism overlay, `role="dialog"`, `aria-modal`, Escape closes, focus moves to the close button on open, and a "Book a Consultation" CTA with `data-cta="mobile-menu"`.
- [ ] **Step 5:** Implement `Footer` from `index.html` lines 2758–2899 using `data/site.ts`. Privacy link → `/privacy-policy`; quick links → `/#…`; CTA `data-cta="footer"`; `© {new Date().getFullYear()} Robertson Morales. All rights reserved.`
- [ ] **Step 6:** Implement `Preloader` (client): the letter-by-letter "Robertson." markup from lines 150–154. After 2000 ms it fades and then unmounts on `transitionend`. Under reduced motion it unmounts immediately. Implement `Analytics`: GA `next/script` (`afterInteractive`) with the inline `gtag('config','G-NCR2QZVRF6')`, the Metricool loader (`lazyOnload`), and the document click listener for `[data-cta]`. Inline-SVG the four social icons, taking paths from `plugins/feather-icons/dist/icons/*.svg`.
- [ ] **Step 7:** Run `npm test` and `npm run build`. Expected: PASS / success.
- [ ] **Step 8:** Commit: `feat: navbar, mobile menu, footer, preloader and analytics`.

### Task 4: Home sections: hero, services, skills, about, plus Reveal

**Files:**
- Create: `components/Reveal.tsx`, `components/Reveal.test.tsx`, `components/sections/{Hero,Services,Skills,About,SectionHeading}.tsx`, `data/services.ts`, `data/skills.ts`, `data/certifications.ts`, `data/content.test.ts`
- Modify: `app/page.tsx`

**Interfaces:**
- Produces: `<Reveal from?: 'top'|'bottom'|'left'|'right' delay?: number (ms) distance?: string as?: React.ElementType>`. `services: { id: string; title: string; description: string; icon: 'layout'|'code'|'layers' }[]` (ids `ui-ux-design`, `website-revamps`, `responsive-web-design`; titles exactly `UI/UX Design`, `Website Development`, `SEO & Ongoing Care`). `skills: { name: string; icon: string }[]` (icon = public path). `certifications: { src; alt; title; width; height }[]`. `<SectionHeading eyebrow title center? />` for the `.text-section` + `.text-highlight` pair.

- [ ] **Step 1: Failing tests**
  - `Reveal.test.tsx`: in the initial render (before effects, using `renderToString`), the output has no `opacity-0` or hidden style. With `matchMedia` reporting reduced motion, after mount the child is visible and no transform is applied. With motion allowed and a stubbed `IntersectionObserver`, the child is hidden after mount and visible after the observer callback reports an intersection.
  - `data/content.test.ts`: every `skills[].icon` and `certifications[].src` file exists under `public/` (`fs.existsSync`). Service ids are unique. Skill names are unique.
- [ ] **Step 2:** Run them. Expected: FAIL.
- [ ] **Step 3:** Implement `Reveal` (client) to make the tests pass. It unobserves after the first reveal. Use the delays/origins from `resources/js/scroll.js` at each call site.
- [ ] **Step 4:** Extract the data from `index.html` (services 400–444, skills 1627–2063 in DOM order, certifications 2078–2109).
- [ ] **Step 5:** Implement `Hero` (client) from lines 339–395: the `#intro` h1 with three `.glitch-effect` words (staggered timers: a 7000 ms period, each word offset by `7000 / n * i`, a 600 ms active class; none under reduced motion), and the cursor glow driven by `--cursor-x/--cursor-y` on mousemove. Keep the `data-text` attribute if the glow CSS reads it. Then the subtitle and CTAs: "Book a Consultation" (`data-cta="hero"`) and "View Works →" linking `/#works`. Replace the Lottie with a CSS mouse-scroll indicator that is hidden once `scrollY > 0` and hidden below md. The hero `h1` keeps the fixed line-heights from `_breakpoint.scss`.
- [ ] **Step 6:** Implement `Services`, `Skills`, `About` (render the `<p>` copy, the certifications, and `/resources/images/me/me-primary.png` 462×475). Compose them in `app/page.tsx` with section ids `hero` (on the `<header>`), `services`, `skills`, `about-me`, inside `<main id="main-content" tabIndex={-1}>`, and add the skip link.
- [ ] **Step 7:** Run `npm test` and `npm run build`. Expected: PASS / success. Run `npm run dev` and compare against `index.html` at 375 / 768 / 1280px in both themes.
- [ ] **Step 8:** Commit: `feat: hero, services, skills and about sections`.

### Task 5: Projects data, ProjectCard, home Works section and /works page

**Files:**
- Create: `data/projects.ts`, `data/projects.test.ts`, `components/ProjectCard.tsx`, `components/sections/Works.tsx`, `app/works/page.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `Reveal`, `SectionHeading`.
- Produces: `type Project = { slug: string; title: string; verified: boolean; description: string; role: string; responsibility: string; duration: string; builtWith: { name: string; icon: string }[]; url?: string; actionLabel: string; image: { src: string; width: number; height: number }; featured: boolean }`. `projects: Project[]` in `works.html` order. `<ProjectCard project reversed />` (`reversed` alternates image side, as `flex-md-row` / `flex-md-row-reverse` do today). `<Works projects heading />`.

- [ ] **Step 1: Failing test** `data/projects.test.ts`: `projects.length === 17`. Slugs are unique. `projects.filter(p => p.featured).map(p => p.title)` equals, in order, the 14 titles rendered by `index.html` (extract that list into the test as a literal; it must start with `Chicago Muay Thai Kickboxing Club`, `SMC Events` and end with `ArtAuctions`). Every `image.src` and `builtWith[].icon` exists under `public/`. Every `url`, if set, starts with `https://`.
- [ ] **Step 2:** Run it. Expected: FAIL.
- [ ] **Step 3:** Extract the 17 projects from `works.html`, set `featured` from their presence in `index.html`, and copy the text verbatim. Where an index card's copy differs from its `works.html` copy, use the `index.html` copy and note the slug in the commit message. Prefer the `.webp` thumbnail when one exists beside the `.png`.
- [ ] **Step 4:** Implement `ProjectCard`: a title with the verified badge (lucide `BadgeCheck`, fill `--color-verified`, `title="Client Verified"`), description, details block, built-with icon list, and an action button (`ExternalLink` icon, `aria-label="View {title} live site"`, `target="_blank" rel="noopener"`). Render the action only when `url` is set. The image link wraps a `next/image` with `alt={title}`. Use `priority` on the first card only.
- [ ] **Step 5:** Home renders `<Works projects={featured} />` with id `works`. `app/works/page.tsx` renders all projects with `metadata` copied from `works.html` `<head>` (canonical `/works`).
- [ ] **Step 6:** Run `npm test` and `npm run build`. Expected: PASS / success, and `out/works.html` exists.
- [ ] **Step 7:** Commit: `feat: data-driven projects shared by home and /works`.

### Task 6: Testimonials carousel

**Files:**
- Create: `data/testimonials.ts`, `components/sections/Testimonials.tsx`, `components/sections/Testimonials.test.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Produces: `testimonials: { quoteBefore?: string; highlight: string; quoteAfter?: string; author: string; company: string; href: string; label: string }[]` (the highlighted span rendered with the `.testimonial--highlight` styling). `<Testimonials items intervalMs={5000} />`.

- [ ] **Step 1: Failing tests** (fake timers): the first item is visible and the others are `aria-hidden`. "Next testimonial" shows item 2; "Previous testimonial" from item 1 wraps to the last item. After `intervalMs` it advances. While hovered or focused it does not advance. Under reduced motion it never auto-advances. The region has `aria-roledescription="carousel"` and a live region that is `polite` only while paused.
- [ ] **Step 2:** Run it. Expected: FAIL.
- [ ] **Step 3:** Extract every testimonial from `index.html` lines 2149–2559 verbatim (emoji included). Implement the component; the quote icon is `/resources/images/quote.svg` on the primary circle.
- [ ] **Step 4:** Run `npm test`. Expected: PASS.
- [ ] **Step 5:** Commit: `feat: testimonials carousel`.

### Task 7: Contact form

**Files:**
- Create: `lib/contact.ts`, `lib/contact.test.ts`, `components/sections/Contact.tsx`, `components/sections/Contact.test.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `services` (Task 4); the checkbox options are `services.map(s => s.title)`.
- Produces: `type ContactValues = { firstName: string; lastName: string; email: string; phone: string; services: string[]; message: string; howFound: string }`; `type ContactErrors = Partial<Record<keyof ContactValues, string>>`; `sanitizePhone(input: string): string`; `validateContact(v: ContactValues): ContactErrors`; `buildPayload(v: ContactValues): Record<string, string>`; `submitContact(v: ContactValues, fetchImpl = fetch): Promise<boolean>` (true only on `response.ok`, false on non-2xx or a thrown error).

- [ ] **Step 1: Failing tests** in `lib/contact.test.ts`:
  - `sanitizePhone('+63 (965) 651-5081') === '639656515081'`; `sanitizePhone('1'.repeat(20)).length === 14`; `sanitizePhone('abc') === ''`.
  - `validateContact` on all-empty values returns errors for all seven keys, with messages `The first name is a required field.`, `The last name is a required field.`, `The email address is a required field.`, `The phone number is a required field.`, `Please select at least one.`, `The message is a required field.`, `The how did you find me is a required field.` Whitespace-only counts as empty.
  - Email: `jane@studio.design` and `a@b.info` valid; `a@b`, `a@@b.com`, `a b@c.com` give `Invalid email address.`
  - `buildPayload` returns exactly the keys `FirstName, LastName, EmailAddress, MobileNo, Services, Message, HowDidYouFindMe`, with `Services` joined by `', '` and values trimmed.
  - `submitContact`: resolves `true` for `{ ok: true }`, `false` for `{ ok: false, status: 500 }`, and `false` when fetch rejects. It POSTs to `https://submit-form.com/qEKUSDCs3` with JSON content-type and accept headers.
- [ ] **Step 2: Failing tests** in `Contact.test.tsx` (mock `submitContact` and `window.location.assign`): submitting empty shows all seven messages and calls nothing. A valid fill plus submit calls `submitContact` once even on a double click, disables the button while pending, then calls `location.assign('/success')`. A false result → `location.assign('/error')`. Each input's `aria-invalid` and `aria-describedby` point at its error element.
- [ ] **Step 3:** Run both files. Expected: FAIL.
- [ ] **Step 4:** Implement `lib/contact.ts`. Email regex: `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/`. Then implement `Contact` (client) from `index.html` lines 2562–2755: the left image panel, the "Send a Message" heading, the paired rows, the fieldset with a legend for the services, and both textareas (max 500 characters). Fix the "How did you find me?" label so its `for` points at `how-did-you-find-me`.
- [ ] **Step 5:** Run `npm test`. Expected: PASS.
- [ ] **Step 6:** Commit: `feat: contact form with validation and failure handling`.

### Task 8: Secondary pages, blog, sitemap, legacy redirect

**Files:**
- Create: `app/privacy-policy/page.mdx`, `app/success/page.tsx`, `app/error/page.tsx`, `app/not-found.tsx` (exports `404.html`), `app/503/page.tsx`, `app/blog/[slug]/page.tsx`, `content/blog/what-is-ui-ux.mdx`, `app/sitemap.ts`, `public/resources/blogs/what-is-ui-ux.html`, `lib/posts.ts`, `lib/posts.test.ts`

Note: only the *file* `app/error.tsx` is reserved by Next, not a *folder* named `error`, so `app/error/page.tsx` is fine. Don't create `app/error.tsx`.

**Interfaces:**
- Produces: `getPostSlugs(): string[]` (reads `content/blog/*.mdx`, sorted). Each post MDX exports `metadata: { title: string; description: string; date: string }`.

- [ ] **Step 1: Failing test** `lib/posts.test.ts`: `getPostSlugs()` equals `['what-is-ui-ux']`.
- [ ] **Step 2:** Implement `getPostSlugs`. Implement `app/blog/[slug]/page.tsx`: `generateStaticParams` from `getPostSlugs()`, `dynamicParams = false`, a dynamic `import(\`@/content/blog/${slug}.mdx\`)`, and `generateMetadata` from the post's `metadata` (canonical `/blog/<slug>`). Render inside `prose dark:prose-invert`.
- [ ] **Step 3:** Convert `resources/blogs/what-is-ui-ux.html` and `privacy-policy.html` body copy to MDX verbatim. The blog image moves to `public/resources/images/blogs/ui-ux.jpg` (already copied in Task 1). Each page exports `metadata` copied from the old `<head>`.
- [ ] **Step 4:** Port `success.html`, `error.html`, `404.html` and `503.html` to pages using their existing copy and links, each with `robots: { index: false }`.
- [ ] **Step 5:** `public/resources/blogs/what-is-ui-ux.html`: a minimal HTML page with `<meta http-equiv="refresh" content="0; url=/blog/what-is-ui-ux">`, `<link rel="canonical" href="https://www.robertsonmorales.com/blog/what-is-ui-ux">` and a fallback link.
- [ ] **Step 6:** `app/sitemap.ts` (`export const dynamic = 'force-static'`) lists `/`, `/works`, `/privacy-policy`, and `/blog/<slug>` for each post, absolute against `SITE_URL`.
- [ ] **Step 7:** Run `npm test && npm run build && npm run check`. Expected: all pass. `check` now reports nothing missing.
- [ ] **Step 8:** Commit: `feat: secondary pages, MDX blog, sitemap and legacy blog redirect`.

### Task 9: Deploy workflow, remove the static site, docs

**Files:**
- Create: `.github/workflows/deploy.yml`
- Delete: `index.html`, `works.html`, `privacy-policy.html`, `success.html`, `error.html`, `404.html`, `503.html`, `google6b3c1547419faca7.html`, `sitemap.xml`, `robots.txt` (root copies), `plugins/`, `resources/` (everything now lives under `public/resources/images` or `app/fonts`; confirm no file in `public/` or `app/` references a deleted path first)
- Modify: `CLAUDE.md`, `README.md`

- [ ] **Step 1:** `deploy.yml`: on push to `master` plus `workflow_dispatch`; permissions `contents: read, pages: write, id-token: write`; jobs `build` (checkout, setup-node 24 with npm cache, `npm ci`, `npm test`, `npm run build`, `npm run check`, `actions/upload-pages-artifact` with `path: out`) and `deploy` (`actions/deploy-pages`). Concurrency group `pages`.
- [ ] **Step 2:** Run `grep -rn "resources/\(js\|sass\|fonts\)\|plugins/" app components public lib data content`. Expected: no matches. Then delete the files listed above.
- [ ] **Step 3:** Run `npm ci && npm test && npm run build && npm run check`. Expected: all pass from a clean install.
- [ ] **Step 4:** Rewrite `CLAUDE.md` for the new stack (commands, where content lives, the theme token rule, static-export constraints, the `/error` page note). Remove the SCSS/jQuery guidance. Update the README run instructions.
- [ ] **Step 5:** Parity pass: `npx serve out` and compare every page with the live site at 375 / 768 / 1280px, light and dark. Also check keyboard navigation of the navbar, mobile menu, carousel and form. Fix and recommit any drift.
- [ ] **Step 6:** Commit: `chore: deploy via GitHub Actions and remove static site`.
- [ ] **Step 7 (owner, at merge time):** In GitHub → Settings → Pages, set Source to **GitHub Actions** only when merging to `master`, and confirm the custom domain is still set. Switching earlier takes the live site down.
