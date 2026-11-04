# E-Mail-Zustellbarkeit: SPF, DKIM, DMARC für roessler-immo.de

Stand der Domain laut `analyse-aktuelle-webseite/01-analyse.md`: SPF vorhanden (`v=spf1 mx a include:_spf.webhosting.systems ~all`), **kein DKIM**, **kein DMARC**. Die Bestätigungs-Mail ist der dauerhafte Datenträger für Vertrag und Widerrufsbelehrung; landet sie im Spam, ist der Nachweis „zugegangen“ schwächer. Deshalb vor dem ersten Einsatz einrichten.

Grundsatz im Code: Absender (`From`) und Envelope-From sind immer `anfrage@roessler-immo.de`, nie die Adresse des Interessenten (die steht nur in `Reply-To`). So passen SPF und DKIM zur From-Domain (DMARC-Alignment).

## 1. Versandweg

Empfohlen: **SMTP über das netcup-Postfach** `anfrage@roessler-immo.de` (Postfach im Webhosting- bzw. Mail-Panel anlegen). `config.php`: `'transport' => 'smtp'`, Host = Postausgangsserver aus dem netcup-Panel, Port 587 (`'sicherheit' => 'starttls'`) oder 465 (`'ssl'`). Der Code prüft das TLS-Zertifikat immer.

- Auf dem **vServer** ebenfalls dieses Postfach per SMTP nutzen. `mail()` vom vServer nur, wenn dort ein MTA mit DKIM-Signatur (z. B. Postfix + OpenDKIM) läuft und die vServer-IP im SPF steht. Sonst scheitert DMARC.

## 2. DKIM

1. Im netcup-Webhosting (Plesk): **Mail → Mail-Einstellungen → „DKIM-Spamschutz-System zum Signieren ausgehender E-Mails verwenden“** für `roessler-immo.de` einschalten. (Menünamen je nach Plesk-Version leicht anders.)
2. Wird das DNS der Domain im **netcup Customer Control Panel (CCP)** verwaltet (nicht in Plesk), legt Plesk den Schlüssel nicht selbst an. Dann in Plesk unter **DNS-Einstellungen** den TXT-Eintrag `default._domainkey` (Wert beginnt mit `v=DKIM1; k=rsa; p=…`) kopieren und im CCP unter **Domains → roessler-immo.de → DNS** als TXT-Eintrag mit Host `default._domainkey` anlegen. Den Selektor genau so übernehmen, wie Plesk ihn anzeigt.
3. Prüfen (nach bis zu 24 h): `dig +short TXT default._domainkey.roessler-immo.de`.
4. Testmail an ein Gmail-Konto schicken, „Original anzeigen“: `DKIM: PASS` mit `d=roessler-immo.de`.

Bietet der Tarif kein DKIM, gibt es zwei Auswege: Mailversand über einen Anbieter mit DKIM für die eigene Domain (Auftragsverarbeitung prüfen) oder vServer mit OpenDKIM. Nicht ohne DKIM in DMARC-`quarantine` gehen.

## 3. SPF

Bleibt wie er ist, solange nur über netcup versendet wird: `v=spf1 mx a include:_spf.webhosting.systems ~all`. Nach erfolgreichem DMARC-Monitoring kann `~all` zu `-all` werden. Sendet ein vServer selbst, seine IPv4/IPv6 ergänzen (`ip4:…`, `ip6:…`).

## 4. DMARC (im CCP als TXT-Eintrag)

| Host | Typ | Wert |
|---|---|---|
| `_dmarc` | TXT | `v=DMARC1; p=none; rua=mailto:dmarc@roessler-immo.de; adkim=s; aspf=r; fo=1` |

- `dmarc@roessler-immo.de` als Weiterleitung oder Postfach anlegen (Berichte sind XML, z. B. mit einem kostenlosen Auswerter lesen; Datenschutz des Auswerters beachten).
- Nach 2 bis 4 Wochen ohne fremde/fehlerhafte Absender: `p=quarantine`, später `p=reject`.

## 5. Kontrolle vor dem ersten Einsatz

- Testanfrage an eigene Adressen bei Gmail, GMX/Web.de und Outlook: Eingang (nicht Spam), `SPF PASS`, `DKIM PASS`, `DMARC PASS`.
- Optional: Testmail an mail-tester.com (Ziel: 10/10).
- Reverse-DNS: beim Versand über netcup-SMTP erledigt; beim vServer im netcup-SCP den PTR auf den Hostnamen setzen.
