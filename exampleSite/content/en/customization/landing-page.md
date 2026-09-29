---
title: Landing page
description: Turn the home page into a hero with features and a section grid.
weight: 30
---

By default the home page is the documentation index: `content/_index.md`
rendered like any page, with the sidebar and the TOC. With `landing` it is
a one-column page instead - the demo site's home page is one.

```toml
[params]
landing = true

tagline = "Documentation,"          # first line, optional
tagline_sub = "without the noise."  # second line, defaults to the site title
lead = "One or two sentences."      # defaults to params.description
get_started_url = "/getting-started/"  # defaults to the first section
features_title = "What you get"
trust_badges = ["# MIT", "# no CDN"]

# The panel beside the hero: an image OR a terminal, in the same window
# frame. Leave both out and the hero is text only.
hero_terminal_title = "~/my-project"   # the frame's title in both cases

# An image, 1320x680 recommended. hero_terminal_image wins over hero_terminal_lines.
hero_terminal_image = "images/hero.png"
hero_terminal_image_alt = "The dashboard"
hero_terminal_image_anchor = "Top"          # which part a crop keeps

# Or a terminal. Lines are HTML, coloured with the cs-accent, cs-ok and
# cs-dim classes.
hero_terminal_lines = [
  '<span class="cs-prefix cs-accent">$</span> my-project init',
  '<span class="cs-dim">done</span>',
]

[[params.features]]
title = "Fast"
description = "Why it is fast."
[[params.features]]
title = "Small"
description = "Why it is small."
```

## The hero image

The frame is **660x340** on a wide screen, so a **1320x680** image is sharp
on a high-density display - a ratio of about 1.94 to 1.

| Where the file is            | What happens                                                                                                                                                                |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `assets/`, PNG / JPEG / WebP | Cropped to exactly 1320x680, plus a 660x340 copy for small screens, keeping the part `hero_terminal_image_anchor` names (`Center`, `Top`, `Bottom`, `Left`, `Right`, `TopLeft`, ...) |
| `assets/`, SVG               | Used as it is                                                                                                                                                               |
| `static/`, or a URL          | Used as it is                                                                                                                                                               |

In the last two cases the image is fitted to the frame by CSS
(`object-fit: cover`), so any size works and the hero does not move - but
only a file of the recommended shape is shown whole.

## The terminal

On a wide screen 79 characters fit on a line before it wraps, and 11 lines
before the window grows. The text terminal and the image frame are the
same size, so switching one for the other does not move the page.

Below the features comes a card for every top-level section, which is also
the list the footer is built from.

A common split is a landing page on the public site and a plain index where
the docs ship inside a product. Hugo environments do that with one
directory per build:

```text
config/
  _default/hugo.toml     landing = false
  public/hugo.toml       landing = true
```

```bash
hugo -e public
```
