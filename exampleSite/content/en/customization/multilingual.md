---
title: Multilingual
description: Languages, the switcher, fallbacks and stale translation notices.
weight: 40
---

The demo site has two languages. Switch with the control in the top bar -
the Ukrainian side has translated only a few pages on purpose.

## Setup

```toml
defaultContentLanguage = "en"

[languages.en]
label = "English"
weight = 1
contentDir = "content/en"

[languages.uk]
label = "Українська"
weight = 2
contentDir = "content/uk"
```

The switcher appears as soon as there is more than one language. It links
to the current page's translation, or to that language's home page when
there is none.

## Untranslated pages

The sidebar, the mobile menu and the section card grids are built from the
**first** language's tree and resolved to the current one. A page with no
translation still appears, linked to the original and tagged with its
language code, so every page is reachable in every language.

## Stale translations

A translated page whose original has a later `lastmod` shows a warning
with a link to the original. Set `lastmod` in the front matter, or turn on
`enableGitInfo` to take it from the last commit.

## Interface strings

Everything the theme writes itself - "On this page", "Search", the callout
titles - comes from `i18n/<lang>.toml`. The theme ships `en` and `uk`. For
another language, copy `i18n/en.toml` from the theme into the site's
`i18n/` under the new language code and translate the values. A site file
also overrides single keys of a shipped one.
