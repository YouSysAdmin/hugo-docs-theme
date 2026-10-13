// API reference: mount Scalar on the reference pages and keep its theme in
// step with the site's. The vendored standalone bundle (assets/lib/scalar)
// defines window.Scalar. Both scripts are deferred, and deferred scripts run
// in DOCUMENT order - this bundle sits in <head>, Scalar's in the article -
// so mounting waits for DOMContentLoaded, by which point every deferred
// script has run.
document.addEventListener('DOMContentLoaded', function () {
  var host = document.getElementById('openapi-reference');
  if (!host || !window.Scalar || !host.dataset.url) return;

  var root = document.documentElement;
  function dark() { return root.getAttribute('data-theme') !== 'light'; }

  // FOUR OF THESE ARE LOAD-BEARING UNDER THE SITE'S CSP, not preferences:
  // withDefaultFonts pulls from fonts.scalar.com (font-src is 'self'),
  // proxyUrl routes Try-it through proxy.scalar.com, the agent searches
  // api.scalar.com (connect-src is 'self') and telemetry reaches out on
  // its own. All off, so the only request the viewer makes is the
  // document, same-origin, and Try-it goes straight to this instance.
  // showDeveloperTools defaults to "on localhost", which is where a
  // developer would otherwise see a toolbar production never shows.
  var config = {
    url: host.dataset.url,
    proxyUrl: '',
    telemetry: false,
    withDefaultFonts: false,
    agent: { disabled: true },
    mcp: { disabled: true },
    showDeveloperTools: 'never',
    hideDarkModeToggle: true,
    hideClientButton: true,
    darkMode: dark(),
    layout: 'modern',
  };
  var app = window.Scalar.createApiReference(host, config);

  // The site's toggle flips data-theme on <html>. Scalar keeps its own
  // notion, so mirror it rather than let the two drift apart. The WHOLE
  // configuration goes back each time: updateConfiguration replaces
  // rather than merges, so a call carrying only darkMode drops the url
  // and every switch above.
  new MutationObserver(function () {
    if (app && typeof app.updateConfiguration === 'function') {
      config.darkMode = dark();
      app.updateConfiguration(config);
    }
  }).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
});
