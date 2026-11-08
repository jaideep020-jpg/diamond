/* Injects the shared header and footer so both pages stay in sync. */
(function () {
  var page = document.body.getAttribute('data-page');
  var cur = function (p) { return page === p ? ' aria-current="page"' : ''; };
  document.getElementById('site-header').innerHTML =
    '<div class="wrap"><div class="nav">' +
    '<a class="logo" href="index.html">Aurelle</a>' +
    '<nav aria-label="Main">' +
    '<a href="products.html"' + cur('products') + '>Shop</a>' +
    '<a href="index.html#size">Size guide</a>' +
    '<a href="index.html#fourcs">The four Cs</a>' +
    '<a href="index.html#bespoke">Bespoke</a>' +
    '<a class="btn small" href="index.html#consult">Book a consultation</a>' +
    '</nav></div></div>';
  document.getElementById('site-footer').innerHTML =
    '<footer><div class="wrap"><div class="foot-top">' +
    '<div style="max-width:340px;display:flex;flex-direction:column;gap:12px">' +
    '<div class="logo" style="font-size:24px">Aurelle</div>' +
    '<p style="color:var(--muted);font-size:15px">Certified diamond jewelry, made to order. [YOUR BUSINESS ADDRESS]</p></div>' +
    '<div class="foot-cols">' +
    '<div><b>Shop</b><a href="products.html">All jewelry</a><a href="products.html?cat=rings">Engagement rings</a><a href="products.html?cat=bands">Wedding bands</a><a href="products.html?cat=earrings">Earrings</a></div>' +
    '<div><b>Learn</b><a href="index.html#size">Size guide</a><a href="index.html#fourcs">The four Cs</a><a href="index.html#bespoke">Bespoke process</a></div>' +
    '<div><b>Care</b><span>Shipping and returns</span><span>Warranty and resizing</span><span>Privacy policy</span></div>' +
    '</div></div>' +
    '<div class="legal">&copy; Aurelle Fine Diamonds. Lab-grown diamonds are described as lab-grown on every listing. [YOUR LEGAL BUSINESS NAME]</div>' +
    '</div></footer>';
})();
