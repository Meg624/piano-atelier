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

/* ---------- 白/黒ピアノ テーマ切り替え ---------- */
(function () {
  var toggle = document.getElementById("themeToggle");
  var body = document.getElementById("pianoBody");
  var lid = document.getElementById("pianoLid");
  var root = document.documentElement;

  if (!toggle || !body || !lid) return;

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    var fillUrl = theme === "white" ? "url(#lacquer-white)" : "url(#lacquer)";
    var strokeColor = theme === "white" ? "#C9BFA8" : "#000";
    body.setAttribute("fill", fillUrl);
    body.setAttribute("stroke", strokeColor);
    lid.setAttribute("fill", fillUrl);
    lid.setAttribute("stroke", strokeColor);
    toggle.setAttribute("aria-pressed", theme === "white" ? "true" : "false");
    toggle.textContent = theme === "white" ? "Black Piano に切り替え" : "White Piano に切り替え";
  }

  toggle.addEventListener("click", function () {
    var current = root.getAttribute("data-theme") || "noir";
    applyTheme(current === "white" ? "noir" : "white");
  });
})();
