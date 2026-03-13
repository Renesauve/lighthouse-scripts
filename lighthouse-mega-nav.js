/* Lighthouse Aquatics — Mega Nav v3 */
/* Sidebar categories + center grid like Top Shelf Aquatics */

(function() {
  var css = [
    '#ls-mega-overlay{display:none;position:fixed;top:0;left:0;right:0;bottom:0;z-index:9998}',
    '#ls-mega-container{display:none;position:fixed;left:0;right:0;background:#fff;box-shadow:0 8px 30px rgba(0,0,0,0.12);z-index:9999;margin-top:-1px}',
    '#ls-mega-container.is-open{display:block}',
    '#ls-mega-overlay.is-open{display:block}',

    '.lm-wrap{display:flex;max-width:1400px;margin:0 auto;min-height:380px}',

    /* Sidebar */
    '.lm-sidebar{width:230px;min-width:230px;background:#f8f9fa;border-right:1px solid #eee;padding:12px 0;overflow-y:auto}',
    '.lm-sidebar a{display:flex;align-items:center;gap:12px;padding:10px 18px;font-size:14px;font-weight:500;color:#333;text-decoration:none;transition:all 0.12s;border-left:3px solid transparent}',
    '.lm-sidebar a:hover,.lm-sidebar a.is-active{background:#fff;color:#0073e6;border-left-color:#0073e6}',
    '.lm-sidebar a img{width:44px;height:44px;border-radius:8px;object-fit:cover;flex-shrink:0}',

    /* Center grid */
    '.lm-grid-wrap{flex:1;position:relative}',
    '.lm-grid{display:none;grid-template-columns:repeat(4,1fr);gap:16px;padding:24px 28px;align-content:start;position:absolute;inset:0;overflow-y:auto}',
    '.lm-grid.is-visible{display:grid}',

    '.lm-grid-item{text-decoration:none;color:#333;text-align:center;transition:transform 0.15s;padding:8px;border-radius:10px}',
    '.lm-grid-item:hover{transform:translateY(-3px);background:#f8f9fa}',
    '.lm-grid-item img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:10px;margin-bottom:8px;background:#f0f0f0}',
    '.lm-grid-item span{font-size:13px;font-weight:600;display:block;color:#333}',

    '.lm-grid .lm-viewall{grid-column:1/-1;text-align:center;padding:8px 0}',
    '.lm-viewall a{font-size:14px;font-weight:600;color:#0073e6;text-decoration:none;display:inline-flex;align-items:center;gap:6px}',
    '.lm-viewall a:hover{text-decoration:underline}',

    /* Empty state */
    '.lm-empty{grid-column:1/-1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 20px;text-align:center}',
    '.lm-empty a{display:inline-block;margin-top:12px;padding:10px 24px;background:#1a3a5c;color:#fff;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px}',
    '.lm-empty a:hover{background:#0073e6}',

    /* Promos */
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

  /* ── Placeholder images (Top Shelf Aquatics) ── */
  var TSA = 'https://topshelfaquatics.com/cdn/shop/collections/';
  var TSAF = 'https://topshelfaquatics.com/cdn/shop/files/';
  var imgs = [
    TSA + 'Clownfish-for-sale.webp?crop=center&height=300&width=300',
    TSA + 'Tangs-for-sale.webp?crop=center&height=300&width=300',
    TSA + 'wrasse-for-sale.webp?crop=center&height=300&width=300',
    TSA + 'goby-fish-for-sale.webp?crop=center&height=300&width=300',
    TSA + 'beginner-fish-for-sale.webp?crop=center&height=300&width=300',
    TSA + 'mandarin-fish-for-sale.webp?crop=center&height=300&width=300',
    TSA + 'aquarium-shrimp-for-sale.webp?crop=center&height=300&width=300',
    TSA + 'starfish-for-sale.webp?crop=center&height=300&width=300',
    TSA + 'urchins-for-sale.webp?crop=center&height=300&width=300',
    TSA + 'aquarium-crabs-for-sale.webp?crop=center&height=300&width=300',
    TSA + 'berghia-nudibranch-for-sale.webp?crop=center&height=300&width=300',
    TSA + 'non-reef-safe-fish.webp?crop=center&height=300&width=300',
    TSA + 'saltwater-fish-for-sale_1.webp?width=300',
    TSA + 'saltwater-inverts-for-sale.webp?width=300',
    TSA + 'anemones-for-sale_67216c95-8676-494a-a3e0-1b0d0da08a4e.webp?width=300'
  ];
  var thumbs = [
    TSA + 'saltwater-fish-for-sale_1.webp?width=80',
    TSA + 'saltwater-inverts-for-sale.webp?width=80',
    TSA + 'anemones-for-sale_67216c95-8676-494a-a3e0-1b0d0da08a4e.webp?width=80',
    TSA + 'clam-icon.webp?width=80',
    TSA + 'Clownfish-for-sale.webp?crop=center&height=80&width=80',
    TSA + 'Tangs-for-sale.webp?crop=center&height=80&width=80',
    TSA + 'wrasse-for-sale.webp?crop=center&height=80&width=80',
    TSA + 'goby-fish-for-sale.webp?crop=center&height=80&width=80',
    TSA + 'aquarium-shrimp-for-sale.webp?crop=center&height=80&width=80',
    TSA + 'starfish-for-sale.webp?crop=center&height=80&width=80'
  ];
  function gi(i) { return imgs[i % imgs.length]; }
  function gt(i) { return thumbs[i % thumbs.length]; }

  /* ── Menu data ── */
  var menus = {
    'Fish & Inverts': {
      sidebar: [
        {
          label: 'Saltwater Fish',
          url: '/products/saltwater',
          children: [
            { label: 'All Saltwater Fish', url: '/products/saltwater' },
            { label: 'Livestock', url: '/products/livestock' },
            { label: 'Fresh Water', url: '/products/fresh-water' }
          ]
        },
        {
          label: 'Saltwater Inverts',
          url: '/products/cleaner-crews',
          children: [
            { label: 'Cleaner Crews', url: '/products/cleaner-crews' }
          ]
        },
        {
          label: 'Anemones',
          url: '/products/livestock',
          children: []
        },
        {
          label: 'Clams',
          url: '/products/livestock',
          children: []
        }
      ],
      promos: [
        { img: TSAF + 'top-shelf-aquatics-macroalgae-trifecta-1161127572.webp?v=1746568318&width=800', text: 'Shop All Livestock', url: '/products/livestock' }
      ]
    },
    'Live Corals': {
      sidebar: [
        {
          label: 'Live Corals',
          url: '/products/corals-lps',
          children: [
            { label: 'Acropora', url: '/products/corals-sps' },
            { label: 'Chalice Corals', url: '/products/corals-lps' },
            { label: 'Goniopora', url: '/products/corals-lps' },
            { label: 'LPS Corals', url: '/products/corals-lps' },
            { label: 'Montipora', url: '/products/corals-sps' },
            { label: 'Soft Corals', url: '/products/corals-soft' },
            { label: 'SPS Corals', url: '/products/corals-sps' },
            { label: 'Torch Corals', url: '/products/corals-lps' },
            { label: 'Zoanthids', url: '/products/corals-misc' }
          ]
        },
        {
          label: 'WYSIWYG Corals',
          url: '/products/corals-misc',
          children: []
        },
        {
          label: 'Signature Corals',
          url: '/products/corals-misc',
          children: []
        },
        {
          label: 'LHA Vault',
          url: '/products/corals-misc',
          children: []
        },
        {
          label: 'Coral Colonies',
          url: '/products/corals-misc',
          children: []
        },
        {
          label: 'Beginner Corals',
          url: '/products/corals-soft',
          children: []
        },
        {
          label: 'Coral Frag Packs',
          url: '/products/corals-misc',
          children: []
        },
        {
          label: 'Anemones',
          url: '/products/livestock',
          children: []
        }
      ],
      promos: [
        { img: TSAF + 'top-shelf-aquatics-macroalgae-trifecta-1161127572.webp?v=1746568318&width=800', text: 'New Coral Arrivals', url: '/products/corals-lps' },
        { img: TSAF + 'saltwater-aquarium-copepods_a5676231-b226-4496-88cc-889633207dd0.jpg?v=1742313702&width=800', text: 'Visit Us In Store', url: '/contact-us' }
      ]
    },
    'Aquarium Supplies': {
      sidebar: [
        {
          label: 'Aquariums',
          url: '/products/aquariums',
          children: [
            { label: 'Aquariums', url: '/products/aquariums' },
            { label: 'Complete Systems', url: '/products/aquarium-complete-systems' },
            { label: 'Furniture', url: '/products/furniture' }
          ]
        },
        {
          label: 'Equipment',
          url: '/products/equipment',
          children: [
            { label: 'All Equipment', url: '/products/equipment' },
            { label: 'Lighting', url: '/products/lighting' },
            { label: 'Parts', url: '/products/parts' }
          ]
        },
        {
          label: 'Filtration',
          url: '/products/filtration',
          children: [
            { label: 'All Filtration', url: '/products/filtration' },
            { label: 'Water', url: '/products/water' }
          ]
        },
        {
          label: 'Food',
          url: '/products/food-dry',
          children: [
            { label: 'Dry Food', url: '/products/food-dry' },
            { label: 'Frozen Food', url: '/products/food-frozen' }
          ]
        },
        {
          label: 'Supplements',
          url: '/products/supplements',
          children: [
            { label: 'All Supplements', url: '/products/supplements' }
          ]
        },
        {
          label: 'Dry Goods',
          url: '/products/dry-goods',
          children: [
            { label: 'Dry Goods', url: '/products/dry-goods' },
            { label: 'Decoration', url: '/products/decoration' }
          ]
        }
      ],
      promos: [
        { img: TSAF + 'saltwater-aquarium-copepods_a5676231-b226-4496-88cc-889633207dd0.jpg?v=1742313702&width=800', text: 'Shop Best Sellers', url: '/products/equipment' }
      ]
    }
  };

  /* ── Build HTML for a menu ── */
  function buildMenu(config) {
    var html = '<div class="lm-wrap">';

    /* Sidebar */
    html += '<div class="lm-sidebar">';
    config.sidebar.forEach(function(cat, i) {
      html += '<a href="' + cat.url + '" data-idx="' + i + '"' + (i === 0 ? ' class="is-active"' : '') + '>';
      html += '<img src="' + gt(i) + '" alt="' + cat.label + '" loading="lazy">';
      html += cat.label + '</a>';
    });
    html += '</div>';

    /* Grid panels */
    html += '<div class="lm-grid-wrap">';
    config.sidebar.forEach(function(cat, i) {
      html += '<div class="lm-grid' + (i === 0 ? ' is-visible' : '') + '" data-grid="' + i + '">';

      if (cat.children.length > 0) {
        cat.children.forEach(function(child, ci) {
          html += '<a class="lm-grid-item" href="' + child.url + '">';
          html += '<img src="' + gi(ci + i * 4) + '" alt="' + child.label + '" loading="lazy">';
          html += '<span>' + child.label + '</span></a>';
        });
        html += '<div class="lm-viewall"><a href="' + cat.url + '">Go to ' + cat.label + ' &rarr;</a></div>';
      } else {
        html += '<div class="lm-empty">';
        html += '<p style="color:#888;font-size:14px;margin:0 0 4px">Browse our ' + cat.label + ' collection</p>';
        html += '<a href="' + cat.url + '">Shop ' + cat.label + '</a>';
        html += '</div>';
      }

      html += '</div>';
    });
    html += '</div>';

    /* Promos */
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

      /* Wire sidebar hover */
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

    /* Attach to nav items */
    nav.querySelectorAll('.root-item').forEach(function(rootEl) {
      var linkEl = rootEl.querySelector('a');
      if (!linkEl) return;
      var text = linkEl.textContent.trim();
      var config = menus[text];
      if (!config) return;

      /* Suppress Vue dropdown */
      new MutationObserver(function(mutations) {
        mutations.forEach(function(m) {
          for (var i = 0; i < m.addedNodes.length; i++) {
            var node = m.addedNodes[i];
            if (node.nodeType !== 1) continue;
            if (node.querySelectorAll && node.querySelectorAll('a').length > 0 && !node.classList.contains('relative')) {
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

    console.log('Lighthouse mega nav loaded');
  });
})();
