/* MySentinel Games — maquettes d'écrans (téléphone, boîte mail, appel…)
   Tout est dessiné en HTML/CSS/SVG : aucune marque réelle, aucune image externe.
   Les passages marqués (marks) sont surlignés quand .show-marks est présent sur la maquette. */
(function () {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  var O = "", C = "";

  /* Texte riche : passages marqués + faux liens [[…]] */
  function rich(raw, marks) {
    var t = String(raw == null ? "" : raw);
    (marks || []).forEach(function (m) {
      var k = t.indexOf(m);
      if (k < 0) return;
      var before = t.slice(0, k);
      if (before.split(O).length !== before.split(C).length) return; // déjà dans un passage marqué
      t = before + O + m + C + t.slice(k + m.length);
    });
    t = esc(t);
    t = t.replace(/\[\[(.+?)\]\]/g, '<span class="fakelink" role="button" tabindex="0">$1</span>');
    return t.replace(new RegExp(O, "g"), '<mark class="m">').replace(new RegExp(C, "g"), "</mark>");
  }

  var IC = {
    person: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="9" r="4"/><path d="M4 21c1-6 15-6 16 0z"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    reply: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 8L4 13l6 5v-3.5c5 0 8 1.5 10 5-.5-6-4-9.5-10-10z"/></svg>',
    fwd: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8l6 5-6 5v-3.5c-5 0-8 1.5-10 5 .5-6 4-9.5 10-10z"/></svg>',
    trash: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8h12l-1 12H7zM9 4h6l1 2H8z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 3.5c-1.6 0-2.6 1.3-2.2 3.3 1.2 5.9 5.4 10.2 11.3 11.3 2 .4 3.3-.6 3.3-2.2l-.3-2.6-3.9-.9-1.7 1.7c-2.4-1.2-4-2.8-5.2-5.2l1.7-1.7-.9-3.9z"/></svg>',
    bell: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a6 6 0 0 0-6 6v4l-2 3h16l-2-3V9a6 6 0 0 0-6-6zM10 19a2 2 0 0 0 4 0z"/></svg>',
    status: '<svg viewBox="0 0 60 12" aria-hidden="true"><rect x="0" y="7" width="3" height="5" rx="1"/><rect x="5" y="5" width="3" height="7" rx="1"/><rect x="10" y="2" width="3" height="10" rx="1"/><path d="M22 4.5a8 8 0 0 1 11 0M24.5 7a4.5 4.5 0 0 1 6 0" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="27.5" cy="10" r="1.3"/><rect x="40" y="2" width="17" height="9" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.3"/><rect x="42" y="4" width="11" height="5" rx="1.2"/><rect x="58" y="5" width="2" height="3" rx="1"/></svg>'
  };

  var HUES = [172, 28, 200, 340, 260, 48];
  function hue(name) {
    var h = 0; for (var i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
    return HUES[h % HUES.length];
  }
  function initial(name) {
    var m = String(name).replace(/[^A-Za-zÀ-ÿ0-9]/g, " ").trim();
    return m ? m.charAt(0).toUpperCase() : "?";
  }
  function splitFrom(from) {
    var m = /^(.*?)\s*<(.+)>$/.exec(from || "");
    return m ? { name: m[1], addr: m[2] } : { name: from || "Expéditeur inconnu", addr: "" };
  }
  function splitQuote(body) {
    var i = String(body).indexOf(" : « ");
    if (i > 0) return { desc: body.slice(0, i), quote: body.slice(i + 5).replace(/\s*»\s*$/, "") };
    return { desc: "", quote: String(body).replace(/^«\s*/, "").replace(/\s*»\s*$/, "") };
  }

  /* ----- applications ----- */
  function appSms(q, tm) {
    return '<div class="app app-sms">' +
      '<div class="sms-head"><span class="back">' + IC.chevron + '</span><span class="avatar">' + IC.person + '</span>' +
      '<div class="who"><b>' + rich(q.from, q.marks) + '</b><small>Message texte</small></div></div>' +
      '<div class="sms-body"><div class="day">Aujourd\'hui · ' + tm + '</div>' +
      '<div class="bubble in">' + rich(q.body, q.marks) + '</div></div>' +
      '<div class="sms-input"><span>Message texte</span></div></div>';
  }

  function appMail(q, tm) {
    var f = splitFrom(q.from);
    return '<div class="app app-mail">' +
      '<div class="mail-top"><span class="back">' + IC.chevron + '</span><span>Boîte de réception</span></div>' +
      '<div class="mail-scroll"><div class="mail-subject">' + rich(q.subject || "(sans objet)", q.marks) + '</div>' +
      '<div class="mail-meta"><span class="avatar" style="background:hsl(' + hue(f.name) + ' 55% 42%)">' + esc(initial(f.name)) + '</span>' +
      '<div><b>' + rich(f.name, q.marks) + '</b>' +
      (f.addr ? '<small class="addr">&lt;' + rich(f.addr, q.marks) + '&gt;</small>' : "") +
      '<small>À : moi · ' + tm + '</small></div></div>' +
      '<div class="mail-body">' + rich(q.body, q.marks) + '</div></div>' +
      '<div class="mail-actions"><span>' + IC.reply + 'Répondre</span><span>' + IC.fwd + 'Transférer</span><span>' + IC.trash + '</span></div></div>';
  }

  function appCall(q) {
    var sq = splitQuote(q.body);
    return '<div class="app app-call"><div class="call-top">Appel entrant…</div>' +
      '<div class="avatar big pulse">' + IC.person + '</div>' +
      '<div class="call-name">' + rich(q.from, q.marks) + '</div><div class="call-sub">mobile</div>' +
      '<div class="captions"><div class="cap-label">Ce que dit ton interlocuteur</div>' +
      (sq.desc ? '<div class="cap-desc">' + rich(sq.desc, q.marks) + "</div>" : "") +
      '<div class="cap">« ' + rich(sq.quote, q.marks) + ' »</div></div>' +
      '<div class="call-btns"><span class="decline">' + IC.phone + '</span><span class="accept">' + IC.phone + "</span></div></div>";
  }

  function appVideo(q) {
    var sq = splitQuote(q.body);
    return '<div class="app app-video"><div class="live"><i></i>EN DIRECT</div>' +
      '<div class="face glitch"><svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="48" r="22"/><path d="M18 120c4-34 80-34 84 0z"/></svg></div>' +
      '<div class="call-name">' + rich(q.from, q.marks) + '</div>' +
      '<div class="captions"><div class="cap-label">Sous-titres</div>' +
      (sq.desc ? '<div class="cap-desc">' + rich(sq.desc, q.marks) + "</div>" : "") +
      '<div class="cap">« ' + rich(sq.quote, q.marks) + ' »</div></div></div>';
  }

  function appDm(q, tm) {
    return '<div class="app app-dm"><div class="dm-head"><span class="back">' + IC.chevron + '</span>' +
      '<span class="avatar" style="background:hsl(' + hue(q.from) + ' 55% 42%)">' + esc(initial(q.from)) + '</span>' +
      '<div class="who"><b>' + rich(q.from, q.marks) + '</b><small>Message privé</small></div></div>' +
      '<div class="dm-body"><div class="day">' + tm + '</div><div class="bubble in">' + rich(q.body, q.marks) + '</div>' +
      '<div class="typing"><i></i><i></i><i></i></div></div></div>';
  }

  function appAd(q, tm, icon) {
    return '<div class="app app-ad"><div class="ad-top">Petites annonces · Messages</div>' +
      '<div class="ad-item"><span class="ad-pic">' + (icon || "") + '</span><div><b>Ton annonce</b><small>Article en vente · en ligne</small></div></div>' +
      '<div class="dm-body"><div class="day">' + tm + '</div><div class="from-line">' + rich(q.from, q.marks) + '</div>' +
      '<div class="bubble in">' + rich(q.body, q.marks) + '</div></div></div>';
  }

  function appLock(q, tm) {
    return '<div class="app app-lock"><div class="lock-time">' + tm + '</div><div class="lock-date">Aujourd\'hui</div>' +
      '<div class="notif"><span class="notif-ic">' + IC.bell + '</span><div><b>' + rich(q.from, q.marks) + '</b><small>maintenant</small>' +
      '<p>' + rich(q.body, q.marks) + '</p></div></div></div>';
  }

  /* ----- scènes hors téléphone ----- */
  function sceneStreet(q, icon) {
    return '<div class="scene scene-street"><div class="scene-pic">' + (icon || "") + '</div>' +
      '<div class="scene-label">' + rich(q.from || "Dans la rue", q.marks) + '</div>' +
      '<p class="scene-text">' + rich(q.body, q.marks) + '</p></div>';
  }

  function sceneSpeaker(q) {
    var sq = splitQuote(q.body);
    return '<div class="scene scene-speaker"><div class="speaker"><i></i><i></i><i></i><span></span></div>' +
      '<div class="scene-label">' + rich(q.from, q.marks) + '</div>' +
      (sq.desc ? '<p class="scene-desc">' + rich(sq.desc, q.marks) + '</p>' : "") +
      '<p class="scene-text">« ' + rich(sq.quote, q.marks) + ' »</p></div>';
  }

  function wrapPhone(q, inner, tm, dark) {
    return '<div class="phone' + (dark ? " dark" : "") + '" data-ch="' + esc(q.channel) + '"><span class="notch"></span>' +
      '<div class="phone-screen"><div class="statusbar"><span>' + tm + '</span><span class="sb-ic">' + IC.status + '</span></div>' + inner + '</div>' +
      '<div class="stamp" aria-hidden="true"></div></div>';
  }
  function wrapScene(q, inner) {
    return '<div class="phone-less" data-ch="' + esc(q.channel) + '">' + inner + '<div class="stamp" aria-hidden="true"></div></div>';
  }

  function render(q) {
    var tm = q.time || "14:32";
    var icon = (q.img && window.ILLUS && window.ILLUS[q.img]) ? window.ILLUS[q.img] : "";
    switch (q.channel) {
      case "email": return wrapPhone(q, appMail(q, tm), tm);
      case "appel": return wrapPhone(q, appCall(q), tm, true);
      case "video": return wrapPhone(q, appVideo(q), tm, true);
      case "reseau": return wrapPhone(q, appDm(q, tm), tm);
      case "annonce": return wrapPhone(q, appAd(q, tm, icon), tm);
      case "appli": return wrapPhone(q, appLock(q, tm), tm, true);
      case "rue": return wrapScene(q, sceneStreet(q, icon));
      case "enceinte": return wrapScene(q, sceneSpeaker(q));
      default: return wrapPhone(q, appSms(q, tm), tm);
    }
  }

  /* Mascotte « Sentinelle » */
  function mascot(mood) {
    var mouth = {
      happy: '<path d="M38 56q12 12 24 0" fill="none" stroke="#0b3b3b" stroke-width="3.5" stroke-linecap="round"/><circle cx="33" cy="52" r="4" fill="#f4a3a3" opacity=".8"/><circle cx="67" cy="52" r="4" fill="#f4a3a3" opacity=".8"/>',
      ouch: '<path d="M38 60q4-5 8 0t8 0 8 0" fill="none" stroke="#0b3b3b" stroke-width="3.2" stroke-linecap="round"/><path d="M72 30q4 6 0 10q-4-4 0-10z" fill="#7fd1ff"/>',
      think: '<path d="M40 58h20" fill="none" stroke="#0b3b3b" stroke-width="3.5" stroke-linecap="round"/><path d="M34 38l12-3" stroke="#0b3b3b" stroke-width="3" stroke-linecap="round"/>'
    }[mood] || "";
    return '<svg class="mascot-svg ' + mood + '" viewBox="0 0 100 110" role="img" aria-label="Sentinelle, la mascotte">' +
      '<path d="M50 6l38 13v30c0 28-17 46-38 55C29 95 12 77 12 49V19z" fill="#008080"/>' +
      '<path d="M50 14l30 10v25c0 22-13 37-30 45C33 86 20 71 20 49V24z" fill="#e6f4f4"/>' +
      '<g class="eyes"><ellipse cx="38" cy="44" rx="4.5" ry="5.5" fill="#0b3b3b"/><ellipse cx="62" cy="44" rx="4.5" ry="5.5" fill="#0b3b3b"/></g>' +
      mouth + "</svg>";
  }

  window.MOCK = { render: render, mascot: mascot, esc: esc, rich: rich };
})();
