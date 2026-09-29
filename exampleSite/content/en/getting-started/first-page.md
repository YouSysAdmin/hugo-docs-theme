---
title: Your first page
description: Sections, pages, weights and icons - how content becomes navigation.
weight: 30
---

## Sections

A section is a directory under `content/` holding an `_index.md`:

```text
content/
  _index.md                 home page
  guides/
    _index.md               the section
    install.md              a page in it
    upgrade.md
```

```yaml
# content/guides/_index.md
---
title: Guides
description: Step by step.
weight: 10
icon: rocket
---
```

## Pages

```yaml
# content/guides/install.md
---
title: Install
description: Shown under the title and on the section's card grid.
weight: 10
---
```

`hugo new content guides/install.md` writes that front matter from the
theme's archetype.

## Navigation is the tree

There is **no hand-written sidebar**. Each section is a group, ordered by
`weight`, and its pages are ordered the same way. The pager at the foot of a
page walks the same order, so it always agrees with the sidebar.

{{< callout type="tip" >}}
Leave gaps in the weights - 10, 20, 30 - so a page can be put between two
others without renumbering.
{{< /callout >}}

The top-level sections also fill the footer: the first three under **Docs**,
the rest under **Reference**. A section with `sidebar: false` is left out of
both, and of the landing page grid.

## Links between pages

Link to a page by its path, with or without the extension:

```markdown
[Configuration](/getting-started/configuration)
[Next page](first-page.md)
[A heading](/writing/markdown-syntax#tables)
```

A link that names a page is resolved through Hugo, so it keeps working when
the page's URL changes. See [Links](/writing/markdown-syntax#links).
