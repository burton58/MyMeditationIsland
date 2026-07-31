# My Meditation Island — App-Spezifikation

Meditations-App rund um die eigene "Insel": Nutzer:innen richten sich über einen Kompass aus, wählen passende geführte Meditationen aus einer kategorisierten Bibliothek und bekommen am Ende einen Rückblick, was sich verändert hat.

**Wichtig fürs Verständnis der Marke:** Die Insel ist eine **Metapher**, kein Themenzwang. Sie steht für den Kraftort in einem selbst — den Ort, an den man sich zurückzieht, um anzukommen, durchzuatmen und bei sich zu sein. Das heisst: Die *Insel* ist der Rahmen (Startseite, Kompass, Abschluss, Bildsprache), die *Meditationen darin* müssen inhaltlich nicht bei "Strand und Palmen" bleiben — genau wie ein Rückzugsort auch nicht bedeutet, dass jedes Gespräch darin vom Rückzugsort handeln muss. Siehe §5a für die daraus folgende Themenvielfalt.

**Stand nach dem Layout-Umbau:** Aussehen und Aufbau folgen jetzt einer gemeinsamen Vorlage (Creme/Gold, Serifen-Titel, weisse Karten, Seitenkopf + Abschnittsüberschriften, fünf Tabs — siehe §2/§3). Die **Logik hinter dem Kompass ist dabei unverändert geblieben**: frei verschiebbarer Zeiger, zwei unabhängige Achsen (Denken↔Fühlen, Anspannung↔Entspannung), dieselben Zustandswörter, dieselbe Empfehlungs-Reihenfolge. Der Einstieg läuft über eine eigene Titelseite ("Meine Insel betreten"); die Kopfzeile "Gestalte deine Inselreise" gehört nur noch zum Insel-Konfigurator (§4), der über das Profil erreichbar ist.

Aktueller Stand ist ein **einzelnes, selbstständiges HTML-File** (`index.html`) — kein Build-Step, keine externen Abhängigkeiten außer einem Fetch-Call an die Anthropic API für den Chat-Begleiter. Dieses Dokument beschreibt den Ist-Zustand, damit er 1:1 in ein neues Repo übersetzt werden kann (z. B. als React/Next-App mit echten Routen statt CSS-Step-Umschaltung).

---

## 1. Tech-Stack (aktuell)

- Reines HTML + CSS + Vanilla JS (ein `<script>`-Block, IIFE)
- Kein Framework, kein Bundler
- Alle Fotos sind **base64-inline** als JPEG eingebettet (kein separater Asset-Ordner)
- KI-Begleiter ruft `https://api.anthropic.com/v1/messages` direkt per `fetch()` auf (Modell `claude-sonnet-4-6`), mit Fallback-Textbausteinen bei Fehlern/Offline
- Persistenz: **keine** — der State lebt nur in JS-Variablen im Speicher, kein LocalStorage, kein Backend

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
- **Persistente Tab-Bar** unten (`.tabbar`, 74px, cremeweiss, auf Titelseite und während der Sitzung ausgeblendet): 5 Tabs — **Startseite · Kompass · My Meditation · Meditationsleiter · Profil**. Die Steps dahinter sind unverändert (`home`, `compass`, `meditation`, `meditation2`, `profil`), nur Namen und Symbole folgen der Vorlage.
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
- Vollflächiges Insel-Foto mit dunklem Verlauf, mittig das runde Logo aus der Vorlage (`logo.png`, weisse Strichzeichnung), Titel "My Meditation Island" und "Dein Ort. Deine Auszeit. Dein inneres Gleichgewicht."
- Unten die goldene Taste **"Meine Insel betreten"** (→ Startseite) und vier Punkte als Andeutung eines Einstiegs.
- Über **Profil → "Zur Titelseite"** jederzeit wieder erreichbar. Tab-Bar ist hier ausgeblendet.

