# My Meditation Island — App-Spezifikation

Meditations-App rund um die eigene "Insel": Nutzer:innen richten sich über einen Kompass aus, wählen passende geführte Meditationen aus einer kategorisierten Bibliothek und bekommen am Ende einen Rückblick, was sich verändert hat.

**Wichtig fürs Verständnis der Marke:** Die Insel ist eine **Metapher**, kein Themenzwang. Sie steht für den Kraftort in einem selbst — den Ort, an den man sich zurückzieht, um anzukommen, durchzuatmen und bei sich zu sein. Das heisst: Die *Insel* ist der Rahmen (Startseite, Kompass, Abschluss, Bildsprache), die *Meditationen darin* müssen inhaltlich nicht bei "Strand und Palmen" bleiben — genau wie ein Rückzugsort auch nicht bedeutet, dass jedes Gespräch darin vom Rückzugsort handeln muss. Siehe §5a für die daraus folgende Themenvielfalt.

**Stand nach dem Layout-Umbau:** Aussehen und Aufbau folgen jetzt einer gemeinsamen Vorlage (Creme/Gold, Serifen-Titel, weisse Karten, Seitenkopf + Abschnittsüberschriften, **vier** Tabs — siehe §2/§3). Die **Logik hinter dem Kompass ist dabei unverändert geblieben**: frei verschiebbarer Zeiger, zwei unabhängige Achsen (Denken↔Fühlen, Anspannung↔Entspannung), dieselben Zustandswörter, dieselbe Empfehlungs-Reihenfolge. Der Einstieg läuft über eine eigene Titelseite ("Meine Insel betreten"); die Kopfzeile "Gestalte deine Inselreise" gehört nur noch zum Insel-Konfigurator (§4), der über die Einstellungen erreichbar ist (§3.6).

Aktueller Stand ist ein **einzelnes, selbstständiges HTML-File** (`index.html`) — kein Build-Step, keine externen Abhängigkeiten außer einem Fetch-Call an die Anthropic API für den Chat-Begleiter. Dieses Dokument beschreibt den Ist-Zustand, damit er 1:1 in ein neues Repo übersetzt werden kann (z. B. als React/Next-App mit echten Routen statt CSS-Step-Umschaltung).

---

## 0. Entscheidungsprotokoll — was gilt und warum

**Diese Liste ist verbindlich.** Sie hält fest, was Christine entschieden hat und was aus Tests hervorgegangen ist, damit keine dieser Festlegungen bei einem späteren Umbau versehentlich zurückgedreht wird. Die Einzelheiten stehen jeweils im genannten Abschnitt. Wer hier etwas ändert, ändert eine getroffene Entscheidung — das braucht Christines Zustimmung, nicht nur einen Commit.

### Grundsätze (gelten überall)

| Nr. | Regel | Warum |
|---|---|---|
| G1 | **Kein behaupteter Zustand ohne Angabe.** Die App sagt nie, wie es jemandem geht, solange die Person es nicht selbst angegeben hat. | "Zeig mir, was jetzt passt" lieferte bei unberührtem Zeiger eine Empfehlung mit der Begründung "Dein Kompass zeigt: ausgeglichen" — das war nur die Ruhestellung der Nadel. (§3.3b) |
| G2 | **Kein Muster ohne Muster.** "meistens" erst ab der Hälfte aller Male, "liebste Übung" erst ab zweimal. | Bei fünf verschiedenen Übungen stand "Deine liebste Übung: Atem-Anker (1×)". (§3.6) |
| G3 | **Keine Kompass-Achsen in sichtbaren Texten.** Die Wörter *Denken, Fühlen, Anspannung, Entspannung* sind Beschriftungen der Scheibe, keine Zustände. Sichtbare Texte sprechen in Adjektiven ("eher angespannt", "sehr geborgen"). | "Am Anfang zeigte dein Kompass auf Denken, jetzt auf Fühlen" las sich, als sei das Fühlen weg. (§3.5, §6a) |
| G4 | **Was wie ein Knopf oder Link aussieht, muss auch etwas tun.** | "Über die App" klappte einen Text weit unterhalb der Liste auf; "yogaisland.ch" sah aus wie ein Link, war Text; die Lieblingsmeditationen sahen antippbar aus. (§3.7b) |
| G5 | **Kein doppelter Weg zum selben Inhalt.** | Profil → "Statistiken" sprang auf "Mein Weg" und zeigte dort exakt dasselbe wie der Reiter unten. (historisch, siehe §3.3) |
| G6 | **Eine Regel, eine Stelle im Code.** | "Tage am Stück" war zweimal ausprogrammiert; zwei Kopien laufen mit der Zeit auseinander. (§3.3b) |
| G7 | **Nichts erfinden.** Fehlen Angaben (Impressum, Chakren-Zuordnung, Begleiter-Foto), bleibt die Stelle leer oder wird als offene Frage vermerkt — sie wird nicht plausibel gefüllt. | Durchgehend; offene Punkte stehen in `Checkliste-vor-Livegang.md`. |

### Entscheidungen von Christine

| Datum | Entscheidung | Abschnitt |
|---|---|---|
| Aug. 2026 | Es gibt **nur ein Ziel**, das selbst gesetzte Wochenziel. Das früher fest einprogrammierte "Ziel: 7 Tage" ist entfallen. | §3.3, §3.6 |
| Aug. 2026 | Die Stufen der Inselreise werden **offengelegt** ("ab 5", "ab 15" …) statt unerklärt aufzutauchen. | §3.3c |
| Aug. 2026 | Der Begleiter existiert **einmal**, in der Bibliothek. Die Kopien auf "Mein Weg" und im Abschluss sind entfallen. | §6 |
| Aug. 2026 | **Keine echte KI** anschliessen. Die lokale Logik ist die dauerhafte Lösung, keine Übergangslösung. | §6 |
| 4. Aug. 2026 | Minuten zählen **nur die wirklich gehörte Zeit**; erst alle Sekunden summieren, dann einmal umrechnen. | §5 |
| 4. Aug. 2026 | Der Zustand nach der Meditation wird **einmal gesetzt und festgehalten** ("Ja, so fühle ich mich jetzt"), nicht dauernd verstellt. Nicht bestätigte Sitzungen fliessen nicht als "keine Veränderung" in die Statistik. | §3.5 |
| 4. Aug. 2026 | Der Begleiter arbeitet mit **Anliegen statt Kompass-Achsen** — körperliche Beschwerden sind kein Denk- oder Gefühlsthema. | §6a |
| 4. Aug. 2026 | Der Begleiter nennt zusätzlich das **Chakra** nach Christines eigener Zuordnung. | §6b |
| 4. Aug. 2026 | Bei **Schmerz** gilt ihr fester Weg: Licht in den Körper → wahrnehmen → loslassen → beim Herzen ankommen; **Grün ist die Farbe der Heilung**. | §6b |
| 4. Aug. 2026 | Vielschichtige Themen bieten **mehrere Wege** an statt einer Empfehlung — zuerst ankommen, dann die weiteren Übungen je nach Beschwerde. | §6b |
| 4. Aug. 2026 | **Die Inselreise zählt Tage, nicht Meditationen** ("so wie Calm"). | §3.3c |
| 4. Aug. 2026 | **"Profil" als Reiter und Seite entfallen — Foto/Fortschritt nach "Mein Weg", Verwaltung nach "Einstellungen" hinter einem Zahnrad.** So machen es Calm, Headspace, Insight Timer, Duolingo, Strava: eine Seite über sich selbst, alles Administrative hinter einem Zahnrad, kein eigener Reiter dafür. | §2, §3.3, §3.6 |
| 4. Aug. 2026 | **Alle 43 Emoji sollen durch eigene Symbole ersetzt werden.** Prompts dafür in `Icon-Prompts.md`, nach Sichtbarkeit geordnet. | `Icon-Prompts.md` |
| 4. Aug. 2026 | **Auf jede Chat-Eingabe folgt eine Übungs-Empfehlung, auch wenn kein Anliegen erkannt wird.** Christine: "Man soll testen und auf alles soll eine Empfehlung folgen." | §6a |
| 4. Aug. 2026 | **Der Begleiter darf am selben Tag nicht zweimal exakt dieselbe Übung vorschlagen**, wenn ähnlich gefragt wird. Christine: "Bei Kopfweh und Schmerzen lösen ist 2x genau die gleiche Antwort gekommen. Das wirkt nicht professionell." | §6a |
| 4. Aug. 2026 | **Der Begleiter bleibt** (nicht gelöscht) — nach Test mit einem 17 Nachrichten langen, realistischen Gespräch: zuverlässig, deckt viel ab, aber ehrlich eine Wortliste, kein echtes Verstehen. **Jedes Anliegen bekommt ein zweites Mantra**, damit sich nicht nur die Übung, sondern auch der Begleit-Satz abwechselt. | §6a |
| 4. Aug. 2026 | **ENDSTAND Mudra & Mantra (nach mehreren Zwischenschritten am selben Tag — dies ist die gültige Fassung):** **Mudras kommen in der ganzen App nicht mehr vor** ("Mudra ist nirgends in der App drin"). **Das Mantra gibt es an genau einer Stelle: auf der Abschluss-Seite** in der Karte "Brauchst du noch etwas?" — dort passt es zum Zustand *nach* der Meditation. **In der Bibliothek gibt es kein Mantra** ("bei den Meditationen dort findet man nur die Meditationen ohne Mantra"). Die Zwischenschritte (Mantra pro Übung in der Bibliothek; Abschluss-Karte ganz entfernt) sind damit überholt — sie stehen in §3.3a/§3.5 nur noch als Entstehungsgeschichte. | §3.5, §3.3a |
| 4. Aug. 2026 | **Die vier Kategorien in der Bibliothek werden zu grossen Fotokacheln statt schmaler Text-Chips.** Christine, nachdem sie ins Suchfeld "ich suche was, um runterzukommen" geschrieben hatte und nichts fand (die Suche kann nur Stichwörter finden, keine Sätze) — daraus die Idee, die Kategorien prominenter und bildbasiert zu machen. Kein neues Bild nötig: dieselben acht Stimmungsfotos, die schon während einzelner Meditationen laufen (§5a). | §3.3a |
| 4. Aug. 2026 | **Kurswechsel, gleicher Tag: Der Begleiter-Chat wird doch deaktiviert.** Christine, nach Vergleich mit Calm/Insight Timer/Balance: "Ich bin für die verlässliche Lösung." Ersetzt durch Suche/Kategorien (bereits vorhanden) + **Mudra & Mantra pro Übung** in der Bibliothek — eine feste Zuordnung wie beim Mudra/Mantra nach der Meditation, kein Wörter-Raten mehr. **Ausdrücklicher Auftrag: nicht löschen, nur deaktivieren** — die ganze Logik bleibt im Code UND hier in der Spezifikation stehen, damit "aktivier den Begleiter-Chat wieder" jederzeit reicht. | §6a "Deaktiviert, nicht gelöscht" |
| 4. Aug. 2026 | **Die Empfehlung muss durch die ganze Bibliothek wandern, nicht nur durch eine Handvoll.** Christine: "es kommt sehr oft immer Herzraum oder Ankommen am See, Waldlichtung … es gibt vierzig Meditationen und die sollen einfach alle immer wieder vorkommen." | §3.3d |
| 4. Aug. 2026 | **"Deine Favoriten" auf "Mein Weg" wieder entfernt.** Eine startbare Liste ist ein Werkzeug zum Loslegen ("Handeln"), kein Rückblick ("Reflektieren") — die Rolle gehört exklusiv der Startseite ("Deine Lieblingsmeditationen"). Ausserdem war "Deine Lieblingsmeditationen" (Startseite, automatisch die meistgehörten) für Christine kaum von "Deine Favoriten" (Mein Weg, selbst markiert) zu unterscheiden, obwohl beides unterschiedliche Daten sind — zwei fast gleich aussehende Listen auf zwei Seiten lasen sich als Dopplung. | §3.3, §3.3a |

### Funde aus Tests (behoben, nicht zurückdrehen)

| Fund | Abschnitt |
|---|---|
| Safari malt um fokussierte `<svg>` einen eigenen blauen Rahmen — der Fokus liegt darum auf dem umgebenden `<div>`. | §3.2 |
| Die Empfehlung wiederholte sich (10 Durchläufe → 5 verschiedene Übungen von 47). | §3.3b |
| Die Empfehlung wiederholte sich **immer noch**: bei gleichbleibender Kompass-Stellung 12× dieselbe Übung, weil nur *abgeschlossene* Sitzungen zählten. | §3.3d |
| Der Begleiter erkannte "Knieweh" nicht (Christine gemeldet, Screenshot) und fragte nach einem Stichwort, obwohl eines dastand. Der Anliegen "Schmerz" kannte Rücken, Nacken, Kiefer usw., aber keine Wörter für Knie, Hüfte oder Fuss. | §6a |
| "Dein heutiger Fokus" wuchs unbegrenzt und schob die halbe Startseite weg. | §3.3b |
| Die Fortschritts-Grafik wurde nach einem Jahr zu einem durchgehenden Block. | §3.3b |
| Ein ganzes Jahr sah auf der Zeitachse aus wie ein Tag ("4. Aug" bis "4. Aug"). | §3.3b |
| Inselreise: Zahl und Balken sagten Verschiedenes ("32 / 60" neben 7 %). | §3.3b |
| Insel-Woche: erstes Vorher mit letztem Nachher las sich als ein Paar. | §3.6 |
| `.lib-info{ display:flex }` überschrieb das Ausblenden per `[hidden]` (Herkunftsregel: Autor-CSS schlägt Browser-Standard, unabhängig von Reihenfolge/Spezifität) — zugeklappte Mudra/Mantra-Boxen blieben mit vollem Innenabstand stehen und rissen 46px statt 9px Lücke zwischen die Zeilen. | §3.3a |
| Die gestaltete Insel wurde nirgends gespeichert. | §4 |
| Stichwort-Überschneidungen zwischen Anliegen: bei gleicher Wortlänge gewinnt das weiter oben stehende, also das allgemeinere. | §6a |

---

## 1. Tech-Stack (aktuell)

- Reines HTML + CSS + Vanilla JS (ein `<script>`-Block, IIFE)
- Kein Framework, kein Bundler
- Das Insel-Foto (`insel.jpg`) und das Logo (`logo.png`) liegen als eigene Dateien neben `index.html`; das Zifferblatt des Kompasses steckt weiterhin base64-inline im CSS. Das Foto war dreimal eingebettet und hat die Datei um über 400 KB aufgebläht — als Datei lädt es einmal und bleibt im Speicher des Geräts.
- KI-Begleiter ruft `https://api.anthropic.com/v1/messages` direkt per `fetch()` auf (Modell `claude-sonnet-4-6`), mit Fallback-Textbausteinen bei Fehlern/Offline
- Persistenz: **keine** — der State lebt nur in JS-Variablen im Speicher, kein LocalStorage, kein Backend
- **Update-Absicherung fürs Handy:** Seiten, die vom Home-Bildschirm aus geöffnet werden, hält das iPhone gerne hartnäckig im Speicher fest — selbst über ein Schliessen der App hinaus, weil GitHub Pages keine eigenen Cache-Vorgaben pro Datei erlaubt. Direkt nach `<body>` prüft ein kleines Skript eine Versionsnummer (`AKTUELLE_VERSION`) gegen den im Gerät gemerkten Stand und lädt bei Abweichung einmal ganz frisch nach. **Bei jeder für Christine sichtbaren Änderung diese Nummer hochzählen** (z. B. aufs aktuelle Datum), sonst merkt ihr Handy nichts vom Update. Eine Garantie ist das bei iPhones trotzdem nicht — bei hartnäckigen Fällen hilft nur: Symbol vom Home-Bildschirm löschen und neu anlegen.
- **Offline-Fähigkeit (Aug. 2026 ergänzt):** `sw.js` (Service Worker, registriert direkt nach `<body>`) speichert Startseite, Fotos und Logo beim ersten Besuch zwischen (`manifest.json` dazu, macht die App ausserdem "installierbar"). Strategie bewusst *network-first*: online wird immer zuerst das echte Netz gefragt, der Speicher greift nur bei Fehler/offline — damit der Service Worker nicht selbst zu einer neuen Quelle für veraltete Inhalte wird (siehe Update-Absicherung oben). `CACHE_NAME` in `sw.js` bei grösseren Änderungen mit hochzählen, gleiches Prinzip wie `AKTUELLE_VERSION`. Getestet: nach einem ersten Online-Besuch startet die Titelseite samt Foto auch komplett ohne Verbindung.

**Empfehlung fürs neue Repo:** Struktur in echte Komponenten/Routen auflösen (z. B. `/`, `/kompass`, `/meditation`, `/session`, `/abschluss`), State in einen zentralen Store (Context/Zustand/Redux) heben, Fotos als echte Asset-Dateien statt base64.

---

## 2. Design-System

Seit dem Layout-Umbau folgt die ganze App **einer** Vorlage: warmes Creme als Fläche, **Gold als einzige Akzentfarbe**, Serifen-Überschriften, weisse Karten mit weichen Ecken (18px) und viel Ruhe dazwischen. Die früheren Salbei-/Sonnen-Töne und die halbtransparenten "Frosted Cards" über dem Foto sind entfallen — Text steht jetzt fast überall auf hellem Grund und ist dadurch deutlich besser lesbar.

### Farben
| Token | Wert | Verwendung |
|---|---|---|
| `--cream` / `--cream-2` | `#fbecd2` / `#f3ddac` | Seitenhintergrund (Verlauf nach `#f8e2ba`), Symbol-Flächen |
| `--gold` / `--gold-soft` / `--gold-deep` | `#c9a227` / `#e3c86a` / `#8f6f22` | Akzent: Buttons (`--gold-grad`), aktive Chips, aktiver Tab, Kompassring |
| `--ink` / `--ink-soft` | `#1c3b33` / `#4a6158` | Fließtext / Nebentext |
| `--card` | `#ffffff` | Karten |
| `--line` | `#e8ddc6` | Trennlinien, Ränder |
| `--deep` | `#14332c` | Titelseite und Spieler-Hintergrund |

### Typografie
- Fließtext: System-Sans (`-apple-system, Segoe UI, Roboto, …`)
- Überschriften/Logo: `--serif` = Georgia / Iowan Old Style / Palatino / serif-Fallback

**Tab-Leiste — vier Tabs (4. Aug. 2026, Christines Entscheid):**
`Startseite · Kompass · Meditationen · Mein Weg` — erst die beiden Reiter zum **Tun**, dann die beiden zum **Nachschauen**. **"Profil" ist als eigener Tab entfallen** — er war ein Gemisch aus wenig Persönlichem (Foto, Fortschritt) und viel Administrativem (Abo, Konto, Impressum, Datenschutz), Christines eigene Beobachtung. Kein grosser Anbieter in dem Bereich (Calm, Headspace, Insight Timer, Duolingo, Strava) hat einen eigenen Reiter nur für Einstellungen — überall gibt es eine einzige Seite über einen selbst, alles Verwaltende sitzt hinter einem Zahnrad. Das Persönliche ist jetzt Teil von **"Mein Weg"** (§3.3), das Administrative liegt in **"Einstellungen"** (§3.6), erreichbar über das Zahnrad auf "Mein Weg". Details zur Umstellung selbst: §3.6.

Vorher, am selben Tag noch mit fünf Tabs: `Startseite · Kompass · Meditationen | Mein Weg · Profil` — erst die beiden Reiter zum Tun, dann die beiden zum Nachschauen. Davor stand "Mein Weg" zwischen Kompass und Meditationen und trennte damit die zwei Wege, eine Übung zu wählen (sich fragen lassen oder selber stöbern), voneinander. Diese Zwischenstufe ist mit dem Wegfall von "Profil" überholt.

