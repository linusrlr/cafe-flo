// Fortschreitende Verbesserung für das Freigabe-Formular. Ohne JavaScript funktioniert alles per normalem POST.
(function () {
  'use strict';
  var form = document.getElementById('anfrage');
  if (!form) return;
  var start = Date.now();
  var sofortBlock = document.getElementById('sofort-erklaerungen');
  var sofortBoxen = sofortBlock ? sofortBlock.querySelectorAll('input[type=checkbox]') : [];
  var zus = document.getElementById('zusammenfassung');
  var meldung = document.getElementById('meldung');

  // Formular-Token vom Server: signiert, mit Zeitstempel, nur einmal verwendbar (Bot- und Replay-Schutz ohne Drittanbieter)
  function holeToken() {
    if (!window.fetch || !form.elements.ft || !form.elements.objekt) return;
    fetch('/anfrage.php?ft=' + encodeURIComponent(form.elements.objekt.value), { headers: { 'Accept': 'application/json' }, credentials: 'same-origin' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) { if (j && j.ft) form.elements.ft.value = j.ft; })
      .catch(function () { /* ohne Token geht es trotzdem, nur mit strengerem Limit */ });
  }
  holeToken();

  // Datum „nach Ablauf der Widerrufsfrist“ konkret anzeigen
  var abTage = parseInt(form.getAttribute('data-ab-tage') || '0', 10);
  if (abTage) {
    var d = new Date(); d.setDate(d.getDate() + abTage);
    var txt = d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
    document.querySelectorAll('[data-ab-datum]').forEach(function (el) { el.textContent = 'ab ' + txt; });
  }

  function beginn() { var r = form.querySelector('input[name=beginn]:checked'); return r ? r.value : ''; }
  function aktualisiereBeginn() {
    var b = beginn();
    if (sofortBlock) {
      sofortBlock.hidden = b !== 'sofort';
      sofortBoxen.forEach(function (c) { c.required = b === 'sofort'; if (b !== 'sofort') c.checked = false; });
    }
    zusammenfassen();
  }
  function wert(n) { var e = form.elements[n]; return e ? (e.value || '').trim() : ''; }
  function zusammenfassen() {
    if (!zus) return;
    var b = beginn();
    var teile = [];
    teile.push('<strong>Name:</strong> ' + esc(wert('name') || '–'));
    teile.push('<strong>E-Mail:</strong> ' + esc(wert('email') || '–'));
    teile.push('<strong>Telefon:</strong> ' + esc(wert('telefon') || 'keine Angabe'));
    teile.push('<strong>Exposé:</strong> ' + (b === 'sofort' ? 'sofort' : b === 'nach_frist' ? 'nach Ablauf der Widerrufsfrist' : 'noch nicht gewählt'));
    var n = form.querySelectorAll('input[type=checkbox][name^="erklaerung"]:checked').length;
    teile.push('<strong>Bestätigte Erklärungen:</strong> ' + n);
    zus.innerHTML = '<p>Bitte prüfen Sie Ihre Angaben. Fehler können Sie oben direkt korrigieren.</p><p>' + teile.join('<br>') + '</p>';
    zus.hidden = false;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  form.addEventListener('change', aktualisiereBeginn);
  form.addEventListener('input', zusammenfassen);
  aktualisiereBeginn();

  function zeigeFehler(fehler) {
    form.querySelectorAll('.fehlermeldung[data-js]').forEach(function (e) { e.remove(); });
    form.querySelectorAll('.check.fehlt').forEach(function (e) { e.classList.remove('fehlt'); });
    var erstes = null;
    Object.keys(fehler || {}).forEach(function (k) {
      var el = form.querySelector('[name="' + k + '"]') || form.querySelector('[data-feld="' + k + '"]');
      if (!el) return;
      var box = el.closest('.check, .feld, fieldset') || el.parentNode;
      if (box.classList.contains('check')) box.classList.add('fehlt');
      var p = document.createElement('p'); p.className = 'fehlermeldung'; p.setAttribute('data-js', '1'); p.textContent = fehler[k];
      box.appendChild(p);
      if (!erstes) erstes = el;
    });
    if (erstes) erstes.focus();
  }

  function pruefeLokal() {
    var f = {};
    if (!wert('name')) f.name = 'Bitte geben Sie Ihren Vor- und Nachnamen an.';
    if (!wert('email')) f.email = 'Bitte geben Sie Ihre E-Mail-Adresse an.';
    else if (!form.elements.email.checkValidity()) f.email = 'Bitte prüfen Sie die E-Mail-Adresse, zum Beispiel name@beispiel.de.';
    if (wert('telefon') && !form.elements.telefon.checkValidity()) f.telefon = 'Bitte prüfen Sie die Telefonnummer. Erlaubt sind Ziffern, Leerzeichen und + ( ) / -.';
    if (form.querySelector('input[name=beginn]') && !beginn()) f.beginn = 'Bitte wählen Sie, wann Sie das Exposé erhalten möchten.';
    form.querySelectorAll('input[type=checkbox][required]').forEach(function (c) {
      if (!c.checked) f[c.name] = 'Bitte bestätigen Sie diese Erklärung, sonst kann ich das Exposé nicht freigeben.';
    });
    return f;
  }

  form.addEventListener('submit', function (ev) {
    form.elements.t.value = String(Date.now() - start);
    form.elements.js.value = '1';
    var lokal = pruefeLokal();
    form.classList.add('versucht');
    if (Object.keys(lokal).length) {
      ev.preventDefault();
      meldung.textContent = 'Bitte prüfen Sie die markierten Angaben.';
      meldung.hidden = false;
      zeigeFehler(lokal);
      return;
    }
    if (!window.fetch || !window.FormData) return; // normaler POST
    ev.preventDefault();
    var knopf = form.querySelector('button[type=submit]');
    knopf.disabled = true;
    // als application/x-www-form-urlencoded (der Server nimmt kein multipart an)
    fetch(form.action, { method: 'POST', body: new URLSearchParams(new FormData(form)), headers: { 'Accept': 'application/json' }, credentials: 'same-origin' })
      .then(function (r) { return r.json().then(function (j) { return { status: r.status, j: j }; }); })
      .then(function (res) {
        if (res.j && res.j.ok && res.j.weiter) { window.location.href = res.j.weiter; return; }
        knopf.disabled = false;
        if (res.status === 409 || res.status === 400) holeToken();
        meldung.textContent = (res.j && res.j.meldung) || 'Das hat nicht geklappt. Bitte versuchen Sie es noch einmal.';
        meldung.hidden = false;
        zeigeFehler(res.j && res.j.fehler);
        if (!res.j || !res.j.fehler) meldung.scrollIntoView({ behavior: 'smooth', block: 'center' });
      })
      .catch(function () { knopf.disabled = false; form.submit(); });
  });
})();
