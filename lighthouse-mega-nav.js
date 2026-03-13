/* Lighthouse Aquatics — Mega Nav v5 (fully dynamic + images) */

(function() {
  var css = [
    '#ls-mega-overlay{display:none;position:fixed;top:0;left:0;right:0;bottom:0;z-index:9998}',
    '#ls-mega-container{display:none;position:fixed;left:0;right:0;background:#fff;box-shadow:0 8px 30px rgba(0,0,0,0.12);z-index:9999;margin-top:-1px}',
    '#ls-mega-container.is-open{display:block}',
    '#ls-mega-overlay.is-open{display:block}',

    '.lm-wrap{display:flex;max-width:1400px;margin:0 auto;min-height:380px}',

    '.lm-sidebar{width:230px;min-width:230px;background:#f8f9fa;border-right:1px solid #eee;padding:12px 0;overflow-y:auto}',
    '.lm-sidebar a{display:flex;align-items:center;gap:12px;padding:10px 18px;font-size:14px;font-weight:500;color:#333;text-decoration:none;transition:all 0.12s;border-left:3px solid transparent}',
    '.lm-sidebar a:hover,.lm-sidebar a.is-active{background:#fff;color:#0073e6;border-left-color:#0073e6}',
    '.lm-sidebar a img{width:44px;height:44px;border-radius:8px;object-fit:cover;flex-shrink:0}',

    '.lm-grid-wrap{flex:1;position:relative}',
    '.lm-grid{display:none;grid-template-columns:repeat(3,1fr);gap:18px;padding:24px 28px;align-content:start;position:absolute;inset:0;overflow-y:auto}',
    '.lm-grid.is-visible{display:grid}',

    '.lm-grid-item{text-decoration:none;color:#333;text-align:center;padding:10px;border-radius:10px;transition:transform 0.15s}',
    '.lm-grid-item:hover{transform:translateY(-3px);background:#f8f9fa}',
    '.lm-grid-item img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:10px;margin-bottom:8px;background:#f0f0f0}',
    '.lm-grid-item span{font-size:13px;font-weight:600;display:block;color:#333}',

    '.lm-grid .lm-viewall{grid-column:1/-1;text-align:center;padding:8px 0}',
    '.lm-viewall a{font-size:14px;font-weight:600;color:#0073e6;text-decoration:none;display:inline-flex;align-items:center;gap:6px}',
    '.lm-viewall a:hover{text-decoration:underline}',

    '.lm-empty{grid-column:1/-1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 20px;text-align:center}',
    '.lm-empty a{display:inline-block;margin-top:12px;padding:10px 24px;background:#1a3a5c;color:#fff;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px}',
    '.lm-empty a:hover{background:#0073e6}',

    '.lm-promos{width:260px;min-width:260px;padding:14px;display:flex;flex-direction:column;gap:10px;border-left:1px solid #eee;background:#fafafa}',
    '.lm-promo{position:relative;border-radius:10px;overflow:hidden;flex:1;min-height:120px;display:flex;align-items:flex-end;padding:14px;text-decoration:none;color:#fff}',
    '.lm-promo img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}',
    '.lm-promo::after{content:"";position:absolute;inset:0;background:linear-gradient(to top,rgba(0,20,40,0.65),transparent 70%)}',
    '.lm-promo span{position:relative;z-index:1;font-size:14px;font-weight:700;line-height:1.3;text-shadow:0 1px 3px rgba(0,0,0,0.4)}',

    '@media(max-width:768px){#ls-mega-container{display:none!important}#ls-mega-overlay{display:none!important}}'
  ];
  var style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(css.join('')));
  document.head.appendChild(style);

  /* ── Promo images (store branding) ── */
  var TSAF = 'https://topshelfaquatics.com/cdn/shop/files/';
  var defaultPromos = [
    { img: TSAF + 'top-shelf-aquatics-macroalgae-trifecta-1161127572.webp?v=1746568318&width=800', text: 'Shop Now', url: '/products/livestock' },
    { img: TSAF + 'saltwater-aquarium-copepods_a5676231-b226-4496-88cc-889633207dd0.jpg?v=1742313702&width=800', text: 'Visit Us In Store', url: '/contact-us' }
  ];

  /* ── Parse initialState (it's a JSON string) ── */
  var _state = null;
  function getState() {
    if (_state) return _state;
    try {
      var raw = window.initialState;
      if (!raw) return null;
      _state = typeof raw === 'string' ? JSON.parse(raw) : raw;
      return _state;
    } catch (e) { return null; }
  }

  /* ── Build categoryId → {url, imageUrl} map ── */
  function buildCategoryMap() {
    var map = {};
    try {
      var state = getState();
      if (!state) return map;
      var ext = state.externalContent;
      if (ext && ext.category && ext.category.storeData && ext.category.storeData.categories) {
        ext.category.storeData.categories.forEach(function(cat) {
          if (cat.id) {
            var url = cat.url || '';
            try { url = new URL(url).pathname; } catch (e) {}
            map[cat.id] = { url: url, image: cat.imageUrl || cat.thumbnailImageUrl || '', name: cat.name || '' };
          }
        });
      }
      /* Also try categoryTree */
      if (ext && ext.category && ext.category.categoryTree) {
        ext.category.categoryTree.forEach(function(cat) {
          if (cat.id && !map[cat.id]) {
            var url = cat.urlPath || cat.url || '';
            try { url = new URL(url).pathname; } catch (e) {}
            map[cat.id] = { url: url, image: '', name: cat.name || '' };
          }
        });
      }
    } catch (e) {}
    return map;
  }

  /* ── Get menu items from initialState ── */
  function getMenuItems() {
    try {
      var state = getState();
      if (!state || !state.tile || !state.tile.tileList) return [];
      for (var t = 0; t < state.tile.tileList.length; t++) {
        var tile = state.tile.tileList[t];
        if (tile.content && tile.content.menu && tile.content.menu.items) {
          return tile.content.menu.items;
        }
      }
    } catch (e) {}
    return [];
  }

  /* ── Resolve URL: try categoryId map first, then fall back to '#' (fixed by scrape later) ── */
  function resolveUrl(item, catMap) {
    if (item.type === 'GO_TO_CATEGORY' && item.categoryId && catMap[item.categoryId]) {
      return catMap[item.categoryId].url;
    }
    if (item.link) return item.link;
    if (item.url) return item.url;
    return '#';
  }

  /* ── Get category image for an item ── */
  function resolveImage(item, catMap) {
    if (item.type === 'GO_TO_CATEGORY' && item.categoryId && catMap[item.categoryId]) {
      return catMap[item.categoryId].image;
    }
    return '';
  }

  /* ── Build initial config from initialState (URLs may be '#' for HYPER_LINK items) ── */
  function buildInitialConfig(menuItem, catMap) {
    var config = { sidebar: [], promos: defaultPromos };
    var nested = menuItem.nestedItems || [];
    if (nested.length === 0) return null;

    var hasDeep = nested.some(function(n) {
      return n.nestedItems && n.nestedItems.length > 0;
    });

    if (hasDeep) {
      nested.forEach(function(cat) {
        var children = [];
        if (cat.nestedItems) {
          cat.nestedItems.forEach(function(child) {
            children.push({
              label: child.title,
              url: resolveUrl(child, catMap),
              image: resolveImage(child, catMap)
            });
          });
        }
        config.sidebar.push({
          label: cat.title,
          url: resolveUrl(cat, catMap),
          image: resolveImage(cat, catMap),
          children: children
        });
      });
    } else {
      var children = [];
      nested.forEach(function(item) {
        children.push({
          label: item.title,
          url: resolveUrl(item, catMap),
          image: resolveImage(item, catMap)
        });
      });
      config.sidebar.push({
        label: menuItem.title,
        url: resolveUrl(menuItem, catMap),
        image: resolveImage(menuItem, catMap),
        children: children
      });
    }

    return config;
  }

  /* ── Merge scraped URLs into config (fills in '#' placeholders) ── */
  function mergeScrapedUrls(config, scrapedMap) {
    config.sidebar.forEach(function(cat) {
      if (cat.url === '#' && scrapedMap[cat.label]) {
        cat.url = scrapedMap[cat.label];
      }
      if (cat.children) {
        cat.children.forEach(function(child) {
          if (child.url === '#' && scrapedMap[child.label]) {
            child.url = scrapedMap[child.label];
          }
        });
      }
    });
  }

  /* ── Build HTML ── */
  function buildMenu(config) {
    var html = '<div class="lm-wrap">';

    html += '<div class="lm-sidebar">';
    config.sidebar.forEach(function(cat, i) {
      html += '<a href="' + cat.url + '" data-idx="' + i + '"' + (i === 0 ? ' class="is-active"' : '') + '>';
      if (cat.image) {
        html += '<img src="' + cat.image + '" alt="' + cat.label + '" loading="lazy">';
      }
      html += cat.label + '</a>';
    });
    html += '</div>';

    html += '<div class="lm-grid-wrap">';
    config.sidebar.forEach(function(cat, i) {
      html += '<div class="lm-grid' + (i === 0 ? ' is-visible' : '') + '" data-grid="' + i + '">';
      if (cat.children && cat.children.length > 0) {
        cat.children.forEach(function(child) {
          html += '<a class="lm-grid-item" href="' + child.url + '">';
          if (child.image) {
            html += '<img src="' + child.image + '" alt="' + child.label + '" loading="lazy">';
          }
          html += '<span>' + child.label + '</span></a>';
        });
        html += '<div class="lm-viewall"><a href="' + cat.url + '">View All ' + cat.label + ' &rarr;</a></div>';
      } else {
        html += '<div class="lm-empty">';
        html += '<p style="color:#888;font-size:14px;margin:0 0 4px">Browse our ' + cat.label + ' collection</p>';
        html += '<a href="' + cat.url + '">Shop ' + cat.label + '</a>';
        html += '</div>';
      }
      html += '</div>';
    });
    html += '</div>';

    if (config.promos && config.promos.length > 0) {
      html += '<div class="lm-promos">';
      config.promos.forEach(function(p) {
        html += '<a class="lm-promo" href="' + p.url + '">';
        html += '<img src="' + p.img + '" alt="" loading="lazy">';
        html += '<span>' + p.text + '</span></a>';
      });
      html += '</div>';
    }

    html += '</div>';
    return html;
  }

  /* ── Wait for Vue nav ── */
  function waitForNav(cb) {
    var check = setInterval(function() {
      var nav = document.querySelector('[data-nav="main-navigation"]');
      if (nav && nav.querySelectorAll('.root-item').length > 0) {
        clearInterval(check);
        cb(nav);
      }
    }, 300);
  }

  waitForNav(function(nav) {
    var catMap = buildCategoryMap();
    var menuItems = getMenuItems();

    console.log('Mega nav: categories mapped:', Object.keys(catMap).length);
    console.log('Mega nav: menu items:', menuItems.map(function(m) { return m.title; }).join(', '));

    var overlay = document.createElement('div');
    overlay.id = 'ls-mega-overlay';
    document.body.appendChild(overlay);

    var container = document.createElement('div');
    container.id = 'ls-mega-container';
    document.body.appendChild(container);

    var closeTimeout = null;

    function closeMenu() {
      closeTimeout = setTimeout(function() {
        container.classList.remove('is-open');
        overlay.classList.remove('is-open');
      }, 200);
    }

    function openMenu(config) {
      if (closeTimeout) { clearTimeout(closeTimeout); closeTimeout = null; }
      var header = nav.closest('header') || nav.parentElement;
      var headerRect = header.getBoundingClientRect();
      container.style.top = headerRect.bottom + 'px';
      container.innerHTML = buildMenu(config);

      var sLinks = container.querySelectorAll('.lm-sidebar a');
      var grids = container.querySelectorAll('.lm-grid');
      sLinks.forEach(function(sl) {
        sl.addEventListener('mouseenter', function() {
          var idx = this.getAttribute('data-idx');
          sLinks.forEach(function(x) { x.classList.remove('is-active'); });
          grids.forEach(function(x) { x.classList.remove('is-visible'); });
          this.classList.add('is-active');
          var tgt = container.querySelector('.lm-grid[data-grid="' + idx + '"]');
          if (tgt) tgt.classList.add('is-visible');
        });
      });

      container.classList.add('is-open');
      overlay.classList.add('is-open');
    }

    /* Attach to each root nav item */
    nav.querySelectorAll('.root-item').forEach(function(rootEl) {
      var linkEl = rootEl.querySelector('a');
      if (!linkEl) return;
      var title = linkEl.textContent.trim();

      /* Find matching initialState menu item */
      var menuItem = null;
      for (var i = 0; i < menuItems.length; i++) {
        if (menuItems[i].title === title && menuItems[i].nestedItems && menuItems[i].nestedItems.length > 0) {
          menuItem = menuItems[i];
          break;
        }
      }
      if (!menuItem) return;

      var config = buildInitialConfig(menuItem, catMap);
      if (!config || config.sidebar.length === 0) return;

      var urlsScraped = false;

      console.log('Mega nav: attached "' + title + '"');

      /* MutationObserver: scrape URLs from Vue dropdown, then hide it */
      new MutationObserver(function(mutations) {
        mutations.forEach(function(m) {
          for (var i = 0; i < m.addedNodes.length; i++) {
            var node = m.addedNodes[i];
            if (node.nodeType !== 1) continue;
            var nodeLinks = node.querySelectorAll ? node.querySelectorAll('a') : [];
            if (nodeLinks.length > 0 && !node.classList.contains('relative')) {
              /* Scrape URLs before hiding (only need to do this once) */
              if (!urlsScraped) {
                var scrapedMap = {};
                nodeLinks.forEach(function(a) {
                  var text = a.textContent.trim();
                  var href = a.getAttribute('href');
                  if (text && href && href !== '#') {
                    scrapedMap[text] = href;
                  }
                });
                mergeScrapedUrls(config, scrapedMap);
                urlsScraped = true;
                console.log('Mega nav: scraped URLs for "' + title + '":', Object.keys(scrapedMap).join(', '));
              }
              /* Hide Vue dropdown */
              node.style.cssText = 'display:none!important;visibility:hidden!important;position:absolute!important;height:0!important;overflow:hidden!important;pointer-events:none!important;';
            }
          }
        });
      }).observe(rootEl, { childList: true, subtree: true });

      rootEl.addEventListener('mouseenter', function() {
        openMenu(config);
        setTimeout(function() {
          for (var j = 0; j < rootEl.children.length; j++) {
            var ch = rootEl.children[j];
            if (ch.querySelectorAll && ch.querySelectorAll('a').length > 2 && !ch.classList.contains('relative')) {
              ch.style.cssText = 'display:none!important;';
            }
          }
        }, 5);
      });

      rootEl.addEventListener('mouseleave', function() { closeMenu(); });
    });

    container.addEventListener('mouseenter', function() {
      if (closeTimeout) { clearTimeout(closeTimeout); closeTimeout = null; }
    });
    container.addEventListener('mouseleave', function() { closeMenu(); });
    overlay.addEventListener('click', function() {
      container.classList.remove('is-open');
      overlay.classList.remove('is-open');
    });

    console.log('Lighthouse mega nav v5 loaded');
  });
})();