### Wiederkehrende Muster
- **Seitenkopf** (`.page-head`): links Titel (Serif) + eine erklärende Zeile, rechts optional ein rundes Symbol (`.icon-btn`). Auf dem Kompass steht der Titel mittig, links daneben der Zurück-Pfeil.
- **Abschnittsüberschrift** (`.section-label`): Serif, ~1.18rem, gliedert jede Seite in klar benannte Blöcke ("Dein heutiger Fokus", "Dein Zustand", "Dein Fortschritt" …).
- **Karte** (`.card`): weiss, 18px Radius, weicher Schatten — der einzige Container-Typ der App.
- **Buttons**: `.btn-dark` (Gold-Verlauf, dunkelbrauner Text) für die Hauptaktion, `.btn-ghost` (weiss mit Rand) für alles Sekundäre; `.full` macht beide breit.
- **Auswahlreihen** (`.seg`): gleich breite Chips nebeneinander, aktiver Chip in Gold — für Zeit und Anzahl auf dem Kompass.
- **Persistente Tab-Bar** unten (`.tabbar`, 74px, cremeweiss, nur während der Sitzung ausgeblendet): **4 Tabs** — **Startseite · Kompass · Meditationen · Mein Weg** (Steps `home`, `compass`, `meditation2`, `meditation`). `.tab-item{ flex:1 }` verteilt die Breite automatisch neu, wenn sich die Anzahl ändert — beim Wegfall von "Profil" (4. Aug. 2026) musste am Layout selbst nichts angepasst werden.
  - **Namens-Aufräumung (Aug. 2026):** Vorher hiessen Tab und Ziel-Seite jeweils unterschiedlich (Tab "Training" → Seite "My Meditation"; Tab "Übungen" → Seite "Meditationsleiter"). Zwei Namen für denselben Ort machen die App schwer merkbar; **Tab-Beschriftung und Seitentitel sind jetzt identisch**. Ausserdem ist **"Meditationsleiter" als Ortsname verschwunden**: Das Wort bezeichnet einen *Menschen* — Christine nennt sich selbst "Meditationsleiterin" (Titelseite, §3.7) — und stand gleichzeitig über einer Übungsliste. Es bleibt jetzt allein ihrer Berufsbezeichnung vorbehalten. "Übungen" wurde zu **"Meditationen"**, weil genau das drin liegt (47 geführte Meditationen); "Training" zu **"Mein Weg"**, weil die Seite Fortschritt, Ziele und Verlauf zeigt und kein Training ist. Auch die Untertitel wurden dabei nachgezogen, wo sie nicht zur Seite passten: "Meditationen" zeigte "Lass dich begleiten" (das ist die Chat-Karte, nicht die Liste) → **"Alle Übungen zum Stöbern"**; "Mein Weg" nutzte dieselbe zeitabhängige Begrüssung wie die Startseite (`begruessung()`) statt etwas Eigenes zu sagen → fest **"Was du schon geschafft hast"**; die Preis-Seite hiess "Deine Meditationen" — verwechselbar mit der neu benannten Bibliothek — → **"Dein Zugang"** / "7 Tage gratis, danach wie du magst.".
  - **Kein eigenes Tab-Feld mehr für die Titelseite** (vorher "Insel", `data-tab="splash"`): Alles, was dort steht (Preise, Über mich, Konto, Insel gestalten), ist ohnehin über **Einstellungen** erreichbar, ein eigenes Leisten-Feld war doppelt. Der Weg zurück zur Titelseite führt jetzt über zwei Stellen: das **Foto oben auf der Startseite ist antippbar geworden** (`#homeHeroBtn`, führt zu `goToStep("splash")`, dezentes Abdunkeln beim Antippen statt Skalieren, damit am randlosen Foto nichts die Hintergrundfarbe durchblitzen lässt) und der bereits vorhandene Knopf **"🏝️ Zur Titelseite"** ganz unten in den Einstellungen (`#toSplashBtn`, unverändert).
  - **"Profil" als eigener Tab ist entfallen (4. Aug. 2026)** — siehe §3.6 für die Begründung und den vollständigen Umbau.
- **Safe-Area:** `--safe-bottom: env(safe-area-inset-bottom)` wird auf `body`, `.tabbar`, Titelseite und Spieler angerechnet, damit unten nichts hinter dem Home-Indikator verschwindet. Tests können den Wert über `:root{--safe-bottom:34px}` nachstellen.

---

## 3. Seiten-/Flow-Übersicht

Umsetzung weiterhin über ein `data-step`-Attribut auf `<body>` + CSS-Sichtbarkeitsregeln pro Step (kein Router). Reihenfolge:

```
Titelseite → Startseite → Kompass → My Meditation → Spieler (Vollbild) → Abschluss
                  ↺ (Neu beginnen)                        ↳ "Noch eine Meditation" → zurück zu My Meditation
```

Der Insel-Konfigurator (`island`) ist über **Einstellungen → "Meine Insel gestalten"** wieder erreichbar (§4); im Hauptfluss steht er nicht.

### 3.0 Titelseite (`data-step="splash"`)

Die Titelseite ist die Landingpage: Sie hat genau **eine** Aufgabe — den Gratis-Test starten. Aufbau in **drei Bändern**, damit das Foto wirkt und der Blick schnell unten ankommt:

1. **Oben (Kopf, ~20–28 % Höhe):** Logo (52px), darunter der Name **"My Meditation Island"** als Serif-Überschrift (2.5rem, auf schmalen Geräten zweizeilig) und die Subheadline in zwei **gleich grossen** Zeilen: **"Meditationen auf Schweizerdeutsch"** und **"für mehr Ruhe, besseren Schlaf und innere Balance"** (beide .85rem, auf kurzen Geräten .8rem). Gleich gross gelesen wirken sie als *ein* ruhiger Block; die Grösse ist bewusst klein gewählt, damit der Name die Hauptrolle behält Der Name ist bewusst das Grösste: So war es gewünscht, und die Marke soll sich einprägen. Die Chips mit Emoji sind wieder entfallen; die Dauer steht klein unter dem Knopf.
2. **Mitte (`.splash-frei`, flexibel):** bleibt **leer**. Dort liegen Insel, Boot und die Person darin. Der Verlauf ist deshalb geteilt (dunkel oben 0–34 %, klar in der Mitte, dunkel ab 72 %), statt durchgehend über dem ganzen Bild zu liegen.
2b. **Vertrauen:** Ganz unten, als kleinste Zeile der Seite, steht kursiv **"Entwickelt und gesprochen von einer diplomierten Yogalehrerin und Meditationsleiterin ›"** — Herkunft und Qualifikation statt Bewertungen, solange es keine Nutzerzahlen gibt. Bewusst klein und zuunterst (so gewünscht): Sie soll da sein, aber nichts überstrahlen. Antippen führt zu **§3.7 Über mich**. *Gesprochen* ist bewusst gewählt, obwohl die Aufnahmen noch fehlen: Die Repo-Inhaberin nimmt ihre Meditationen demnächst auf, bezahlen kann bis dahin ohnehin niemand (`ABO_LIVE = false`). **Sobald die Bezahlung scharf geschaltet wird, müssen die Aufnahmen da sein** — sonst verspricht die Seite etwas, das die App nicht hält. Die Subheadline wechselt **nicht** mit der Tageszeit: Der Wechsel war ausprobiert und wieder entfernt — die eigene, feste Formulierung ist der Inhaberin wichtiger als der passende Moment.

3. **Unten (Handlung), bewusst tief gesetzt:** goldene Taste **"7 Tage kostenlos testen"** — Zahl vorn, kein Klammerzusatz (der liest sich wie eine Fussnote), und "testen" statt "starten", weil es die Unverbindlichkeit betont; so schreiben es Calm, Headspace und Netflix auch. Sie unterscheidet sich damit klar vom "Anmelden" oben rechts (§3.6a): neu hier gegen schon dabei. Darunter **eine einzige** kleine Zeile mit den zwei antippbaren Wörtern **"▶︎ Kurze Probe"** (startet sofort `dankblitz`, 3 Min — erleben statt glauben, das stärkste Mittel ohne Social Proof) und **"Preise ⌄"**, das eine Glas-Karte aufklappt ("7 Tage gratis testen – ohne Verpflichtung · Danach CHF 3 im Monat oder CHF 25 im Jahr · Jederzeit kündbar, neue Meditationen sind immer dabei" plus **"Alle Einzelheiten ansehen ›"** → Abo-Seite). Die Karte schliesst sich wieder, wenn man das Wort erneut antippt **oder irgendwo daneben** (`pointerdown` auf dem Dokument). So steht der Preis offen da (Vertrauen), ohne die ruhige Seite zu belasten: sichtbar erst, wenn jemand danach fragt. Jede weitere Zeile hier unten schiebt die Taste nach oben ins Bild — deshalb sind Probe und Preise zusammengezogen.

**Sanftes Einblenden beim Öffnen:** Bild (1.4s), Kopf ab 0.35s, Handlungsblock ab 0.7s (`splashBild`/`splashAuf`). Bei `prefers-reduced-motion` steht alles sofort.

**Tab-Bar ist auf der Titelseite ausgeblendet.** Sie kostete 74px genau dort, wo das Boot liegt, und eine Coverseite mit Reitern wirkt nicht ruhig. Hinein geht es über die Taste; erreichbar bleibt die Titelseite von überall über das Foto auf der Startseite (`#homeHeroBtn`) und über **Einstellungen → "Zur Titelseite"**.

**Gemessen mit echter Safe-Area (34px Home-Balken).** Das Boot mit Person und Rudern liegt im Foto zwischen **66,5 % und 75,5 % der Bildhöhe** (im Bild selbst nachgemessen, nicht geschätzt). Geprüft auf acht Grössen — iPhone SE, 13 mini, 8 Plus, 11, 14, 15, 15 Pro Max und ein schmales Android: Auf allen endet der Kopftext oberhalb und beginnt der Handlungsblock unterhalb des Bootes. Am knappsten ist es auf dem SE (11px Luft) und dem 8 Plus (14px).

**Wenn hier etwas dazukommt, zuerst nachmessen:** Jede zusätzliche Zeile unten schiebt die goldene Taste nach oben ins Bild. Deshalb sind Probe und Preise in *eine* Zeile zusammengezogen, und deshalb ist die Erklärung oben zweizeilig statt dreizeilig.

### 3.1 Startseite (`data-step="home"`)
- Seitenkopf mit tageszeitabhängiger Begrüssung (`begruessung()` + Symbol) und rundem Knopf zu "Mein Weg" (`#homeProfilBtn`, seit 4. Aug. 2026 Ziel statt der entfallenen Profil-Seite).
- **Grosses Insel-Foto (randlos), das den Rest der Seite bis zur Tab-Bar auffüllt** — ohne Scrollen soll alles auf den Bildschirm passen. Dafür ist `.home-page` (nur auf diesem Schritt) eine Flex-Spalte mit `min-height:calc(100vh - Tabbar - Safe-Area)`. **Geändert im Aug. 2026 (Christine gemeldet):** Das Foto war darin der einzige dehnbare Baustein (`flex:1 1 0`, `min-height:152px`, `max-height:400px`) und damit der Puffer der Seite — sobald die Liste unter "Dein heutiger Fokus" länger wurde (mehrere Meditationen an einem Tag), wurde das Foto zusammengedrückt, bis hinunter auf 152px. Jetzt `flex:0 0 auto` mit `aspect-ratio:720/678`, also exakt dem Seitenverhältnis der Bilddatei: **das Foto ist auf jedem Gerät und in jedem Zustand gleich gross** (z. B. 390×367 auf einem iPhone 14, 375×353 auf einem SE), immer vollständig sichtbar — bei genau diesem Verhältnis hat `contain` weder etwas abzuschneiden noch Ränder zu lassen. Wächst die Liste, wächst stattdessen die Seite und man scrollt. Alle anderen Abstände auf dieser Seite (Kopf-Abstand, Abschnittsüberschriften, Karten-Innenabstände) sind eigens für die Startseite etwas knapper als anderswo (`.home-page`-Zusatzregeln), damit auch auf einem iPhone SE nichts über die Tab-Bar hinausragt.
  - **Eigenes, zugeschnittenes Foto für die Startseite** (`insel-start.jpg`, 720×678) statt des hochformatigen `insel.jpg` (720×1027), dazu `object-fit:contain`. Der Weg dahin, weil er sich sonst wiederholt: Zuerst wurde am Ausschnitt geschraubt (`object-position` bei 63 %, dann 72 %) — beide Male fehlte etwas, weil das Hochformat viel schmaler ist als der Streifen breit. Dann `contain` auf dem Hochformat: das ganze Bild war sichtbar, aber als schmaler Streifen mit breiten Rändern links/rechts. **Die eigentliche Lösung lag im Bild, nicht im CSS:** `insel-start.jpg` ist der Bereich von 22–88 % der Originalhöhe (Himmel bis unter das Boot, Insel und Boot vollständig) und damit fast quadratisch (1,06 : 1) — praktisch dasselbe Seitenverhältnis wie der Foto-Streifen auf iPhone 14/15 Pro Max. Ergebnis: volle Breite **und** vollständiges Motiv, ohne sichtbare Ränder. Nur auf sehr flachen Streifen (iPhone SE, ca. 1,9 : 1) bleibt ein Rand links/rechts. `insel.jpg` bleibt unverändert für Titelseite und Sitzungs-Hintergrund, wo Hochformat richtig ist.
  - **Ausnahme, ehrlich benannt:** Seit das Foto eine feste Höhe hat (siehe oben), passt die Startseite nur noch im schlanksten Fall ganz ohne Scrollen aufs Handy — sobald heute mehrere Meditationen gelaufen sind oder die Lieblingsliste erscheint, scrollt die Seite. Das ist die bewusste Entscheidung: lieber ein immer gleich grosses Bild und eine längere Seite als ein Bild, das je nach Verlauf anders aussieht.
- **"Dein heutiger Fokus"** — **eine** Karte statt eines Nebeneinanders von Rückblick und Vorschlag (so wie bei Calm, Headspace & Co., nie beides gleichzeitig), und **ohne** etwas zu wiederholen, das schon in "Dein Zustand" direkt darunter steht. Drei Zustände, je nachdem was zutrifft:
  **Reihenfolge der Prüfung (Aug. 2026 korrigiert):** Zuerst wird geprüft, was **heute wirklich gelaufen** ist — vorher stand die Empfehlungs-Prüfung davor, weshalb jemand, der die App neu öffnete ohne den Kompass nochmals zu stellen, "Sobald du deinen Kompass gestellt hast …" sah, obwohl er an dem Tag schon meditiert hatte.
  1. **Noch keine Empfehlung gebaut** (`empfehlung.length === 0` — weder Kompass benutzt noch "Meditationen empfehlen" angetippt): nur der Hinweistext "Sobald du deinen Kompass gestellt hast, erscheint hier deine Meditation für heute." — **ohne** eigenen "Zum Kompass"-Knopf, denn den hat "Dein Zustand" bereits; zwei gleich lautende Tasten direkt untereinander wären dieselbe Handlung zweimal angeboten.
  2. **Empfehlung da, heute aber noch nichts gehört** (`heutigeMeditationen().length === 0`): direkt die **eine** Top-Empfehlung als startbare Karte (`medZeile()`, Play-Taste) — **ohne** vorangestellten Satz zum Zustand ("Dein Kompass zeigt: eher unruhig …"), weil genau dieser Satz schon in "Dein Zustand" steht. Bei mehreren Empfehlungen (Trainingsprogramm-Modus) zusätzlich "Weitere Empfehlungen ansehen →" zur Training-Seite — die Liste selbst lebt dort, nicht doppelt auf der Startseite.
  3. **Heute schon etwas gehört** (`heutigeMeditationen()`, aus dem echten Verlauf): die heute abgeschlossenen Übungen mit Uhrzeit, Dauer und Bereich, statt denselben Vorschlag noch einmal danebenzustellen. **Der Knopf "Noch eine Meditation? →" ist im Aug. 2026 entfallen** — er führte auf "Mein Weg", wo es seit dem Aufräumen (§3.3) gar keine Meditationsliste mehr gibt, lief also ins Leere; ausgewählt wird über den Kompass oder den Reiter "Meditationen", beide stehen unten in der Leiste. Christine hat es bemerkt. **Gleicher Fehler bei "Weitere Empfehlungen ansehen →"** (Fall 2): zeigte ebenfalls auf "Mein Weg" — führt jetzt zur **Kompass-Seite**, wo die weiteren Empfehlungen tatsächlich stehen (`#recResult`).
- **"Deine Lieblingsmeditationen"** (`renderLieblinge()`, `#lieblingeSlot`, Aug. 2026 ergänzt) — die drei **meistgehörten** Meditationen aus dem ganzen Verlauf mit "N Mal gehört". Platzziffern 1–3 standen kurz davor und sind auf Christines Wunsch wieder raus: die Reihenfolge sagt den Rang schon, die Ziffer daneben war nur eine zweite Fassung derselben Information. Bewusst **nicht** dasselbe wie die ⭐-Favoriten (§3.3a): die wählt man selbst aus, diese Liste ergibt sich allein aus dem, was wirklich gelaufen ist — darum auch der andere Name. Erscheint erst, wenn überhaupt eine Meditation **mehr als einmal** gehört wurde (`anzahl > 1`); sonst wäre es nur eine zweite Fassung des Verlaufs direkt darüber und der ganze Block bleibt ausgeblendet.
  Die frühere getrennte Sektion "Auch gut für dich" / "Empfehlung für dich" ist damit entfallen — zwei parallele Blöcke mit derselben Information (Zustand + Vorschlag) waren Redundanz ohne Zusatznutzen, nicht Ergänzung. Ein erster Umbauversuch liess trotzdem in zwei der drei Zustände noch denselben Satz doppelt stehen (Zustandssatz *und* eigener Kompass-Knopf); das ist korrigiert.
- **"Dein Zustand"** — Karte mit dem aktuellen Kompass-Satz (`moodSatz(compassBefore)`), Taste "Zum Kompass →" und einem **kleinen, mitlaufenden Kompass** (`#compassWrapHome`), der sich `compassBefore` mit dem grossen Kompass teilt. Das ist die **einzige** Stelle auf der Startseite, die den Zustand in Worten nennt und zum Kompass führt.
- Alles wird bei jedem Aufruf über `renderHome()` neu aufgebaut, zeigt also immer den aktuellen Stand. `heutigeMeditationen()` filtert `loadHistory()` auf den heutigen Kalendertag (`dayStamp()`) und listet jede einzelne gehörte Übung mit `uhrzeitWort()`.

### 3.2 Kompass ("Wie geht es dir gerade?", `data-step="compass"`)

**Die Bedienung und die ganze Logik dahinter sind unverändert** (Zeiger, Achsen, Empfehlungslogik) — im August 2026 wurde der Rahmen nach einem UX-Audit (15 Kriterien, Premium-Massstab: Headspace/Calm/Balance/Apple Fitness+) grösstenteils neu gebaut. Das Kompass-Foto selbst ist dabei bewusst **nicht** angefasst worden — auf ausdrücklichen Wunsch, weil dafür später eine eigene Logik (z. B. Tageszeit) vorgesehen ist.

- **Beschriftung liegt jetzt *im* Zifferblatt**, waagrecht lesbar (`.dial-label`, kleine SVG-`<text>`-Elemente mit dunklem Schein statt harter Kontur): **Gedanken** oben, **Gefühle** unten, **Entspannt** links, **Angespannt** rechts. Die früheren seitlich gedrehten Aussenbeschriftungen (`writing-mode:vertical-rl`, Kopfneigen zum Lesen nötig) sind komplett entfallen — dadurch kann der Ring selbst deutlich grösser werden: `.compass-wrap` füllt jetzt die volle Zeilenbreite (`max-width:360px`, auf niedrigen Bildschirmen `@media (max-height:760px)` gedeckelt auf `318px`, das sind ~85 % der Breite eines iPhone SE statt vorher ~77 %).
- **Achtung, waagrecht gespiegelt:** In der Vorlage steht links "Entspannt" und rechts "Angespannt" — umgekehrt zur internen Rechnung (`x < 0` = Anspannung). Die *Bedeutung* ist deshalb unverändert geblieben, nur die Zeichnung spiegelt: `nadelX(x) = 200 − x · COMPASS_MAXR`, `nadelY(y) = 200 + y · COMPASS_MAXR`. Jede Stelle, die eine Nadel setzt (Ziehen, Abschluss-Kompass, Reise-Spur, kleiner Kompass auf der Startseite), rechnet über diese beiden Funktionen.
- Die Scheibe selbst: das Zifferblatt-Foto (Insel/Bucht) als runde Fläche (`.compass-photo`, r=150, **unverändertes Bild**), darüber ein **Goldring** mit Verlauf (r=157, 14 breit), vier Punkte und Pfeile an den Polen und acht feine Marken. Beim Betreten der Seite skaliert der Ring sanft von 94 % auf 100 % ein (`@keyframes dialSettle`, 500ms) — der kleine Vorschau-Kompass auf der Startseite (`.compass-wrap.mini`) ist davon ausgenommen. Die Nabe in der Mitte (`.rose-hub`) atmet leise (Skalierung 100→116→100 %, 4s-Loop), solange der Zeiger noch nie bewegt wurde — eine stille Einladung zum Anfassen; sie hört auf, sobald einmal gezogen wurde (`.compass-wrap.touched`), unabhängig für Kompass und Abschluss-Seite.
- **Zeiger unverändert in der Wirkung:** ein frei in der Scheibe verschiebbarer goldener Punkt (`COMPASS_MAXR = 135`), weisse Nabe mit Kernpunkt. Die beiden Achsen bleiben **unabhängig**: waagrecht Anspannung↔Entspannung (`x`), senkrecht Denken↔Fühlen (`y`), jeweils −1…1, gespeichert in `compassBefore`.
- **Status (`#compassReadout`, `renderMoodStatus()`)** in einer Karte mit erhöhtem Symbol-Badge (dezenter Goldrand statt Flachfarbe): eine kleine Eyebrow "GERADE BEI DIR" (vorher "Deine Auswahl"), darunter das Wort mit seiner Abstufung (`moodWort()`) und ein erklärender Satz (`MOODS[...].next`). **Der Wortwechsel blendet weich über** (`ueberblenden()`, 150ms aus/ein) statt hart zu springen — respektiert `prefers-reduced-motion` (dann sofortiger Wechsel ohne Verzögerung). Solange der Zeiger genau in der Mitte steht: "Bewege den Zeiger, um deinen Zustand anzugeben."
- **Leiser Streak-Hinweis** (`#streakNote`, `aktuelleStreak()`): "Du checkst seit N Tagen ein.", nur ab zwei aufeinanderfolgenden Tagen mit echtem Verlaufseintrag, sonst unsichtbar. Reiner Fakt, keine Stufen, keine Punkte.
- **i-Knopf oben rechts** klappt die Erklärung jetzt weich auf/zu (`max-height`-Übergang, 300ms) statt hart umzuschalten, Text auf einen Satz verdichtet: "Oben/unten = Kopf oder Gefühl. Links/rechts = entspannt oder angespannt. Der Zeiger darf überall stehen." **Beim allerersten Besuch** steht sie automatisch offen (`erklaerungBeimErstenMal()`, Merker `myisland.kompass-erklaert.v1`), danach nur über den i-Knopf.
- **Dauer & Trainingsmodus sind jetzt eine ruhige Randnotiz statt zweier permanenter Formularblöcke:** eine Zusammenfassungs-Zeile (`#prefsSummaryBtn`, z. B. "10 Min · Einzelmeditation") klappt bei Antippen den bestehenden Auswahlbereich auf (`#compassPrefs`, `max-height`-Übergang). Die Werte und ihre Logik (`durationV2`, `modus`, `#durationOptsV2`, `#modeRow`) sind unverändert; nur die Bühne ist kleiner. Die aktive Dauer-Kachel zeigt sich über einen **gleitenden Umriss** (`.seg-thumb`, reines CSS über `:has(.opt:nth-child(n).active)`, keine JS-Positionsmessung nötig) statt einer vollflächigen Goldfüllung — Gold bleibt damit dem Haupt-Knopf vorbehalten. *Technische Falle dabei:* Prozentwerte in `translate()`/`translateX()` beziehen sich auf die Breite des transformierten Elements selbst, nicht auf den Container — deshalb positioniert sich der Thumb über `left` (resolved korrekt gegen `.seg`), nicht über `transform`. Die Trainingsmodus-Karten haben je ein kleines Liniensymbol (Punkt / drei Punkte) zur schnelleren Unterscheidung.
- **Die Empfehlung erscheint jetzt weich eingeblendet** (`#recResult`, Fade+Rise 400ms) statt hart per `display:none`/`.show` umzuschalten: Knopf **"Zeig mir, was jetzt passt →"** (`#recommendBtn`, vorher "Meditationen empfehlen →") → Überschrift "Für dich empfohlen", eine Zeile je Übung (Play-Taste poppt beim ersten Erscheinen leicht nach), darunter **"Warum diese Empfehlung?"** (Trennlinie durch Weissraum ersetzt) und **"Jetzt starten"** (`#startRecBtn`). Ein Tipp auf eine einzelne Zeile startet nur diese.
- **Feinschliff:** sehr sanfter, kaum wahrnehmbarer Farbverlauf-Loop im Seitenhintergrund (`body[data-step="compass"]`, 24s, nur die zwei ohnehin vorhandenen Cremetöne — **rührt das Kompass-Foto nicht an**), gestaffeltes Eintreten von Zustandskarte/Zusammenfassung/CTA beim Betreten der Seite, einheitliches Press-Feedback (`transform:scale(.97)` auf `:active`) auf allen antippbaren Elementen der App. Alle neuen Übergänge und Animationen sind über `@media (prefers-reduced-motion: reduce)` abgesichert.