### 3.1 Startseite (`data-step="home"`)
- Seitenkopf mit tageszeitabhängiger Begrüssung (`begruessung()` + Symbol) und rundem Profil-Knopf.
- Grosses Insel-Foto (randlos, ~38vh) als Stimmungsbild.
- **"Dein heutiger Fokus"** — solange der Kompass noch nicht bewegt wurde (`kompassBenutzt === false`), steht hier wie in der Vorlage die leere Karte "Finde deine heutige Meditation über den Kompass." mit der Taste "Zum Kompass →". Danach die aktuell beste Empfehlung aus `empfehlungen()` (Name, Dauer, Nutzen, Play-Taste); Antippen startet direkt.
- **"Dein Zustand"** — Karte mit dem aktuellen Kompass-Satz (`moodSatz(compassBefore)`), Taste "Zum Kompass →" und einem **kleinen, mitlaufenden Kompass** (`#compassWrapHome`), der sich `compassBefore` mit dem grossen Kompass teilt.
- **"Auch gut für dich"** — zwei weitere Empfehlungen, sofern vorhanden.
- Alles wird bei jedem Aufruf über `renderHome()` neu aufgebaut, zeigt also immer den aktuellen Stand.

### 3.2 Kompass ("Wie geht es dir gerade?", `data-step="compass"`)

**Die Bedienung und die ganze Logik dahinter sind unverändert** — neu ist nur der Rahmen aus der Vorlage.

- Beschriftung liegt **ausserhalb** der Scheibe, genau wie in der Vorlage und ohne Symbole: **Gedanken** oben, **Gefühle** unten, **Entspannt** links und **Angespannt** rechts senkrecht gesetzt (`.axis-label.side`). Dadurch kann die Scheibe die volle Breite nutzen.
- **Achtung, waagrecht gespiegelt:** In der Vorlage steht links "Entspannt" und rechts "Angespannt" — umgekehrt zur internen Rechnung (`x < 0` = Anspannung). Die *Bedeutung* ist deshalb unverändert geblieben, nur die Zeichnung spiegelt: `nadelX(x) = 200 − x · COMPASS_MAXR`, `nadelY(y) = 200 + y · COMPASS_MAXR`. Jede Stelle, die eine Nadel setzt (Ziehen, Abschluss-Kompass, Reise-Spur, kleiner Kompass auf der Startseite), rechnet über diese beiden Funktionen.
- Die Scheibe selbst: das Zifferblatt-Foto aus der Vorlage (Insel/Bucht mit goldenem Innenring) als runde Fläche (`.compass-photo`, r=150), darüber ein **Goldring** mit Verlauf (r=157, 14 breit), vier Punkte und Pfeile an den Polen und acht feine Marken.
- **Zeiger unverändert in der Wirkung:** ein frei in der Scheibe verschiebbarer goldener Punkt (`COMPASS_MAXR = 135`, damit er auf dem Zifferblatt bleibt), weisse Nabe mit Kernpunkt. Die beiden Achsen bleiben **unabhängig**: waagrecht Anspannung↔Entspannung (`x`), senkrecht Denken↔Fühlen (`y`), jeweils −1…1, gespeichert in `compassBefore`. Die gestrichelte Ruhezone entfällt — die Nabe des Zifferblatts markiert die Mitte schon selbst.
- **Status (`#compassReadout`, `renderMoodStatus()`)** in einer weissen Karte, wie in der Vorlage: Symbol des Zustands, darüber "Deine Auswahl", darunter das Wort mit seiner Abstufung (`moodWort()`: "Ausgeglichen" / "Etwas unruhig" / "Sehr angespannt") und ein erklärender Satz (`MOODS[...].next`). Solange der Zeiger genau in der Mitte steht, steht dort die Anleitung "Bewege den Zeiger, um deinen Zustand anzugeben." Die früheren zwei Achsen-Spuren entfallen; dieselbe Information liegt als `aria-label` auf der Karte.
- **i-Knopf oben rechts** blendet zwei Sätze ein, was oben/unten und links/rechts bedeuten (`#compassInfo`).
- **Optionen** darunter, genau wie in der Vorlage: **"Maximale Meditationsdauer"** (5/10/15/20/30 Min, `#durationOptsV2` → `durationV2`) und **"Trainingsmodus"** als zwei Auswahlzeilen (`#modeRow` → `modus`): *Einzelmeditation* ("Eine Übung, passend zu deinem Zustand") oder *Trainingsprogramm* ("Mehrere Meditationen nacheinander"). Die frühere Anzahl-Auswahl (`Eine/Zwei/Drei`) ist damit ersetzt.
- **Die Empfehlung erscheint direkt auf dieser Seite** (`#recResult`, wie in der Vorlage): Knopf **"Meditationen empfehlen →"** (`#recommendBtn`) → Überschrift "Für dich empfohlen", eine Zeile je Übung (bei einem Programm nummeriert, mit Bild-Feld, Name, "9 Min · Stress lösen" und Play), darunter **"Warum diese Empfehlung?"** mit einem Satz aus Kompass-Zustand und Bereichen, und **"Jetzt starten"** (`#startRecBtn`) für die ganze Liste. Ein Tipp auf eine einzelne Zeile startet nur diese.

