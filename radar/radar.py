#!/usr/bin/env python3
"""
Gesetzes- und Marktradar für Rössler Immobilien.

Liest RSS-/Atom-Feeds aus feeds.json, filtert nach Schlagwörtern (keywords.json),
merkt sich bereits gesehene Einträge (state.json) und schreibt einen Markdown-Digest
nach digests/YYYY-MM-DD.md. Nur Python-Standardbibliothek, keine Abhängigkeiten.

Aufruf:
  python3 radar.py                 # neue Treffer seit dem letzten Lauf
  python3 radar.py --days 7        # alles aus den letzten 7 Tagen, ignoriert state
  python3 radar.py --all           # alle Einträge der Feeds, auch ohne Keyword-Treffer
  python3 radar.py --check         # nur prüfen, welche Feeds erreichbar sind
"""
import argparse, json, re, sys, html, hashlib, datetime as dt, urllib.request, urllib.error
import xml.etree.ElementTree as ET
from email.utils import parsedate_to_datetime
from pathlib import Path

HERE = Path(__file__).resolve().parent
UA = "roessler-immo-radar/1.0 (+https://roessler-immo.de; Feed-Reader)"

def load_json(name, default):
    p = HERE / name
    return json.loads(p.read_text(encoding="utf-8")) if p.exists() else default

