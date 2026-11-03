# 03 Strukturierte Daten (JSON-LD)

Stand: 3. November 2026. Grundlage: M2 Punkt 5 in `03-massnahmen.md`, Abschnitt 6 „Pflichtbausteine“ in `04-seitenplan.md`, die Umsetzungskommentare in `texte/*.md`, 01-technik.md Abschnitte 3.3, 6 und 7.

## 1. Grundsätze

1. **Ein `<script type="application/ld+json">` je Seite mit `@graph`.** Erzeugt von `src/lib/schema-org.ts`, eingebunden über die Komponente `JsonLd` im `<head>`. Kein Handschreiben je Seite.
2. **Feste `@id`s**, damit Knoten über Seiten hinweg dieselbe Entität sind:

| Entität | `@id` |
|---|---|
| Unternehmen (RealEstateAgent) | `https://roessler-immo.de/#organisation` |
| Person Linus Rössler | `https://roessler-immo.de/#linus` |
| WebSite | `https://roessler-immo.de/#website` |
| Logo | `https://roessler-immo.de/#logo` |
| Seite | `{canonical}#webpage` |
| Breadcrumb | `{canonical}#breadcrumb` |
| Artikel | `{canonical}#artikel` |
| FAQ | `{canonical}#faq` |
| Leistung | `{canonical}#leistung` |
| Ort | `{canonical}#ort` |

3. **Nur Sichtbares auszeichnen.** FAQ-Fragen und Antworten kommen aus derselben Datenstruktur wie die sichtbare FAQ (`remark/faq`). Keine `aggregateRating`/`review`, solange keine echten Bewertungen auf der Seite stehen (Vorgabe `wohnung-bewerten.md`, M8).
4. **Werte aus `bauplan/fakten.yaml`**, nie literal: Telefon (`firma.telefon.schema`), E-Mail, Name, Orte, Provision, Erlaubnis.
5. **Platzhalter in den Vorlagen** unten: `{{…}}`. `{{fakten.x}}` = Faktenwert, `{{seite.x}}` = Frontmatter bzw. Plugin-Daten, `{{canonical}}` = `https://roessler-immo.de` + `url`. Werte mit `null` werden samt Schlüssel weggelassen (z. B. `address` bis zur Standortentscheidung).
6. Datumsangaben ISO 8601 mit Zeitzone: `2026-10-29T00:00:00+01:00` (Winterzeit) bzw. `+02:00`; `schema-org.ts` rechnet über `Europe/Berlin`.
7. **Erwartung realistisch halten:** Google zeigt FAQ-Rich-Results seit 2023 praktisch nur noch für Behörden- und Gesundheitsseiten. FAQPage wird trotzdem ausgezeichnet (M2, geringer Aufwand, hilft anderen Suchsystemen und KI-Antworten); Erfolg wird nicht daran gemessen.

## 2. Welche Seite nutzt welche Vorlage

„Basis“ = RealEstateAgent + Person + WebSite + WebPage (bzw. Untertyp) + BreadcrumbList. Start hat keine BreadcrumbList.

| Seite / typ | Basis-Seitentyp | Zusätzlich |
|---|---|---|
| `/` (start) | `WebPage` | FAQPage |
| `/wohnung-verkaufen/` (leistung) | `WebPage` | Service „Vermittlung“, FAQPage |
| `/wohnung-bewerten/` (bewertung) | `WebPage` | Service „Ersteinschätzung“, Article (Teil B), FAQPage (beide FAQ-Blöcke in einer FAQPage) |
| `/direktankauf/` (ankauf) | `WebPage` | Service „Direktankauf“, FAQPage |
| `/ueber-mich/` (person) | `ProfilePage` mit `mainEntity` Person | keins |
| `/kontakt/` (kontakt) | `ContactPage` | keins |
| `/wohnung-verkaufen/<ort>/` (ort) | `WebPage` mit `about` City | FAQPage |
| `/ratgeber/` (hub) | `CollectionPage` | `ItemList` der Ratgeber |
| `/ratgeber/<slug>/` (ratgeber) | `WebPage` | Article, FAQPage |
| impressum, datenschutz, widerruf (recht) | `WebPage` | keins |
| danke, 404, formular-fehler | **kein JSON-LD** (noindex) | |

