# My Meditation Island — App-Spezifikation

Meditations-App rund um die eigene "Insel": Nutzer:innen richten sich über einen Kompass aus, wählen passende geführte Meditationen aus einer kategorisierten Bibliothek und bekommen am Ende einen Rückblick, was sich verändert hat.

**Wichtig fürs Verständnis der Marke:** Die Insel ist eine **Metapher**, kein Themenzwang. Sie steht für den Kraftort in einem selbst — den Ort, an den man sich zurückzieht, um anzukommen, durchzuatmen und bei sich zu sein. Das heisst: Die *Insel* ist der Rahmen (Startseite, Kompass, Abschluss, Bildsprache), die *Meditationen darin* müssen inhaltlich nicht bei "Strand und Palmen" bleiben — genau wie ein Rückzugsort auch nicht bedeutet, dass jedes Gespräch darin vom Rückzugsort handeln muss. Siehe §5a für die daraus folgende Themenvielfalt.

**Stand nach dem Layout-Umbau:** Aussehen und Aufbau folgen jetzt einer gemeinsamen Vorlage (Creme/Gold, Serifen-Titel, weisse Karten, Seitenkopf + Abschnittsüberschriften, fünf Tabs — siehe §2/§3). Die **Logik hinter dem Kompass ist dabei unverändert geblieben**: frei verschiebbarer Zeiger, zwei unabhängige Achsen (Denken↔Fühlen, Anspannung↔Entspannung), dieselben Zustandswörter, dieselbe Empfehlungs-Reihenfolge. Der Einstieg läuft über eine eigene Titelseite ("Meine Insel betreten"); die Kopfzeile "Gestalte deine Inselreise" gehört nur noch zum Insel-Konfigurator (§4), der über das Profil erreichbar ist.

Aktueller Stand ist ein **einzelnes, selbstständiges HTML-File** (`index.html`) — kein Build-Step, keine externen Abhängigkeiten außer einem Fetch-Call an die Anthropic API für den Chat-Begleiter. Dieses Dokument beschreibt den Ist-Zustand, damit er 1:1 in ein neues Repo übersetzt werden kann (z. B. als React/Next-App mit echten Routen statt CSS-Step-Umschaltung).

---

## 1. Tech-Stack (aktuell)

- Reines HTML + CSS + Vanilla JS (ein `<script>`-Block, IIFE)
- Kein Framework, kein Bundler
- Das Insel-Foto (`insel.jpg`) und das Logo (`logo.png`) liegen als eigene Dateien neben `index.html`; das Zifferblatt des Kompasses steckt weiterhin base64-inline im CSS. Das Foto war dreimal eingebettet und hat die Datei um über 400 KB aufgebläht — als Datei lädt es einmal und bleibt im Speicher des Geräts.
- KI-Begleiter ruft `https://api.anthropic.com/v1/messages` direkt per `fetch()` auf (Modell `claude-sonnet-4-6`), mit Fallback-Textbausteinen bei Fehlern/Offline
- Persistenz: **keine** — der State lebt nur in JS-Variablen im Speicher, kein LocalStorage, kein Backend
- **Update-Absicherung fürs Handy:** Seiten, die vom Home-Bildschirm aus geöffnet werden, hält das iPhone gerne hartnäckig im Speicher fest — selbst über ein Schliessen der App hinaus, weil GitHub Pages keine eigenen Cache-Vorgaben pro Datei erlaubt. Direkt nach `<body>` prüft ein kleines Skript eine Versionsnummer (`AKTUELLE_VERSION`) gegen den im Gerät gemerkten Stand und lädt bei Abweichung einmal ganz frisch nach. **Bei jeder für Christine sichtbaren Änderung diese Nummer hochzählen** (z. B. aufs aktuelle Datum), sonst merkt ihr Handy nichts vom Update. Eine Garantie ist das bei iPhones trotzdem nicht — bei hartnäckigen Fällen hilft nur: Symbol vom Home-Bildschirm löschen und neu anlegen.

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

