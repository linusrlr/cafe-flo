// JSON-LD nach bauplan/03-strukturierte-daten.md. Werte aus fakten.yaml; null-Werte entfallen samt Schlüssel.
import { F, firma, wertOderNull, erlaubnisErteilt, ORTE } from './fakten.mjs';
import { BASIS_URL, seiteFuer, alleSeiten, RUBRIKEN } from './inhalte.mjs';

const B = BASIS_URL;
const KREISE = { leonberg: 'Landkreis Böblingen', heimsheim: 'Enzkreis', ditzingen: 'Landkreis Ludwigsburg', renningen: 'Landkreis Böblingen' };
const stadt = (k) => ({
  '@type': 'City', name: ORTE[k], sameAs: `https://de.wikipedia.org/wiki/${ORTE[k]}`,
  ...(KREISE[k] ? { containedInPlace: { '@type': 'AdministrativeArea', name: KREISE[k] } } : {}),
});
const STAEDTE = ['leonberg', 'heimsheim', 'ditzingen', 'renningen', 'pforzheim'].map(stadt);

function berlinIso(datum) {
  if (!datum) return undefined;
  const d = new Date(datum + 'T00:00:00Z');
  // Sommerzeit grob: letzter Sonntag März bis letzter Sonntag Oktober
  const j = d.getUTCFullYear();
  const lastSun = (m) => { const x = new Date(Date.UTC(j, m + 1, 0)); x.setUTCDate(x.getUTCDate() - x.getUTCDay()); return x; };
  const sommer = d >= lastSun(2) && d < lastSun(9);
  return `${datum}T00:00:00${sommer ? '+02:00' : '+01:00'}`;
}
const sauber = (o) => JSON.parse(JSON.stringify(o, (k, v) => (v === null || v === undefined || (Array.isArray(v) && !v.length) ? undefined : v)));

function organisation() {
  const behoerdeOk = F.erlaubnis.behoerde.status === 'geprueft';
  return {
    '@type': 'RealEstateAgent', '@id': `${B}/#organisation`,
    name: firma.name, alternateName: `${firma.name}, ${firma.inhaber}`, url: `${B}/`,
    logo: { '@type': 'ImageObject', '@id': `${B}/#logo`, url: `${B}/og/logo-512.png`, width: 512, height: 512 },
    image: `${B}/og/standard.jpg`,
    telephone: firma.telefonSchema, email: firma.email,
    founder: { '@id': `${B}/#linus` }, employee: { '@id': `${B}/#linus` },
    description: `Makler für Eigentumswohnungen in ${F.firma.orte.wert}. Provision ${F.provision.satz.wert} je Seite inkl. USt.`,
    priceRange: `Provision ${F.provision.satz.wert} je Seite inkl. USt`,
    knowsLanguage: 'de', areaServed: STAEDTE,
    address: firma.anschrift && typeof firma.anschrift === 'object' ? { '@type': 'PostalAddress', addressRegion: 'Baden-Württemberg', addressCountry: 'DE', ...firma.anschrift } : null,
    _behoerdeOk: behoerdeOk,
  };
}
function person() {
  const credential = erlaubnisErteilt && F.erlaubnis.erteilt_am.status === 'geprueft' && F.erlaubnis.behoerde.status === 'geprueft'
    ? { '@type': 'EducationalOccupationalCredential', name: 'Erlaubnis nach § 34c Abs. 1 Satz 1 Nr. 1 GewO (Immobilienmakler)',
        credentialCategory: 'Gewerbeerlaubnis', dateCreated: String(F.erlaubnis.erteilt_am.wert),
        recognizedBy: { '@type': 'Organization', name: F.erlaubnis.behoerde.wert } }
    : null;
  return {
    '@type': 'Person', '@id': `${B}/#linus`, name: firma.inhaber, givenName: 'Linus', familyName: 'Rössler',
    jobTitle: 'Immobilienmakler für Eigentumswohnungen', url: `${B}/ueber-mich/`, image: `${B}/og/linus-roessler.jpg`,
    worksFor: { '@id': `${B}/#organisation` },
    knowsAbout: ['Eigentumswohnung', 'Wohnungseigentumsgesetz', 'Immobilienbewertung', 'Maklerrecht'],
    hasCredential: credential,
  };
}

