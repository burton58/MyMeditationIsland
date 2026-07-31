# My Meditation Island

Meditations-App rund um eine persönliche "Trauminsel": Man richtet sich über einen
Kompass aus, wählt passende geführte Meditationen aus einer kategorisierten Bibliothek
und bekommt am Ende einen Rückblick, was sich verändert hat.

**Live:** <https://burton58.github.io/MyMeditationIsland/> — wird bei jeder Änderung an
`main` automatisch neu veröffentlicht.

### Veröffentlichung einschalten (einmalig, nur der Repo-Inhaber)

GitHub Pages ist für dieses Repo noch **nicht** aktiviert. Es lässt sich weder über
einen Actions-Workflow noch über die API von aussen einschalten (GitHub erlaubt das
Anlegen einer Pages-Site nur mit Admin-Rechten am Repo). Nötig ist deshalb einmalig:

1. <https://github.com/burton58/MyMeditationIsland/settings/pages> öffnen
2. Unter **Source**: „Deploy from a branch" wählen
3. Branch: **main**, Ordner: **/ (root)** — dann **Save**

Nach ein bis zwei Minuten ist die App unter der Adresse oben erreichbar. Danach wird
jede Speicherung auf `main` automatisch veröffentlicht; weitere Einstellungen sind
nicht nötig. Das Repo ist öffentlich, Pages ist damit kostenlos.

## Inhalt dieses Repos

| Datei | Beschreibung |
|---|---|
| `index.html` | Der komplette aktuelle Prototyp — ein einzelnes, selbstständiges HTML-File (HTML + CSS + Vanilla JS, kein Build-Step). Alle Fotos sind base64-inline eingebettet. |
| `logo.png` | Rundes Logo (weisse Strichzeichnung) für die Titelseite. |
| `icon-180.png` | Symbol für "Zum Home-Bildschirm" auf dem iPhone. |
| `SPEC.md` | App-Spezifikation: Design-System, Flow, Datenmodell, Kernlogik und offene Punkte für die Migration in ein echtes Repo. |

## Starten

Kein Build, keine Abhängigkeiten — `index.html` einfach im Browser öffnen:

```bash
open index.html       # macOS
xdg-open index.html   # Linux
```

## Hinweis zum KI-Begleiter

Der Chat-Begleiter ruft `https://api.anthropic.com/v1/messages` direkt per `fetch()` auf.
Im File ist **kein API-Key hinterlegt** (und es gehört auch keiner hinein — der wäre im
Client öffentlich sichtbar). Ohne erreichbaren Endpunkt greifen automatisch die
Fallback-Textbausteine, die App läuft also weiterhin ohne Fehler. Für echten Chat-Betrieb
braucht es einen kleinen Server-Proxy, der den Key hält.

## Nächste Schritte

Siehe [`SPEC.md`](SPEC.md) §7 — u. a. Migration zu echten Routen/Komponenten, Fotos als
echte Asset-Dateien, Persistenz, Barrierefreiheit des Kompass-Drags.