### Wiederkehrende Muster
- **Seitenkopf** (`.page-head`): links Titel (Serif) + eine erklärende Zeile, rechts optional ein rundes Symbol (`.icon-btn`). Auf dem Kompass steht der Titel mittig, links daneben der Zurück-Pfeil.
- **Abschnittsüberschrift** (`.section-label`): Serif, ~1.18rem, gliedert jede Seite in klar benannte Blöcke ("Dein heutiger Fokus", "Dein Zustand", "Dein Fortschritt" …).
- **Karte** (`.card`): weiss, 18px Radius, weicher Schatten — der einzige Container-Typ der App.
- **Buttons**: `.btn-dark` (Gold-Verlauf, dunkelbrauner Text) für die Hauptaktion, `.btn-ghost` (weiss mit Rand) für alles Sekundäre; `.full` macht beide breit.
- **Auswahlreihen** (`.seg`): gleich breite Chips nebeneinander, aktiver Chip in Gold — für Zeit und Anzahl auf dem Kompass.
- **Persistente Tab-Bar** unten (`.tabbar`, 74px, cremeweiss, nur während der Sitzung ausgeblendet): 5 Tabs — **Startseite · Kompass · Mein Weg · Meditationen · Profil** (Steps `home`, `compass`, `meditation`, `meditation2`, `profil`).
  - **Namens-Aufräumung (Aug. 2026):** Vorher hiessen Tab und Ziel-Seite jeweils unterschiedlich (Tab "Training" → Seite "My Meditation"; Tab "Übungen" → Seite "Meditationsleiter"). Zwei Namen für denselben Ort machen die App schwer merkbar; **Tab-Beschriftung und Seitentitel sind jetzt identisch**. Ausserdem ist **"Meditationsleiter" als Ortsname verschwunden**: Das Wort bezeichnet einen *Menschen* — Christine nennt sich selbst "Meditationsleiterin" (Titelseite, §3.7) — und stand gleichzeitig über einer Übungsliste. Es bleibt jetzt allein ihrer Berufsbezeichnung vorbehalten. "Übungen" wurde zu **"Meditationen"**, weil genau das drin liegt (40 geführte Meditationen); "Training" zu **"Mein Weg"**, weil die Seite Fortschritt, Ziele und Verlauf zeigt und kein Training ist. Auch die Untertitel wurden dabei nachgezogen, wo sie nicht zur Seite passten: "Meditationen" zeigte "Lass dich begleiten" (das ist die Chat-Karte, nicht die Liste) → **"Alle Übungen zum Stöbern"**; "Mein Weg" nutzte dieselbe zeitabhängige Begrüssung wie die Startseite (`begruessung()`) statt etwas Eigenes zu sagen → fest **"Was du schon geschafft hast"**; die Preis-Seite hiess "Deine Meditationen" — verwechselbar mit der neu benannten Bibliothek — → **"Dein Zugang"** / "7 Tage gratis, danach wie du magst.".
  - **Kein eigenes Tab-Feld mehr für die Titelseite** (vorher "Insel", `data-tab="splash"`): Alles, was dort steht (Preise, Über mich, Konto, Insel gestalten), ist ohnehin über **Profil** erreichbar, ein eigenes Leisten-Feld war doppelt. Der Weg zurück zur Titelseite führt jetzt über zwei Stellen: das **Foto oben auf der Startseite ist antippbar geworden** (`#homeHeroBtn`, führt zu `goToStep("splash")`, dezentes Abdunkeln beim Antippen statt Skalieren, damit am randlosen Foto nichts die Hintergrundfarbe durchblitzen lässt) und der bereits vorhandene Knopf **"🏝️ Zur Titelseite"** ganz unten im Profil (`#toSplashBtn`, unverändert). Damit bleiben fünf statt sechs Felder — jedes davon mit mehr Platz, gemessen weiterhin ohne Überlauf auf iPhone SE/14/15 Pro Max.
- **Safe-Area:** `--safe-bottom: env(safe-area-inset-bottom)` wird auf `body`, `.tabbar`, Titelseite und Spieler angerechnet, damit unten nichts hinter dem Home-Indikator verschwindet. Tests können den Wert über `:root{--safe-bottom:34px}` nachstellen.

---

## 3. Seiten-/Flow-Übersicht

Umsetzung weiterhin über ein `data-step`-Attribut auf `<body>` + CSS-Sichtbarkeitsregeln pro Step (kein Router). Reihenfolge:

```
Titelseite → Startseite → Kompass → My Meditation → Spieler (Vollbild) → Abschluss
                  ↺ (Neu beginnen)                        ↳ "Noch eine Meditation" → zurück zu My Meditation
```

Der Insel-Konfigurator (`island`) ist über **Profil → "Meine Insel gestalten"** wieder erreichbar (§4); im Hauptfluss steht er nicht.

### 3.0 Titelseite (`data-step="splash"`)

Die Titelseite ist die Landingpage: Sie hat genau **eine** Aufgabe — den Gratis-Test starten. Aufbau in **drei Bändern**, damit das Foto wirkt und der Blick schnell unten ankommt:

1. **Oben (Kopf, ~20–28 % Höhe):** Logo (52px), darunter der Name **"My Meditation Island"** als Serif-Überschrift (2.5rem, auf schmalen Geräten zweizeilig) und die Subheadline in zwei **gleich grossen** Zeilen: **"Meditationen auf Schweizerdeutsch"** und **"für mehr Ruhe, besseren Schlaf und innere Balance"** (beide .85rem, auf kurzen Geräten .8rem). Gleich gross gelesen wirken sie als *ein* ruhiger Block; die Grösse ist bewusst klein gewählt, damit der Name die Hauptrolle behält Der Name ist bewusst das Grösste: So war es gewünscht, und die Marke soll sich einprägen. Die Chips mit Emoji sind wieder entfallen; die Dauer steht klein unter dem Knopf.
2. **Mitte (`.splash-frei`, flexibel):** bleibt **leer**. Dort liegen Insel, Boot und die Person darin. Der Verlauf ist deshalb geteilt (dunkel oben 0–34 %, klar in der Mitte, dunkel ab 72 %), statt durchgehend über dem ganzen Bild zu liegen.
2b. **Vertrauen:** Ganz unten, als kleinste Zeile der Seite, steht kursiv **"Entwickelt und gesprochen von einer diplomierten Yogalehrerin und Meditationsleiterin ›"** — Herkunft und Qualifikation statt Bewertungen, solange es keine Nutzerzahlen gibt. Bewusst klein und zuunterst (so gewünscht): Sie soll da sein, aber nichts überstrahlen. Antippen führt zu **§3.7 Über mich**. *Gesprochen* ist bewusst gewählt, obwohl die Aufnahmen noch fehlen: Die Repo-Inhaberin nimmt ihre Meditationen demnächst auf, bezahlen kann bis dahin ohnehin niemand (`ABO_LIVE = false`). **Sobald die Bezahlung scharf geschaltet wird, müssen die Aufnahmen da sein** — sonst verspricht die Seite etwas, das die App nicht hält. Die Subheadline wechselt **nicht** mit der Tageszeit: Der Wechsel war ausprobiert und wieder entfernt — die eigene, feste Formulierung ist der Inhaberin wichtiger als der passende Moment.

