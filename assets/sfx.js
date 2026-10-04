/* Sons doux synthétisés (WebAudio) : aucun fichier audio, aucune ressource externe.
   Désactivés par défaut. Un seul bouton "sons" active aussi les micro-vibrations. */
(function () {
  var KEY = "msg:sfx";
  var ctx = null, master = null, noiseBuf = null, lastT = 0;
  var on = false;
  try { on = localStorage.getItem(KEY) === "1"; } catch (e) { on = false; }

  function ensure() {
    if (ctx) return ctx;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    try {
      ctx = new AC();
      var comp = ctx.createDynamicsCompressor();
      master = ctx.createGain(); master.gain.value = 0.18;
      master.connect(comp); comp.connect(ctx.destination);
      var n = Math.floor(ctx.sampleRate * 0.1);
      noiseBuf = ctx.createBuffer(1, n, ctx.sampleRate);
      var d = noiseBuf.getChannelData(0);
      for (var i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    } catch (e) { ctx = null; }
    return ctx;
  }

  /* oscillateur à enveloppe douce (attaque 5 ms, décroissance exponentielle) */
  function tone(f, t, dur, type, g, slideTo) {
    var o = ctx.createOscillator(), a = ctx.createGain();
    o.type = type || "sine";
    o.frequency.setValueAtTime(f, t);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
    a.gain.setValueAtTime(0.0001, t);
    a.gain.exponentialRampToValueAtTime(g, t + 0.005);
    a.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(a); a.connect(master);
    o.start(t); o.stop(t + dur + 0.02);
  }
  function noise(t, dur, freq, q, g, kind) {
    var s = ctx.createBufferSource(); s.buffer = noiseBuf;
    var f = ctx.createBiquadFilter(); f.type = kind || "bandpass"; f.frequency.value = freq; f.Q.value = q || 1;
    var a = ctx.createGain();
    a.gain.setValueAtTime(g, t);
    a.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(a); a.connect(master);
    s.start(t); s.stop(t + dur + 0.02);
  }
  var PENTA = [523.25, 587.33, 659.25, 783.99, 880, 1046.5];

  var SOUNDS = {
    tap: function (t) { var k = 0.96 + Math.random() * 0.08; noise(t, 0.03, 1800 * k, 1.2, 0.5); tone(180 * k, t, 0.035, "sine", 0.25); },
    stampScam: function (t) { tone(130, t, 0.12, "sine", 0.9, 48); noise(t, 0.05, 700, 0.8, 0.5, "lowpass"); },
    stampLegit: function (t) { tone(150, t, 0.1, "sine", 0.7, 60); noise(t, 0.04, 900, 0.8, 0.35, "lowpass"); tone(660, t + 0.07, 0.12, "sine", 0.18); },
    pop: function (t, n) { var f = PENTA[(n || 0) % PENTA.length]; tone(f * 0.7, t, 0.08, "sine", 0.5, f * 1.15); },
    chime: function (t, n) {
      var f = PENTA[Math.min(Math.max(n || 0, 0), PENTA.length - 1)];
      tone(f, t, 0.6, "sine", 0.35); tone(f * 2, t, 0.45, "sine", 0.09);
    },
    soft: function (t) { tone(220, t, 0.14, "sine", 0.3, 165); },
    tick: function (t, n) { tone(900 + (n || 0) * 120, t, 0.045, "triangle", 0.2); },
    final: function (t, n) {
      var ch = n === 1 ? [523.25, 659.25, 783.99] : [523.25, 659.25];
      ch.forEach(function (f, i) { tone(f, t + i * 0.09, 0.7, "sine", 0.3); tone(f * 2, t + i * 0.09, 0.5, "sine", 0.07); });
    }
  };

  var SFX = {
    get on() { return on; },
    unlock: function () { var c = ensure(); if (c && c.state === "suspended") c.resume(); },
    set: function (v, silent) {
      on = !!v;
      try { localStorage.setItem(KEY, on ? "1" : "0"); } catch (e) { /* ignoré */ }
      if (on && !silent) { this.unlock(); this.play("pop", 2); }
      document.querySelectorAll("[data-sfx-toggle]").forEach(function (b) {
        b.setAttribute("aria-pressed", on ? "true" : "false");
        var ic = b.querySelector(".ic"); if (ic) ic.textContent = on ? "🔊" : "🔇";
        var lb = b.querySelector(".lb"); if (lb) lb.textContent = on ? "Sons activés" : "Activer les sons";
      });
    },
    toggle: function () { this.set(!on); },
    play: function (name, n, delay) {
      if (!on || document.hidden || !SOUNDS[name]) return;
      var c = ensure(); if (!c || c.state !== "running") return;
      var now = c.currentTime;
      if (!delay && now - lastT < 0.06 && name !== "final") return; /* anti-empilement */
      lastT = now;
      try { SOUNDS[name](now + (delay || 0), n); } catch (e) { /* ignoré */ }
    },
    /* vibration : suit le même interrupteur, et jamais en mode "réduire les animations" */
    buzz: function (p) {
      try {
        if (!on || !navigator.vibrate) return;
        if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        navigator.vibrate(p);
      } catch (e) { /* ignoré */ }
    }
  };
  window.SFX = SFX;

  document.addEventListener("pointerdown", function () { if (on) SFX.unlock(); }, { passive: true });
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-sfx-toggle]").forEach(function (b) {
      b.addEventListener("click", function () { SFX.toggle(); });
    });
    SFX.set(on, true); /* synchronise les boutons (sans jouer de son si désactivé) */
    /* tap doux sur les boutons du jeu (pointerdown : pas de latence) */
    document.addEventListener("pointerdown", function (e) {
      var t = e.target.closest ? e.target.closest(".btn, .chip, .lvl, .link-btn") : null;
      if (t && !t.disabled) SFX.play("tap");
    }, { passive: true });
  });
})();
