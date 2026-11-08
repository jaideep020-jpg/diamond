/* Sample catalogue. Replace with your real products (or load from your store's API). */
var PRODUCTS = [
  { id: 1,  name: 'The Solitaire',       cat: 'rings',    type: 'natural', metal: 'platinum', spec: '1.00 ct round, F, VS1',        price: 8900 },
  { id: 2,  name: 'The Solitaire, Lab',  cat: 'rings',    type: 'lab',     metal: 'gold',     spec: '1.50 ct round, F, VS1',        price: 3200 },
  { id: 3,  name: 'Halo No. 2',          cat: 'rings',    type: 'natural', metal: 'rose',     spec: '0.80 ct oval, G, VS2, halo',   price: 5400 },
  { id: 4,  name: 'Three-Stone',         cat: 'rings',    type: 'lab',     metal: 'platinum', spec: '2.00 ct total, emerald cut',   price: 4600 },
  { id: 5,  name: 'Plain Band',          cat: 'bands',    type: 'natural', metal: 'gold',     spec: '2.5 mm, polished',             price: 640 },
  { id: 6,  name: 'Pavé Band',           cat: 'bands',    type: 'natural', metal: 'rose',     spec: '0.30 ct total, pavé set',      price: 1850 },
  { id: 7,  name: 'Eternity Band',       cat: 'bands',    type: 'lab',     metal: 'platinum', spec: '1.20 ct total, full circle',   price: 2300 },
  { id: 8,  name: 'Classic Studs',       cat: 'earrings', type: 'natural', metal: 'gold',     spec: '0.50 ct total, four-prong',    price: 1900 },
  { id: 9,  name: 'Classic Studs, Lab',  cat: 'earrings', type: 'lab',     metal: 'platinum', spec: '2.00 ct total, four-prong',    price: 1750 },
  { id: 10, name: 'Drop Earrings',       cat: 'earrings', type: 'natural', metal: 'rose',     spec: '0.60 ct total, pear drops',    price: 2600 },
  { id: 11, name: 'Bezel Pendant',       cat: 'pendants', type: 'lab',     metal: 'gold',     spec: '0.75 ct round, 18 in chain',   price: 1250 },
  { id: 12, name: 'Solitaire Pendant',   cat: 'pendants', type: 'natural', metal: 'platinum', spec: '0.40 ct round, 18 in chain',   price: 1700 }
];

var METAL = { gold: '#B08D3C', platinum: '#6B7788', rose: '#B76E5F' };
var METAL_NAME = { gold: '18k yellow gold', platinum: 'Platinum', rose: '18k rose gold' };
var INK = '#0C1424';

function art(cat, metal) {
  var m = METAL[metal];
  var gem = function (x, y, s) {
    return '<polygon points="' + (x - s) + ',' + y + ' ' + (x - s * .5) + ',' + (y - s * .7) + ' ' + (x + s * .5) + ',' + (y - s * .7) + ' ' + (x + s) + ',' + y + ' ' + x + ',' + (y + s * 1.2) + '" fill="#FFFFFF" stroke="' + INK + '" stroke-width="1.5" stroke-linejoin="round"/>' +
      '<line x1="' + (x - s) + '" y1="' + y + '" x2="' + (x + s) + '" y2="' + y + '" stroke="' + INK + '" stroke-width="1.5"/>';
  };
  var body = '';
  if (cat === 'rings') {
    body = '<ellipse cx="60" cy="82" rx="30" ry="28" fill="none" stroke="' + m + '" stroke-width="5"/>' + gem(60, 46, 11);
  } else if (cat === 'bands') {
    body = '<ellipse cx="60" cy="62" rx="32" ry="34" fill="none" stroke="' + m + '" stroke-width="9"/>';
  } else if (cat === 'earrings') {
    body = '<line x1="32" y1="30" x2="32" y2="48" stroke="' + m + '" stroke-width="3"/>' + gem(32, 60, 12) +
           '<line x1="88" y1="30" x2="88" y2="48" stroke="' + m + '" stroke-width="3"/>' + gem(88, 60, 12);
  } else {
    body = '<path d="M16,16 Q60,100 104,16" fill="none" stroke="' + m + '" stroke-width="3"/>' + gem(60, 76, 11);
  }
  return '<svg viewBox="0 0 120 120" aria-hidden="true">' + body + '</svg>';
}

function money(n) { return '$' + n.toLocaleString('en-US'); }

var state = { cat: 'all', type: 'all', sort: 'featured' };
var CATS = ['all', 'rings', 'bands', 'earrings', 'pendants'];

// allow links like products.html?cat=rings
var qs = new URLSearchParams(window.location.search).get('cat');
if (qs && CATS.indexOf(qs) > -1) state.cat = qs;

function render() {
  var list = PRODUCTS.filter(function (p) {
    return (state.cat === 'all' || p.cat === state.cat) && (state.type === 'all' || p.type === state.type);
  });
  if (state.sort === 'low') list.sort(function (a, b) { return a.price - b.price; });
  if (state.sort === 'high') list.sort(function (a, b) { return b.price - a.price; });

  document.getElementById('count').textContent = list.length + (list.length === 1 ? ' piece' : ' pieces');
  document.getElementById('products').innerHTML = list.length ? list.map(function (p) {
    var subject = encodeURIComponent('Enquiry: ' + p.name);
    return '<article class="product">' +
      '<div class="art">' + art(p.cat, p.metal) + '</div>' +
      '<div class="info">' +
      '<span class="tag' + (p.type === 'lab' ? ' lab' : '') + '">' + (p.type === 'lab' ? 'Lab-grown' : 'Natural') + '</span>' +
      '<h3>' + p.name + '</h3>' +
      '<div class="meta">' + p.spec + '<br>' + METAL_NAME[p.metal] + '</div>' +
      '<div class="foot"><span class="amt">' + money(p.price) + '</span>' +
      '<a class="btn small" href="mailto:hello@yourdomain.com?subject=' + subject + '">Enquire</a></div>' +
      '</div></article>';
  }).join('') : '<p class="empty">No pieces match these filters. Try another category or diamond type.</p>';

  Array.prototype.forEach.call(document.querySelectorAll('#chips .chip'), function (b) {
    b.setAttribute('aria-pressed', String(b.getAttribute('data-cat') === state.cat));
  });
}

document.getElementById('chips').addEventListener('click', function (e) {
  var b = e.target.closest('.chip');
  if (!b) return;
  state.cat = b.getAttribute('data-cat');
  render();
});
document.getElementById('type').addEventListener('change', function (e) { state.type = e.target.value; render(); });
document.getElementById('sort').addEventListener('change', function (e) { state.sort = e.target.value; render(); });
render();
