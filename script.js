(function () {
  var hero = document.getElementById("hero");
  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!hero) return;

  if (reduceMotion) {
    root.style.setProperty("--lid-open", "0.35");
    return;
  }

  function update() {
    var rect = hero.getBoundingClientRect();
    var heroHeight = hero.offsetHeight || 1;
    // ヒーローが画面上部を通過し始めてからの進行度(0〜1)
    var progress = (0 - rect.top) / (heroHeight * 0.7);
    progress = Math.max(0, Math.min(1, progress));
    root.style.setProperty("--lid-open", String(progress));
  }

  // 初回はわずかに開いた状態から始め、静止画でも「動いている」ことが伝わるようにする
  root.style.setProperty("--lid-open", "0");
  requestAnimationFrame(function () {
    root.style.setProperty("--lid-open", "0.12");
  });

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
})();
