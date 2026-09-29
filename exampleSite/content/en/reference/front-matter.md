---
title: Front matter
description: The keys the theme reads on sections and pages.
weight: 20
---

## Every page

| Key           | Description                                                                                                               |
| ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `title`       | Page title, sidebar entry and card heading                                                                                |
| `description` | Lead paragraph, card text, meta description, search result text                                                           |
| `weight`      | Position among its siblings, lowest first                                                                                 |
| `toc`         | `false` hides the table of contents. It is shown whenever the page has headings                                           |
| `layout`      | `reference` for an [API reference page](../api)                                                                           |
| `lastmod`     | Shown as "updated" under the title, and compared for [stale translations](/customization/multilingual#stale-translations) |

## Sections

On a section's `_index.md`:

| Key                   | Description                                                                    |
| --------------------- | ------------------------------------------------------------------------------ |
| `icon`                | Icon beside the sidebar group heading                                          |
| `sidebar`             | `false` leaves the section out of the sidebar, the footer and the landing grid |
| `sidebar_collapsible` | Overrides `params.sidebarCollapsible` for this section                         |
| `sidebar_collapsed`   | Overrides `params.sidebarCollapsed` for this section                           |
| `sidebar_index`       | Overrides `params.sidebarIndexLink` for this section                           |

## Reference pages

| Key       | Description                                                             |
| --------- | ----------------------------------------------------------------------- |
| `openapi` | The OpenAPI document: a page resource, a path under `static/`, or a URL |

## Changelog entries

Pages in a section named `changelog` use the changelog layout.

| Key       | Description                                                                  |
| --------- | ---------------------------------------------------------------------------- |
| `date`    | Groups the entry by month. Entries from the last 30 days carry a "New" badge |
| `tags`    | Shown under the entry                                                        |
| `authors` | A list of names, or of `name` / `link` / `image` maps                        |
