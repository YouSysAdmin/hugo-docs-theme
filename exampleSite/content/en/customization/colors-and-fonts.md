---
title: Colours and fonts
description: Every colour, size and font is a CSS custom property, and custom.css redefines them.
weight: 10
---

## custom.css

A site's `assets/css/custom.css` is appended to the theme's stylesheet,
minified and fingerprinted with it. No configuration - the file existing is
enough.

```text
assets/
  css/
    custom.css
```

## The accent

The theme's accent is **ink** - near-white on the dark theme, near-black on
the light one - so the only hues on a page are the four status colours
(`--ok`, `--warn`, `--crit`, `--info`) the callouts use. A brand colour is a
change to the `--brand-*` ramp.

{{< callout type="warning" title="The ramp is read at different steps in each theme" >}}
The dark theme reads `--brand-300`, `400` and `500` (active sidebar and TOC
entries, the TOC rail, inline code, eyebrows). The light theme reads `700`
and `800` for links and code, and goes on reading `300`-`500` for everything
else. So a ramp must be stated **twice**, with light-on-dark steps in the
first block and dark-on-light steps in the second.
{{< /callout >}}

A blue accent:

```css
/* assets/css/custom.css */
:root {
  --brand-300: #93c5fd;
  --brand-400: #60a5fa;
  --brand-500: #3b82f6;
  --glow-brand:
    0 0 0 3px rgba(96, 165, 250, 0.3), 0 0 20px rgba(96, 165, 250, 0.16);
}

:root[data-theme="light"] {
  --brand-300: #1d4ed8;
  --brand-400: #1e40af;
  --brand-500: #2563eb;
  --brand-700: #1d4ed8;
  --brand-800: #1e3a8a;
  --glow-brand:
    0 0 0 3px rgba(29, 78, 216, 0.2), 0 0 18px rgba(29, 78, 216, 0.12);
}
```

`--glow-brand` is the focus ring. It is the brand colour at two
opacities, so it cannot follow the ramp through `var()` and has to be
restated.

Links in the prose are told apart by an underline, not by colour. To colour
them:

```css
.cs-prose a {
  color: var(--brand-400);
}
```

## Surfaces and text

| Token                                | Role                                   |
| ------------------------------------ | -------------------------------------- |
| `--bg-0` .. `--bg-4`                 | Page background up to raised surfaces  |
| `--line-1` .. `--line-3`             | Borders, weakest to strongest          |
| `--fg-0` .. `--fg-4`                 | Text, strongest to faintest            |
| `--ok`, `--warn`, `--crit`, `--info` | Status colours, each with a `-bg` pair |
| `--side-w`, `--toc-w`, `--nav-h`     | Sidebar, TOC and top bar sizes         |
| `--page-max`                         | Widest the layout grows                |

Each is defined in the dark block (`:root`) and again in the light one
(`:root[data-theme="light"]`), in `assets/css/tokens.css`.

## Fonts

The theme self-hosts three faces, Latin subset, so no page asks a font CDN
for anything. Other scripts fall back to the system stack.

| Token | Face | Used for |
| --- | --- | --- |
| `--font-sans` | Inter Tight | Body text and headings |
| `--font-code` | JetBrains Mono | Code blocks, inline code, the hero terminal |
| `--font-mono` | Space Mono | Labels: section eyebrows, sidebar headings, badges, keys |

ASCII diagrams use the system monospace stack instead, because the Latin
subsets carry no box-drawing characters.

To use other faces, put the files in `static/fonts/` and restate the
stacks:

```css
@font-face {
  font-family: "Source Serif";
  font-weight: 400;
  font-display: swap;
  src: url("../fonts/source-serif-400.woff2") format("woff2");
}

:root {
  --font-sans: "Source Serif", Georgia, serif;
}
```

The `url()` is relative to the bundled `/css/app.css`, hence `../fonts/`.

## Code blocks

Code is highlighted by Hugo with inline styles, so the style is a site
setting:

```toml
[markup.highlight]
style = "dracula"
```

The theme keeps code blocks dark on the light theme too, because an inline
style cannot follow a theme toggle. Pick a dark style.