3. **Unten (Handlung), bewusst tief gesetzt:** goldene Taste **"7 Tage kostenlos testen"** — Zahl vorn, kein Klammerzusatz (der liest sich wie eine Fussnote), und "testen" statt "starten", weil es die Unverbindlichkeit betont; so schreiben es Calm, Headspace und Netflix auch. Sie unterscheidet sich damit klar vom "Anmelden" oben rechts (§3.6a): neu hier gegen schon dabei. Darunter **eine einzige** kleine Zeile mit den zwei antippbaren Wörtern **"▶︎ Kurze Probe"** (startet sofort `dankblitz`, 3 Min — erleben statt glauben, das stärkste Mittel ohne Social Proof) und **"Preise ⌄"**, das eine Glas-Karte aufklappt ("7 Tage gratis testen – ohne Verpflichtung · Danach CHF 3 im Monat oder CHF 25 im Jahr · Jederzeit kündbar, neue Meditationen sind immer dabei" plus **"Alle Einzelheiten ansehen ›"** → Abo-Seite). Die Karte schliesst sich wieder, wenn man das Wort erneut antippt **oder irgendwo daneben** (`pointerdown` auf dem Dokument). So steht der Preis offen da (Vertrauen), ohne die ruhige Seite zu belasten: sichtbar erst, wenn jemand danach fragt. Jede weitere Zeile hier unten schiebt die Taste nach oben ins Bild — deshalb sind Probe und Preise zusammengezogen.

**Sanftes Einblenden beim Öffnen:** Bild (1.4s), Kopf ab 0.35s, Handlungsblock ab 0.7s (`splashBild`/`splashAuf`). Bei `prefers-reduced-motion` steht alles sofort.

**Tab-Bar ist auf der Titelseite ausgeblendet.** Sie kostete 74px genau dort, wo das Boot liegt, und eine Coverseite mit sechs Reitern wirkt nicht ruhig. Hinein geht es über die Taste; erreichbar bleibt die Titelseite von überall über das Feld **Insel** und über **Profil → "Zur Titelseite"**.

**Gemessen mit echter Safe-Area (34px Home-Balken).** Das Boot mit Person und Rudern liegt im Foto zwischen **66,5 % und 75,5 % der Bildhöhe** (im Bild selbst nachgemessen, nicht geschätzt). Geprüft auf acht Grössen — iPhone SE, 13 mini, 8 Plus, 11, 14, 15, 15 Pro Max und ein schmales Android: Auf allen endet der Kopftext oberhalb und beginnt der Handlungsblock unterhalb des Bootes. Am knappsten ist es auf dem SE (11px Luft) und dem 8 Plus (14px).

**Wenn hier etwas dazukommt, zuerst nachmessen:** Jede zusätzliche Zeile unten schiebt die goldene Taste nach oben ins Bild. Deshalb sind Probe und Preise in *eine* Zeile zusammengezogen, und deshalb ist die Erklärung oben zweizeilig statt dreizeilig.

### 3.1 Startseite (`data-step="home"`)
- Seitenkopf mit tageszeitabhängiger Begrüssung (`begruessung()` + Symbol) und rundem Profil-Knopf.
- **Grosses Insel-Foto (randlos), das den Rest der Seite bis zur Tab-Bar auffüllt** — ohne Scrollen soll alles auf den Bildschirm passen. Dafür ist `.home-page` (nur auf diesem Schritt) eine Flex-Spalte mit `min-height:calc(100vh - Tabbar - Safe-Area)`; das Foto ist darin der einzige dehnbare Baustein (`flex:1 1 0`, `min-height:152px`, `max-height:400px`) — es wächst auf grossen Bildschirmen, bleibt auf kleinen bei seiner Mindesthöhe, und die Kopf-, Fokus- und Zustands-Blöcke behalten ihre normale, inhaltsabhängige Höhe. Alle anderen Abstände auf dieser Seite (Kopf-Abstand, Abschnittsüberschriften, Karten-Innenabstände) sind eigens für die Startseite etwas knapper als anderswo (`.home-page`-Zusatzregeln), damit auch auf einem iPhone SE nichts über die Tab-Bar hinausragt.
  - **Eigenes, zugeschnittenes Foto für die Startseite** (`insel-start.jpg`, 720×678) statt des hochformatigen `insel.jpg` (720×1027), dazu `object-fit:contain`. Der Weg dahin, weil er sich sonst wiederholt: Zuerst wurde am Ausschnitt geschraubt (`object-position` bei 63 %, dann 72 %) — beide Male fehlte etwas, weil das Hochformat viel schmaler ist als der Streifen breit. Dann `contain` auf dem Hochformat: das ganze Bild war sichtbar, aber als schmaler Streifen mit breiten Rändern links/rechts. **Die eigentliche Lösung lag im Bild, nicht im CSS:** `insel-start.jpg` ist der Bereich von 22–88 % der Originalhöhe (Himmel bis unter das Boot, Insel und Boot vollständig) und damit fast quadratisch (1,06 : 1) — praktisch dasselbe Seitenverhältnis wie der Foto-Streifen auf iPhone 14/15 Pro Max. Ergebnis: volle Breite **und** vollständiges Motiv, ohne sichtbare Ränder. Nur auf sehr flachen Streifen (iPhone SE, ca. 1,9 : 1) bleibt ein Rand links/rechts. `insel.jpg` bleibt unverändert für Titelseite und Sitzungs-Hintergrund, wo Hochformat richtig ist.
  - **Ausnahme, ehrlich benannt:** Wurde an einem Tag schon **mehrfach** meditiert, wächst die Liste unter "Dein heutiger Fokus" entsprechend — bei zwei oder mehr Einträgen reicht selbst das knappste Layout auf einem iPhone SE nicht mehr ganz aus (ein kurzes Stück Scrollen wird dann nötig, so wie bei jeder Liste mit offener Länge). Der Alltagsfall — noch nichts oder eine Meditation gehört — passt auf allen drei getesteten Grössen ohne Scrollen.