### 3.3 Mein Weg — die eine Seite über dich (`data-step="meditation"`)

Aufbau genau wie in der Vorlage (`renderMyMed()`), die Empfehlung selbst sitzt seit dem Umbau auf der Kompass-Seite (§3.2). Hiess früher "My Meditation" (Tab: "Training") — siehe Namens-Aufräumung in §2.

**4. Aug. 2026, Christines Entscheid — Zusammenlegung mit dem früheren Profil:** Christines Beobachtung: "Mein Weg" zeigte den Fortschritt, aber die frühere Profil-Seite trug **zusätzlich** das Foto und den Inselbewohner — bei gleichzeitig neun Zeilen Verwaltung (Abo, Konto, Impressum, Datenschutz …), "ein Gemisch aus wenig Persönlichem und viel Administrativem". Ihre Frage: sollten Fortschritt/Profil und Verwaltung nicht zwei getrennte Seiten sein? Recherche zu Calm/Headspace/Insight Timer/Duolingo/Strava bestätigte: **ja, genau das machen alle** — eine einzige Seite über einen selbst, alles Verwaltende hinter einem Zahnrad, kein eigener Reiter dafür. Umgesetzt als Möglichkeit A von drei vorgeschlagenen Varianten (B: Profil/Verwaltung tauschen bei fünf Tabs; C: nichts ändern). Ergebnis: **"Mein Weg" ist jetzt die eine Seite über dich** (Foto, Fortschritt, Favoriten), **"Einstellungen"** die administrative Unterseite dahinter (§3.6), der frühere Profil-**Tab** ist komplett entfallen (§2).

Seiteninhalt, in der tatsächlichen Reihenfolge:

1. **Kopf** — "Mein Weg", darunter die Begrüssung (`#fdGreeting`), das Badge "🇨🇭 Schweizerdeutsch" und rechts das **Zahnrad** (`#meinWegEinstellungenBtn`) zu den Einstellungen (§3.6, neu 4. Aug. 2026).
2. **Profilbild + "Dein Inselbewohner"** (`#profilKarte`, vom früheren Profil hierher gezogen) — ein `<div>` mit **zwei** Knöpfen, verschachtelte `<button>` sind ungültiges HTML und die beiden tun ohnehin Verschiedenes: der Avatar links (`#profilAvatarBtn`, mit kleinem Stift-Abzeichen, ohne das er nicht antippbar aussah) öffnet die Bildauswahl, der Rest klappt Insel-Woche/Insel-Reise auf und zu. Bildauswahl: acht Zeichen (🌴🌺🐚🌊⛵🌅🕊️🪷) oder **eigenes Foto**, vor dem Speichern auf **160×160 quadratisch verkleinert** (`<canvas>`, JPEG q=0.82) — ein Handyfoto in Originalgrösse sprengt `localStorage`. Gespeichert unter `myisland.avatar.v1`, wie alles andere nur auf dem Gerät; ein `try/catch` fängt einen vollen Speicher ab und meldet es über die Bestätigungs-Karte statt still zu scheitern.
3. **"Dein Inselbewohner" als Auf/Zu-Schalter** (`#profilInselbewohnerBtn`) für "Deine Inselwoche" und "Deine Inselreise": beide Karten sind standardmässig **zugeklappt**, damit die Seite ruhig bleibt; ein Tipp zeigt sie, der nächste versteckt sie wieder (`setInselbewohnerOffen()`). Untertitel wechselt mit ("Deine Insel-Woche und Inselreise ansehen" ↔ "Weniger anzeigen"), der Pfeil "›" dreht sich um 90°. **Wichtig beim Ändern:** `renderWeek()`/`renderJourney()` setzen `style.display` selbst wieder auf sichtbar, sobald Verlauf da ist — darum ruft `renderMyMed()` am Ende `setInselbewohnerOffen(inselbewohnerOffen)` erneut auf, sonst stünden die Karten nach jedem Aufruf wieder offen. Direkt darunter (nicht erst weiter unten): was ein Knopf aufklappt, muss gleich darunter erscheinen, sonst sucht man es.
   - **"Deine Inselwoche"** (`renderWeek()`, `#profilWeekBox`) — sieben Kreise von Montag bis Sonntag, gefüllt an den Tagen mit einer Sitzung, der heutige Tag zusätzlich umrandet. Zeigt **nur noch das Raster** — Serie und Wochenziel-Bruch sind hier entfernt (4. Aug. 2026, siehe Dopplungs-Hinweis bei "Dein Wochenziel" unten). Hinter **"Details"** die Zeilen mit Vorher/Nachher je Tag: "Zuerst"/"Zuletzt" statt "Vorher"/"Nachher" ab zwei Sitzungen am selben Tag (sonst läse sich ein Tag mit zehn Sitzungen wie ein einziges Vorher-Nachher-Paar). Erscheint erst nach der ersten echten (≥20 Sekunden langen) Meditation.
   - **"Deine Inselreise"** (`renderJourney()`, `#profilJourneyBox`, **zählt seit 4. Aug. 2026 Tage statt Meditationen — siehe §3.3c**) — ein Weg aus fünf Stationen (Angekommen · Ruhiger Anker · Achtsame Entdeckerin · Vertraute Insel · Zuhause auf der Insel), die aktuelle hervorgehoben, darunter "Stufe 3 · …", der Stand ("noch 4 Tage bis zur nächsten Stufe", auf der letzten Stufe "an N Tagen meditiert") und ein Balken. Unter jedem Kreis steht "ab 1/5/15/30/60 Tag(en)" — vorher stand die Schwelle nur im `title`-Attribut, das auf dem Handy nie erscheint. Hinter **"Details"**: "Bisher an X von Y Tagen meditiert" + "Insgesamt Z Meditationen" getrennt, alle fünf Stufen mit Symbol/Name/Schwelle, dann die Muster (wie du meistens ankommst, liebste Übung, Rhythmus, Entwicklung).
4. **Entfallen (Aug. 2026):** Hier stand die Karte "Dein persönliches Meditationstraining" (`.hero-card`, `#toTrainingBtn`). Christine fragte nach, was sie eigentlich anzeigt — die ehrliche Antwort war: nichts Eigenes. Immer derselbe Erklärtext, lediglich die Knopfbeschriftung wechselte zwischen "Jetzt starten →" und "Zum Kompass →". Sie belegte damit den prominentesten Platz der Auswertungsseite, um etwas zu erklären, das auf der Kompass-Seite passiert; der Kompass ist über die Tab-Leiste ohnehin jederzeit erreichbar. Ersatzlos entfernt, samt Klick-Logik und den `.hero-card`-Regeln.
5. **"Dein Fortschritt"** — drei Zahlen aus dem echten Verlauf (`renderStats()`): Tage am Stück, Meditationen, Minuten gesamt. Darüber steht seit Aug. 2026 **"seit <Datum>"** (`startDatum()` — der erste App-Besuch aus `myisland.abo.v1`, ersatzweise der älteste Verlaufseintrag), damit klar ist, worauf sich die Zahlen beziehen. **Die Zahlenreihe ist selbst der Knopf** (`#statsRowBtn`) und klappt darunter die **Fortschritts-Grafik** auf (`renderFortschrittGrafik()`).
   - **Zwei getrennte Diagramme statt eines mit zwei y-Achsen.** Christine hatte "zwei Achsen rechts und links y" gewünscht; das ist der klassischste Diagramm-Fehler überhaupt: bei zwei y-Skalen stehen diese willkürlich zueinander, dadurch behauptet das Bild einen Zusammenhang, den die Zahlen nicht hergeben. Umgesetzt sind darum **"Meditationen pro Tag"** und **"Minuten pro Tag"** als zwei schmale Säulendiagramme untereinander mit **derselben Zeitachse** — gleiche Aussage, ohne die Irreführung. Beide in derselben Farbe, weil es je Diagramm nur eine Reihe gibt; eine zweite Farbe würde einen Unterschied behaupten, den es nicht gibt.
   - **Handgezeichnetes SVG, keine Bibliothek** (`balkenSvg()`) — die App bleibt eine einzige Datei und läuft offline. Säulen mit runder Kappe oben und eckigem Fuss auf der Nulllinie (Pfad statt `<rect>`), max. 24px breit mit 2px Luft dazwischen, hauchdünne Hilfslinien, **nur der Höchstwert** direkt beschriftet (eine Zahl an jeder Säule wäre unlesbar), auf der Zeitachse nur Anfang und Ende. Die Skala (0 und Höchstwert) steht **auf beiden Seiten** — Christine hatte nach der Auftrennung in zwei Diagramme noch eine Beschriftung rechts gewünscht, damit man auch am rechten Bildrand ablesen kann. Es ist bewusst **dieselbe** Skala gespiegelt, keine zweite mit eigener Einheit: genau das wäre wieder die Zwei-Achsen-Falle.
   - **Antippen statt Hover**, weil es auf dem Handy kein Hover gibt: ein Tipp auf einen Tag hebt ihn in **beiden** Diagrammen hervor und schreibt Wochentag, Datum, Anzahl und Minuten in eine Zeile darunter. Die Trefferflächen (`.balken-feld`) sind bewusst breiter als die Säulen.
   - **Zuklappen (Aug. 2026 nachgebessert):** Der Hinweis unter der Zahlenreihe hiess im offenen Zustand "Antippen zum Zuklappen" — er stand damit direkt **über** der Grafik und las sich, als müsse man die Grafik selbst antippen; genau das hat Christine versucht, und dort passiert nichts (die Grafik reagiert nur auf Säulen). Jetzt sitzt ein eindeutiger Knopf **"Grafik zuklappen"** (`#grafikZuBtn`) am Ende der Karte, und der Hinweis darüber wird beim Aufklappen ausgeblendet. Auf- und Zuklappen laufen beide über `grafikOeffnen(auf)`, damit Zahlenreihe und Knopf garantiert dasselbe tun.
   - **Falle beim Ändern:** Der Klick-Zuhörer der Grafik wird als `host.onclick` gesetzt, **nicht** per `addEventListener` — `renderFortschrittGrafik()` läuft bei jedem Aufklappen erneut, mit `addEventListener` würden sich die Zuhörer stapeln und ein Säulen-Tipp mehrfach feuern.
   - Bei weniger als zwei Tagen oder ohne jede Meditation steht statt eines Ein-Säulen-Diagramms ein Satz ("Deine Entwicklung erscheint hier, sobald du an mehr als einem Tag meditiert hast.").
6. **"Dein Wochenziel"** (`renderWochenzielCard()`, `#wochenzielCard`) — **Aug. 2026 ersetzt** die frühere "Deine Ziele"-Liste (vier feste Kategorien, alle mit derselben erfundenen Zielzahl 10, ohne Bezug zu echtem Verhalten und ohne jede Reaktion beim Erreichen — siehe Auditkritik). Christine wollte stattdessen ein **selbst gewähltes** Ziel: entweder "X Mal pro Woche" oder "Y Minuten pro Woche", per Umschalter (`#wochenzielTypRow`, Chips 1–7 bzw. 30–210 Min in `#wochenzielWertRow`) einzurichten über den Knopf "Ziel festlegen"/"Ziel anpassen" (`zeigeWochenzielEditor()`). Gespeichert in `localStorage` (`myisland.wochenziel.v1` = `{ typ, wert }`). Gezählt wird ab **Montag dieser Woche** (`montagDieserWoche()`, dieselbe Wochengrenze wie bei der Inselwoche auf derselben Seite, §3.3) über `wochenFortschritt()`, das die echte Anzahl abgeschlossener Meditationen bzw. deren Minuten (aufgerundet, gleiche Regel wie bei "Minuten gesamt") aus dem Verlauf zählt. Ohne gesetztes Ziel steht eine kurze Einladung, eines festzulegen, statt eines leeren oder falsch befüllten Balkens. **Erreichtes Ziel (4. Aug. 2026):** Ist `erreicht >= ziel.wert`, wechselt die Karte in einen eigenen Zustand — 🌴 neben der Zahl, Untertitel "Ziel erreicht – schön, dass du drangeblieben bist." statt "diese Woche", und der Balken bekommt einen goldenen Rand (`.bar.voll`). Vorher passierte beim Erreichen schlicht **nichts**: der Balken stand voll und sah aus wie "fast voll" — ein Ziel, das sich beim Erreichen nicht meldet, ist ein halber Blindgang. **Nachtrag (4. Aug. 2026):** Die "Deine Inselwoche"-Karte zeigte dieselben zwei Zahlen (Serie, Wochenziel-Bruch) ein zweites Mal — solange sie auf der separaten Profil-Seite stand, fiel das kaum auf. Seit Woche/Reise/Fortschritt auf derselben Seite "Mein Weg" stehen (§3.3), ist die Dopplung entfernt: die Inselwoche zeigt nur noch das Raster und die Vorher/Nachher-Details. **Nachbesserung (Christine, gleicher Tag):** `#wochenzielCard` hatte als reine `.card` ohne eigene Innenabstands-Klasse keinerlei Padding — der volle "Ziel festlegen"-Knopf sass dadurch direkt an der Kartenrundung an und wirkte abgeschnitten. Jetzt mit `padding:16px` wie bei den anderen Karten dieser Seite.
7. **"Deine letzten Meditationen"** — seit Aug. 2026 zunächst nur die **drei** jüngsten Einträge aus `loadHistory()` mit "Heute"/"Gestern"/Wochentag, Dauer und Bereich (`renderHistoryList()`, vorher fünf ohne Ausklappen). Darunter **"Alle N anzeigen"** / **"Weniger anzeigen"** (`#historyMehrBtn`, Zustand in `historyAlle`); der Knopf bleibt ganz weg, solange es höchstens drei Einträge gibt.
8. **Entfallen (Aug. 2026):** "Alle Meditationen entdecken" (die vier Kategorie-Karten und "Ganze Bibliothek ansehen →") und der **Begleiter-Chat**. Beides doppelte genau das, was der Reiter "Meditationen" daneben macht — Christine hat die Dopplung selbst bemerkt. "Mein Weg" ist die Auswertungsseite und bleibt jetzt dabei; Stöbern und Nachfragen passieren in der Bibliothek. Mit entfernt: `initKategorien()`, der `#fdAllBtn`-Listener, die `setupChat("chatBox", …)`-Instanz und die toten `.fd-cat*`/`.companion`-Regeln (`.companion-foto` bleibt — der runde Bild-Platz sitzt jetzt in der `.ki-card` der Bibliothek).
9. **Entfallen (4. Aug. 2026, gleicher Tag nochmals):** "Deine Favoriten" (`#favoritenListe`) — kurz zuvor erst vom früheren Profil hierher gezogen, dann beim kritischen Blick auf die Informationsarchitektur wieder entfernt: eine startbare Liste ist ein Handeln-Werkzeug, "Mein Weg" ist aber die Rückblick-Seite. Favoriten bleiben über den Stern in der Bibliothek und über "Deine Lieblingsmeditationen" auf der Startseite weiterhin leicht erreichbar (G5). `renderFavoritenSektion()` und ihr Aufruf im globalen `data-fav`-Klick-Zuhörer sind mit entfernt.
10. **"← Zurück zum Kompass"**.

**Empfehlungslogik (`empfehlungsPool()` + `baueEmpfehlung()`):** Der Pool sind alle freien Übungen, sortiert nach (1) Kompass-Richtung zuerst, (2) Nähe zur gewählten Zeit (±4 Min), (3) Anspannung — angespannt zuerst kurz und erdend, ruhig zuerst tief —, (4) Restnähe zur Zeit. Daraus baut `baueEmpfehlung()` je nach Trainingsmodus: **Einzelmeditation** = die erste Übung, die in die maximale Dauer passt; **Trainingsprogramm** = bis zu vier Übungen, erst je Richtung eine (Abwechslung), dann auffüllen, solange die Summe in die maximale Dauer passt. Der Begründungssatz entsteht aus dem Zustandswort und den Bereichen der gewählten Übungen. Der Chat setzt seine Empfehlung über `empfohlenVomChat` an die erste Stelle und zeigt sie sofort an.

**Wahrheits-Regeln, die am 4. Aug. 2026 aus der Blindgang-Suche entstanden sind** (gelten überall, nicht nur hier):
- **Kein behaupteter Zustand ohne Angabe.** `zeigeEmpfehlung()` bricht ab, solange `kompassBenutzt === false` und kein Chat-Vorschlag vorliegt, und zeigt stattdessen `#recFehlt` plus ein kurzes Winken der Scheibe. Vorher lieferte "Zeig mir, was jetzt passt →" auch bei unberührter Nadel eine Empfehlung, begründet mit "Dein Kompass zeigt: **ausgeglichen**" — das ist nur der Ruhewert der Nadel in der Mitte, niemand hatte das gesagt.
- **Kein Muster ohne Muster.** In den Inselreise-Details gilt "meistens" erst ab `n >= 2` **und** mehr als der Hälfte aller Male, "Deine liebste Übung" erst ab `n >= 2`. Vorher stand bei fünf verschiedenen Übungen "Deine liebste Übung: Atem-Anker (1×)". Ohne erkennbaren Rhythmus steht das jetzt auch so da.
- **Datum statt nur Wochentag ab einer Woche** (`datumWort()`): eine Meditation von vor drei Wochen hiess schlicht "Dienstag" und war von letztem Dienstag nicht zu unterscheiden — in "Alle anzeigen" standen dadurch lauter gleich aussehende Zeilen.
- **Was wie eine Liste zum Antippen aussieht, muss antippbar sein.** "Deine Lieblingsmeditationen" auf der Startseite war reiner Text; jetzt trägt jede Zeile `data-play` (über `idVonName()`) plus ▶, wird also vom allgemeinen Klick-Zuhörer gestartet.
- **Eine Regel, eine Stelle.** Die Serie ("Tage am Stück") war zweimal ausprogrammiert (`renderStats()` und `computeStreak()`); `renderStats()` ruft jetzt `computeStreak()` auf. Zwei Kopien derselben Regel gehen irgendwann auseinander, und dann zeigen "Mein Weg" und das Profil verschiedene Zahlen für dasselbe.

### 3.3b Was der Langzeit-Durchlauf gezeigt hat (4. Aug. 2026)

Christines Auftrag: die App wie eine Nutzerin durchspielen, zehn Durchläufe hintereinander, und schauen, wie die Statistiken aussehen. Dafür drei simulierte Nutzerinnen (Playwright): **Erstbesuch mit 10 Durchläufen am selben Tag**, **sechs Wochen Verlauf**, **ein Jahr Verlauf**. Gefunden und behoben:

1. **Die Empfehlung wiederholte sich.** Zehn Durchläufe ergaben nur **fünf verschiedene** Übungen, eine davon viermal — bei 47 in der Bibliothek. `empfehlungsPool()` sortierte nur nach Kompass-Richtung und Dauer; bei gleichem Zustand war die Reihenfolge identisch, und ganz oben stand jedes Mal dieselbe Übung. Neu zählt `gehoertWieOft()` mit: noch nie Gehörtes zuerst. **Wichtig:** dieses Kriterium steht *nach* Richtung und Dauer — es sortiert innerhalb dessen, was ohnehin passt, statt Unpassendes nach oben zu holen. Danach: zehn Durchläufe, zehn verschiedene Übungen.
2. **"Dein heutiger Fokus" wuchs unbegrenzt.** Nach zehn Sitzungen an einem Tag hatte die Karte zehn Zeilen und schob Foto, Lieblingsmeditationen und Zustands-Karte weit aus dem Bild. Jetzt höchstens drei (die jüngsten zuoberst) plus eine Zeile "und N weitere heute · zusammen X Min"; die Zeilen sind ausserdem startbar.
3. **Die Grafik wurde nach einem Jahr zu einem braunen Block.** 366 Säulen auf 268 Bildpunkten = 0,73 px pro Tag, bei 2 px Mindestbreite überlappen sie sich lückenlos. Ab **`TAGE_BIS_WOCHEN = 70`** fasst `grafikReihe()` jetzt auf Wochen zusammen (Montag als Grenze, wie überall sonst); aus 366 Säulen werden 53. Titel, Lesart-Zeile und Antipp-Text wechseln mit ("Meditationen pro Woche", "Woche ab 13. Juli: …").
4. **Ein ganzes Jahr sah aus wie ein Tag.** Die Zeitachse beschriftete beide Enden mit `datumKurz()` ohne Jahr — links "4. Aug", rechts "4. Aug". Geht der Zeitraum über einen Jahreswechsel, steht jetzt `datumMitJahr()` dort ("4. Aug 25" bis "3. Aug 26").
5. **Inselreise: Zahl und Balken widersprachen sich.** Der Text sagte "32 / 60 bis zur nächsten Stufe" (gezählt ab null), der Balken darunter zeigte 7 % (gezählt ab der aktuellen Stufe 30). Beides für sich richtig, nebeneinander verwirrend. Jetzt "**noch 28** bis zur nächsten Stufe" — Text und Balken meinen dasselbe.
6. **Insel-Woche: "Vorher/Nachher" bei mehreren Sitzungen am Tag.** Ein Tag mit zehn Sitzungen zeigte das *erste* Vorher und das *letzte* Nachher als ein Paar — das las sich, als sei es über den Tag schlechter geworden, obwohl jede Sitzung für sich entspannter geendet hatte. Ab zwei Sitzungen heissen die Zeilen jetzt "**Zuerst**" und "**Zuletzt**".
7. **"Antippen für deine Entwicklung" führte am ersten Tag zu einer Absage.** Der Hinweis lud ein, die Grafik antwortete mit "erscheint hier, sobald du an mehr als einem Tag meditiert hast". `grafikHatDaten()` blendet die Einladung jetzt aus, solange es nichts zu zeigen gibt — dieselbe Bedingung wie im Inhalt, damit beide nie auseinandergehen.

**Geprüft und in Ordnung:** Minutenzählung (echte Hörzeit, 269 Min bei 32 Sitzungen), Serie, Wochenziel, Favoriten-Filter, Suche inkl. Leermeldung, Datumsangaben ("Gestern", "Sonntag", "27. Jul"), Abo-Seite, alle Zurück-Wege, keine einzige JavaScript-Meldung in drei Durchläufen auf drei Bildschirmgrössen.

### 3.3d Abwechslung in der Empfehlung (4. Aug. 2026)

Christines Meldung: *"es kommt sehr oft immer Herzraum oder Ankommen am See, Waldlichtung. Also es gibt vierzig Meditationen und das sollen einfach alle immer wieder vorkommen."* Nachgemessen, und sie hatte recht — **bei unveränderter Kompass-Stellung kam 12× hintereinander exakt dieselbe Übung**, quer über wechselnde Stimmungen und Dauern nur 21 verschiedene von 47.

**Zwei Ursachen, beide behoben:**

1. **Es zählten nur abgeschlossene Sitzungen.** Der Abwechslungs-Zähler aus §3.3b (`gehoertWieOft()`) liest den Verlauf — der füllt sich aber erst, wenn eine Meditation wirklich zu Ende gehört wurde. Wer den Kompass stellt, den Vorschlag ansieht und *nicht* startet, änderte damit gar nichts: die Sortierung hängt sonst nur an Richtung, Dauer und Typ und ist bei gleichem Zustand identisch. Neu merkt sich die App, was **vorgeschlagen** wurde, unabhängig vom Starten — `letzteVorschlaege()` / `merkeVorschlag()`, gespeichert in `localStorage` unter **`myisland.vorschlaege.v1`** (`{ v:1, ids:[…] }`, jüngste zuerst, `VORSCHLAG_MERKEN = 20` — etwas mehr als die grösste Richtung mit 14 Übungen). `merkeVorschlag()` läuft am Ende von `baueEmpfehlung()`, das genau einmal je `zeigeEmpfehlung()` aufgerufen wird.

2. **Der Feinschliff nach Typ entschied vor der Abwechslung.** Die Reihenfolge war: Richtung → Zeitfenster (±4 Min) → wie oft gehört → **Typ** (angespannt = `mini` zuerst, ruhig = `tief` zuerst) → Zeitnähe. In einer Richtung passt oft nur **eine einzige** Übung in dieses Raster — im Bereich "Gefühle verstehen" bei 10 Min und angespannt ist das genau "Fantasiereise: Ankommen am See". Die kam dann jedes Mal. Der Typ ist jetzt ein Kriterium **nach** der Abwechslung, und ganz am Ende steht eine feste Zufallszahl je Übung, damit bei völlig Gleichwertigem nicht wieder dieselbe oben landet.

**Die Reihenfolge in `empfehlungsPool()` lautet jetzt:** Richtung → Zeitfenster (±4 Min) → **Frische** (noch nie vorgeschlagen zuerst, dann das am längsten Zurückliegende) → wie oft gehört → Typ → Zeitnähe → Zufall.

**Wichtig beim Ändern:** Richtung und Zeitfenster stehen bewusst **vor** der Frische. Die Abwechslung sortiert damit nur innerhalb dessen, was zum Zustand und zur gewählten Zeit ohnehin passt — sie holt nie etwas Unpassendes nach oben, nur damit es "auch mal dran war". Die Zufallszahl wird **einmal je Aufruf in eine Tabelle geschrieben** und nicht direkt im Vergleich gewürfelt; ein Vergleich muss für dasselbe Paar immer dasselbe sagen, sonst ist die Sortierung ungültig.

**Nachgemessen (Playwright, jeweils dieselben Durchläufe gegen die alte und die neue Fassung):**

| | vorher | nachher |
|---|---|---|
| Gleiche Stimmung, 12× hintereinander | **1** verschiedene Übung | **7** verschiedene, dann beginnt die Runde neu |
| 60 Durchgänge quer durch Stimmungen und Dauern | 21 verschiedene, häufigste 6× | **32** verschiedene, häufigste **3×** |
| Direkte Wiederholung hintereinander | 0 | 0 |

Die 7er-Runde im ersten Fall ist kein Rest des Fehlers, sondern die richtige Antwort: bei *exakt* gleicher Stimmung und Dauer passen im betroffenen Bereich genau sieben Übungen ins Zeitfenster, und die App geht sie der Reihe nach durch, bevor sie von vorn beginnt.

**Verlauf löschen räumt das Gedächtnis mit auf** (`VORSCHLAG_SPEICHER` in `profilResetBtn`): bliebe es stehen, während alles andere weg ist, würde die App wochenlang genau die Übungen meiden, an die sich sonst niemand mehr erinnert.

### 3.3a Meditationen — die Bibliothek (`data-step="meditation2"`)

- **Kopf** "Meditationen · Alle Übungen zum Stöbern", darunter die Bestandszahl ("**40** geführte Meditationen"). Hiess früher "Meditationsleiter" (Tab: "Übungen") — siehe Namens-Aufräumung in §2; der Untertitel "Lass dich begleiten" wurde beim Audit vom Aug. 2026 durch etwas Konkreteres ersetzt (er beschrieb nicht, was die Seite eigentlich ist: eine Liste zum Stöbern, kein Chat). Die Spanne "3–30 Minuten" stand früher neben der Zahl und ist entfernt — sie verwirrte, weil bei jeder Übung ohnehin ihre eigene Dauer steht.
- **Suchfeld mit Lupe** (`#libSuche`, Aug. 2026 ergänzt) ganz oben: filtert **während des Tippens**, ohne Absenden. Gesucht wird in Titel, Kurzbeschreibung **und** Bereichsname, damit auch "Stress", "Wald" oder "Chakra" etwas findet und nicht nur der exakte Titel. Die Suche wirkt **zusätzlich** zum gewählten Chip, nicht statt seiner. Die Bestandszeile darunter wechselt dann auf "N Treffer für „…“", und bei null Treffern steht ein eigener Satz (**seit 4. Aug. 2026 ohne Verweis auf den Begleiter**, siehe unten). Ein ✕-Knopf im Feld setzt die Suche zurück (das graue System-✕ von `input[type=search]` ist per CSS abgeschaltet, damit es nicht doppelt erscheint).
- **Filter** (`#libFilters`, `renderLibFilters()`) — zwei Ebenen: **"Alle"** und **"⭐ Favoriten"** bleiben schmale Text-Chips (kein Gefühlszustand, ein Foto dafür wäre nur Dekoration ohne Aussage); die vier eigentlichen Kategorien sind seit **4. Aug. 2026 grosse, antippbare Fotokacheln** (`.lib-cat-tile`, 2×2-Raster) statt schmaler Chips. **Auslöser:** Christine schrieb ins Suchfeld "ich suche was, um runterzukommen" und bekam nichts — die Suche findet nur Stichwörter, keine ganzen Sätze (die richtige Adresse dafür ist der **Kompass**, nicht die Bibliothek). Daraus die Idee, den Einstieg über die Kategorien deutlicher/bildhafter zu machen. **Kein neues Bild nötig:** `LIB_KAT_FOTO` verweist je Kategorie auf eines der acht bestehenden Stimmungsfotos (§5a) — dieselben Dateien, die schon während einzelner Meditationen im Hintergrund laufen: Gedanken beruhigen → `bg-lichtraum.jpg`, Gefühle verstehen → `bg-herzraum.jpg`, Stress lösen → `bg-waldlichtung.jpg`, Entspannen → `bg-bergsee.jpg`. Jede Kachel: Foto (`object-fit:cover`), ein dunkler Verlauf unten für Lesbarkeit, das bestehende Kategorie-Icon **weiss** (`filter:brightness(0) invert(1)` — kein zweiter Bildsatz nötig) plus Name. **Ausgewählt-Zustand doppelt markiert** (Gold-Rahmen **und** ein Gold-Häkchen oben rechts): der Rahmen allein ging bei warmtonigen Fotos (z. B. Wald in Abendlicht) im Bild unter, das Häkchen ist unabhängig von den Bildfarben eindeutig. Antippen filtert die Liste darunter genau wie vorher (`currentCatV2`), wirkt weiterhin **zusätzlich** zur Suche, nicht statt ihr. **Übergang zur Liste (gleicher Tag, Christine: "Sieht es nicht komisch aus, dass die Meditationen dann so Icons haben und oben Bilder?"):** Bunte Fotos direkt über einer Liste mit ruhigen, einfarbigen Symbolen wirkte ohne Trennung wie ein Stilbruch — an sich kein Fehler (Calm/Headspace machen das genauso: Fotos zum Auswählen, schlichte Liste zum Scannen), aber der Übergang dazwischen fehlte. Eine neue Überschrift `#libListLabel` (`.section-label`, gleicher Stil wie überall sonst in der App) schafft die Pause **und** nennt zusätzlich in Worten, welche Kategorie gerade gewählt ist ("Alle Übungen" / "Deine Favoriten" / der Kategoriename) — nicht nur am Foto oben ablesbar, sondern auch als Text (Wahrheits-Regeln, §3.3b). **Nachbesserung (gleicher Tag, Christine: "Abstand von Bilder zur ersten Meditation grösser"):** Die Überschrift trägt jetzt `margin-top:30px` statt der Standard-24px, der Abstand von den Kacheln bis zur ersten Zeile wuchs damit von 20 auf **62px** — die Kacheln stehen sichtbar als eigener Block, die Liste fängt erkennbar neu an.
- **Liste wie in der Vorlage:** je Übung eine weisse Karte mit Bild-Feld (Symbol des Bereichs), Name, "5 Min · Gedanken beruhigen", **Stern** (Favorit), **🤲 Mudra & Mantra** (neu, siehe unten) und **Play**. Bereits gemachte Übungen bekommen "schon gemacht" (`schonGemacht()`).
- **Antippen startet sofort** — die frühere Mehrfachauswahl mit Auswahl-Leiste ist entfallen, mehrere Übungen hintereinander laufen jetzt über den Trainingsmodus (§3.2).
- **Entfallen (4. Aug. 2026): Mudra & Mantra pro Übung** (`mudraMantraFuerUebung()` → später `mantraFuerUebung()`, `toggleMudraMantraInfo()`, ein Knopf je Zeile mit aufklappbarer Karte darunter). Eingebaut als Ersatz für den deaktivierten Begleiter-Chat, am selben Tag in drei Schritten wieder abgebaut: erst fiel das Mudra weg, dann das Ganze — **in der Bibliothek stehen nur die Meditationen selbst**, das Mantra sitzt auf der Abschluss-Seite (§3.5), wo es zum Zustand *nach* der Meditation passt statt zu einer Übung, die man noch gar nicht gehört hat. Mit entfernt: der `[data-info]`-Zweig im globalen Klick-Zuhörer und die Regeln `.mm-btn` / `.lib-info` / `.mm-zeile`. **Zwei Erkenntnisse aus dieser Runde, die bestehen bleiben und beim nächsten Zeilen-Umbau zu beachten sind:** (1) `.lib-info{display:flex}` überschrieb das Ausblenden per `[hidden]` (Autor-CSS schlägt Browser-Standard, unabhängig von Reihenfolge und Spezifität) — zugeklappte Karten blieben mit vollem Innenabstand stehen und rissen 46px statt 9px Lücke zwischen die Zeilen; nötig war ein ausdrückliches `.lib-info[hidden]{display:none}`. (2) Jeder zusätzliche Knopf in der Zeile kostet den Titel spürbar Breite — mit dem Mantra-Knopf blieben dem Text 142px, ohne ihn rund 180px, und Titel wie "Gedanken wie Wolken" passen wieder auf eine Zeile.

- **Zeilen-Layout der Liste (nachgemessen und überarbeitet, 4. Aug. 2026)** — Christines Auftrag "überprüfe Layout und Design, wenn man was optimieren kann". Gemessen auf 390px Breite ergaben sich zwei echte Mängel: (1) **Trefferflächen zu klein** — der Stern war **23×29px**, der Mantra-Knopf **31×30px**; Richtwert für Fingerbedienung sind 44px, und genau das erklärt, warum Christine den Mantra-Knopf zuerst gar nicht fand. (2) **Titel zu eng** — dem Text blieben nur **126px**, dadurch brachen **35 von 47** Titeln auf zwei bis drei Zeilen um, was die Liste unruhig und ungleich hoch machte. Umgesetzt: die drei Knöpfe stehen jetzt in einer eigenen Gruppe `.lib-row-actions` (Innenabstand 1px statt der 12px des Zeilen-Rasters), alle drei sind **38×38px** (so gross, wie neben dem Titel Platz ist — der Play-Knopf war schon immer 38); das Bild-Feld ist **nur in der Bibliothek** auf 52px verkleinert (`.lib-row .row-thumb` — bewusst nicht `.row-thumb` allgemein, dieselbe Klasse tragen auch Verlaufs- und Chat-Zeilen); der Zeilen-Abstand ging von 12 auf 10px. **Zusätzlich entfällt der Bereichsname in der Zeile, solange eine Kategorie gewählt ist** — steht oben schon die goldene Kachel "Stress lösen", sagt "· Stress lösen" an jeder Zeile dasselbe ein zweites Mal und kostet genau die fehlende Breite (bei "Alle" und bei den Favoriten bleibt er, dort ist er echte Information). Ergebnis: Textbreite 126 → **142px**, Titelumbrüche 35/47 → **28/47** (in gefilterter Ansicht 5/12, Umbrüche in der Minuten-Zeile 15 → **0**), Zeilenhöhe 88 → **76px**, Gesamthöhe der Liste 5309 → **4799px**.
- **Favoriten** liegen wie der Verlauf nur auf dem Gerät (`localStorage`, Schlüssel `myisland.favoriten.v1`); sichtbar über den Chip ⭐ in der Bibliothek und über "Deine Lieblingsmeditationen" auf der Startseite (§3.3). Ein eigener Abschnitt auf "Mein Weg" bestand kurz (4. Aug. 2026), ist aber wieder entfernt — siehe §3.3 Punkt 9.

### 3.4 Spieler (Vollbild, `body.entered.in-session`)
- Vollflächiges Insel-Foto mit dunklem Verlauf darüber, oben links ein rundes **✕**, oben mittig wie in der Vorlage drei Zeilen: Position ("MEDITATION 1 VON 2"), Name der Übung und "9 Min · Stress lösen".
- In der Mitte der Anleitungstext, der mit der Zeit durch `steps[]` wandert.
- Unten: Fortschritts-Punkte der Playlist, Fortschrittsbalken, Zeit und **Pause · Vorspulen · Fertig →**.
- Playlist spielt die gewählten Übungen automatisch nacheinander ab (unverändert).
- ⚠️ Geplant (siehe §5a): Hintergrund passend zum Thema der jeweiligen Meditation statt immer die Insel.

### 3.5 Abschluss (`data-step="outro"`)
- Seitenkopf "Wie fühlst du dich jetzt?", darunter derselbe Kompass wie in §3.2 (gleiche Optik, gleiche Bedienung) → `compassAfter`.
- **Deine Reise auf dem Kompass** (`zeichneReise()`): heller Punkt = wo du angekommen bist, gestrichelte Spur bis zur aktuellen Nadel; bei sehr kleinen Wegen (< 0.08) ausgeblendet.
- **Zustand einmal setzen, dann festhalten (4. Aug. 2026, Christines Wunsch: "nur ein Knopf, der sagt: ja, das ist mein Zustand — sonst ändert man ihn die ganze Zeit").** Solange nicht bestätigt ist, lässt sich die Nadel frei ziehen, es wird aber **nichts ausgewertet und nichts gespeichert**: Rückblick (`#recapBox`), Vergleichssatz (`#shiftBox`) und "Zustand nochmals ändern" sind `hidden`, sichtbar ist nur **"Ja, so fühle ich mich jetzt"** (`#outroBestaetigenBtn`). Nach dem Bestätigen sperrt `outroKompass.sperren(true)` die Nadel (neu in `initCompass()`: `gesperrt` blockiert `pointerdown` **und** die Pfeiltasten; der Aufrufer bekommt ein kleines Steuerobjekt `{sperren, neuZeichnen, auffrischen}` zurück), `renderRecap()` läuft **einmal**, und `updateCurrentEntry()` schreibt den Wert in den Verlauf. `#outroAendernBtn` öffnet alles wieder — überschrieben wird derselbe Eintrag (`currentEntryTs`), es entsteht kein zweiter. Der Untertitel der Seite wechselt mit (`#outroSub`), weil "Stell den Zeiger noch einmal ein" bei gesperrter Nadel falsch wäre.
- **`bestaetigt` im Verlaufseintrag (§5).** `recordSession()` schreibt `after` zunächst als Kopie von `before` (damit alte Auswertungen nie auf `undefined` stossen) und setzt `bestaetigt:false`. Ohne dieses Merkmal würde jede weggetippte Abschluss-Seite stillschweigend als "nichts hat sich verändert" in die Statistik einfliessen — eine Aussage, die niemand getroffen hat. `istBestaetigt(e)` behandelt fehlendes Merkmal als `true` (Einträge von vor dieser Änderung). Ausgewertet in der Insel-Woche ("Nachher: nicht angegeben" statt eines erfundenen Werts) und in "Entwicklung" (Schnitt nur über bestätigte Sitzungen, unter drei davon steht stattdessen eine Einladung).
- Status-Karte "Jetzt" mit demselben abgestuften Satz. **Sie zeigt hier NICHT `m.next`** ("Diese Übungen helfen dir zu …") — das ist der Begründungssatz der Kompass-Seite und zeigt nach vorn auf Übungen, die noch kommen. Nach der Meditation ist genau das falsch; Christine hat den Widerspruch im Bildschirmfoto gefunden ("sehr aufgewühlt" und darunter "Diese Übungen helfen dir zu ausgeglichenen, entspannten Gefühlen"). Auf der Abschluss-Seite stehen dort die zwei `bullets` zum Zustand selbst. Unterschieden wird über `el.id === "compassReadout2"`. Im selben Zug behoben: das Symbol daneben (`#stateGlyph2`) wurde nie aktualisiert und stand fest auf 🌅, während die Zeile daneben längst etwas anderes sagte.
- **"Dein Rückblick"** — Vorher/Jetzt in Worten + gemachte Meditationen mit Dauer; darunter ein Satz zur Veränderung (`updateShift()`). **`updateShift()` spricht seit dem 4. Aug. 2026 in Adjektiven, nicht in Kompass-Achsen.** Vorher stand dort "Am Anfang zeigte dein Kompass auf **Denken**, jetzt auf **Fühlen**. Etwas hat sich bewegt." — gebaut aus `DIRS[…].label`, also aus den Achsenbeschriftungen der Scheibe. Christine hat das als schlicht falsch gemeldet: es liest sich, als sei das Fühlen (oder das Denken) nun weg, dabei sind das keine Zustände, sondern zwei Richtungen derselben Scheibe. Gemeint ist immer die Veränderung im Befinden. Der Satz benutzt jetzt `moodWort()` — **dieselbe Quelle wie die Zeilen "Vorher"/"Jetzt" direkt darüber**, sodass beide wörtlich zusammenpassen: "Vorher *sehr angespannt*, jetzt *eher geborgen*. Es ist entspannter geworden." Drei Fälle: fast unverändert (< 0.12 Weg) · gleiches Wort trotz Bewegung · verschiedene Wörter; der Richtungszusatz kommt aus `dx` (Entspannung/Anspannung). **Falle beim Ändern:** nie wieder `DIRS[…].label` in einen für Christine sichtbaren Satz schreiben — die vier Labels sind interne Achsennamen. **Seit Aug. 2026 mit Abstufung** (Christines Wunsch): dort steht "sehr geborgen" statt nur "geborgen". Umgesetzt in `moodHtml()`, das jetzt `moodWort()` benutzt (dieselbe Quelle wie die grosse Anzeige unter dem Kompass) statt nur `moodOf().word` — dadurch stimmen Rückblick und Kompass-Anzeige wörtlich überein, und die Insel-Woche auf "Mein Weg" (§3.3) zeigt die Abstufung automatisch mit, weil sie dieselbe Funktion nutzt. Die Daten dafür lagen ohnehin schon im Verlauf (`before`/`after` als Koordinaten, §5) — das Wort wird bei jeder Anzeige daraus neu berechnet, es musste nichts zusätzlich gespeichert werden.
- **"Brauchst du noch etwas?"** — ein **Mantra** passend zum Zustand *nach* der Meditation (`zeigeMantra()`, `waehlePassend()` wählt deterministisch aus der Nadel-Position, nicht zufällig; `renderRecap()` setzt `#mantraBox` beim Bestätigen zurück, weil ein dort stehendes Mantra sonst zum alten Zustand gehören würde). **Dies ist die einzige Mantra-Stelle der App.** — **Entfallen (4. Aug. 2026): der Mudra-Knopf, der danebenstand** (`#needMudraBtn`, `#mudraBox`, `zeigeMudra()`, die `.mudra-card`-Regeln). Mudras kommen in der Oberfläche nirgends mehr vor; die Liste `MUDRAS` bleibt nur für den deaktivierten Begleiter in der Datei (§6a). — **Entstehungsgeschichte (alles 4. Aug. 2026, drei Schritte an einem Tag):** zuerst fiel das Mudra weg; dann wurde versuchsweise auch das Mantra hier entfernt und stattdessen pro Übung in die Bibliothek gelegt; Christine hat das zurückgedreht — das Mantra passt zum Zustand nach der Meditation, nicht zu einer Übung, die man noch gar nicht gehört hat. Ebenfalls schon früher entfallen: **"Noch eine Meditation"** (Aug. 2026) — direkt nach einer Meditation gleich die nächste anzubieten passte nicht zum Ausklang; wer weitermachen will, geht über "Kompass neu setzen", dann stimmt auch der Zustand wieder.
- **Der Begleiter-Chat auf dieser Seite ist im Aug. 2026 entfallen** (zweite `setupChat()`-Instanz samt `#chatBox2`/`#chatInput2`/`#chatSend2` und dem Kartenmarkup): Nach einer beendeten Meditation braucht es kein Gespräch mehr, der Abschluss soll ruhig ausklingen. Der Begleiter bleibt auf "Mein Weg" und in der Bibliothek erreichbar. `lokaleAntwort()`/`setupChat()` behalten den Parameter `allowRecommend` — er wird jetzt nur noch von der einen verbleibenden Instanz mit `true` benutzt.
- Unten **"Kompass neu setzen"** (`#restartBtn`, vorher "Neu beginnen" — das ging nur zur Startseite und sagte nicht, was passiert) und **"Fertig →"**. "Kompass neu setzen" übernimmt die Aufgabe des entfallenen "Noch eine Meditation": es setzt `compassBefore` auf den Stand **nach** der Meditation, räumt Sitzung/Empfehlung auf und geht zum Kompass. Wichtig dabei: `syncVorherNadel()` zieht Nadel **und** Zustandstext auf den neuen Wert nach — ohne das stimmte zwar der Wert im Hintergrund, die Nadel stand aber sichtbar noch an der alten Stelle (Fehler beim Umbau gefunden und behoben).