/** Graph für eine Seite. `r` = Ergebnis von rendere(), `bild` = absolute Hero-URL oder null. */
export function graph(seite, r, bild) {
  if (seite.noindex) return null;
  const can = B + seite.url;
  const org = organisation();
  delete org._behoerdeOk;
  const g = [org, person(), { '@type': 'WebSite', '@id': `${B}/#website`, url: `${B}/`, name: firma.name, inLanguage: 'de-DE', publisher: { '@id': `${B}/#organisation` } }];
  const typ = seite.typ === 'person' ? 'ProfilePage' : seite.typ === 'kontakt' ? 'ContactPage' : seite.typ === 'hub' ? 'CollectionPage' : 'WebPage';
  const geaendert = berlinIso(seite.aktualisiertAm ?? seite.standIso);
  const webpage = {
    '@type': typ, '@id': `${can}#webpage`, url: can, name: r.titel, description: r.beschreibung, inLanguage: 'de-DE',
    isPartOf: { '@id': `${B}/#website` },
    about: seite.typ === 'person' ? undefined : { '@id': `${B}/#organisation` },
    mainEntity: seite.typ === 'person' ? { '@id': `${B}/#linus` } : undefined,
    breadcrumb: seite.url === '/' ? undefined : { '@id': `${can}#breadcrumb` },
    primaryImageOfPage: bild ?? undefined,
    dateModified: geaendert,
  };
  if (seite.typ === 'ort' && seite.ort) {
    webpage.about = { '@type': 'City', '@id': `${can}#ort`, name: ORTE[seite.ort], sameAs: `https://de.wikipedia.org/wiki/${ORTE[seite.ort]}` };
    webpage.mentions = { '@id': `${B}/#organisation` };
    webpage.author = { '@id': `${B}/#linus` };
    webpage.datePublished = berlinIso(seite.veroeffentlichtAm);
  }
  if (seite.typ === 'hub') {
    const kinder = alleSeiten().filter((s) => s.gebaut && s.typ === (seite.url === '/aktuell/' ? 'aktuell' : 'ratgeber'));
    webpage.mainEntity = { '@type': 'ItemList', itemListElement: kinder.map((s, i) => ({ '@type': 'ListItem', position: i + 1, url: B + s.url, name: s.kurztitel })) };
  }
  g.push(webpage);
  if (seite.url !== '/') g.push({ '@type': 'BreadcrumbList', '@id': `${can}#breadcrumb`, itemListElement: brotkrumen(seite).map((k, i, a) => ({ '@type': 'ListItem', position: i + 1, name: k.name, item: i < a.length - 1 ? B + k.url : undefined })) });
  if (['ratgeber', 'aktuell', 'bewertung'].includes(seite.typ)) {
    g.push({
      '@type': 'Article', '@id': `${can}#artikel`, mainEntityOfPage: { '@id': `${can}#webpage` },
      headline: r.h1Text.slice(0, 110), description: r.beschreibung, inLanguage: 'de-DE',
      image: [bild ?? `${B}/og/standard.jpg`], author: { '@id': `${B}/#linus` }, publisher: { '@id': `${B}/#organisation` },
      datePublished: berlinIso(seite.veroeffentlichtAm ?? seite.standIso), dateModified: geaendert,
      articleSection: RUBRIKEN[seite.rubrik], wordCount: r.woerter,
      about: [{ '@type': 'Thing', name: 'Eigentumswohnung' }], spatialCoverage: STAEDTE,
      citation: r.quellen.filter((q) => q.url).slice(0, 30).map((q) => ({ '@type': 'CreativeWork', name: q.text.slice(0, 150), url: q.url })),
    });
  }
  const service = (name, serviceType, extra = {}) => ({ '@type': 'Service', '@id': `${can}#leistung`, name, serviceType, provider: { '@id': `${B}/#organisation` }, areaServed: STAEDTE, ...extra });
  if (seite.typ === 'bewertung') g.push(service('Kostenlose Ersteinschätzung für Eigentumswohnungen', 'Immobilienbewertung (Ersteinschätzung, kein Gutachten)', {
    description: 'Schriftliche Ersteinschätzung mit Preisspanne und Begründung, persönlich geprüft, ohne automatischen Sofortwert.',
    audience: { '@type': 'Audience', audienceType: 'Eigentümer von Eigentumswohnungen' },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR', availability: 'https://schema.org/InStock', url: `${can}#formular` },
  }));
  // Vermittlungs-Service erst nach Erteilung der Erlaubnis (03-strukturierte-daten.md 3.8)
  if (seite.typ === 'leistung' && erlaubnisErteilt) g.push(service('Verkauf von Eigentumswohnungen (Vermittlung)', 'Immobilienvermittlung', {
    offers: { '@type': 'Offer', description: `${F.provision.satz.langform}, fällig nur bei beurkundetem Kaufvertrag` },
  }));
  if (seite.typ === 'ankauf') g.push(service('Direktankauf von Eigentumswohnungen', 'Ankauf auf eigene Rechnung'));
  if (r.faq.length) g.push({ '@type': 'FAQPage', '@id': `${can}#faq`, isPartOf: { '@id': `${can}#webpage` }, mainEntity: r.faq.map((f) => ({ '@type': 'Question', name: f.frage, acceptedAnswer: { '@type': 'Answer', text: f.antwort } })) });
  return sauber({ '@context': 'https://schema.org', '@graph': g });
}

/** Brotkrumen aus den URL-Segmenten (nur Elternseiten, die gebaut werden). */
export function brotkrumen(seite) {
  const k = [{ name: 'Start', url: '/' }];
  const teile = seite.url.split('/').filter(Boolean);
  let pfad = '/';
  teile.forEach((t, i) => {
    pfad += t + '/';
    const s = seiteFuer(pfad);
    if (i === teile.length - 1) k.push({ name: seite.kurztitel, url: seite.url });
    else if (s?.gebaut) k.push({ name: s.kurztitel, url: pfad });
  });
  return k;
}