- **"Dein heutiger Fokus"** — **eine** Karte statt eines Nebeneinanders von Rückblick und Vorschlag (so wie bei Calm, Headspace & Co., nie beides gleichzeitig), und **ohne** etwas zu wiederholen, das schon in "Dein Zustand" direkt darunter steht. Drei Zustände, je nachdem was zutrifft:
  1. **Noch keine Empfehlung gebaut** (`empfehlung.length === 0` — weder Kompass benutzt noch "Meditationen empfehlen" angetippt): nur der Hinweistext "Sobald du deinen Kompass gestellt hast, erscheint hier deine Meditation für heute." — **ohne** eigenen "Zum Kompass"-Knopf, denn den hat "Dein Zustand" bereits; zwei gleich lautende Tasten direkt untereinander wären dieselbe Handlung zweimal angeboten.
  2. **Empfehlung da, heute aber noch nichts gehört** (`heutigeMeditationen().length === 0`): direkt die **eine** Top-Empfehlung als startbare Karte (`medZeile()`, Play-Taste) — **ohne** vorangestellten Satz zum Zustand ("Dein Kompass zeigt: eher unruhig …"), weil genau dieser Satz schon in "Dein Zustand" steht. Bei mehreren Empfehlungen (Trainingsprogramm-Modus) zusätzlich "Weitere Empfehlungen ansehen →" zur Training-Seite — die Liste selbst lebt dort, nicht doppelt auf der Startseite.
  3. **Heute schon etwas gehört** (`heutigeMeditationen()`, aus dem echten Verlauf): die heute abgeschlossenen Übungen mit Uhrzeit, Dauer und Bereich, statt denselben Vorschlag noch einmal danebenzustellen. Darunter "Noch eine Meditation? →" zur Training-Seite.
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

### 3.3 Mein Weg — Fortschritt und Verlauf (`data-step="meditation"`)

Aufbau genau wie in der Vorlage (`renderMyMed()`), die Empfehlung selbst sitzt seit dem Umbau auf der Kompass-Seite (§3.2). Hiess früher "My Meditation" (Tab: "Training") — siehe Namens-Aufräumung in §2:

1. **Kopf** — "Mein Weg", darunter die Begrüssung (`#fdGreeting`) und das Badge "🇨🇭 Schweizerdeutsch".
2. **Trainings-Karte** — "Dein persönliches Meditationstraining" mit einem Knopf (`#toTrainingBtn`), der **je nach Lage anders heisst**: liegt schon eine Empfehlung vor, startet er sie sofort und heisst **"Jetzt starten →"**; sonst führt er zum Kompass und heisst **"Zum Kompass →"**. Vorher stand dort in beiden Fällen "Zum Training →" — das beschrieb keines von beidem (die Beschriftung wird in `renderMyMed()` gesetzt).
3. **"Dein Fortschritt"** — drei Zahlen aus dem echten Verlauf (`renderStats()`): Tage am Stück, Meditationen, Minuten gesamt.
4. **"Deine Ziele"** (`renderZiele()`, `#goalList`) — vier Ziele mit Fortschrittsbalken, gezählt aus dem Verlauf über die Kompass-Richtung der jeweiligen Übung: Mehr innere Ruhe (Entspannung + Anspannung), Gedanken beruhigen (Denken), Stress lösen (Anspannung), Gefühle verstehen (Fühlen), je 10 Einheiten.
5. **"Deine letzten Meditationen"** — die fünf jüngsten Einträge aus `loadHistory()` mit "Heute"/"Gestern"/Wochentag, Dauer und Bereich (`renderHistoryList()`).
6. **"Alle Meditationen entdecken"** — die vier Kategorien und "Ganze Bibliothek ansehen →".
7. **Begleiter-Chat** und "← Zurück zum Kompass".

**Empfehlungslogik (`empfehlungsPool()` + `baueEmpfehlung()`):** Der Pool sind alle freien Übungen, sortiert nach (1) Kompass-Richtung zuerst, (2) Nähe zur gewählten Zeit (±4 Min), (3) Anspannung — angespannt zuerst kurz und erdend, ruhig zuerst tief —, (4) Restnähe zur Zeit. Daraus baut `baueEmpfehlung()` je nach Trainingsmodus: **Einzelmeditation** = die erste Übung, die in die maximale Dauer passt; **Trainingsprogramm** = bis zu vier Übungen, erst je Richtung eine (Abwechslung), dann auffüllen, solange die Summe in die maximale Dauer passt. Der Begründungssatz entsteht aus dem Zustandswort und den Bereichen der gewählten Übungen. Der Chat setzt seine Empfehlung über `empfohlenVomChat` an die erste Stelle und zeigt sie sofort an.

### 3.3a Meditationen — die Bibliothek (`data-step="meditation2"`)