def fetch(url, timeout=25):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/rss+xml, application/atom+xml, application/xml, text/xml;q=0.9, */*;q=0.5"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()

def text(el, *names):
    for n in names:
        for child in el:
            tag = child.tag.split('}')[-1]
            if tag == n:
                t = (child.text or "").strip()
                if not t and child.get("href"):
                    return child.get("href")
                return t
    return ""

def parse_date(s):
    if not s:
        return None
    s = s.strip()
    try:
        return parsedate_to_datetime(s)
    except Exception:
        pass
    for fmt in ("%Y-%m-%dT%H:%M:%S%z", "%Y-%m-%dT%H:%M:%S.%f%z", "%Y-%m-%dT%H:%M:%SZ", "%Y-%m-%d"):
        try:
            d = dt.datetime.strptime(s.replace("Z", "+0000") if fmt.endswith("%z") else s, fmt)
            return d if d.tzinfo else d.replace(tzinfo=dt.timezone.utc)
        except Exception:
            continue
    return None

def strip_html(s):
    s = re.sub(r"<[^>]+>", " ", s or "")
    return re.sub(r"\s+", " ", html.unescape(s)).strip()

def parse_feed(raw):
    root = ET.fromstring(raw)
    items = []
    tag = root.tag.split('}')[-1]
    if tag == "rss" or tag == "RDF":
        channel = root.find("channel") if tag == "rss" else root
        nodes = (channel.findall("item") if channel is not None else []) or [n for n in root.iter() if n.tag.split('}')[-1] == "item"]
        for it in nodes:
            items.append({
                "title": strip_html(text(it, "title")),
                "link": text(it, "link", "guid"),
                "date": parse_date(text(it, "pubDate", "date", "updated")),
                "summary": strip_html(text(it, "description", "encoded", "summary"))[:600],
            })
    else:  # Atom
        for it in [n for n in root.iter() if n.tag.split('}')[-1] == "entry"]:
            link = ""
            for l in it:
                if l.tag.split('}')[-1] == "link" and (l.get("rel") in (None, "alternate")):
                    link = l.get("href", ""); break
            items.append({
                "title": strip_html(text(it, "title")),
                "link": link or text(it, "id"),
                "date": parse_date(text(it, "published", "updated")),
                "summary": strip_html(text(it, "summary", "content"))[:600],
            })
    return items

GENERIC_GROUPS = {"Gesetz", "Urteil"}   # allein nicht relevant genug

def score(item, keywords):
    """Liefert Treffer (Gruppe, Wort). Abkürzungen (GEG, WEG, KfW, EZB …) werden
    Groß-/Kleinschreibung-genau und nur als ganzes Wort gesucht; normale Wörter
    unabhängig von der Schreibung, am Wortanfang und mit beliebiger Endung
    (so trifft „Mieter“ auch „Mieterhöhung“, aber „GEG“ nicht „gegenüber“)."""
    hay = item["title"] + " " + item["summary"]
    hay_l = hay.lower()
    hits = []
    for group, words in keywords.items():
        for w in words:
            is_abbr = len(w) <= 5 and any(c.isupper() for c in w[1:]) or w.isupper()
            if is_abbr:
                if re.search(r"(?<![A-Za-zÄÖÜäöüß])" + re.escape(w) + r"(?![A-Za-zÄÖÜäöüß])", hay):
                    hits.append((group, w))
            else:
                if re.search(r"(?<![a-zäöüß])" + re.escape(w.lower()), hay_l):
                    hits.append((group, w))
    return hits

def relevant(hits):
    return any(g not in GENERIC_GROUPS for g, _ in hits)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--days", type=int, default=None)
    ap.add_argument("--all", action="store_true")
    ap.add_argument("--check", action="store_true")
    ap.add_argument("--out", default=None)
    a = ap.parse_args()

    feeds = load_json("feeds.json", [])
    keywords = load_json("keywords.json", {})
    state = load_json("state.json", {"seen": []}) if not a.days else {"seen": []}
    seen = set(state.get("seen", []))
    now = dt.datetime.now(dt.timezone.utc)
    cutoff = now - dt.timedelta(days=a.days) if a.days else None

    results, report = [], []
    for f in feeds:
        try:
            raw = fetch(f["url"])
            items = parse_feed(raw)
            report.append(f"OK   {len(items):4d}  {f['name']}")
        except (urllib.error.URLError, urllib.error.HTTPError, ET.ParseError, TimeoutError, OSError) as e:
            report.append(f"FEHL       {f['name']}  ({e.__class__.__name__}: {str(e)[:60]})")
            continue
        if a.check:
            continue
        for it in items:
            key = hashlib.sha1((it["link"] or it["title"]).encode()).hexdigest()
            if key in seen:
                continue
            if cutoff and it["date"] and it["date"] < cutoff:
                continue
            hits = score(it, keywords)
            if not a.all and f.get("filter", True) and not relevant(hits):
                continue
            it.update(source=f["name"], category=f.get("category", ""), hits=hits, key=key, prio=f.get("prio", 3))
            results.append(it)

    print("\n".join(report))
    if a.check:
        return
    results.sort(key=lambda x: (-(len(x["hits"]) + x["prio"]), -(x["date"].timestamp() if x["date"] else 0)))
    today = now.astimezone().strftime("%Y-%m-%d")
    out = Path(a.out) if a.out else HERE / "digests" / f"{today}.md"
    out.parent.mkdir(parents=True, exist_ok=True)
    lines = [f"# Radar-Digest {today}", "", f"{len(results)} relevante Einträge aus {len(feeds)} Feeds.", ""]
    by_cat = {}
    for r in results:
        by_cat.setdefault(r["category"] or "Sonstiges", []).append(r)
    for cat, rs in by_cat.items():
        lines.append(f"## {cat}")
        lines.append("")
        for r in rs:
            d = r["date"].astimezone().strftime("%d.%m.%Y") if r["date"] else "ohne Datum"
            tags = ", ".join(sorted({f"{g}: {w}" for g, w in r["hits"]})) or "–"
            lines.append(f"- **{r['title']}** ({r['source']}, {d})  ")
            lines.append(f"  {r['link']}  ")
            if r["summary"]:
                lines.append(f"  {r['summary'][:300]}  ")
            lines.append(f"  Treffer: {tags}")
        lines.append("")
    lines += ["---", "", "Nächster Schritt: Einträge mit Relevanz für Eigentümer in Heimsheim/Leonberg markieren, in `content-briefings/` ein Briefing anlegen oder in den Newsletter übernehmen.", ""]
    out.write_text("\n".join(lines), encoding="utf-8")
    if not a.days:
        seen.update(r["key"] for r in results)
        (HERE / "state.json").write_text(json.dumps({"seen": sorted(seen)[-5000:], "last_run": now.isoformat()}, indent=0), encoding="utf-8")
    print(f"\n{len(results)} Treffer -> {out}")

if __name__ == "__main__":
    main()
