---
title: Installation
description: Add the theme as a Hugo module, a git submodule, or a plain copy.
weight: 10
---

## As a Hugo module

The theme is a Hugo module, so a site that is itself a module can import it
and update it with `hugo mod get -u`. Go must be installed.

```bash
hugo mod init github.com/you/your-docs
```

```toml
# hugo.toml
[module]
  [[module.imports]]
    path = "github.com/YouSysAdmin/hugo-docs-theme"
```

## As a git submodule

```bash
git submodule add https://github.com/YouSysAdmin/hugo-docs-theme.git themes/hugo-docs-theme
```

```toml
# hugo.toml
theme = "hugo-docs-theme"
```

{{< callout type="warning" title="Clone with `--recurse-submodules`" >}}
A clone that has not fetched the submodule builds a site of **blank pages**
and Hugo reports success. CI and fresh checkouts need
`git clone --recurse-submodules`, or `git submodule update --init` after the
fact.
{{< /callout >}}

## As a copy

Download a release archive and unpack it into `themes/hugo-docs-theme`.
Nothing is fetched at build time, so this is also the way to vendor it.

## Check it works

```bash
hugo server
```

The site builds with only `theme` set, but **search needs one more
setting** - see [the configuration](configuration).