Frontmatter `schema` kann die Zusätze überschreiben (01-technik.md 3.2).

## 3. Vorlagen

### 3.1 RealEstateAgent (auf jeder indexierbaren Seite)

```json
{
  "@type": "RealEstateAgent",
  "@id": "https://roessler-immo.de/#organisation",
  "name": "{{fakten.firma.name}}",
  "alternateName": "Rössler Immobilien, Linus Rössler",
  "url": "https://roessler-immo.de/",
  "logo": { "@type": "ImageObject", "@id": "https://roessler-immo.de/#logo", "url": "https://roessler-immo.de/og/logo-512.png", "width": 512, "height": 512 },
  "image": "https://roessler-immo.de/og/standard.jpg",
  "telephone": "{{fakten.firma.telefon.schema}}",
  "email": "{{fakten.firma.email}}",
  "founder": { "@id": "https://roessler-immo.de/#linus" },
  "employee": { "@id": "https://roessler-immo.de/#linus" },
  "description": "Makler für Eigentumswohnungen in {{fakten.firma.orte}}. Schriftlicher Verkaufsplan, Provision {{fakten.provision.satz}} je Seite inkl. USt.",
  "priceRange": "Provision {{fakten.provision.satz}} je Seite inkl. USt",
  "knowsLanguage": "de",
  "areaServed": [
    { "@type": "City", "name": "Leonberg",  "sameAs": "https://de.wikipedia.org/wiki/Leonberg",
      "containedInPlace": { "@type": "AdministrativeArea", "name": "Landkreis Böblingen" } },
    { "@type": "City", "name": "Heimsheim", "sameAs": "https://de.wikipedia.org/wiki/Heimsheim",
      "containedInPlace": { "@type": "AdministrativeArea", "name": "Enzkreis" } },
    { "@type": "City", "name": "Ditzingen", "sameAs": "https://de.wikipedia.org/wiki/Ditzingen",
      "containedInPlace": { "@type": "AdministrativeArea", "name": "Landkreis Ludwigsburg" } },
    { "@type": "City", "name": "Renningen", "sameAs": "https://de.wikipedia.org/wiki/Renningen",
      "containedInPlace": { "@type": "AdministrativeArea", "name": "Landkreis Böblingen" } },
    { "@type": "City", "name": "Pforzheim", "sameAs": "https://de.wikipedia.org/wiki/Pforzheim" }
  ],
  "address": "{{fakten.firma.anschrift → PostalAddress, entfällt solange null}}",
  "openingHoursSpecification": "{{fakten.firma.erreichbarkeit → OpeningHoursSpecification[], entfällt solange null}}",
  "sameAs": ["{{Google-Unternehmensprofil-URL, sobald verifiziert (M8)}}"]
}
```

Hinweise: `address` als `{ "@type": "PostalAddress", "streetAddress", "postalCode", "addressLocality", "addressRegion": "Baden-Württemberg", "addressCountry": "DE" }`, **erst nach der Standortentscheidung** (M6, 07-recht-erlaubnis.md Abschnitt 6). Mit der heutigen Adresse in Niederlauer würde das Schema das widersprüchliche Standortsignal aus 01-analyse.md 7.2 verstärken; bis dahin Servicegebiet nur über `areaServed`. Pforzheim ist kreisfrei, daher kein `containedInPlace`.

### 3.2 Person (auf jeder indexierbaren Seite, im Graph neben dem Unternehmen)

```json
{
  "@type": "Person",
  "@id": "https://roessler-immo.de/#linus",
  "name": "{{fakten.firma.inhaber}}",
  "givenName": "Linus", "familyName": "Rössler",
  "jobTitle": "Immobilienmakler für Eigentumswohnungen",
  "url": "https://roessler-immo.de/ueber-mich/",
  "image": "https://roessler-immo.de/og/linus-roessler.jpg",
  "worksFor": { "@id": "https://roessler-immo.de/#organisation" },
  "knowsAbout": ["Eigentumswohnung", "Wohnungseigentumsgesetz", "Immobilienbewertung", "Maklerrecht"],
  "hasCredential": "{{nur wenn fakten.erlaubnis.status = erteilt, sonst Schlüssel weglassen}}"
}
```

`hasCredential` nach Erteilung (Baustein E/F aus 07-recht-erlaubnis.md):