- **Kopf** "Meditationen · Lass dich begleiten", darunter die Bestandszahl ("**40** geführte Meditationen"). Hiess früher "Meditationsleiter" (Tab: "Übungen") — siehe Namens-Aufräumung in §2. Die Spanne "3–30 Minuten" stand früher neben der Zahl und ist entfernt — sie verwirrte, weil bei jeder Übung ohnehin ihre eigene Dauer steht.
- **Filter-Chips** (`#libFilters`): Alle · ⭐ Favoriten · 🧠 Gedanken beruhigen · ❤️ Gefühle verstehen · 💪 Stress lösen · 🌿 Entspannen; aktiver Chip in Gold, scrollt sich selbst in den sichtbaren Bereich.
- **Liste wie in der Vorlage:** je Übung eine weisse Karte mit Bild-Feld (Symbol des Bereichs), Name, "5 Min · Gedanken beruhigen", **Stern** (Favorit) und **Play**. Bereits gemachte Übungen bekommen "schon gemacht" (`schonGemacht()`).
- **Antippen startet sofort** — die frühere Mehrfachauswahl mit Auswahl-Leiste ist entfallen, mehrere Übungen hintereinander laufen jetzt über den Trainingsmodus (§3.2).
- **Begleiter-Karte** über der Liste (goldene Karte "Dein Begleiter · Empfehlung erhalten →"), führt zum Chat auf My Meditation.
- **Favoriten** liegen wie der Verlauf nur auf dem Gerät (`localStorage`, Schlüssel `myisland.favoriten.v1`); der Chip ⭐ und die Profil-Zeile "Favoriten" zeigen sie.

### 3.4 Spieler (Vollbild, `body.entered.in-session`)
- Vollflächiges Insel-Foto mit dunklem Verlauf darüber, oben links ein rundes **✕**, oben mittig wie in der Vorlage drei Zeilen: Position ("MEDITATION 1 VON 2"), Name der Übung und "9 Min · Stress lösen".
- In der Mitte der Anleitungstext, der mit der Zeit durch `steps[]` wandert.
- Unten: Fortschritts-Punkte der Playlist, Fortschrittsbalken, Zeit und **Pause · Vorspulen · Fertig →**.
- Playlist spielt die gewählten Übungen automatisch nacheinander ab (unverändert).
- ⚠️ Geplant (siehe §5a): Hintergrund passend zum Thema der jeweiligen Meditation statt immer die Insel.

### 3.5 Abschluss (`data-step="outro"`)
- Seitenkopf "Wie fühlst du dich jetzt?", darunter derselbe Kompass wie in §3.2 (gleiche Optik, gleiche Bedienung) → `compassAfter`.
- **Deine Reise auf dem Kompass** (`zeichneReise()`): heller Punkt = wo du angekommen bist, gestrichelte Spur bis zur aktuellen Nadel; bei sehr kleinen Wegen (< 0.08) ausgeblendet.
- Status-Karte "Jetzt" mit demselben abgestuften Satz und den Achsen-Spuren.
- **"Dein Rückblick"** — Vorher/Jetzt in Worten + gemachte Meditationen mit Dauer; darunter ein Satz zur Veränderung (`updateShift()`).
- **"Brauchst du noch etwas?"** — "Noch eine Meditation", "Ein Mudra für mich", "Ein Mantra für mich" (deterministisch aus der Nadel-Position, §5).
- Begleiter-Chat (zweite Instanz) und "Neu beginnen" / "Fertig →".

### 3.6a Konto / Anmelden (`data-step="konto"`) — Platzhalter

Oben rechts auf der Titelseite sitzt **"Anmelden"** (`.splash-anmelden`, Glas-Pille) — dort suchen es alle, und unten bleibt der Platz fürs Bild frei. Es führt auf die Konto-Seite; auch über **Profil → "Konto & Anmelden"** erreichbar.

Die Seite zeigt drei Dinge:
1. **Status der Probezeit** (`renderKonto()`): noch nicht gestartet / noch X Tage / vorbei — jeweils mit dem ehrlichen Zusatz, dass nichts gesperrt wird, solange `ABO_LIVE = false`.
2. **Anmelde-Formular als sichtbarer Platzhalter**: E-Mail, Passwort, "Anmelden" und "Abo wiederherstellen" — alle Felder `disabled`, dazu das Kennzeichen **"Noch nicht aktiv"**. So sieht man, wie es kommen wird, ohne dass etwas ins Leere führt.
3. **"So wird es laufen"** in drei Schritten: (1) "Jetzt starten" beginnt die 7 Tage ohne Konto und ohne Zahlungsmittel, (2) wer weitermachen will, wählt ein Abo und legt dabei das Konto an, (3) mit diesem Konto meldet man sich auf weiteren Geräten an.

**Warum so:** Genau diesen Ablauf haben Calm, Headspace und Balance — Probezeit ohne Hürde, Konto erst beim Kauf, "Wiederherstellen" für den Gerätewechsel. Ein Konto *vor* dem ersten Erlebnis kostet Interessenten; ein Konto *nie* macht ein Abo unbrauchbar, sobald das Handy wechselt.

**"Jetzt starten"** hält den Beginn der Probezeit in `myisland.abo.v1` fest (`gestartet`), sperrt aber nichts. Sobald die Bezahlung angeschlossen wird, wird aus dem Platzhalter der echte Ablauf: `ABO_LIVE = true`, Formular aktiv, Zahlungsanbieter dahinter.

### 3.7 Über mich (`data-step="ueber"`)

Eine ruhige Karte mit Logo, Begrüssung und drei kurzen Absätzen: diplomierte Yogalehrerin und Meditationsleiterin, alle Meditationen selbst geschrieben und gesprochen auf Schweizerdeutsch, der Kompass als Herzstück. Am Schluss **"Mehr über meine Arbeit: yogaisland.ch"** — bewusst als Text, **nicht** als Link (so gewünscht). Darunter noch einmal die Taste "7 Tage gratis starten".

Erreichbar von der Titelseite (Vertrauenszeile) und über **Profil → "Über mich"**; der Zurück-Pfeil führt jeweils dorthin zurück, wo man hergekommen ist (`ueberZurueck`). Ohne Bewertungen ist die Person hinter der App der stärkste Vertrauensbeweis — deshalb sitzt der Einstieg direkt auf der Landingpage.

