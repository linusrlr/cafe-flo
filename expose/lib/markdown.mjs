// Kleiner Markdown-Umsetzer für die Rechtstexte und Objektbeschreibungen.
// Unterstützt: ## / ### Überschriften, Absätze, - und 1. Listen, **fett**, [Text](URL),
// Marker [LINUS: …], [ZU PRÜFEN …], [ENTWURF …]. Mehr braucht es nicht; bewusst ohne Abhängigkeit.

export function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const MARKER = /\[(LINUS|ZU PRÜFEN|ENTWURF)([^\]]*)\]/g;

function inline(text) {
  let s = esc(text);
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]*)\)/g, '<a href="$2">$1</a>');
  // nackte URLs klickbar
  s = s.replace(/(^|[\s(])(https?:\/\/[^\s<)]+[^\s<).,;:])/g, '$1<a href="$2">$2</a>');
  s = s.replace(MARKER, (m) => `<mark class="marker">${m}</mark>`);
  return s;
}

function bloecke(md) {
  const zeilen = String(md ?? '').replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let i = 0;
  while (i < zeilen.length) {
    const z = zeilen[i];
    if (!z.trim()) { i++; continue; }
    const h = z.match(/^(#{2,4})\s+(.*)$/);
    if (h) { out.push({ typ: 'h', ebene: h[1].length, text: h[2] }); i++; continue; }
    if (/^\s*[-*]\s+/.test(z) || /^\s*\d+\.\s+/.test(z)) {
      const geordnet = /^\s*\d+\./.test(z);
      const punkte = [];
      while (i < zeilen.length && (/^\s*[-*]\s+/.test(zeilen[i]) || /^\s*\d+\.\s+/.test(zeilen[i]) || (/^\s{2,}\S/.test(zeilen[i]) && punkte.length))) {
        const p = zeilen[i].match(/^\s*(?:[-*]|\d+\.)\s+(.*)$/);
        if (p) punkte.push(p[1]); else punkte[punkte.length - 1] += ' ' + zeilen[i].trim();
        i++;
      }
      out.push({ typ: geordnet ? 'ol' : 'ul', punkte });
      continue;
    }
    const absatz = [];
    while (i < zeilen.length && zeilen[i].trim() && !/^#{2,4}\s/.test(zeilen[i]) && !/^\s*[-*]\s+/.test(zeilen[i]) && !/^\s*\d+\.\s+/.test(zeilen[i])) {
      absatz.push(zeilen[i].trim()); i++;
    }
    out.push({ typ: 'p', text: absatz.join(' ') });
  }
  return out;
}

export function mdZuHtml(md, { hVersatz = 0 } = {}) {
  return bloecke(md).map((b) => {
    if (b.typ === 'h') { const e = Math.min(6, b.ebene + hVersatz); return `<h${e}>${inline(b.text)}</h${e}>`; }
    if (b.typ === 'ul' || b.typ === 'ol') return `<${b.typ}>${b.punkte.map((p) => `<li>${inline(p)}</li>`).join('')}</${b.typ}>`;
    return `<p>${inline(b.text)}</p>`;
  }).join('\n');
}

// Klartext für E-Mails (dauerhafter Datenträger): Zeilenlänge ~76, Überschriften unterstrichen.
export function mdZuText(md) {
  const umbrechen = (t, einzug = '') => {
    const woerter = t.split(/\s+/); const zeilen = []; let z = '';
    for (const w of woerter) {
      if ((z + ' ' + w).trim().length > 76 - einzug.length && z) { zeilen.push(z); z = w; } else z = (z + ' ' + w).trim();
    }
    if (z) zeilen.push(z);
    return zeilen.map((x, k) => (k === 0 ? '' : einzug) + x).join('\n');
  };
  const roh = (t) => t.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)');
  return bloecke(md).map((b) => {
    if (b.typ === 'h') { const t = roh(b.text); return `${t.toUpperCase()}\n${'-'.repeat(Math.min(76, t.length))}`; }
    if (b.typ === 'ul') return b.punkte.map((p) => '- ' + umbrechen(roh(p), '  ')).join('\n');
    if (b.typ === 'ol') return b.punkte.map((p, k) => `${k + 1}. ` + umbrechen(roh(p), '   ')).join('\n');
    return umbrechen(roh(b.text));
  }).join('\n\n');
}

export function frontmatter(quelle) {
  const m = String(quelle).match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { kopf: '', rumpf: quelle };
  return { kopf: m[1], rumpf: m[2] };
}
