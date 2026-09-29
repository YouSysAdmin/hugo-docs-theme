# Scalar API Reference, vendored

`standalone.js` is `@scalar/api-reference@1.67.0`, file
`dist/browser/standalone.js`, unmodified. `LICENSE` is the MIT notice
from github.com/scalar/scalar.

Vendored rather than loaded from a CDN so a site built with this theme
makes no third-party requests and works under a `script-src 'self'`
policy - the same reason Fuse.js sits in `assets/js/vendor` and the fonts
are self-hosted. It is only loaded on pages with `layout: reference`.

It lives under `assets/` so it is published only by a site that has a
reference page, and it is NOT piped through minify: 3.7 MB through the
minify pipe buys nothing and costs every build.

To update:

    V=1.67.0
    curl -sfL -o standalone.js "https://cdn.jsdelivr.net/npm/@scalar/api-reference@$V/dist/browser/standalone.js"
    curl -sfL -o LICENSE https://raw.githubusercontent.com/scalar/scalar/main/LICENSE

then change the version above and in this file, rebuild the example site, and open
its API reference page with the browser console showing - the switches in
`assets/js/reference.js` (`withDefaultFonts`, `proxyUrl`, `telemetry`,
`agent.disabled`) are what keep it from making outside requests, and a new release may
add another thing that reaches out. Also keep the host element's id away
from `api-reference`: the bundle self-mounts on that id with defaults.
