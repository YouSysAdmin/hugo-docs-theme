/* Client-side docs search: lazy-loads the Hugo-generated index.json, runs Fuse.js
   in a modal opened from the nav (button, Cmd/Ctrl-K, or "/"). Matching is
   exact-substring first, fuzzy only as a fallback for typos. Vanilla JS, no
   framework, to match the rest of the theme. Depends on Fuse (bundled before it). */
(function () {
  var root = document.getElementById('cs-search');
  if (!root || typeof Fuse === 'undefined') return;

  var input = root.querySelector('.cs-search-input');
  var list = root.querySelector('.cs-search-results');
  var empty = root.querySelector('.cs-search-empty');
  var indexURL = root.getAttribute('data-index');
  var isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

  var fuse = null; // built on first open
  var loading = false;
  var results = []; // current result pages
  var active = -1; // index of highlighted result

  // Label the Cmd/Ctrl-K hints for the platform.
  Array.prototype.forEach.call(document.querySelectorAll('.cs-search-kbd'), function (el) {
    el.textContent = isMac ? '⌘K' : 'Ctrl K';
  });

  // Fetch + index once. Returns a promise so open() can show a loading state.
  function ensureIndex() {
    if (fuse || loading) return Promise.resolve();
    loading = true;
    return fetch(indexURL)
      .then(function (r) { return r.json(); })
      .then(function (docs) {
        fuse = new Fuse(docs, {
          keys: [
            { name: 'title', weight: 3 },
            { name: 'desc', weight: 2 },
            { name: 'body', weight: 1 }
          ],
          includeMatches: true,
          ignoreLocation: true, // match anywhere, not just the start
          useExtendedSearch: true, // for the exact-substring pass in query()
          threshold: 0.35, // only governs the fuzzy fallback pass
          minMatchCharLength: 2
        });
      })
      .catch(function () { /* leave fuse null, query() then no-ops */ })
      .finally(function () { loading = false; });
  }

  function open() {
    if (!root.hidden) return;
    root.hidden = false;
    document.body.classList.add('cs-search-open');
    ensureIndex().then(function () {
      if (input.value) query(input.value);
    });
    input.focus();
    input.select();
  }

  function close() {
    if (root.hidden) return;
    root.hidden = true;
    document.body.classList.remove('cs-search-open');
  }

  // Build a short snippet around the first body match, else fall back to desc.
  function snippet(res) {
    var page = res.item;
    var m = (res.matches || []).filter(function (x) { return x.key === 'body'; })[0];
    if (m && m.indices && m.indices.length) {
      var at = m.indices[0][0];
      var start = Math.max(0, at - 40);
      var text = page.body.slice(start, start + 140).trim();
      return (start > 0 ? '…' : '') + text + '…';
    }
    return page.desc || '';
  }

  function render() {
    list.innerHTML = '';
    if (!results.length) {
      empty.hidden = false;
      return;
    }
    empty.hidden = true;
    results.forEach(function (res, i) {
      var page = res.item;
      var li = document.createElement('li');
      li.className = 'cs-search-result' + (i === active ? ' is-active' : '');
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', i === active ? 'true' : 'false');
      var sec = page.section
        ? '<span class="cs-search-sec">' + page.section + '</span>'
        : '';
      li.innerHTML =
        '<a href="' + page.href + '">' +
          '<span class="cs-search-r-title">' + sec + page.title + '</span>' +
          '<span class="cs-search-r-snip">' + snippet(res) + '</span>' +
        '</a>';
      li.addEventListener('mousemove', function () { setActive(i); });
      list.appendChild(li);
    });
  }

  function query(q) {
    if (!fuse || !q.trim()) { results = []; active = -1; render(); return; }
    // Exact pass: every word must literally appear somewhere ('word is Fuse's
    // extended-search include-exact operator, space-separated terms are ANDed).
    var exact = q.trim().split(/\s+/).map(function (w) { return "'" + w; }).join(' ');
    results = fuse.search(exact, { limit: 12 });
    // Fuzzy fallback so typos still find something.
    if (!results.length) results = fuse.search(q, { limit: 12 });
    active = results.length ? 0 : -1;
    render();
  }

  function setActive(i) {
    if (i === active) return;
    active = i;
    var items = list.children;
    for (var n = 0; n < items.length; n++) {
      var on = n === active;
      items[n].classList.toggle('is-active', on);
      items[n].setAttribute('aria-selected', on ? 'true' : 'false');
    }
  }

  function move(delta) {
    if (!results.length) return;
    var next = (active + delta + results.length) % results.length;
    setActive(next);
    list.children[next].scrollIntoView({ block: 'nearest' });
  }

  function go() {
    if (active < 0 || !results[active]) return;
    window.location.href = results[active].item.href;
  }

  // --- Wiring -------------------------------------------------------------
  Array.prototype.forEach.call(document.querySelectorAll('[data-search-open]'), function (btn) {
    btn.addEventListener('click', open);
  });
  Array.prototype.forEach.call(root.querySelectorAll('[data-search-close]'), function (el) {
    el.addEventListener('click', close);
  });

  input.addEventListener('input', function () { query(input.value); });

  input.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
    else if (e.key === 'Enter') { e.preventDefault(); go(); }
  });

  // Global shortcuts: Cmd/Ctrl-K toggles, "/" opens (unless already typing),
  // Esc closes.
  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      root.hidden ? open() : close();
      return;
    }
    if (e.key === 'Escape' && !root.hidden) { close(); return; }
    if (e.key === '/' && root.hidden) {
      var t = e.target;
      var typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable);
      if (!typing) { e.preventDefault(); open(); }
    }
  });
})();
