---
title: Configuration
description: The settings a site usually states, and where the rest are documented.
weight: 20
---

A minimal `hugo.toml`:

```toml
baseURL = "https://docs.example.org/"
title = "My Project"
theme = "hugo-docs-theme"

# The search index. Hugo takes no `outputs` from a theme, so this line
# has to be in the site.
[outputs]
home = ["HTML", "JSON"]

[markup]
[markup.tableOfContents]
endLevel = 4
[markup.highlight]
style = "github-dark"

[params]
description = "What my project does"
repoURL = "https://github.com/me/my-project"
```

Everything else has a default. The full list of parameters is in the
[configuration reference](/reference/configuration), and the demo site's
[`hugo.toml`](https://github.com/YouSysAdmin/hugo-docs-theme/blob/master/exampleSite/hugo.toml)
states every one of them with a comment.

## Serving from a subpath

`baseURL` can carry a path - `https://me.github.io/my-project/` on GitHub
Pages, or `/docs/` for docs served by an application. Every link and asset
the theme emits goes through `relURL`, and root-relative links in the prose
(`/getting-started/installation`) are resolved against `baseURL` rather than
the host, so nothing else has to change.

## Top bar

The top bar carries `menu.main`, and an entry may name an icon:

```toml
[[menu.main]]
name = "Guides"
url = "/guides/"
weight = 10
[menu.main.params]
icon = "rocket"
```

An absolute URL opens in a new tab with an arrow after it. Set
`params.external` on an entry to decide that explicitly.

## Search

Search reads a JSON index emitted on the home page. Without
`outputs.home` listing `JSON` the dialog opens and finds nothing, and
nothing fails at build time.

{{< callout type="warning" title="The theme cannot set `outputs` or `markup` for you" >}}
Hugo merges a theme's `params` and `menus` into the site, but not
`outputs` and not `markup`. Both have to be in the site's own
configuration.
{{< /callout >}}
