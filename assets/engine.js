/* MySentinel Games — moteur de jeu commun (v2)
   - maquettes réalistes (assets/mockups.js), tampon verdict, mascotte
   - coup de pouce avant réponse, rattrapage après une erreur
   - 3 niveaux d'explications : débutant / je me débrouille / costaud
   Aucune donnée personnelle : seuls niveau et meilleur score restent dans le navigateur. */
(function () {
  "use strict";

  var G = window.GAME, M = window.MOCK;
  var $ = function (s) { return document.querySelector(s); };
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- utilitaires ---------- */
  function esc(s) { return M.esc(s); }
  function hash(str) {
    var h = 1779033703 ^ str.length;
    for (var i = 0; i < str.length; i++) { h = Math.imul(h ^ str.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
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
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
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
  function firstSentence(s) {
    var m = /^[^.!?]*[.!?]/.exec(s);
    return m ? m[0] : s;
  }
  function fmt(n) { return String(Math.round(n * 2) / 2).replace(".", ","); }
  function vibrate(p) { if (window.SFX) SFX.buzz(p); }
  function snd(name, n, delay) { if (window.SFX) SFX.play(name, n, delay); }

  /* ---------- paroles de la mascotte ---------- */
  var SAY = {
    scamRight: ["Bien vu, détective !", "Tu n'as pas mordu à l'hameçon !", "Nickel : les arnaqueurs te détestent déjà.", "Ton flair est affûté !"],
    legitRight: ["Exact, celui-là était réglo !", "Bien joué : se méfier de tout n'est pas la solution.", "Le bon réflexe : vérifier, puis faire confiance."],
    scamWrong: ["Aïe, celui-là était vicieux !", "Ils sont forts… mais toi aussi tu vas le devenir.", "Piégé ! Ça arrive même aux meilleurs."],
    legitWrong: ["Méfiance en mode turbo !", "Prudence, oui. Parano, pas trop : celui-là était réglo.", "Faux positif ! Mieux vaut trop prudent que pas assez."]
  };
  var CATCH = ["Rattrapé ! Tu avais le bon œil, juste un temps de retard.", "Bien vu : ton demi-point est sauvé.", "Voilà, tu as repéré le détail qui change tout."];
  var MISS = ["Pas celui-là, mais regarde les passages surlignés : tout y est.", "Raté, mais maintenant tu sais où regarder la prochaine fois."];

  /* ---------- état ---------- */
  var deck = [], idx = 0, results = [], mode = "daily", answered = false;
  var hintUsed = false, current = null, streak = 0, level = "inter", stage = "idle";

  function setLevel(l) { level = l; store("level", l); }

  /* ---------- confettis ---------- */
  function confetti(count, spread) {
    if (reduce) return;
    var c = $("#fx"); if (!c) return;
    var ctx = c.getContext("2d");
    c.width = window.innerWidth; c.height = window.innerHeight;
    var cols = ["#008080", "#f0a500", "#1e8e5a", "#e5604f", "#ffffff", "#7fd1d1"];
    var ps = [];
    for (var i = 0; i < count; i++) {
      ps.push({ x: c.width / 2 + (Math.random() - .5) * spread, y: c.height * .45, vx: (Math.random() - .5) * 11, vy: -Math.random() * 13 - 4, s: 6 + Math.random() * 7, r: Math.random() * 6.28, vr: (Math.random() - .5) * .4, col: cols[i % cols.length], life: 0 });
    }
    (function frame() {
      ctx.clearRect(0, 0, c.width, c.height);
      var alive = 0;
      ps.forEach(function (p) {
        p.vy += .36; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.life++;
        if (p.life < 150 && p.y < c.height + 20) {
          alive++;
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.col; ctx.globalAlpha = Math.max(0, 1 - p.life / 150);
          ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); ctx.restore();
        }
      });
      if (alive) requestAnimationFrame(frame); else ctx.clearRect(0, 0, c.width, c.height);
    })();
  }

  function countUp(el, target, ms) {
    if (reduce || target === 0) { el.textContent = fmt(target); return; }
    var t0 = null;
    (function step(t) {
      if (t0 === null) t0 = t;
      var p = Math.min(1, (t - t0) / ms), e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * e);
      if (p < 1) requestAnimationFrame(step);
    })(performance.now());
  }

  function toast(msg) {
    var el = $("#toast");
    el.textContent = msg; el.classList.remove("hidden");
    clearTimeout(toast.t); toast.t = setTimeout(function () { el.classList.add("hidden"); }, 3600);
  }

  /* ---------- partie ---------- */
  function startRound(m) {
    mode = m;
    var rnd = m === "daily" ? rng(hash(G.id + level + todayKey())) : Math.random;
    var pool = G.questions.filter(function (q) { return !q.level || q.level === level; });
    if (pool.length < G.roundSize) pool = G.questions;
    deck = shuffle(pool, rnd).slice(0, G.roundSize);
    idx = 0; results = []; streak = 0;
    $("#screen-intro").classList.add("hidden");
    $("#screen-result").classList.add("hidden");
    $("#screen-game").classList.remove("hidden");
    $("#modeLabel").textContent = m === "daily" ? "Partie du jour" : "Partie libre";
    renderQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderDots() {
    var h = "";
    for (var i = 0; i < deck.length; i++) {
      var c = i < results.length ? results[i].st : (i === idx ? "cur" : "");
      h += '<i class="' + c + '"></i>';
    }
    $("#dots").innerHTML = h;
    $("#dots").setAttribute("aria-label", "Question " + (idx + 1) + " sur " + deck.length);
  }

  function renderStreak(bump) {
    var s = $("#streak");
    if (streak >= 2) {
      s.classList.remove("hidden");
      $("#streakN").textContent = streak;
      s.style.setProperty("--k", Math.min(streak, 8));
      if (bump) snd("chime", streak - 2, 0.25);
      if (bump) { s.classList.remove("bump"); void s.offsetWidth; s.classList.add("bump"); }
    } else s.classList.add("hidden");
  }

  function renderQuestion() {
    current = deck[idx]; answered = false; hintUsed = false; stage = "ask";
    var wrap = $("#phoneWrap");
    wrap.innerHTML = (G.render || M.render)(current);
    var ph = wrap.firstChild;
    ph.classList.add("enter");
    $("#sheet").classList.add("hidden");
    $("#askBox").classList.remove("hidden");
    var labels = current.options || G.answerButtons;
    $("#ansA").querySelector("span").textContent = labels[0];
    $("#ansB").querySelector("span").textContent = labels[1];
    $("#ansA").disabled = $("#ansB").disabled = false;
    var hb = $("#btnHint");
    hb.classList.toggle("hidden", !(current.marks && current.marks.length));
    $("#hintBox").classList.add("hidden");
    renderDots(); renderStreak(false);
  }

  function revealMarks(ph) {
    ph.classList.add("show-marks");
    var ms = ph.querySelectorAll(".m");
    for (var i = 0; i < ms.length && i < 4; i++) (function (i) { setTimeout(function () { snd("tick", i); }, reduce ? 0 : 120 + i * 250); })(i);
    if (ms.length) { try { ms[0].scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" }); } catch (e) { /* ignoré */ } }
  }

  function useHint() {
    if (answered || hintUsed) return;
    hintUsed = true;
    revealMarks($("#phoneWrap").firstChild);
    $("#hintBox").innerHTML = '<div class="checklist"><b>4 questions à te poser :</b><ul>' +
      "<li>Qui écrit, et est-ce que je le connais ?</li><li>Y a-t-il une urgence ou une menace ?</li>" +
      "<li>Me demande-t-on de l'argent, un code ou un lien à ouvrir ?</li><li>Ai-je moi-même fait une demande ?</li></ul></div>";
    $("#hintBox").classList.remove("hidden");
    $("#btnHint").classList.add("hidden");
  }

  function stampOn(ph, key) {
    var st = ph.querySelector(".stamp");
    if (!st) return;
    st.textContent = G.stamps[key] || key.toUpperCase();
    st.classList.add(key === G.answerKeys[0] ? "scam" : "legit");
    void st.offsetWidth; st.classList.add("show");
    setTimeout(function () { snd(key === G.answerKeys[0] ? "stampScam" : "stampLegit"); vibrate(18); }, reduce ? 0 : 230);
  }

  function answer(choice) {
    if (answered) return;
    answered = true; stage = "feedback";
    var q = current;
    var good = choice === q.answer;
    var ph = $("#phoneWrap").firstChild;
    $("#ansA").disabled = $("#ansB").disabled = true;
    $("#askBox").classList.add("hidden");
    stampOn(ph, q.answer);
    ph.classList.add(good ? "hop" : "shake");
    if (!good) { setTimeout(function () { snd("soft"); vibrate([12, 40, 12]); }, reduce ? 0 : 420); }
    var scamQ = q.answer === G.answerKeys[0];
    if (good) {
      revealMarks(ph);
      commit(hintUsed ? "y" : "g");
      streak++;
      renderStreak(true);
      if (streak === 3 || streak === 5 || streak === 8) confetti(60, 200);
      openSheet({ mood: "happy", head: pick(scamQ ? SAY.scamRight : SAY.legitRight) + (hintUsed ? " (avec coup de pouce)" : ""), good: true });
    } else {
      streak = 0; renderStreak(false);
      openSheet({ mood: "ouch", head: pick(scamQ ? SAY.scamWrong : SAY.legitWrong), good: false, rattrapage: true });
    }
  }

  function commit(st) {
    results.push({ st: st, q: current });
    renderDots();
    var dots = $("#dots").children;
    if (dots[results.length - 1]) dots[results.length - 1].classList.add("pop");
    snd("pop", results.length);
  }

  /* ---------- feuille du coach ---------- */
  function buildChips(q) {
    var correct = pick(q.marks || []);
    if (!correct) return null;
    var raw = String(q.body).replace(/\[\[.+?\]\]/g, " ");
    var chunks = raw.split(/[.!?:\n«»]+/).map(function (s) { return s.trim(); }).filter(function (s) {
      if (s.length < 10 || s.length > 64) return false;
      return !(q.marks || []).some(function (m) { return s.indexOf(m) > -1 || m.indexOf(s) > -1; });
    });
    var seen = {}, uniq = [];
    chunks.forEach(function (c) { if (!seen[c]) { seen[c] = 1; uniq.push(c); } });
    var decoys = shuffle(uniq, Math.random).slice(0, 2);
    if (decoys.length < 1) return null;
    var items = shuffle([{ t: correct, ok: true }].concat(decoys.map(function (t) { return { t: t, ok: false }; })), Math.random);
    return items;
  }

  function openSheet(o) {
    var q = current;
    var sheet = $("#sheet");
    sheet.classList.remove("hidden");
    sheet.classList.remove("sheet-anim"); void sheet.offsetWidth; sheet.classList.add("sheet-anim");
    $("#mascot").innerHTML = M.mascot(o.mood);
    $("#coachHead").textContent = o.head;
    $("#rattrap").classList.add("hidden");
    $("#more").classList.add("hidden");
    $("#next").classList.add("hidden");
    $("#btnMore").classList.add("hidden");
    $("#coachText").textContent = "";
    var chips = o.rattrapage ? buildChips(q) : null;
    if (chips) {
      $("#coachText").textContent = "Pas de panique, tu peux rattraper un demi-point.";
      var scamQ = q.answer === G.answerKeys[0];
      $("#rtQ").textContent = scamQ ? G.rattrapage.arnaque : G.rattrapage.legit;
      var box = $("#chips"); box.innerHTML = "";
      chips.forEach(function (it) {
        var b = document.createElement("button");
        b.type = "button"; b.className = "chip"; b.textContent = "« " + it.t + " »";
        b.addEventListener("click", function () { resolveRattrapage(b, it.ok); });
        box.appendChild(b);
      });
      $("#rattrap").classList.remove("hidden");
      stage = "rattrap";
    } else {
      if (o.rattrapage) commit("r");
      showExplanation(o.good);
    }
  }

  function resolveRattrapage(btn, ok) {
    if (stage !== "rattrap") return;
    stage = "feedback";
    document.querySelectorAll("#chips .chip").forEach(function (c) { c.disabled = true; });
    btn.classList.add(ok ? "right" : "wrong");
    commit(ok ? "y" : "r");
    revealMarks($("#phoneWrap").firstChild);
    $("#rattrap").classList.add("hidden");
    $("#mascot").innerHTML = M.mascot(ok ? "happy" : "think");
    $("#coachHead").textContent = ok ? "Rattrapé !" : "Pas tout à fait…";
    if (ok) { vibrate(20); confetti(25, 120); }
    showExplanation(false, ok ? pick(CATCH) : pick(MISS));
  }

  function showExplanation(good, lead) {
    var q = current;
    var full = level === "debutant" || !good;
    var text = full ? q.explain : firstSentence(q.explain);
    $("#coachText").textContent = (lead ? lead + " " : "") + text;
    var clues = $("#clues"); clues.innerHTML = "";
    (q.clues || []).forEach(function (c) { var li = document.createElement("li"); li.textContent = c; clues.appendChild(li); });
    $("#tipLine").textContent = q.tip ? "💡 " + q.tip : "";
    var fb = $("#factBox");
    if (q.fact) {
      $("#factText").textContent = q.fact.t;
      var fs = $("#factSrc"); fs.textContent = "Source : " + q.fact.src + " ↗"; fs.href = q.fact.url;
      fb.classList.remove("hidden");
      fb.classList.remove("fact-in"); void fb.offsetWidth; fb.classList.add("fact-in");
    } else fb.classList.add("hidden");
    var pl = $("#protectList"); pl.innerHTML = "";
    (q.protect || []).forEach(function (t) { var li = document.createElement("li"); li.textContent = t; pl.appendChild(li); });
    $("#protectBox").classList.toggle("hidden", !(q.protect && q.protect.length));
    var hasMore = (q.clues && q.clues.length) || q.tip || (q.protect && q.protect.length);
    var open = level === "debutant";
    $("#more").classList.toggle("hidden", !(hasMore && open));
    var bm = $("#btnMore");
    bm.classList.toggle("hidden", !(hasMore && !open));
    bm.textContent = "Comprendre en détail";
    var nx = $("#next");
    nx.textContent = idx === deck.length - 1 ? "Voir mon résultat" : "Question suivante";
    nx.classList.remove("hidden");
    nx.focus({ preventScroll: true });
    var pan = $("#panel");
    if (pan.scrollTo) pan.scrollTo({ top: 0 });
  }

  function toggleMore() {
    var m = $("#more"); m.classList.toggle("hidden");
    $("#btnMore").textContent = m.classList.contains("hidden") ? "Comprendre en détail" : "Masquer le détail";
  }

  function next() {
    if (stage === "rattrap") return;
    if (stage === "leaving") return;
    var go = function () {
      if (idx < deck.length - 1) { idx++; renderQuestion(); window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); }
      else showResult();
    };
    var ph = $("#phoneWrap").firstChild;
    if (reduce || !ph) { go(); return; }
    stage = "leaving";
    ph.classList.add("leave");
    $("#sheet").classList.add("sheet-out");
    setTimeout(function () { $("#sheet").classList.remove("sheet-out"); go(); }, 190);
  }

  /* ---------- résultat ---------- */
  function showResult() {
    var greens = results.filter(function (r) { return r.st === "g"; }).length;
    var yellows = results.filter(function (r) { return r.st === "y"; }).length;
    var score = greens + yellows / 2;
    var total = deck.length;
    var best = parseFloat(store("best") || "0");
    if (mode === "daily") store("daily", todayKey() + ":" + fmt(score));
    var isBest = score > best;
    if (isBest) store("best", String(score));

    $("#screen-game").classList.add("hidden");
    var r = $("#screen-result"); r.classList.remove("hidden");
    var ratio = score / total, rank = G.ranks[0];
    G.ranks.forEach(function (x) { if (ratio >= x.min) rank = x; });
    $("#resTotal").textContent = " / " + total;
    countUp($("#resScoreN"), score, 1100);
    $("#resRank").textContent = rank.emoji + " " + rank.title;
    $("#resText").textContent = rank.text + (isBest && best > 0 ? " Nouveau record perso !" : "");
    var emo = { g: "🟩", y: "🟨", r: "🟥" };
    var grid = $("#resGrid"); grid.innerHTML = "";
    results.forEach(function (x, i) {
      var s = document.createElement("span"); s.textContent = emo[x.st];
      s.style.animationDelay = (0.9 + i * 0.12) + "s"; grid.appendChild(s);
    });
    r.dataset.share = G.title + " " + G.emoji + " — " + fmt(score) + "/" + total + "\n" +
      results.map(function (x) { return emo[x.st]; }).join("") + "\n🟩 du premier coup · 🟨 avec un coup de pouce\nSaurais-tu faire mieux ? " + location.href.split("#")[0];

    var rec = $("#recap"); rec.innerHTML = "";
    var missed = results.filter(function (x) { return x.st !== "g"; });
    if (!missed.length) {
      var li0 = document.createElement("li"); li0.textContent = "Sans faute, rien à revoir. Les arnaqueurs peuvent aller se rhabiller !"; rec.appendChild(li0);
    }
    missed.forEach(function (x) {
      var li = document.createElement("li");
      li.innerHTML = '<span class="st ' + x.st + '"></span><div><b>' + esc(G.channelLabels[x.q.channel] || x.q.channel) +
        " · " + esc(G.stamps[x.q.answer] || "") + "</b> " + esc(firstSentence(x.q.explain)) + (x.q.tip ? "<small>💡 " + esc(x.q.tip) + "</small>" : "") + "</div>";
      rec.appendChild(li);
    });
    $("#recapBox").classList.toggle("hidden", false);
    renderAffiliate();
    for (var i = 0; i < results.length && i < 12; i++) snd("pop", i, 0.9 + i * 0.12);
    snd("final", ratio >= .75 ? 1 : 0, 0.9 + results.length * 0.12 + 0.1);
    vibrate([15, 40, 15, 40, 30]);
    if (ratio >= .75) setTimeout(function () { confetti(ratio === 1 ? 160 : 90, 300); }, 600);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderAffiliate() {
    var box = $("#affil"), a = G.affiliate;
    if (!a || !a.url) { box.classList.add("hidden"); return; }
    box.innerHTML = "<strong>" + esc(a.title) + "</strong><p>" + esc(a.text) + "</p>" +
      '<a class="btn secondary" href="' + esc(a.url) + '" target="_blank" rel="sponsored nofollow noopener">' + esc(a.cta) + "</a>" +
      "<p><small>🔎 Transparence : ce lien est affilié. Si tu achètes via ce lien, MySentinel Games peut toucher une commission, sans frais pour toi. Ça ne change pas notre avis.</small></p>";
    box.classList.remove("hidden");
  }

  function share() {
    var text = $("#screen-result").dataset.share;
    if (navigator.share) { navigator.share({ text: text }).catch(function () { copyText(text); }); }
    else copyText(text);
  }
  function copyText(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(function () { toast("Résultat copié ! Colle-le où tu veux 😉"); }, function () { toast("Copie ce texte : " + text); });
    } else toast("Copie ce texte : " + text);
  }

  /* ---------- initialisation ---------- */
  function init() {
    document.title = G.title + " — MySentinel Games";
    $("#gameTitle").textContent = G.title;
    $("#gameIntro").textContent = G.intro;
    var best = store("best");
    if (best) $("#bestScore").textContent = "Ton meilleur score : " + fmt(parseFloat(best)) + " / " + G.roundSize;
    var d = store("daily");
    if (d && d.indexOf(todayKey() + ":") === 0) {
      $("#dailyDone").textContent = "Partie du jour déjà faite (" + d.split(":")[1] + "/" + G.roundSize + "). Reviens demain ou lance une partie libre !";
    }
    var saved = store("level");
    if (saved) level = saved;
    document.querySelectorAll('input[name="level"]').forEach(function (inp) {
      inp.checked = inp.value === level;
      inp.addEventListener("change", function () { setLevel(inp.value); });
    });

    $("#btnDaily").addEventListener("click", function () { startRound("daily"); });
    $("#btnFree").addEventListener("click", function () { startRound("free"); });
    $("#ansA").addEventListener("click", function () { answer(G.answerKeys[0]); });
    $("#ansB").addEventListener("click", function () { answer(G.answerKeys[1]); });
    $("#btnHint").addEventListener("click", useHint);
    $("#btnMore").addEventListener("click", toggleMore);
    $("#next").addEventListener("click", next);
    $("#btnShare").addEventListener("click", share);
    $("#btnReplay").addEventListener("click", function () { startRound("free"); });
    $("#rtSkip").addEventListener("click", function () {
      if (stage !== "rattrap") return;
      document.querySelectorAll("#chips .chip").forEach(function (c) { c.disabled = true; });
      stage = "feedback"; commit("r");
      revealMarks($("#phoneWrap").firstChild);
      $("#rattrap").classList.add("hidden");
      showExplanation(false);
    });

    /* faux liens : on explique au lieu d'ouvrir */
    $("#phoneWrap").addEventListener("click", function (e) {
      var t = e.target.closest ? e.target.closest(".fakelink") : null;
      if (t) toast("Lien factice : rien ne s'ouvre. En vrai, on ne clique pas avant de vérifier !");
    });
    $("#phoneWrap").addEventListener("keydown", function (e) {
      if ((e.key === "Enter" || e.key === " ") && e.target.classList && e.target.classList.contains("fakelink")) { e.preventDefault(); e.target.click(); }
    });

    document.querySelectorAll("form.nl").forEach(function (f) {
      f.addEventListener("submit", function (e) {
        var url = f.getAttribute("data-action");
        if (!url) { e.preventDefault(); toast("La newsletter ouvre très bientôt, merci de ton intérêt ! 💌"); }
        else f.setAttribute("action", url);
      });
    });

    if ("serviceWorker" in navigator && location.protocol.indexOf("http") === 0) {
      navigator.serviceWorker.register("../sw.js").catch(function () {});
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