### 3.3 My Meditation — persönliche Empfehlungen (`data-step="meditation"`)

Aufbau genau wie in der Vorlage (`renderMyMed()`), die Empfehlung selbst sitzt seit dem Umbau auf der Kompass-Seite (§3.2):

1. **Kopf** — "My Meditation", darunter die Begrüssung (`#fdGreeting`) und das Badge "🇨🇭 Schweizerdeutsch".
2. **Trainings-Karte** — "Dein persönliches Meditationstraining" mit **"Zum Training →"** (`#toTrainingBtn`): startet die aktuelle Empfehlung, oder führt zum Kompass, wenn es noch keine gibt.
3. **"Dein Fortschritt"** — drei Zahlen aus dem echten Verlauf (`renderStats()`): Tage am Stück, Meditationen, Minuten gesamt.
4. **"Deine Ziele"** (`renderZiele()`, `#goalList`) — vier Ziele mit Fortschrittsbalken, gezählt aus dem Verlauf über die Kompass-Richtung der jeweiligen Übung: Mehr innere Ruhe (Entspannung + Anspannung), Gedanken beruhigen (Denken), Stress lösen (Anspannung), Gefühle verstehen (Fühlen), je 10 Einheiten.
5. **"Deine letzten Meditationen"** — die fünf jüngsten Einträge aus `loadHistory()` mit "Heute"/"Gestern"/Wochentag, Dauer und Bereich (`renderHistoryList()`).
6. **"Alle Meditationen entdecken"** — die vier Kategorien und "Ganze Bibliothek ansehen →".
7. **Begleiter-Chat** und "← Zurück zum Kompass".

**Empfehlungslogik (`empfehlungsPool()` + `baueEmpfehlung()`):** Der Pool sind alle freien Übungen, sortiert nach (1) Kompass-Richtung zuerst, (2) Nähe zur gewählten Zeit (±4 Min), (3) Anspannung — angespannt zuerst kurz und erdend, ruhig zuerst tief —, (4) Restnähe zur Zeit. Daraus baut `baueEmpfehlung()` je nach Trainingsmodus: **Einzelmeditation** = die erste Übung, die in die maximale Dauer passt; **Trainingsprogramm** = bis zu vier Übungen, erst je Richtung eine (Abwechslung), dann auffüllen, solange die Summe in die maximale Dauer passt. Der Begründungssatz entsteht aus dem Zustandswort und den Bereichen der gewählten Übungen. Der Chat setzt seine Empfehlung über `empfohlenVomChat` an die erste Stelle und zeigt sie sofort an.

### 3.3a Meditationsleiter — die Bibliothek (`data-step="meditation2"`)

- **Kopf** "Meditationsleiter · Lass dich begleiten", darunter die Bestandszahl ("**40** geführte Übungen · 3–30 Minuten").
- **Filter-Chips** (`#libFilters`): Alle · ⭐ Favoriten · 🧠 Gedanken beruhigen · ❤️ Gefühle verstehen · 💪 Stress lösen · 🌿 Entspannen; aktiver Chip in Gold, scrollt sich selbst in den sichtbaren Bereich.
- **Liste wie in der Vorlage:** je Übung eine weisse Karte mit Bild-Feld (Symbol des Bereichs), Name, "5 Min · Gedanken beruhigen", **Stern** (Favorit) und **Play**. Bereits gemachte Übungen bekommen "schon gemacht" (`schonGemacht()`).
- **Antippen startet sofort** — die frühere Mehrfachauswahl mit Auswahl-Leiste ist entfallen, mehrere Übungen hintereinander laufen jetzt über den Trainingsmodus (§3.2).
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

