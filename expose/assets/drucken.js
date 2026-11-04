// Voll-Exposé: Knopf „Drucken oder als PDF speichern“ (statt onclick, damit die CSP kein 'unsafe-inline' braucht)
(function () {
  'use strict';
  document.querySelectorAll('[data-drucken]').forEach(function (b) { b.addEventListener('click', function () { window.print(); }); });
})();
