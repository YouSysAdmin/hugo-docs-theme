---
title: Markdown syntax
description: Every element CommonMark and GitHub Flavored Markdown produce, as the theme renders it.
weight: 10
---

This page is a page bundle - a directory with an `index.md` - so the image
further down sits beside it and is referenced by its file name.

## Headings

`h2` to `h4` appear in the table of contents on the right, which is the
theme's default (`markup.tableOfContents`). The page title is the only
`h1`, so start the body at `##`.

## Heading level 2

### Heading level 3

#### Heading level 4

##### Heading level 5

###### Heading level 6

## Paragraphs

A paragraph is one or more lines of text separated by a blank line. The
column is capped at a comfortable measure, so long lines wrap at a length
that reads well on a wide screen.

A second paragraph. A line ending in two spaces or a backslash\
breaks without starting a new paragraph.

## Emphasis

| Markdown                          | Result                         |
| --------------------------------- | ------------------------------ |
| `**bold**`                        | **bold**                       |
| `_italic_`                        | _italic_                       |
| `***both***`                      | _**both**_                     |
| `~~struck~~`                      | ~~struck~~                     |
| `` `code` ``                      | `code`                         |
| `<kbd>Ctrl</kbd>`                 | <kbd>Ctrl</kbd> + <kbd>K</kbd> |
| `<mark>marked</mark>`             | <mark>marked</mark>            |
| `H<sub>2</sub>O`, `x<sup>2</sup>` | H<sub>2</sub>O, x<sup>2</sup>  |

## Blockquotes

> A blockquote is a paragraph prefixed with `>`.
>
> It can hold several paragraphs, **emphasis**, `code` and
> [links](#links).
>
> > And a nested quote.

## Lists

### Unordered

- First item
- Second item
  - Nested item
  - Another nested item
    - Deeper still
- Third item

### Ordered

1. Install the theme
2. Configure the site
   1. Set `baseURL`
   2. Set `theme`
3. Write pages

### Task list

- [x] Copy the theme
- [x] Write the example site
- [ ] Publish it

### Definition list

Front matter
: The block of YAML, TOML or JSON at the top of a content file.

Page bundle
: A directory holding an `index.md` and the files that belong to it.

## Links

| Kind                      | Markdown                                                                 |
| ------------------------- | ------------------------------------------------------------------------ |
| A page, by path           | [`/getting-started/configuration`](/getting-started/configuration)       |
| A page, relative          | [`../shortcodes`](../shortcodes)                                         |
| A heading on this page    | [`#tables`](#tables)                                                     |
| A heading on another page | [`/writing/code-blocks#line-numbers`](/writing/code-blocks#line-numbers) |
| Absolute                  | [`https://gohugo.io`](https://gohugo.io)                                 |
| Autolink                  | <https://gohugo.io>                                                      |
| Email                     | <hello@example.org>                                                      |

A link with a title shows it on hover: [Hugo](https://gohugo.io "The world's fastest framework for building websites").

A footnote reference looks like this.[^1] Another one.[^note]

[^1]: The footnote text is collected at the end of the page.

[^note]: A footnote label may be a word.

## Images

![A diagram of a page holding three lines of text](diagram.svg "Images are resolved from the page bundle")

An image can also come from `static/` by an absolute path, or from anywhere
by URL.

## Tables

Columns are aligned with colons in the separator row:

| Setting               | Type | Default | Description                      |
| :-------------------- | :--: | ------: | -------------------------------- |
| `sidebarCollapsible`  | bool |  `true` | Sections can be collapsed        |
| `sidebarCollapsed`    | bool | `false` | Sections start collapsed         |
| `externalLinksNewTab` | bool | `false` | Absolute links open in a new tab |
| `landing`             | bool | `false` | Home page is the hero            |

A table wider than the column scrolls on its own instead of sliding under
the table of contents:

| Environment variable        | Config key              | Type   | Default                 | Applies to | Description                                                                  |
| --------------------------- | ----------------------- | ------ | ----------------------- | ---------- | ---------------------------------------------------------------------------- |
| `APP_SERVER_PUBLIC_URL`     | `server.public_url`     | string | `http://localhost:3000` | every node | The address users reach the service at, used to build links in outgoing mail |
| `APP_DATABASE_REPLICA_DSNS` | `database.replica_dsns` | list   | empty                   | api        | Read replicas, tried in order                                                |

## Code

Inline `code` sits in the sentence. A block is fenced with three backticks
and a language:

```go
package main

import "fmt"

func main() {
	fmt.Println("hello")
}
```

More in [Code blocks](../code-blocks).

## Horizontal rule

Three dashes on their own line:

---

## Inline HTML

The example site sets `markup.goldmark.renderer.unsafe = true`, so HTML
passes through:

<details>
<summary>A native details element</summary>

Its content is markdown, as long as a blank line separates it from the
tags.

</details>

## Escaping

Prefix a character with a backslash to print it literally: \*not
emphasis\*, \`not code\`, \# not a heading.
