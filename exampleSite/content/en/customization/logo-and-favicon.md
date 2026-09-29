---
title: Logo and favicon
description: Replace the mark by file or by setting.
weight: 20
---

## By file

The theme's mark lives in `static/assets/logo/`. A site file at the same
path wins, so replacing these five is enough:

| File                               | Used for                      |
| ---------------------------------- | ----------------------------- |
| `logo.svg`                         | Top bar, next to the wordmark |
| `favicon.svg`                      | Browser tab, modern browsers  |
| `favicon-32.png`, `favicon-16.png` | Browser tab, fallback         |
| `apple-touch-icon.png`             | Home screen icon, 180x180     |

## By setting

```toml
[params]
logo = "images/my-logo.svg"
favicon = "images/my-favicon.svg"
brand = "My Project"
themeColor = "#0b0d10"
```

`favicon` replaces all four favicon links with one. `brand` is the wordmark
beside the logo and in the footer, and defaults to the site title.

{{< callout type="tip" title="The logo does not follow the theme toggle" >}}
It is an `<img>`, so the SVG is its own document: a `prefers-color-scheme`
query inside it follows the operating system, not the site's toggle. Pick
colours that read on both a dark and a white ground - a contrast of 3:1
against each.
{{< /callout >}}
