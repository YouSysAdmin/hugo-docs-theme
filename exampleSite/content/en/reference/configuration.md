---
title: Configuration
description: Every site parameter the theme reads.
weight: 10
---

All of these go under `[params]`. None is required.

## Identity

| Parameter       | Default               | Description                                                  |
| --------------- | --------------------- | ------------------------------------------------------------ |
| `brand`         | site title            | Wordmark in the top bar and the footer                       |
| `description`   | empty                 | Meta description for pages without their own                 |
| `author`        | site title            | Name in the footer copyright line                            |
| `copyright`     | `(c) <year> <author>` | Footer line, markdown                                        |
| `footer_credit` | `true`                | The "built with" line in the footer. `false` hides it        |
| `logo`          | theme mark            | Path of the top bar logo                                     |
| `favicon`       | theme mark            | Path of a single favicon, replacing the four the theme emits |
| `themeColor`    | `#0b0d10`             | `theme-color` meta, the browser chrome on mobile             |
| `images`        | empty                 | List, the first is the `og:image`                            |

## Navigation

| Parameter             | Default | Description                                                       |
| --------------------- | ------- | ----------------------------------------------------------------- |
| `sidebarCollapsible`  | `true`  | Sections with pages can be collapsed                              |
| `sidebarCollapsed`    | `false` | Sections start collapsed, except the one holding the current page |
| `sidebarIndexLink`    | `false` | A section with pages lists its own `_index` as the first entry    |
| `externalLinksNewTab` | `false` | Absolute links in the prose open in a new tab                     |

## Repository

| Parameter             | Default       | Description                                            |
| --------------------- | ------------- | ------------------------------------------------------ |
| `repoURL`             | empty         | Repository, for the footer's Releases and Issues links |
| `show_footer_project` | `false`       | Show that footer column                                |
| `edit_base`           | empty         | Prefix joined with the file path for "Edit this page"  |
| `cta_url`             | empty         | Button in the top bar                                  |
| `cta_label`           | `Get started` | Its label                                              |
| `cta_icon`            | none          | Its icon                                               |

`edit_base` is joined with the path **relative to the content directory**,
so for a site with `contentDir = "content/en"` it ends in `content/en/`.

## Landing page

| Parameter                    | Default          | Description                                                                  |
| ---------------------------- | ---------------- | ---------------------------------------------------------------------------- |
| `landing`                    | `false`          | Home page is the hero                                                        |
| `tagline`                    | none             | First line of the hero title                                                 |
| `tagline_sub`                | site title       | Second line                                                                  |
| `lead`                       | `description`    | Paragraph under the title                                                    |
| `get_started_url`            | first section    | Target of the primary button                                                 |
| `trust_badges`               | none             | Short labels under the buttons                                               |
| `hero_terminal_title`        | `~/<site title>` | Title of the frame beside the hero, image or terminal                        |
| `hero_terminal_image`        | none             | Image beside the hero, 1320x680 recommended. Wins over `hero_terminal_lines` |
| `hero_terminal_image_alt`    | empty            | Its alt text                                                                 |
| `hero_terminal_image_anchor` | `Center`         | Which part a crop keeps                                                      |
| `hero_terminal_lines`        | none             | Terminal lines, HTML. Shown when there is no `hero_terminal_image`           |
| `features_title`             | "What is inside" | Heading of the feature cards                                                 |
| `features`                   | none             | List of `title` and `description`                                            |

See [Landing page](/customization/landing-page).

## Hugo settings the site must state

Hugo does not merge these from a theme.

| Setting                           | Value                   | Why                                      |
| --------------------------------- | ----------------------- | ---------------------------------------- |
| `outputs.home`                    | `["HTML", "JSON"]`      | The search index. Required for search    |
| `markup.tableOfContents.endLevel` | `4`                     | TOC depth, Hugo's default is 3           |
| `markup.highlight.style`          | a dark style            | Code blocks stay dark on the light theme |
| `markup.highlight.noClasses`      | `true` (Hugo's default) | The theme ships no Chroma stylesheet     |
