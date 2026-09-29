---
title: Shortcodes
description: Callouts, icons and tooltips from the theme, and the Hugo built-ins that fit beside them.
weight: 30
---

## Callout

```go-html-template
{{</* callout type="warning" title="Optional title" */>}}
Body in **markdown**.
{{</* /callout */>}}
```

Six types. Each has its own icon and a default title in the page's
language.

{{< callout type="note" >}}
`note` is the default, and what an unknown type falls back to.
{{< /callout >}}

{{< callout type="info" >}}
`info` - something the reader should know. Alias: `important`.
{{< /callout >}}

{{< callout type="tip" >}}
`tip` - a better way to do it.
{{< /callout >}}

{{< callout type="success" >}}
`success` - it worked, and this is what that looks like.
{{< /callout >}}

{{< callout type="warning" >}}
`warning` - it will not break, but it will not do what you expect. Alias:
`warn`.
{{< /callout >}}

{{< callout type="danger" >}}
`danger` - data loss, a security hole, an outage. Aliases: `caution`,
`error`.
{{< /callout >}}

### Titles

The title is rendered as **inline markdown**, so it can name a config key:

{{< callout type="warning" title="`baseURL` must end with a slash" >}}
Without it, `relURL` joins paths without a separator.
{{< /callout >}}

`title=""` hides the title, and `icon=` picks any icon by name:

{{< callout type="info" title="" icon="terminal" >}}
A callout with no title and the `terminal` icon.
{{< /callout >}}

The type may also be given positionally: `{{</* callout tip */>}}`.

### Content

The body is full markdown - lists, code, even another shortcode:

{{< callout type="tip" title="Upgrading" >}}

1. Pull the new version.
2. Rebuild:

   ```bash
   hugo --gc --minify
   ```

3. Check the {{< icon search >}} search still finds new pages.
   {{< /callout >}}

## Icon

Inline an icon from `assets/icons` by name. It takes the colour and the
size of the text around it.

```go-html-template
{{</* icon rocket */>}}
{{</* icon name="rocket" class="my-class" */>}}
```

Ready {{< icon rocket >}}, set {{< icon zap >}}, go {{< icon send >}}.

Every available icon is listed in the [icon reference](/reference/icons).

## Tooltip

A CSS-only tooltip, shown on hover and on keyboard focus:

```go-html-template
{{</* tooltip text="Command-line interface" */>}}CLI{{</* /tooltip */>}}
{{</* tooltip "Command-line interface" */>}}CLI{{</* /tooltip */>}}
{{</* tooltip term="toml" */>}}TOML{{</* /tooltip */>}}
```

Use the {{< tooltip text="Command-line interface" >}}CLI{{< /tooltip >}} to
build the site, then write the configuration in
{{< tooltip term="toml" >}}TOML{{< /tooltip >}}.

`term` looks the text up in `data/tooltips.toml`, so a definition used on
many pages is written once:

```toml
# data/tooltips.toml
toml = "Tom's Obvious Minimal Language, a configuration file format"
```

## Hugo built-ins

Hugo's own shortcodes work as usual. Two that suit documentation:

### details

{{< details summary="Show the answer" >}}
The `details` shortcode renders a native disclosure element, and its
content is markdown.
{{< /details >}}

### figure

{{< figure src="images/diagram.svg" alt="A page holding three lines of text" caption="A figure with a caption." >}}