### 3.7a Impressum & Datenschutz (`data-step="impressum"`/`"datenschutz"`) — Aug. 2026 ergänzt

Zwei einfache Text-Seiten, gleicher Aufbau wie "Über mich" (`.legal-karte`, wiederverwendet `.ueber-karte`). Erreichbar über **Profil** (zwei neue Zeilen zwischen "Über die App" und "Verlauf löschen") sowie über zwei kleine Text-Links auf der **Abo-Seite** direkt beim Preis-Hinweis — dort, wo es rechtlich am meisten zählt. Der Zurück-Pfeil führt jeweils dorthin zurück, wo man hergekommen ist (`legalZurueck`, gleiches Prinzip wie `ueberZurueck`).

- **Impressum:** "Yoga Island", 8005 Zürich Schweiz, chris@yogaisland.ch — Angaben stammen von der echten Seite yogaisland.ch (per Screenshot bestätigt, nicht erfunden). **Offen:** kein vollständiger rechtlicher Name einer natürlichen Person und keine Strassenadresse hinterlegt, nur PLZ/Ort — für ein rechtlich robustes Impressum (insbesondere bei deutschen Besucher:innen) wäre das eine sinnvolle Ergänzung, sobald Christine das liefert.
- **Datenschutz:** ehrlich aus dem tatsächlichen Code abgeleitet, nicht aus einer Vorlage kopiert — insbesondere die Offenlegung, dass der Begleiter-Chat-Versuch technisch eine Verbindung zu Anthropic (USA) aufbaut, auch wenn er mangels Schlüssel immer fehlschlägt (§6), sowie der Hinweis auf GitHub Pages als Hosting-Anbieter.
- **Wichtig, wiederkehrend zu prüfen:** Beide Texte sind sorgfältig, aber keine Rechtsberatung. Vor dem ersten echten Zahlungsvorgang (`ABO_LIVE = true`) sollte das jemand vom Fach gegenlesen — insbesondere muss die Datenschutzerklärung dann um den tatsächlichen Zahlungsanbieter ergänzt werden.

### 3.6 Profil (`data-step="profil"`)
- Seitenkopf "Profil · Dein Bereich", Karte "Dein Inselbewohner".
- **Status-Karte** (`renderStatusCard()`) zum Zugang, danach zwei Karten aus dem echten Verlauf (blenden sich aus, solange nichts da ist):
  - **"Deine Inselwoche"** (`renderWeek()`) — sieben Kreise von Montag bis Sonntag, gefüllt an den Tagen mit einer Sitzung, der heutige Tag zusätzlich umrandet. Darunter "X Tage am Stück" (`computeStreak()`), "Ziel: 7 Tage" und ein Balken. Hinter **"Details"** stehen wie früher die Zeilen mit Vorher/Nachher je Tag.
  - **"Deine Inselreise"** (`renderJourney()`) — ein Weg aus fünf Stationen (Angekommen · Ruhiger Anker · Achtsame Entdeckerin · Vertraute Insel · Zuhause auf der Insel), die aktuelle hervorgehoben, darunter "Stufe 3 · …", der Stand ("18 / 30 Meditationen") und ein Balken. Gezählt werden **abgeschlossene Meditationen aus dem Verlauf** — kein Punktesystem, das sich anders einsammeln liesse. Hinter **"Details"** die bisherigen Muster (wie du meistens ankommst, liebste Übung, Rhythmus, Entwicklung).
- **Einstellungen** als Liste: "Abo verwalten" (→ Abo-Seite), "Statistiken" (→ My Meditation), "Favoriten" (→ Bibliothek, Filter ⭐), "Meine Insel gestalten" (→ §4), "Dein Begleiter" (→ Chat auf My Meditation), "Über die App" (blendet zwei Sätze ein), "Verlauf löschen".
- Fusszeile: Hinweis, dass alles nur auf dem Gerät liegt, und "🏝️ Zur Titelseite".

---

## 4. Insel-Konfigurator (über Profil erreichbar)

Erreichbar über **Profil → "Meine Insel gestalten"** (`data-step="island"`), nicht im Hauptfluss. Eigener Screen mit Live-Vorschau oben (80% Höhe) und kompakter, scrollbarer Filterleiste unten (20% Höhe). Optionen: Wetter (sonnig/wolkig), Meer (ruhig/wellig), Charakter (Geschlecht, Haut-/Haar-/Outfitfarbe per Swatches), Ankunft (Boot/schon da). Größe und Palmenanzahl sind fix auf "Mittel". Insel + Boot + Person sind alle als handgezeichnete SVG-Illustration umgesetzt (kein Foto), inkl. animiertem Boot-Einlaufen, schwimmenden Fischen, Wolken/Sonne je nach Wetter.

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
- **40 handgeschriebene Meditationen insgesamt** (13 mini / 13 mittel / 14 tief) — siehe §5a für die volle Titelliste. Kein Generator mehr: `generateLibrary()`/`THEMES`/`PHRASES` wurden entfernt, jeder Eintrag ist ein einzeln geschriebenes Skript.
- Das Feld `cat` ("mini"/"mittel"/"tief") steuert jetzt die Empfehlungs-Reihenfolge auf "Für dich" (§3.3, kurz-zuerst bei Anspannung) und liefert über `TIEFE[cat]` den zweiten Empfehlungsgrund. Als sichtbare Gliederung wird es nicht mehr benutzt — beide Seiten gruppieren nach Kompass-Richtung bzw. Nutzen-Kategorie.