### 3.6a Konto / Anmelden (`data-step="konto"`) — Platzhalter

Oben rechts auf der Titelseite sitzt **"Anmelden"** (`.splash-anmelden`, Glas-Pille) — dort suchen es alle, und unten bleibt der Platz fürs Bild frei. Es führt auf die Konto-Seite; auch über **Einstellungen → "Konto & Anmelden"** erreichbar.

Die Seite zeigt drei Dinge:
1. **Status der Probezeit** (`renderKonto()`): noch nicht gestartet / noch X Tage / vorbei — jeweils mit dem ehrlichen Zusatz, dass nichts gesperrt wird, solange `ABO_LIVE = false`.
2. **Anmelde-Formular als sichtbarer Platzhalter**: E-Mail, Passwort, "Anmelden" und "Abo wiederherstellen" — alle Felder `disabled`, dazu das Kennzeichen **"Noch nicht aktiv"**. So sieht man, wie es kommen wird, ohne dass etwas ins Leere führt.
3. **"So wird es laufen"** in drei Schritten: (1) "Jetzt starten" beginnt die 7 Tage ohne Konto und ohne Zahlungsmittel, (2) wer weitermachen will, wählt ein Abo und legt dabei das Konto an, (3) mit diesem Konto meldet man sich auf weiteren Geräten an.

**Warum so:** Genau diesen Ablauf haben Calm, Headspace und Balance — Probezeit ohne Hürde, Konto erst beim Kauf, "Wiederherstellen" für den Gerätewechsel. Ein Konto *vor* dem ersten Erlebnis kostet Interessenten; ein Konto *nie* macht ein Abo unbrauchbar, sobald das Handy wechselt.

**"Jetzt starten"** hält den Beginn der Probezeit in `myisland.abo.v1` fest (`gestartet`), sperrt aber nichts. Sobald die Bezahlung angeschlossen wird, wird aus dem Platzhalter der echte Ablauf: `ABO_LIVE = true`, Formular aktiv, Zahlungsanbieter dahinter.

### 3.7 Über mich (`data-step="ueber"`)

Eine ruhige Karte mit Logo, Begrüssung und drei kurzen Absätzen: diplomierte Yogalehrerin und Meditationsleiterin, alle Meditationen selbst geschrieben und gesprochen auf Schweizerdeutsch, der Kompass als Herzstück. Am Schluss **"Mehr über meine Arbeit: yogaisland.ch"** — bewusst als Text, **nicht** als Link (so gewünscht). Darunter noch einmal die Taste "7 Tage gratis starten".

Erreichbar von der Titelseite (Vertrauenszeile) und über **Einstellungen → "Über mich"**; der Zurück-Pfeil führt jeweils dorthin zurück, wo man hergekommen ist (`ueberZurueck`). Ohne Bewertungen ist die Person hinter der App der stärkste Vertrauensbeweis — deshalb sitzt der Einstieg direkt auf der Landingpage.

### 3.7a Impressum & Datenschutz (`data-step="impressum"`/`"datenschutz"`) — Aug. 2026 ergänzt

Zwei einfache Text-Seiten, gleicher Aufbau wie "Über mich" (`.legal-karte`, wiederverwendet `.ueber-karte`). Erreichbar über **Einstellungen** (zwei Zeilen zwischen "Über die App" und "Verlauf löschen") sowie über zwei kleine Text-Links auf der **Abo-Seite** direkt beim Preis-Hinweis — dort, wo es rechtlich am meisten zählt. Der Zurück-Pfeil führt jeweils dorthin zurück, wo man hergekommen ist (`legalZurueck`, gleiches Prinzip wie `ueberZurueck`).

- **Impressum:** Yoga Island – Christine Maranta Gutmann, Heinrichstrasse 241, 8005 Zürich Schweiz, chris@yogaisland.ch — vollständiger Name und Adresse direkt von Christine bestätigt, der Rest stammt von der echten Seite yogaisland.ch (per Screenshot bestätigt, nicht erfunden).
- **Datenschutz:** ehrlich aus dem tatsächlichen Code abgeleitet, nicht aus einer Vorlage kopiert — insbesondere die Offenlegung, dass der Begleiter-Chat-Versuch technisch eine Verbindung zu Anthropic (USA) aufbaut, auch wenn er mangels Schlüssel immer fehlschlägt (§6), sowie der Hinweis auf GitHub Pages als Hosting-Anbieter.
- **Wichtig, wiederkehrend zu prüfen:** Beide Texte sind sorgfältig, aber keine Rechtsberatung. Vor dem ersten echten Zahlungsvorgang (`ABO_LIVE = true`) sollte das jemand vom Fach gegenlesen — insbesondere muss die Datenschutzerklärung dann um den tatsächlichen Zahlungsanbieter ergänzt werden.

### 3.7b Über die App (`data-step="appinfo"`) — 4. Aug. 2026

Vorher war "Über die App" ein **Blindgang**: der Knopf stand mitten in der Einstellungs-Liste, klappte aber eine Box (`#aboutBox`) auf, die **unterhalb der ganzen Liste** lag — man tippte, sah nichts, und tippte wieder weg. Christine hat genau das gemeldet ("Aktuell ist nichts enthalten"). Jetzt eine eigene Seite mit Zurück-Knopf, gleicher Aufbau wie Impressum/Datenschutz.

Inhalt bewusst **nur Nachprüfbares** — keine Werbeversprechen, keine erfundenen Zahlen:
- ein Einstiegssatz, was die App ist;
- **drei Zahlen aus der App selbst** (`renderAppinfo()`): `MEDITATIONS.length`, `KATEGORIEN.length` und die kürzeste/längste Meditation aus `m.min`. Bewusst berechnet statt fest eingetippt — sonst stimmt der Text nach der nächsten neuen Meditation nicht mehr;
- "So ist es gedacht": Kompass, Bibliothek, Mein Weg, Begleiter — je zwei Sätze, damit man versteht, wofür die vier Reiter da sind;
- "Gut zu wissen": **kein medizinisches Angebot**, nicht beim Autofahren, alles bleibt auf dem Gerät. Der erste Punkt ist inhaltlich wichtig und stand bisher nirgends;
- "Weiter" als Liste zu **Über mich / Datenschutz / Impressum** — die Seite ist damit der natürliche Sammelpunkt für alles Erklärende. `ueberZurueck` bzw. `legalZurueck` werden dabei auf `"appinfo"` gesetzt, sonst landet der Zurück-Pfeil in den Einstellungen und man muss den Weg neu suchen.

**Falle beim Ändern:** Eine neue Seite braucht **drei** Einträge, sonst bleibt sie unsichtbar: die CSS-Zeile bei `body:not(.entered)[data-step="…"]`, einen Eintrag in `STEPS` und den `goToStep()`-Aufruf.

### 3.3c Inselreise: Tage statt Meditationen (4. Aug. 2026)

**Christines Entscheid, nach einer Gegenüberstellung: "so wie Calm."**

**Das Problem** (aus dem Langzeit-Test, §3.3b): Die Reise zählte jede abgeschlossene Übung. Wer an *einem* Nachmittag zehn Übungen hörte, stand damit gleich weit wie jemand, der neun Tage hintereinander je eine machte — teils sogar weiter. Eine Zahl, die sich an einem Nachmittag hochtreiben lässt, verliert ihre Bedeutung; und die App will Regelmässigkeit fördern, nicht Menge.

**Wie es andere machen** (Wissensstand, nicht live nachgeprüft): Calm, Headspace und Insight Timer koppeln den Fortschritt an **Tage**, nicht an Sitzungen; Apple misst Achtsamkeitsminuten *pro Tag*. Gesamtsitzungen und Gesamtminuten stehen daneben als Kilometerzähler, ohne mit den Stufen zu konkurrieren.

**Umgesetzt:** `renderJourney()` zählt über `dayStamp()` die **verschiedenen Tage mit mindestens einer Meditation**. Die Schwellen in `STUFEN` sind jetzt Tage: **1 / 5 / 15 / 30 / 60** (die letzte Stufe entspricht bei regelmässiger Praxis rund drei bis vier Monaten). Anzeige: "noch 4 Tage bis zur nächsten Stufe", unter den Kreisen "ab 5 Tagen", in den Details "**an 29 von 41 Tagen meditiert**" plus separat "Insgesamt 32 Meditationen".

**Bewusst NICHT "Tage am Stück":** Ein verpasster Tag löscht hier nichts. Für eine Insel, die Ruhe verspricht, wäre ein Zähler, der bei Krankheit oder Ferien auf null springt, das falsche Signal. Die Serie gibt es als eigene Zahl auf "Mein Weg" — dort ist sie richtig aufgehoben.

**Drei Zahlen, drei Bedeutungen** (vorher sagten Inselreise und Gesamtzahl dasselbe):
- **Inselreise** → an wie vielen Tagen du da warst (unverlierbar)
- **Tage am Stück** → wie regelmässig gerade (darf reissen)
- **Meditationen & Minuten gesamt** → wie viel insgesamt (Kilometerzähler)

**Falle beim Ändern:** `STUFEN[].ab` sind seit dieser Umstellung **Tage**. Wer die Zahlen anfasst, muss wissen, dass 60 nicht mehr 60 Übungen heisst.

### 3.6 Einstellungen (vorher "Profil", `data-step="einstellungen"`) — 4. Aug. 2026 umgebaut

**Warum diese Seite jetzt anders aussieht:** Bis 4. Aug. 2026 hiess diese Seite "Profil" und war ein eigener Tab — mit Foto, Fortschritt, Insel-Woche/-Reise **und gleichzeitig** neun Zeilen Verwaltung (Abo, Konto, Insel gestalten, Über mich, Über die App, Impressum, Datenschutz, Verlauf löschen). Christines Beobachtung: das sei "ein Gemisch aus wenig Persönlichem und viel Administrativem" — sollten Fortschritt und Verwaltung nicht zwei getrennte Seiten sein? Ein Blick auf Calm, Headspace, Insight Timer, Duolingo und Strava bestätigte das Muster: **überall eine einzige Seite über einen selbst, alles Verwaltende hinter einem Zahnrad, kein eigener Tab dafür.**

Umgesetzt: **Alles Persönliche ist nach "Mein Weg" gezogen** (Foto, Inselbewohner-Karte, Insel-Woche, Insel-Reise, Favoriten — siehe §3.3, Punkte 2–3 und 7). Was hier bleibt, ist **ausschliesslich administrativ**, erreichbar nur über das **Zahnrad** auf "Mein Weg" (`#meinWegEinstellungenBtn`), kein eigener Tab mehr. Die Seite hat jetzt denselben Aufbau wie Impressum/Datenschutz/Über die App: Zurück-Pfeil links, zentrierter Titel ("Einstellungen · Zugang, Konto und rechtliche Angaben"), blanker Platzhalter rechts (`einstellungenBackBtn` → zurück zu "Mein Weg", `renderMyMed()` + `goToStep("meditation")`).

**Inhalt, in dieser Reihenfolge:**
1. **Zugangs-Status** (`renderStatusCard()`, `#statusCard`, unverändert aus dem früheren Profil) — Karte zum Abo-/Testphasen-Zustand, siehe §5.
2. **Liste** (`.list-card`, ohne Abschnitts-Überschrift, da die Seite selbst schon "Einstellungen" heisst): "Abo verwalten" (→ Abo-Seite) · "Meine Insel gestalten" (→ §4) · "Konto & Anmelden" · "Über mich" · "Über die App" (→ §3.7b) · "Impressum" · "Datenschutz" · "Verlauf löschen".
3. Fusszeile: Hinweis, dass alles nur auf dem Gerät liegt, und "🏝️ Zur Titelseite" (`#toSplashBtn`).

**Entfallen, weil jetzt anderswo:**
- **Profilbild + Inselbewohner-Karte** (`#profilKarte`, samt `#avatarOverlay`) — komplett samt Markup nach `#medPage` verschoben, siehe §3.3.
- **Insel-Woche/Insel-Reise** (`#profilWeekBox`/`#profilJourneyBox`) — ebenfalls verschoben; `renderWeek()`/`renderJourney()` werden jetzt von `renderMyMed()` aufgerufen statt von einer eigenen `renderProfil()` (die Funktion ist entfallen, ersetzt durch das schlankere `renderEinstellungen(){ renderStatusCard(); }`).
- **"Favoriten"-Zeile** — war eine Menüzeile, die auf die Bibliothek mit ⭐-Filter sprang (`openCatV2("fav")`); ersetzt durch die vollständige Liste direkt auf "Mein Weg" (§3.3, Punkt 7). Damit auch entfallen: der **"← Zurück zum Profil"-Knopf** (`#medZurueckProfilBtn`/`#medV2ZurueckProfilBtn`, `setProfilZurueck()`) — er hatte nur diesen einen Zweck (nach dem Sprung über "Favoriten" zurückfinden) und ist mit dessen Wegfall komplett aus Markup und Code entfernt, inklusive der zugehörigen `.profil-zurueck`-CSS-Regel.
- **"Statistiken"-Zeile** — war schon vorher (Christines frühere Beobachtung: "Beim Profil Statistiken sieht man genau das, was auf mein Weg ist") ersatzlos entfernt worden; betrifft diesen Umbau nicht mehr direkt, ist hier der Vollständigkeit halber erwähnt.

**Zurück-Wege der Unterseiten geändert:** Alle Menüzeilen, die auf eine Unterseite führen, setzen ihre "Zurück"-Variable jetzt auf `"einstellungen"` statt `"profil"` — `zumKonto("einstellungen")` (Konto), `legalZurueck = "einstellungen"` (Impressum/Datenschutz), `ueberZurueck = "einstellungen"` (Über mich), `aboBackBtn`/`aboBackTopBtn` und `inselBackBtn` gehen direkt auf `renderEinstellungen(); goToStep("einstellungen")`. **Jede Unterseite hat weiterhin einen Zurück-Knopf oben** (`.icon-btn` links im `.page-head`) — diese Konsistenz-Regel von Aug. 2026 gilt unverändert für alle acht Unterseiten.

**`homeProfilBtn` auf der Startseite** (rundes Symbol oben rechts, §3.1) führt seit diesem Umbau ebenfalls zu **"Mein Weg"** statt zum entfallenen Profil (`title` von "Profil" auf "Mein Weg" geändert).

**Falle beim Ändern:** `STEPS` hat keinen `profil`-Eintrag mehr, `TAB_FOR_STEP` keinen `profil`-Tab. Wer versehentlich `goToStep("profil")` aufruft, landet auf keiner sichtbaren Seite (die CSS-Sichtbarkeitsregel greift nur für bekannte `data-step`-Werte). Der richtige Zielwert heisst jetzt **`"einstellungen"`**.

---

## 4. Insel-Konfigurator (über die Einstellungen erreichbar)

Erreichbar über **Einstellungen → "Meine Insel gestalten"** (`data-step="island"`), nicht im Hauptfluss. Eigener Screen mit Live-Vorschau oben (80% Höhe) und kompakter, scrollbarer Filterleiste unten (20% Höhe). Optionen: Wetter (sonnig/wolkig), Meer (ruhig/wellig), Charakter (Geschlecht, Haut-/Haar-/Outfitfarbe per Swatches), Ankunft (Boot/schon da). Größe und Palmenanzahl sind fix auf "Mittel". Insel + Boot + Person sind alle als handgezeichnete SVG-Illustration umgesetzt (kein Foto), inkl. animiertem Boot-Einlaufen, schwimmenden Fischen, Wolken/Sonne je nach Wetter.

**Die Auswahl wird gespeichert (4. Aug. 2026):** `state` lag bis dahin **nur im Arbeitsspeicher**. Wer sich eine Person mit passender Haut-, Haar- und Kleiderfarbe zusammenstellte und die App danach schloss, fand beim nächsten Öffnen wieder die Voreinstellung vor — eine ganze Seite, deren Ergebnis spurlos verschwand, und damit der stillste Blindgang der App (er meldet sich erst beim nächsten Start, wo niemand die Ursache mehr vermutet). Jetzt liegt `state` unter `myisland.insel.v1` im Gerätespeicher: `ladeInsel()` läuft direkt bei der Deklaration, `speichereInsel()` bei **jedem** Klick auf eine Option (nicht erst beim Verlassen der Seite — die Seite wird über die Tab-Leiste verlassen, ein "Verlassen"-Zeitpunkt existiert also gar nicht zuverlässig). `ladeInsel()` übernimmt nur Schlüssel, die in `state` bereits existieren und deren Wert ein String ist — ein alter oder beschädigter Eintrag kann so nichts Fremdes einschleusen.

**Konsistenz-Korrektur (Aug. 2026):** Diese Seite ist die einzige Stelle mit `.topbar`/`.stepper` (eigenes Markup aus der ursprünglichen Skizze, nicht `.page-head` wie der Rest der App) — dabei war ihr Titel bisher sichtbar kleiner als überall sonst (`1.5rem` statt `1.65rem`, Untertitel `.9rem` statt `.88rem`). Beim App-weiten Konsistenz-Check (Christine) aufgefallen und auf dieselben Werte wie `.page-head h1`/`p` gebracht — Struktur/Layout dieser Seite selbst bleiben unverändert, nur die Schriftgrössen sind jetzt einheitlich.

---

## 5. Datenmodell & Kernlogik

