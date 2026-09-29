---
title: API reference
description: An OpenAPI document rendered with the reference layout.
weight: 40
layout: reference
openapi: openapi.json
---

This page sets `layout: reference` and names an OpenAPI document. The prose
comes first, then the document is rendered below it by
[Scalar](https://github.com/scalar/scalar), which the theme vendors.

```yaml
---
title: API reference
layout: reference
openapi: openapi.json
---
```

The document here is a page resource beside `index.md`. It may also be a
path under `static/` or a URL - a URL on another origin must answer with
CORS headers.

Scalar is configured to make **no requests of its own**: no fonts from its
CDN, no proxy for "Try it", no telemetry. The only request is the document.
It follows the site's theme toggle.
