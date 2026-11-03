// Progressive Enhancement der Formulare (ohne JS funktionieren sie als normaler POST).
const start = performance.now();

function sichtbarkeit(form) {
  for (const feld of form.querySelectorAll('[data-sichtbar-wenn]')) {
    const bed = JSON.parse(feld.dataset.sichtbarWenn);
    const ok = Object.entries(bed).every(([n, w]) => form.elements[n]?.value === w);
    feld.hidden = !ok;
    for (const e of feld.querySelectorAll('input,select,textarea')) e.disabled = !ok;
  }
}

function setzeFehler(form, name, text) {
  const feld = form.querySelector(`[data-feld="${name}"]`);
  if (!feld) return null;
  const out = feld.querySelector('.fehlertext');
  if (out) out.textContent = text || '';
  const eingaben = feld.querySelectorAll('input,select,textarea');
  eingaben.forEach((e) => (text ? e.setAttribute('aria-invalid', 'true') : e.removeAttribute('aria-invalid')));
  return eingaben[0] ?? null;
}

function meldung(e, form) {
  const label = form.querySelector(`label[for="${e.id}"]`)?.firstChild?.textContent?.trim() ?? 'dieses Feld';
  const v = e.validity;
  if (v.valueMissing) return e.name === 'ort' ? 'Bitte wählen Sie den Ort der Wohnung.' : `Bitte geben Sie ${label} an.`;
  if (v.typeMismatch && e.type === 'email') return 'Bitte prüfen Sie die E-Mail-Adresse, zum Beispiel name@beispiel.de.';
  if (v.patternMismatch && e.type === 'tel') return 'Bitte prüfen Sie die Telefonnummer. Erlaubt sind Ziffern, Leerzeichen und + ( ) / -.';
  if (v.rangeUnderflow || v.rangeOverflow || v.badInput || v.stepMismatch) return `Bitte geben Sie einen Wert zwischen ${e.min} und ${e.max} an.`;
  if (v.tooLong) return `Bitte kürzen Sie auf höchstens ${e.maxLength} Zeichen.`;
  return e.validationMessage;
}

/** Prüft die Felder eines Containers, gibt Liste [{name, text, el}] zurück. */
function pruefe(form, container) {
  const fehler = [];
  for (const e of container.querySelectorAll('input:not([type=hidden]):not([type=checkbox]),select,textarea')) {
    if (e.disabled || e.closest('.hp')) continue;
    const name = e.closest('[data-feld]')?.dataset.feld;
    if (!name) continue;
    if (!e.checkValidity()) { fehler.push({ name, text: meldung(e, form), el: e }); setzeFehler(form, name, fehler.at(-1).text); }
    else setzeFehler(form, name, '');
  }
  // E-Mail oder Telefon
  const em = form.elements.email, tel = form.elements.telefon;
  if (em && tel && container.contains(em) && !em.value.trim() && !tel.value.trim()) {
    const t = 'Bitte geben Sie eine E-Mail-Adresse oder eine Telefonnummer an.';
    for (const n of ['email', 'telefon']) { setzeFehler(form, n, t); fehler.push({ name: n, text: t, el: form.elements[n] }); }
  }
  return fehler;
}

function zusammenfassung(form, fehler, titel) {
  const box = form.querySelector('.fehler-zusammenfassung');
  if (!fehler.length && !titel) { box.hidden = true; box.innerHTML = ''; return; }
  box.innerHTML = '';
  const h = document.createElement('h3'); h.textContent = titel || form.dataset.fehlerPruefen; box.append(h);
  if (fehler.length) {
    const ul = document.createElement('ul');
    for (const f of fehler) {
      const li = document.createElement('li'); const a = document.createElement('a');
      a.href = '#' + (f.el?.id ?? ''); a.textContent = f.text;
      a.addEventListener('click', (ev) => { ev.preventDefault(); zeigeSchrittVon(form, f.el); f.el?.focus(); });
      li.append(a); ul.append(li);
    }
    box.append(ul);
  }
  box.hidden = false;
  box.focus();
}

let zeigeSchrittVon = () => {};

function mehrstufig(form) {
  const schritte = [...form.querySelectorAll('fieldset.schritt')];
  const n = schritte.length;
  const status = form.querySelector('.schritt-status');
  const prog = form.querySelector('progress');
  const absenden = form.querySelector('.formular-fuss');
  form.classList.add('js-schritte');
  form.querySelector('.fortschritt').hidden = false;
  form.querySelectorAll('.schritt-nav').forEach((x) => (x.hidden = false));
  let aktuell = 1;
  function zeige(i, fokus = true) {
    aktuell = i;
    schritte.forEach((s, k) => (s.hidden = k !== i - 1));
    absenden.hidden = i !== n;
    status.textContent = `Schritt ${i} von ${n}`;
    prog.value = i; prog.textContent = `Schritt ${i} von ${n}`;
    if (fokus) schritte[i - 1].querySelector('legend').focus();
  }
  zeigeSchrittVon = (f, el) => { const s = el?.closest('fieldset.schritt'); if (s) zeige(+s.dataset.schritt, false); };
  form.addEventListener('click', (ev) => {
    const b = ev.target.closest('button');
    if (!b) return;
    if (b.hasAttribute('data-weiter')) {
      const fehler = pruefe(form, schritte[aktuell - 1]);
      if (fehler.length) { fehler[0].el.focus(); return; }
      zusammenfassung(form, []);
      history.pushState({ schritt: aktuell + 1 }, '', `?schritt=${aktuell + 1}#${form.parentElement.id}`);
      zeige(aktuell + 1);
    } else if (b.hasAttribute('data-zurueck')) history.back();
  });
  window.addEventListener('popstate', (ev) => zeige(ev.state?.schritt ?? 1));
  const q = new URLSearchParams(location.search).get('schritt');
  // Neuladen mitten im Formular: zurück auf Schritt 1 (Daten werden nicht zwischengespeichert)
  if (q) history.replaceState({ schritt: 1 }, '', location.pathname + '#' + form.parentElement.id);
  else history.replaceState({ schritt: 1 }, '');
  zeige(1, false);
}

for (const form of document.querySelectorAll('form[data-formular]')) {
  form.noValidate = true;
  sichtbarkeit(form);
  form.addEventListener('change', () => sichtbarkeit(form));
  // "keine" bei Außenflächen schließt andere aus
  form.addEventListener('change', (ev) => {
    const e = ev.target;
    if (e.name !== 'aussenflaechen[]' || !e.checked) return;
    for (const x of form.querySelectorAll('input[name="aussenflaechen[]"]')) if ((e.value === 'keine') !== (x.value === 'keine')) x.checked = false;
  });
  if (form.classList.contains('mehrstufig')) mehrstufig(form);
  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    form.elements.t.value = String(Math.round(performance.now() - start));
    form.elements.js.value = '1';
    const fehler = pruefe(form, form);
    if (fehler.length) { zeigeSchrittVon(form, fehler[0].el); zusammenfassung(form, fehler); return; }
    const knopf = form.querySelector('[data-absenden]');
    knopf.disabled = true;
    try {
      const r = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      const j = await r.json();
      if (j.ok) { location.assign(j.weiter); return; }
      const liste = Object.entries(j.fehler ?? {}).map(([name, text]) => ({ name, text, el: setzeFehler(form, name, text) }));
      if (liste[0]) zeigeSchrittVon(form, liste[0].el);
      zusammenfassung(form, liste, j.meldung);
    } catch {
      zusammenfassung(form, [], form.dataset.fehlerVersand);
    }
    knopf.disabled = false;
  });
}
