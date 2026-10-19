# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Robertson Morales' personal portfolio, a static site served from GitHub Pages at robertsonmorales.com. It is hand-written HTML with Bootstrap 4.5.3, jQuery, and SCSS. There is no `package.json`, bundler, test suite, or linter. The only build step is compiling SCSS.

## Commands

```sh
# Compile styles (sass isn't on PATH, so use npx)
npx sass --style=expanded resources/sass/style.scss resources/sass/style.css
```

To preview, open the HTML files through any static file server. Pages use root-relative URLs such as `/success.html`.

After a recompile, `style.css` diffs contain noise. Lost vendor prefixes and Bootstrap colors rewritten from `rgb(45.7, …)` to percentages are both harmless. To review the real change, filter out lines matching `rgba?\(` and `-(webkit|moz|ms|o)-`. Commit the compiled `style.css` and `style.css.map` together with the `.scss` change, because the site serves the compiled file.

## Pages

- `index.html` is the main single-page site: hero, `#services`, `#works`, `#skills`, `#about-me`, `#testimonials`, `#contact`. Nav links call `navSelected(id)` in `script.js`, which expects a matching `#nav-<id>` element.
- `works.html` is the full project gallery and duplicates the project-card markup from `index.html`. A change to a card usually has to be made in both files.
- `success.html` / `error.html` are redirect targets of the contact form. `404.html` / `503.html` are error pages. `privacy-policy.html` and `resources/blogs/*.html` are standalone pages.
- SEO metadata (title, OG/Twitter tags, canonical) is maintained by hand in each page's `<head>`. `sitemap.xml` and `robots.txt` are also edited by hand.

## Styling

- `resources/sass/style.scss` is the entry point. It imports `_variables`, `_mixins`, **all of Bootstrap's SCSS** (`plugins/bootstrap/scss/bootstrap`), then `_overwrite`, `_custom`, `_breakpoint`, and `blogs/_layout`. Pages also link `plugins/bootstrap/scss/bootstrap.css` separately, before `style.css`.
- **Add new styles only to `style.scss`**, after the last `@import`, in `/* SECTION */ … /* ENDS HERE */` blocks. Don't add new rules to the partials, and never hand-edit the compiled `style.css`.
- `_breakpoint.scss` sets fixed hero `h1` line-heights. An `h1` that is visually styled as a smaller heading needs that line-height overridden.

## Dark mode

- An inline script in `<head>` sets `data-theme="light|dark"` on `<html>` before CSS loads. It reads localStorage key `theme` and falls back to `prefers-color-scheme`. `resources/js/script.js` owns the `#themeToggle` button and `applyTheme()`, and keeps `<meta name="theme-color">` in sync.
- All dark styles live in one `html[data-theme="dark"] { … }` block near the end of `style.scss`, using `--dm-*` custom properties. The light theme is compiled statically from SCSS variables, so every new component needs a matching override in that block. Elements that get utility classes through `@extend` (e.g. `.bg-white`, `.text-muted`) don't carry the literal class, so they must be named explicitly in the dark block.
- `script.js` currently forces `const mode = 'light'` on load, which overrides the head script's choice. The line that reads the stored theme is commented out above it.
- Only `index.html` has the head script and toggle. `works.html`, `success.html`, `error.html`, `404.html`, and `503.html` always render light.

## JavaScript

All files in `resources/js/` are plain scripts loaded with `defer` at the end of `<body>`. They are not modules.

- `script.js`: Feather icon replacement, nav and mobile menu, navbar scroll state, hero `#intro` cursor effect, `.glitch-effect` timers, theme toggle, `#preloader` removal after 2s, and a GA4 `book_consultation` event for any element with `data-cta="<location>"`.
- `scroll.js`: ScrollReveal entrance animations keyed by selector. The whole file is skipped under `prefers-reduced-motion`.
- `contact.js` (index only): builds the services checkboxes from each `.card-title` in the services section, so renaming a service card changes the form options. It validates input with jQuery and POSTs JSON to the form's `action` (submit-form.com), then redirects to `/success.html` or `/error.html`.
- Third-party libraries are vendored in `plugins/` (bootstrap, jquery, feather-icons, scrollreveal, lottiefiles); there is no CDN or npm install. Google Analytics (`G-NCR2QZVRF6`) and the Metricool tracker are inline in the HTML.

## Assets

Project thumbnails live in `resources/images/projects/<project>/`, with `.webp` preferred and a `.png` alongside. Skill icons are `resources/images/svg/skills/*.svg`. `robots.txt` disallows `/resources/` except for project images.
