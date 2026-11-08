/* Carat size guide: face-up diameter of a well-cut round brilliant, about 6.5 mm x cube root of carat. */
(function () {
  var slider = document.getElementById('carat');
  var caratText = document.getElementById('caratText');
  var mmText = document.getElementById('mmText');
  var outer = document.getElementById('gemOuter');
  var inner = document.getElementById('gemInner');
  var table = document.getElementById('gemTable');
  var PX_PER_MM_RADIUS = 12; // matches the dashed reference rings

  function update() {
    var carat = parseFloat(slider.value);
    var mm = 6.5 * Math.pow(carat, 1 / 3);
    var r = mm * PX_PER_MM_RADIUS;
    var t = r * 0.55, pts = [];
    for (var i = 0; i < 8; i++) {
      var a = Math.PI / 8 + i * (Math.PI / 4);
      pts.push((130 + t * Math.cos(a)).toFixed(1) + ',' + (130 + t * Math.sin(a)).toFixed(1));
    }
    caratText.textContent = carat.toFixed(1);
    mmText.textContent = mm.toFixed(1);
    outer.setAttribute('r', r.toFixed(1));
    inner.setAttribute('r', (r * 0.8).toFixed(1));
    table.setAttribute('points', pts.join(' '));
  }
  slider.addEventListener('input', update);
  update();
})();
