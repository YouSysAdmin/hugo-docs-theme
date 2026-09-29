---
title: Overriding templates
description: Hooks for head and body, and replacing any template from the site.
weight: 50
---

## Hooks

Two empty partials exist to be replaced:

| Partial                                | Rendered               |
| -------------------------------------- | ---------------------- |
| `layouts/partials/hooks/head-end.html` | At the end of `<head>` |
| `layouts/partials/hooks/body-end.html` | Before `</body>`       |

```go-html-template
<!-- layouts/partials/hooks/head-end.html -->
<script defer data-domain="docs.example.org" src="/js/analytics.js"></script>
```

## Any template

Hugo looks in the site's `layouts/` before the theme's, so copying a file
from the theme to the same path in the site replaces it:

| Template                                       | What it draws                           |
| ---------------------------------------------- | --------------------------------------- |
| `_default/baseof.html`                         | The page skeleton                       |
| `_default/single.html`                         | A page                                  |
| `_default/list.html`                           | A section, with its card grid           |
| `_default/home.html`                           | The home page                           |
| `_default/reference.html`                      | [An API reference page](/reference/api) |
| `partials/nav.html`                            | The top bar and the mobile menu         |
| `partials/sidebar.html`                        | The sidebar                             |
| `partials/toc.html`                            | The table of contents                   |
| `partials/footer.html`                         | The footer                              |
| `partials/head.html`                           | Everything in `<head>`                  |
| `_default/_markup/render-link.html`            | Links in the prose                      |
| `_default/_markup/render-table.html`           | Tables in the prose                     |
| `_default/_markup/render-codeblock-ascii.html` | ASCII diagrams                          |

{{< callout type="note" >}}
A copied template no longer changes when the theme does. Prefer
`custom.css` and the hooks where they reach.
{{< /callout >}}

## Icons

Icons are SVG files under `assets/icons`, inlined by name. A site adds one
by putting a file in its own `assets/icons/`, and it is then available to
section front matter, menu entries, callouts and the `icon` shortcode. Draw
it on a 24 grid with a 2 stroke in `currentColor`, like the rest (Feather
geometry), or it reads as a different weight beside them.
