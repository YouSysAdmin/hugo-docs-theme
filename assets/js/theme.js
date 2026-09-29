// Theme behavior: the mobile nav drawer, the dark/light toggle, and the "On this
// page" TOC scrollspy. Shipped as a deferred bundle, so the DOM is parsed before
// this runs. The initial theme is resolved by a separate inline script in <head>
// (no flash). This only handles user interaction. Each block self-guards, so it is
// a no-op on pages that lack the relevant elements.

// Mobile navigation drawer.
(function () {
  var btn = document.querySelector('.cs-burger');
  var menu = document.getElementById('cs-mobile-menu');
  if (!btn || !menu) return;
  function setOpen(open) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menu.classList.toggle('is-open', open);
    document.body.classList.toggle('cs-menu-open', open);
  }
  btn.addEventListener('click', function () {
    setOpen(btn.getAttribute('aria-expanded') !== 'true');
  });
  // Close when a link is followed or the backdrop (area outside the panel) is tapped.
  menu.addEventListener('click', function (e) {
    if (e.target === menu || e.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });
})();

// Theme toggle: flip data-theme on <html> and persist the choice.
(function () {
  var root = document.documentElement;
  var btn = document.querySelector('.cs-theme-toggle');
  if (!btn) return;
  function sync() {
    var light = root.getAttribute('data-theme') === 'light';
    btn.setAttribute('aria-pressed', light ? 'true' : 'false');
    btn.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
  }
  sync();
  btn.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    sync();
  });
})();