### Mudras & Mantras (Abschluss-Seite)
```js
MUDRAS[]  = { dir, name, how, why }   // 20 Eintraege, 5 je Richtung, Erklaerung auf Hochdeutsch
MANTRAS[] = { dir, text, why }        // 20 Eintraege, 5 je Richtung, auf Hochdeutsch

waehlePassend(liste, c)  // filtert auf die zu c passende Richtung, waehlt daraus DETERMINISTISCH
                          // (aus c.x/c.y berechneter Index, kein Math.random()) genau 1 Eintrag -
                          // dieselbe Nadel-Position liefert also immer dasselbe Ergebnis
zeigeMudra()/zeigeMantra()  // rendern die Karte in #mudraBox/#mantraBox, Richtung/Position kommt aus compassAfter
```

## 5a. Themenvielfalt (umgesetzt)

**Entscheidung:** Die Insel bleibt das einzige Bild/Branding der App (kein zweites, drittes Landschafts-"Skin"). Die *Meditationen selbst* sind inhaltlich breiter als vorher — nicht mehr nur Strand/Palmen/Wellen, sondern klassische Themen aus Achtsamkeit, Körperarbeit und Alltagsbewältigung. Die vier Kompass-Richtungen (Denken/Fühlen/Anspannung/Entspannung) bleiben als Zuordnungs-Logik bestehen; jedes Thema hat weiterhin eine Richtung zugeordnet, damit die Empfehlungslogik unverändert funktioniert.

**Umgesetzte Titelliste (40 Meditationen, alle handgeschrieben)** — ersetzt die früher automatisch generierten "Insel-<Thema>"-Einträge aus `THEMES[dir]`/`PHRASES[dir]` (dieser Generator inkl. `generateLibrary()` wurde entfernt, `MEDITATIONS[]` enthält jetzt alle 40 Einträge direkt). Jeder Titel ist einer Kategorie, einer festen Dauer und einer Kompass-Richtung zugeordnet, damit sowohl die Richtungs-Empfehlung (Meditation 1) als auch die Dauer-Auffüllung (Meditation 2) über die ganze Liste hinweg genug Auswahl haben — nicht nur ein, zwei Themen decken jede Dauerstufe ab. Titel in *Kursiv* sind die 8 ursprünglichen Flaggschiff-Skripte, die unverändert geblieben sind.

**Mini (3–6 Min), 13 Titel:**

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

**Mittel (7–14 Min), 13 Titel:**

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

**Tief (15–30 Min), 14 Titel:**

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

**Verteilung über die vier Kompass-Richtungen** (Summe über alle 40): Denken 8 · Fühlen 12 · Anspannung 10 · Entspannung 10. Nicht perfekt gleich, aber bewusst nah dran — Fühlen ist am stärksten besetzt, weil sich viele der gewünschten Themen (Herz, Dankbarkeit, Verzeihen, Chakra-Herz, Schwangerschaft) inhaltlich dort einordnen. Falls das zu schief wirkt, liesse sich z. B. "Fantasiereise: Insel" oder "Dankbarkeits-Reise" auf Denken/Entspannung umlegen, ohne die Titel selbst zu ändern.

**Dauer-Abdeckung je Kategorie:** Mini deckt 3–6 Min in allen vier Stufen mehrfach ab, Mittel deckt 6–13 Min, Tief deckt 10–30 Min inklusive der 30-Min-Stufe. Damit hat die Dauer-Auffüllung in Meditation 2 (§3.3a, `autoFillV2()`) in jeder Kategorie und Richtung genug Auswahl, um nah an die gewünschte Zieldauer zu kommen, statt immer auf denselben ein, zwei Titeln zu landen.

**Bildsprache pro Meditation:** Der Foto-Hintergrund von Kompass-, Meditations- und Session-Seite (aktuell überall dasselbe Insel-Foto, siehe §3.4/§2) soll künftig **zur jeweiligen Meditation passen** — eine Fantasiereise "Bergspitze" mit Insel-Hintergrund abzuspielen wäre inhaltlich unstimmig. Konkret geplant:
- Insel-Foto bleibt Standard-Hintergrund für Home, Kompass, Meditationsauswahl, Abschluss (der "Rahmen" der Reise) sowie für alle Insel-thematischen Meditationen.
- Für andere Themen (Wald, See, Winterlandschaft, Bergspitze, Chakren/Licht, …) braucht es **je ein eigenes Foto** für den Session-Hintergrund — diese Fotos liefert die Repo-Inhaberin, sie werden nicht selbst erzeugt/erfunden.
- Bis die zusätzlichen Fotos vorliegen, bleibt der Insel-Hintergrund als Platzhalter für alle Themen bestehen.

**Umsetzung (noch offen):** `MEDITATIONS[]` bräuchte ein Feld `bg` (welches Foto für die Session), damit die Bildsprache pro Meditation (siehe oben) tatsächlich variiert. Bis die zusätzlichen Fotos von der Repo-Inhaberin vorliegen, bleibt der Insel-Hintergrund als Platzhalter für alle Themen bestehen.

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

### Steps
```
STEPS = { splash, home, island (über Profil), compass, meditation, meditation2, outro, profil, abo, ueber, konto }
TAB_FOR_STEP = { home:"home", compass:"kompass", meditation:"meditation", meditation2:"meditation2", profil:"profil" }
// "splash"/"outro"/"abo"/"island" haben keinen eigenen Tab
```

---

## 6. KI-Begleiter