### Kompass
```js
compassBefore = { x: -1..1, y: -1..1 }   // x: -1=Anspannung … 1=Entspannung
compassAfter  = { x: -1..1, y: -1..1 }   // y: -1=Denken     … 1=Fühlen

dirFromCompass(c)   // → "nord"|"sued"|"west"|"ost", dominante Achse gewinnt - bestimmt WELCHE
                        //   Uebungen als "Empfohlen" markiert werden (grobe Richtung, siehe §3.3)
moodOf(c)           // → { emoji, word, next } (siehe MOODS: 4 Richtungspaare × 2 Woerter "vert"/"horiz",
                        //   + Sonderfall MOOD_BALANCED "ausgeglichen" bei Betrag < 0.15). Nur der WINKEL
                        //   entscheidet, welcher der beiden Pole eines Quadranten naeher liegt - wie weit
                        //   man zieht (Laenge) spielt bewusst keine Rolle. "next" ist Christines Formulierung
                        //   dafuer, wohin die Uebungen von genau diesem Stimmungswort aus fuehren (siehe
                        //   #recNote in §3.3) - eigenstaendiger Text pro Wort, unabhaengig von dirFromCompass.
moodHtml(c)         // → "<emoji> wort" - kurze Form fuer Listen/Rueckblick ("Vorher: 😊 ausgeglichen")
MOODS[...].bullets  // zwei kurze Beobachtungen je Zustand ("viele kreisende Gedanken") - werden
                        //   auf "Für dich" (§3.3) als Auswertung angezeigt
NUTZEN[dir]         // "Beruhigt kreisende Gedanken" o.ae. - warum eine Uebung empfohlen wird
TIEFE[cat]          // "Kurz und sofort spuerbar" o.ae. - zweiter Grund je Uebung
KATEGORIEN[]        // { dir, icon, name } - Kategorien nach NUTZEN benannt statt nach Kompass-Achse
empfehlungen()      // Top-4 fuer den aktuellen Zustand: Zieldauer zuerst, dann Anspannung (§3.3)
empfehlungsPool()   // ALLE freien Uebungen, beste zuerst. Reihenfolge: Richtung → Zeitfenster
                        //   (±4 Min) → Frische (zuletzt vorgeschlagen rutscht nach hinten) → wie oft
                        //   gehoert → Typ (mini/tief) → Zeitnaehe → feste Zufallszahl. Siehe §3.3d;
                        //   Richtung und Zeitfenster stehen bewusst VOR der Frische.
letzteVorschlaege() // die zuletzt VORGESCHLAGENEN ids aus myisland.vorschlaege.v1 (juengste zuerst)
merkeVorschlag(ids) // schreibt sie dorthin zurueck, gedeckelt auf VORSCHLAG_MERKEN = 20 (§3.3d)
starteMeditation(id)// startet EINE Uebung direkt - der Kern des Coach-Gefuehls
moodStaerke(c)      // → 0..1, wie weit die Nadel vom Zentrum weg liegt (max(|x|,|y|))
moodSatz(c)         // → "Du fühlst dich etwas|eher|sehr <wort>" - Schwellen 0.42 / 0.72;
                        //   in der Ruhezone "Du fühlst dich ausgeglichen". Selbstaussage, nicht
                        //   Beobachtung von aussen ("Du wirkst ...") - die Nadel setzt die Person selbst.
renderMoodStatus(el, c) // baut den Status-Block EINMAL auf (Pille + zwei Achsen-Spuren + Hinweis)
                        //   und aktualisiert danach nur noch Texte und Punkt-Positionen, damit die
                        //   Uebergaenge weich animieren. Genutzt unter beiden Kompassen (§3.2/§3.5).
zeichneReise()      // Abschluss-Seite: Startpunkt + gestrichelte Spur von compassBefore nach
                        //   compassAfter; unter 0.08 Gesamtabstand ausgeblendet (§3.5)
compassText(c)      // Prozent-Variante — nur noch intern für den KI-Kontext genutzt, NICHT mehr im UI
```

#### Geplant (Entwurf von Christine, teilweise umgesetzt): Intensität + Empfehlungslogik

Christine hat die Quadranten-Logik bestätigt/vorgegeben und eine Empfehlungsrichtung je Quadrant sowie ein neues Intensitäts-Konzept beschrieben. Inzwischen umgesetzt: **jedes der 8 Stimmungswörter hat einen eigenen `next`-Text** (`MOODS[...].next`/`MOOD_BALANCED.next`, siehe oben), der in `#recNote` auf der Meditation-1-Seite erscheint statt der groben Richtung:

| Stimmungswort | `next`-Text (umgesetzt) |
|---|---|
| grüblerisch | Diese Übungen führen dich zu ruhigeren, klareren Gedanken. |
| angespannt | Diese Übungen bringen dir mehr Entspannung. |
| unruhig | Diese Übungen bringen dich zurück zur Ruhe. |
| aufgewühlt | Diese Übungen helfen dir zu ausgeglichenen, entspannten Gefühlen. |
| entspannt | Diese Übungen bauen dieses gute Gefühl weiter aus. |
| geborgen | Diese Übungen vertiefen diese Ruhe noch mehr. |
| gelassen | Diese Übungen machen dich noch gelassener und zufriedener. |
| gedankenvoll | Diese Übungen führen zu weniger, dafür klareren und ruhigeren Gedanken. |
| ausgeglichen (Zentrum) | Diese Übungen helfen dir, dieses Gleichgewicht zu halten. |

**Umgesetzt — Intensität in der Anzeige:** Die Distanz vom Zentrum zählt inzwischen mit, allerdings zunächst nur für den **angezeigten Zustand**: `moodStaerke()` liefert 0…1, `moodSatz()` macht daraus "etwas" (< 0.42) / "eher" (< 0.72) / "sehr" — genau die Abstufung, die Christine beschrieben hat (sehr angespannt → etwas angespannt → neutral → ruhig → sehr entspannt). Die Ruhezone ist auf dem Kompass zusätzlich als gestrichelter Kreis sichtbar (§3.2). Christines Achsen-Bedeutungen dahinter:
- Gedanken-Achse (Richtung Denken): aussen = sehr viele/rasende Gedanken, Richtung Mitte = ruhige, klare Gedanken.
- Gefühle-Achse (Richtung Fühlen): aussen = sehr belastende/intensive Gefühle, Richtung Mitte = ausgeglichene Gefühle.
- Anspannungs-Achse: Anspannung ↔ Entspannung bleibt ein Pol-zu-Pol-Gegensatz (kein Zentrum-Konzept nötig).

**Teilweise umgesetzt — welche Übung vorgeschlagen wird:** Die Auswahl richtet sich inzwischen nach Kompass-Richtung, gewählter Zeit **und** Anspannungsseite (§3.3, `empfehlungen()`), plus je zwei abgeleiteten Begründungen (`NUTZEN`/`TIEFE`). Damit sieht jeder der acht Zustände eine andere Liste. **Noch offen** bleibt eine echte inhaltliche Klassifizierung je Meditation (welche Übung passt zu welchem Stimmungswort und welcher Intensitätsstufe) — die liefert Christine nach; erst damit liesse sich z. B. "traurig" von "grüblerisch" inhaltlich unterscheiden statt nur über Richtung und Dauer.

### Meditationen
```js
DIRS = { nord:"Denken", sued:"Fühlen", west:"Anspannung", ost:"Entspannung" }  // + je ein Erklärsatz

MEDITATIONS[] = {
  id, dir ("nord"|"sued"|"west"|"ost"), cat ("mini"|"mittel"|"tief"),
  name, min (Zahl), desc, steps: [ "...", "...", ... ]  // Anleitungstexte, zeitlich verteilt über die Dauer
}
```
- **47 handgeschriebene Meditationen insgesamt** (14 mini / 17 mittel / 16 tief) — siehe §5a für die volle Titelliste. Kein Generator mehr: `generateLibrary()`/`THEMES`/`PHRASES` wurden entfernt, jeder Eintrag ist ein einzeln geschriebenes Skript.
- Das Feld `cat` ("mini"/"mittel"/"tief") steuert jetzt die Empfehlungs-Reihenfolge auf "Für dich" (§3.3, kurz-zuerst bei Anspannung) und liefert über `TIEFE[cat]` den zweiten Empfehlungsgrund. Als sichtbare Gliederung wird es nicht mehr benutzt — beide Seiten gruppieren nach Kompass-Richtung bzw. Nutzen-Kategorie.

### Mudras & Mantras (Abschluss-Seite)
```js
MUDRAS[]  = { dir, name, how, why, dauer?, chakra?, silbe? }   // 21 Eintraege, Erklaerung auf Hochdeutsch
MANTRAS[] = { dir, text, why }        // 20 Eintraege, 5 je Richtung, auf Hochdeutsch

waehlePassend(liste, c)  // filtert auf die zu c passende Richtung, waehlt daraus DETERMINISTISCH
                          // (aus c.x/c.y berechneter Index, kein Math.random()) genau 1 Eintrag -
                          // dieselbe Nadel-Position liefert also immer dasselbe Ergebnis
zeigeMudra()/zeigeMantra()  // rendern die Karte in #mudraBox/#mantraBox, Richtung/Position kommt aus compassAfter
```
- **`dauer`/`chakra`/`silbe` (Aug. 2026 ergänzt):** Christine hat einen eigenen Mudra-Guide (mit den 7 wichtigsten Mudras, je mit Chakra, Wirkung, empfohlener Dauer und Mantra-Silbe). Die 7 Mudras aus `MUDRAS[]`, die dort namentlich vorkommen (Gyan, Hakini, Hridaya, Anjali, Apana, Prana, Surya), haben `dauer`/`chakra`/`silbe` wörtlich aus diesem Dokument übernommen; `zeigeMudra()` und die direkte "gib mir ein Mudra"-Antwort in `lokaleAntwort()` zeigen die Zeile, wenn sie vorhanden ist. **Surya Mudra** (dir: "ost", passt zu Müdigkeit/Erschöpfung/Energie-Stichwörtern) gab es vorher nur im Guide, nicht in der App — jetzt als 21. Eintrag ergänzt, `how` dafür ist eine eigene, sachlich korrekte Anleitung (nicht im Guide enthalten, da der dort nur Wirkung/Anwendung/Dauer/Mantra zeigt, keine Handhaltungs-Anleitung). Für die übrigen 14, nur in der App vorhandenen Mudras wurde bewusst nichts erfunden — dort bleiben alle drei Felder leer und die Zeile entfällt einfach.

## 5a. Themenvielfalt (umgesetzt)

**Entscheidung:** Die Insel bleibt das einzige Bild/Branding der App (kein zweites, drittes Landschafts-"Skin"). Die *Meditationen selbst* sind inhaltlich breiter als vorher — nicht mehr nur Strand/Palmen/Wellen, sondern klassische Themen aus Achtsamkeit, Körperarbeit und Alltagsbewältigung. Die vier Kompass-Richtungen (Denken/Fühlen/Anspannung/Entspannung) bleiben als Zuordnungs-Logik bestehen; jedes Thema hat weiterhin eine Richtung zugeordnet, damit die Empfehlungslogik unverändert funktioniert.

**Umgesetzte Titelliste (47 Meditationen, alle handgeschrieben)** — ersetzt die früher automatisch generierten "Insel-<Thema>"-Einträge aus `THEMES[dir]`/`PHRASES[dir]` (dieser Generator inkl. `generateLibrary()` wurde entfernt, `MEDITATIONS[]` enthält jetzt alle 47 Einträge direkt). Jeder Titel ist einer Kategorie, einer festen Dauer und einer Kompass-Richtung zugeordnet, damit sowohl die Richtungs-Empfehlung (Meditation 1) als auch die Dauer-Auffüllung (Meditation 2) über die ganze Liste hinweg genug Auswahl haben — nicht nur ein, zwei Themen decken jede Dauerstufe ab. Titel in *Kursiv* sind die 8 ursprünglichen Flaggschiff-Skripte, die unverändert geblieben sind.

**7 neue Meditationen (Aug. 2026, auf Wunsch von Christine):** vier davon füllen die Chakra-Reihe auf — Wurzel-, Herz- und Stirnchakra hatten schon eine eigene Meditation, **Kronenchakra, Halschakra, Solarplexuschakra und Sakralchakra** vorher nicht (die grosse "Chakren-Reise" streift alle sieben nur kurz). Dazu drei eigenständige, nicht chakra-gebundene Themen: **Seelenmeditation, Kiefer entspannen, Reinigende Meditation**. Vor dem Schreiben abgeglichen, welche Chakren schon eine eigene Meditation hatten, um keine Dopplung zu erzeugen — Christine hat daraufhin bestätigt, dass die bestehenden "Stirnchakra – Klarheit" und "Wurzelchakra – Erdung" ausreichen und keine zweite, überlappende Version dazu nötig ist.

**Mini (3–6 Min), 14 Titel:**

| Titel | Dauer | Richtung | Themenfamilie |
|---|---|---|---|
| *Atem-Anker* | 5 | Denken | Atem/Fokus |
| *Wellen-Atem* | 4 | Anspannung | Atem/Kurzintervention |
| *Dankbarkeit am Strand* | 5 | Entspannung | Dankbarkeit (Insel) |
| Kurzer Körper-Scan | 6 | Entspannung | Körperarbeit |
| Erdungsatem | 4 | Anspannung | Erdung |
| Kurze Lichtmeditation | 5 | Entspannung | Licht |
| Dankbarkeits-Blitzlicht | 3 | Fühlen | Dankbarkeit |
| Vertrauens-Anker | 6 | Entspannung | Vertrauen |
| Kraft-Impuls | 4 | Anspannung | Stärke |
| Herz beruhigen | 3 | Fühlen | Herz |
| Freundlicher Blick auf mich | 5 | Fühlen | Selbstmitgefühl |
| Fantasiereise: Ankommen am See | 6 | Fühlen | Fantasiereise |
| Feierabend-Übergang | 4 | Denken | Alltag |
| Kiefer entspannen | 4 | Anspannung | Körperarbeit |

**Mittel (7–14 Min), 17 Titel:**

| Titel | Dauer | Richtung | Themenfamilie |
|---|---|---|---|
| *Gedanken wie Wolken* | 8 | Denken | Gedankenarbeit |
| *Herzraum* | 7 | Fühlen | Herz |
| *Gefühle benennen* | 6 | Fühlen | Gefühlsarbeit |
| *Stille genießen* | 6 | Entspannung | Ruhe |
| Wurzelchakra – Erdung | 9 | Anspannung | Chakra |
| Herzchakra – Weite | 11 | Fühlen | Chakra |
| Stirnchakra – Klarheit | 9 | Denken | Chakra |
| Vertrauen aufbauen | 11 | Entspannung | Vertrauen |
| Innere Stärke | 9 | Anspannung | Stärke |
| Loslassen, was nicht mehr trägt | 13 | Anspannung | Loslassen |
| Verzeihen – ein erster Schritt | 11 | Fühlen | Verzeihen |
| Alltag einer berufstätigen Mutter | 13 | Denken | Alltag |
| Fantasiereise: Waldlichtung | 9 | Entspannung | Fantasiereise |
| Kronenchakra – Körperfreiheit | 9 | Entspannung | Chakra |
| Solarplexuschakra – Willensstärke | 7 | Entspannung | Chakra |
| Sakralchakra – Vertrauen | 8 | Fühlen | Chakra |
| Reinigende Meditation | 8 | Entspannung | Reinigung/Loslassen |

**Tief (15–30 Min), 16 Titel:**

| Titel | Dauer | Richtung | Themenfamilie |
|---|---|---|---|
| *Körper lösen* | 10 | Anspannung | Körperarbeit |
| Grosses Loslassen | 19 | Anspannung | Loslassen |
| Chakren-Reise: alle sieben Zentren | 27 | Denken | Chakra (umfassend) |
| Lichtmeditation – Ganzkörper | 23 | Entspannung | Licht |
| Tiefes Vertrauen | 19 | Entspannung | Vertrauen |
| Innere Stärke vertiefen | 23 | Anspannung | Stärke |
| Verzeihen – dir selbst und anderen | 27 | Fühlen | Verzeihen |
| Schwangerschafts-Reise: Verbindung zum Kind | 23 | Fühlen | Lebensphase |
| Fantasiereise: Bergspitze | 30 | Denken | Fantasiereise |
| Fantasiereise: Winterlandschaft | 19 | Denken | Fantasiereise |
| Fantasiereise: Insel | 27 | Fühlen | Fantasiereise (Insel) |
| Yoga-Nidra-artige Tiefenentspannung | 30 | Entspannung | Tiefenentspannung |
| Dankbarkeits-Reise (ausführlich) | 15 | Fühlen | Dankbarkeit |
| Geduld im Umgang mit Kindern (vertieft) | 15 | Anspannung | Alltag/Kinder |
| Halschakra – Widerstände lösen | 10 | Anspannung | Chakra |
| Seelenmeditation | 12 | Fühlen | Selbstverbindung |

**Verteilung über die vier Kompass-Richtungen** (Summe über alle 47): Denken 8 · Fühlen 14 · Anspannung 12 · Entspannung 13. Nicht perfekt gleich, aber bewusst nah dran — Fühlen ist am stärksten besetzt, weil sich viele der gewünschten Themen (Herz, Dankbarkeit, Verzeihen, Chakra-Herz, Schwangerschaft, Seelenmeditation) inhaltlich dort einordnen. Falls das zu schief wirkt, liesse sich z. B. "Fantasiereise: Insel" oder "Dankbarkeits-Reise" auf Denken/Entspannung umlegen, ohne die Titel selbst zu ändern.

**Dauer-Abdeckung je Kategorie:** Mini deckt 3–6 Min in allen vier Stufen mehrfach ab, Mittel deckt 6–13 Min, Tief deckt 10–30 Min inklusive der 30-Min-Stufe. Damit hat die Dauer-Auffüllung in Meditation 2 (§3.3a, `autoFillV2()`) in jeder Kategorie und Richtung genug Auswahl, um nah an die gewünschte Zieldauer zu kommen, statt immer auf denselben ein, zwei Titeln zu landen.

**Bildsprache pro Meditation (Aug. 2026 umgesetzt):** Der Session-Hintergrund passt jetzt **zur jeweiligen Meditation**, statt überall dasselbe Insel-Foto zu zeigen. `MEDITATIONS[]`-Einträge haben dafür ein optionales Feld `bg` (Dateiname); `loadQueueItem()` setzt `#sessionBg img` bei jedem Wechsel neu auf `med.bg || "insel.jpg"` (§3.4). Die 8 Foto-Familien aus dem ChatGPT-Bildprompt (bild-prompts.html) sind eingetroffen und liegen als `bg-<familie>.jpg` (720 px breit, wie `insel-start.jpg`) im obersten Ordner:
- `bg-waldlichtung.jpg` — Fantasiereise Waldlichtung, Erdungsatem, Wurzelchakra – Erdung, Innere Stärke
- `bg-bergspitze.jpg` — Fantasiereise Bergspitze, Innere Stärke vertiefen, Solarplexuschakra – Willensstärke
- `bg-winterlandschaft.jpg` — Fantasiereise Winterlandschaft
- `bg-bergsee.jpg` — Fantasiereise Ankommen am See, Vertrauen aufbauen, Tiefes Vertrauen, Sakralchakra – Vertrauen
- `bg-lichtraum.jpg` (abstraktes Licht) — Kurze Lichtmeditation, Lichtmeditation – Ganzkörper, Chakren-Reise, Stirnchakra – Klarheit, Yoga-Nidra-artige Tiefenentspannung, Kronenchakra – Körperfreiheit, Halschakra – Widerstände lösen
- `bg-warmeszuhause.jpg` — Feierabend-Übergang, Alltag einer berufstätigen Mutter, Geduld im Umgang mit Kindern
- `bg-herzraum.jpg` — Herzraum, Herzchakra – Weite, Verzeihen (beide Stufen), Gefühle benennen, Dankbarkeits-Reise, Seelenmeditation
- `bg-reinigend.jpg` (ein achtes, zusätzlich geliefertes Strand/Wasser-Bild) — Reinigende Meditation, weil ihre Anleitung selbst von durchfliessendem Wasser spricht
- Alle übrigen Meditationen (u. a. alle Insel-Meditationen, Kurzer Körper-Scan, Kraft-Impuls, Vertrauens-Anker, Kiefer entspannen) haben kein `bg` und zeigen weiterhin die Insel — bewusst der Grundton der App, kein Darstellungsfehler.

**Die vier Kategorie-Symbole (Aug. 2026 umgesetzt):** `KATEGORIEN[].icon` sind keine Emoji mehr, sondern Dateinamen (`icon-gedanken.png`, `icon-gefuehle.png`, `icon-stress.png`, `icon-entspannen.png` — feine goldene Linienzeichnungen, Kopf-Profil/Herz-mit-Welle/Bambus/Blatt, aus demselben ChatGPT-Prompt, **mit transparentem Hintergrund** freigestellt). `katIcon(dir)` baut daraus ein `<img class="kat-icon">`; die CSS-Klasse skaliert per `em` mit der Schriftgrösse des jeweiligen Orts (Filter-Chips, Kategorie-Karten, Listen-Thumbnails), sodass an allen vier bisherigen Emoji-Stellen (`initKategorien()`, `renderLibFilters()`, `katIcon()`-Aufrufe in den Listenzeilen) automatisch dasselbe Bild erscheint. **Drei Nachbesserungsrunden (Christine, gleicher Tag):** Erst gingen die dünnen goldenen Linien im hellen `--cream-2`-Hintergrund fast unter — als erster Versuch bekamen `.row-thumb`/`.fd-cat-icon` denselben Ring-Look wie der Zustands-Glyph beim Kompass (`.readout-card .glyph`, §3.2). Das wirkte dann selbst zu dominant: der Rahmen zog mehr Aufmerksamkeit auf sich als das Icon — Ring/Verlauf wieder entfernt, Hintergrund flach, Icon per `em` grösser (`1.4em` → `1.55em`, in `.fd-cat-icon` `1.7em`). Auch das reichte noch nicht: die Original-Linien aus dem ChatGPT-Bild waren selbst bei grösserer Anzeige zu duenn/blass, um bei Alltagsgrösse (30–40 px) lesbar zu sein. Die vier PNGs sind ausserdem neu aus der Originaldatei aufbereitet — Alpha-Maske aus dem Farbabstand zum Hintergrund, mit `ImageFilter.MaxFilter` **dilatiert** (Linien künstlich verdickt) und durchgehend auf einen einzigen satten, dunklen Goldton (`rgb(143,107,26)`) statt der ausgefransten Verlaufsfarben gesetzt — kräftige, klar lesbare Striche statt der ursprünglich zarten, teils halbtransparenten ChatGPT-Linienführung. **Vierte Runde:** Christine wollte das ganze Icon-Feld (Bild **und** Hintergrund zusammen), nicht nur das Symbol darin, spürbar grösser. `.row-thumb` ist jetzt 64×64px (vorher 50), `#focusSlot .row-thumb` 44×44 (vorher 38, dort bewusst etwas zurückhaltender wegen des knappen Platzes auf der Startseite ohne Scrollen, siehe §3.1), `.fd-cat-icon` 46×46 (vorher 34). Die Icon-Grösse selbst folgt jetzt in diesen drei Feldern nicht mehr `em`, sondern **Prozent der Feldgrösse** (`.row-thumb .kat-icon`/`.fd-cat-icon .kat-icon` je `76%`) — wächst das Feld künftig nochmal, wächst das Icon proportional automatisch mit. Die Chip-Variante (`.kat-icon` ohne Feld-Kontext, in `renderLibFilters()`) bleibt bei fester `em`-Grösse, da sie inline neben Fliesstext steht, wo ein Prozentwert vom Zeilenkasten statt vom Icon selbst ausginge.