// TOC scrollspy: highlight the "On this page" entry for the section currently in
// view and follow the page as it scrolls (like taskfile.dev). No-op when the page
// has no TOC or the browser lacks IntersectionObserver.
(function () {
  var toc = document.querySelector('.cs-toc');
  if (!toc || !('IntersectionObserver' in window)) return;
  var links = Array.prototype.slice.call(toc.querySelectorAll('a[href^="#"]'));
  if (!links.length) return;

  var linkFor = {}; // heading id -> TOC <a>
  var headings = []; // heading elements, in document order
  links.forEach(function (a) {
    var id = decodeURIComponent((a.getAttribute('href') || '').slice(1));
    var el = id && document.getElementById(id);
    if (el) {
      linkFor[id] = a;
      headings.push(el);
    }
  });
  if (!headings.length) return;

  var current = null;
  function activate(a) {
    if (a === current) return;
    if (current) {
      current.classList.remove('is-active');
      current.removeAttribute('aria-current');
    }
    current = a || null;
    if (a) {
      a.classList.add('is-active');
      a.setAttribute('aria-current', 'true');
    }
    moveRail(current);
  }

  // The rail: a thin line down the left of the TOC that traces the
  // indentation of the entries, with the active entry's stretch of it drawn
  // in the brand colour. It is ONE path drawn twice - the background copy
  // whole, the foreground copy as a single dash positioned by dasharray and
  // dashoffset - so moving between two entries at different depths slides
  // the highlight along the jog rather than teleporting across the gutter.
  // Built from measured geometry, so it survives a wrapped entry, a changed
  // font size and a resize. Absent without JS, which is also true of the
  // highlight it follows.
  var SVGNS = 'http://www.w3.org/2000/svg';
  var nav = toc.querySelector('#TableOfContents') || toc.querySelector('nav');
  var rail = null, railBg = null, railOn = null;
  var segs = [], railLen = 0, railReady = false;

  function depthOf(a) {
    var n = 0, el = a.parentNode;
    while (el && el !== nav) {
      if (el.tagName === 'UL') n++;
      el = el.parentNode;
    }

    return n > 0 ? n - 1 : 0;
  }

  function buildRail() {
    segs = [];
    if (!nav) return;
    var box = nav.getBoundingClientRect();
    // No layout at all - the TOC column is dropped below 1080px, and every
    // offset would read zero. The observers below rebuild when it returns.
    if (!box.height) return;

    if (!rail) {
      rail = document.createElementNS(SVGNS, 'svg');
      rail.setAttribute('class', 'cs-toc-rail');
      rail.setAttribute('aria-hidden', 'true');
      railBg = document.createElementNS(SVGNS, 'path');
      railBg.setAttribute('class', 'cs-toc-rail-bg');
      railOn = document.createElementNS(SVGNS, 'path');
      railOn.setAttribute('class', 'cs-toc-rail-on');
      rail.appendChild(railBg);
      rail.appendChild(railOn);
      nav.appendChild(rail);
    }

    var widest = 0;
    links.forEach(function (a) {
      var r = a.getBoundingClientRect();
      if (!r.height) return;
      var x = 1 + 6 * depthOf(a);
      if (x > widest) widest = x;
      segs.push({ link: a, x: x, top: r.top - box.top, bot: r.bottom - box.top });
    });
    if (!segs.length) return;

    // Assemble the path and measure it in the same pass: getTotalLength on
    // the partial path is what turns an entry's position into the distance
    // along the path that the dash has to sit at. A depth change is drawn as
    // a curve, which is exactly the length no arithmetic here could predict.
    var d = '';
    for (var i = 0; i < segs.length; i++) {
      var s = segs[i], p = segs[i - 1];
      if (!p) d += 'M' + s.x + ' ' + s.top;
      else if (p.x === s.x) d += 'L' + s.x + ' ' + s.top;
      else {
        var mid = (p.bot + s.top) / 2;
        d += 'C' + p.x + ' ' + mid + ' ' + s.x + ' ' + mid + ' ' + s.x + ' ' + s.top;
      }
      railBg.setAttribute('d', d);
      s.from = railBg.getTotalLength();
      d += 'L' + s.x + ' ' + s.bot;
      railBg.setAttribute('d', d);
      s.to = railBg.getTotalLength();
    }
    railOn.setAttribute('d', d);
    railLen = segs[segs.length - 1].to;
    rail.setAttribute('width', widest + 2);
    rail.setAttribute('height', Math.ceil(box.height));
  }

  function moveRail(a) {
    if (!rail || !segs.length) return;
    var s = null;
    for (var i = 0; i < segs.length; i++) {
      if (segs[i].link === a) { s = segs[i]; break; }
    }
    if (!s) {
      railOn.style.strokeDasharray = '0 ' + railLen;
      return;
    }
    // The gap is the whole path, so the pattern never repeats further down.
    // A NEGATIVE offset moves the dash forward along the path.
    railOn.style.strokeDasharray = (s.to - s.from) + ' ' + railLen;
    railOn.style.strokeDashoffset = String(-s.from);
    // The first placement is a jump from nowhere, so it is not animated.
    if (!railReady) {
      railReady = true;
      railOn.style.transition = 'none';
      requestAnimationFrame(function () { railOn.style.transition = ''; });
    }
  }

  function rebuildRail() {
    buildRail();
    railReady = false;
    moveRail(current);
  }

  rebuildRail();
  // A wrapped entry changes height with the column, and a web font landing
  // late moves every entry - both are measured, so both need a rebuild.
  if ('ResizeObserver' in window) new ResizeObserver(rebuildRail).observe(nav || toc);
  else window.addEventListener('resize', rebuildRail);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(rebuildRail);

  var visible = new Set();
  function pick() {
    // The first heading (document order) inside the active band wins. If the band
    // is empty - scrolled to rest between two headings - keep the last heading
    // that sits above it, so something always stays highlighted.
    for (var i = 0; i < headings.length; i++) {
      if (visible.has(headings[i])) {
        activate(linkFor[headings[i].id]);
        return;
      }
    }
    var above = null;
    for (var j = 0; j < headings.length; j++) {
      if (headings[j].getBoundingClientRect().top < 100) above = headings[j];
      else break;
    }
    if (above) activate(linkFor[above.id]);
  }

  // Active band: from just below the sticky nav (~80px) down to 30% of the
  // viewport, so a heading lights up as it reaches the top of the reading area.
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) visible.add(e.target);
      else visible.delete(e.target);
    });
    pick();
  }, { rootMargin: '-80px 0px -70% 0px', threshold: 0 });
  headings.forEach(function (h) { io.observe(h); });

  // Reflect a clicked entry immediately, before the scroll settles.
  links.forEach(function (a) {
    a.addEventListener('click', function () { activate(a); });
  });
})();