- Zwei Chat-Instanzen: eine auf der Meditationsauswahl (`allowRecommend = true`), eine im Abschluss (`false`)
- System-Prompt: warmherziger, kurzer (max. 3 Sätze), unaufdringlicher Begleiter, keine Diagnosen, ermutigt bei ernster Not zu echtem menschlichen Kontakt; kennt neben den Meditationen jetzt auch Mudras/Mantras und wird angewiesen, bei unklarem Anliegen auf den Kompass zu verweisen statt zu raten (für den Fall, dass je ein echter Schlüssel/Proxy angeschlossen wird)
- Bekommt vollen Kontext mitgeschickt: Kompass vorher/(nachher), aktuelle Auswahl bzw. abgeschlossene Meditationen
- Kann in der Auswahl-Ansicht per angehängtem `[EMPFEHLUNG: <exakter Name>]`-Tag eine Übung **zur Mehrfachauswahl hinzufügen** (nicht ersetzen)
- **Der echte API-Aufruf hat bewusst keinen Schlüssel** (öffentliches Repo) und schlägt darum in der Praxis immer fehl. Statt dessen antwortet `lokaleAntwort()` im Fehlerfall inhaltlich echt, ganz ohne Netz: sie erkennt per Stichwortliste die Richtung (Gedanken/Gefühle/Anspannung/Entspannung), erkennt explizite Nachfragen nach "Mudra" oder "Mantra" und wählt dafür einen passenden Eintrag aus `MUDRAS`/`MANTRAS`, empfiehlt sonst (wo erlaubt) über dasselbe `[EMPFEHLUNG: ...]`-Tag eine passende Meditation aus `MEDITATIONS`, und verweist bei unklarer Nachricht auf den Kompass. Die frühere generische Fallback-Liste (vier immer gleiche Sätze im Kreis) ist damit ersetzt.

---

## 7. Offene Punkte / nächste Schritte für das neue Repo

1. **Architektur**: von "ein HTML-File mit `data-step`" zu echten Routen/Komponenten migrieren.
2. **Assets**: Fotos aus base64 lösen, als echte Dateien (WebP/AVIF) mit `srcset` einbinden.
3. **Persistenz**: Verlauf und Abo-Testphase liegen inzwischen in `localStorage` (geräte-gebunden, siehe §5 in `index.html`, Schlüssel `myisland.verlauf.v1`/`myisland.abo.v1`) — kein Server, kein geräteübergreifendes Konto. Bei echtem Verkauf braucht es dafür ein richtiges Konto/Backend (siehe Zahlungsanbieter-Hinweis unten).
4. **Meditationstexte**: alle 40 Übungen sind inzwischen handgeschrieben (siehe §5a) — keine generierten Platzhaltertexte mehr.
5. **"Profil"-Tab**: existiert inzwischen (Status-Karte, Insel-Woche, Inselreise, Verlauf löschen). Der "Schlaf"-Tab wurde entfernt statt als Platzhalter stehen zu lassen.
6. **Barrierefreiheit**: Kompass-Drag aktuell nur Pointer-Events — Tastatursteuerung/ARIA fehlt noch.
7. **Mehrsprachigkeit**: Oberfläche Hochdeutsch, Meditationen Schweizerdeutsch, beides hart codiert.
8. **Themenvielfalt** (siehe §5a): Titelliste und Texte sind umgesetzt. Offen: passende Fotos je Thema beschaffen und `bg`-Feld je Meditation einführen.
9. **Bezahlung** (Preise: **CHF 3 pro Monat**, **CHF 25 pro Jahr** — entspricht rund CHF 2.10 im Monat, 31 % günstiger; davor **7 Tage gratis testen**, `TEST_TAGE = 7`. Zugesagt ist ausserdem, dass **neu erstellte Meditationen in beiden Abos ohne Aufpreis dazukommen** — steht so auf der Abo-Seite und in der Profil-Statuskarte): Testphase/Abo-Zustand ist reine Anzeige-Logik ohne echten Zahlungsanbieter — siehe Hinweis auf der Abo-Seite in der App ("noch nicht bezahlbar"). Solange das so ist, steht in `index.html` der Schalter `var ABO_LIVE = false;` — damit bleibt die ganze Bibliothek für alle offen (keine gesperrten Übungen, keine Testphasen-/Ablauf-Anzeige in Profil und Abo-Seite). Die Test-/Abo-Logik (`hatAbo()`, `imTest()`, `GRATIS_IDS`, Plan-Auswahl) bleibt vollständig im Code erhalten und lässt sich mit `ABO_LIVE = true` jederzeit wieder scharf schalten, sobald eine echte Bezahlung angeschlossen wird.
10. **Kompass-Empfehlungslogik**: Umgesetzt sind Quadranten-Stimmungswörter, Begründungstexte je Zustand (`next`), die Intensitäts-Abstufung in der Anzeige ("etwas/eher/sehr") und seit dem "Für dich"-Umbau eine echte Empfehlungs-Reihenfolge aus Richtung + gewählter Zeit + Anspannungsseite (§3.3). **Offen** bleibt die inhaltliche Klassifizierung je Meditation von Christine — und damit auch die Yoga-Icons für die Kategorien (aktuell Emoji, siehe §3.3a).
11. **Emotionale Historie ausbauen**: Der Verlauf speichert Vorher/Nachher pro Sitzung bereits (§5, Insel-Woche und Inselreise im Profil), und die Reise einer *einzelnen* Sitzung ist seit dem UX-Durchgang auf dem Abschluss-Kompass sichtbar (§3.5, `zeichneReise()`). Offen: dieselbe Spur-Darstellung auch **über mehrere Sitzungen hinweg** zeigen — z. B. ein kleiner Kompass im Profil, der die letzten Reisen übereinanderlegt. Das war Christines Idee eines "besonderen Features" und ist der nächste sinnvolle Schritt darauf.
