# AGENTS.md

Working guide for AI coding agents. This repo is the **www.rpow2.xyz** landing page:
a static site for the **community ecosystem** around **$RPOW**. Tech stack is
**React 18 + Vite 5**, built into a pure static `dist/`, and deployed to GitHub Pages
via GitHub Actions (custom domain `www.rpow2.xyz`).

## Quick start

```bash
npm ci            # install dependencies (preferred, locked versions)
npm run dev       # local development with HMR
npm run build     # produce dist/
npm run preview   # preview the build output locally
```

After making changes, run `npm run build` at least once to confirm it passes. This repo
currently has **no test framework and no lint config** — do not introduce them unless the
user explicitly asks.

## Project structure

```
index.html            # Vite entry: SEO/OG meta, fonts, mounts #root
vite.config.js        # @vitejs/plugin-react, base defaults to '/', output dist/
public/               # copied as-is into dist root
  favicon.svg
  CNAME               # GitHub Pages custom domain rpow2.xyz (apex; do not delete)
  robots.txt
  sitemap.xml
src/
  main.jsx            # entry: <I18nProvider><App/></I18nProvider> + import styles.css
  App.jsx             # page structure (header / about / tools / footer)
  i18n.jsx            # lightweight zero-dependency i18n (zh/en/ja/ko): dict + I18nProvider + useI18n
  components/
    LangSwitcher.jsx  # language switcher dropdown
  styles.css          # terminal aesthetic (IBM Plex Mono, dark, mint green, CRT effects)
.github/workflows/
  deploy.yml          # pushing to main auto-builds and publishes to Pages
```

## Key conventions

### i18n (most important)
- All visible copy goes through the `dict` in `src/i18n.jsx`. **All four languages
  (zh/en/ja/ko) must keep the same key in sync.**
- Use `t("key")` for plain text. Copy that contains links / `<strong>` is written as
  HTML and rendered by the `<Html>` component in `App.jsx` via `dangerouslySetInnerHTML`.
  All copy is maintained by and trusted within this repo, but still **only include your own
  trusted content** — never put external/user input into the HTML copy.
- Adding new visible text: first add the key to the `dict` for all four languages, then
  reference it with `t("key")` in `App.jsx`.
- Language selection priority: `localStorage['rpow_lang']` → `navigator.language` →
  default `en`.

### Adding an ecosystem tool card
Duplicate a `.tool-card` inside `.tool-grid` in `App.jsx`:
- Live: `<a className="tool-card live" href="..." target="_blank" rel="noopener">` +
  `<span className="badge ok">` (`badge.live`).
- Coming soon: `<div className="tool-card soon">` + `<span className="badge soon">`
  (`badge.soon`).
- Tool cards use a single-column layout; feature highlights use `<ul className="tool-feats">`.
- **Remember to update the tool count** (the `.count` inside `.panel-title`).
- All external links must include `target="_blank" rel="noopener"`.

### Styling
- Only edit `src/styles.css` for style changes, keeping the terminal/CRT aesthetic
  consistent with `rpow2.com` (IBM Plex Mono, dark background, mint green, `+` panel
  corners). Do not introduce a CSS framework or CSS-in-JS.

## Deployment notes

- Pushing to `main` triggers `.github/workflows/deploy.yml`: `npm ci && npm run build`,
  publishing `dist/`.
- `base` uses the default `/` (the custom domain serves from the root path). Do not change
  the `base` in `vite.config.js`.
- `public/CNAME` (`rpow2.xyz`) is copied to `dist/CNAME`. **Do not delete or modify it**,
  or the custom domain will break. The apex `rpow2.xyz` is canonical; `www.rpow2.xyz`
  redirects to it (handled by GitHub Pages once DNS for both is configured).
- GitHub Pages **does not support custom response headers** — do not try to add `_headers`
  or similar security/cache configs (they have no effect).

## Public positioning (must follow)

The page must stay positioned as: **a community project, unofficial, with no affiliation,
endorsement, or operational relationship with the operators of rpow2.com.** The token symbol
is **$RPOW**, and the mainnet is at **rpow2.com**. When editing copy, **never** present this
site as the rpow2.com official site or an affiliate. This site has no runtime coupling with
the solving/coordination system; it relates to tools like `pool.rpow2.xyz` only via page links.
