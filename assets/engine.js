/* MySentinel Games — moteur de quiz commun
   Chaque jeu fournit window.GAME (voir arnaque/data.js).
   Aucune donnée personnelle collectée ; seul le meilleur score reste dans le navigateur. */
(function () {
  "use strict";

  var G = window.GAME;
  var $ = function (s) { return document.querySelector(s); };

  /* ---------- utilitaires ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function hash(str) {
    var h = 1779033703 ^ str.length;
    for (var i = 0; i < str.length; i++) {
      h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
      h = (h << 13) | (h >>> 19);
    }
    return h >>> 0;
  }
  function rng(seed) {
    var a = seed;
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function shuffle(arr, rnd) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rnd() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function todayKey() {
    var d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function store(key, val) {
    try {
      if (val === undefined) return localStorage.getItem(G.id + ":" + key);
      localStorage.setItem(G.id + ":" + key, val);
    } catch (e) { return null; }
  }

  /* ---------- état ---------- */
  var deck = [], idx = 0, results = [], mode = "daily", answered = false;

  function startRound(m) {
    mode = m;
    var rnd = m === "daily" ? rng(hash(G.id + todayKey())) : Math.random;
    deck = shuffle(G.questions, rnd).slice(0, G.roundSize);
    idx = 0; results = []; answered = false;
    $("#screen-intro").classList.add("hidden");
    $("#screen-result").classList.add("hidden");
    $("#screen-game").classList.remove("hidden");
    renderQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function fmtBody(q) {
    // [[texte]] devient un faux lien non cliquable
    return esc(q.body).replace(/\[\[(.+?)\]\]/g, '<span class="fakelink" title="Faux lien : non cliquable">$1</span>');
  }

  function renderQuestion() {
    var q = deck[idx];
    answered = false;
    $("#bar").style.width = (idx / deck.length * 100) + "%";
    $("#count").textContent = "Question " + (idx + 1) + " / " + deck.length;
    $("#modeLabel").textContent = mode === "daily" ? "Partie du jour" : "Partie libre";
    var cls = q.channel === "sms" ? "sms" : q.channel === "appel" ? "call" : q.channel === "rue" ? "street" : "";
    var html = '<div class="channel">' + esc(G.channelLabels[q.channel] || q.channel) + "</div>";
    html += '<div class="message ' + cls + '">';
    if (q.from) html += '<div class="from">' + esc(q.from) + "</div>";
    if (q.subject) html += '<div class="subject">' + esc(q.subject) + "</div>";
    html += '<div class="body">' + fmtBody(q) + "</div></div>";
    html += '<p class="question">' + esc(G.question) + "</p>";
    $("#qcard").innerHTML = html;
    $("#feedback").classList.add("hidden");
    $("#answers").classList.remove("hidden");
    $("#next").classList.add("hidden");
    var btns = document.querySelectorAll("#answers button");
    btns.forEach(function (b) { b.disabled = false; });
  }

  function answer(choice) {
    if (answered) return;
    answered = true;
    var q = deck[idx];
    var good = choice === q.answer;
    results.push(good);
    var fb = $("#feedback");
    fb.className = "feedback " + (good ? "good" : "bad");
    var title = good ? G.goodTitle : G.badTitle;
    var html = "<h3>" + esc(title) + " " + esc(q.answer === G.answerKeys[0] ? G.answerLabels[0] : G.answerLabels[1]) + "</h3>";
    html += "<p>" + esc(q.explain) + "</p>";
    if (q.clues && q.clues.length) {
      html += "<ul>" + q.clues.map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("") + "</ul>";
    }
    if (q.tip) html += '<p class="tip">💡 ' + esc(q.tip) + "</p>";
    fb.innerHTML = html;
    fb.classList.remove("hidden");
    $("#answers").classList.add("hidden");
    var next = $("#next");
    next.textContent = idx === deck.length - 1 ? "Voir mon résultat" : "Question suivante →";
    next.classList.remove("hidden");
    next.focus();
  }

  function next() {
    if (idx < deck.length - 1) { idx++; renderQuestion(); }
    else showResult();
  }

  function showResult() {
    var score = results.filter(Boolean).length;
    var best = parseInt(store("best") || "0", 10);
    if (mode === "daily") store("daily", todayKey() + ":" + score);
    if (score > best) store("best", String(score));
    $("#screen-game").classList.add("hidden");
    var r = $("#screen-result");
    r.classList.remove("hidden");
    var ratio = score / deck.length;
    var rank = G.ranks[0];
    G.ranks.forEach(function (x) { if (ratio >= x.min) rank = x; });
    $("#bar").style.width = "100%";
    $("#resScore").textContent = score + " / " + deck.length;
    $("#resRank").textContent = rank.emoji + " " + rank.title;
    $("#resText").textContent = rank.text;
    var grid = results.map(function (g) { return g ? "🟩" : "🟥"; }).join("");
    $("#resGrid").textContent = grid;
    r.dataset.share = G.title + " " + G.emoji + " — " + score + "/" + deck.length + "\n" + grid + "\nEt toi, tu tiendrais le coup ? " + location.href.split("#")[0];
    renderAffiliate();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderAffiliate() {
    var box = $("#affil");
    var a = G.affiliate;
    if (!a || !a.url) { box.classList.add("hidden"); return; }
    box.innerHTML =
      "<strong>" + esc(a.title) + "</strong><p>" + esc(a.text) + "</p>" +
      '<a class="btn secondary" href="' + esc(a.url) + '" target="_blank" rel="sponsored nofollow noopener">' + esc(a.cta) + "</a>" +
      "<p><small>🔎 Transparence : ce lien est affilié. Si tu achètes via ce lien, MySentinel Games peut toucher une commission, sans frais pour toi. Ça ne change pas notre avis.</small></p>";
    box.classList.remove("hidden");
  }

  function share() {
    var text = $("#screen-result").dataset.share;
    if (navigator.share) {
      navigator.share({ text: text }).catch(function () {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(function () { flash("Résultat copié ! Colle-le où tu veux 😉"); });
    } else {
      flash("Copie ce texte : " + text);
    }
  }
  function flash(msg) {
    var el = $("#flash");
    el.textContent = msg;
    el.classList.remove("hidden");
    setTimeout(function () { el.classList.add("hidden"); }, 3500);
  }

  /* ---------- initialisation ---------- */
  function init() {
    document.title = G.title + " — MySentinel Games";
    $("#gameTitle").textContent = G.emoji + " " + G.title;
    $("#gameIntro").textContent = G.intro;
    var best = store("best");
    if (best) $("#bestScore").textContent = "Ton meilleur score : " + best + " / " + G.roundSize;
    var d = store("daily");
    if (d && d.indexOf(todayKey() + ":") === 0) {
      $("#dailyDone").textContent = "Tu as déjà fait la partie du jour (" + d.split(":")[1] + "/" + G.roundSize + "). Reviens demain ou lance une partie libre !";
    }
    $("#btnDaily").addEventListener("click", function () { startRound("daily"); });
    $("#btnFree").addEventListener("click", function () { startRound("free"); });
    $("#ansA").addEventListener("click", function () { answer(G.answerKeys[0]); });
    $("#ansB").addEventListener("click", function () { answer(G.answerKeys[1]); });
    $("#ansA").textContent = G.answerButtons[0];
    $("#ansB").textContent = G.answerButtons[1];
    $("#next").addEventListener("click", next);
    $("#btnShare").addEventListener("click", share);
    $("#btnReplay").addEventListener("click", function () { startRound("free"); });

    document.querySelectorAll("form.nl").forEach(function (f) {
      f.addEventListener("submit", function (e) {
        var url = f.getAttribute("data-action");
        if (!url) { e.preventDefault(); flash("La newsletter ouvre très bientôt, merci de ton intérêt ! 💌"); }
        else { f.setAttribute("action", url); }
      });
    });

    if ("serviceWorker" in navigator && location.protocol.indexOf("http") === 0) {
      navigator.serviceWorker.register("../sw.js").catch(function () {});
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