### Auswahl-Logik
```js
chosenMedIds = []        // Reihenfolge = Playlist-Reihenfolge; auf "Für dich" immer genau eine
empfohlenVomChat = null  // Vorschlag des Begleiters, rutscht in empfehlungen() nach ganz oben
completedLog = []        // [{name, min, seconds}], während der Session befüllt

chosenMedIdsV2  = []     // eigener Auswahl-Zustand für die Bibliothek
currentCatV2    = null   // dort gewählte Kategorie
durationV2      = 10     // Minuten, auf der Kompass-Seite gewählt - wirkt auf BEIDE Seiten
desiredCountV2  = 2      // 1..3, auf der Kompass-Seite gewählt - wirkt nur auf die Bibliothek
```
**"Für dich"** (§3.3): `empfehlungen()` sortiert die Übungen der Kompass-Richtung nach (1) Nähe zur gewählten Zeit, (2) Anspannung (kurz-zuerst wenn angespannt, tief-zuerst wenn ruhig), (3) Restnähe zur Zeit. Die erste Übung wird als grosse Karte gezeigt, die nächsten drei kleiner; ein Antippen startet direkt (`starteMeditation()`). **Bibliothek** (§3.3a): `autoFillV2()` füllt beim Öffnen einer Kategorie bis `desiredCountV2`/`durationV2` auf, Mehrfachauswahl bleibt möglich.

### Session/Playlist
```js
session = { timer, elapsed, total, paused, queue: MeditationObjekt[], index }
```
`advanceQueue()` schaltet automatisch zur nächsten Übung, `completedLog` wird dabei fortlaufend befüllt (auch bei vorzeitigem Abbruch via "Fertig").

**Minuten zählen — `minutenAus(sekunden)` (4. Aug. 2026):** Es gibt genau **eine** Stelle, die Sekunden in Minuten umrechnet, und sie wird **immer erst auf die Summe** angewendet, nie je Meditation. Vorher stand an vier Stellen `Math.ceil((m.seconds||0)/60)` **pro Übung** — neun Sitzungen zu je 4:10 ergaben damit 9 × 5 = 45 statt der tatsächlichen 37 Minuten. Christines Meldung war "Die Minuten … sollte nur die reinen Minuten sein, die man auch wirklich gehört hat". Die *gespeicherte* Zahl war dabei nie falsch: `recordSession()` schreibt `session.elapsed`, also die wirklich gelaufene Zeit — wer früher stoppt, hatte auch vorher schon nur seine echte Zeit im Speicher. Falsch war nur das Aufrunden beim Anzeigen. `minutenAus()` rundet kaufmännisch und gibt für echte Zeit nie "0 Min" zurück (`Math.max(1, …)`). Betroffen und umgestellt: `wochenFortschritt()`, `renderStats()`, `tagesreihe()` und beide Verlaufs-Listen.

**Falle beim Ändern:** Wer irgendwo wieder `/60` direkt rechnet, holt den Fehler zurück — immer erst `sekunden` summieren, dann einmal `minutenAus()`.

### Steps
```
STEPS = { splash, home, island (über Einstellungen), compass, meditation, meditation2, outro, einstellungen, abo, ueber, konto, impressum, datenschutz, appinfo }
TAB_FOR_STEP = { home:"home", compass:"kompass", meditation:"meditation", meditation2:"meditation2" }
// "profil" ist seit 4. Aug. 2026 kein Step mehr - "einstellungen" hat keinen eigenen Tab (§3.6)
// "splash"/"outro"/"abo"/"island" haben keinen eigenen Tab
```

---

## 6. KI-Begleiter

- **Nur noch eine Chat-Instanz**, und zwar in der Bibliothek (§3.3a, `allowRecommend = true`). Die auf der Abschluss-Seite ist im Aug. 2026 entfallen (§3.5), die auf "Mein Weg" ebenfalls — sie doppelte die in der Bibliothek (§3.3).
- System-Prompt: warmherziger, kurzer (max. 3 Sätze), unaufdringlicher Begleiter, keine Diagnosen, ermutigt bei ernster Not zu echtem menschlichen Kontakt; kennt neben den Meditationen jetzt auch Mudras/Mantras und wird angewiesen, bei unklarem Anliegen auf den Kompass zu verweisen statt zu raten (für den Fall, dass je ein echter Schlüssel/Proxy angeschlossen wird)
- Bekommt vollen Kontext mitgeschickt: Kompass vorher/(nachher), aktuelle Auswahl bzw. abgeschlossene Meditationen
- Kann per angehängtem `[EMPFEHLUNG: <exakter Name>]`-Tag eine Übung vorschlagen. **Geändert im Aug. 2026:** Danach stand im Chat nur der Hinweis "… steht jetzt oben als Empfehlung." — in der Bibliothek stimmte das nicht, dort gibt es kein "oben" (die Empfehlung landet auf Kompass- und Startseite), Christine hat gefragt, wo die Übung denn nun sei. Jetzt erscheint die vorgeschlagene Übung **direkt im Gespräch als startbare Karte** (`medZeile()` in `.chat-vorschlag`; der allgemeine `[data-play]`-Zuhörer startet sie). `applyRecommendation()` gibt dafür die gefundene Meditation zurück statt `true`/`false`.
- **Der echte API-Aufruf hat bewusst keinen Schlüssel** (öffentliches Repo) und schlägt darum in der Praxis immer fehl. Statt dessen antwortet `lokaleAntwort()` im Fehlerfall inhaltlich echt, ganz ohne Netz.

### 6a. Anliegen statt Kompass-Achsen (4. Aug. 2026) — die grösste Änderung am Begleiter