```json
{ "@type": "EducationalOccupationalCredential",
  "name": "Erlaubnis nach § 34c Abs. 1 Satz 1 Nr. 1 GewO (Immobilienmakler)",
  "credentialCategory": "Gewerbeerlaubnis",
  "dateCreated": "{{fakten.erlaubnis.erteilt_am}}",
  "recognizedBy": { "@type": "Organization", "name": "{{fakten.erlaubnis.behoerde}}" } }
```

Vor Erteilung wird **nichts** zur Erlaubnis ausgezeichnet (auch nicht „beantragt“): Eine strukturierte Angabe könnte wie eine Zulassung gelesen werden (07-recht-erlaubnis.md Abschnitt 5).

### 3.3 WebSite und WebPage (jede Seite)

```json
{ "@type": "WebSite", "@id": "https://roessler-immo.de/#website", "url": "https://roessler-immo.de/",
  "name": "Rössler Immobilien", "inLanguage": "de-DE", "publisher": { "@id": "https://roessler-immo.de/#organisation" } },
{ "@type": "{{WebPage | ProfilePage | ContactPage | CollectionPage}}",
  "@id": "{{canonical}}#webpage", "url": "{{canonical}}",
  "name": "{{seite.title}}", "description": "{{seite.description}}", "inLanguage": "de-DE",
  "isPartOf": { "@id": "https://roessler-immo.de/#website" },
  "about": { "@id": "https://roessler-immo.de/#organisation" },
  "breadcrumb": { "@id": "{{canonical}}#breadcrumb" },
  "primaryImageOfPage": "{{absolute URL des Hero-Bilds (1200er WebP), falls vorhanden}}",
  "dateModified": "{{seite.aktualisiert_am ?? seite.stand}}" }
```

Bei `ProfilePage`: `"mainEntity": { "@id": "https://roessler-immo.de/#linus" }`, `about` entfällt.

### 3.4 WebPage mit `about` City (Ortsseiten)

Ersetzt `about` der Basis-WebPage:

```json
{ "@type": "WebPage", "@id": "{{canonical}}#webpage", "url": "{{canonical}}",
  "name": "{{seite.title}}", "description": "{{seite.description}}", "inLanguage": "de-DE",
  "isPartOf": { "@id": "https://roessler-immo.de/#website" },
  "breadcrumb": { "@id": "{{canonical}}#breadcrumb" },
  "about": { "@type": "City", "@id": "{{canonical}}#ort", "name": "{{ORT_NAME}}",
             "sameAs": "https://de.wikipedia.org/wiki/{{ORT_NAME}}" },
  "mentions": { "@id": "https://roessler-immo.de/#organisation" },
  "author": { "@id": "https://roessler-immo.de/#linus" },
  "datePublished": "{{seite.veroeffentlicht_am}}", "dateModified": "{{seite.aktualisiert_am ?? seite.stand}}" }
```

`ORT_NAME` aus `seite.ort` (`leonberg` → `Leonberg`). Die Ortsseiten sind redaktionelle Seiten mit Marktdaten, deshalb `author`/Datum wie bei Artikeln.

### 3.5 Article (Ratgeber, Teil B von `/wohnung-bewerten/`)

```json
{ "@type": "Article", "@id": "{{canonical}}#artikel",
  "mainEntityOfPage": { "@id": "{{canonical}}#webpage" },
  "headline": "{{H1 der Seite, max. 110 Zeichen}}",
  "description": "{{seite.description}}",
  "inLanguage": "de-DE",
  "image": ["{{Hero 1200 px}}", "{{og_bild}}"],
  "author": { "@id": "https://roessler-immo.de/#linus" },
  "publisher": { "@id": "https://roessler-immo.de/#organisation" },
  "datePublished": "{{seite.veroeffentlicht_am}}",
  "dateModified": "{{seite.aktualisiert_am ?? seite.stand}}",
  "articleSection": "{{seite.rubrik → Verkaufen | Lebenssituationen | Recht und Steuern | Entscheiden}}",
  "wordCount": "{{aus remark/lesezeit}}",
  "about": [{ "@type": "Thing", "name": "Eigentumswohnung" }],
  "spatialCoverage": [{ "@id": "https://roessler-immo.de/#organisation" }],
  "citation": "{{seite.quellen → [{ \"@type\": \"CreativeWork\", \"name\": Titel, \"url\": URL }], max. 30}}" }
```

