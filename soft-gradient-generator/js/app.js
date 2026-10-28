(function(){
  var scene = document.getElementById('scene');
  var toast = document.getElementById('toast');
  var hint = document.getElementById('hint');

  // a fixed rotation of pleasant, distinct hue families to pull random
  // blob colors from, so shuffles stay "nice" rather than fully arbitrary —
  // pick 2-3 random hues from here each time, each with randomized
  // saturation/lightness/position for real variety.
  var HUES = [265, 24, 205, 340, 45, 160, 300, 190, 10, 130, 250, 60];

  function pick(arr){ return arr[Math.floor(Math.random() * arr.length)]; }
  function rand(min, max){ return Math.random() * (max - min) + min; }

  function randomHues(count){
    var pool = HUES.slice();
    var out = [];
    for (var i = 0; i < count; i++){
      var idx = Math.floor(Math.random() * pool.length);
      out.push(pool[idx]);
      pool.splice(idx, 1);
    }
    return out;
  }

  // current palette kept as structured data (not re-parsed from CSS strings
  // later) so the CSS preview and the canvas export always agree exactly.
  var currentBlobs = [];
  var currentBase = '';

  function generateScene(){
    var blobCount = Math.random() < 0.5 ? 2 : 3;
    var hues = randomHues(blobCount);

    currentBlobs = hues.map(function(hue){
      return {
        hue: hue,
        sat: Math.round(rand(55, 78)),
        light: Math.round(rand(52, 68)),
        alpha: parseFloat(rand(0.55, 0.85).toFixed(2)),
        x: Math.round(rand(15, 85)),
        y: Math.round(rand(10, 90)),
        spreadW: Math.round(rand(45, 65)),
        spreadH: Math.round(rand(40, 60))
      };
    });

    // neutral base — alternates a light and dark ground so the palette
    // doesn't always sit on the same backdrop
    var baseLight = Math.random() < 0.5;
    currentBase = baseLight
      ? { h: hues[0], s: 20, l: 95 }
      : { h: hues[0], s: 22, l: 12 };

    var layers = currentBlobs.map(function(b){
      return 'radial-gradient(' + b.spreadW + '% ' + b.spreadH + '% at ' + b.x + '% ' + b.y + '%, ' +
        'hsla(' + b.hue + ', ' + b.sat + '%, ' + b.light + '%, ' + b.alpha + '), transparent)';
    });
    layers.push('hsl(' + currentBase.h + ', ' + currentBase.s + '%, ' + currentBase.l + '%)');

    scene.style.background = layers.join(', ');
  }

  function showToast(msg){
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function(){ toast.classList.remove('show'); }, 1600);
  }

  document.getElementById('shuffleBtn').addEventListener('click', function(){
    generateScene();
    hint.style.opacity = '0';
  });

  document.getElementById('downloadBtn').addEventListener('click', function(){
    // Re-render the exact current gradient (including its blur) onto an
    // offscreen canvas at the real viewport resolution, since backdrop-filter
    // itself can't be rasterized directly from the DOM.
    var w = window.innerWidth, h = window.innerHeight;
    var scale = Math.min(2, window.devicePixelRatio || 1);
    var canvas = document.createElement('canvas');
    canvas.width = w * scale;
    canvas.height = h * scale;
    var ctx = canvas.getContext('2d');
    ctx.scale(scale, scale);

    // paint from the same structured blob data that drives the CSS preview —
    // no re-parsing of CSS strings, so the export always matches what's shown.
    ctx.fillStyle = 'hsl(' + currentBase.h + ', ' + currentBase.s + '%, ' + currentBase.l + '%)';
    ctx.fillRect(0, 0, w, h);

    ctx.filter = 'blur(' + Math.round(60 * scale) + 'px)';
    currentBlobs.forEach(function(b){
      var spreadW = (b.spreadW / 100) * w;
      var spreadH = (b.spreadH / 100) * h;
      var cx = (b.x / 100) * w;
      var cy = (b.y / 100) * h;
      var color = 'hsla(' + b.hue + ', ' + b.sat + '%, ' + b.light + '%, ' + b.alpha + ')';
      var r = Math.max(spreadW, spreadH) * 1.15;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(spreadW / r, spreadH / r);
      var grad = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
      grad.addColorStop(0, color);
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(-r, -r, r * 2, r * 2);
      ctx.restore();
    });
    ctx.filter = 'none';

    canvas.toBlob(function(blob){
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'gradient-background-' + Date.now() + '.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function(){ URL.revokeObjectURL(url); }, 2000);
      showToast('Saved as PNG');
    }, 'image/png');
  });

  generateScene();
})();