### 3.6 Profil (`data-step="profil"`)
- Seitenkopf "Profil · Dein Bereich", Karte "Dein Inselbewohner".
- **Status-Karte** (`renderStatusCard()`) zum Zugang, danach **Insel-Woche** und **Inselreise** aus dem Verlauf (beide blenden sich aus, solange es zu wenig Daten gibt).
- **Einstellungen** als Liste, wie in der Vorlage: "Abo verwalten" (→ Abo-Seite), "Statistiken" (→ My Meditation), "Favoriten" (→ Bibliothek, Filter ⭐), "Meine Insel gestalten" (→ §4), "Über die App" (blendet zwei Sätze ein), "Verlauf löschen".
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
STEPS = { splash, home, island (über Profil), compass, meditation, meditation2, outro, profil, abo }
TAB_FOR_STEP = { home:"home", compass:"kompass", meditation:"meditation", meditation2:"meditation2", profil:"profil" }
// "splash"/"outro"/"abo"/"island" haben keinen eigenen Tab
```

---

## 6. KI-Begleiter

- Zwei Chat-Instanzen: eine auf der Meditationsauswahl (`allowRecommend = true`), eine im Abschluss (`false`)
- System-Prompt: warmherziger, kurzer (max. 3 Sätze), unaufdringlicher Begleiter, keine Diagnosen, ermutigt bei ernster Not zu echtem menschlichen Kontakt
- Bekommt vollen Kontext mitgeschickt: Kompass vorher/(nachher), aktuelle Auswahl bzw. abgeschlossene Meditationen
- Kann in der Auswahl-Ansicht per angehängtem `[EMPFEHLUNG: <exakter Name>]`-Tag eine Übung **zur Mehrfachauswahl hinzufügen** (nicht ersetzen)
- Fallback-Sätze bei API-Fehlern/Offline (kein Absturz, kein sichtbarer Fehler für die Person)

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
9. **Bezahlung**: Testphase/Abo-Zustand ist reine Anzeige-Logik ohne echten Zahlungsanbieter — siehe Hinweis auf der Abo-Seite in der App ("noch nicht bezahlbar"). Solange das so ist, steht in `index.html` der Schalter `var ABO_LIVE = false;` — damit bleibt die ganze Bibliothek für alle offen (keine gesperrten Übungen, keine Testphasen-/Ablauf-Anzeige in Profil und Abo-Seite). Die Test-/Abo-Logik (`hatAbo()`, `imTest()`, `GRATIS_IDS`, Plan-Auswahl) bleibt vollständig im Code erhalten und lässt sich mit `ABO_LIVE = true` jederzeit wieder scharf schalten, sobald eine echte Bezahlung angeschlossen wird.
10. **Kompass-Empfehlungslogik**: Umgesetzt sind Quadranten-Stimmungswörter, Begründungstexte je Zustand (`next`), die Intensitäts-Abstufung in der Anzeige ("etwas/eher/sehr") und seit dem "Für dich"-Umbau eine echte Empfehlungs-Reihenfolge aus Richtung + gewählter Zeit + Anspannungsseite (§3.3). **Offen** bleibt die inhaltliche Klassifizierung je Meditation von Christine — und damit auch die Yoga-Icons für die Kategorien (aktuell Emoji, siehe §3.3a).
11. **Emotionale Historie ausbauen**: Der Verlauf speichert Vorher/Nachher pro Sitzung bereits (§5, Insel-Woche und Inselreise im Profil), und die Reise einer *einzelnen* Sitzung ist seit dem UX-Durchgang auf dem Abschluss-Kompass sichtbar (§3.5, `zeichneReise()`). Offen: dieselbe Spur-Darstellung auch **über mehrere Sitzungen hinweg** zeigen — z. B. ein kleiner Kompass im Profil, der die letzten Reisen übereinanderlegt. Das war Christines Idee eines "besonderen Features" und ist der nächste sinnvolle Schritt darauf.