`spatialCoverage` besser als Liste der fünf `City`-Knoten aus 3.1 (gleiche Objekte, `schema-org.ts` referenziert sie). `citation` macht die Quellenliste maschinenlesbar und belegt das Prinzip „Fakten nur mit Quelle“ (04-seitenplan 1.4).

### 3.6 FAQPage (alle Seiten mit FAQ-Abschnitt)

```json
{ "@type": "FAQPage", "@id": "{{canonical}}#faq",
  "isPartOf": { "@id": "{{canonical}}#webpage" },
  "mainEntity": [
    { "@type": "Question", "name": "{{frage}}",
      "acceptedAnswer": { "@type": "Answer", "text": "{{antwort als bereinigtes HTML}}" } }
  ] }
```

Regeln: Antworttext ist das gerenderte Antwort-HTML ohne Fußnoten-`<sup>` und ohne Marker; erlaubte Tags `p, a, ul, ol, li, strong, em, br`; relative Links absolut machen. `/wohnung-bewerten/` fasst beide FAQ-Blöcke in **einer** FAQPage zusammen (Google erlaubt eine je Seite). `check-schema` vergleicht die Anzahl `Question` mit der Anzahl `<details>` in der FAQ-Sektion.

### 3.7 BreadcrumbList (alle Seiten außer Start)

```json
{ "@type": "BreadcrumbList", "@id": "{{canonical}}#breadcrumb",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Start", "item": "https://roessler-immo.de/" },
    { "@type": "ListItem", "position": 2, "name": "Wohnung verkaufen", "item": "https://roessler-immo.de/wohnung-verkaufen/" },
    { "@type": "ListItem", "position": 3, "name": "{{seite.kurztitel}}" }
  ] }
```

Letztes Element ohne `item` (aktuelle Seite). Namen = `kurztitel` der Elternseiten, identisch mit der sichtbaren Komponente `Breadcrumbs`.

### 3.8 Service

Ersteinschätzung (`/wohnung-bewerten/`):

```json
{ "@type": "Service", "@id": "{{canonical}}#leistung",
  "name": "Kostenlose Ersteinschätzung für Eigentumswohnungen",
  "serviceType": "Immobilienbewertung (Ersteinschätzung, kein Gutachten)",
  "description": "Schriftliche Ersteinschätzung mit Preisspanne und Begründung {{fakten.firma.einschaetzung_frist}}, persönlich geprüft, ohne automatischen Sofortwert.",
  "provider": { "@id": "https://roessler-immo.de/#organisation" },
  "areaServed": "{{die fünf City-Knoten aus 3.1}}",
  "audience": { "@type": "Audience", "audienceType": "Eigentümer von Eigentumswohnungen" },
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR",
              "availability": "https://schema.org/InStock", "url": "{{canonical}}#formular" },
  "potentialAction": { "@type": "CommunicateAction", "target": "{{canonical}}#formular" } }
```

Vermittlung (`/wohnung-verkaufen/`): `name` „Verkauf von Eigentumswohnungen (Vermittlung)“, `serviceType` „Immobilienvermittlung“, `offers.description` „{{fakten.provision.satz.langform}}, fällig nur bei beurkundetem Kaufvertrag“, **kein** `price`. **Vor Erteilung der Erlaubnis wird dieser Service nicht ausgezeichnet** (`schema-org.ts` prüft `fakten.erlaubnis.status`): Ein maschinenlesbares Vermittlungsangebot wäre genau der Eindruck „jetzt buchbar“, den 07-recht-erlaubnis.md Abschnitt 3 als UWG-Risiko beschreibt. Die Seite trägt bis dahin nur WebPage + FAQPage.

Direktankauf (`/direktankauf/`): `name` „Direktankauf von Eigentumswohnungen“, `serviceType` „Ankauf auf eigene Rechnung“, `provider` = Organisation, `areaServed` = fünf Orte, `offers` ohne Preis. Zulässig vor Erteilung (07-recht-erlaubnis.md Kurzergebnis Punkt 5).

### 3.9 Ratgeber-Hub

