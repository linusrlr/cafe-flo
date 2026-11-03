// Menü (Kopfzeile) und Anrufleiste. Ohne JS: "Menü" springt zur Seitenliste in der Fußzeile.
const knopf = document.querySelector('.burger');
const link = document.querySelector('.burger-link');
const menue = document.getElementById('hauptmenue');
const kopf = document.getElementById('kopf');
if (knopf && menue) {
  knopf.hidden = false;
  if (link) link.hidden = true;
  const setze = (offen) => {
    menue.classList.toggle('open', offen);
    knopf.setAttribute('aria-expanded', String(offen));
    kopf.classList.toggle('navopen', offen);
    document.body.classList.toggle('navopen', offen);
  };
  knopf.addEventListener('click', () => setze(knopf.getAttribute('aria-expanded') !== 'true'));
  document.getElementById('navscrim')?.addEventListener('click', () => setze(false));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && knopf.getAttribute('aria-expanded') === 'true') { setze(false); knopf.focus(); }
  });
}

const leiste = document.querySelector('.anrufleiste');
if (leiste) {
  document.body.classList.add('hat-leiste');
  let fokusImFormular = false;
  const pruefe = () => leiste.classList.toggle('sichtbar', window.scrollY > 300 && !fokusImFormular);
  window.addEventListener('scroll', pruefe, { passive: true });
  document.addEventListener('focusin', (e) => { fokusImFormular = !!e.target.closest?.('form'); pruefe(); });
  document.addEventListener('focusout', () => { fokusImFormular = false; pruefe(); });
  pruefe();
}