> ## ⚠️ Deaktiviert, nicht gelöscht (4. Aug. 2026)
>
> Der gesamte Begleiter-Chat, wie in diesem Abschnitt beschrieben, ist **aktuell nicht sichtbar und nicht
> erreichbar** — Christines Entscheid nach ausführlichem Test und Vergleich mit anderen Apps (siehe
> Entscheidungsprotokoll oben): "Ich bin für die verlässliche Lösung." Ersetzt durch **Suche/Kategorien
> (bereits vorhanden) + Mudra & Mantra pro Übung** (§3.3a; dieser Ersatz ist am selben Tag wieder
> entfallen — das Mantra sitzt jetzt auf der Abschluss-Seite, §3.5, Mudras gibt es gar nicht mehr).
>
> **Nichts davon ist gelöscht.** Der komplette Code — `ANLIEGEN` mit allen 31 Themen und ihren Stichwörtern,
> `erkenneAnliegen()`, `medFuerAnliegen()`, `lokaleAntwort()`, `setupChat()`, das Vorschlags-Gedächtnis, die
> doppelten Mantras, alles — steht unverändert in `index.html`. Nur zwei Stellen sind eingezäunt:
>
> 1. **HTML** (in `#medLibPage`, „Bibliothek"): die ganze `.ki-card` mit dem Chat ist in einen
>    HTML-Kommentar `<!-- ... -->` gepackt, direkt dort, wo sie vorher stand.
> 2. **JavaScript** (ganz am Ende der Datei, wo bisher `setupChat(...)` direkt aufgerufen wurde): eine neue
>    Variable `var BEGLEITER_AKTIV = false;` steht davor, der Aufruf steckt jetzt in
>    `if (BEGLEITER_AKTIV){ ... }`.
>
> **Um ihn wieder zu aktivieren** (auf Christines Auftrag "aktivier den Begleiter-Chat wieder" oder Ähnliches):
> beide Stellen rückgängig machen — den HTML-Kommentar um die `.ki-card` entfernen **und** `BEGLEITER_AKTIV`
> auf `true` setzen. Beides zusammen, sonst erscheint entweder eine Karte ohne Funktion oder es gibt eine
> Funktion ohne sichtbare Karte. Zusätzlich zwei Text-Stellen, die beim Deaktivieren mit angepasst wurden und
> beim Reaktivieren zurückgeholt werden sollten: der Datenschutz-Abschnitt "Dein Begleiter (Chat)" (stand vor
> "Hosting") und der Abschnitt "Dein Begleiter" in "Über die App" (jetzt "Mudra & Mantra") — beide Texte
> finden sich im Verlaufsprotokoll dieser Datei bzw. der Commit-Historie.
>
> Der Rest dieses Abschnitts (§6a/§6b) beschreibt die Logik **so, wie sie war und bei Reaktivierung wieder
> ist** — bewusst stehengelassen, nicht als "erledigt" markiert oder gelöscht.

**Das Problem (Christine gemeldet):** Der Begleiter kannte nur die vier Achsen der Kompass-Scheibe und suchte im Text nach Stichwörtern dafür (`RICHTUNGS_WOERTER`: "kopf/gedanke…" → nord, "gefühl/herz…" → sued, usw.). Wer "mein Rücken tut weh" schrieb, passte in keine dieser Schubladen — die Antwort war "Das kann ich noch nicht gut einordnen. Nutz doch kurz den Kompass". Der zweite Ausweichsatz fragte sogar wörtlich, ob es "eher im Kopf, im Gefühl oder im Körper" sitze. Christines Einwand trifft es genau: **Schmerz hat mit "denken oder fühlen" nichts zu tun**; was hilft, sind Licht, Körperentspannung und annehmende Sätze. Dazu kam, dass die Antworten in Achsen-Substantiven sprachen ("Denken", "Fühlen"), die auf der Scheibe gar nicht so heissen (dort steht NACHDENKLICH / EMOTIONAL) — und die als Zustandsbeschreibung ohnehin falsch sind.

**Die Lösung:** `ANLIEGEN` — eine Tabelle mit derzeit **31 Anliegen**. Die ersten 16 (Schmerz, Schlaf, Angst, Stress, Wut, Trauer, Grübeln, Selbstwert, Erschöpfung, Loslassen, Unruhe, Entspannen, Dankbarkeit, Vertrauen, Kinder, Schwangerschaft) entstanden aus Christines erster Meldung; die weiteren 13 hat sie am selben Tag nachgetragen, mit der Vorgabe, dass der Begleiter **alle Lebenslagen** kennen soll: eigene Krankheit, allgemeines Unwohlsein ("ich weiss nur, dass etwas nicht stimmt"), unter dem Verhalten anderer leiden, etwas Geschehenes, mit dem man nicht fertig wird (Tod, Unfall, Krankheit), Vergangenheit, Zukunft, akute Angst vor einer bevorstehenden Situation, nicht im Körper sein, fehlende Verbindung zu sich selbst, Opferrolle, fehlende Freude, Entscheidungen, fehlender Sinn. Jedes trägt:
- `woerter` — Stichwörter in Alltagssprache, inkl. Umschreibungen ("kann nicht mehr", "liege wach", "nicht gut genug");
- `intro` — ein eigener Einstiegssatz **ohne** Achsen-Vokabular;
- `meds` — konkrete IDs aus `MEDITATIONS`, **kurz zuerst**, damit auch im akuten Moment etwas Machbares dasteht;
- `mantra` / `mudra` — wortgleiche Verweise in `MANTRAS` bzw. `MUDRAS`;
- optional `feiner` — Feinabstimmung innerhalb eines Anliegens ("Kiefer" → *Kiefer entspannen* statt der allgemeinen Lichtmeditation);
- optional `chakra` — der Schlüssel in `CHAKREN` (siehe unten).

#### Vollständiger Test und Nachbesserung (4. Aug. 2026)

Christines Auftrag: die ganze Begleiter-Logik zeigen, testen, und alles, was nicht optimal funktioniert, notfalls streichen — mit der klaren Vorgabe **"auf alles soll eine Empfehlung folgen"**. Getestet mit über 120 realistischen Sätzen (Alltag, Gefühle, Körperliches, vage Aussagen, Ein-Wort-Eingaben, Smalltalk) gegen `erkenneAnliegen()` ausserhalb des Browsers, dazu Stichproben live im Chat.

**Ergebnis: keines der 31 Anliegen ist grundsätzlich fehlerhaft oder überflüssig — nichts davon wurde gestrichen.** Gefunden wurden stattdessen zwei echte Fehler und eine Lücke, die die eigentliche Vorgabe direkt betraf:

1. **Zwei falsche Treffer durch zu kurze Teilwörter.** Die Erkennung sucht Wörter als reine Teilzeichenkette (`indexOf`), ohne Wortgrenzen. Das Wort `"mut"` bei "Vertrauen" traf darum versehentlich in **"Mutter"**, **"vermute"**, **"Demut"** und **"mutlos"** — wer schrieb "meine Mutter kommt vorbei", bekam (score-bedingt meist überstimmt von "kinder", aber nicht immer) einen Treffer bei "Vertrauen". Das Wort `"lunge"` bei "Hals & Atem" traf versehentlich in **"Hitzewallungen"** (steckt als Teilzeichenkette in "…wa-llunge-n"). Beide entfernt und durch längere, eindeutige Formen ersetzt (`"mutlos"`, `"keinen mut"` u. ä.; `"lunge"` ersatzlos, `"atemnot"/"kurzatmig"/"asthma"/"bronchien"` decken das Thema weiterhin ab). **Falle beim Ergänzen:** Ein neues Stichwort immer gegen kurze, ähnlich aussehende Alltagswörter querlesen (Wortgrenzen gibt es hier nicht) — je kürzer das Wort, desto grösser das Risiko.
2. **Inhaltliche Lücken** bei mehreren bestehenden Anliegen ergänzt, ohne neue Kategorien oder neue Chakra-Zuordnungen zu erfinden (G7): `schmerz` (Augen, Ellbogen, Schwindel, Muskelkater, Sportverletzung — Knie/Hüfte/Fuss kamen bereits am selben Tag dazu, siehe oben), `verdauung` (Sodbrennen, Blähbauch, "übel"), `krankheit` (Corona, Grippe, Ausschlag/Juckreiz, Allergie, Wechseljahre/Hitzewallungen), `trauer` (Heimweh, Trennung, Scheidung), `stress` (Geldsorgen, Kündigung, "weiss nicht mehr weiter"), `freudelos` (Langeweile), `schlaf` (Jetlag), `erschoepfung` (Motivationslosigkeit), `opfer` (gelähmt), `andere` (Ehe kriselt, Eifersucht). Erkennungsquote in der 120-Satz-Stichprobe: **57 → 82 von 122** treffend erkannt.
3. **Die eigentliche Lücke, die Christine gemeldet hatte:** Traf **gar kein** Anliegen zu (Smalltalk wie "hallo", vage Antworten wie "keine Ahnung", Tippfehler, reine Rückfragen), endete der Chat bisher in einer Rückfrage **ohne jede Übung** — genau das widerspricht "auf alles soll eine Empfehlung folgen". Neu: `allgemeineEmpfehlung()` liefert in diesem Fall trotzdem eine Übung — eine kleine, für praktisch jeden Zustand geeignete Auswahl, **eine je Kompass-Richtung** (`ALLGEMEINE_MEDS = ["atem","welle","herzberuhigen","dank"]`), gewählt über dieselbe `streuung`, gefiltert auf frei **und** heute noch nicht gehört (gleiches Muster wie `medFuerAnliegen()`). Die Rückfrage selbst bleibt stehen (sie ist ehrlich: "das kann ich noch nicht einordnen"), die Übung kommt als Ergänzung dazu — es gibt also **nie mehr** eine Chat-Antwort ganz ohne Angebot.

**Bewusst nicht "gelöst":** Smalltalk und Meta-Fragen ("wer bist du", "was kannst du") wurden **nicht** in die `woerter`-Listen der Anliegen gezwungen — allgemeine Wörter wie "gut" oder "hallo" dort einzutragen, würde bei jeder echten Nachricht ungewollt mitzählen und ist derselbe Fehler wie bei "mut"/"lunge", nur eine Stufe grösser. Punkt 3 oben (der allgemeine Fallback) deckt genau diesen Fall bereits ab, ohne die Erkennung zu verwässern.

#### Zweiter Fund am selben Tag: Wiederholung im Begleiter selbst (4. Aug. 2026)

Kurz nach der Erweiterung oben meldete Christine zwei weitere Probleme: **"Bei Kopfweh und Schmerzen lösen ist 2x genau die gleiche Antwort gekommen"** und bei **"Mühe, nein zu sagen"** sei **keine Antwort** gekommen. Beides nachgestellt (Playwright, ausserhalb des Browsers gegen `erkenneAnliegen()`/`medFuerAnliegen()` sowie live im Chat):

1. **Bestätigt und behoben: `medFuerAnliegen()` kannte kein Gedächtnis.** Genau derselbe Fehler wie beim Kompass in §3.3d, nur an einer zweiten Stelle: Die Übung wurde aus `a.meds` gewählt, die erste, die heute noch nicht **abgeschlossen** wurde — wer nur fragt, ohne zu starten, ändert daran nichts. "Kopfweh", "Schmerzen lösen" und "Kopfschmerzen" treffen alle auf dasselbe Anliegen `schmerz` und lieferten darum dreimal "Kurze Lichtmeditation". Jetzt sortiert `medFuerAnliegen()` nach demselben Vorschlags-Gedächtnis wie der Kompass (`letzteVorschlaege()`/`merkeVorschlag()`, §3.3d, geteilter Speicher `myisland.vorschlaege.v1`) und trägt seine Wahl dort auch ein. Eine per Stichwort **gezielt** passende Übung (`feiner`-Regel, z. B. "Kiefer" → *Kiefer entspannen*) bleibt davon unberührt und immer vorn — das ist inhaltliche Passung, keine Frage der Abwechslung. Dieselbe Abwechslung jetzt auch in `allgemeineEmpfehlung()` (dem Fallback aus dem Fund oben), sonst hätte sich das Problem dort wiederholt.
2. **"Keine Antwort" liess sich nicht direkt nachstellen** — in allen Testläufen kam auf "Mühe, nein zu sagen" zuverlässig eine Antwort samt Übung. Ein wahrscheinlicher Kandidat: Der Aufruf an `api.anthropic.com` (der ohne Schlüssel praktisch immer fehlschlägt, siehe oben) hatte **keine Frist** — auf einer echten, langsamen Verbindung hätte die Anfrage lange offen bleiben und die "…"-Anzeige entsprechend lange stehen bleiben können, bevor die lokale Antwort einspringt. Vorsorglich behoben: Der Aufruf bricht nach **6 Sekunden** ab (`AbortController`) und die lokale Antwort kommt sofort. Sollte "keine Antwort" trotzdem wieder auftreten, bitte den genauen Wortlaut und ob die "…"-Anzeige noch zu sehen war, melden — dann lässt sich gezielter nachschauen.

#### Dritter Fund am selben Tag: "ist er sinnvoll, sonst löschen?" (4. Aug. 2026)

Christines Auftrag: den Begleiter testen und ehrlich beurteilen, ob er bleiben soll — und wie das andere Meditations-Apps lösen. Getestet mit einem **17 Nachrichten langen, realistischen Tagesgespräch** (Playwright): 16 von 17 Nachrichten bekamen eine unterschiedliche Übung, keine blieb ohne Antwort, keine Abstürze.

**Recherche zu anderen Apps:** Calm, Insight Timer und Balance personalisieren über **antippbare Kacheln/Stimmungs-Chips**, nicht über ein Freitext-Chatfeld — das kann nichts missverstehen. Headspace hat seit 2024 mit "Ebb" einen echten Chat-Begleiter, der aber auf einer echten, kostenpflichtigen KI läuft, nicht auf einer Wortliste. Diese App hat das Antipp-Prinzip mit dem **Kompass** bereits, der Begleiter ist eine zusätzliche Freitext-Ebene obendrauf — die einzige Art, die ohne laufende Kosten und ohne Schlüssel in der Datei geht (siehe CLAUDE.md).

**Entschieden: bleibt**, mit zwei ehrlich benannten, bauartbedingten Grenzen (kein Bug, keine echte KI):
1. **Beim genauen Lesen wiederholten sich Chakra-Satz und Mantra wortgleich**, wenn zwei ähnliche Nachrichten kurz hintereinander dasselbe Anliegen trafen (z. B. "Ich bin gestresst wegen der Arbeit" und "Mein Chef nervt mich total" — beide `stress`, identischer Satz, nur die Übung unterschied sich dank obigem Fix bereits). Jedes Anliegen hatte bisher **genau ein** festes Mantra. Behoben: `mantra` ist jetzt ein **Feld mit zwei Texten** je Anliegen (beide wortgleich aus dem bestehenden `MANTRAS`-Bestand, nichts Neues erfunden), `findeMantra(a, streuung)` wählt zwischen ihnen wie schon die Übung. Mit zwei Optionen bleibt eine Restchance auf Zufallsgleichheit (~50 %) — deutlich seltener als vorher (100 %), aber nicht ausgeschlossen.
2. **Gelegentliche Fehleinordnung bleibt möglich** ("Sorgen um die Zukunft" traf eher `angst` als `zukunft`, weil "sorge" und "sorgen" beide zaehlen und zusammen mehr Punkte geben als "zukunft" allein) — eine Grenze des Wörterzählens, meist noch thematisch nah genug, aber kein echtes Verstehen. Nicht behoben, da eine Lösung ohne echte Sprach-KI hier nur neue Sonderfaelle schaffen wuerde, keine grundsaetzliche Verbesserung.
3. **Der Einstiegssatz (`intro`) bleibt bewusst pro Anliegen fest** — er ist die wiedererkennbare "Handschrift" des jeweiligen Themas (z. B. "Wenn etwas weh tut, hilft selten Nachdenken …" bei Schmerz), kein Zufallstext. Ihn zu vervielfachen hätte 31× zwei bis drei neue Sätze bedeutet, ohne das eigentlich gemeldete Problem (identische Übung) zu lösen — das war schon durch Fund 1 oben erledigt.

### 6b. Chakren — Christines eigene Zuordnung (4. Aug. 2026)

Sie hat die Zuordnung selbst diktiert; `CHAKREN` gibt sie wörtlich wieder, es ist **nichts aus einer Vorlage übernommen**:

| Chakra | Wann es aus dem Gleichgewicht ist (ihre Worte) | Übung |
|---|---|---|
| **Wurzel** | zu wenig im Hier und Jetzt, irgendwo in Vergangenheit oder Zukunft; zu fest im Kopf, zu wenig geerdet; Mühe mit Entscheidungen | Wurzelchakra – Erdung |
| **Sakral** | Sexualität, Freude, Gefühle, Vertrauen, Lebensfluss | Sakralchakra – Vertrauen |
| **Solarplexus** | Ängste, zu wenig im Wollen, zu fest im Opfer | Solarplexuschakra – Willensstärke |
| **Herz** | Verbindung zu sich selbst, zur Seele, zum eigenen Gefühl und Selbstwert verloren; weiss nicht, wohin man sich entwickeln will | Herzchakra – Weite |
| **Hals** | Loslassen — auch da, wo der Körper festhält (sie nennt **Verstopfung**); nicht reden wollen / etwas nicht aussprechen; **alles im Atemapparat**; Krankheiten, die man zurückbehalten möchte | Halschakra – Widerstände lösen |
| **Stirn** | wirre Gedanken, kann nicht projektionsfrei wahrnehmen | Stirnchakra – Klarheit |
| **Krone** | das Licht fehlt, die obere Verbindung fehlt | Kronenchakra – Körperfreiheit |

**Am 4. Aug. 2026 nachgetragen (Christine), womit beide offenen Lücken gefüllt sind:**
- **Schmerz** folgt einem festen Weg: *zuerst Licht in den Körper bringen → den Schmerz wahrnehmen, statt ihn wegzudrücken → loslassen → beim Herzen ankommen.* **Grün ist die Farbe der Heilung** — grünes Licht dorthin schicken, wo es weh tut. Deshalb trägt `schmerz` jetzt `chakra:"herz"` plus ein `hinweis`-Feld mit genau diesem Weg.
- **Körperstellen überschreiben das Chakra:** Rücken/Wirbelsäule → **Solarplexus**, Verstopfung → **Hals**, sonstige Verdauung → **Sakral** (oder Solarplexus). Dafür trägt eine `feiner`-Regel neben `med` optional auch `chakra`; `feineRegel()` wird von `medFuerAnliegen()` **und** `chakraSatz()` benutzt, damit Übung und Chakra nie auseinanderlaufen.
- **Krankheit** steht jetzt beim **Halschakra** ("Krankheiten, die man zurückbehalten möchte") statt beim Wurzelchakra, das nur meine Annahme war.
- Zwei neue Anliegen: **`hals_atem`** (Kloss im Hals, Heiserkeit, Husten, Asthma, "kann es nicht aussprechen") und **`verdauung`** (auch ohne das Wort "Schmerz").
- **Lücke in den Wörtern (4. Aug. 2026, Christine gemeldet per Screenshot):** "Knieweh" traf auf keines der `schmerz`-Stichwörter, der Begleiter fragte nach einem Stichwort, obwohl eines dastand — Rücken, Nacken, Kiefer usw. waren erfasst, Knie/Hüfte/Fuss fehlten schlicht. Ergänzt in `woerter` **und** als eigene `feiner`-Zeile (→ `koerper`, dieselbe Übung wie bei Nacken/Schulter — kein neues Chakra erfunden, da Christine für Knie/Hüfte/Fuss keine eigene Zuordnung genannt hat, siehe G7).

**Aufgelöst (4. Aug. 2026):** Die Frage, ob *"zu fest in der Vergangenheit"* zum Wurzel- oder zum Halschakra gehört, war falsch gestellt — Christines Antwort: **beides, je nachdem, was körperlich dazukommt.** Das Thema ist vielschichtig, und die App soll deshalb **mehrere Wege anbieten statt eines**. Ihre Reihenfolge:

1. **Immer zuerst ankommen** — im Körper spüren, wo man gerade ist, und im Jetzt ankommen (`bodyscan_kurz`). Erst danach alles Weitere.
2. **Nacken und Halswirbel** hängen damit zusammen, über das **Nervensystem** — dafür beruhigende Übungen und das **Halschakra**.
3. **Ein runder Rücken** macht die Brust eng — dann die Brust öffnen, also das **Herz**.
4. Wer **zu fest in den Gedanken** hängt, braucht Boden — **Wurzelchakra**.

Umgesetzt über ein optionales Feld **`wege`** am Anliegen: `wegeSatz()` hängt unter die erste Empfehlung eine kurze Auswahl ("Danach kannst du weitergehen, je nachdem, was noch da ist: …"). Bringt ein Anliegen `wege` mit, **entfällt der allgemeine Chakra-Satz** — das Chakra steckt schon in den einzelnen Wegen, sonst stünde dasselbe zweimal und würde der Auswahl widersprechen. Für die Zeilenumbrüche hat `.bubble` neu `white-space: pre-line`; ohne das stünden die drei Wege als ein Fliesstext-Block da.

**Falle bei Stichwort-Überschneidungen (wieder aufgetreten):** "vergangenheit" stand sowohl bei `loslassen` als auch bei `vergangenheit`, "zukunft" sowohl bei `vertrauen` als auch bei `zukunft`. Bei gleicher Wortlänge gewinnt das Anliegen, das **weiter oben** in der Liste steht — und das war jeweils das allgemeinere. Beim Ergänzen eines Anliegens also prüfen, ob eines seiner Wörter schon woanders steht; das speziellere Anliegen muss es exklusiv haben.

**Länge der Antworten:** Bringt ein Anliegen einen eigenen `hinweis` mit, entfällt der Verweis auf die Chakra-Übung ("Wenn du direkt daran arbeiten magst: …") — sonst wird die Antwort eine Wand aus fünf Sätzen, und der fachliche Hinweis ist das Wertvollere von beiden. Ein Anliegen, dessen Chakra-Text ohnehin schon dasselbe sagt (`hals_atem`), bekommt gar keinen `hinweis`.

`chakraSatz()` hängt an eine Empfehlung einen Satz an ("Energetisch geht es dabei ums Wurzelchakra – es holt dich zurück ins Hier und Jetzt …") und nennt zusätzlich die passende Chakra-Übung — **ausser sie ist ohnehin schon die Empfehlung**, sonst stünde zweimal dasselbe da. `chakraAusText()` fängt direkte Fragen ab ("Was ist mit meinem Herzchakra?"): ohne das würde "Herz" bei Trauer landen. **Falle:** Die Texte in `CHAKREN.warum` beginnen mit "es …" — nach "geht es darum, **dass**" ergäbe das einen falschen Satz, darum steht dort ein Doppelpunkt.

**Falle bei den Stichwörtern (mehrfach aufgetreten):** Gesucht wird per `indexOf`, also nach exakten Teilzeichenketten. "weiss nicht was ich will" trifft **nicht** auf "ich weiss gar nicht mehr, was ich eigentlich will" — dazwischen stehen Wörter. Kurze, robuste Fragmente nehmen ("was ich will", "nichts ändern", "sowieso nichts"). Und: dasselbe Wort in zwei Anliegen entscheidet die Reihenfolge — "krank" stand in *Schmerz* und in *Krankheit*, und *Schmerz* gewann, weil es weiter oben steht; darum ist "krank" aus *Schmerz* entfernt.

`erkenneAnliegen()` gewichtet Treffer nach **Wortlänge**, damit "kopfschmerz" beim Schmerz landet und nicht beim Grübeln über das kürzere "kopf". `medFuerAnliegen()` überspringt, was heute schon gehört wurde. `findeMantra()`/`findeMudra()` schlagen über Text bzw. Namen nach — findet sich nichts, fällt der Teil **still weg**, statt etwas zu erfinden.

**Fallen beim Ergänzen:**
- `meds` müssen echte IDs aus `MEDITATIONS` sein, `mantra` wortgleich in `MANTRAS`, `mudra` wortgleich in `MUDRAS` — sonst verschwindet der jeweilige Teil kommentarlos.
- In `feiner` gewinnt die **erste** zutreffende Regel. Umgekehrt wäre "Kiefer verspannt" bei der allgemeineren Regel gelandet, weil sie später steht.
- Kein Achsen-Vokabular in `intro` — dieselbe Regel wie bei `updateShift()` (§3.5).

Auch der System-Prompt für den (nicht angeschlossenen) echten Dienst weist das jetzt ausdrücklich an: keine Einordnung in Kompass-Achsen, und körperliche Beschwerden sind kein Denk- oder Gefühlsthema.
- **Bewusste Entscheidung (Aug. 2026):** Christine wurde gefragt, ob sie langfristig einen echten, bezahlten KI-Dienst anschliessen möchte (bräuchte einen eigenen Server für den Schlüssel, laufende Kosten pro Nachricht) oder ob die kostenlose, lokale Logik reicht — Antwort: die lokale Logik reicht. Es ist also **kein** echter API-Anschluss geplant; `lokaleAntwort()` bleibt die dauerhafte Lösung, keine Übergangslösung.
- **Text-Dopplung entfernt (Aug. 2026):** Auf "Mein Weg" stand über der Chat-Box eine feste `<p class="intro">` mit fast demselben Satz wie die erste Chat-Blase direkt darunter — Christine hat das als doppelten Text gemeldet. Die statische Zeile ist entfernt, die Chat-Begrüssung selbst genügt. Gleichzeitig wortwörtlich vereinheitlicht auf **"Kann ich dir helfen, die passende Meditation zu finden – und optional dazu ein Mudra oder Mantra?"** an allen drei Stellen, wo der Begleiter sich vorstellt (Chat-Begrüssung hier, Chat-Begrüssung im Abschluss unverändert bei "Wie war es für dich?", und die Karte auf der Meditationen-Seite/§3.3a) — vorher endete die Formulierung mit "Erzähl mir, wie es dir geht", was Christine zu therapeutisch/introspektiv fand; jetzt ist es eine klare Hilfsangebot-Frage.
- **Mudra-Anleitung fehlte in drei von vier Antwort-Zweigen (Aug. 2026, Christine gemeldet):** Nur der direkte "gib mir ein Mudra"-Zweig in `lokaleAntwort()` gab bisher `mu.how` (die eigentliche Handhaltungs-Anleitung, z. B. "Zeigefinger und Daumen berühren sich, Handinnenfläche nach oben") mit aus — der Begleiter nannte in den anderen drei Fällen (Mudra als Bonus zu einer Meditations-Empfehlung; Mudra als Fallback ohne Meditations-Kontext, z. B. im Abschluss-Chat; Mudra als Fallback bei unklarer Richtung) nur den **Namen**, nie die Anleitung dazu — nutzlos für jemanden, der das Mudra nicht schon kennt. Jetzt hängt `.how` an allen vier Stellen mit dran.
- **Foto statt Symbol (Aug. 2026, in Arbeit):** Die Begleiter-Karte auf "Mein Weg" hat jetzt einen runden Bild-Platz oben links (`.companion-foto`, 48px, gleicher Goldring-Look wie der Zustands-Glyph). Die Datei **`begleiter.jpg` (Foto einer meditierenden Person) liefert Christine nach** — bis dahin fängt ein `onerror`-Handler den fehlenden Download ab, entfernt das `<img>` und lässt das 💬-Ersatzzeichen darunter sichtbar werden (`.companion-foto.kein-bild .ersatz`). Sobald die Datei im obersten Ordner liegt, erscheint sie von selbst; am Code muss dafür nichts mehr geändert werden. Bewusst so gebaut statt mit einem erfundenen Platzhalterbild.
- **Tippfehler bei "Mudra"/"Mantra" wurden nicht erkannt (Aug. 2026, Christine gemeldet):** `willMudra`/`willMantra` prüften bisher auf den *vollständigen* String `"mudra"`/`"mantra"` per `indexOf`. Christine schrieb "Mudrs" (ein Buchstabe fehlt) — das enthält den String "mudra" nicht, der Begleiter erkannte die Anfrage darum nicht und antwortete stattdessen zufällig mit einem Mantra statt einem Mudra. Geändert auf den kürzeren, eindeutigen Wortstamm `"mudr"`/`"mantr"` (kein reales deutsches Wort verwechselt sich damit) — verzeiht jetzt Tippfehler wie "Mudrs", "Mudra's" oder "Mantr".

---

## 7. Offene Punkte / nächste Schritte für das neue Repo

1. **Architektur**: von "ein HTML-File mit `data-step`" zu echten Routen/Komponenten migrieren.
2. **Assets**: Fotos aus base64 lösen, als echte Dateien (WebP/AVIF) mit `srcset` einbinden.
3. **Persistenz**: Verlauf und Abo-Testphase liegen inzwischen in `localStorage` (geräte-gebunden, siehe §5 in `index.html`, Schlüssel `myisland.verlauf.v1`/`myisland.abo.v1`/`myisland.vorschlaege.v1`) — kein Server, kein geräteübergreifendes Konto. Bei echtem Verkauf braucht es dafür ein richtiges Konto/Backend (siehe Zahlungsanbieter-Hinweis unten).
4. **Meditationstexte**: alle 47 Übungen sind inzwischen handgeschrieben (siehe §5a) — keine generierten Platzhaltertexte mehr.
5. **"Profil"-Tab**: existierte zwischenzeitlich (Status-Karte, Insel-Woche, Inselreise, Verlauf löschen). Der "Schlaf"-Tab wurde entfernt statt als Platzhalter stehen zu lassen. **Update 4. Aug. 2026:** Der Profil-Tab selbst ist inzwischen auch wieder entfallen — aufgeteilt in "Mein Weg" (das Persönliche) und "Einstellungen" (das Administrative, hinter einem Zahnrad, kein eigener Tab mehr). Siehe §3.3/§3.6.
6. **Barrierefreiheit**: Kompass jetzt per Pfeiltasten bedienbar (Fokus auf der Scheibe, `tabindex="0"`, `role="group"`), zusätzlich zum bestehenden Pointer-Drag — beide Wege laufen über dieselbe `setFromPoint()`, also identische Rundung/Begrenzung/Spiegelung. `aria-label` beschreibt den aktuellen Zustand in Worten und aktualisiert sich bei jeder Änderung (§3.2). Sichtbarer Fokus-Ring in Gold, nur bei echter Tastatur-Bedienung (`:focus-visible`). **Fehler behoben (Aug. 2026, Christine gemeldet — zwei Anläufe):** `tabindex="0"` bedeutet, dass der Kompass bei *jeder* Interaktion fokussiert wird, auch beim gewöhnlichen Ziehen mit Finger/Maus; dabei erschien ein blauer System-Fokusrahmen. Erster Versuch war `outline:none` auf dem `<svg>` — reichte nicht: **Safari (macOS wie iOS) zeichnet um ein fokussiertes SVG-Element einen eigenen Rahmen, den `outline:none` dort nicht zuverlässig unterdrückt.** Endgültige Lösung: `tabindex`, `role`, `aria-label` und der `keydown`-Handler sitzen jetzt auf dem umgebenden `<div class="compass-wrap">` statt auf dem `<svg>` — auf einem gewöhnlichen DIV greift `outline:none` in allen Browsern. Der goldene Ring (`.compass-wrap:focus-visible`, mit `border-radius:50%`, damit er der runden Scheibe folgt) bleibt der einzige Fokus-Hinweis. Die Tastatur-Bedienung selbst ist unverändert. Offen bleibt eine vollständige Sprachausgabe-Führung durch die restliche App.
7. **Mehrsprachigkeit**: Oberfläche Hochdeutsch, Meditationen Schweizerdeutsch, beides hart codiert.
8. **Themenvielfalt** (siehe §5a): Titelliste, Texte und seit Aug. 2026 auch die passenden Fotos je Thema (`bg`-Feld) sind umgesetzt.
9. **Bezahlung** (Preise: **CHF 3 pro Monat**, **CHF 25 pro Jahr** — entspricht rund CHF 2.10 im Monat, 31 % günstiger; davor **7 Tage gratis testen**, `TEST_TAGE = 7`. Zugesagt ist ausserdem, dass **neu erstellte Meditationen in beiden Abos ohne Aufpreis dazukommen** — steht so auf der Abo-Seite und in der Zugangs-Status-Karte der Einstellungen): Testphase/Abo-Zustand ist reine Anzeige-Logik ohne echten Zahlungsanbieter — siehe Hinweis auf der Abo-Seite in der App ("noch nicht bezahlbar"). Solange das so ist, steht in `index.html` der Schalter `var ABO_LIVE = false;` — damit bleibt die ganze Bibliothek für alle offen (keine gesperrten Übungen, keine Testphasen-/Ablauf-Anzeige in den Einstellungen und auf der Abo-Seite). Die Test-/Abo-Logik (`hatAbo()`, `imTest()`, `GRATIS_IDS`, Plan-Auswahl) bleibt vollständig im Code erhalten und lässt sich mit `ABO_LIVE = true` jederzeit wieder scharf schalten, sobald eine echte Bezahlung angeschlossen wird.
10. **Kompass-Empfehlungslogik**: Umgesetzt sind Quadranten-Stimmungswörter, Begründungstexte je Zustand (`next`), die Intensitäts-Abstufung in der Anzeige ("etwas/eher/sehr") und seit dem "Für dich"-Umbau eine echte Empfehlungs-Reihenfolge aus Richtung + gewählter Zeit + Anspannungsseite (§3.3). Die Kategorie-Icons sind seit Aug. 2026 eigene Linienzeichnungen statt Emoji (siehe §5a).
11. **Emotionale Historie ausbauen**: Der Verlauf speichert Vorher/Nachher pro Sitzung bereits (§5, Insel-Woche und Inselreise auf "Mein Weg", §3.3), und die Reise einer *einzelnen* Sitzung ist seit dem UX-Durchgang auf dem Abschluss-Kompass sichtbar (§3.5, `zeichneReise()`). Offen: dieselbe Spur-Darstellung auch **über mehrere Sitzungen hinweg** zeigen — z. B. ein kleiner Kompass auf "Mein Weg", der die letzten Reisen übereinanderlegt. Das war Christines Idee eines "besonderen Features" und ist der nächste sinnvolle Schritt darauf.
12. **Audit-Nachbesserungen (Aug. 2026)**: aus dem vollständigen Seiten-für-Seite-Durchgang umgesetzt — **"Kurze Probe"/"Preise"** auf der Titelseite sind jetzt echte Pillen-Knöpfe statt reinen Textlinks (gleiche Optik wie "Anmelden", §3.0); eine **Mindestdauer von 20 Sekunden** (`MINDESTDAUER_SEK`) muss erreicht sein, bevor `recordSession()` überhaupt einen Verlaufseintrag anlegt — ein versehentliches Sofort-"Fertig" zählt nicht mehr für Serie/Statistik; **"Minuten gesamt"** rundet mit `Math.ceil` statt `Math.round` auf, damit eine echte kurze Sitzung nie als "0 Minuten" erscheint; das **Begleiter-Symbol** (Bibliothek-Karte) wurde von 🤖 auf 💬 geändert, da 🤖 einen echten KI-Betrieb suggeriert, solange kein Schlüssel läuft (§6). Bewusst zurückgestellt: eigene Liniensymbole statt Emoji für die vier Kategorien (§3.3a) — der ChatGPT-Bildprompt dafür existiert bereits, wartet aber auf die generierten Bilder.
13. **App-weiter Konsistenz-Check (Aug. 2026, auf Wunsch von Christine):** Alle Seiten systematisch per Screenshot durchgegangen (Splash bis Datenschutz). Ein echter, sichtbarer Treffer gefunden und behoben — der Insel-Konfigurator hatte einen kleineren Titel als der Rest der App (siehe §4). **Bewusst nicht angefasst:** die vielen, minimal unterschiedlichen `font-size`-Werte quer durchs Stylesheet (`.85rem`/`.86rem`/`.84rem` usw. für ähnliche Fliesstext-Rollen) — das sind Bruchteile eines Pixels Unterschied, für Auge und Nutzung nicht wahrnehmbar; ein Durchvereinheitlichen auf eine feste Skala wäre viel Aufwand mit hohem Risiko für neue Layout-Fehler, bei praktisch keinem sichtbaren Gewinn. **Echter, noch offener Stilbruch:** die Zugangs-Status-Karte in den Einstellungen (`renderStatusCard()`, §3.6) zeigt weiterhin Emoji (🤍 ✅ ⏳ 🔒) für den Abo-Zustand, während die vier Kategorien inzwischen eigene gezeichnete Icons haben — dafür bräuchte es vier neue, passende Symbole (offen/aktiv/Testphase/gesperrt) im selben Stil, analog zum bestehenden ChatGPT-Bildprompt.