```json
{ "@type": "CollectionPage", "@id": "https://roessler-immo.de/ratgeber/#webpage", "url": "https://roessler-immo.de/ratgeber/",
  "name": "{{seite.title}}", "isPartOf": { "@id": "https://roessler-immo.de/#website" },
  "mainEntity": { "@type": "ItemList", "itemListElement": [
    { "@type": "ListItem", "position": 1, "url": "https://roessler-immo.de/ratgeber/eigentumswohnung-verkaufen/", "name": "{{kurztitel}}" } ] } }
```

Nur veröffentlichte Ratgeber, Reihenfolge wie sichtbar.

## 4. Vollständiges Beispiel: `/wohnung-verkaufen/leonberg/` (nach Veröffentlichung, vor Erteilung)

```json
{ "@context": "https://schema.org",
  "@graph": [
    { "@type": "RealEstateAgent", "@id": "https://roessler-immo.de/#organisation", "…": "wie 3.1" },
    { "@type": "Person", "@id": "https://roessler-immo.de/#linus", "…": "wie 3.2, ohne hasCredential" },
    { "@type": "WebSite", "@id": "https://roessler-immo.de/#website", "…": "wie 3.3" },
    { "@type": "WebPage", "@id": "https://roessler-immo.de/wohnung-verkaufen/leonberg/#webpage",
      "url": "https://roessler-immo.de/wohnung-verkaufen/leonberg/",
      "name": "Wohnung verkaufen in Leonberg | Rössler Immobilien", "inLanguage": "de-DE",
      "isPartOf": { "@id": "https://roessler-immo.de/#website" },
      "breadcrumb": { "@id": "https://roessler-immo.de/wohnung-verkaufen/leonberg/#breadcrumb" },
      "about": { "@type": "City", "@id": "https://roessler-immo.de/wohnung-verkaufen/leonberg/#ort",
                 "name": "Leonberg", "sameAs": "https://de.wikipedia.org/wiki/Leonberg" },
      "author": { "@id": "https://roessler-immo.de/#linus" },
      "datePublished": "2026-12-01T00:00:00+01:00", "dateModified": "2026-12-01T00:00:00+01:00" },
    { "@type": "BreadcrumbList", "@id": "https://roessler-immo.de/wohnung-verkaufen/leonberg/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Start", "item": "https://roessler-immo.de/" },
        { "@type": "ListItem", "position": 2, "name": "Wohnung verkaufen", "item": "https://roessler-immo.de/wohnung-verkaufen/" },
        { "@type": "ListItem", "position": 3, "name": "Leonberg" } ] },
    { "@type": "FAQPage", "@id": "https://roessler-immo.de/wohnung-verkaufen/leonberg/#faq",
      "mainEntity": [
        { "@type": "Question", "name": "Gilt die Sperrfrist von fünf Jahren auch in Eltingen und Höfingen?",
          "acceptedAnswer": { "@type": "Answer", "text": "<p>Ja. Die Verordnung nennt die Stadt Leonberg als Ganzes, also alle Stadtteile.</p>" } } ] }
  ] }
```

(Datum `2026-12-01` ist ein Beispiel.)

## 5. Prüfung

- `scripts/check-schema.mjs` (04-tests.md T-SCHEMA): parst jedes JSON-LD in `dist`, prüft `@context`, eindeutige `@id` je Graph, dass jede `{"@id": …}`-Referenz im Graph aufgelöst wird, Pflichtfelder je Typ (Tabelle unten), FAQ-Anzahl = sichtbare Fragen, kein `hasCredential` und kein Vermittlungs-Service bei `erlaubnis.status: beantragt`, keine `{{` im Ergebnis.
- Manuell bei Abnahme jeder Welle: Google Rich Results Test und validator.schema.org für je eine Seite pro Typ.

| Typ | Pflichtfelder im Check |
|---|---|
| RealEstateAgent | `@id`, `name`, `url`, `telephone`, `areaServed` (5) |
| Person | `@id`, `name`, `url`, `worksFor` |
| WebPage (alle Untertypen) | `@id`, `url`, `name`, `isPartOf` |
| Article | `headline` (≤ 110), `author`, `publisher`, `datePublished`, `dateModified`, `image` |
| FAQPage | `mainEntity` ≥ 1, je `name` und `acceptedAnswer.text` |
| BreadcrumbList | ≥ 2 Elemente, `position` lückenlos ab 1 |
| Service | `name`, `provider`, `areaServed` |
