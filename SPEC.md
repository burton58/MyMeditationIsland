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
| G1 | **Kein behaupteter Zustand ohne Angabe.** Die App sagt nie, wie es jemandem geht, solange die Person es nicht selbst angegeben hat. | "Zeig mir, was jetzt passt" lieferte bei unberührtem Zeiger eine Empfehlung mit der Begründung "Dein Kompass zeigt: ausgeglichen" — das war nur die Ruhestellung der Nadel. (§3.3b) Ebenso war die Mantra-Karte auf der Abschluss-Seite schon vor dem Bestätigen bedienbar und hätte ein Mantra "passend zu deinem Zustand" aus der blossen Ruhestellung der Nadel gewählt (§3.5, 4. Aug. 2026). |
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
| 4. Aug. 2026 | **ENDSTAND Mudra & Mantra (nach mehreren Zwischenschritten am selben Tag — dies ist die gültige Fassung):** **Weder Mudras noch Mantras kommen in der App vor.** Schrittweise entstanden: erst fielen die Mudras aus der Oberfläche, dann das Mantra pro Übung in der Bibliothek, dann die Mantra-Karte auf der Abschluss-Seite, zuletzt **alles Übrige zum Thema Mantra** ("alles was mit Mantra zu tun hat löschen") — die komplette `MANTRAS`-Liste (20 Einträge), `findeMantra()`, der Mantra-Zweig im Begleiter, die `mantra`-Felder aller 31 Anliegen und die Mantra-Erwähnungen in Chat-Begrüssung und System-Anweisung. **Auch der (deaktivierte) Begleiter bietet also keine Mantras mehr an.** `MUDRAS` bleibt als einzige der beiden Listen in der Datei — der Begleiter nutzt sie noch (§6a). | §3.5, §3.3a, §6a |
| 4. Aug. 2026 | **"Deine Lieblingsmeditationen" auf der Startseite endgültig durch "Dein Fortschritt" ersetzt.** Christine hatte bemerkt, dass (1) "Dein heutiger Fokus" und "Deine Lieblingsmeditationen" fast gleich aussehen, obwohl nur eine einen Play-Knopf hatte, und (2) der Name mit den echten Stern-Favoriten verwechselt wird ("eigentlich heissen sie deine Favorites"). Probeweise als Fortschritts-Ausschnitt gezeigt (dieselbe Zahlenreihe wie auf "Mein Weg") — Christine: "Gefällt mir. Kann man so machen." **`renderLieblinge()` bleibt bewusst im Code, nur unbenutzt** ("Alten Code im Hintergrund behalten, man weiss ja nie") — dieselbe Art Rückweg wie beim deaktivierten Begleiter, §6a. | §3.3 |
| 4. Aug. 2026 | **"Dein heutiger Fokus" bekommt einen ▶-Knopf.** Die Zeile war schon immer antippbar (startet die Übung neu) — unsichtbar, bis Christine es beim Kategorien-Vergleich auffiel. Der Knopf macht jetzt sichtbar, was den Unterschied zu "Mein Weg" ausmacht: Start = schneller Wiedereinstieg (antippbar), Mein Weg = reine Aufzeichnung (nicht antippbar) — dieselbe Aufteilung wie bei Headspace (Recents zum Fortsetzen vs. Verlauf/Dashboard als Rückblick, recherchiert). | §3.3 |
| 5. Aug. 2026 | **"Ich möchte immer Knöpfe."** Christines Regel, direkt im Anschluss an den ▶-Knopf oben: eine antippbare Zeile soll das immer auch **zeigen**, ohne Ausnahme. Damit fällt die eben erst begründete Unterscheidung "Start antippbar, Mein Weg nur Aufzeichnung" gleich wieder weg — der Verlauf auf "Mein Weg" (`renderHistoryList()`) bekommt jetzt ebenfalls einen ▶-Knopf und ist wie alle anderen Listen der App neu startbar. | §3.3 Punkt 3 und 7 |
| 5. Aug. 2026 | **"Startseite, dein Fortschritt löschen und dein heutiger Zustand erscheint nur, wenn man auch eine Meditation heute gehört hat."** Zwei Änderungen: (1) "Dein Fortschritt" (erst am Vortag Ersatz für "Deine Lieblingsmeditationen") entfällt wieder — deaktiviert, nicht gelöscht, wie immer. (2) "Dein heutiger Fokus" zeigt sich nur noch, wenn heute wirklich etwas gehört wurde; die beiden anderen Zustände (Hinweistext bzw. Empfehlungskarte) sind jetzt weg, weil "Dein Zustand" direkt darunter ohnehin zum Kompass führt. | §3.3 |
| 5. Aug. 2026 | **Die Kompass-Karte auf der Startseite verspricht jetzt ein Ergebnis statt einen Ort.** Christine: "Wenn man auf der Startseite gelangt, ist es nicht verständlich, dass man dank dem Kompass Meditationen basierend darauf bekommt, wie es uns geht." Aus drei vorgelegten Varianten umgesetzt: **der Knopf trägt das Versprechen** — "Zum Kompass →" nannte nur einen Ort, jetzt **"Meditation für jetzt finden →"**. Der Erklärsatz nennt statt der Bedienung die beiden Achsen ("Angespannt oder entspannt, im Kopf oder im Gefühl – zeig es am Kompass."). Die Überschrift "Wie geht es dir gerade?" bleibt: Recherche zu Calm ("Check-Ins"), Insight Timer ("Daily Check-in") und Balance zeigt, dass alle die **Frage als Handlung** benutzen und den Nutzen **daneben** benennen — nicht statt ihr. Belegt ist bei NN/g nur *spezifisch schlägt vage* (Knopfbeschriftungen sind ein Versprechen), **nicht** *Nutzen schlägt Frage*. | §3.1 |
| 5. Aug. 2026 | **Zwei Textfehler mitbehoben.** (1) "Über die App" beschrieb die senkrechte Kompass-Achse als "wach oder müde" — sie ist **Kopf/Gefühl** (Nachdenklich/Emotional). (2) Beim Wochenziel stand bei einem Ziel von 1 "16 von 1 Meditation" — rechnerisch richtig, schief zu lesen. Ist das Ziel erreicht, entfällt das "von X" jetzt ganz ("16 Meditationen"); dass es erreicht ist, sagt die Zeile darunter ohnehin. | §3.3, §5 |
| 5. Aug. 2026 | **Anrede vereinheitlicht — und zwar auf die ICH-Form: "Dein Fortschritt" → "Mein Fortschritt".** Christine sah "Mein Weg" direkt über "Dein Inselbewohner". Ausgezählt: 16 Beschriftungen in der Du-Form, 2 in der Ich-Form. Ich hatte zuerst in die **Mehrheitsrichtung** (Du) vereinheitlicht — Christine hat das umgedreht: *"ich find es besser, wenn man die App anschaut und es geht um mein Weg, alles auf mein, nicht auf dein, mein."* Jetzt **17 Beschriftungen in der Ich-Form**. **Sätze bleiben in der Du-Form** ("Deine Insel wartet auf dich.", "Wie geht es dir gerade?") — Etikett und Ansprache sind zwei verschiedene Dinge. | §2 |
| 8. Aug. 2026 | **„Passt zu deiner Stimmung" auf der Startseite war eine falsche Behauptung — der Vorschlag beruht dort jetzt immer auf der Tageszeit.** Christine: *„Passt zu deiner Stimmung, die Meditation macht keinen Sinn, da hier nur einfach so was empfohlen wird, z. B. anhand der Tageszeit, aber nicht anhand des Kompasses. Titel anpassen. Hier einfach eine freie Empfehlung."* **Es war mehr als eine schiefe Überschrift.** Der Block zeigte `empfehlung[0]` — die Liste, die beim Drücken von „Zeig mir, was jetzt passt" auf der Kompass-Seite entsteht. Die wird aber **nicht** neu gebaut, wenn man danach die Nadel bewegt. Nachgestellt: Kompass auf „angespannt" → Empfehlung „Innere Stärke"; danach auf der Startseite die Nadel auf „gelassen" gezogen — der Satz daneben wechselte korrekt mit, der Vorschlag blieb „Innere Stärke · Stress lösen" stehen, unter der Überschrift „Passt zu deiner Stimmung". Genau diese Mischung stand auf Christines Bildschirmfoto (Stimmung „angespannt", Vorschlag „Gefühle verstehen"). **Jetzt eine klare Arbeitsteilung:** Die Startseite gibt eine **freie Empfehlung nach Tageszeit** und sagt das auch („Für den Abend") — Überschrift und Inhalt stammen damit immer aus derselben Quelle. Die Empfehlung zur Stimmung gibt es auf der **Kompass-Seite**, dort, wo sie im selben Moment berechnet wird. `empfehlung` wird auf der Startseite nicht mehr gelesen (Zeile dormant). **Grundsatz, zum zweiten Mal an diesem Tag:** Was die App behauptet, muss auf dem beruhen, was sie im selben Moment wirklich weiss. | §3.1 |
| 8. Aug. 2026 | **Übungen zu einer Lebenssituation werden nicht mehr von selbst vorgeschlagen.** Christine: *„Die speziellen Meditationen, wo es zum Beispiel um Schwangerschaft geht oder Umgang mit Kindern, das kann man nicht anhand vom Kompass empfehlen, weil man ja gar nicht danach fragt. Also sind so spezielle Meditationen, die man selber durchstöbern muss und auch suchen soll."* Der Kompass fragt nach **nachdenklich/emotional** und **entspannt/angespannt** — nie danach, ob jemand schwanger ist oder Kinder hat. Eine Schwangerschafts-Reise als Antwort auf „eher unruhig" wäre **geraten, nicht empfohlen** — genau der Fehler, den die App an anderer Stelle schon vermeidet (§3.1, `#recFehlt`). **Neues Merkmal `stoebern:true`** auf drei Übungen: Schwangerschafts-Reise, Geduld im Umgang mit Kindern, Alltag einer berufstätigen Mutter. Geprüft von `nurZumStoebern()`; die neue Funktion **`darfVorgeschlagenWerden()`** fasst beide Ausschlussgründe zusammen (Zeitfenster **und** Lebenssituation) und steht an denselben zwei Stellen wie bisher `passtZurZeit()` — Startseite und Kompass-Empfehlung. **In der Bibliothek ändert sich nichts:** Die drei stehen ganz normal in der Liste, unter ihrer Kategorie und in der Suche, und lassen sich jederzeit starten. **Nachgemessen:** 45 Kompass-Empfehlungen (9 Zeigerstellungen × 5 Dauern) und 12 Startseiten-Vorschläge (3 Tage × 4 Uhrzeiten) — **keine einzige** spezielle darunter; alle drei dagegen in Liste, Kategorie-Filter und Suche gefunden und gestartet. **Grundsatz:** Was die App von selbst anbietet, muss auf etwas beruhen, das sie auch wirklich weiss. | §3.3, §5a |
| 8. Aug. 2026 | **Die gewählte Dauer war nicht zu erkennen — echter Fehler, seit die Kachelreihe existiert.** Christine: *„Wenn man die maximale Zeit anklickt, dann passiert wie nichts. Es muss dann so einen Rahmen geben, dass man sieht, dass das angeklickt wurde."* **Ursache:** Die Auswahl wurde von einem gleitenden Umriss **hinter** den Kacheln angezeigt (`.seg-thumb`, `z-index:0`) — die Kacheln haben aber einen **deckend weissen** Hintergrund (`z-index:1`), der ihn vollständig verdeckte. Der Umriss war also nie zu sehen. Schlimmer: Die gewählte Kachel setzte zusätzlich `border-color:transparent` und wirkte damit **weniger** markiert als die anderen vier. Alle fünf sahen identisch aus (im Bildschirmfoto nachgeprüft). **Jetzt trägt die Kachel selbst die Markierung:** goldener Rahmen und warmer Grund `#fdf8ea` — dieselbe Bildsprache wie überall sonst in der App (`.radio-opt.on`). `box-shadow:inset` statt dickerem Rahmen, damit sich beim Umschalten nichts verschiebt. Alle fünf Kacheln durchgetippt: genau eine ist markiert und unterscheidet sich messbar von den übrigen. Der gleitende Umriss bleibt dormant (`display:none`). **Einzige betroffene Stelle** — `.seg` kommt in der App nur hier vor. | §3.2 |
| 8. Aug. 2026 | **Nachtrag am selben Tag: gar kein Programm mehr — der Kompass gibt immer genau eine Meditation.** Christine, nachdem sie Variante C gesehen hatte: *„Aber nur eine Meditation, nicht mehrere auf einmal."* Damit ist auch der leise Hinweis im Ergebnis (`#modusWechselBtn`) wieder still; die Kompass-Seite hat jetzt **einen einzigen Weg**: Zeiger stellen, Höchstdauer wählen, eine Übung bekommen — die Variante **A** aus der Analyse, also die einfachste der drei. **Die ganze Programm-Logik bleibt unverändert im Code** (`waehleProgramm()`, `PROGRAMM_MAX`, der Zweig in `baueEmpfehlung()` und sein Begründungstext) — nur das Markup des Knopfes ist auskommentiert und beide Zuhörer prüfen auf Existenz. **Nachgemessen**, dass die Empfehlung die gewählte Zeit auch ausnutzt statt nur einzuhalten: 5/10/15/20/30 Min → Übungen von 5/9/11/19/30 Min. Das leistet die bestehende Sortierung von `empfehlungsPool()` (am nächsten an der Wunschdauer zuerst) von selbst — genau die Sortierung, die dem Programm im Weg stand. | §3.2, §3.3 |
| 8. Aug. 2026 | **„Einzelmeditation / Trainingsprogramm" ist von der Kompass-Seite verschwunden — vorne steht nur noch die Dauer.** Christine: *„Ich würde einfach Meditation schreiben, nicht mehr Einzel oder Trainingsmeditation … und dann einfach die Zeit auswählen, wie lange maximal … analysiere, wie's andere machen … So wie's jetzt ist, ist falsch."* **Zwei gemessene Fehler gaben ihr recht:** Bei „max 5 Min" bestand ein Programm aus **einer einzigen Übung** — die Einstellung tat nichts. Und ab „max 20 Min" endete jedes Programm nach rund **16 Minuten**, weil die Obergrenze bei 4 Übungen lag: Die App versprach 30 und lieferte 16. **Recherche:** [Calm](https://support.calm.com/hc/en-us/articles/360000084794-How-to-Find-Long-Short-Meditations-on-Calm) lässt vor dem Start eine Dauer wählen und gibt **eine** Sitzung; [Headspace](https://www.headspace.com/app) trennt Kurse und Einzelsitzungen als zwei **Bereiche zum Stöbern**. Keine von beiden fragt vor jeder Sitzung „eine oder mehrere?". Dazu [Progressive Disclosure](https://www.uxpin.com/studio/blog/what-is-progressive-disclosure/) — erst zeigen, was jetzt nötig ist, aber mit sichtbarem Hinweis auf den Rest. Aus drei vorgelegten Varianten wählte Christine **C**: vorne nur die Dauer, das Programm als leiser Hinweis **im Ergebnis**. **Umgesetzt:** Der Block „Trainingsmodus" ist dormant; unter „Jetzt starten" steht `#modusWechselBtn` („Lieber mehrere kurze nacheinander? →" bzw. zurück). **Er erscheint nur, wenn ein Programm bei dieser Dauer wirklich mehr als eine Übung ergäbe** — dafür sind `waehleEinzeln()`/`waehleProgramm()` aus `baueEmpfehlung()` herausgelöst und nebenwirkungsfrei, sodass vorher durchgerechnet werden kann. **Zwei Folgefehler dabei behoben:** `PROGRAMM_MAX` 4 → **6**, und `waehleProgramm()` sortiert den Pool jetzt **nach Länge aufsteigend** — der Pool ist auf die *einzelne* Übung hin sortiert (am nächsten an der Wunschdauer), wodurch bei „max 20 Min" zuerst eine 19-Minuten-Übung gewählt wurde und danach nichts mehr passte. Ergebnis nachgemessen: 10/15/20/30 Min → **3/4/5/6 Übungen** mit 10/15/20/24 Min. **Nebengewinn:** Die Kompass-Seite ist so kurz, dass „Zeig mir, was jetzt passt" auf einem iPhone 14 wieder **ohne Scrollen sichtbar** ist. | §3.2, §3.3 |
| 8. Aug. 2026 | **Dauer und Trainingsmodus stehen jetzt immer offen — die Zusammenfassungs-Zeile ist weg.** Christine, mit Bildschirmfoto: *„Einzelmeditation, wieso steht 10 Min fix? Löschen, man kann unten auswählen."* Über der Auswahl stand eine Zeile „10 Min · Einzelmeditation" mit Stift, die die Blöcke darunter auf- und zuklappte — aufgeklappt stand derselbe Wert **zweimal** da, einmal als Zeile und einmal als markierte Auswahl. **Ich habe auf die Kosten hingewiesen und nachgefragt**, weil die Zeile zugleich der Schalter war: ohne sie muss die Auswahl immer offen stehen, und der Knopf „Zeig mir, was jetzt passt" rutscht damit unter den Bildrand. Christine hat die Rückfrage abgelehnt — der Auftrag bleibt also, wie er war, und ist so umgesetzt. **Abgemildert:** Die Auswahl ist zugleich enger gesetzt (Blockabstand 20→14 px, Überschrift 10→7 px, Modus-Zeilen Abstand 9→7 px und Innenabstand 14→11 px) — **236 → 210 px**. Damit scrollt die Kompass-Seite auf einem iPhone 14 noch **121 px** statt 204. **Bewusst NICHT verkleinert: die Kompass-Scheibe** (308 px) — sie ist Christines ausdrücklicher Wunsch vom 6. Aug. (*„Er ist viel zu klein, er muss viel grösser sein"*); um den Knopf sichtbar zu bekommen, hätte man 87 px gebraucht, die nur dort zu holen gewesen wären. **Zeile und Klapp-Mechanik bleiben dormant im Code** — Markup auskommentiert, CSS unverändert, der Klick-Zuhörer prüft jetzt auf Existenz (sonst stürzte die App beim Laden ab). Auswahl, Empfehlung und Programm-Modus nachgeprüft. | §3.2 |
| 8. Aug. 2026 | **„Gerade bei dir" über der Zustands-Karte entfernt.** Christine: *„Gerade bei dir sinnlos, löschen."* Sie hat recht — die Karte steht direkt unter dem Kompass, den man eben selbst gestellt hat; dass sie von einem selbst und von jetzt handelt, sagt der Zusammenhang. Das Wort kostete nur eine Zeile, ohne etwas hinzuzufügen. **Das Gegenstück „Jetzt" auf der Abschluss-Seite bleibt** — dort trägt es Bedeutung, weil es dem Zustand **vor** der Meditation gegenübersteht. Zeile auskommentiert, nicht gelöscht. | §3.2 |
| 8. Aug. 2026 | **Zwei weitere Übungen standen an der falschen Stelle — und Übungen können jetzt ein Zeitfenster haben.** Christine, mit Bildschirmfoto von 10:35 Uhr: *„Meditation Chakra-Reise wäre Entspannen. Feierabend-Meditation passt nicht zum Morgen sondern nur Mo bis Fr am Abend um 18-19 Uhr."* **(1) Chakren-Reise** (27 Min, *„Lig di bequem hin"*, am Ende *„lah alles wieder ruhig i sich zämme falle"*) stand unter **Gedanken beruhigen** — das ist eine Tiefenentspannung, jetzt `ost`. **(2) Feierabend-Übergang** stand unter **Gedanken beruhigen**, also im Morgen-Topf, obwohl ihr eigener Text sagt *„bevor de Abig aafoht"* und *„Das chunnt morn wieder dra"*. Zwei Änderungen nötig: Bereich → `ost` (der Bereich bestimmt, zu welcher Tageszeit überhaupt vorgeschlagen wird) **und** ein neues, allgemeines Feld **`zeit: { tage:[…], von, bis }`**, geprüft von `passtZurZeit(m)`. Für diese Übung: **Mo–Fr, 17:00–19:59**. **Grenze bewusst gezogen:** Das Zeitfenster gilt nur dort, wo die App **von selbst** vorschlägt — Startseite (`tagesVorschlag`) und Kompass-Empfehlung. In der **Bibliothek bleibt jede Übung jederzeit auffindbar und startbar**; wer sonntags früh eine Feierabend-Übung hören will, soll das können, sie soll ihr nur nicht ungefragt angeboten werden (nachgeprüft: Sonntag 8:30 Uhr steht sie in der Liste und startet). Über 5 Wochentage × 7 Uhrzeiten durchgespielt — ausserhalb des Fensters wurde sie nie vorgeschlagen. **Grundsatz (zweites Mal an einem Tag):** Der Bereich einer Übung ist keine Etikette, sondern steuert die Vorschläge; bei neuen Übungen prüfen, ob der Text zum Bereich passt. | §3.1, §3.3 |
| 8. Aug. 2026 | **Die Startseite hat jetzt immer einen Startknopf — und fragt bei einer angefangenen Übung nach.** Christine: *„Ich möchte, dass dies immer angezeigt wird, und wenn man eine Meditation noch nicht fertig hat, fragen: Willst du weiterhören? Und sonst keine Auflistung der Meditationen von heute, die sind im Profil."* Drei Änderungen am Fokus-Block: **(1) Der Vorschlag steht immer** — bis dahin verschwand er, sobald heute eine Meditation gelaufen war, und die Startseite hatte dann keinen einzigen Abspielknopf mehr. **(2) Eine angefangene Übung fragt „Willst du weiterhören?"** (vorher die blosse Etikette „Angefangen"). **(3) „Heute gehört" entfällt** auf der Startseite; der Verlauf steht auf „Mein Weg". Dormant im Code, nicht gelöscht. **Nebenwirkung mitbedacht:** Da der Vorschlag jetzt auch nach einer Meditation steht, hätte er genau das vorschlagen können, was gerade lief. `tagesVorschlag(meide)` überspringt darum alles, was heute schon gehört wurde, und die offene Übung; bleibt nichts übrig, greifen der Reihe nach die alten, breiteren Auswahlen — lieber ein zweitbester Vorschlag als eine leere Stelle. Dasselbe für die Kompass-Empfehlung: sie nimmt den ersten Treffer, der nicht gemieden wird. **Alle vier Zustände geprüft** (nichts / offen / heute gehört / beides). **Reihenfolge nachträglich gedreht:** Der erste Entwurf stellte die Frage zuoberst (sie ist dringlicher). Christine: *„Vorschlag Meditation muss immer da sein als erstes."* Sie hat recht — der Vorschlag ist der **feste** Punkt der Seite; stünde er mal oben und mal in der Mitte, müsste man ihn jedes Mal suchen. Jetzt: Vorschlag, darunter die Frage. Kosten: Auf einem iPhone 14 scrollt die Seite bei einer offenen Übung um 62 px — mit drei Abschnitten statt zwei unvermeidlich und bewusst in Kauf genommen. | §3.1 |
| 8. Aug. 2026 | **Die Stimmungs-Karte auf der Startseite hatte ein Loch — und ihr Kompass sah tot aus.** Christine, mit Bildschirmfoto: *„Zweite Box sieht nicht gut aus mit so viel Weiss und wenig Text, kann man das nicht professioneller gestalten?"* **Ursache gemessen:** Der kleine Kompass sass in einer eigenen Kopfzeile neben der Überschrift. Diese Zeile war so hoch wie er (68 px), enthielt aber nur eine kurze Textzeile — links daneben blieb ein leeres Band, und zwischen Frage und Satz klaffte eine Lücke. Der Erklärsatz stand darunter über die ganze Breite (so seit 6. Aug., weil er neben dem Kompass in lauter kurze Zeilen zerfiel). **Gelöst mit `float`:** Der Kompass steht rechts, Überschrift und Satz fliessen um ihn herum — die ersten Zeilen laufen neben ihm, die restlichen wieder über die volle Breite. Damit ist beides weg: das leere Band **und** das Zerfasern. Die Karte ist bei gleichem Inhalt **20–26 px kürzer** (390 px: 193 → 167). Auf 320/375/390/430 nachgemessen, Abstand zum Knopf überall gleichmässig 13 px. Ohne ein Wort ihres Textes zu ändern — die vier Formulierungen sind ihre eigenen Entscheide vom 6. Aug. **Zwei Fehler nebenbei gefunden und behoben:** (1) Die Nadel liess sich auf der Startseite **ziehen**, der Satz daneben blieb aber bis zum nächsten Seitenwechsel auf dem alten Stand — der kleine Kompass wirkte, als täte er nichts. Der Satz sitzt jetzt in `zeigeHomeStateText()` und wird beim Ziehen mitgeführt; bewusst nur dieser Satz und nicht das ganze `renderHome()`, weil das bei jeder Fingerbewegung durchläuft. (2) Beim Umbruch der Begrüssung rutschte das Bild allein auf die zweite Zeile („Schön, dass du noch da bist" + Mond) — ein geschütztes Leerzeichen hält es jetzt beim letzten Wort. | §3.1 |
| 8. Aug. 2026 | **„Solarplexuschakra – Willensstärke" war falsch einsortiert — sie stand nachts unter „Für die Nacht".** Christine, mit Bildschirmfoto um 23:15 Uhr: *„Solarplexus Willensstärke ist nicht entspannend und zum schlafen sondern mehr für am Tag wenn man den Willen stärken will."* Der Übungstext gibt ihr recht: Sie beginnt mit *„Sitz oder stand ufrecht ane"* und endet mit *„Nimm die Chraft mit i dä Rest vom Tag"* — und stand trotzdem in `dir:"ost"` (Entspannen), aus dem die Startseite ab 17 Uhr und vor 5 Uhr vorschlägt. Dort trug sie ausserdem die Begründung „Vertieft deine Ruhe", die schlicht falsch war. **Umgezogen nach `west`**, wo die drei anderen Kraft-Übungen schon stehen (Kraft-Impuls, Innere Stärke, Innere Stärke vertiefen) — und aus dem die Startseite zwischen 11 und 17 Uhr vorschlägt, also genau „für am Tag". Behebt in einem Zug drei Stellen: den Tagesvorschlag, die Kompass-Empfehlung und den Kategorienamen in der Bibliothek („Stress lösen" statt „Entspannen"). **Gegengeprüft:** alle 47 Übungen nach tagesbezogenen Formulierungen durchsucht — sie war die einzige im Abend-/Nacht-Bereich; die anderen Treffer stehen bereits richtig. Danach 6 Tage × 3 Uhrzeiten durchgespielt: abends und nachts kommen jetzt ausschliesslich ruhige Übungen. **Grundsatz daraus:** Der Bereich einer Übung ist nicht nur eine Etikette — er entscheidet, wann sie vorgeschlagen wird. Bei neuen Übungen prüfen, ob der Text zum Bereich passt. | §3.1, §3.3 |
| 8. Aug. 2026 | **Fertig: Die App enthält kein einziges farbiges Emoji mehr.** Mit Nr. 16 (Insel als Umriss) und Nr. 29 (ruhige flache Welle) waren alle 39 Symbole beisammen; die vier verbliebenen Gruppen wurden in einem Zug eingebaut — die **fünf Stationen der Inselreise** (`STUFEN`, `stufenBild()`), die **acht Zeilen der Einstellungs-Liste** (`.row-icon img`), **„Meine Insel gestalten"** (`.opt-bild`, Wetter/Meer/Charakter/Ankunft) und die **acht Bilder zur Auswahl fürs Profilbild** (`AVATAR_ZEICHEN`). Dazu ein beim Emoji-Durchlauf gefundener Nachzügler: der Knopf „🏝️ Zur Titelseite". **Alte Wahl bleibt erhalten:** `AVATAR_ZEICHEN` speichert jetzt Dateinamen statt Zeichen — wer vorher ein Emoji gewählt hatte, hätte plötzlich das Ersatzbild gesehen. `AVATAR_ALT` übersetzt den alten Wert beim Lesen still auf die neue Datei; alle acht Fälle durchgeprüft, ebenso das Neuwählen samt Neustart. **Geprüft mit einer automatischen Emoji-Suche** über den sichtbaren Text aller Seiten: übrig bleiben nur ★ ☆ ✎ ✓ — einfarbige Schriftzeichen, keine Emoji, bewusst so (§3.3a, Entscheid vom 5. Aug.). 44 Bilddateien, alle in `sw.js`, keine fehlt und keine liegt ungenutzt herum (beides maschinell gegengeprüft). | §3.1, §3.3, §5a |
| 8. Aug. 2026 | **Die verstreuten Symbole sind eingebaut — darunter die Begrüssung ganz oben auf der Startseite.** Mit Nr. 27 (Sonne) war die Gruppe komplett. Ersetzt: ☀️ 🌴 🌙 in `begruessung()` (alle fünf Tageszeit-Stufen durchgeprüft, mit fest gestellter Uhr), 🇨🇭 im Abzeichen „Schweizerdeutsch", 🔒 hinter dem Namen gesperrter Übungen (nutzt dasselbe Bild wie „Test beendet" auf der Zugangs-Karte — kein neues nötig), 🌴 beim erreichten Wochenziel und 🧘 als Notbehelf, wenn zu einer Übung gar kein Bild passt. Neu: `bildZeichen()`, `.gruss-bild` (1,18 em, wächst mit der Überschrift mit), `.badge-bild`, `.zeile-schloss`, `.goal-haken img`. **Damit ist die Begrüssung emoji-frei** — die Stelle, die man bei jedem Öffnen als Erstes sieht. **Aus derselben Lieferung neun weitere brauchbare Bilder** (25, 26, 27, 28, 30, 31, 32, 33, 34). Die Sonne kam auf **weissem Blatt** statt mit Transparenz; über die Farbigkeit sauber freigestellt, wobei die Schwelle höher gesetzt werden musste (Grund-Farbigkeit 1 gegen 154 der Linie), sonst blieb ein blasser quadratischer Schleier stehen. **Es fehlen jetzt genau zwei Bilder:** Nr. 16 (Insel als Umriss) schaltet die Inselreise **und** die Einstellungs-Liste frei, Nr. 29 (ruhige flache Welle) „Insel gestalten" **und** die acht Profilbilder. | §3.1, §5a |
| 10. Aug. 2026 | **Die Karte auf „Mein Weg" hiess „Mein Inselbewohner" — direkt unter der Seiten-Überschrift „Mein Weg" eine doppelte Selbstbezeichnung, zweimal in Folge korrigiert.** Der „Inselbewohner" auf dieser Seite ist ja Christine selbst, genau wie „Mein Weg" schon ihr Weg ist. **Erster Versuch „Meine Insel"** verwarf sie sofort — sie stellte klar, dass die *Seite* weiter „Mein Weg" heisst (das war nie zur Debatte gestanden) und dass es um die Karte mit ihrem Foto geht. Der eigentliche Fehler an „Meine Insel": Es kollidiert mit **„Meine Insel gestalten"** — derselbe Name für zwei verschiedene Ziele (Einstellungen → Insel-Konfigurator) wäre die nächste Verwechslung gewesen, genau das Problem, das der Umbau eigentlich lösen sollte. Auch „Mein Rückblick" (Abschluss-Seite) und „Mein Bild" (Fotoauswahl-Dialog) waren als Namen schon anderswo vergeben. **Umgesetzt: Der Knopf nennt jetzt direkt, was er aufklappt — „Insel-Woche & Inselreise"** —, statt einen weiteren erfundenen Sammelnamen zu riskieren. Untertitel dabei von „Meine Insel-Woche und Inselreise ansehen" auf **„Tippen zum Anzeigen"** gekürzt, sonst stünden Name und Untertitel praktisch doppelt da. Nur Beschriftungen geändert (`#profilInselbewohnerBtn .name`, `#inselbewohnerHinweis`), IDs und Funktionsnamen (`inselbewohnerOffen`, `setInselbewohnerOffen()`) bleiben unverändert. **Grundsatz:** Ein neuer Name ist erst sicher, wenn geprüft ist, dass er nicht schon woanders in der App steht. **Nachtrag am selben Tag:** „Insel-Woche & Inselreise" war zwar kollisionsfrei, aber Christine fand es zu nüchtern: *„Etwas fancier wie mein Insel Aufenthalt."* Zum Vergleich recherchiert, wie andere Apps diese Stelle nennen — Headspace „Journey", Calm „Dashboard", Insight Timer „My Journey"/„Stats" — drei Vorschläge im selben Ton daraus abgeleitet (Meine Reise / Meine Auswertung / Meine Übersicht) vorgelegt. **Christine hat stattdessen ihren eigenen Vorschlag übernommen: „Mein Insel-Aufenthalt"** — passt zur Insel-Metapher der ganzen App (§5a: die Insel als Rückzugsort in einem selbst) und kollidiert mit keinem bestehenden Namen (`Aufenthalt` kam vorher nirgends in der App vor). | §3.3 |
| 10. Aug. 2026 | **„Solarplexuschakra – Willensstärke" wurde bei „Etwas unruhig" empfohlen — obwohl die Übung aktivierend ist, nicht beruhigend.** Christine, zum wiederholten Mal zur selben Übung (vorher am 8. Aug. schon einmal wegen der Tageszeit korrigiert): *„Solarplexus ist aktivierend und stärkt Willen und gut gegen Rückenprobleme, aber ich glaube nicht wenn man unruhig ist."* **Ursache:** `dir:"west"` bedeutet zwei verschiedene Dinge gleichzeitig — für `tagesVorschlag()` ein Tagesfenster (11–17 Uhr), für die Kompass-Empfehlung die **Anspannungs-Achse** (`NUTZEN.west = "Löst Anspannung im Körper"`). Der Umzug vom 8. Aug. (richtig für die Tageszeit) brachte die Übung damit automatisch auch in die Kompass-Empfehlung für „angespannt"/„unruhig" — genau dort, wo sie inhaltlich nicht hingehört: Sie baut Kraft auf, statt Anspannung zu lösen. **Neues Merkmal `aktivierend:true`** auf der Solarplexus-Übung; `empfehlungsPool()` (Kompass) filtert es auf der angespannten Seite jetzt heraus (mit Fallback-Netz, falls das je alles wäre, was übrig bleibt). **Bewusst nur dort:** `tagesVorschlag()` (Startseite) prüft `aktivierend` nicht — dort soll die Übung tagsüber weiter erscheinen, wie am 8. Aug. gewollt; auch in der Bibliothek bleibt sie unverändert auffindbar. **Grundsatz:** `dir` steuert an zwei Stellen zwei verschiedene Dinge (Tageszeit UND Kompass-Achse) — bei künftigen Übungen mit ausgeprägtem Charakter (aktivierend statt beruhigend) reicht die Zuordnung zu `dir` allein nicht, es kann ein eigenes Merkmal brauchen. | §3.1, §3.3 |
| 10. Aug. 2026 | **Die Nadel liess sich nicht überall ausserhalb der Kompass-Scheibe ansetzen — an den Seiten war der Randbereich zu schmal zum Treffen.** Christine: *„Wenn man den Kompass anschaut und die Nadel setzen möchte und man berührt aussen ausserhalb des Kompasses, um die zu setzen, dann geht das nicht überall, weil's an der Seite zu eng ist und man nicht hinaufgehen kann mit dem Finger auf dem Screen."* **Technische Ursache:** Die Kompass-Scheibe reagiert seit jeher auch ausserhalb des sichtbaren Rings auf Berührung — `setFromPoint()` begrenzt den Zeiger ohnehin auf `COMPASS_MAXR`, ein Antippen weiter draussen setzt ihn einfach an den Scheibenrand. Das griff aber nur dort, wo im SVG tatsächlich **etwas gezeichnet** ist (Ring, Nadel, die vier Beschriftungswörter, die vier Goldpunkte) — `.compass-wrap svg` stand auf `pointer-events:auto`, und das reagiert bei einem `<svg>` nur auf gemalte Flächen, der leere Rand dazwischen bleibt taub. An Oben/Unten übernehmen die breiten Wörter „Nachdenklich"/„Emotional" einen grossen Teil dieses Randes, an den Seiten sitzen nur ein schmales Wort und ein kleiner 4,5-Punkt-Kreis — spürbar weniger Trefffläche, genau wie beschrieben. **Behoben mit einer einzigen CSS-Zeile:** `pointer-events:all` statt `auto` — jetzt reagiert das ganze Quadrat der Zeichenfläche, auch die leeren Stellen. Gilt für alle drei Kompass-Zeichnungen (Kompass-Seite, kleiner Kompass auf der Startseite, Abschluss-Seite), weil sie dieselbe CSS-Regel teilen. Rein technisch, nichts sieht anders aus. | §3.2 |
| 10. Aug. 2026 | **Nachtrag am selben Tag: Die vier Wörter im Kompass-Ziffernblatt waren schwer leserlich.** Christine, direkt im Anschluss an die Treffflächen-Korrektur: *„Und die Wörter sind schwer leserlich."* Die Beschriftung („Nachdenklich", „Emotional", „Entspannt", „Angespannt") liegt direkt auf dem Kompass-Foto, dunkle Schrift mit einem hellen Schein dahinter (`.dial-label`) statt eines festen Kastens, damit sie auf jedem Foto ohne zusätzliche Breite lesbar bleibt. Der Schein war aber nur 2,4 px dick und zu 72 % durchsichtig — gegen dunklere, unruhige Bildstellen (z. B. Palmblätter hinter „Angespannt", ähnlicher Grünton wie die Schrift selbst) reichte das nicht. Jetzt **5 px und 94 % deckend** — wirkt wie ein weiches Schildchen hinter jedem Wort, unabhängig vom Bildinhalt darunter; die Buchstaben selbst bleiben scharf, weil die dunkle Füllung über dem Schein liegt. Eine einzige CSS-Regel, gilt für Kompass- und Abschluss-Seite gleichermassen. | §3.2 |
| 10. Aug. 2026 | **Der Kompass zeigt jetzt ein echtes Foto von Christine statt des gemalten Bildes — türkises Wasser mit einer Insel am Horizont.** Christine hatte zehn eigene Urlaubsfotos geschickt und gefragt, ob eine App besser nur mit echten Fotos arbeitet. **Recherchiert:** [Calm](https://support.calm.com/hc/en-us/articles/115002473827-How-to-View-Your-Meditation-Stats-History-and-Streak-in-Calm) setzt komplett auf echte Natur-Fotos und -Videos, [Headspace](https://help.headspace.com/hc/en-us/articles/360043063714-What-is-Move-Mode) komplett auf gezeichnete, animierte Welten. Beide erfolgreich — es gibt kein objektiv „richtig", aber **beide ziehen die eine Richtung konsequent durch**; der Fehler wäre das Vermischen. Für diese App spricht der Sonderfall den Ausschlag: Sie ist für Christine allein gebaut, und es sind **ihre eigenen Erinnerungen** — das kann kein generiertes Bild leisten und passt zum „Mein Weg"/„Mein Insel-Aufenthalt"-Gedanken besser als ein Traumbild. **Umfang bewusst klein gehalten** (Christines Entscheid: *„Ich finde erstes Bild und Kompass reicht"*): Die acht Meditations-Hintergründe (Waldlichtung, Bergsee, Winterlandschaft …) bleiben gemalt — zu jedem einzelnen ein passendes eigenes Foto zu finden wäre viel Aufwand für wenig Wirkung. **Auswahl-Kriterium für den Kompass ist nicht Schönheit, sondern eine RUHIGE FLÄCHE:** Die vier Wörter (`.dial-label`) und der goldene Zeiger liegen direkt auf dem Bild — ein unruhiges Foto macht sie unleserlich (dasselbe Problem, das am selben Tag schon die Beschriftung betraf). Drei Zuschnitte vorgelegt (Sonnenuntergang am offenen Meer / türkises Wasser mit Insel / leerer Strand mit Bergen), Christine wählte **das türkise Wasser** — es liegt farblich am nächsten am Rest der App, und am Horizont liegt tatsächlich eine Insel. Eingebaut als 560×560-Zuschnitt im bestehenden `.compass-photo`-Data-URI (56 260 → 64 236 Zeichen); die Regel gilt für alle drei Kompass-Zeichnungen (Kompass-Seite, kleiner Kompass auf der Startseite, Abschluss-Seite). `insel.jpg` bleibt unverändert. **Grundsatz:** Wer das Kompass-Foto je tauscht, muss wieder auf die ruhige Fläche achten — nicht auf das schönste Motiv. | §3.2, §5a |
| 10. Aug. 2026 | **Die Titelseite zeigt jetzt Christine selbst — ihr Foto beim Meditieren am Strand bei Sonnenuntergang (`titel.jpg`), statt der gemalten Insel.** Zweite Hälfte des Foto-Entscheids (siehe Kompass-Eintrag). **Zwei Dinge wurden dabei gemessen statt geschätzt.** *(1) Welches der zwei Fotos vom selben Abend?* Naheliegend war die nähere Aufnahme — sie hat den kräftigeren goldenen Schimmer. Gemessen in den drei Zonen, die auf der Titelseite zählen (Titel oben / freie Mitte / Knopf unten), kehrt sich das um: Beim näheren Foto liegt die warme Stelle **oben, unter dem Titel** und ist damit verdeckt; beim weiteren liegt sie in der **freien Mitte**, wo man sie sieht (Wärme R−B: +17 gegen −5), der Titelbereich ist ruhiger (189 gegen 206) und der Sand unten am dunkelsten (52 gegen 75), wodurch der goldene Knopf am stärksten leuchtet. **Christines Wahl: das weitere Foto.** *(2) Wie hell?* Ihr Einwand *„beim weiteren Foto müsste man ein wenig aufhellen"* war berechtigt. Vier Stufen vorgelegt; aufgehellt wird per **Gamma-Kurve nur in den Tiefen** (Sand, Person), der Himmel bleibt fast unberührt — sonst kippt die Abendstimmung ins Graue. **Christines Wahl: „leicht" (Gamma 0,88)** — Sand 53 → 64, Himmel 180 → 187. Danach drei Zuschnitte vorgelegt, gewählt wurde der **mittlere** (etwas näher herangezogen, `frac 0.82`), damit die Person erkennbar ist und unten trotzdem ruhiger Sand für den Knopf bleibt. **Zwei Fallen umgangen:** (a) Christine schickte die Fotos später ein zweites Mal — diese Fassung war bereits **selbst aufgehellt** (Helligkeit 143 statt 120); verwendet wurde die **erste**, damit „leicht" genau das ist, was sie in der Vorschau gesehen und gewählt hat. (b) **`insel.jpg` wurde NICHT überschrieben**, sondern eine neue Datei `titel.jpg` angelegt: `insel.jpg` ist weiterhin der Hintergrund während jeder Meditation ohne eigenes Bild (`med.bg \|\| "insel.jpg"`, 17 Übungen) — ein Überschreiben hätte still auch die Meditationen verändert. In `sw.js` eingetragen. **Bekannte Einschränkung:** Ein Querformat-Foto als bildschirmfüllender Hochformat-Hintergrund nutzt nur rund 350 px der Originalbreite, wird auf dem Handy also rund 3,4-fach hochskaliert. Das Motiv (weiche Himmels- und Sandverläufe) verträgt das; ein detailreiches Bild würde hier sichtbar weich. **Nachtrag am selben Tag:** Der gewählte mittlere Zuschnitt war Christine noch zu nah — *„ich von sehr weit weg, Originalbild"*. Jetzt steht die **volle Originalhöhe ohne Hineinzoomen** drin (`frac 1.0`); sie sitzt klein im Bild, mit viel Strand und Himmel. Weiter herauszoomen ist bei diesem Foto nicht möglich: Querformat auf Hochformat-Bildschirm zeigt bauartbedingt nur rund ein Drittel der Bildbreite. | §3, §5a |
| 10. Aug. 2026 | **Bildqualitaets-Pruefung: Christine hatte recht, ein Bild war weich — und die Liste unter den Foto-Kacheln passte nicht mehr dazu.** Ihre Beobachtung: *„Ich hab das Gefuehl, gewisse sind nicht so scharf klar oder sehen so nach eigenen Freizeit Fotos aus."* **Erste Messung war irrefuehrend** — ein einfacher Kanten-Mittelwert bestraft glatte Motive (Meer, Himmel, Nebel) und haette den Kompass und das Nordlicht faelschlich als unscharf gemeldet. Richtig ist das **99,5-Prozent-Perzentil des Laplace-Betrags**: wie scharf sind die schaerfsten Stellen im Bild. Damit gemessen waren acht von neun Bildern in Ordnung; **nur die Titelseite fiel durch (Wert 16)**. **Ursache, quantifiziert:** Das Meditationsfoto ist Querformat (1170x752), der Bildschirm Hochformat — nutzbar sind nur 386 px Breite, auf einem iPhone also **3,1-fach vergroessert**; ein von Haus aus hochkant aufgenommenes Foto braeuchte nur 1,5-fach. **Behoben** mit einer Unschaerfemaske (Radius 1,6, 120 %, Schwelle 3) direkt beim Erzeugen von `titel.jpg`: Wert 16 -> 30, ohne sichtbare Raender. **Die eigentliche Loesung steht noch aus:** Die Fotos kommen mit 1170 px Breite an, das iPhone nimmt mit rund 4000 auf — beim Verschicken werden sie verkleinert. Mit dem Original in voller Groesse waere kein Nachschaerfen noetig. **Zweite Korrektur am selben Tag:** *„Bei den Meditationen, die vier Kacheln, die muessten unten auch gleich sein wie oben oder gar keine unten."* Seit die vier Kacheln echte Fotos sind, standen in der Liste darunter weiter die gemalten Bildchen — zwei Bildsprachen auf einem Bildschirm. „Gleich wie oben" haette bedeutet, auch die acht gemalten Meditations-Hintergruende zu ersetzen (die waehrend der Uebungen laufen). Umgesetzt wurde daher **ihre zweite Moeglichkeit: gar kein Bild in der Bibliotheks-Liste** (`.lib-row.ohne-bild`, `rowFoto()` dort nicht mehr aufgerufen). **Nur dort** — Startseite, Verlauf und Empfehlung behalten ihre Vorschaubilder, weil daneben keine Fotokachel steht. Damit ist auch der Entscheid vom 5. Aug. 2026 (Fotos statt Symbole in den Zeilen) fuer die Bibliothek aufgehoben; er gilt an den uebrigen Stellen weiter. | §3.4, §5a |
| 10. Aug. 2026 | **Die Startseite wechselt ihr Foto jetzt mit der Tageszeit — und die Bildsprache der ganzen App ist auf echte Fotos von Christine umgestellt.** Ihr Auftrag: *„wenn man einsteigt und so guten Morgen oder guten Abend, dass sich das Bild immer anpasst"*, dazu Kompass und die vier Übungs-Kacheln überprüfen, **Ziel: keine unechten Fotos**. **Neu `tageszeitBild()`** in `renderHome()`, mit **exakt denselben Grenzen wie `begruessung()`** (5/11/17/22 Uhr) — wer eine ändert, muss die andere mitändern, sonst sagt die App „Guten Morgen" und zeigt die Nacht. `begruessung()` hat fünf Stufen, zwei davon sind Nacht, daher **vier Bilder**: `start-morgen/-tag/-abend/-nacht.jpg`, alle exakt auf 720:505 gerechnet (das fixierte Verhältnis von `.home-hero-photo`). Das `src` im Markup ist nur der Startwert; gesetzt wird es aus dem Code, und nur bei echter Änderung — sonst lädt der Browser bei jedem `renderHome()` neu und das Bild blitzt auf. **Kompass** auf ein Foto mit drei glatten Bändern (Himmel, Wasser, Sand) gewechselt: Christine hatte die vorherige Fassung verworfen (*„es muss so etwas in dieser Richtung sein, so blau, grün"*), und für den Kompass zählt weiterhin die ruhige Fläche, weil die vier Wörter direkt darauf liegen. **Die vier Kacheln** bekommen eigene Fotos über die **neue Liste `KAT_KACHEL_FOTO`** — bewusst getrennt von `LIB_KAT_FOTO`, das zusätzlich von `rowFoto()` als Ersatzbild für die 17 Übungen ohne eigenes Bild gebraucht wird; sonst wäre die lange Liste halb Foto und halb gemalt. Ausgewählt wurden sie danach, dass sie sich **voneinander** unterscheiden (ein erster Versuch mit vier Strandbildern scheiterte genau daran): blaugraues Eis, weisser Sand, grünes Wasser, goldener Abend, gemessene Helligkeit 116 bis 184. **Die vier Kacheln sind damit ENTSCHIEDEN und nicht mehr zur Diskussion:** Angeboten war, „Gedanken beruhigen" (Schneeberge) gegen ein wärmeres Motiv zu tauschen, weil es das kälteste der vier ist und am wenigsten zur Insel passt. Christine hat abgelehnt: *„Aber die Bilder für die Übungen der Meditationen, das belasse so, weil die sind perfekt. Dort bitte nichts ändern."* Wer hier etwas ändert, ändert eine getroffene Entscheidung; ein entsprechender Hinweis steht auch direkt über `KAT_KACHEL_FOTO` im Code. **Grundsatz, von Christine formuliert:** *„Vergiss nicht, es geht um My Meditation Island als roter Faden."* Kalte Motive (Eislagune, Gletscher) fielen daraufhin dort weg, wo es ums Ankommen geht — Morgen und Tag tragen jetzt Türkis und Grün. | §3, §3.2, §3.3, §5a |
| 10. Aug. 2026 | **Auch das grosse Foto auf der Startseite (`insel-start.jpg`) ist jetzt Christines eigenes — dieselbe Meditationsaufnahme, aber die nähere Fassung (`start.jpg`).** Christines Wunsch, im Anschluss an die Titelseite; sie schickte das Foto eigens im Querformat nach (*„hier anderes Format fürs zweite Foto"*), weil dieser Platz ein breiter, flacher Streifen ist statt eines ganzen Bildschirms. **Zuerst wurde die nähere Aufnahme eingebaut** — Überlegung: Auf der Titelseite füllt das Bild den ganzen Bildschirm, dort darf die Person winzig sein; im schmalen Streifen der Startseite sei sie bei gleichem Zuschnitt kaum mehr zu erkennen. **Christine hat das umgedreht und dabei einen Grundsatz formuliert:** *„Ziel mehr Landschaft zeigen, ich bin nebensächlich."* Jetzt steht dort die **weite** Aufnahme, dieselbe wie auf der Titelseite. Erkennbarkeit der Person war also das falsche Kriterium — es geht um den **Ort**, nicht um die Person; genau das trägt auch die Insel-Metapher der App (§5a). **Merksatz für künftige Bildentscheide: im Zweifel mehr Landschaft, Menschen klein.** **Zuschnitt exakt auf 720:505 gerechnet** — genau das Seitenverhältnis, auf das `.home-hero-photo` fest eingestellt ist (Entscheid vom 5. Aug. 2026, „das Bild dann fixieren"). Dadurch bleibt die CSS-Regel unverändert, und es entsteht weder Rand noch Beschnitt; Ausgabe 1008×707. Nur ein Hauch aufgehellt (Gamma 0,94), da diese Fassung von Haus aus heller ist. `insel-start.jpg` bleibt wie `insel.jpg` unverändert liegen. In `sw.js` eingetragen. | §3.3, §5a |
| 10. Aug. 2026 | **„Wir schlagen dir eine Meditation vor" — an drei Stellen sprach die App plötzlich als „wir" statt als sie selbst zu verschwinden und nur "du"/"ich" stehen zu lassen.** Christine: *„Wird in Meditationsapp von 'wir' gesprochen? Ich finde es verwirrend."* Sie hat den wunden Punkt getroffen: „wir" setzt ein Team/eine Firma hinter die App, die sonst nirgends auftritt — jede andere Stelle spricht entweder direkt zu ihr („dein Kompass zeigt …") oder in ihrer eigenen Ich-Form („Mein Weg", „Mein Fortschritt", 5. Aug. 2026, §2). **Gefunden mit einer Suche nach „wir"/„uns"/„unsere" in der ganzen App:** drei echte Treffer im Alltagstext — der Satz auf der Startseite („wir schlagen dir … vor") sowie zwei Begründungssätze auf der Kompass-Seite („empfehlen wir dir …", „haben wir dir … zusammengestellt"). **Bewusst unverändert:** die „wir"-Stellen in der Datenschutzerklärung (§3.7b) — dort ist mit „wir" zu Recht der App-Betreiber gemeint, ein anderer, rechtlich korrekter Kontext. Ersetzt durch die passive Form, die Christine selbst schon am 6. Aug. 2026 vorgegeben hatte (*„eine passende Meditation … wird dir vorgeschlagen"*, siehe §3.1) — die Startseite trägt jetzt wieder genau diesen Wortlaut, die beiden Kompass-Sätze passend dazu („wird dir … vorgeschlagen" / „wurde dir … zusammengestellt"). **Kurz recherchiert, ob „wir" in Meditations-Apps üblich ist:** Nichts Spezifisches gefunden, allgemeine UX-Writing-Quellen bestätigen aber die Richtung — personalisierte Zweitperson-Sprache passt besser zu einem ruhigen, nutzerzentrierten Ton als eine Marken-„Wir"-Stimme. | §2, §3.1, §3.3 |
| 10. Aug. 2026 | **Drei Nacharbeiten am Foto-Umbau: der Wasserfall wurde nachgebessert, das Abendfoto zweimal ersetzt, und während der Meditation läuft nicht mehr das KI-Bild im Hintergrund.** (1) Christines erster Wasserfall-Zuschnitt zeigte fast nur Wiese — *„Man sieht den Wasserfall immer noch zu wenig."* Drei neue Zuschnitte vorgelegt (voller Fall + Wiese / näher / höher); im selben Zug ergab die Schärfe-Nachmessung (siehe Eintrag „Bildqualitäts-Prüfung") aber, dass der Strand unter blauem Himmel (IMG_2885) klar das schärfere Foto ist — dabei geblieben, `start-tag.jpg` zeigt seither diesen Strand. (2) Beim Abend zweimal nachgebessert: Christines erstes Foto war durch eine Fensterscheibe fotografiert (Dunst, Schärfe 38) — entdunstet und nachgeschärft auf 85. Sie blieb trotzdem unzufrieden und schickte ein neues, eigenes Foto vom selben Strand wie die Titelseite, ohne Fensterglas; das ist jetzt `start-abend.jpg` (Kontrast leicht angehoben, nachgeschärft auf 52). (3) *„Beachte, dass das AI-Bild nicht gezeigt werden muss, wenn die Meditation läuft. Dort kannst du auch ein anderes nehmen, wenn's vom Thema passt wie Winter, Wald."* `loadQueueItem()` zeigte bislang `med.bg \|\| insel.jpg` — für die 17 Übungen ohne eigenes Bild also immer das gemalte Insel-Bild. Jetzt `med.bg \|\| LIB_KAT_FOTO[med.dir] \|\| insel.jpg`: Diese Übungen bekommen das Bild ihrer eigenen Kategorie (heller Raum, Herzraum, Waldlichtung, Bergsee) statt der immergleichen Insel; `insel.jpg` bleibt nur der letzte Notnagel. | §3.1, §3.3, §5a |
| 10. Aug. 2026 | **Der Kompass ist wieder das gemalte Bild — und wird gerade in eine fotorealistische Fassung desselben Motivs umgesetzt.** Nach dem Wechsel auf „Meer und Sand" (voriger Eintrag) blieb Christine unzufrieden: *„Kompass gefällt mir nicht … es war fast besser das AI-Bild."* Sie bat zunächst um Alternativen mit Palme — im ganzen Fotobestand (35 Bilder) war aber keine einzige Palme dabei; drei neue Fotos aus Florida (Palmen vor Pool/Gebäuden) lösten das nicht befriedigend. Entschieden: **zurück zum ursprünglichen gemalten Bild** (`git show bf69505:index.html`, dieselbe Data-URI wie vor dem gesamten Foto-Umbau) — es steht jetzt wieder unverändert in `.compass-photo`. Die 420×420-Vorlage wurde ihr als Datei geschickt, dazu ein Prompt-Text für ChatGPT (fotorealistische Fassung desselben Bildaufbaus, ohne Rahmen, an allen vier Rändern ruhig für die `.dial-label`-Wörter). **Erster ChatGPT-Versuch** übernahm ungewollt einen goldenen Rahmen und ein rundes weisses „Fenster" mitten im Bild (beides kam aus der quadratischen Vorlage, die selbst schon einen Rahmen hatte) — als Nachfrage-Prompt „ohne Rahmen, ohne Fenster, Landschaft durchgehend" formuliert. **Zweiter Versuch war brauchbar** und wurde eingebaut (560×560, Data-URI in `.compass-photo`): dieselbe Komposition wie das gemalte Original (Berge/Bucht links, Palmen/Felsen rechts, Sandstrand vorne), nur fotorealistisch. **Gegengeprüft statt geschätzt:** Links (Bergsilhouette) und rechts (Palmwedel) sind NICHT ruhig — genau dort, wo „Entspannt"/„Angespannt" stehen. Ein echter Screenshot mit dem heutigen `.dial-label` (5 px Schein, 94 % deckend, siehe Eintrag von vormittags) zeigt aber: alle vier Wörter bleiben lesbar, der verstärkte Schein trägt auch über Blattwerk und Bergkante. Ohne diese Nachmessung hätte das Bild aufgrund der Grundsatz-Regel „ruhige Fläche" abgelehnt werden müssen — sie gilt inhaltlich weiter, wird hier aber durch echtes Nachprüfen statt durch Annahme entschieden. | §3.2, §5a |
| 10. Aug. 2026 | **Zwei der vier Übungs-Kacheln nochmals ausgetauscht — der „entschieden, nicht mehr anfassen"-Vermerk galt nicht für jeden künftigen Einwand.** *„Gedanken beruhigen"* (Schneeberge → „weites Meer in der Dämmerung", siehe vorheriger Eintrag) fand Christine dann doch zu nichtssagend: *„Es gefällt mir nicht, sagt nichts aus."* Vier neue Vorschläge gezeigt (Nebel am Berg / Strand mit Bergsilhouette / Gletscherspalte / spiegelnder Bergsee); ihr eigener Einfall traf es besser — **zwei Tassen Tee im Sand, Meer und schneebedeckte Berge dahinter**. **Erster Zuschnitt zu weit gewählt:** Bei `cy 0.62` wirkten die Tassen in der kleinen Kachel nur wie ein heller Fleck — *„2 Tassen erkennt man nichts."* Kein Fall für ChatGPT (ihre Nachfrage), sondern ein reines Zuschnitt-Problem: Fünf engere Ausschnitte durchprobiert, direkt in der Bibliotheks-Kachelgrösse (4:3, echtes Handy-Raster) verglichen statt nur als Einzelbild — bei zu engem Zuschnitt (`t5`/`t6`) fiel der Bergsee-Horizont weg und das Bild verlor genau das, was es besonders machte. **Gewählt: `t3`** (`y 500–1420`) — Tassen klar erkennbar UND Horizont mit Bergen sichtbar. Bei *„Stress lösen"* galt dieselbe Lehre wie beim Muschelherz-Vergleich vorher: Die Nahaufnahme des Wasserfalls (Gischt) verschwamm in Kachel-Grösse mit dem hellen Himmel zu einem unklaren grünen Fleck — direkt im Handy-Raster gegengeprüft, nicht nur behauptet. **Gewählt: Gullfoss von oben** (zwei Stufen, tiefe Schlucht) statt der Nahaufnahme — kräftiger Kontrast Weiss/Grün, bleibt auch klein lesbar; Christine bestätigte direkt. **`kat-nord.jpg` und `kat-west.jpg` überschrieben** (640×480), Kommentare bei `KAT_KACHEL_FOTO` nachgezogen. **Nachtrag am selben Tag, `kat-nord.jpg` noch einmal geändert:** *„Sehr schlecht, ich will die ganzen Tassen sehen … und bis zum blauen Himmel."* `t3` hatte die Tassen tatsächlich unten abgeschnitten (der Teebeutel-Zettel rechts fehlte) und zeigte kaum Himmel. **Das Grundproblem: geometrisch nicht lösbar mit einem einzelnen Ausschnitt** — die Originalaufnahme ist 1138×1694 (hochkant), die Kachel 4:3 (querformatig); der Abstand vom Himmel bis zum Tassenboden ist rund 1500 px, bei voller Bildbreite passen aber nur 853 px Höhe hinein. Himmel UND vollständige Tassen gleichzeitig zeigen heisst zwangsläufig, den leeren Sand dazwischen wegzulassen. **Gelöst nicht durch einen neuen Zuschnitt, sondern durch eine Bildmontage:** Zwei Streifen desselben Fotos (0–560 px: Himmel, Berge, Meer; 1120–1500 px: beide Tassen komplett samt Teebeutel-Etikett) direkt übereinandergesetzt, der Sand dazwischen entfernt, danach auf 4:3 zugeschnitten. Der Schnitt zwischen den beiden Streifen fällt am naheliegendsten Ort hin (Wellenschaum → Sand, ähnlicher Hell-Dunkel-Übergang) und wird zusätzlich vom dunklen Verlauf am unteren Kachel-Rand mitkaschiert. Erstes Mal in der App, dass zwei Ausschnitte eines Fotos zu einem Bild zusammengesetzt werden statt nur zugeschnitten — als Kommentar bei `kat-nord.jpg` im Code vermerkt, damit das bei einer künftigen Änderung nicht überrascht. **Nachtrag, noch am selben Tag:** Christine fragte, ob der See nicht doch besser zu „Gedanken beruhigen" passe als die Tassen. Zu Recht — ruhiges, klares Wasser ist das klassischere Sinnbild für einen klaren Kopf, näher am Thema als eine Tee-Pause. Für den See-Vorschlag (Bergsee mit kleinem Boot, aus demselben Foto-Konvolut wie der Kompass-Vorlage) reichte ein einfacher Zuschnitt, kein Zusammensetzen nötig. **`kat-nord.jpg` zeigt jetzt diesen Bergsee** — vierter Wechsel an dieser einen Stelle innerhalb weniger Stunden (Schneeberge → weites Meer → Tassen-Montage → Bergsee), jedes Mal aus einem echten, nachvollziehbaren Grund. | §3.4, §5a |
| 15. Aug. 2026 | **Rundum-Schärfe-Check über alle neun Fotos in der App, auf Christines Frage „Welches Bild hat schlechte Qualität?"** Gemessen mit demselben Perzentil-Verfahren wie zuvor (§ Eintrag „Bildqualitäts-Prüfung"). Ergebnis eindeutig: **Die Titelseite lag mit Wert 37 deutlich unter allem anderen** (nächstschwächste Stelle 53, die meisten 100+). Ursache dieselbe wie schon einmal notiert: Querformat-Foto auf Hochformat-Bildschirm, nur ein schmaler Streifen nutzbar — hier 3,1-fache Vergrösserung nötig. Zum Vergleich lieferte ein am selben Tag neu eingetroffenes Foto (Bergsee für die „Gedanken beruhigen"-Kachel) in **voller Originalgrösse** (3024×4032) einen Schärfewert von 200 — mehr als das Fünffache. **Folge: Christine schickte das Titelbild-Foto (die Meditation am Strand) nochmals, diesmal als IMG_1670 mit 2048×1365 statt der ursprünglichen 1170×752** — kein Screenshot-Export mehr, sondern näher am Original. Zuschnitt und Gamma-Kurve („leicht", 0,88) unverändert aus dem bisherigen Entscheid übernommen, nur mit der schärferen Quelle neu gerechnet: Vergrösserung sinkt von 3,1-fach auf 1,7-fach, dazu ein kleiner Nachschärfer (Radius 1,3, 90 %) für den Rest. **Ergebnis: Schärfewert 32 → 56**, mehr als eine Verdoppelung, sichtbar im direkten Vergleich. Zwei ähnliche Aufnahmen (IMG_1671, IMG_1672) kamen mit derselben Nachricht, unbenutzt — falls die Titelseite je noch einmal wechselt, liegen sie schon bereit. **Grundsatz, jetzt zum dritten Mal bestätigt:** Bei Fotos entscheidet nicht nur der Bildausschnitt über die Qualität, sondern vor allem, in welcher Auflösung das Ausgangsfoto ankommt — das lässt sich nachträglich nur bedingt reparieren (Nachschärfen kaschiert, ersetzt aber keine echten Bilddaten). | §3.4, §5a |
| 15. Aug. 2026 | **Rückzug aus dem grossen Foto-Umbau, an zwei Stellen — nur die Titelseite und der Kompass bleiben bei echten/fotorealistischen Bildern.** Drei Punkte in einer Nachricht. **(1) Titelseite zu nah:** *„Aber ich will mich weit weg sehen. Das ist zu nah."* `titel.jpg` steckte gerade auf IMG_1670 (der näheren der drei neu geschickten Aufnahmen, siehe voriger Eintrag) — Christine hatte eigentlich die weite Einstellung gewählt (8./10. Aug., „ich von sehr weit weg"). Unter den drei mitgeschickten Fotos zeigte **IMG_1671** exakt diese weite Distanz; damit neu gerechnet (derselbe Zuschnitt/Gamma/Nachschärfer wie zuvor), Schärfewert 54. **(2) Die vier Foto-Kacheln ganz zurückgebaut:** *„Die Kachelbilder gefallen mir nicht. Bitte zurück gehen wie es vorher war, unechte Bilder."* Nach mehreren Räumungsrunden bei „Gedanken beruhigen" und „Stress lösen" (siehe die letzten Einträge) war das Ergebnis insgesamt nicht überzeugend. `KAT_KACHEL_FOTO` und der zugehörige `lib-cat-foto`-Aufruf sind **dormant gesetzt** (Kommentar statt Code, „man weiss ja nie") — die Bibliotheks-Kacheln greifen wieder auf `LIB_KAT_FOTO` zurück, dieselben gemalten Bilder wie die Liste darunter und wie vor dem 10. Aug. Damit ist die App bei den Kacheln wieder einheitlich gemalt; nur Titelseite und Kompass bleiben bei den echten/fotorealistischen Bildern. **(3) Kompass, Farbe passt nicht zum Layout:** Christine wollte einen neuen ChatGPT-Prompt, diesmal ausdrücklich mit den echten Design-Farben der App (Gold/Creme statt der natürlichen Blau-/Grüntöne der bisherigen Fotos) — Prompt geliefert, Umsetzung steht noch aus. | §3, §3.4, §5a | **Der „entschieden"-Vermerk wurde nicht aufgehoben, sondern präzisiert:** Er verhindert grundloses Wiederaufrollen, nicht das Reagieren auf einen echten neuen Einwand — genau das war hier beide Male der Fall (erst Kälte, dann Lesbarkeit in echter Grösse), nicht ein Zurückrudern ohne Grund. | §3.4, §5a |
| 7. Aug. 2026 | **Erste Lieferung, die keinerlei Nachbearbeitung brauchte — 28 von 39 Symbolen sind damit fertig.** Fünf Bilder (Nr. 35 Taube, 36 Lotusblüte, 37 Mondsichel, 38 Schweizerkreuz, 39 sitzende Person), alle verwendbar, **Strichstärke 5,8–7,3 %** — erstmals genau die verlangten 6 %, also **kein Verstärken nötig**; nur entschimmert, zugeschnitten, zentriert. **Ein Fehlalarm dokumentiert:** Vier davon zeigen sich in der Vorschau auf rosa-orangem Grund statt auf dem Karomuster. Das sah nach einem fehlenden Alpha-Kanal aus, ist aber keiner — die Bilder sind zu 93–97 % durchsichtig, unter der Transparenz liegt lediglich eine bunte Farbe, die manche Vorschauen mitzeigen. Wichtig für künftige Prüfungen: **erst den Alpha-Kanal messen, nicht dem Augenschein der Vorschau trauen.** **Nr. 38 mit Einschränkung angenommen:** Der Kreis um das Schweizerkreuz fehlt. An seiner Stelle (kleines Abzeichen neben „Schweizerdeutsch", §3.3) ist das eher von Vorteil — weniger Linien, klarer bei kleiner Anzeige; die Nachbesserungs-Formulierung steht in `Icon-Prompts.md`. **Damit fehlt je ein einziges Bild für zwei ganze Gruppen:** Nr. 27 (Sonne) schliesst die verstreuten Symbole ab — darunter die Begrüssung ganz oben auf der Startseite, wo Sonne, Palme und Mond stehen — und Nr. 16 (Insel) die Inselreise. | §5a |
| 7. Aug. 2026 | **Die Zugangs-Karte hat als zweite Gruppe eigene Bilder — der letzte im App-Audit gefundene Stilbruch ist damit weg.** Mit Nr. 20 (Vorhängeschloss) war die Gruppe komplett; eingebaut wurden alle vier auf einmal: 🤍 → offenes Tor, ✅ → Haken im Kreis, ⏳ → Sanduhr, 🔒 → Vorhängeschloss (`renderStatusCard()`, `zugangIcon()`, `.status-bild` 26 von 42 px). Damit ist die im Konsistenz-Check vom Aug. 2026 als „echter, noch offener Stilbruch" notierte Stelle erledigt (§11 Nr. 13). Alle vier Zustände durchgeprüft — auch die drei, die man nur mit `ABO_LIVE = true` sieht (dafür eine Kopie der Datei auf einem zweiten Server, damit die App selbst unangetastet bleibt). **Beim Zusammenstellen angeglichen:** Der Torbogen kam schon mit kräftigen Strichen (38 % Farbfläche) und wirkte neben den drei nachverstärkten schwerer — er wurde als einziger **ausgedünnt** statt verstärkt (`MinFilter(9)`, jetzt 32 %). Aus derselben Lieferung ebenfalls verwendbar und abgelegt: Nr. 14 Kompassrose, 21 Zahlkarte, 24 Info-Kreis. **Zwei Einschränkungen dokumentiert statt neu bestellt:** Die Kompassrose ist mit acht Zacken, Doppelring und Mittelkreis fein gearbeitet und verdichtet sich bei 28 px; die Zahlkarte ist hochkant statt quer und liest sich eher wie ein Block. Beide brauchbar — die Nachbesserungs-Formulierung steht in `Icon-Prompts.md`, falls es später auffällt. | §3.6, §5a |
| 7. Aug. 2026 | **Vierte Lieferung: erstmals alles brauchbar — 19 von 39 Symbolen sind damit fertig.** Nach den geschärften Vorgaben kamen fünf Bilder (Nr. 15 Palme, 18 Haken im Kreis, 19 Sanduhr, 22 Schlüssel, 23 Umriss einer Person), **alle fünf verwendbar** und als echte Umrisszeichnungen (9–19 % Farbfläche) im richtigen Ton. Zwei Kleinigkeiten beim Aufbereiten gelöst: **Die Striche waren mit 1,7–5,2 % zu fein** — maschinell verstärkt (`ImageFilter.MaxFilter(11)`), damit sie das Gewicht der bestehenden Familie treffen. Und **das Transparenz-Schachbrett war aufgemalt**: Die Bilder waren zu 0 % durchsichtig, das graue Karomuster steckte als echte Bildpunkte darin. Weil das Muster grau (R=G=B) und die Linien goldbraun sind, liess sich die Maske über die **Farbigkeit** (`max(RGB) − min(RGB)`) sauber neu berechnen. Beides ohne Rückfrage lösbar, kein Bild musste neu gemacht werden; der Grundtext verbietet das aufgemalte Schachbrett jetzt trotzdem. **Noch nichts eingebaut** — der Zugangs-Karte fehlt nur noch Nr. 20, der Inselreise die 14 und 16. Aufbereitete Bilder liegen unter `icons-original/bereit/`. | §5a |
| 7. Aug. 2026 | **Zweite Grundregel aus derselben Prüfung: „gezeichnet, nicht geleuchtet" — und die Nummer immer mitschreiben.** Aus der dritten Lieferung (Zugangs-Karte): Der Haken im Kreis kam als **Leuchtreklame** — die Linie selbst hell leuchtend, dunkel nur ein Haarstrich am Rand. Nach Abzug des Scheins (der weg muss, sonst steht in der App ein gelber Fleck) blieben **0,4 % Farbe** übrig, praktisch ein leeres Bild. Die Sanduhr kam **zweifarbig** (brauner Rahmen, gelber Sand) und zu 73 % ausgefüllt. Das bestehende Verbot „kein Leuchten" hat nicht gereicht; im Grundtext steht jetzt ein **Vergleich** statt eines Verbots: *wie mit einem braunen Filzstift auf weisses Papier gezeichnet*. **Zweiter wiederkehrender Fehler:** Über zwei Lieferungen kamen **sieben Bilder, die in der App nirgends vorkommen** (Zahnrad, Glühbirne, Aktentasche, Uhr, Glühbirne mit Haken) — auf „weiter" allein verliert ChatGPT die Liste aus den Augen. Empfehlung jetzt: jedes Mal die Nummer und den Motivtext mitschicken. **Als Alternative angeboten:** Diese Symbole sind einfache Linienzeichnungen und lassen sich direkt als SVG zeichnen — Haken, Sanduhr und Vorhängeschloss liegen als Muster in `icons-original/eigene/`, in derselben Farbe (`#8A6A2F`) und Strichstärke (5,2 auf 100) wie die bestehende Familie. Christine entscheidet, ob sie den Rest weiter über ChatGPT macht oder zeichnen lässt. | §5a |
| 7. Aug. 2026 | **Neue Grundregel für alle Symbole: nur Umrisse, keine ausgefüllten Flächen.** Aus der zweiten Bilder-Lieferung (Inselreise): Palme und Insel kamen als **ausgefüllte Silhouetten** (44 % bzw. 62 % Farbfläche) statt als Umrisszeichnung wie Boot und Anker (25 %). Gross betrachtet sehen sie gut aus — in der App stehen die fünf Stationen aber als Reihe nebeneinander bei 28 px, und dort wird eine Silhouette zum dunklen Fleck neben feinen Linien. **Nachträglich nicht zuverlässig reparierbar:** Ein maschinell nachgezeichneter Umriss ging bei der Palme knapp, bei der Insel entstand eine unkenntliche Blase. Die Regel steht jetzt zuoberst im Gesamt-Auftrag (`Icon-Prompts.md`) und gilt für alle noch offenen Gruppen — betroffen sind vor allem Motive aus der Natur (Palme, Insel, Blume, Muschel, Taube). **Gruppe 2 wird erst eingebaut, wenn alle fünf im selben Stil vorliegen** — eine Reihe aus drei Strichzeichnungen und zwei Silhouetten wäre genau der Stilbruch, den wir seit Tagen abbauen. | §5a |
| 7. Aug. 2026 | **Die elf Stimmungen sind jetzt gezeichnete Bilder statt Emoji.** Christine hat die Bilder selbst über ChatGPT erstellen lassen (Auftrag in `Icon-Prompts.md`) und einzeln geschickt. Ersetzt: 😊 ausgeglichen, 🤔 grüblerisch, 😰 angespannt, 💭 gedankenvoll, 🧠 gelassen, 😔 aufgewühlt, 😟 unruhig, 💚 geborgen, 😌 entspannt sowie 💛 (Zeiger noch unberührt) und 🌅 (Abschluss-Seite vor der ersten Eingabe). Sie erscheinen an allen bisherigen Emoji-Stellen: im runden Feld neben dem Kompass, auf der Abschluss-Seite, in den Vorher/Nachher-Zeilen der Insel-Woche und im Rückblick. **Warum:** Emoji werden vom Gerät gezeichnet, nicht von der App — auf dem iPhone bunt und glänzend, auf anderen Geräten anders; sie waren der letzte bunte Fremdkörper im ruhigen Goldbraun. **Zwei Bilder nachbearbeitet:** Das Wellen-Bild ("aufgewühlt") kam in einem deutlich röteren Braun (#804000) als die anderen zehn und wurde auf den Familienton umgefärbt; weil sein Motiv flach und breit ist, füllt es 80 % der Bildbreite statt der 62 % der runden Motive — sonst wirkte es in der Zeile schwächer als der Rest. **Dabei aufgefallen und behoben:** In derselben Liste stand "sehr geborgen" neben "Ausgeglichen" — `moodHtml()` schrieb nur die abgestuften Wörter klein. Jetzt durchgehend klein. **Alte Emoji bleiben im Code stehen** ("man weiss ja nie"): jeder Zustand trägt `emoji` **und** `icon`; zurück geht es über eine Zeile in `moodIconHtml()`. | §3.2, §5a |
| 6. Aug. 2026 | **Eine Achse, ein Wortpaar: überall "nachdenklich / emotional".** Christine: *"Überprüfe die ganze App, dass nicht von Kopf/Gefühl geredet wird, sondern wie du dich fühlst."* Die Prüfung ergab **drei Wortpaare für dieselbe Achse**: auf der Scheibe **NACHDENKLICH/EMOTIONAL**, im Erklärkasten **Kopf/Gefühl**, in der Auswertung **Denken/Fühlen**. **Regel jetzt: Die Erklärung benutzt die Wörter, die auf der Scheibe stehen.** Geändert: Erklärkasten, "Über die App", Vorlese-Beschriftung und der Aufzählungspunkt "Kopf und Gefühl im Gleichgewicht" → "innerlich im Gleichgewicht". **Bewusst NICHT geändert:** beschreibende Sätze wie "klarer Kopf", "viele kreisende Gedanken", "starke Gefühle nah an der Oberfläche" — das ist natürliche Sprache über das Befinden, keine Achsen-Bezeichnung. Ebenso die Kategorie "Gefühle verstehen". "Denken/Fühlen" steht nur noch im stillgelegten Begleiter (nie sichtbar). | §3.2 |
| 6. Aug. 2026 | **"Stimmung" dort zurückgenommen, wo sie steif klang.** Christine: *"Stimmung macht nicht immer Sinn, manchmal besser man fragt wie es dir geht."* Zwei von zehn Stellen geändert: "Bewege den Zeiger, um deine Stimmung anzugeben" → **"…um zu zeigen, wie es dir geht"**; der Knopf "Stimmung nochmals ändern" → **"Nochmals ändern"** (man ändert nicht seine Stimmung, sondern seine Eingabe). Die übrigen acht bleiben — dort ist "Stimmung" ein Hauptwort und passt ("passend zu deiner Stimmung", "Meine Stimmung"). | §2 |
| 6. Aug. 2026 | **Zeiger deckte die Beschriftung ab.** Auf Christines Bild verdeckte der Nadelknopf das "L" von EMOTIONAL. Die vier Wörter werden jetzt **zuletzt** gezeichnet, liegen also über dem Zeiger. Der bleibt trotzdem gut sichtbar (lang und golden), die Wörter sind kurz und hell hinterlegt. Beim ersten Reparaturversuch zerschnitt ein Suchmuster den Block — drei Wörter blieben vor, eines hinter der Nadel; danach sauber neu einsortiert. | §3.2 |
| 6. Aug. 2026 | **"Zustand" heisst in der ganzen App jetzt "Stimmung".** Der Satz auf der Startseite sollte den Nutzen nennen (*"Muss stehen: und eine passende Meditation auf dein Gemüt wird dir vorgeschlagen"*). "Gemüt" verwarf Christine wieder — *"da Gemüt nicht in Meditations-Apps benutzt wird"*, zu Recht. Aus drei Vorschlägen wählte sie **"Stimmung"** statt des app-eigenen "Zustand". Weil damit zwei Wörter für dieselbe Sache entstanden wären (genau die Unstimmigkeit, die ihr schon bei "Mein/Dein" und "Kopf/Nachdenklich" auffiel), ist **"Zustand" überall ersetzt** — 10 sichtbare Stellen inklusive der Vorlese-Beschriftung für Blinde. **Grammatik mitgezogen:** "Zustand" ist männlich, "Stimmung" weiblich ("Mein Zustand" → "Meine Stimmung", "zu deinem Zustand" → "zu deiner Stimmung"). | §2, §3.1 |
| 6. Aug. 2026 | **Zustands-Karte: kürzerer Text, Knopf über die ganze Breite.** Christine: *"Falsch, Kompass bezieht sich nicht auf Kopf etc."* Der Satz "Angespannt oder entspannt, im Kopf oder im Gefühl" nannte andere Wörter, als man gleich darauf auf der Scheibe sieht (**NACHDENKLICH / EMOTIONAL**) — die Achse *meint* zwar Kopf und Gefühl, aber der Satz versprach eine Beschriftung, die es so nicht gibt. Christine wollte ausserdem den **Nutzen** dastehen haben: *"Muss stehen: und eine passende Meditation auf dein Gemüt wird dir vorgeschlagen."* Jetzt: **"Zeig es am Kompass – wir schlagen dir eine Meditation vor, die zu deiner Stimmung passt."** (Die Überschrift darüber fragt bereits "Wie geht es dir gerade?" — der Satz wiederholt das nicht.) Der Knopf trägt Christines eigene Formulierung: **"Finde deine Meditation →"**. **Karte umgebaut:** Kopfzeile (Überschrift + kleiner Kompass, jetzt 68 statt 86px), darunter der Satz über die **ganze Kartenbreite** — neben dem Kompass zerfiel er in vier kurze Zeilen, während rechts darunter Platz frei blieb — und zuunterst der Knopf über die ganze Breite. **Dabei einen Layout-Fehler behoben:** In der schmalen Textspalte neben dem kleinen Kompass brach der Knopf auf Geräten mit Anzeige-Zoom (320px) auf zwei Zeilen um — nachgemessen und bestätigt. Er steht jetzt als eigene Zeile über die ganze Kartenbreite und bleibt auf 320/375/390px einzeilig. | §3.1 |
| 6. Aug. 2026 | **Die Startseite bietet jetzt immer etwas Startbares — auf ehrlicher Grundlage.** Christines Frage nach der Professionalität ergab: Im häufigsten Zustand (heute noch nichts gelaufen) gab es **keinen einzigen Abspielknopf**, 30 % der Fläche waren leer — die Startseite war ein Wegweiser statt einer Startrampe. Christine fragte dann nach: *"Anhand von was wird die Meditation vorgeschlagen? Kompass ist ja nicht ausgefüllt."* **Sie hat damit einen echten Fehler im ersten Entwurf gefunden:** Der unberührte Zeiger steht auf 0/0, `dirFromCompass()` liefert daraus immer "sued" — jede Nutzerin hätte denselben Vorschlag bekommen, begründet mit einem nie angegebenen Zustand. Grundlage sind darum nur **Uhrzeit** und **was lange nicht dran war**, und die Überschrift nennt genau das ("Für den Abend"), nie "für dich". | §3.1 |
| 6. Aug. 2026 | **"Mein heutiger Fokus" entfällt — zwei eigene Abschnitte statt einer vagen Sammelüberschrift.** Christine: *"Dein heutiger Fokus ist verwirrend."* Ursache war nicht das Wort, sondern dass darunter **zwei verschiedene Dinge** lagen: heute Gehörtes und eine unterbrochene Übung (die auch von einem früheren Tag stammen kann). Aus drei Vorschlägen wählte Christine die Trennung: **"Angefangen"** und **"Heute gehört"**. **Kein Übertitel darüber** — ein Dach müsste wieder vage sein, also genau das Wort, das wegsollte; die beiden stehen auf derselben Ebene wie "Mein Zustand". Beide kommen zudem ohne "mein/dein" aus. | §3.1 |
| 5./6. Aug. 2026 | **Der Kompass bekommt das Aussehen aus Christines Entwurf — und wird dabei deutlich grösser.** Christine schickte einen Gestaltungsentwurf und stellte klar: *"der Zeiger muss ja gleich sein, den hast Du bestellt und ChatGPT hat nur das Bild gemacht, die Darstellung."* Übernommen: ruhiger heller Ring statt Goldband, feines Fadenkreuz, dunkle Beschriftung, Goldpunkte an den Polen. Behalten: der ganze Zeiger. **Zwischenschritt mit Lehre:** Die Wörter zuerst wie im Entwurf **aussen** gestellt — dort kosten sie je Seite ein Fünftel der Breite, die Scheibe fiel auf 170px. Christine: *"Er ist viel zu klein, er muss viel grösser sein."* Die Wörter sind darum wieder **im** Zifferblatt, jetzt aber im dunklen Ton des Entwurfs mit hellem Schein. Ergebnis: **308px statt vorher 269px** — grösser als je zuvor, weil innen liegende Beschriftung keine Breite kostet. | §3.2 |
| 5. Aug. 2026 | **Eine angefangene Meditation lässt sich wegräumen.** Christine: "Kann man bei deinem heutigen Fokus auch Meditationen weglöschen?" Bei der angefangenen war das eine echte Lücke — sie blieb für immer stehen. Jetzt ✕ neben dem ▶, mit Rückfrage; die gehörten Minuten bleiben im Verlauf ("Wegräumen", nicht "Löschen"). **Erledigte** Meditationen bleiben bewusst unlöschbar (Aufzeichnung; dafür gibt es "Verlauf löschen"). Dabei mitbehoben: "Verlauf löschen" räumte den gemerkten Stand bisher nicht mit weg. | §3.4a |
| 5. Aug. 2026 | **Eine abgebrochene Meditation geht nicht mehr verloren — und lässt sich an derselben Stelle fortsetzen.** Christines Frage ("was passiert, wenn jemand eine Meditation nicht fertigmacht?") deckte auf, dass das ✕ die ganze Sitzung wegwarf, auch eine zu 100 % gehörte. Jetzt: Rückfrage beim ✕, die Minuten werden gespeichert, und die angefangene Übung erscheint auf der Startseite mit ▶ zum Weitermachen. Christine ausdrücklich gegen meine Empfehlung (ich hatte zu einem Neustart geraten): *"dass man dann weitermachen kann und nicht wieder am Anfang startet, so wie das die anderen auch machen."* | §3.4a |
| 5. Aug. 2026 | **Der Favoriten-Stern ist überall derselbe.** Beim Auslesen aller Emoji aufgefallen: Der Filter-Knopf „Favoriten" in der Bibliothek zeigte ein buntes ⭐ (Emoji), der Stern an jeder einzelnen Übung dagegen ★/☆ (einfarbiges Schriftzeichen) — derselbe Gedanke in zwei Bildsprachen. Christine: "Gerne angleichen." Jetzt beides ★ in Goldbraun (`.chip-stern`, gleiche Farbe wie `.fav-btn.on`); auf goldenem Grund (Chip ausgewählt) erbt der Stern die dunkle Schriftfarbe, sonst wäre Gold auf Gold unsichtbar. Damit ist im ganzen Favoriten-Bereich **kein Emoji mehr im Spiel**. | §3.3a |
| 5. Aug. 2026 | **Die App erneuert sich jetzt von selbst.** Christine: "Noch nicht umgesetzt" — sie sah den alten Stand, obwohl die neue Fassung seit 25 Minuten online war. Ursache war kein Fehler an der Änderung selbst, sondern die Update-Prüfung: Sie stand *in* `index.html` und verglich damit die alte Nummer gegen sich selbst. Jetzt fragt die App bei jedem Zurückkommen aktiv beim Server nach (`reg.update()` auf der 2,5 KB kleinen `sw.js`) und lädt sich bei einer neuen Fassung selbst neu — ausser während einer laufenden Meditation. | §1 |
| 5. Aug. 2026 | **Die Symbole in den Meditations-Zeilen werden durch Fotos ersetzt.** Christine, mit Bild: "die Bilder jetzt als Kategorien sehen super aus, aber dann die unteren Meditationen mit den Icons passt layouttechnisch nicht zusammen." Jede Zeile zeigt jetzt das Foto, das während dieser Meditation läuft (ersatzweise das Foto ihrer Kategorie) — als quadratische Miniatur `thumb-*.jpg`, rund 5 KB statt 100 KB. Gilt in allen Listen der App, nicht nur in der Bibliothek. Die Strichzeichnungen bleiben auf den Fotokacheln und in der Filterzeile. | §5a, §3.3a |
| 5. Aug. 2026 | **Begrüssungs-Fehler behoben: nach Mitternacht stand "Guten Morgen" statt "Gute Nacht".** Christine: "Ich hab mich gestern eingeloggt nach Mitternacht und er stand guten Morgen statt gute Nacht." `begruessung()` prüfte bisher nur vier Stufen ab 11 Uhr aufwärts, die Stunden 0–4 fielen mit in "vor 11 Uhr". Neue erste Stufe **vor 5 Uhr → "Gute Nacht" 🌙**. Dabei auch Text und Symbol (vorher an zwei Stellen unabhängig berechnet, mit dem gleichen Fehler beim Symbol) zu einer einzigen Quelle zusammengelegt. | §3.1 |
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
- **Update-Absicherung fürs Handy:** Seiten, die vom Home-Bildschirm aus geöffnet werden, hält das iPhone gerne hartnäckig im Speicher fest — selbst über ein Schliessen der App hinaus, weil GitHub Pages keine eigenen Cache-Vorgaben pro Datei erlaubt. Direkt nach `<body>` prüft ein kleines Skript eine Versionsnummer (`AKTUELLE_VERSION`) gegen den im Gerät gemerkten Stand und lädt bei Abweichung einmal ganz frisch nach. **Bei jeder für Christine sichtbaren Änderung diese Nummer hochzählen** (z. B. aufs aktuelle Datum).
  - **Warum das allein nicht reichte (Fehler gefunden am 5. Aug. 2026):** Diese Prüfung steht *innerhalb* von `index.html` und kann sich darum **nie selbst reparieren**. Liegt eine alte Fassung der Datei im Speicher, vergleicht die **alte** Nummer gegen sich selbst, findet "passt schon" und lädt nichts nach — die Prüfung ist zirkulär. Christine meldete genau das ("noch nicht umgesetzt"): Die neue Fassung war nachweislich seit 25 Minuten online (Pages-Deployment `success`, Commit im Repo verifiziert), ihr iPhone zeigte trotzdem den alten Stand. Verschärfend kommt das Verhalten von iOS dazu: Eine vom Home-Bildschirm gestartete App wird beim Wegschalten nur **schlafen gelegt**, nicht beendet — beim Zurückkommen findet gar keine Anfrage statt, die etwas Neues holen könnte.
  - **Behoben durch aktives Nachfragen beim Server:** Nach der Registrierung des Service Workers hängt jetzt ein `visibilitychange`-Zuhörer daran, der bei **jedem Zurückkommen in die App** `reg.update()` aufruft. Das holt `sw.js` laut Browser-Standard **immer frisch aus dem Netz**, nie aus dem Speicher. Ist dort eine neue Fassung, feuert `updatefound`; sobald der neue Service Worker den Zustand `installed` erreicht **und** schon ein `controller` existierte (also kein Erstbesuch), lädt die Seite sich einmal selbst neu. Geprüft wird `sw.js`, weil sie nur **2,5 KB** gross ist (`index.html`: 420 KB) und ihr `CACHE_NAME` ohnehin bei jeder Änderung mitgezählt wird — es bleibt also bei einer Stelle, die gepflegt werden muss.
  - **Zwei Schutzvorkehrungen, beide geprüft:** (1) **Kein Neuladen während einer laufenden Meditation** (`document.body.classList.contains("in-session")`) — das wäre mitten in der Übung ein Abbruch; die neue Fassung kommt beim nächsten Zurückkommen. (2) **Keine Endlosschleife:** Nach dem Neuladen ist der neue Service Worker der `controller`, `reg.update()` findet nichts Neues mehr. Testskript `selbstupdate.js` prüft alle drei Fälle (während Meditation → kein Neuladen; neue Fassung → Neuladen; keine Änderung → kein Neuladen).
  - Bei ganz hartnäckigen Fällen bleibt der Notausgang: Symbol vom Home-Bildschirm löschen und neu anlegen.
- **Offline-Fähigkeit (Aug. 2026 ergänzt):** `sw.js` (Service Worker, registriert direkt nach `<body>`) speichert Startseite, Fotos und Logo beim ersten Besuch zwischen (`manifest.json` dazu, macht die App ausserdem "installierbar"). Strategie bewusst *network-first*: online wird immer zuerst das echte Netz gefragt, der Speicher greift nur bei Fehler/offline — damit der Service Worker nicht selbst zu einer neuen Quelle für veraltete Inhalte wird (siehe Update-Absicherung oben). `CACHE_NAME` in `sw.js` bei grösseren Änderungen mit hochzählen, gleiches Prinzip wie `AKTUELLE_VERSION`. Getestet: nach einem ersten Online-Besuch startet die Titelseite samt Foto auch komplett ohne Verbindung.

**Empfehlung fürs neue Repo:** Struktur in echte Komponenten/Routen auflösen (z. B. `/`, `/kompass`, `/meditation`, `/session`, `/abschluss`), State in einen zentralen Store (Context/Zustand/Redux) heben, Fotos als echte Asset-Dateien statt base64.

---

## 2. Design-System

Seit dem Layout-Umbau folgt die ganze App **einer** Vorlage: warmes Creme als Fläche, **Gold als einzige Akzentfarbe**, Serifen-Überschriften, weisse Karten mit weichen Ecken (18px) und viel Ruhe dazwischen. Die früheren Salbei-/Sonnen-Töne und die halbtransparenten "Frosted Cards" über dem Foto sind entfallen — Text steht jetzt fast überall auf hellem Grund und ist dadurch deutlich besser lesbar.

### Anrede: durchgehend Ich-Form (5. Aug. 2026, Christines Entscheid)

**Beschriftungen benennen die Dinge der Person aus IHRER Sicht ("Mein Fortschritt"), nicht aus der Sicht der App ("Dein Fortschritt").**

Der Weg dahin, weil er sich sonst wiederholt: Christine sah den Titel **"Mein Weg"** direkt über der Karte **"Dein Inselbewohner"** und fragte, ob man sich nicht immer gleich angesprochen fühlen sollte. Die Auszählung ergab damals **16 Beschriftungen in der Du-Form und 2 in der Ich-Form**; ich habe daraufhin die beiden Ausreisser auf die Du-Form gebracht — also in die Mehrheitsrichtung. **Christine hat das umgedreht:** *"ich find es besser, wenn man die App anschaut und es geht um mein Weg, alles auf mein, nicht auf dein, mein."* Die Mehrheit war das schwächere Argument; ihr geht es darum, dass die App **ihr** gehört.

**Jetzt in der Ich-Form (16 Beschriftungen):** Mein Weg, Meine Stimmung, Mein Fortschritt, Mein Wochenziel, Meine letzten Meditationen, Mein Inselbewohner, Mein Zugang, Mein Bild, Meine Rechte, Mein Charakter, Meine Ankunft, Mein Begleiter, Meine Inselwoche, Meine Inselreise, Mein Rückblick, Meine Insel gestalten. ("Mein heutiger Fokus" ist am 6. Aug. 2026 entfallen, siehe §3.1 — die beiden Nachfolger "Angefangen"/"Heute gehört" brauchen keine Anrede.) Dazu die Nebentexte, die dazugehören ("Meine Insel-Woche und Inselreise ansehen", "Meine Favoriten", "Mein Rhythmus", "Meine Insel: …").

**Die Grenze — und warum es sie braucht.** Umgestellt werden **nur Beschriftungen**, also Namen von Bereichen, Seiten, Reitern und Karten. **Sätze, die mit der Person sprechen, bleiben in der Du-Form**, sonst würde die App über sich selbst reden statt mit ihr:

| bleibt Du-Form | Grund |
|---|---|
| "Deine Insel wartet auf dich." | Begrüssung — die App spricht |
| "Wie geht es dir gerade?" | Frage an die Person |
| "Was du schon geschafft hast" | Untertitel, beschreibt |
| "Dein Test läuft." / "Deine Probezeit läuft." | Statusmeldung an die Person |
| "Dein Kompass zeigt: … Darum empfehlen wir dir …" | Satz, in dem die App von sich spricht ("wir") |

Eine Karte kann also **"Mein Zustand"** heissen und darin **"Wie geht es dir gerade?"** fragen — das ist kein Widerspruch, sondern die Trennung von *Etikett* und *Ansprache*.

**Regel für Neues:** Beschriftung → Ich-Form. Satz → Du-Form. Wo die App über sich selbst spricht, sagt sie "wir" ("Darum empfehlen wir dir …"), nie "ich".

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
- Seitenkopf mit tageszeitabhängiger Begrüssung (`begruessung()`, liefert Text **und** Symbol zusammen) und rundem Knopf zu "Mein Weg" (`#homeProfilBtn`, seit 4. Aug. 2026 Ziel statt der entfallenen Profil-Seite). Fünf Stufen nach Stunde: **vor 5 Uhr** "Gute Nacht" 🌙, **vor 11** "Guten Morgen" ☀️, **vor 17** "Schön, dass du da bist" 🌴, **vor 22** "Guten Abend" 🌴, **danach** "Schön, dass du noch da bist" 🌙. **Fehler behoben (5. Aug. 2026, Christine: "Ich hab mich gestern eingeloggt nach Mitternacht und er stand Guten Morgen statt Gute Nacht"):** Vorher gab es nur vier Stufen, und die erste ("vor 11 Uhr") fing auch die Stunden nach Mitternacht (0–4 Uhr) mit ein — wer z. B. um 0:30 Uhr in die App kam, sah "Guten Morgen". Die neue erste Stufe (vor 5 Uhr) fängt genau diesen Fall ab. **Gleichzeitig zusammengelegt:** Text und Symbol wurden vorher an zwei Stellen unabhängig aus der Stunde berechnet (`begruessung()` für den Text, eine zweite Prüfung in `renderHome()` fürs Symbol) — mit unterschiedlichen Grenzen, was derselbe Fehler auch für das Symbol war. Jetzt liefert `begruessung()` beides aus einer einzigen Stundenprüfung, damit Text und Symbol nicht mehr auseinanderlaufen können.
- **Grosses Insel-Foto (randlos), das den Rest der Seite bis zur Tab-Bar auffüllt** — ohne Scrollen soll alles auf den Bildschirm passen. Dafür ist `.home-page` (nur auf diesem Schritt) eine Flex-Spalte mit `min-height:calc(100vh - Tabbar - Safe-Area)`. **Geändert im Aug. 2026 (Christine gemeldet):** Das Foto war darin der einzige dehnbare Baustein (`flex:1 1 0`, `min-height:152px`, `max-height:400px`) und damit der Puffer der Seite — sobald die Liste unter "Dein heutiger Fokus" länger wurde (mehrere Meditationen an einem Tag), wurde das Foto zusammengedrückt, bis hinunter auf 152px. Jetzt `flex:0 0 auto` mit `aspect-ratio:720/678`, also exakt dem Seitenverhältnis der Bilddatei: **das Foto ist auf jedem Gerät und in jedem Zustand gleich gross** (z. B. 390×367 auf einem iPhone 14, 375×353 auf einem SE), immer vollständig sichtbar — bei genau diesem Verhältnis hat `contain` weder etwas abzuschneiden noch Ränder zu lassen. Wächst die Liste, wächst stattdessen die Seite und man scrollt. Alle anderen Abstände auf dieser Seite (Kopf-Abstand, Abschnittsüberschriften, Karten-Innenabstände) sind eigens für die Startseite etwas knapper als anderswo (`.home-page`-Zusatzregeln), damit auch auf einem iPhone SE nichts über die Tab-Bar hinausragt.
  - **Eigenes, zugeschnittenes Foto für die Startseite** (`insel-start.jpg`) statt des hochformatigen `insel.jpg` (720×1027), dazu `object-fit:contain`. Der Weg dahin, weil er sich sonst wiederholt: Zuerst wurde am Ausschnitt geschraubt (`object-position` bei 63 %, dann 72 %) — beide Male fehlte etwas, weil das Hochformat viel schmaler ist als der Streifen breit. Dann `contain` auf dem Hochformat: das ganze Bild war sichtbar, aber als schmaler Streifen mit breiten Rändern links/rechts. **Die eigentliche Lösung lag im Bild, nicht im CSS:** ursprünglich war `insel-start.jpg` der Bereich von 22–88 % der Originalhöhe (Himmel bis unter das Boot, Insel und Boot vollständig), 720×678 und damit fast quadratisch (1,06 : 1) — praktisch dasselbe Seitenverhältnis wie der Foto-Streifen auf iPhone 14/15 Pro Max. Ergebnis: volle Breite **und** vollständiges Motiv, ohne sichtbare Ränder. Nur auf sehr flachen Streifen (iPhone SE, ca. 1,9 : 1) bleibt ein Rand links/rechts. `insel.jpg` bleibt unverändert für Titelseite und Sitzungs-Hintergrund, wo Hochformat richtig ist.
    **Enger zugeschnitten (5. Aug. 2026, Christine: "das Bild kleiner machen, aber so, dass das Boot noch drauf ist und die Insel mit wenig Himmel oberhalb der Insel und wenig mehr unterhalb des Bootes und das Bild dann fixieren"):** vom damaligen 720×678-Zuschnitt sind oben rund 8 % (dünner Himmelsstreifen über den Palmen) und unten rund 18 % (leeres Wasser hinter dem Boot) weggefallen — **unten mehr als oben**, wie gewünscht. Neue Grösse **720×505** (1,43 : 1, spürbar flacher als vorher), `aspect-ratio` in `.home-hero-photo` entsprechend nachgezogen. Boot samt Rudern und die ganze Insel bleiben vollständig im Bild; das Foto nimmt dadurch insgesamt weniger Höhe auf der Startseite ein ("das Bild kleiner machen"). **"Fixiert"** heisst hier: die `aspect-ratio`-Regel ist exakt auf diesen Zuschnitt eingestellt, das Bild behält diese Form auf jedem Gerät.
  - **Ausnahme, ehrlich benannt:** Seit das Foto eine feste Höhe hat (siehe oben), passt die Startseite nur noch im schlanksten Fall ganz ohne Scrollen aufs Handy — sobald heute mehrere Meditationen gelaufen sind oder die Lieblingsliste erscheint, scrollt die Seite. Das ist die bewusste Entscheidung: lieber ein immer gleich grosses Bild und eine längere Seite als ein Bild, das je nach Verlauf anders aussieht.
- **"Angefangen" und "Heute gehört"** (`#focusSection`, beide Überschriften baut `renderHome()` selbst) — bis 6. Aug. 2026 stand hier **eine** Karte unter der Überschrift **"Mein heutiger Fokus"**. Christine fand das verwirrend, und zu Recht: Unter dem einen Wort lagen **zwei verschiedene Dinge**.
  - **"Angefangen"** — die unterbrochene Übung mit ✕ zum Wegräumen und ▶ zum Weitermachen (§3.4a). Zeile: Foto, Name, *"noch 2 Min übrig"*. Erscheint nur, wenn wirklich etwas offen ist. Sie kann **von einem früheren Tag** stammen — genau daran scheiterte jede Überschrift mit "heute".
  - **"Heute gehört"** — die heute abgeschlossenen Übungen mit Uhrzeit, Dauer und Bereich, höchstens drei Zeilen (die jüngsten zuoberst), darunter bei mehr eine Zusammenfassung ("und N weitere heute · zusammen X Min"). **▶-Knopf an jeder Zeile** (Christines Regel "Ich möchte immer Knöpfe").
  - **Kein Übertitel über den beiden.** Ein Dach müsste wieder vage formuliert sein — also genau das, was wegsollte. Die beiden Überschriften stehen darum auf derselben Ebene wie "Mein Zustand" darunter, wie alle Abschnitte der App. Meist ist ohnehin nur eine von beiden da. Nebeneffekt: Beide Wörter brauchen kein "mein/dein" (§2), die Frage stellt sich hier gar nicht.
  - **Keine Dopplung:** Die angefangene Übung steht als Teilstück schon im Verlauf (ihre Minuten zählen ja). `heuteOhneOffen` filtert genau diesen Eintrag aus "Heute gehört" heraus, damit dieselbe Sitzung nicht zweimal erscheint. Zwei *verschiedene* Sitzungen derselben Meditation dürfen dagegen beide stehen — geprüft.
  - **Aufbau seit 8. Aug. 2026 (Christines Auftrag, siehe Protokoll):** Der Block hat höchstens zwei Teile, in dieser Reihenfolge — **der Vorschlag** (immer, und immer zuoberst) und darunter **„Willst du weiterhören?"** (nur wenn etwas offen ist). Was heute schon gelaufen ist, wird hier **nicht** aufgezählt; das steht auf „Mein Weg". Der Vorschlag meidet, was heute lief oder offen ist (`tagesVorschlag(meide)`), damit nicht zweimal dasselbe dasteht. `focusWrap.hidden` bleibt nur gesetzt, wenn wirklich gar nichts gefunden wird (z. B. alles gesperrt) — sonst stünde eine leere Überschrift da.
  - **"Für den Morgen / Tag / Abend / die Nacht"** (seit 6. Aug. 2026) — ist heute nichts gelaufen und nichts offen, steht hier **ein** direkt startbarer Vorschlag statt der früheren Leere. Vorher zeigte die Seite in diesem, dem häufigsten Zustand **keinen einzigen Abspielknopf**, und 30 % der Fläche blieben leer (gemessen); jetzt sind es 19 %.
    - **Worauf der Vorschlag beruht — und worauf ausdrücklich nicht.** Christine fragte: *"Anhand von was wird die Meditation vorgeschlagen? Kompass ist ja nicht ausgefüllt."* Das deckte einen echten Fehler im ersten Entwurf auf: Der unberührte Zeiger steht auf `{x:0, y:0}`, und `dirFromCompass()` liefert daraus **immer "sued"** (Gefühle verstehen) — jede Nutzerin hätte morgens denselben Vorschlag bekommen, begründet mit einem Zustand, den nie jemand angegeben hat. Genau das verbietet sich die App an anderer Stelle bereits ausdrücklich (`#recFehlt`, "Setz zuerst den Zeiger oben"). Grundlage sind darum **nur** `tageszeitBereich()` (die Uhrzeit — objektiv) und die schon vorhandene Reihung nach *noch nie gehört / lange nicht vorgeschlagen* (`gehoertWieOft()`, `letzteVorschlaege()` — echte Daten). **Nichts davon behauptet etwas über das Gefühl.**
    - **Zeitfenster:** vor 5 Uhr "Für die Nacht" (Entspannen), bis 11 "Für den Morgen" (Gedanken beruhigen), bis 17 "Für den Tag" (Stress lösen), bis 22 "Für den Abend" (Entspannen), danach wieder Nacht.
    - **Innerhalb eines Tages stabil, über die Tage wandernd:** Ausgewählt wird aus den fünf bestgereihten Übungen über den Tag im Jahr — sonst stünde bei jemandem, der länger nicht meditiert, wochenlang derselbe Vorschlag.
    - **Seit 8. Aug. 2026 gibt es diese zweite Fassung nicht mehr.** Bis dahin galt: Ist der Kompass gestellt, lautet die Überschrift „Passt zu deiner Stimmung" und zeigt `empfehlung[0]`. Das hielt nicht, was es versprach — `empfehlung` wird nur beim Drücken des Kompass-Knopfes gebaut und veraltete, sobald die Nadel danach bewegt wurde. Die Startseite zeigt jetzt **immer** den Tageszeit-Vorschlag mit der Tageszeit-Überschrift (siehe Protokoll).
    - **Recherche dazu:** Calm veröffentlicht täglich feste Sitzungen für alle ("Daily Calm", vier Programme, neues Tagesthema); Headspace gliedert seinen "Today"-Tab **nach der Tageszeit** (je eine Meditation für morgens/nachmittags/abends, "your meditation of the day"), Personalisierung kommt erst obendrauf über Apple Health. Insight Timer zeigt ebenfalls nie eine leere Seite, sein Check-in ist ein *eigenes* Feature und keine Voraussetzung. **Alle nennen es nach dem Tag, nicht nach der Person** — genau die Rahmung, die ohne Datengrundlage trägt. (Quellen nur über Suchergebnisse zugänglich, Direktabruf blockiert — als zweite Hand gewichten.) **Nicht belegbar** ist dagegen die naheliegende These, unechte Personalisierung schade dem Vertrauen; belegt ist nur, dass ein "für dich" **wirkungslos** wird, wenn es nicht plausibel zum eigenen Verhalten passt (JCR 2016).
  - **Sonst** (nichts angefangen, heute nichts gehört und kein Vorschlag ermittelbar): der **ganze Block bleibt verborgen** (`focusWrap.hidden = true`).
  - **BEWUSST NICHT GELÖSCHT:** Die frühere Logik für "noch keine Empfehlung" bzw. "Empfehlung da, aber heute noch nichts gehört" steht in `renderHome()` weiterhin als auskommentierter Block ("Alten Code im Hintergrund behalten, man weiss ja nie").
- **Entfallen (5. Aug. 2026, Christine: "Startseite, dein Fortschritt löschen"): "Dein Fortschritt"** (`renderHomeFortschritt()`, `#homeStatsRowBtn`) — war selbst erst am Vortag der Ersatz für "Deine Lieblingsmeditationen" (siehe unten) und zeigte dieselbe Zahlenreihe (Tage am Stück, Meditationen, Minuten) wie "Mein Weg". **BEWUSST NICHT GELÖSCHT**, nur auskommentiert in `#homePage` und der Aufruf von `renderHomeFortschritt()` in `renderHome()` stillgelegt — derselbe "man weiss ja nie"-Grundsatz wie beim deaktivierten Begleiter (§6a). Die zugrundeliegende Zählung `berechneFortschritt()` bleibt aktiv, sie wird weiter von "Mein Weg" (`renderStats()`) gebraucht.
- **Entfallen (4. Aug. 2026): "Deine Lieblingsmeditationen"** (`renderLieblinge()`, `#lieblingeSlot`) — hatte die drei **meistgehörten** Meditationen aus dem ganzen Verlauf mit "N Mal gehört" gezeigt, bewusst **nicht** dasselbe wie die ⭐-Favoriten (§3.3a): die wählt man selbst aus, diese Liste ergab sich allein aus dem, was wirklich gelaufen ist. Genau das war das Problem — der andere Name war für Christine nicht erkennbar ("eigentlich heissen sie deine Favorites"), und die Zeilen sahen "Dein heutiger Fokus" darüber zum Verwechseln ähnlich (nur eine der beiden hatte einen Play-Knopf sichtbar). Kurz durch "Dein Fortschritt" ersetzt, das seinerseits einen Tag später ebenfalls entfallen ist (siehe oben). `renderLieblinge()` bleibt **unbenutzt im Code** ("man weiss ja nie", Christines Wunsch) statt gelöscht zu werden.
  Die frühere getrennte Sektion "Auch gut für dich" / "Empfehlung für dich" ist damit entfallen — zwei parallele Blöcke mit derselben Information (Zustand + Vorschlag) waren Redundanz ohne Zusatznutzen, nicht Ergänzung. Ein erster Umbauversuch liess trotzdem in zwei der drei Zustände noch denselben Satz doppelt stehen (Zustandssatz *und* eigener Kompass-Knopf); das ist korrigiert.
- **"Meine Stimmung"** — Karte mit Überschrift "Wie geht es dir gerade?", dem aktuellen Kompass-Satz, der Taste "Finde deine Meditation →" und einem **kleinen, mitlaufenden Kompass** (`#compassWrapHome`), der sich `compassBefore` mit dem grossen Kompass teilt. Das ist die **einzige** Stelle auf der Startseite, die die Stimmung in Worten nennt und zum Kompass führt.
  - **Aufbau seit 8. Aug. 2026 (Christine: „zweite Box sieht nicht gut aus mit so viel Weiss und wenig Text"):** Der Kompass steht als `float:right`, Überschrift und Satz fliessen um ihn herum. Vorher sass er in einer eigenen Kopfzeile, die so hoch war wie er (68 px), aber nur eine kurze Textzeile enthielt — links daneben blieb ein leeres Band, und zwischen Frage und Satz klaffte eine Lücke. Der `float` löst beides auf einmal: kein leerer Raum mehr, und der Satz zerfasert trotzdem nicht in kurze Zeilen (der Grund, warum er am 6. Aug. aus der Spalte genommen worden war) — die ersten Zeilen laufen neben dem Kompass, die restlichen über die volle Breite. Bei gleichem Inhalt **20–26 px kürzer**. Der Knopf braucht `clear:both`, sonst rutscht er neben den Kompass.
  - **Abstand zwischen den Abschnitten (8. Aug. 2026, Christine: „Abstand zwischen ‚Für die Nacht'-Abschnitt und Kompass-Abschnitt vergrössern"):** Auf der Startseite sind die Abschnitts-Abstände knapper als sonst in der App (`.home-page .section-label`), damit möglichst viel ohne Scrollen aufs Bild passt. Mit 11 px oben klebten der Vorschlag-Block und die Stimmungs-Karte aneinander und lasen sich wie **ein** Abschnitt. Jetzt **28 px**. Gemessen bleiben danach auf einem iPhone 14 (390 × 844, Christines Gerät) noch rund 57 px Luft unter der Karte — die Seite passt dort weiterhin ohne Scrollen. Auf iPhone SE und mit Anzeige-Zoom wird ohnehin schon gescrollt (dort war die Seite auch vorher zu lang).
  - **Der kleine Kompass ist bedienbar** — die Nadel lässt sich direkt auf der Startseite ziehen. Bis 8. Aug. 2026 blieb der Satz daneben dabei auf dem alten Stand (er wurde nur in `renderHome()` gesetzt), der Kompass wirkte also, als täte er nichts. Der Satz sitzt jetzt in **`zeigeHomeStateText()`** und wird als `onChange` beim Ziehen mitgeführt. **Bewusst nur dieser Satz und nicht das ganze `renderHome()`:** `onChange` läuft bei jeder Fingerbewegung durch — die ganze Startseite dabei neu aufzubauen würde ruckeln. Die Empfehlungsliste folgt daher weiterhin erst beim nächsten Seitenaufbau.
- Alles wird bei jedem Aufruf über `renderHome()` neu aufgebaut, zeigt also immer den aktuellen Stand. `heutigeMeditationen()` filtert `loadHistory()` auf den heutigen Kalendertag (`dayStamp()`) und listet jede einzelne gehörte Übung mit `uhrzeitWort()`.

### 3.2 Kompass ("Wie geht es dir gerade?", `data-step="compass"`)

**Die Bedienung und die ganze Logik dahinter sind unverändert** (Zeiger, Achsen, Empfehlungslogik) — im August 2026 wurde der Rahmen nach einem UX-Audit (15 Kriterien, Premium-Massstab: Headspace/Calm/Balance/Apple Fitness+) grösstenteils neu gebaut. Das Kompass-Foto selbst ist dabei bewusst **nicht** angefasst worden — auf ausdrücklichen Wunsch, weil dafür später eine eigene Logik (z. B. Tageszeit) vorgesehen ist.

- **Beschriftung steht IM Zifferblatt, und die Scheibe ist so gross wie nie** (Stand 6. Aug. 2026). `.dial-label`: dunkelgrün (`--ink`), 12px, gesperrt, waagrecht lesbar — **Nachdenklich** oben, **Emotional** unten, **Entspannt** links, **Angespannt** rechts. Lesbar auf jedem Foto durch einen **hellen Schein** (`paint-order:stroke`, cremefarbener Umriss 2,4px bei 72 %) statt der früheren weissen Schrift mit dunklem Schatten. Scheibenradius **172** (vorher 150), auf dem Bildschirm **308px** (iPhone SE 273px).
  - **Der Umweg, weil er sich sonst wiederholt.** Christines Gestaltungsentwurf zeigte die Wörter **ausserhalb** des Kreises. So umgesetzt (5. Aug. 2026) — und dabei stellte sich heraus: Aussen kostet die Beschriftung echte Breite. Im Browser gemessen: "Angespannt" = **81,6 von 400 Einheiten**, also gut ein Fünftel der Breite **je Seite**. Die Scheibe schrumpfte dadurch auf **170px**. Christine: *"Er ist viel zu klein, er muss viel grösser sein."* Der Entwurf war im Posterformat gezeichnet, wo dieselbe Schrift proportional viel kleiner wirkt; auf einem 358px breiten Streifen geht die Aufteilung nicht auf.
  - **Die Lösung war nicht, die Wörter zu verkleinern, sondern sie hineinzuholen.** Innen kosten sie **gar keine** Breite — die Scheibe konnte dadurch sogar über den ursprünglichen Wert hinaus wachsen (172 statt 150). Übernommen aus dem Entwurf bleiben: der **dunkle Schriftton**, der **ruhige helle Ring** statt des schweren Goldbands, das **feine Fadenkreuz** und die **Goldpunkte an den vier Polen**. Aufgegeben wurde allein die Position der Wörter.
  - **Reihenfolge im SVG ist bedeutsam:** Punkte → Ring → Fadenkreuz → **Beschriftung zuletzt**. Zeichnet man das Fadenkreuz nach den Wörtern, laufen die Linien mitten durch die Buchstaben.
  - **Mitgezogen:** `COMPASS_MAXR` 135 → **150** (0,87 × Scheibenradius; der Zeiger reicht damit weiter als je zuvor), Nadelstärke 5,5, Nadelpunkt 12 (beim Anfassen 15), Nabe 10 — alle Teile im Verhältnis zur grösseren Scheibe, damit der Zeiger nicht plötzlich zierlich wirkt.
  - **Der kleine Kompass auf der Startseite** (`.compass-wrap.mini`) trägt keine Beschriftung und behält seine eigene Geometrie (`inset:12.5%`, Ring r=157). Da er sich `COMPASS_MAXR` mit den grossen Kompassen teilt, wird seine Nadel per `transform: scale(0.9)` (= 135/150) auf das alte Mass zurückgeholt; Nadelstärke und Punkt sind entsprechend gegengerechnet (10 bzw. 24).
  - **Platzprobe (gemessen, alle drei Geräte):** Auf iPhone SE, 14 und Pro Max bleibt jede Beschriftung vollständig **innerhalb** der Scheibe. Ist der Erklärkasten einmal weggetippt, sind Scheibe **und** Zustands-Karte auf allen dreien ohne Scrollen sichtbar.
- **Frühere Fassung (Aug. 2026 bis 5. Aug. 2026): Beschriftung *im* Zifferblatt**, waagrecht lesbar (`.dial-label`, kleine SVG-`<text>`-Elemente mit dunklem Schein statt harter Kontur): **Gedanken** oben, **Gefühle** unten, **Entspannt** links, **Angespannt** rechts. Die früheren seitlich gedrehten Aussenbeschriftungen (`writing-mode:vertical-rl`, Kopfneigen zum Lesen nötig) sind komplett entfallen — dadurch kann der Ring selbst deutlich grösser werden: `.compass-wrap` füllt jetzt die volle Zeilenbreite (`max-width:360px`, auf niedrigen Bildschirmen `@media (max-height:760px)` gedeckelt auf `318px`, das sind ~85 % der Breite eines iPhone SE statt vorher ~77 %).
- **Achtung, waagrecht gespiegelt:** In der Vorlage steht links "Entspannt" und rechts "Angespannt" — umgekehrt zur internen Rechnung (`x < 0` = Anspannung). Die *Bedeutung* ist deshalb unverändert geblieben, nur die Zeichnung spiegelt: `nadelX(x) = 200 − x · COMPASS_MAXR`, `nadelY(y) = 200 + y · COMPASS_MAXR`. Jede Stelle, die eine Nadel setzt (Ziehen, Abschluss-Kompass, Reise-Spur, kleiner Kompass auf der Startseite), rechnet über diese beiden Funktionen.
- Die Scheibe selbst: das Zifferblatt-Foto (Insel/Bucht) als runde Fläche (`.compass-photo`, seit 5. Aug. 2026 r=95 statt 150, **unverändertes Bild**), darüber seit 5. Aug. 2026 ein **heller, ruhiger Ring** statt des Goldbands sowie vier kleine Goldpunkte an den Polen (die früheren Pfeile und acht Marken sind mit dem Goldband entfallen). Beim Betreten der Seite skaliert der Ring sanft von 94 % auf 100 % ein (`@keyframes dialSettle`, 500ms) — der kleine Vorschau-Kompass auf der Startseite (`.compass-wrap.mini`) ist davon ausgenommen. Die Nabe in der Mitte (`.rose-hub`) atmet leise (Skalierung 100→116→100 %, 4s-Loop), solange der Zeiger noch nie bewegt wurde — eine stille Einladung zum Anfassen; sie hört auf, sobald einmal gezogen wurde (`.compass-wrap.touched`), unabhängig für Kompass und Abschluss-Seite.
- **Zeiger unverändert in der Wirkung:** ein frei in der Scheibe verschiebbarer goldener Punkt (`COMPASS_MAXR = 86`, vorher 135 — siehe oben), weisse Nabe mit Kernpunkt. Die beiden Achsen bleiben **unabhängig**: waagrecht Anspannung↔Entspannung (`x`), senkrecht Denken↔Fühlen (`y`), jeweils −1…1, gespeichert in `compassBefore`.
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
3. **"Dein Inselbewohner" als Auf/Zu-Schalter** (`#profilInselbewohnerBtn`, **seit 10. Aug. 2026 beschriftet mit „Mein Insel-Aufenthalt", Untertitel „Tippen zum Anzeigen"** — siehe Protokoll für die drei verworfenen Zwischennamen) für "Deine Inselwoche" und "Deine Inselreise": beide Karten sind standardmässig **zugeklappt**, damit die Seite ruhig bleibt; ein Tipp zeigt sie, der nächste versteckt sie wieder (`setInselbewohnerOffen()`). Untertitel wechselt mit ("Deine Insel-Woche und Inselreise ansehen" ↔ "Weniger anzeigen"), der Pfeil "›" dreht sich um 90°. **Wichtig beim Ändern:** `renderWeek()`/`renderJourney()` setzen `style.display` selbst wieder auf sichtbar, sobald Verlauf da ist — darum ruft `renderMyMed()` am Ende `setInselbewohnerOffen(inselbewohnerOffen)` erneut auf, sonst stünden die Karten nach jedem Aufruf wieder offen. Direkt darunter (nicht erst weiter unten): was ein Knopf aufklappt, muss gleich darunter erscheinen, sonst sucht man es.
   - **"Deine Inselwoche"** (`renderWeek()`, `#profilWeekBox`) — sieben Kreise von Montag bis Sonntag, gefüllt an den Tagen mit einer Sitzung, der heutige Tag zusätzlich umrandet. Zeigt **nur noch das Raster** — Serie und Wochenziel-Bruch sind hier entfernt (4. Aug. 2026, siehe Dopplungs-Hinweis bei "Dein Wochenziel" unten). Hinter **"Details"** die Zeilen mit Vorher/Nachher je Tag: "Zuerst"/"Zuletzt" statt "Vorher"/"Nachher" ab zwei Sitzungen am selben Tag (sonst läse sich ein Tag mit zehn Sitzungen wie ein einziges Vorher-Nachher-Paar). Erscheint erst nach der ersten echten (≥20 Sekunden langen) Meditation.
   - **"Deine Inselreise"** (`renderJourney()`, `#profilJourneyBox`, **zählt seit 4. Aug. 2026 Tage statt Meditationen — siehe §3.3c**) — ein Weg aus fünf Stationen (Angekommen · Ruhiger Anker · Achtsame Entdeckerin · Vertraute Insel · Zuhause auf der Insel), die aktuelle hervorgehoben, darunter "Stufe 3 · …", der Stand ("noch 4 Tage bis zur nächsten Stufe", auf der letzten Stufe "an N Tagen meditiert") und ein Balken. Unter jedem Kreis steht "ab 1/5/15/30/60 Tag(en)" — vorher stand die Schwelle nur im `title`-Attribut, das auf dem Handy nie erscheint. Hinter **"Details"**: "Bisher an X von Y Tagen meditiert" + "Insgesamt Z Meditationen" getrennt, alle fünf Stufen mit Symbol/Name/Schwelle, dann die Muster (wie du meistens ankommst, liebste Übung, Rhythmus, Entwicklung).
     - **Die fünf Stufen haben seit 8. Aug. 2026 ein eigenes, schmales Zeilenformat** (`.stufen-zeile`): Bild, Name, und rechts klein die Schwelle — **eine Zeile pro Stufe**. Vorher benutzten sie `.recap-row`, das Stichwort **oben** und Wert **darunter** setzt und für kurze Schlagwörter wie "BISHER" gemacht ist; mit Namen wie "Achtsame Entdeckerin" in Grossbuchstaben wurden daraus fünf wuchtige Blöcke. Christine: *"So ist der Weg aufgebaut … kleinere Schrift und dann Abstand oder so, es sieht nicht gut aus."* Gemessen: **279 px → 179 px** für die fünf Stufen, die ganze Karte 100 px kürzer. Die aktuelle Stufe bleibt gold und fett. Auf 320 px passt auch die längste Kombination ("Zuhause auf der Insel" + "ab 60 Tagen") auf eine Zeile.
4. **Entfallen (Aug. 2026):** Hier stand die Karte "Dein persönliches Meditationstraining" (`.hero-card`, `#toTrainingBtn`). Christine fragte nach, was sie eigentlich anzeigt — die ehrliche Antwort war: nichts Eigenes. Immer derselbe Erklärtext, lediglich die Knopfbeschriftung wechselte zwischen "Jetzt starten →" und "Zum Kompass →". Sie belegte damit den prominentesten Platz der Auswertungsseite, um etwas zu erklären, das auf der Kompass-Seite passiert; der Kompass ist über die Tab-Leiste ohnehin jederzeit erreichbar. Ersatzlos entfernt, samt Klick-Logik und den `.hero-card`-Regeln.
5. **"Dein Fortschritt"** — drei Zahlen aus dem echten Verlauf (`renderStats()`): Tage am Stück, Meditationen, Minuten gesamt. Darüber steht seit Aug. 2026 **"seit <Datum>"** (`startDatum()` — der erste App-Besuch aus `myisland.abo.v1`, ersatzweise der älteste Verlaufseintrag), damit klar ist, worauf sich die Zahlen beziehen. **Die Zahlenreihe ist selbst der Knopf** (`#statsRowBtn`) und klappt darunter die **Fortschritts-Grafik** auf (`renderFortschrittGrafik()`).
   - **Zwei getrennte Diagramme statt eines mit zwei y-Achsen.** Christine hatte "zwei Achsen rechts und links y" gewünscht; das ist der klassischste Diagramm-Fehler überhaupt: bei zwei y-Skalen stehen diese willkürlich zueinander, dadurch behauptet das Bild einen Zusammenhang, den die Zahlen nicht hergeben. Umgesetzt sind darum **"Meditationen pro Tag"** und **"Minuten pro Tag"** als zwei schmale Säulendiagramme untereinander mit **derselben Zeitachse** — gleiche Aussage, ohne die Irreführung. Beide in derselben Farbe, weil es je Diagramm nur eine Reihe gibt; eine zweite Farbe würde einen Unterschied behaupten, den es nicht gibt.
   - **Handgezeichnetes SVG, keine Bibliothek** (`balkenSvg()`) — die App bleibt eine einzige Datei und läuft offline. Säulen mit runder Kappe oben und eckigem Fuss auf der Nulllinie (Pfad statt `<rect>`), max. 24px breit mit 2px Luft dazwischen, hauchdünne Hilfslinien, **nur der Höchstwert** direkt beschriftet (eine Zahl an jeder Säule wäre unlesbar), auf der Zeitachse nur Anfang und Ende. Die Skala (0 und Höchstwert) steht **auf beiden Seiten** — Christine hatte nach der Auftrennung in zwei Diagramme noch eine Beschriftung rechts gewünscht, damit man auch am rechten Bildrand ablesen kann. Es ist bewusst **dieselbe** Skala gespiegelt, keine zweite mit eigener Einheit: genau das wäre wieder die Zwei-Achsen-Falle.
   - **Antippen statt Hover**, weil es auf dem Handy kein Hover gibt: ein Tipp auf einen Tag hebt ihn in **beiden** Diagrammen hervor und schreibt Wochentag, Datum, Anzahl und Minuten in eine Zeile darunter. Die Trefferflächen (`.balken-feld`) sind bewusst breiter als die Säulen.
   - **Zuklappen (Aug. 2026 nachgebessert):** Der Hinweis unter der Zahlenreihe hiess im offenen Zustand "Antippen zum Zuklappen" — er stand damit direkt **über** der Grafik und las sich, als müsse man die Grafik selbst antippen; genau das hat Christine versucht, und dort passiert nichts (die Grafik reagiert nur auf Säulen). Jetzt sitzt ein eindeutiger Knopf **"Grafik zuklappen"** (`#grafikZuBtn`) am Ende der Karte, und der Hinweis darüber wird beim Aufklappen ausgeblendet. Auf- und Zuklappen laufen beide über `grafikOeffnen(auf)`, damit Zahlenreihe und Knopf garantiert dasselbe tun.
   - **Falle beim Ändern:** Der Klick-Zuhörer der Grafik wird als `host.onclick` gesetzt, **nicht** per `addEventListener` — `renderFortschrittGrafik()` läuft bei jedem Aufklappen erneut, mit `addEventListener` würden sich die Zuhörer stapeln und ein Säulen-Tipp mehrfach feuern.
   - Bei weniger als zwei Tagen oder ohne jede Meditation steht statt eines Ein-Säulen-Diagramms ein Satz ("Deine Entwicklung erscheint hier, sobald du an mehr als einem Tag meditiert hast.").
6. **"Dein Wochenziel"** (`renderWochenzielCard()`, `#wochenzielCard`) — **Aug. 2026 ersetzt** die frühere "Deine Ziele"-Liste (vier feste Kategorien, alle mit derselben erfundenen Zielzahl 10, ohne Bezug zu echtem Verhalten und ohne jede Reaktion beim Erreichen — siehe Auditkritik). Christine wollte stattdessen ein **selbst gewähltes** Ziel: entweder "X Mal pro Woche" oder "Y Minuten pro Woche", per Umschalter (`#wochenzielTypRow`, Chips 1–7 bzw. 30–210 Min in `#wochenzielWertRow`) einzurichten über den Knopf "Ziel festlegen"/"Ziel anpassen" (`zeigeWochenzielEditor()`). Gespeichert in `localStorage` (`myisland.wochenziel.v1` = `{ typ, wert }`). Gezählt wird ab **Montag dieser Woche** (`montagDieserWoche()`, dieselbe Wochengrenze wie bei der Inselwoche auf derselben Seite, §3.3) über `wochenFortschritt()`, das die echte Anzahl abgeschlossener Meditationen bzw. deren Minuten (aufgerundet, gleiche Regel wie bei "Minuten gesamt") aus dem Verlauf zählt. Ohne gesetztes Ziel steht eine kurze Einladung, eines festzulegen, statt eines leeren oder falsch befüllten Balkens. **Erreichtes Ziel (4. Aug. 2026):** Ist `erreicht >= ziel.wert`, wechselt die Karte in einen eigenen Zustand — 🌴 neben der Zahl, Untertitel "Ziel erreicht – schön, dass du drangeblieben bist." statt "diese Woche", und der Balken bekommt einen goldenen Rand (`.bar.voll`). Vorher passierte beim Erreichen schlicht **nichts**: der Balken stand voll und sah aus wie "fast voll" — ein Ziel, das sich beim Erreichen nicht meldet, ist ein halber Blindgang. **Nachtrag (4. Aug. 2026):** Die "Deine Inselwoche"-Karte zeigte dieselben zwei Zahlen (Serie, Wochenziel-Bruch) ein zweites Mal — solange sie auf der separaten Profil-Seite stand, fiel das kaum auf. Seit Woche/Reise/Fortschritt auf derselben Seite "Mein Weg" stehen (§3.3), ist die Dopplung entfernt: die Inselwoche zeigt nur noch das Raster und die Vorher/Nachher-Details. **Nachbesserung (Christine, gleicher Tag):** `#wochenzielCard` hatte als reine `.card` ohne eigene Innenabstands-Klasse keinerlei Padding — der volle "Ziel festlegen"-Knopf sass dadurch direkt an der Kartenrundung an und wirkte abgeschnitten. Jetzt mit `padding:16px` wie bei den anderen Karten dieser Seite.
7. **"Deine letzten Meditationen"** — seit Aug. 2026 zunächst nur die **drei** jüngsten Einträge aus `loadHistory()` mit "Heute"/"Gestern"/Wochentag, Dauer und Bereich (`renderHistoryList()`, vorher fünf ohne Ausklappen). Darunter **"Alle N anzeigen"** / **"Weniger anzeigen"** (`#historyMehrBtn`, Zustand in `historyAlle`); der Knopf bleibt ganz weg, solange es höchstens drei Einträge gibt. **▶-Knopf ergänzt (4. Aug. 2026, Christine: "Ich möchte immer Knöpfe"):** Jede Zeile ist jetzt wie überall sonst per `data-play` startbar, mit sichtbarem Play-Knopf — vorher war dieser Verlauf bewusst nur Aufzeichnung ohne eigenen Startweg, siehe §3.3 Punkt 3.
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

#### 3.4a Abbrechen und Weitermachen (5. Aug. 2026)

**Der Fehler, der das ausgelöst hat.** Christine fragte, was passiert, wenn jemand eine Meditation nicht fertig macht. Der Durchgang durch alle Wege ergab etwas Gravierenderes als die Frage selbst: **Das ✕ warf die ganze Sitzung weg — ohne Rückfrage, ohne dass die gehörten Minuten irgendwo blieben.** Nachgemessen mit derselben, zu 100 % gehörten Meditation (5:00 von 5:00): mit "Fertig →" beendet → gespeichert; mit ✕ beendet → spurlos weg. Der Unterschied lag allein am Knopf. Das ✕ sitzt oben links, genau dort, wo man auf dem Handy instinktiv hintippt, während "Fertig →" ein kleiner Knopf unten neben "Pause"/"Vorspulen" ist. Ursache im Code: `backBtn` rief `stopSession()`, aber **nie** `recordSession()` — `completedLog` lag nur im Arbeitsspeicher. Dasselbe galt, wenn die App mitten in einer Meditation weggelegt oder geschlossen wurde.

**Christines Entscheid.** Beide Vorschläge angenommen, mit einer ausdrücklichen Korrektur meiner Empfehlung: *"Für mich ist aber auch wichtig, dass man, wenn man die Meditation nach vier Minuten gestoppt hat, dass man dann weitermachen kann und nicht wieder am Anfang startet, so wie das die anderen auch machen."* Ich hatte zu einem Neustart statt echtem Fortsetzen geraten; sie wollte das Fortsetzen an derselben Stelle. (Recherche-Befund dazu: **Insight Timer** verkauft "pick up exactly where you left off" als kostenpflichtigen Zusatz — Fortsetzen ist in dieser Branche also keineswegs unüblich. Meine Zurückhaltung war Designmeinung, kein Fund.)

**Was jetzt passiert:**

| Weg aus einer laufenden Meditation | Verhalten |
|---|---|
| **✕**, weniger als 20 Sek. gelaufen | Keine Rückfrage, nichts gespeichert (Fehlgriff soll keinen Eintrag und keinen Serientag erzeugen) |
| **✕**, ab 20 Sek. | Rückfrage: *"Meditation beenden? Deine 3 Min werden gespeichert – du kannst später an dieser Stelle weitermachen."* mit **"Weiter meditieren"** / **"Beenden"** |
| **App weggelegt / geschlossen** mitten drin | Stand wird still gesichert (`visibilitychange` → `hidden`), keine Rückfrage möglich |
| **"Fertig →"** | Wie bisher: Eintrag in den Verlauf, Abschluss-Seite. Zusätzlich wird der gemerkte Stand gelöscht |

**Wegräumen statt weitermachen (5. Aug. 2026 nachgetragen).** Christines Frage: *"Kann man bei deinem heutigen Fokus auch Meditationen weglöschen?"* Antwort war: nein — und bei der angefangenen Übung war das eine echte Lücke. Sie blieb **für immer** auf der Startseite stehen; man kam nur wieder heraus, indem man sie zu Ende hörte oder neu startete. Die Zeile hat darum jetzt ein zurückhaltendes **✕** (`data-verwerf`, grau) links vom goldenen ▶ — Weitermachen ist der Normalfall, Wegräumen die Ausnahme. Rückfrage: *"„Atem-Anker" nicht weitermachen? Die 3 Min, die du schon gehört hast, bleiben in deinem Verlauf."* mit **"Zurück"** / **"Wegräumen"**.
- **"Wegräumen", nicht "Löschen":** Die gehörten Minuten bleiben im Verlauf — "Löschen" würde das Gegenteil versprechen. Danach erscheint dieselbe Übung schlicht als normale, erledigte Zeile ("19:19 Uhr · 3 Min"), was der Wahrheit entspricht: gehört wurde sie ja.
- **Reihenfolge im Klick-Zuhörer:** `data-verwerf` wird **vor** `data-weiter` geprüft, weil das ✕ in einer Zeile sitzt, die selbst `data-weiter` trägt. Ohne diese Reihenfolge würde ein Tipp aufs ✕ die Meditation starten. Geprüft.
- **Fehler von gestern mitbehoben:** "Verlauf löschen" (§3.6) räumte den gemerkten Stand **nicht** mit weg — die angefangene Meditation blieb danach auf der Startseite stehen und zeigte auf einen Eintrag, den es nicht mehr gab. Jetzt löscht der Reset auch `OFFEN_KEY` und `laufenderHistTs`.
- **Erledigte Meditationen bleiben unlöschbar** — bewusst. Sie sind die Aufzeichnung dessen, was wirklich passiert ist; ein Löschknopf direkt neben dem ▶ wäre auf dem Handy ausserdem leicht danebengetippt. Wer alles wegräumen will, hat "Verlauf löschen" in den Einstellungen.

**Wo es wieder auftaucht.** Auf der Startseite unter **"Dein heutiger Fokus"** (§3.1) als eigene Zeile: Foto, Name, *"Angefangen · noch 2 Min übrig"*, ein ✕ zum Wegräumen und ein ▶ zum Weitermachen (`data-weiter`). Der Block erscheint dafür **auch dann**, wenn heute sonst noch nichts gelaufen ist — die einzige Ausnahme von der Regel aus §3.1, dass er nur nach einer gehörten Meditation sichtbar ist. Formulierung bewusst *"noch 2 Min übrig"* statt *"noch 2 von 5 Min"*: Letzteres liest sich auch als "2 von 5 geschafft" und meint das Gegenteil.

**Technik, und warum die Minuten nicht doppelt zählen.**
- `OFFEN_KEY = "myisland.offen.v1"` merkt **genau eine** unterbrochene Meditation (die zuletzt unterbrochene): `{ id, name, min, seconds, ts, histTs, tag }`. Mehrere gleichzeitig offen zu halten wäre für eine Startseite mit einer Zeile nur Verwirrung. `ladeOffen()` verwirft den Eintrag selbsttätig, wenn es die Übung nicht mehr gibt oder keine Zeit mehr übrig ist.
- `sichereStand()` schreibt **denselben** Verlaufseintrag fort statt bei jeder Unterbrechung einen neuen anzulegen — gemerkt in `laufenderHistTs`. Wer eine Meditation dreimal unterbricht, bekommt trotzdem **einen** Eintrag, der auf die Gesamtzeit wächst.
- `recordSession()` prüft dieses `laufenderHistTs` ebenfalls: Wird eine fortgesetzte Meditation zu Ende gehört, wächst der bestehende Eintrag auf die Gesamtdauer, statt dass ein zweiter danebensteht. **Geprüft:** 152 Sek. abgebrochen, fortgesetzt, fertig gehört → **ein** Eintrag mit 300 Sek., nicht 152 + 300.
- `setzeMeditationFort()` steigt über `fortsetzenSek` bei der gemerkten Sekunde ein (`loadQueueItem()` verbraucht den Wert einmalig, jedes weitere Stück einer Playlist beginnt wieder bei null). **Tagesgrenze:** Wird an einem *anderen* Tag weitergemacht, wird `laufenderHistTs` bewusst **nicht** übernommen — sonst wanderten die neuen Minuten rückwirkend auf gestern und die Serie stimmte nicht mehr. Dann entsteht ein eigener Eintrag für den neuen Tag.
- `starteMeditation()` (der normale ▶-Weg) verwirft einen gemerkten Stand **derselben** Übung: Wer bewusst neu startet, will neu starten. Die bereits gehörten Minuten bleiben trotzdem im Verlauf — verloren geht nichts.
- `zeigeBestaetigung(text, wennJa, opts)` nimmt jetzt `{ jaText, neinText, gefahr }`. Ohne `opts` bleibt alles wie vorher ("Abbrechen"/"Löschen" in Rot). "Meditation beenden" ist eine normale Entscheidung und darum **nicht** rot — nicht jede Rückfrage ist eine Warnung. **Geprüft:** Die Rückfrage beim Verlauf-Löschen sieht unverändert aus.

**Gegen die Serien-Falle.** Zwei Fachartikel (Smashing Magazine, "Designing For Distressed Users", Juli 2026; Springer, Scoping Review "Reclaiming Play in Digital Mental Health") beschreiben, dass Serien-Mechanik in Apps für seelische Gesundheit genau den Druck und das schlechte Gewissen erzeugt, das die App lindern soll — eine gerissene Serie verstärkt das Gefühl. Das stützt die Entscheidung, einen Abbruch **nicht** zu bestrafen. Alle vier untersuchten Apps (Calm, Headspace, Insight Timer, Balance) bieten ausserdem an, verpasste Sitzungen nachzutragen oder eine gerissene Serie wiederherzustellen; My Island hat dafür nichts — der einfachere Weg ist, sie gar nicht erst reissen zu lassen.

**Nicht belegbar geblieben** (blockierte Quellseiten, siehe Recherche): ob Calm/Headspace/Balance beim Verlassen nachfragen, ob sie einen "Weiterhören"-Bereich auf dem Startbildschirm haben und ob es dort Mindestdauern gibt. Darüber steht hier bewusst keine Behauptung.

### 3.5 Abschluss (`data-step="outro"`)
- Seitenkopf "Wie fühlst du dich jetzt?", darunter derselbe Kompass wie in §3.2 (gleiche Optik, gleiche Bedienung) → `compassAfter`.
- **Deine Reise auf dem Kompass** (`zeichneReise()`): heller Punkt = wo du angekommen bist, gestrichelte Spur bis zur aktuellen Nadel; bei sehr kleinen Wegen (< 0.08) ausgeblendet.
- **Zustand einmal setzen, dann festhalten (4. Aug. 2026, Christines Wunsch: "nur ein Knopf, der sagt: ja, das ist mein Zustand — sonst ändert man ihn die ganze Zeit").** Solange nicht bestätigt ist, lässt sich die Nadel frei ziehen, es wird aber **nichts ausgewertet und nichts gespeichert**: Rückblick (`#recapBox`), Vergleichssatz (`#shiftBox`) und "Zustand nochmals ändern" sind `hidden`, sichtbar ist nur **"Ja, so fühle ich mich jetzt"** (`#outroBestaetigenBtn`). Nach dem Bestätigen sperrt `outroKompass.sperren(true)` die Nadel (neu in `initCompass()`: `gesperrt` blockiert `pointerdown` **und** die Pfeiltasten; der Aufrufer bekommt ein kleines Steuerobjekt `{sperren, neuZeichnen, auffrischen}` zurück), `renderRecap()` läuft **einmal**, und `updateCurrentEntry()` schreibt den Wert in den Verlauf. `#outroAendernBtn` öffnet alles wieder — überschrieben wird derselbe Eintrag (`currentEntryTs`), es entsteht kein zweiter. Der Untertitel der Seite wechselt mit (`#outroSub`), weil "Stell den Zeiger noch einmal ein" bei gesperrter Nadel falsch wäre.
- **`bestaetigt` im Verlaufseintrag (§5).** `recordSession()` schreibt `after` zunächst als Kopie von `before` (damit alte Auswertungen nie auf `undefined` stossen) und setzt `bestaetigt:false`. Ohne dieses Merkmal würde jede weggetippte Abschluss-Seite stillschweigend als "nichts hat sich verändert" in die Statistik einfliessen — eine Aussage, die niemand getroffen hat. `istBestaetigt(e)` behandelt fehlendes Merkmal als `true` (Einträge von vor dieser Änderung). Ausgewertet in der Insel-Woche ("Nachher: nicht angegeben" statt eines erfundenen Werts) und in "Entwicklung" (Schnitt nur über bestätigte Sitzungen, unter drei davon steht stattdessen eine Einladung).
- Status-Karte "Jetzt" mit demselben abgestuften Satz. **Sie zeigt hier NICHT `m.next`** ("Diese Übungen helfen dir zu …") — das ist der Begründungssatz der Kompass-Seite und zeigt nach vorn auf Übungen, die noch kommen. Nach der Meditation ist genau das falsch; Christine hat den Widerspruch im Bildschirmfoto gefunden ("sehr aufgewühlt" und darunter "Diese Übungen helfen dir zu ausgeglichenen, entspannten Gefühlen"). Auf der Abschluss-Seite stehen dort die zwei `bullets` zum Zustand selbst. Unterschieden wird über `el.id === "compassReadout2"`. Im selben Zug behoben: das Symbol daneben (`#stateGlyph2`) wurde nie aktualisiert und stand fest auf 🌅, während die Zeile daneben längst etwas anderes sagte.
- **"Dein Rückblick"** — Vorher/Jetzt in Worten + gemachte Meditationen mit Dauer; darunter ein Satz zur Veränderung (`updateShift()`). **`updateShift()` spricht seit dem 4. Aug. 2026 in Adjektiven, nicht in Kompass-Achsen.** Vorher stand dort "Am Anfang zeigte dein Kompass auf **Denken**, jetzt auf **Fühlen**. Etwas hat sich bewegt." — gebaut aus `DIRS[…].label`, also aus den Achsenbeschriftungen der Scheibe. Christine hat das als schlicht falsch gemeldet: es liest sich, als sei das Fühlen (oder das Denken) nun weg, dabei sind das keine Zustände, sondern zwei Richtungen derselben Scheibe. Gemeint ist immer die Veränderung im Befinden. Der Satz benutzt jetzt `moodWort()` — **dieselbe Quelle wie die Zeilen "Vorher"/"Jetzt" direkt darüber**, sodass beide wörtlich zusammenpassen: "Vorher *sehr angespannt*, jetzt *eher geborgen*. Es ist entspannter geworden." Drei Fälle: fast unverändert (< 0.12 Weg) · gleiches Wort trotz Bewegung · verschiedene Wörter; der Richtungszusatz kommt aus `dx` (Entspannung/Anspannung). **Falle beim Ändern:** nie wieder `DIRS[…].label` in einen für Christine sichtbaren Satz schreiben — die vier Labels sind interne Achsennamen. **Seit Aug. 2026 mit Abstufung** (Christines Wunsch): dort steht "sehr geborgen" statt nur "geborgen". Umgesetzt in `moodHtml()`, das jetzt `moodWort()` benutzt (dieselbe Quelle wie die grosse Anzeige unter dem Kompass) statt nur `moodOf().word` — dadurch stimmen Rückblick und Kompass-Anzeige wörtlich überein, und die Insel-Woche auf "Mein Weg" (§3.3) zeigt die Abstufung automatisch mit, weil sie dieselbe Funktion nutzt. Die Daten dafür lagen ohnehin schon im Verlauf (`before`/`after` als Koordinaten, §5) — das Wort wird bei jeder Anzeige daraus neu berechnet, es musste nichts zusätzlich gespeichert werden.
- **Entfallen (4. Aug. 2026): die Mudra-/Mantra-Karte.** Die Abschluss-Seite bot zuletzt ein Mantra passend zum Zustand *nach* der Meditation an; Christine hat das in drei Schritten an einem Tag abgebaut: erst den Mudra-Knopf, dann versuchsweise das Mantra hierher/dorthin verschoben, zuletzt die Karte ganz gestrichen ("Mantra löschen und die Frage danach"). Begründung durchgehend dieselbe wie schon bei "Noch eine Meditation" (Aug. 2026) und bei der Begleiter-Karte: **direkt nach einer Meditation gleich das nächste Angebot danebenzustellen passt nicht zum Ausklang.** Die Seite endet jetzt mit Rückblick, Vergleichssatz, "Zustand nochmals ändern" und den zwei Wegen weiter ("Kompass neu setzen" / "Fertig"). Mit entfernt: `#mantraKarte`, `#needMantraBtn`, `#mudraBox`, `#mantraBox`, `zeigeMudra()`, `zeigeMantra()`, `waehlePassend()`, der `#mantraKarte`-Zweig in `setOutroBestaetigt()`, der `#mantraBox`-Reset in `renderRecap()` und die Regeln `.need-more*` / `.mudra-card` / `.mantra-card`. **Nicht entfernt:** die Listen `MUDRAS` und `MANTRAS` — sie hängen am deaktivierten Begleiter (§6a) und dürfen nicht gelöscht werden, sonst fällt der beim Reaktivieren halb aus; `.mini-btn` bleibt ebenfalls (Pause/Vorspulen/Fertig im Spieler). **Ein Fund aus der letzten Runde, der als Regel bestehen bleibt:** Die Karte war zwischenzeitlich schon **vor** dem Bestätigen bedienbar und hätte ein Mantra "passend zu deinem Zustand" aus der blossen Ruhestellung der Nadel gewählt — ein klarer G1-Verstoss. Wer hier je wieder etwas Zustandsabhängiges einbaut, muss es wie Rückblick und Vergleichssatz über `setOutroBestaetigt()` schalten.
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
moodOf(c)           // → { emoji, icon, word, next } (siehe MOODS: 4 Richtungspaare × 2 Woerter "vert"/"horiz",
                        //   + Sonderfall MOOD_BALANCED "ausgeglichen" bei Betrag < 0.15). Nur der WINKEL
                        //   entscheidet, welcher der beiden Pole eines Quadranten naeher liegt - wie weit
                        //   man zieht (Laenge) spielt bewusst keine Rolle. "next" ist Christines Formulierung
                        //   dafuer, wohin die Uebungen von genau diesem Stimmungswort aus fuehren (siehe
                        //   #recNote in §3.3) - eigenstaendiger Text pro Wort, unabhaengig von dirFromCompass.
moodHtml(c)         // → "<bild> wort" - kurze Form fuer Listen/Rueckblick ("Vorher: [Bild] ausgeglichen").
                        //   Das Wort steht IMMER klein, auch "ausgeglichen" - sonst stuende in derselben
                        //   Liste "sehr geborgen" neben "Ausgeglichen" (7. Aug. 2026).
moodIconHtml(m, kl) // → <img> mit dem Stimmungsbild. EINZIGE Stelle, an der ein Zustandsbild entsteht;
                        //   wer zurueck zu den Emoji will, ersetzt den Rumpf durch "return m.emoji;".
ICON_UNBERUEHRT     // gestrichelter Kreis - solange der Zeiger noch nicht bewegt wurde (vorher 💛)
ICON_SONNE          // Sonnenaufgang - Abschluss-Seite vor der ersten Eingabe (vorher 🌅)
MOODS[...].bullets  // zwei kurze Beobachtungen je Zustand ("viele kreisende Gedanken") - werden
                        //   auf "Für dich" (§3.3) als Auswertung angezeigt
m.stoebern          // OPTIONAL: true = an eine Lebenssituation gebunden (Schwangerschaft,
                        //   Kinder, Alltag als berufstaetige Mutter). Wird NIE von selbst
                        //   vorgeschlagen, weil der Kompass nur nach der Stimmung fragt -
                        //   in der Bibliothek aber ganz normal such- und startbar.
m.zeit              // OPTIONAL: { tage:[0..6], von:Std, bis:Std } - Zeitfenster einer Uebung.
                        //   Geprueft von passtZurZeit(). Gilt NUR, wo die App von selbst
                        //   vorschlaegt (tagesVorschlag, Kompass-Empfehlung) - in der
                        //   Bibliothek bleibt alles jederzeit auffindbar. "bis" ist nicht
                        //   mehr enthalten (20 = bis 19:59). Bisher nur "feierabend".
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

### Mudras (nur noch Datenbestand)
```js
MUDRAS[]  = { dir, name, how, why, dauer?, chakra?, silbe? }   // 21 Eintraege, Erklaerung auf Hochdeutsch
// MANTRAS[] gab es hier bis zum 4. Aug. 2026 (20 Eintraege, 5 je Richtung) -
//           komplett geloescht, siehe Entscheidungsprotokoll.
// waehlePassend(), zeigeMudra() und zeigeMantra() sind mit der Karte auf der
//           Abschluss-Seite entfallen (§3.5).
```
**Stand 4. Aug. 2026: `MUDRAS` wird nirgends mehr angezeigt.** Die Liste bleibt nur, weil der deaktivierte Begleiter sie nutzt (`findeMudra()`/`mudraSatz()`, §6a) — nicht löschen, sonst fällt der beim Reaktivieren halb aus. Der Rest dieses Abschnitts beschreibt den Datenbestand, wie er dort weiterlebt.
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

**In den Listenzeilen abgelöst (5. Aug. 2026) — Foto statt Strichzeichnung.** Christine, mit Bild der Bibliothek: *"Ich habe dir mal den Auftrag gegeben, die verschiedenen Icons auch durch Bilder zu ersetzen … die Bilder jetzt als Kategorien sehen super aus, aber dann die unteren Meditationen mit den Icons passt layouttechnisch nicht zusammen."* Seit die vier Kategorien oben als grosse **Fotokacheln** erscheinen (§3.3a), stand darunter eine Liste mit flachen, einfarbigen Linienzeichnungen — zwei Bildsprachen direkt untereinander. Jede Listenzeile zeigt jetzt ein **echtes Foto** (`rowFoto(m)` → `<img class="row-foto">`), und zwar möglichst genau das Bild, das **während dieser Meditation** im Hintergrund läuft (`m.bg`); hat eine Übung kein eigenes (17 der 47), springt das Foto ihrer Kategorie ein — dieselbe Datei wie auf der Kachel oben. Die Zeile ist damit eine echte Vorschau statt bloss einer Kategorie-Markierung; so lösen es Calm und Headspace ebenfalls.
- **Eigene Miniaturen statt der grossen Dateien:** `thumb-<familie>.jpg`, 160×160, quadratisch aus demselben `bg-<familie>.jpg` zugeschnitten (mittlere Bildhöhe; bei `herzraum` etwas tiefer, damit die Blumenwiese mit ins Bild kommt). Rund **5 KB statt 100 KB** je Bild — bei 47 Zeilen der entscheidende Unterschied. Alle acht liegen in `SHELL_FILES` (`sw.js`), sind also auch offline da. `rowFoto()` leitet den Dateinamen per `.replace("bg-", "thumb-")` ab, damit die Zuordnung nirgends doppelt gepflegt werden muss.
- **Gilt überall, wo eine Zeile eine einzelne Meditation zeigt** (G6, eine Regel an einer Stelle): Bibliothek, Kompass-Empfehlung (`medZeile()`), "Dein heutiger Fokus" (§3.1), Verlauf auf "Mein Weg" (§3.3) und die stillgelegte Lieblingsliste. `.row-thumb` hat dafür neu `overflow:hidden` — ohne das schaut das eckige Foto über die abgerundeten Ecken hinaus. Der cremefarbene Grund bleibt: er trägt weiterhin den Notbehelf 🧘, falls zu einer Übung gar kein Bild passt.
- **Nebenbei aufgeräumt:** Die Zeilen suchten die Übung hinter einem gespeicherten Namen bisher zweimal (`dirVonName()` **und** `idVonName()`); jetzt einmal über **`medVonName()`**, das gleich das ganze Objekt liefert (Richtung, Nummer **und** Foto). `katIcon()`, `dirVonName()` und `idVonName()` bleiben **unbenutzt im Code stehen** ("man weiss ja nie") — wer die Strichzeichnung zurückwill, ersetzt `rowFoto(...)` wieder durch `katIcon(...)` und nimmt `overflow:hidden` heraus. Die vier `icon-*.png` bleiben in Gebrauch: auf den Fotokacheln (dort weiss aufs Bild gefiltert) und in der Filterzeile.

**Die elf Stimmungsbilder (7. Aug. 2026) — gezeichnet statt Emoji.** Zweiter Satz Bilder derselben Familie, diesmal für die *Stimmungen* statt für die Kategorien. Christine hat sie über den Auftrag in `Icon-Prompts.md` einzeln erstellen lassen; ich habe sie hier aufbereitet und eingebaut.

- **Warum überhaupt:** Ein Emoji wird nicht von der App gezeichnet, sondern vom Gerät — auf dem iPhone bunt und glänzend, anderswo anders. Neben den goldbraunen Linienzeichnungen der Kategorien war das der letzte sichtbare Stilbruch.
- **Die elf:** `icon-ausgeglichen` (zwei Kreise auf einer Linie), `icon-gruebelnd` (verschlungene Schleifen), `icon-angespannt` (gespannter Bogen), `icon-gedankenvoll` (Wolke), `icon-gelassen` (Kreis über einer Linie), `icon-aufgewuehlt` (drei Wellen, unten gezackt, oben fast glatt), `icon-unruhig` (zackige Linie), `icon-geborgen` (Figur mit umfassenden Armen), `icon-entspannt` (kleiner Kreis über sanfter Welle), `icon-unberuehrt` (gestrichelter Kreis) und `icon-sonnenaufgang` (Sonne über Wellen). Alle 240×240 mit durchsichtigem Hintergrund; die 1024er-Fassungen liegen unter `icons-original/`, falls je grösser gebraucht wird.
- **Aufbereitung (immer gleich, für jedes eingehende Bild):** schwaches Leuchten am Rand wegnehmen (Alpha < 60 → 0), auf das Motiv zuschneiden — mit **harter Schwelle** (`alpha.point(v>90).getbbox()`), weil ein einfaches `getbbox()` den Schimmer mitfängt und dann viel zu weit zuschneidet — quadratisch mit rund 19 % Luft zentrieren, auf 240 px verkleinern.
- **Zwei Abweichungen nachbearbeitet:** Das Wellen-Bild kam in einem deutlich röteren Braun (#804000 statt der #806030–#907030 der anderen zehn) und wurde flächig auf den Familienton `#8A6A2F` umgefärbt (RGB ersetzt, Alpha behalten — die weichen Kanten bleiben). Weil sein Motiv **flach und breit** ist (402×209), füllt es 80 % der Bildbreite statt der 62 % der runden Motive; sonst hätte es in der Zeile deutlich weniger Gewicht als etwa die Wolke.
- **Wo sie erscheinen:** im runden Feld neben dem Kompass (`.readout-card .glyph img`, 30 px, damit der helle Ring als Rahmen sichtbar bleibt — genau wie vorher beim Emoji), im gleichen Feld auf der Abschluss-Seite, und mitten im Text als `.mood-icon` (20 px, `vertical-align:-4px`) in den Vorher/Nachher-Zeilen der Insel-Woche und im Rückblick.
- **Nicht bei jedem Zug neu setzen:** `renderMoodStatus()` tauscht die Bildquelle nur, wenn sie sich wirklich ändert — sonst flackert das Bild beim Ziehen der Nadel bei jedem Schritt neu.
- **Zurück zu den Emoji** ("man weiss ja nie"): Jeder Zustand trägt weiterhin sein `emoji` **neben** dem `icon`. In `moodIconHtml()` den Rumpf durch `return m.emoji;` ersetzen — das reicht für alle Stellen.
- Alle elf liegen in `SHELL_FILES` (`sw.js`), sind also auch ohne Verbindung da.

**Alle übrigen Symbole (8. Aug. 2026) — die App ist emoji-frei.** Mit der letzten Lieferung waren alle 39 Motive beisammen. Eingebaut wurden die vier verbliebenen Gruppen in einem Zug — Gruppen werden **nie** halb umgestellt, sonst stünden gezeichnete Bilder und Emoji nebeneinander (genau der Stilbruch, den das Ganze beseitigen sollte).

| Gruppe | Wo | Wie umgesetzt |
|---|---|---|
| Inselreise (5) | `STUFEN` — Boot, Anker, Kompassrose, Palme, Insel | `icon` ist jetzt ein Dateiname; `stufenBild()` baut daraus das `<img>`, einmal als `.journey-bild` (28 px im 46-px-Kreis) und einmal als `.stufe-bild` (in em, inline in der Detailzeile) |
| Einstellungs-Liste (8) | die Menüzeilen im Profil und unter „Über die App" | `.menu-row .row-icon img` mit festen 22 px, damit die Zeilenhöhe unverändert bleibt |
| Insel gestalten (8) | Wetter, Meer, Charakter, Ankunft | `.opt-bild` in em, damit es mit der Schrift der Auswahlzeile mitwächst; dieselbe Klasse trägt auch die Überschrift der Seite |
| Profilbild (8) | die Auswahl hinter dem Bild in der Profilkarte | `AVATAR_ZEICHEN` enthält Dateinamen; `.avatar-wahl img` auf 64 % mit `object-fit:contain` (die 100-%-`cover`-Regel darüber gilt weiter für **hochgeladene Fotos**) |

- **Alte Wahl geht nicht verloren:** Der Avatar speicherte bisher das **Zeichen selbst**. Wer schon eines gewählt hatte, hätte nach der Umstellung das Ersatzbild gesehen. `AVATAR_ALT` übersetzt den alten Wert beim Lesen still auf die neue Datei — alle acht Fälle geprüft, ebenso das Neuwählen samt Neustart.
- **Ein Nachzügler gefunden:** Eine automatische Emoji-Suche über den sichtbaren Text aller Seiten fand den Knopf „🏝️ Zur Titelseite", der in keiner der sieben Gruppen stand.
- **Was bewusst bleibt:** ★ ☆ ✎ ✓ — einfarbige Schriftzeichen, keine Emoji. Sie sehen auf jedem Gerät gleich aus und erben die Textfarbe (§3.3a, Entscheid vom 5. Aug. 2026 zum Stern).
- **Gegengeprüft:** 44 Bilddateien, alle in `sw.js`; keine im Code genannte Datei fehlt, und keine Datei liegt ungenutzt herum.

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
> Vorschlags-Gedächtnis, alles — steht in `index.html`. Nur zwei Stellen sind eingezäunt:
> (**Ausnahme, 4. Aug. 2026:** die Mantra-Fähigkeit ist ihm nachträglich gelöscht worden — er
> empfiehlt bei Reaktivierung Meditationen, Chakra-Hinweise und Mudras, aber keine Mantras.)
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
- `mudra` — wortgleicher Verweis in `MUDRAS` (das frühere Feld `mantra` ist am 4. Aug. 2026 aus allen 31 Anliegen gelöscht worden, siehe Entscheidungsprotokoll);
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
1. **Beim genauen Lesen wiederholten sich Chakra-Satz und Mantra wortgleich**, wenn zwei ähnliche Nachrichten kurz hintereinander dasselbe Anliegen trafen (z. B. "Ich bin gestresst wegen der Arbeit" und "Mein Chef nervt mich total"). Damals behoben mit **zwei Mantras je Anliegen**. **Überholt (gleicher Tag):** Mantras sind inzwischen ganz gelöscht — der Wiederholungs-Effekt betrifft heute nur noch den Chakra-Satz, der bewusst fest je Anliegen bleibt.
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
- `meds` müssen echte IDs aus `MEDITATIONS` sein, `mudra` wortgleich in `MUDRAS` — sonst verschwindet der jeweilige Teil kommentarlos.
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
13. **App-weiter Konsistenz-Check (Aug. 2026, auf Wunsch von Christine):** Alle Seiten systematisch per Screenshot durchgegangen (Splash bis Datenschutz). Ein echter, sichtbarer Treffer gefunden und behoben — der Insel-Konfigurator hatte einen kleineren Titel als der Rest der App (siehe §4). **Bewusst nicht angefasst:** die vielen, minimal unterschiedlichen `font-size`-Werte quer durchs Stylesheet (`.85rem`/`.86rem`/`.84rem` usw. für ähnliche Fliesstext-Rollen) — das sind Bruchteile eines Pixels Unterschied, für Auge und Nutzung nicht wahrnehmbar; ein Durchvereinheitlichen auf eine feste Skala wäre viel Aufwand mit hohem Risiko für neue Layout-Fehler, bei praktisch keinem sichtbaren Gewinn. **Der damals gefundene Stilbruch ist am 7. Aug. 2026 behoben:** Die Zugangs-Status-Karte in den Einstellungen (`renderStatusCard()`, §3.6) zeigte Emoji (🤍 ✅ ⏳ 🔒) für den Abo-Zustand, während die vier Kategorien schon eigene gezeichnete Icons hatten. Jetzt stehen dort vier Bilder derselben Familie — offenes Tor, Haken im Kreis, Sanduhr, Vorhängeschloss.

---


## 9. Farbumstellung auf Dämmerungsgrau (Aug. 2026)

Christines Urteil über die alte Creme-Gold-Optik: *"sieht billig aus"*. Nach vier Vorschlägen und einer Helligkeitsreihe hat sie **Dämmerungsgrau** gewählt und den Umbau ausdrücklich beauftragt (*"Stelle die Farbe um"*). Die vorherige Fassung bleibt vollständig als `alte-version.html` erhalten (siehe §8).

**Die Palette** steht weiterhin in `:root`, die **Variablennamen sind absichtlich unverändert geblieben** (`--cream`, `--gold`), weil sie an über tausend Stellen benutzt werden; `--cream` heisst jetzt schlicht "der Untergrund", `--gold` "die Akzentfarbe".

| Variable | vorher | jetzt |
|---|---|---|
| `--cream` | `#fbecd2` | `#5f5966` |
| `--cream-2` | `#f3ddac` | `#756e7c` |
| `--card` | `#ffffff` | `rgba(0,0,0,.16)` |
| `--ink` | `#1c3b33` | `#f7f4f8` |
| `--ink-soft` | `#4a6158` | `#ded7e4` |
| `--gold` | `#c9a227` | `#f0d3a8` |
| `--gold-soft` | `#e3c86a` | `#f6e0c4` |
| `--gold-deep` | `#8f6f22` | `#efd2ab` |
| `--deep` | `#14332c` | `#2b2731` |
| `--line` | `#e8ddc6` | `rgba(255,255,255,.16)` |
| `--dial` | — | `#332e38` (neu) |

**Karten sind dunkler als der Untergrund, nicht heller.** Das ist der wichtigste Punkt und war eine Messentscheidung, keine Geschmacksfrage: Mit hellen Karten (`rgba(255,255,255,.10)`) erreicht der Haupttext nur 4,59 und der Zweittext nur 3,57 — unter der Schwelle von 4,5. Mit dunklen Karten (`rgba(0,0,0,.16)`) sind es **7,64 und 5,93**. Wer die Karten je wieder aufhellen will, muss vorher die Textfarben neu rechnen.

**`--dial` ist neu und muss dunkel bleiben.** Die vier Kompasswörter liegen auf dem hellen Inselfoto, nicht auf dem Untergrund. Im ersten Anlauf waren sie an `--ink` gehängt und mit der Umstellung praktisch unsichtbar (Lesbarkeitswert **1,02** statt 11,35). Deshalb hängen sie jetzt an einer eigenen Variablen, die von der Umstellung hell/dunkel unberührt bleibt.

**Die 43 gezeichneten Symbole sind eingefärbt, nicht neu gezeichnet.** Sie sind einfarbige Strichzeichnungen auf durchsichtigem Grund (Farbstreuung 0 bis 3) — es liess sich also einfach der Farbwert tauschen, während der Alphakanal unverändert blieb. Goldbraun `rgb(139,107,47)` hatte auf dem neuen Untergrund den Wert **1,14** (unsichtbar), das neue Cremeweiss `rgb(240,226,205)` hat **4,41**. Die goldbraunen Originale liegen vollständig in **`icons-gold/`**. `icon-180.png` ist bewusst ausgenommen — das ist das App-Symbol auf dem Homebildschirm.

**Symbole auf der Akzentfläche werden per Filter zurückgedunkelt.** Ein helles Symbol auf einem aktiven, apricotfarbenen Chip wäre wieder unsichtbar. Statt zweiter Bilddateien greift dort `filter:brightness(.24) saturate(.4)` (aktive Auswahl, aktive Chips, erledigte Wochentage, Symbole in Akzentknöpfen). Möglich nur, weil die Symbole einfarbig sind — bei mehrfarbigen Bildern würde dieser Trick nicht funktionieren.

**Weitere Stellen, die einzeln nachgezogen werden mussten** (die reine Variablenumstellung reicht nicht):
- Die Tab-Leiste hatte ihre Hintergrundfarbe fest verdrahtet (`rgba(255,253,247,.97)`) und blieb cremefarben, während der Rest schon grau war — jetzt `rgba(56,51,62,.97)`.
- Alle dunkelgrünen Verläufe und Schleier der Titelseite und der laufenden Meditation (`rgba(18,38,31,…)`, `rgba(20,51,44,…)`, `rgba(16,28,24,…)`, `rgba(20,40,34,…)`) legten einen Grünstich über die Fotos — auf Violettgrau umgestellt.
- Grünliche Schatten `rgba(28,59,51,…)` (13 Stellen) auf neutrales Schwarz.
- Helle Flächen einzeln: Anmeldefelder `#fbf9f3`, Chat-Eingabe und KI-Blasen `#fffdf7`, ausgewählte Optionen `#fdf8ea`, Symbolkacheln `#fdf3d6`, Wochen- und Reisekreise.
- Warnrot `#a33b2c` war auf dunklem Grund zu dunkel — aufgehellt auf `#f0968a`, der Knopf selbst auf `#c2503f`.
- `.rose-hub-dot` hing an `--gold-deep`; da dieser für Text aufgehellt wurde, hätte der Punkt auf der hellen Scheibe verschwunden — jetzt fest `#8a6f4e`.
- `theme-color` in `index.html` und `background_color`/`theme_color` in `manifest.json` auf `#5f5966`, sonst zeigt iOS beim Start noch den alten Cremeton.

**Absichtlich unverändert:** Text auf der Akzentfläche bleibt `#3a2e08` (dunkelbraun auf Apricot, guter Kontrast); die Kompassscheibe selbst mit Ring, Nadel und Nabe; der Insel-Konfigurator mit seiner eigenen, bunten Bildwelt; alle Fotos.

---

## 8. Sicherungskopie der Gold-Fassung (`alte-version.html`)

Vor dem geplanten Farb-Umbau (weg von Creme/Gold hin zu **Dämmerungsgrau**, siehe Entscheidungsprotokoll) wurde die vollständige bisherige Fassung als **`alte-version.html`** im obersten Ordner abgelegt — auf ausdrücklichen Wunsch von Christine ("behalte die alte App-Version, damit ich diese wieder nehmen kann, wenn nötig").

Es ist eine **wortwörtliche Kopie von `index.html`** (Stand `2026-08-10.96`) mit genau zwei Abweichungen:

1. Der `<title>` heisst `My Meditation Island - fruehere Fassung (Gold)`, damit die beiden Fassungen im Browser-Tab unterscheidbar sind.
2. Die Registrierung des Service Workers ist mit `if (false && "serviceWorker" in navigator)` **abgeschaltet**. Das ist wichtig: Ohne diese Sperre würde das Öffnen der Sicherungskopie denselben Service Worker unter demselben Scope registrieren und dessen Shell-Cache anfassen — die Sicherungskopie könnte also die laufende App stören. So ist sie eine reine, für sich stehende Seite.

Erreichbar unter <https://burton58.github.io/MyMeditationIsland/alte-version.html>. Die Datei ist **bewusst nicht** in `SHELL_FILES` von `sw.js` eingetragen — sie wird selten gebraucht und soll den Offline-Speicher der eigentlichen App nicht vergrössern; der Service Worker holt sie im Netzbetrieb ohnehin live.

**Wenn zurückgewechselt werden soll:** Inhalt von `alte-version.html` nach `index.html` kopieren, dabei die beiden obigen Abweichungen wieder rückgängig machen (Titel und Service-Worker-Zeile), und `AKTUELLE_VERSION` sowie `CACHE_NAME` in `sw.js` hochzählen, damit die Handys die zurückgesetzte Fassung auch wirklich laden. Die Kopie **nicht** löschen, wenn der Umbau gelungen ist — sie kostet nichts und Christines Regel lautet: aufheben, nicht wegwerfen.


### Abendbild ausgetauscht (Aug. 2026)

Christine hat gemeldet, die Tageszeit-Bilder auf der Startseite wirkten unscharf. Nachgemessen (99,5.-Perzentil des Laplace-Betrags, also der schärfste Bildinhalt statt des Mittelwerts — bei glatten Motiven wie Meer und Himmel gibt der Mittelwert falschen Alarm) traf das nur auf zwei von vier zu: `start-morgen.jpg` 226 und `start-tag.jpg` 139 sind scharf, `start-abend.jpg` lag bei **52**.

**Ursache:** Die Quelldatei war nur **564x674** gross und wurde auf 1008x707 hochgerechnet — fast das Doppelte. Vergrössern erzeugt keine Details, es macht weich. Auf dem iPhone ist der Bildplatz rund 1200 Geräte-Pixel breit, das Bild hatte real 564.

**Behoben:** Christine hat drei Alternativen geschickt, gemessen wurde:

| Bild | Grösse | Schärfe |
|---|---|---|
| gleicher Strand, nochmals | 564x674 | 66 |
| See durch eine Fensterscheibe | 1141x696 | 47 |
| Bucht am Abend | **1170x813** | **101** |

Genommen wurde die Bucht — grösste Auflösung und doppelte Schärfe. Zugeschnitten auf das Seitenverhältnis des Platzes (720:505), leicht nachgeschärft (Unsharp Mask 1.1/70/3) und mit Qualität 90 gespeichert: **1159x813**, Schärfe **165**. Damit muss der Browser das Bild praktisch nicht mehr hochrechnen.

Die vorherige Fassung liegt als **`start-abend-alt.jpg`** daneben — nicht gelöscht, falls zurückgewechselt werden soll.

**Offen:** Auf dem Hang ist ein weisses Gebäude zu sehen. Christines frühere Regel lautete "nur Natur, keine Personen". Herausschneiden geht hier nicht ohne die Auflösung wieder zu verlieren (das Bild füllt den Platz bereits fast genau aus) — sie wurde darauf hingewiesen und entscheidet.

**Grundsatz für neue Fotos:** Bilder kommen bisher in Bildschirmfoto-Grösse an (rund 1170 Pixel breit). Das reicht für die Startseite genau, für die ganzflächige Titelseite nicht mehr komfortabel. Wer ein Bild ersetzt, misst vorher die Quellgrösse — alles unter 1100 Pixel Breite wird auf dem iPhone sichtbar weich.

### Nachtbild ausgetauscht (Aug. 2026)

Das bisherige Nachtbild war ein **erzeugtes Bild** (Nordlicht über einer Fjordlandschaft, 1024x1024, aus einem Bildgenerator) — es widersprach Christines Grundsatz "keine unechten Fotos" und zeigte ausserdem Norwegen statt einer Insel. Ersetzt durch **ihr eigenes Foto** eines Strandes zur blauen Stunde mit Palmen am rechten Rand.

Nüchtern zum Abwägen, weil der Tausch technisch ein Rückschritt ist:

| | erzeugtes Nordlicht | ihr Strandfoto |
|---|---|---|
| Grösse | 1024x1024 | 1065x639 |
| nutzbare Breite nach Zuschnitt | 1008 | 911 |
| Schärfe | 54 | 21 |
| echt | nein | ja |
| passt zum Inselthema | nein | ja |

Der Schärfewert von 21 ist bei einer Nachtaufnahme weniger schlimm, als er klingt: Es gibt dort kaum feine Strukturen, die verloren gehen könnten, und Handy-Nachtaufnahmen rauschen ohnehin. Deshalb wurde **bewusst nur sanft nachgeschärft** (Unsharp Mask 0.8/45/4 statt 1.1/70/3 wie beim Abendbild) — stärkeres Schärfen würde vor allem das Rauschen hervorholen. Zusätzlich Gamma 0.86, um die Schatten leicht zu öffnen, und **rechts angeschlagen zugeschnitten** statt mittig, damit die Palmen im Bild bleiben.

Die vorherige Fassung liegt als **`start-nacht-alt.jpg`** daneben.

Ebenfalls geprüft und **nicht genommen** (beide hochkant, dadurch nach Zuschnitt auf das breite Format zu wenig nutzbare Breite): Sonnenuntergang über dem See, 783 Pixel nutzbar; Meer mit Steinen, 720 Pixel nutzbar. Für den breiten Platz auf der Startseite braucht es rund 1200.
### Kompass bleibt ein Foto

Zur Klarstellung, weil in der Farb-Vorschau zwischenzeitlich eine gezeichnete Verlaufsscheibe und danach eine gezeichnete Insel vorgeschlagen wurde: **Beides ist abgelehnt.** Christines Entscheid (Aug. 2026): *"Falsch, nichts zeichnen"* — der Kompass behält das vorhandene Inselbild in `.compass-photo` (das von ihr über ChatGPT erzeugte Foto, als base64 in `index.html`). Auch im neuen Farbschema wird an der Scheibe selbst nichts geändert; grau wird nur der Rand ringsum.

---

## 10. Startseite umgebaut: Vorlage A, Favoriten, neues Tagesfoto (17. Aug. 2026)

Christine hat aus drei Vorlagen gewählt (siehe Farb-Vorschau-Verlauf): **Vorlage A** — das Foto liegt als schmaler Streifen oben, die Begrüssung steht direkt darauf statt darüber. Umgesetzt in `index.html`, nicht mehr nur als Vorschau.

**`.home-band`** ersetzt den alten `.home-hero-photo`-Vollbild-Aufbau. `#homeHeroBtn`/`#homeHeroBild`/`#greeting`/`#homeProfilBtn` behalten bewusst ihre IDs — `renderHome()` und `tageszeitBild()` greifen unverändert, nur die CSS-Hülle und die Position der Begrüssung sind neu. Wichtigste Änderungen:
- Seitenverhältnis des Fotos von `720:505` (1,43:1, "ganzes Bild sichtbar") auf `21:8` (2,63:1, "schmaler Streifen") — dadurch **`object-fit:cover` statt `contain`**: Bei diesem Verhältnis fällt oben/unten zwangsläufig etwas weg, das ist bei einem Streifen so gewollt.
- `object-position:50% 56%` hält den Horizont aller vier Tageszeit-Fotos im sichtbaren Ausschnitt (per Screenshot für alle vier geprüft, siehe unten).
- Ein Schleier (`.home-band-schleier`, Verlauf nur im unteren Drittel) sorgt für Lesbarkeit der weissen Schrift, ohne die Fotos insgesamt abzudunkeln.
- Das Profil-Symbol (`#homeProfilBtn`) sitzt jetzt als abgedunkelter Kreis oben rechts auf dem Foto statt daneben.

**Geprüft mit echtem Playwright-Browser, nicht nur am Code abgelesen:** alle vier Tageszeiten (`page.clock.install()` mit fester Uhrzeit statt Warten), mit und ohne gesetzte Favoriten, mit einer offenen ("Weiterhören") Meditation gleichzeitig, Klick auf den Streifen (→ Titelseite) und auf das Profil-Symbol (→ "Mein Weg") — alle vier Bilder korrekt, Text in allen vier lesbar, beide Klickziele funktionieren.

### Neu: "Meine Favoriten" auf der Startseite

Bisher standen die per Stern markierten Übungen nur in der Bibliothek. Neuer Abschnitt `#favSection`/`#favSlot`, gefüllt von der neuen Funktion `renderHomeFavoriten()` (aufgerufen am Ende von `renderHome()`). Nutzt das bestehende `favoriten`-Array (`FAV_KEY`) — kein neuer Speicherplatz. Neueste zuerst (`.slice().reverse()`, da `toggleFavorit()` neue ans Ende anhängt), **höchstens vier** — dieselbe Grenze wie beim früheren "Heute gehört", damit die Startseite nicht wieder zur Liste wird. **Ohne jeden Favoriten bleibt der ganze Abschnitt inklusive Überschrift unsichtbar** (`wrap.hidden = !meds.length`) — geprüft, dass dabei keine Lücke entsteht.

Reihenfolge auf der Seite von oben: Foto-Streifen mit Begrüssung → Vorschlag nach Tageszeit → "Willst du weiterhören?" (falls offen) → Meine Favoriten (falls vorhanden) → Meine Stimmung.

### Richtigstellung: "Weiterhören" gab es schon

In einer früheren Antwort wurde behauptet, die App merke sich nur, was fertig gehört wurde, nicht die Stelle — das war **falsch** und wurde Christine so auch gesagt, ohne es vorher am echten Code zu prüfen. Tatsächlich existiert die Funktion bereits seit einer früheren Sitzung vollständig: `sichereStand()` schreibt Sekunde und Verlaufseintrag fort, ausgelöst über den Zurück-Knopf (mit Rückfrage) und über `visibilitychange` (App wird auf dem iPhone weggelegt). `ladeOffen()`/`speichereOffen()`/`loescheOffen()` verwalten den Stand unter `OFFEN_KEY`, `setzeMeditationFort()` setzt `fortsetzenSek`, das `loadQueueItem()` beim ersten Stück der neuen Sitzung übernimmt. **Mit einem echten Playwright-Test verifiziert** (nicht nur am Code abgelesen): Meditation 25 Sekunden laufen lassen, App-Wechsel simulieren (`visibilitychange` auf "hidden"), Seite neu laden, "Weitermachen" antippen — die Anzeige beginnt exakt bei `0:25 / 6:00`, nicht bei `0:00`. Am Verhalten selbst hat sich durch den heutigen Umbau nichts geändert, nur die Umgebung darum (jetzt unter "Meine Favoriten" statt darüber).

### Neues Tagesfoto, mit einem offenen Punkt

`start-tag.jpg` ersetzt (bisher: brechende Welle) durch Christines neues Foto (heller blauer Himmel, Strand, Palmen rechts, Originalgrösse 1567×1004). **Offen gelassene Qualitätsfrage:** Das rohe Foto hat schon ungeschärft eine auffällig geringere Schärfe (46) als das bisherige Tagesbild (139) — das liegt nicht an der Verkleinerung (die Quelle ist grösser als gebraucht, es wird nicht hochgerechnet), sondern am Foto selbst (leichter Dunst/weicher Fokus). Auch mit kräftigem Nachschärfen (Unsharp Mask 1.2/120/2, stärker als bei jedem anderen Tagesfoto) erreicht es nur 91 — spürbar unter dem alten Wert. Bewusst nicht stärker nachgeschärft, um keine sichtbaren Halos zu erzeugen. Christine wurde das mitgeteilt; falls es ihr beim Ansehen zu weich vorkommt, liegt die Ursache im Ausgangsfoto, nicht in der Bearbeitung. **Nachgebessert (18. Aug. 2026):** Die Schaerfe-Karte des Rohbilds geprueft (99,5.-Perzentil in 505px-Streifen von oben nach unten) - sie ist ueber die ganze nutzbare Hoehe praktisch flach (~55), es gibt also keine schaerfere Stelle im Foto, die ein anderer Ausschnitt haette treffen koennen. Die Nachschaerfung darum leicht erhoeht (Unsharp Mask 1.1/140/2 statt 1.2/120/2) - 96 statt 91, ohne sichtbare Ecken/Halos (per Ausschnittsvergroesserung an der Wasserlinie geprueft, der kritischsten Stelle). Bleibt unter dem alten Bild (139), das ist die Grenze dessen, was am Foto selbst noch zu holen ist.

`start-abend.jpg` **bewusst nicht angerührt** ("Für den Abend – gleich") — bleibt das Buchtfoto vom 15. Aug. Das zweite an diesem Tag geschickte Foto (blasser Dämmerungsstrand, `4C94F76E…`) wurde **nicht verwendet** — unklar, wofür es gedacht war, da "gleich" für den Abend stand; liegt in den Uploads bereit, falls Christine es doch irgendwo will.

### Kompass unverändert

Auf Christines Nachfrage geprüft und bestätigt: Der Kompass zeigt in jeder Situation (kleine Version auf der Startseite, grosse Version auf der Kompass-Seite, Abschluss-Kompass) **dasselbe fest eingebettete Foto** aus `.compass-photo` — keine Zeitabhängigkeit, kein Wechsel, war nie Teil der Tageszeit-Logik. Am Code musste dafür nichts geändert werden.


### Entscheidung ohne Rueckfrage nachgeholt (18. Aug. 2026)

Christine: *"Jetzt kannst du alles weitermachen, was seit Sonntag offen ist."* Zwei Punkte standen aus einer frueheren Antwort noch offen, ohne dass sie sich dazu geaeussert hatte - hier selbst entschieden statt weiter zu warten:

- **Das Gebaeude auf dem Huegel im Abendbild** (`start-abend.jpg`) bleibt. Es ist klein, am Rand, weit entfernt und nicht das Motiv des Fotos (das ist die Bucht) - anders als z. B. ein Foto, das eine Person oder ein Gebaeude zeigt. Herausschneiden ist weiterhin nicht moeglich, ohne die Aufloesung zu verlieren (siehe oben, "Abendbild ausgetauscht").
- **Das zweite, ungenutzte Foto** vom 17. Aug. (blasser Daemmerungsstrand) bleibt unverwendet liegen - es gibt keine Vorgabe, wofuer es gedacht war. Wird bei Bedarf spaeter zugewiesen.
---

## 11. Dämmerungsgrau abgelöst durch "Dusk Denim" (18. Aug. 2026)

Christine, zum Grau vom Vortag: *"Alles hässlich, sieht so traurig aus."* Gefragt war eine objektiv andere Richtung als Calm/Balance (beides etablierte, blaue bzw. dunkelblau-orange Konkurrenz-Apps). Sechs Kandidaten gebaut und mit echten Screenshots direkt in der App verglichen (nicht nur als Farbmuster): Charcoal Brown, Dark Amethyst, Tiefsee-Petrol, Dusk Denim, Deep Sapphire, Cobalt. Rangfolge nach Eigenständigkeit ging an Charcoal Brown vor Tiefsee-Petrol — Christines Entscheid fiel trotzdem auf **Blau**, weil ihr Grün nicht gefällt und sie ausdrücklich Blau wollte. Innerhalb der drei Blautöne war **Dusk Denim** die Empfehlung (am wenigsten "Standard-App-Blau", weil eingetrübt statt leuchtend) statt Deep Sapphire (am nächsten an einem gewöhnlichen dunklen App-Blau) oder Cobalt (am gesättigsten, dadurch am ehesten wiedererkennbar als "irgendeine Blau-App"). Christine: *"Bau Dusk Denim um."*

Reine Farbvariable-Umstellung, keine Struktur geändert — dieselben zehn Token wie beim Wechsel zu Dämmerungsgrau (§9), nur andere Werte:

| Variable | Dämmerungsgrau | Dusk Denim |
|---|---|---|
| `--cream` | `#5f5966` | `#33404f` |
| `--cream-2` | `#756e7c` | `#465667` |
| `--ink` | `#f7f4f8` | `#f3f6fa` |
| `--ink-soft` | `#ded7e4` | `#ccd6e0` |
| `--deep` | `#2b2731` | `#151c24` |
| `--dial` | `#332e38` | `#202a34` |

`--gold`/`--gold-soft`/`--gold-deep`/`--card`/`--line` **unverändert** — Kontrast gegen die neuen Grundtöne vorher nachgerechnet (Gold auf `--cream`: 7,34 : 1, auf `--cream-2`: 5,23 : 1, beide über der 4,5-Schwelle), keine Anpassung nötig. Zusätzlich `<meta name="theme-color">` in `index.html` und `background_color`/`theme_color` in `manifest.json` auf `#33404f` gesetzt, sonst zeigt iOS beim Start kurz noch Grau.

**Vor dem Speichern alle zehn Seiten einzeln als Screenshot geprüft** (Titelseite, Startseite, Kompass, Bibliothek, Mein Weg, Einstellungen, Abo, Anmelden, Über mich, Insel-Konfigurator, Abschluss-Kompass) — nirgends ein Kontrast- oder Farbbruch gefunden, die 43 gezeichneten Symbole (aus §9 bereits hell eingefärbt) und der Insel-Konfigurator (eigene, bunte Bildwelt, absichtlich unverändert) sehen unverändert richtig aus.

Die vorherige Fassung (Gold/Creme, Stand 10. Aug.) bleibt weiterhin unter `alte-version.html` erreichbar (§8) — Dämmerungsgrau selbst wurde nirgends separat gesichert, war nur einen Tag lang live und ist über die normale Versionsgeschichte rekonstruierbar, falls je nötig.


### Startseiten-Foto bündig an der Oberkante (18. Aug. 2026)

Christine: *"Und bei Startseite das Bild ganz oben sein ohne Farbe."* Über dem Streifenfoto stand bisher ein schmaler Streifen Hintergrundfarbe — der kam vom `padding:18px` der allgemeinen `.page`-Regel, nicht vom Band selbst. Neue Regel `.home-page{ padding-top:0; }` direkt nach `.page` (gleiche Spezifität, steht später, gewinnt dadurch). **Bewusst nur auf der Startseite** — auf allen anderen Seiten ist der Abstand über der Überschrift richtig und bleibt.

Weil das Foto damit bis an die oberste Bildschirmkante läuft, rechnet `.home-band-profil` (das Personen-Symbol oben rechts) jetzt `env(safe-area-inset-top)` mit ein — sonst läge es auf einem iPhone im Standalone-Modus unter der Uhrzeit. Auf Geräten ohne Notch ist der Wert 0, dort ändert sich nichts.

Mit echtem Browser nachgemessen statt nach Augenmass: Oberkante des Fotos bei `y = 0`, Kompass-Seite unverändert bei `y = 18`.


## 12. "Meerestiefe": Verlauf statt Flaeche, plus Feinschliff der Startseite (18. Aug. 2026)

Nach Dusk Denim (§11) wollte Christine mehr Blau. Sechs weitere Kandidaten gebaut und im Browser verglichen (Tintenblau, Indigo-Nacht, Azur-Nacht, Lapis, Meerestiefe, Ozean, Tech-Blau). Ihr Einwand zu Tintenblau war berechtigt und wurde bestaetigt: dunkles Marineblau **plus warmer Akzent** ist genau die Kombination von Balance — das eigene "aber unser Gold unterscheidet uns"-Argument zieht dort also kaum. Entschieden wurde **E · Meerestiefe**.

**Der Unterschied ist nicht der Farbton, sondern der Aufbau:** Statt einer flaechigen Hintergrundfarbe (die sowohl Calm als auch Balance benutzen) laeuft der Untergrund jetzt als **sichtbarer Verlauf** von einem tiefen Marineblau oben (`#16304f`) zu einem offenen Blau unten (`#2b5b90`) — "von der Tiefe zur Oberflaeche". Das ist eine strukturelle Unterscheidung, keine Geschmacksfrage, und laesst sich nicht mit "sieht aus wie" abtun.

Nicht genommen und warum: **Ozean** (helles Meerblau) faellt beim Kontrast durch — Gold darauf nur **3,9:1**, unter der 4,5-Schwelle; ausserdem von allen Kandidaten am naechsten an Calm. **Tech-Blau** ist zwar eigenstaendig und kontraststark, aber elektrisch leuchtende Blautoene signalisieren Technik und Aufmerksamkeit — das arbeitet gegen den Zweck einer Meditations-App.

### Der Balken ganz unten (Christine gemeldet)

`.tabbar` hatte seine Hintergrundfarbe seit §9 **fest verdrahtet** auf `rgba(56,51,62,.97)` — ein Grauviolett aus der Daemmerungsgrau-Zeit. Es ueberlebte damit unbemerkt den ganzen Wechsel zu Dusk Denim, weil es an keiner Variablen haengt. Die Tab-Beschriftung war sogar noch `#9aaaa2`, ein Graugruen aus der Gold-Zeit davor. Beides jetzt blau (`rgba(10,26,44,.97)` / `#9fb3c9`). **Lehre:** Bei einem Farbwechsel reicht es nicht, die Variablen zu tauschen — nach fest verdrahteten Farbwerten suchen, besonders bei Elementen, die auf jeder Seite mitlaufen und deshalb beim Durchklicken nicht auffallen.

Ebenfalls jetzt ueber die Variable statt fest verdrahtet: der zweite Farbstopp des Body-Verlaufs (`var(--cream-2)` statt eines Literals) — Voraussetzung fuer die Seitentoene unten.

### Jede Seite ein eigener Blauton (Christines Idee)

Vier Nuancen desselben Blaus, gesetzt ueber `body[data-step="…"]` mit Ueberschreibung nur von `--cream`/`--cream-2`:

| Seite | oben | unten | Charakter |
|---|---|---|---|
| Startseite | `#16304f` | `#2b5b90` | Grundton |
| Kompass | `#172d55` | `#2c5796` | eine Spur tiefer |
| Meditationen | `#153651` | `#2b5c90` | eine Spur offener |
| Mein Weg | `#172c46` | `#294f83` | ruhiger, dunkler |

**Bewusst nur eine Nuance** — man soll es beim Wechseln spueren, ohne dass es wie vier verschiedene Apps wirkt. Alles andere (Karten, Gold, Linien, Schrift) bleibt identisch, dadurch kann nichts auseinanderlaufen. **Alle vier Paare sind auf Lesbarkeit nachgerechnet**; "Meditationen" lag im ersten Anlauf mit einem helleren Unterton bei **4,21:1** und fiel durch — nachgedunkelt auf 4,58. Wer einen Ton aufhellt, muss vorher rechnen.

### Feinschliff der Startseite

Alles auf Christines Rueckmeldung zum ersten Entwurf von Vorlage A:
- **Foto groesser**: Seitenverhaeltnis von `21:8` (sehr flacher Streifen) auf `16:9` — auf einem 402px breiten Bildschirm 226px hoch statt 153px.
- **Begruessung zurueckhaltender** ("Guten Abend nicht so prominent"): `1.42rem` fett auf **`1.12rem` normal**, Untertitel `.85rem` auf `.78rem`.
- **Titel nicht mehr so eng am Bildrand**: Abstand nach unten von 12px auf 18px.
- **Mehr Luft zwischen den Bloecken**: Abstand ueber den Zwischentiteln von 28px auf **34px**, zwischen Titel und Karte von 6px auf 12px; Abstand Foto zum ersten Titel jetzt 24px.

Mit echtem Browser nachgemessen statt nach Augenmass, und im Vollzustand geprueft (Vorschlag + "Willst du weiterhoeren?" + Favoriten + Stimmung gleichzeitig sichtbar).


### Titelfoto leicht ins Blaue gezogen (18. Aug. 2026)

Christine: *"Kann man das erste Bild Titelseite ein wenig mehr Blau reinnehmen?"* — damit es zum neuen blauen Untergrund passt. **Nicht** ueber einen CSS-Schleier geloest (das haette das ganze Bild flach und diesig gemacht), sondern als echte Farbkorrektur im Bild.

Verfahren: Blau und etwas Gruen anheben, Rot leicht zuruecknehmen — aber **nur ueber eine Helligkeitsmaske** `(1 - L)` hoch `1.2`, also nur in den dunklen und mittleren Toenen. Die Sonne und der helle Himmel bleiben dadurch warm; ohne die Maske sieht es aus wie ein aufgelegter Farbfilter statt wie Abendlicht. Mittelwerte R/G/B: vorher `134/128/125` (leicht warm), jetzt `129/132/136` (leicht kuehl).

Zwei Staerken gebaut und im Browser verglichen. Zuerst **leicht** (0.10) eingebaut, weil Christine "ein wenig" gesagt hatte — nach dem Vergleich der drei Fassungen hat sie sich fuer **mittel** (0.18) entschieden, das jetzt eingebaut ist: Mittelwerte `125/135/145` statt `134/128/125`, vor allem der Sand wird sichtbar kuehl, Sonne und heller Himmel bleiben auch hier warm. Das Original liegt unveraendert als **`titel-alt.jpg`** daneben.


## 13. Akzentfarbe: Gold abgeloest durch "Perle" (18. Aug. 2026)

Christine: *"Der Goldton von Schriften etc. passt auch nicht, und Icon etc. passt Gold gar nicht."* Sie hat recht, und zwar aus einem Grund, der vorher schon einmal selbst genannt worden war: **dunkles Marineblau plus warmes Gold ist genau die Kombination von Balance.** Solange der Untergrund grau war, fiel das nicht auf; auf Blau ist es der Kern der Signatur eines Konkurrenten.

Drei Alternativen gebaut und in der App verglichen:

| | Farbe | Kontrast oben / unten | Beurteilung |
|---|---|---|---|
| **Perle** | `#efe6d8` | 10,82 / 5,66 | warmes Cremeweiss, behaelt die Waerme ohne das Metallische |
| Altrosa | `#efd0c6` | 9,24 / 4,83 | am eigenstaendigsten, geht aber Richtung Spa/Kosmetik |
| Himmelblau | `#bcd6f0` | 8,93 / 4,67 | sehr ruhig, wirkt aber kuehl und technisch, Knoepfe treten zurueck |

Christines Entscheid: **Perle**. Begruendung, die dafuer sprach: Calm setzt Blau mit reinem Weiss, Balance mit Orange — ein warmes Cremeweiss liegt genau dazwischen und gehoert keinem von beiden. Praktischer Nebeneffekt: Wenn die vier Kachelbilder kuehler werden (siehe unten), bleibt Perle der einzige warme Punkt und haelt die App zusammen.

Altrosa musste vor dem Vergleich aufgehellt werden — `#e3b9ad` lag auf dem unteren Blau bei **3,93:1** und fiel damit durch; genommen wurde `#efd0c6` mit 4,83.

**Was alles mitmusste** (die reine Token-Umstellung reicht wieder nicht):
- `--gold`/`--gold-soft`/`--gold-deep` auf Perle-Toene.
- Der dunkle Text auf der Akzentflaeche an **20 Stellen** von `#3a2e08` (Dunkelbraun) auf `#2a2a26` (neutrales Dunkelgrau) — Braun auf Cremeweiss haette wieder warm-metallisch gewirkt.
- **Kompass-Ring, Nadel und Nabe** in allen drei Kompassen (Startseite, Kompass-Seite, Abschluss): Ringverlauf `#f8ecc4/#d9b95c/#8f6f22` auf `#f8f4ec/#ddd4c4/#8c847a`, Nadel `#a8842a` auf `#857d72`, Nabenpunkt `#8a6f4e` auf `#6b645a`. **Wichtig:** Diese Teile liegen auf dem hellen Inselfoto, nicht auf dem blauen Grund — sie duerfen deshalb nicht einfach hell werden, sonst verschwinden sie. Die neuen Toene haben bewusst dieselbe Helligkeit wie die alten, nur neutral statt golden.
- Die **vier Punkte an den Polen** ausserhalb des Rings (`#c9a227`, zweimal fest im HTML) — die blieben im ersten Anlauf als einzige leuchtend gelb stehen und fielen erst im Screenshot auf.
- Goldene Schatten und Raender: `rgba(120,90,10,…)`, `rgba(90,66,8,…)` auf neutrales Dunkelblau; `rgba(201,162,39,…)`, `rgba(143,111,34,…)` auf Perle-Toene.
- `.chev` stand noch auf `#bdb4c4`, einem Grauviolett aus der Daemmerungsgrau-Zeit — jetzt `#a9b8c9`.

**Offen:** Die vier Kachelbilder der Kategorien sind weiterhin warm-orange und passen tonal nicht. Christine hat dafuer einen ChatGPT-Prompt bekommen (kuehle Blauwelt `#16304f` bis `#2b5b90`, Serie aus vier Bildern im gleichen Stil, Querformat 4:3, keine Menschen/Schrift, Motive auf Meer und Insel umgestellt statt Wald und Berge) und liefert die Bilder nach.


## 14. Kategoriebilder in der blauen Farbwelt (19. Aug. 2026)

Christine hat den Prompt aus §13 in ChatGPT gegeben und **drei** der vier Bilder geliefert (1448x1086, gemalt, gedaempftes Blau, keine Menschen/Schrift — der Prompt hat sauber funktioniert). Eingebaut als `kat-blau-nord.jpg` / `kat-blau-sued.jpg` / `kat-blau-ost.jpg`:

| Kategorie | Bild |
|---|---|
| Gedanken beruhigen (`nord`) | stilles Wasser im Nebel, Inseln am Horizont |
| Gefuehle verstehen (`sued`) | Wellen laufen an einen dunklen Strand, Kueste rechts |
| Entspannen (`ost`) | Mondspur auf dem Wasser, Inseln im Dunst |

**`LIB_KAT_FOTO` steuert drei Dinge gleichzeitig** — das ist beim Aendern die wichtigste Falle: die vier Kacheln oben in der Bibliothek, das kleine Bild in den Listenzeilen (sofern die Uebung kein eigenes `bg` hat) **und den ganzflaechigen Hintergrund waehrend der Meditation**. Letzteres betrifft die Mehrheit: nur 18 Uebungen haben ein eigenes `bg`, alle anderen zeigen das Bild ihrer Kategorie im Vollbild. Deshalb liegen die Dateien in **voller Aufloesung** (1448x1086) im Ordner und wurden nicht auf Kachelgroesse verkleinert — im Browser gegengeprueft, dass eine gestartete Uebung ohne eigenes `bg` tatsaechlich `kat-blau-nord.jpg` zieht.

Die alten `bg-*.jpg` bleiben unveraendert liegen — sie sind weiterhin der Hintergrund der 18 Uebungen mit eigenem Bild.

**Offen: "Stress loesen" (`west`) fehlt.** Das vierte Motiv (Palmwedel gegen den Daemmerungshimmel) hat ChatGPT nicht mitgeliefert. Dort steht bewusst weiterhin das alte, warme Waldbild `bg-waldlichtung.jpg` — es passt tonal sichtbar nicht, ist aber ehrlicher als eines der drei Meerbilder ein zweites Mal zu verwenden. Sobald `kat-blau-west.jpg` im Ordner liegt, ist nur diese eine Zeile in `LIB_KAT_FOTO` zu tauschen (und der Dateiname in `SHELL_FILES` von `sw.js` einzukommentieren).

**Ebenfalls aufgefallen:** Die Bilder 2 und 3 (`sued` und `ost`) sind einander recht aehnlich — beide Strand mit Brandung und Lichtspur. Sie stehen in der Kachel-Ansicht diagonal zueinander, das faellt dadurch weniger auf; falls Christine sie spaeter unterscheidbarer will, waere das ein eigener Auftrag.

**Noch nicht angefasst:** Die kleinen runden Bilder in den Listenzeilen der 18 Uebungen mit eigenem `bg` sind weiterhin warm-golden und beissen sich mit den blauen Kacheln darueber. Das waere der naechste konsequente Schritt, ist aber ein eigener Umbau (8 Hintergrundbilder) und wurde nicht bestellt.


## 15. Umfaerben statt Ersetzen: die vier Kategoriebilder (19. Aug. 2026)

Christine zu den drei blauen Meerbildern aus §14: *"Ich finde es nicht schoen, dass alle Bilder blau sind, das ist zu wenig ins Auge stechend"* und *"die Bilder sind so aehnlich, jedes Bild muss ein bisschen anders sein, vorher war's perfekt, einfach von der Farbe her nicht passend mit Blau"*. Beides trifft zu, und §14 war ein Fehlschluss meinerseits.

**Was die Recherche zu anderen Apps ergeben hat** (auf Christines ausdruecklichen Wunsch nachgeschlagen, nicht aus dem Gedaechtnis behauptet): Bei Insight Timer ist die Oberflaeche bewusst neutral gehalten, **damit die Bilder der Uebungen der farbige Blickfang sind**. Zum Abspielbildschirm wird ausdruecklich empfohlen, ihn auf die Stimmung der jeweiligen Meditation abzustimmen — in Farbe und Bewegung —, damit Nutzer sich nicht am immer gleichen Bildschirm langweilen. Headspace unterscheidet seine Bereiche ueber kraeftig verschiedene Farben. **Die Regel lautet also: der Rahmen bleibt ruhig und einfarbig, die Bilder bringen die Abwechslung.** In §14 wurde genau das Gegenteil gemacht — die Bilder wurden dem Hintergrund angeglichen.

**Ausserdem geradegeruecht:** Die Warnung "Blau plus Warm ist die Signatur von Balance" (§11/§13) gilt fuer **Bedienelemente** — Knoepfe, Schrift, Symbole. Sie gilt **nicht** fuer die Bildwelt. Warme Bilder auf blauem Grund sind kein Zitat von Balance, sondern genau der Kontrast, der der App gefehlt hat.

### Die Loesung: die alten Bilder umfaerben

Zurueck auf die vier urspruenglichen Motive, die Christine als "perfekt" bezeichnet hat — sie sind klar unterscheidbar (helle Wellen / Bluetenhuegel / Waldlichtung / stiller See), im Gegensatz zu drei Varianten desselben Strandmotivs. Statt sie zu ersetzen, wurden sie **umgefaerbt**:

1. **Das Goldgelb herausnehmen.** Ueberall dort, wo Rot deutlich ueber Blau liegt, ist das Bild warm — genau dieser Ueberschuss beisst sich mit dem blauen Untergrund. Er wird gedaempft (`gold_weg = 0.38`), nicht entfernt.
2. **Schatten Richtung App-Blau** (`#16304f`, Maske `(1-L)` hoch `1.6`, Staerke 0.30) — dadurch haben alle Bilder denselben Boden wie die App.
3. **Leicht tiefer** (Gamma 1.10) fuer die Abendstimmung.

Entscheidend: Jedes Bild behaelt seinen **eigenen Farbcharakter** — Tuerkis, Rose, Gruen, Blaugrau. Das Ergebnis ist vier klar verschiedene Bilder, die trotzdem alle zur App passen.

Angewendet auf **alle acht** `bg-*.jpg`, nicht nur die vier Kategoriebilder — die uebrigen vier sind der Hintergrund der 18 Uebungen mit eigenem `bg` und waeren sonst als einzige warm-golden geblieben. Die Ausgangsdateien liegen unveraendert in **`bilder-gold/`** (gleiches Muster wie `icons-gold/`).

**Nicht mehr in Gebrauch, aber aufgehoben:** `kat-blau-nord/sued/ost.jpg` (die drei blauen Meerbilder vom selben Tag) und `kat-*.jpg` (Christines Fotos, seit 15. Aug. ungenutzt). Beide aus `SHELL_FILES` in `sw.js` entfernt, damit der Offline-Speicher nicht unnoetig waechst.

**Lehre fuer das naechste Mal:** Bevor neue Bilder erzeugt werden, pruefen, ob eine Farbkorrektur der vorhandenen reicht. Hier hat sie vollstaendig genuegt — und sie erhaelt die Motivvielfalt, die eine neue Serie erst wieder muehsam herstellen muesste.


### Nachgebessert: zu stark entsaettigt (19. Aug. 2026)

Christine hat nach dem Umfaerben ein Bildschirmfoto vom Handy geschickt und gefragt, ob die Farben so stimmen. Nachgemessen — und das Ergebnis war ein anderes als erwartet:

- **Kein neuer Gruenstich.** Die Vermutung, das Umfaerben habe einen Olivton erzeugt, war falsch: Der Gruenueberschuss steckte schon in den Originalen (`bg-lichtraum` +14,5 vorher, +11,5 nachher; `bg-waldlichtung` +9,2 vorher, +3,6 nachher). Das Umfaerben hat ihn sogar **verringert**. Er faellt nur staerker auf, seit das Gold nicht mehr darueberliegt.
- **Aber: zu dunkel und zu blass geworden.** Die hellen Bereiche fielen von `242/220/169` auf `206/204/178` — die Bilder wirkten flau. Damit lief die Aenderung genau Christines urspruenglicher Kritik zuwider ("zu wenig ins Auge stechend").

Rezept entsprechend nachgezogen (gilt jetzt fuer alle acht `bg-*.jpg`):

| Schritt | erster Anlauf | jetzt |
|---|---|---|
| Goldgelb daempfen | 0,38 | **0,27** |
| Blau zumischen | 0,22 | 0,20 |
| Schatten Richtung App-Blau | 0,30 | 0,26 |
| Abdunkeln (Gamma) | 1,10 | **1,02** |
| Saettigung | — | **1,22** |
| Olivstich daempfen | — | **0,45** |

Der Saettigungs-Schritt ist noetig, weil das Herausnehmen des Warmanteils zwangslaeufig Farbe mitnimmt — ohne Ausgleich werden die Bilder grau. Der Oliv-Schritt daempft gezielt den Gruenueberschuss (dort, wo Gruen ueber dem Mittel von Rot und Blau liegt), der in den Originalen vom goldenen Licht ueberdeckt war.

**Lehre:** Beim Entfernen eines Farbstichs immer gegenpruefen, was dabei an Helligkeit und Saettigung verlorengeht — sonst loest man ein Farbproblem und schafft ein Flauheitsproblem. Und: erst messen, dann urteilen; der vermutete Gruenstich stammte nicht aus der Bearbeitung.


## 16. Titelbild in Christines Blau, per Farbuebertragung (20. Aug. 2026)

Christine hat eine eigene, kraeftig blau eingefaerbte Fassung des Titelfotos geschickt (Mittelwert `57/98/167`) und gefragt, ob das besser passt. Gemessen: **ja** — dieser Ton liegt praktisch in der Blaufamilie der App (unterer Grundton `#2b5b90` = `43/91/144`), waehrend die bisherige Fassung mit `125/135/145` nur leicht kuehl war.

**Ihre Datei konnte aber nicht direkt verwendet werden:** Sie ist **quer** (1540x1021), die Titelseite ist ganzflaechig **hochkant**. Beim Vollbild-Zuschnitt blieben von 1540 Pixeln Breite nur **470** uebrig, die auf rund 1200 Geraetepixel hochgerechnet werden muessten — Faktor 2,6, sichtbar weich. Zum Vergleich: das hochkant-Original braucht nur Faktor 1,5.

**Loesung: Farbuebertragung statt Bildtausch.** Aus ihrer blauen Fassung wurde gelernt, welche Farbe zu welcher Helligkeit gehoert (48 Helligkeitsstufen, viermal geglaettet, damit keine Stufen entstehen), und diese Zuordnung auf das **hochkant-Original** angewendet. Beide zeigen dieselbe Szene, darum passt die Zuordnung sauber. 10 % Originalzeichnung bleiben beigemischt, sonst wird das Bild flach. Ergebnis: ihr Blau, aber in voller Schaerfe und im richtigen Format. Eine sanftere Variante (34 % Original) wurde ebenfalls gebaut und gezeigt; Christines Wunsch war die volle Fassung.

**Titelseite mitangepasst** (auf ihren Hinweis "wenn blau, passe alle Farben an, dass es stimmt"): Die Schleier ueber Titelseite und laufender Meditation waren noch neutral violettgrau — ein Rest aus der Daemmerungsgrau-Zeit, der auf einem blauen Foto einen Graustich hinterlaesst. Alle 14 Stellen (`rgba(30,26,35,…)`, `rgba(32,28,38,…)`, `rgba(26,22,31,…)`) auf die Blaufamilie umgestellt. Logo, Titelschrift, der Perle-Knopf und die Pillen wurden im Screenshot gegengeprueft und passen unveraendert.


## 17. Titelseite: Rangfolge korrigiert (20. Aug. 2026)

Christine: *"Es ist nicht gut, dass die sieben Tage kostenlos am prominentesten sind, sondern My Meditation Island muesste am meisten ins Auge stechen und dann auch, wofuer es da ist. Und die Informationen unten muessten kleiner sein."* Sie hat den Fehler richtig benannt.

**Nachgeschlagen statt behauptet** (auf ihren Wunsch, mit anderen Apps zu vergleichen). Die Fachliteratur ist eindeutig und deckt sich mit ihrer Beobachtung:
- Die **Ueberschrift ist das groesste Textelement** und soll deutlich groesser sein als alles um sie herum.
- Der **Knopf faellt durch FARBE auf, nicht durch Groesse** — "secondary in size hierarchy but primary through color contrast".
- Die Blickfolge lautet **Ueberschrift, dann Unterzeile, dann Knopf**.
- Kleingedrucktes soll bewusst zuruecktreten. "When everything is emphasized, nothing is emphasized."

Vorher war die Reihenfolge genau umgekehrt: Der Knopf war die einzige helle Flaeche, ueber die **volle Breite**, 16px Innenabstand — die groesste zusammenhaengende Flaeche der Seite.

| Element | vorher | jetzt |
|---|---|---|
| `.splash h1` | 2,5rem | **3,1rem** |
| `.splash-sub` / `-sub2` | 0,85rem | 0,95rem |
| `.splash-cta` | volle Breite, 1rem, 16px Polster, Radius 17px | **Pillenform**, 0,92rem, 13/30px Polster, min. 210px |
| Preis-/Probe-Chips | 0,76rem, fett | 0,72rem, halbfett |
| Hinweis auf die Ausbildung | 0,66rem, Deckkraft 0,72 | 0,62rem, Deckkraft 0,6 |

Nachgemessen: Der Knopf belegt jetzt **25 % der Flaeche des Titels** (vorher deutlich mehr als der Titel selbst). Er bleibt trotzdem sofort auffindbar, weil er die einzige helle Flaeche der Seite ist — genau die Rolle, die ihm die Regel zuweist.

`.splash-top` von 340 auf 366px verbreitert und `text-wrap:balance` auf beide Unterzeilen: Ohne das stand nach der Vergroesserung das Wort "Balance" allein auf einer dritten Zeile. Die Werte fuer kleine Bildschirme (`max-height:720px`) sind mitgezogen; auf 375x667 geprueft, dass nichts abgeschnitten wird.


## 18. Startseite: Begruessung wird Seitentitel (20. Aug. 2026)

Christine hat dieselbe Rangfolgen-Frage wie bei der Titelseite (§17) auch fuer die Startseite gestellt und selbst richtig beantwortet: Die Begruessung gehoert zuoberst, die Bereichstitel darunter kleiner, getrennt durch Abstand.

**Nachgemessen war es genau umgekehrt:** Begruessung `1,12rem`, Zwischentitel `1,18rem` — das Wichtigste war das Kleinste. Ursache war eine Kettenreaktion aus frueheren Aenderungen: Am 17. Aug. wurde die Begruessung auf Vorlage A aufs Foto gelegt, am 18. Aug. auf Christines Wunsch verkleinert ("Guten Abend nicht so prominent") — dabei rutschte sie unter die Zwischentitel, ohne dass jemand die beiden Werte verglichen haette.

Zwei Vorschlaege gebaut und gezeigt; Christine hat die empfohlene Fassung genommen: **Die Begruessung steht jetzt als Seitentitel UNTER dem Foto**, nicht mehr darauf.

| | vorher | jetzt |
|---|---|---|
| Begruessung | 1,12rem, weiss auf dem Foto | **1,85rem**, in der Textfarbe, unter dem Foto |
| Zwischentitel | 1,18rem | **1,0rem** |
| Erster Zwischentitel, Abstand oben | 2px | 28px |
| Schleier ueber dem Foto | bis 66 % Deckkraft unten | nur noch 26 % |

Begruendung fuer diese Variante gegenueber "Begruessung gross auf dem Foto":
- **Einheitlichkeit:** Kompass, Meditationen und Mein Weg haben alle oben einen Seitentitel in genau dieser Form. Die Startseite war der einzige Sonderfall.
- **Das Foto wird besser:** Ohne Schrift darauf braucht es keine Abdunklung mehr. Der Schleier dient jetzt nur noch dem weichen Uebergang zur Seite statt der Lesbarkeit.

`#greeting` behaelt seine ID — `renderHome()` schreibt unveraendert dort hinein, an der Logik musste nichts geaendert werden.

**Beim Umbau gefunden und behoben:** `.home-page .section-label.first` stand auf `margin-top:2px`, weil der erste Zwischentitel bis dahin direkt unter dem Foto sass. Mit der Begruessung dazwischen klebte er an ihr — jetzt 28px. Solche Regeln sind nach einem Umbau der Reihenfolge immer verdaechtig.


### Nachgezogen (20. Aug. 2026, zweite Runde)

**Titelseite — der Knopf war immer noch der Blickfang.** Das Verkleinern aus §17 hat nicht gereicht, und die Ursache war eine andere als angenommen: Nicht die **Groesse** machte ihn dominant, sondern dass er die **einzige helle Flaeche** der ganzen Seite war (Perle `#efe6d8` auf tiefblauem Foto). Jetzt in Glasoptik — `rgba(255,255,255,.17)` mit hellem Rand und weisser Schrift, also derselbe Look wie der "Anmelden"-Knopf oben rechts, nur groesser. Er bleibt eindeutig als Knopf erkennbar und ist der einzige umrandete Block unten, aber er leuchtet nicht mehr.

Damit weicht die Titelseite bewusst von der Regel "der Knopf faellt durch Farbe auf" (§17) ab. Begruendung: Christine hat den Punkt zweimal gemeldet, und auf dieser Seite ist der Markenauftritt wichtiger als die Konversionsrate — es gibt ohnehin noch keine echte Bezahlung (`ABO_LIVE = false`). Wenn spaeter verkauft wird, ist das die erste Stelle, die man wieder anschauen sollte.

**Startseite — mehr Luft nach der Begruessung.** `.home-page .section-label.first` von 28px auf **42px**. Im Browser nachgemessen: 42 Punkte zwischen "Deine Insel wartet auf dich." und "Für den Abend".


## 19. Eine Regel fuer Helligkeit (20. Aug. 2026)

Christine: *"Die Schriftfarben, die Bilderfarben, die Icons, es macht farblich alles keinen Sinn."* Der Befund war richtig, und die Ursache liess sich benennen: **Es gab keine Regel, was hell sein darf.** Auf der Bibliotheksseite kaempften vier Dinge gleichzeitig um den Blick — der aktive Filter-Chip, die vier Bilder, 47 gefuellte Play-Knoepfe und die gefuellten "schon gemacht"-Schilder.

### Befund 1: Die vier Bilder waren unterschiedlich hell

Gemessen als mittlere Helligkeit im Verhaeltnis zum Untergrund der Seite (85):

| Bild | vorher | jetzt |
|---|---|---|
| `bg-lichtraum` (Gedanken beruhigen) | **1,9x** | 1,39x |
| `bg-herzraum` (Gefuehle verstehen) | 1,7x | 1,39x |
| `bg-bergsee` (Entspannen) | 1,6x | 1,37x |
| `bg-waldlichtung` (Stress loesen) | **1,1x** | 1,28x |

Das erste leuchtete, das vierte verschwand fast im Untergrund — deshalb wirkten sie nie wie ein Satz, obwohl die Motive gut zusammenpassen. **Die Farbe darf verschieden sein, die Helligkeit nicht.** Alle acht `bg-*.jpg` sind jetzt auf eine mittlere Helligkeit von 112 normiert, und zwar ueber eine **Gammakurve statt eines Faktors** — ein Faktor haette die hellen Stellen ausbrennen lassen. Dazu Saettigung 1,18, damit sie kraeftig statt blass wirken.

### Befund 2: Gefuellte Perle war ueberall

Neue Regel, die jetzt gilt:

| Was | Behandlung |
|---|---|
| Titel und Namen | Weiss (`--ink`) |
| Nebeninfos (Minuten, Kategorie) | Gedaempftes Hellblau (`--ink-soft`) |
| **Die EINE Haupthandlung einer Seite** | Perle, **gefuellt** — z. B. "Finde deine Meditation", "Ziel festlegen", der aktive Filter |
| Alle anderen Knoepfe | Perle **nur als Umriss** |
| Hinweise wie "schon gemacht" | Leise Schrift mit duennem Rand, keine gefuellte Flaeche |
| Bilder | Eigene Farbe je Kategorie, aber gleiche Helligkeit |

Konkret geaendert: `.play-btn` von gefuellt auf Umriss (`1.5px rgba(239,230,216,.55)`, Symbol in `--gold`) und `.lib-done` von gefuellter Flaeche auf transparenten Rand. **Auffindbar bleibt der Play-Knopf ueber Form und Ort** — rund, immer am rechten Rand der Zeile; er muss dafuer nicht leuchten.

Bewusst **nicht** geaendert: `.btn-dark` (Hauptknopf einer Seite), `.lib-chip.active`, `.opts .opt.active` und die uebrigen Auswahl-Zustaende — das sind genau die "eine Handlung bzw. eine Auswahl pro Zusammenhang", die die Regel hell laesst. Die Titelseite hat ihre eigene Ausnahme (§17-Nachtrag): dort ist auch der Hauptknopf nur Glas, weil der Markenauftritt vorgeht.

Alle vier Tabs plus die laufende Meditation nach der Aenderung im Browser gegengeprueft.


### Suchfeld angeglichen (20. Aug. 2026)

Christine hat gemeldet, das Suchfeld auf der Bibliotheksseite passe nicht zum Rest. Im Screenshot nachgemessen: Seine Fuellung lag bei `24/57/84`, der Untergrund direkt daneben bei `25/58/85` — praktisch identisch. Es wirkte dadurch nicht wie ein Feld, sondern wie ein **leerer Umriss**, waehrend alle Zeilen und Karten darunter eine sichtbar dunklere Fuellung mit unsichtbarem Rand haben.

Ursache: `.such-zeile input` hatte einen sichtbaren Rand (`var(--line)`), einen kleineren Radius (14px statt 16px) und keinen Schatten — es folgte noch dem Muster aus der hellen Gold-Zeit, wo ein Rand noetig war, um ein weisses Feld auf cremefarbenem Grund abzugrenzen. Auf dunklem Grund kehrt sich das um: Dort grenzt die **Fuellung** ab, nicht der Rand.

Jetzt exakt wie `.lib-row`: gleiche Fuellung, Radius 16px, durchsichtiger Rand, gleicher Schatten. Beim Hineintippen erscheint ein zurueckhaltender Perle-Rand als Fokus-Hinweis.


## 20. Schrift-Audit: eine Groesse je Rolle (20. Aug. 2026)

Christine: *"Analysiere Schrift, Format, Farbe etc., ob alles stimmt. Ich finde die Titel der Seiten sind nicht immer gleich. Es muss aus einem Guss kommen."* Statt nach Augenmass zu urteilen wurde **mit einem Browser-Skript gemessen**: alle dreizehn Seiten geoeffnet und von jeder Ueberschrift Groesse, Gewicht, Schriftart, Farbe und Abstaende ausgelesen.

### Befund: sieben Groessen fuer drei Rollen

| Rolle | gefunden |
|---|---|
| Seitentitel | **26,4px/700** (zwoelf Seiten) und **29,6px/400** (Startseite) |
| Zwischentitel | **16px** (Startseite) und **18,88px** (alle anderen) |
| Kleine Grossbuchstaben-Beschriftung | **11,2px** (Kompass) und **12,48px** (Textseiten) |

Beide Bruecke bei der Startseite waren **hausgemacht** und stammten aus den Aenderungen der Vortage: Am 20. Aug. bekam die Begruessung als neuer Seitentitel 1,85rem/400 (§18) — die anderen zwoelf Seiten blieben bei 1,65rem/700. Und die Zwischentitel wurden auf der Startseite eigens auf 1rem gesetzt, damit sie kleiner sind als die Begruessung, waehrend sie ueberall sonst 1,18rem behielten. Jede Aenderung fuer sich war richtig begruendet; zusammen ergaben sie zwei Systeme nebeneinander.

### Jetzt gilt eine Skala

| Rolle | Wert |
|---|---|
| Seitentitel (alle Seiten, inkl. Startseite) | **1,85rem / 400 / Serif** |
| Zwischentitel | **1,05rem / 700 / Serif** |
| Kartentitel | 0,92rem / 700 / Sans |
| Kleine Grossbuchstaben-Beschriftung | **0,74rem / 800 / Sans** |

**Leicht statt fett bei den Seitentiteln:** In einer Serifenschrift wirkt Gewicht 400 bei dieser Groesse ruhiger als 700 — und Ruhe ist bei dieser App das Thema. Die Groesse traegt die Rangfolge, nicht die Fettung.

**Bewusste Ausnahme:** `.splash h1` auf der Titelseite bleibt bei 3,1rem. Das ist der Markenauftritt, kein Seitentitel — die Regel dort lautet "der Name ist das Groesste der Seite" (§17).

**Die Sonderregel der Startseite ist ersatzlos entfallen.** `.home-page .section-label` setzt jetzt nur noch den groesseren Abstand, nicht mehr die Groesse. Genau diese doppelte Zustaendigkeit war die Ursache.

Nach der Aenderung erneut gemessen: **eine** Variante bei Seitentiteln, **eine** bei Zwischentiteln. Bei "Kartentitel/Label" bleiben zwei Werte — das sind zwei echte Rollen (Kartenueberschrift in Normalschrift, kleine Beschriftung in Grossbuchstaben), kein Bruch.

**Merksatz fuer kuenftige Aenderungen:** Wer eine Schriftgroesse fuer *eine* Seite aendert, hat mit hoher Wahrscheinlichkeit gerade ein zweites System aufgemacht. Groesse gehoert in die Rollen-Regel, seitenspezifisch duerfen nur Abstaende sein.


### Der eigentliche Grund fuer das "goldige" Suchfeld (20. Aug. 2026)

Christine hat nach der Anpassung des Suchfeld-Rahmens gemeldet, es wirke **immer noch** fremd. Die Pixel ihres Bildschirmfotos gemessen:

| Element | Farbe | Rot minus Blau |
|---|---|---|
| Platzhalter "Meditation suchen …" | `162/163/164` | **-2** (neutralgrau) |
| Lupensymbol | `140/161/182` | -41 |
| "47 gefuehrte Meditationen" | `194/212/231` | -37 |
| Zahl "47" | `195/212/232` | -37 |

Der Platzhalter war das **einzige neutralgraue Element** auf einer Seite, deren Schrift durchgehend blaustichig ist — und ein neutrales Grau wirkt neben kuehlem Blau warm. Genau das hat sie als "goldig" wahrgenommen; die Beschreibung war treffend, auch wenn die Farbe kein Gold war.

**Ursache:** `::placeholder` war **nie gesetzt**. Die Farbe kam vom Browser, und dessen Standard ist ein neutrales Grau — unabhaengig von allen Variablen der App. Deshalb hat auch die vorherige Anpassung von Fuellung, Rand und Radius nichts geholfen: Sie betraf das Feld, nicht den Text darin.

Jetzt `input::placeholder, textarea::placeholder{ color:var(--ink-soft); opacity:.75; }` — gilt fuer alle vier Eingabefelder der App (Suche, Chat, Anmeldung).

**Merksatz:** Bei "sieht fremd aus, ich weiss nicht warum" die Pixel messen statt raten. Und: Browser-Standardfarben (`::placeholder`, `::selection`, Fokusrahmen, Scrollbalken) folgen keiner Variablen — bei einem Farbwechsel muessen sie einzeln gesetzt werden, sonst bleiben sie als Fremdkoerper stehen.


## 21. Vollstaendiges Design-Audit (20. Aug. 2026)

Christine: *"Analysiere ganze Seiten auf Design, Farbe, Schriftgroesse, Abstaende und suche nach Inkonsistenzen, schlechtem Design, Optimierungspotenzial — fasse es zusammen mit Vorschlaegen und entscheide."*

Vorgehen: Ein Browser-Skript oeffnet alle dreizehn Seiten und liest von **720 sichtbaren Elementen** Eckenrundung, Polster, Textfarbe, Schriftgroesse, Gewicht und Abstaende aus. Bewertet wurde also gemessen, nicht geschaetzt.

### Befund 1 — drei falsche Farben

| Farbe | wo | Bewertung |
|---|---|---|
| `rgb(195,206,200)` graugruen | `.fav-btn`, **47x** (jede Zeile der Bibliothek) | Rest aus der Zeit vor dem Blau. Behoben: `var(--ink-soft)` |
| `rgb(0,0,238)` Browserblau | Mailadresse auf "Ueber die App" | Der Link hatte **keine** Regel, also nahm der Browser sein Standardblau — auf blauem Grund unlesbar. Behoben mit einer Regel fuer **alle** `a` |
| `rgb(0,0,0)` schwarz | `.lib-cat-tile` u. a. | Knoepfe erben die Textfarbe nicht; ohne Angabe stehen sie auf Schwarz. Noch nicht sichtbar, aber eine Falle — vorbeugend gesetzt |

Dasselbe Muster wie beim Platzhaltertext: **Was der Browser selbst faerbt, folgt keiner Variablen.** Diese Stellen muessen bei einem Farbwechsel einzeln nachgezogen werden.

### Befund 2 — neun Eckenrundungen

Gefunden: 50%, 16px (53x), 18px (23x), 12px (16px), 15px, 20px, 14px, 9px, 10px. Reduziert auf **vier**:

| Rolle | Wert |
|---|---|
| Kreise (Symbolknoepfe, Avatare) | `50%` |
| Flaechen und Bedienelemente (Karten, Zeilen, Felder, Kacheln, Knoepfe) | **16px** |
| Abzeichen (Badges) | **9px** |
| Pillen (Filter-Chips, Titelseiten-Knopf) | **999px** |

### Befund 3 — 45 verschiedene Schriftgroessen

Der groesste Einzelbefund. Werte wie 0,82 / 0,83 / 0,84 / 0,85 / 0,86 / 0,87 / 0,88rem lagen nebeneinander — Unterschiede von Bruchteilen eines Pixels, die keine Rolle ausdruecken, aber verhindern, dass die App wie aus einem Guss wirkt.

Programmatisch auf eine Skala gezogen: **0,62 / 0,66 / 0,74 / 0,78 / 0,86 / 0,92 / 1,0 / 1,05 / 1,2 / 1,35 / 1,85 / 3,1rem**. Verschoben wurde nur, wo der Unterschied **hoechstens 0,05rem (0,8 Pixel)** betraegt — dadurch bleibt jede bewusste Groessenentscheidung erhalten und keine einzelne Aenderung ist mit blossem Auge zu sehen. Ergebnis: **45 Werte auf 19**.

Die verbliebenen groesseren Werte wurden einzeln geprueft und **bewusst behalten**: 1,1 bis 1,7rem sitzen auf Symbol- und Emoji-Behaeltern (`.row-thumb`, `.profil-avatar`, `.fd-state-emoji`) — das ist eine andere Rolle als Text; 2,6rem ist die Titelseite auf kleinen Bildschirmen. **Korrigiert** wurde dabei `.topbar h1` (Insel-Gestaltung): stand noch auf 1,65rem/fett, ist aber ein Seitentitel wie jeder andere — jetzt 1,85rem/400.

Damit ist die frühere Entscheidung aus §7.13 ("die vielen minimal unterschiedlichen `font-size`-Werte bewusst nicht anfassen") aufgehoben. Sie war damals richtig begruendet (viel Aufwand, hohes Risiko, kein sichtbarer Gewinn) — mit einem messenden Skript und einer Toleranzgrenze faellt beides weg.

### Befund 4 — die Abstaende der Titelseite

Christines konkreter Hinweis. Gemessen ergab die Titelseite von oben nach unten: **10 / 16 / 5 / 9 / 7** Punkte — kein System, und die beiden Unterzeilen klebten mit 5 Punkten aneinander, waehrend darueber 16 standen.

Jetzt zwei Werte: **6 Punkte innerhalb einer Gruppe** (zusammengehoerende Zeilen), **14 Punkte zwischen Gruppen**. Gemessen: 14 / 14 / 6 / 14 / 10.

**Dabei einen echten Fehler gefunden:** `.splash-mikro` war **zweimal** definiert, beide Male mit `!important` — die zweite Regel setzte den Abstand still auf 9px zurueck, waehrend die erste 14px vorgab. Genau so entstehen Abstaende, die niemand erklaeren kann. Die zweite Regel enthaelt jetzt nur noch, was sie wirklich beitraegt (Schriftgroesse, Deckkraft, Schatten).

### Geprueft, aber kein Fehler

Ein leerer Kasten auf der Abo-Seite (`#trialBox`) stellte sich als **Test-Artefakt** heraus: Er wird von `renderAbo()` gefuellt, und alle sechs Wege zu dieser Seite rufen `renderAbo()` vorher auf — nur der direkte Sprung im Testskript nicht.

### Kontrolle

Nach allen Aenderungen alle zwoelf Seiten erneut geoeffnet: keine Skriptfehler, kein Element ragt aus dem Bildschirm, alle Seiten per Screenshot gegengeprueft.


### Untertitel der Titelseite: der eingestellte Rand ist nicht der sichtbare Abstand (20. Aug. 2026)

Christine hat nach der Rhythmus-Korrektur gemeldet, die Untertitel-Abstaende seien **immer noch** inkonsistent. Der erste Messdurchgang lief bei 402 Punkten Breite und zeigte saubere Werte — auf ihrem iPhone (390 Punkte) sieht es anders aus. **Zweite Lehre daraus: bei ihrer Bildschirmbreite messen, nicht bei einer beliebigen.**

Mit `Range.getClientRects()` jede einzelne Textzeile ausgemessen (auch die umgebrochenen), bei 390x844 und dreifacher Aufloesung:

| | vorher | jetzt |
|---|---|---|
| Titel zur ersten Unterzeile | 16 Punkte | **18** |
| zwischen den beiden Unterzeilen | 13 Punkte | **7** |

**16 zu 13 war das Problem** — fast gleich. Dadurch bildeten die zwei Unterzeilen keine erkennbare Gruppe, und die knappe Ungleichheit faellt dem Auge staerker auf als ein klarer Unterschied. Ein Verhaeltnis muss deutlich sein oder gar nicht existieren.

**Der eigentliche Fallstrick:** Der eingestellte Rand ist **nicht** der sichtbare Abstand. Die Zeilenhoehe (1,55) legt ober- und unterhalb jeder Zeile je gut drei Punkte dazu. Aus `margin-top:6px` wurden dadurch 13 sichtbare Punkte — mehr als das Doppelte. Wer Abstaende nach den CSS-Werten beurteilt, misst am Ergebnis vorbei.

Loesung: Die zweite Unterzeile hat **gar keinen** eigenen Rand mehr (`margin:0`). Damit ruecken die beiden Zeilen auf denselben Abstand wie ein Umbruch **innerhalb** einer Zeile — der Untertitel ist dadurch **unabhaengig vom Umbruch** immer gleichmaessig gesetzt, egal ob er auf zwei oder drei Zeilen laeuft (auf Christines Geraet sind es drei, weil ihre Schrift groesser eingestellt ist). Der Abstand zum Titel wurde auf 16px erhoeht, sichtbar 18.


## 22. "Mein Weg" ueberarbeitet (20. Aug. 2026)

Christine: *"Diese Seite gefaellt mir nicht und sticht nicht ins Auge. Der Balken mit dem Ziel blau geht unter. Schweizerdeutsch unpassend, alles weiss blau."* Drei Treffer, alle bestaetigt:

**1. Der Fortschrittsbalken war unsichtbar.** `.bar` benutzte `var(--cream-2)` als Schiene — auf "Mein Weg" ist das `#294f83`, also fast dieselbe Farbe wie die Karte darunter. Bei 0 % Fortschritt war ueberhaupt nichts zu sehen. Jetzt `rgba(255,255,255,.2)`, dieselbe neutrale Schiene wie beim Balken der laufenden Meditation (`.progress`), der genau deshalb nie auffiel. **Dieselbe Falle steckte im Symbolfeld des Wochenziels** (`.goal-ico`) — ebenfalls umgestellt.

Das ist ein wiederkehrendes Muster seit dem Wechsel auf Blau: `--cream-2` war frueher ein *heller* Ton und diente als Abgrenzung. Jetzt ist es ein **blauer** Ton, kaum unterscheidbar vom Untergrund. Wer `--cream-2` als Flaeche findet, sollte pruefen, ob es dort noch abgrenzt.

**2. Das Abzeichen "Schweizerdeutsch"** war eine gefuellte blaue Flaeche mit Perle-Schrift, direkt neben dem Seitentitel — es stritt mit ihm um Aufmerksamkeit. Nach der Regel aus §19 gehoert eine gefuellte Flaeche nur der Haupthandlung; ein Hinweis bekommt einen Umriss. Jetzt wie `.lib-done`: transparent, duenner Rand, gedaempfte Schrift.

**3. "Sticht nicht ins Auge"** — die Seite hat als einzige kein Foto und bestand nur aus dunklen Karten auf dunklem Grund. Die drei Zahlen (Tage am Stueck, Meditationen, Minuten) **sind** der Inhalt dieser Seite, waren aber in gewoehnlicher weisser Schrift gesetzt. Jetzt in der Akzentfarbe und in der Serifenschrift, 1,85rem statt 1,35rem — derselbe Wert wie ein Seitentitel. Damit hat die Seite einen Blickfang, ohne dass ein Bild noetig waere, und es bleibt bei einem Hoehepunkt pro Seite.

**Nebenbefund:** Die Unterzeile "Was du schon geschafft hast" brach mit dem Wort "hast" allein auf die zweite Zeile. `text-wrap:balance` auf `.page-head p` verteilt die Zeilen jetzt gleichmaessig — gilt fuer die Unterzeile jeder Seite, nicht nur hier.


### Zweite Flaechen-Ebene: Tiefe statt neuer Farben (20. Aug. 2026)

Christine nach der ersten Ueberarbeitung: *"Diese Seite immer noch lasch. Evtl. mit diversen Blautoenen arbeiten und gewisse Balken/Rechtecke farbig markieren?"*

Die Diagnose dahinter ist richtig, die vorgeschlagene Loesung waere aber die zweitbeste gewesen. **Das Problem war nicht zu wenig Farbe, sondern zu wenig Tiefe:** Es gab genau **eine** Flaechen-Ebene. Karten waren dunkler als der Untergrund — und zwar alle gleich. Damit steht jeder Block auf derselben Stufe, nichts tritt hervor, nichts tritt zurueck. Mehr Blautoene haetten die Seite bunter gemacht, aber nicht geordnet.

Neu gibt es zwei Ebenen:

| Ebene | Wert | wofuer |
|---|---|---|
| zurueckgesetzt | `--card` = `rgba(0,0,0,.16)` | gewoehnliche Karten und Zeilen |
| **hervorgehoben** | `--flaeche-hoch` = `rgba(255,255,255,.08)` | die Bloecke, die den Inhalt der Seite tragen |

Auf "Mein Weg" sind das die **Zahlenreihe** und das **Wochenziel** — beide zusaetzlich mit einer feinen hellen Oberkante (`inset 0 1px 0 rgba(255,255,255,.14)`) und einem Schlagschatten, sodass sie sichtbar ueber der Seite liegen. Der Rest bleibt zurueck.

Weil `--flaeche-hoch` **heller** als der Untergrund ist statt dunkler, entsteht der Eindruck von Licht, das von oben kommt — dieselbe Logik, mit der jede Oberflaeche in der echten Welt gelesen wird. Es braucht dafuer keine einzige neue Farbe.

Ausserdem am Fortschrittsbalken: Hoehe von 6 auf 9 Punkte, vollrunde Enden, dunklere Schiene (`rgba(0,0,0,.28)`) fuer mehr Kontrast zur hellen Fuellung, und `min-width:9px` — damit ein angefangenes Ziel auch bei 1 % sichtbar ist statt als leerer Balken. Die Trennstriche zwischen den drei Zahlen waren so dunkel wie alles andere und sind jetzt hell (`rgba(255,255,255,.14)`).

**Uebertragbar:** `--flaeche-hoch` steht jetzt allen Seiten zur Verfuegung. Wo eine Seite flach wirkt, ist die Frage zuerst "welcher Block traegt den Inhalt?" und dann, ob dieser Block eine Ebene hoeher gehoert — nicht, welche Farbe man ihm geben koennte.


## 23. Die vier Kategoriebilder ersetzt: ChatGPT-Serie in vier Farbwelten (22. Aug. 2026)

Christine hat den Prompt aus dem Bildfarben-Vorschlag (silbrig-weiss / altrosa / moosgruen / bernstein, kein Blau) bei ChatGPT eingegeben und alle vier Bilder geliefert. Vor dem Einbauen wie immer gemessen statt nach Augenmass beurteilt:

| Bild | Groesse | Helligkeit roh | Verhaeltnis zum Untergrund |
|---|---|---|---|
| weiss (Gedanken beruhigen) | 1448x1086 | 211 | 2,49x |
| rose (Gefuehle verstehen) | 1448x1086 | 179 | 2,11x |
| gruen (Stress loesen) | 1448x1086 | 122 | 1,43x |
| bernstein (Entspannen) | 1448x1086 | 148 | 1,75x |

**Derselbe Fehler wie beim ersten Versuch in §14/§19** waere fast wieder passiert: vier Bilder, die zwar farblich einer Regel folgen, aber unterschiedlich hell sind — das erste haette geleuchtet, das dritte waere im Untergrund fast verschwunden. Diesmal **vor** dem Einbauen normiert, mit derselben Methode und demselben Zielwert wie bei den `bg-*.jpg` (§19): Gammakurve auf Zielhelligkeit 112, Saettigung 1,15 zum Ausgleich. Ergebnis: alle vier zwischen 113 und 118, also 1,33x bis 1,39x — praktisch gleich.

Dateien: `kat-neu-nord/sued/west/ost.jpg`, ersetzen in `LIB_KAT_FOTO` die bisherigen `bg-lichtraum/herzraum/waldlichtung/bergsee.jpg`. Gilt wie gehabt an drei Stellen gleichzeitig (Kacheln, Listenzeilen ohne eigenes Bild, Vollbild-Hintergrund waehrend der Meditation — siehe §14) — im Browser gegengeprueft, dass eine gestartete Uebung ohne eigenes `bg` jetzt `kat-neu-nord.jpg` zieht und der Begleittext darauf gut lesbar bleibt.

Die vier vorherigen `bg-*.jpg` als Kategoriebild sind damit abgeloest, bleiben aber unveraendert der Hintergrund der acht Uebungen, die ein eigenes `bg` tragen (`kat-neu-*.jpg` sind in `SHELL_FILES` ergaenzt, die alten vier bleiben ebenfalls drin).

**Weiterhin offen:** Die kleinen runden Bilder in den Zeilen der acht Uebungen mit eigenem `bg` sind weiterhin warm-golden (siehe Offener Punkt in §14) — noch nicht bestellt.


## 24. Kopf der Bibliothek vereinfacht, Bildfarben bestaetigt (22. Aug. 2026)

Christine: *"Oben weniger ist mehr, einfach Meditationen und dann Filter."*

Entfernt: die Unterzeile "Alle Übungen zum Stöbern" — sie sagte nur mit anderen Worten, was der Titel "Meditationen" bereits sagt. **"47 geführte Meditationen"** stand bisher als Dauertext fest ueber dem Filter, obwohl die Zahl fuer das Stoebern keine Rolle spielt. Sie bleibt nur noch stehen, wenn wirklich gesucht wird — dort zeigt sie sinnvoll die Trefferzahl ("3 Treffer fuer 'atem'"). `#libMeta` ist jetzt per Default `hidden` und wird nur bei aktivem Suchwort eingeblendet (`renderLibFilters()`).

Ergebnis: **Titel → Suche → Filter**, direkt hintereinander, ohne die zwei Textzeilen dazwischen. Im Browser geprueft, leer und mit aktiver Suche.

### Bildfarben gegen den blauen Untergrund gemessen

Christine fragte, ob die vier neuen Kategoriebilder (§23) farblich zum blauen Hintergrund passen. Gemessen statt geraten — Farbton und Abstand zum Untergrund (211 Grad, Saettigung 0,54):

| Bild | Farbton | Abstand zum Blau |
|---|---|---|
| Gedanken beruhigen (silbrig-weiss) | 36 Grad | 175 Grad |
| Gefuehle verstehen (rose) | 16 Grad | 165 Grad |
| Stress loesen (gruen) | 56 Grad | 155 Grad |
| Entspannen (bernstein) | 28 Grad | 177 Grad |

Alle vier liegen **150 bis 177 Grad vom Untergrund entfernt** — praktisch gegenueberliegend auf dem Farbkreis, also warm-komplementaer zu Blau. Das ist **kein Zufall und kein Problem, sondern genau der Kontrast**, den Christine zu Beginn des Bilder-Themas gefordert hatte ("es muss doch irgendwie einen Kontrast haben", siehe Bildfarben-Empfehlung). Warme Bilder auf kuehlem Grund heben sich klar ab, statt mit ihm zu verschmelzen — bestaetigt statt nur behauptet.


## 25. Suche wirkte tot (22. Aug. 2026, Christine gemeldet: "Bringt das was? Finde nicht")

Nachgeprueft statt vermutet: Die Suche selbst funktionierte technisch einwandfrei (Titel, Kurzbeschreibung und Bereichsname werden durchsucht, Trefferzahl stimmt, leere Suche zeigt korrekt "Nichts gefunden zu ... Versuch ein anderes Wort."). **Das Problem war die Wahrnehmung, nicht die Funktion.**

Beim Tippen aenderte sich oben auf dem Bildschirm nichts: Die vier grossen Kategoriebilder (§14/§15/§23) blieben immer stehen, egal was gesucht wurde — nur die kleine Zeile "X Treffer" und die Liste weit darunter aenderten sich. Auf einem Telefon-Bildschirm sieht man nach dem Tippen praktisch denselben Anblick wie vorher; die eigentliche Wirkung der Suche stand ausserhalb des sichtbaren Bereichs.

**Loesung:** Die vier Kacheln blenden sich jetzt aus, sobald ein Suchwort eingegeben ist (`renderLibFilters()`, `suchAktiv = !!libSuche.trim()`). Damit folgt die gefilterte Liste direkt auf das Suchfeld — der Erfolg der Suche ist ohne Scrollen sichtbar. Beim Leeren des Suchfelds (Eingabe geloescht oder ✕ angetippt) erscheinen die Kacheln wieder.

Die Chips "Alle"/"Favoriten" bleiben waehrend der Suche sichtbar und wirken weiterhin zusaetzlich zum Suchwort (z. B. nur Favoriten durchsuchen) — geprueft, dass beides zusammen korrekt filtert.

**Lehre:** Eine Funktion kann fehlerfrei arbeiten und trotzdem "kaputt wirken", wenn ihre Wirkung ausserhalb des sichtbaren Bereichs bleibt, waehrend der dominante Teil des Bildschirms (hier: die vier grossen Fotos) unveraendert stehen bleibt. Bei "das bringt nichts"-Meldungen zuerst pruefen, was der Nutzer nach der Aktion tatsaechlich zu sehen bekommt, nicht nur, ob die Daten stimmen.


## 26. Der wahre Grund fuer "Farben passen nicht zum Hintergrund" (22. Aug. 2026)

Christine hatte bei den vier neuen Kategoriebildern (§23) schon einmal gefragt, ob die Farben zum blauen Untergrund passen — damals wurde nur der Farbton der Bilder selbst gegen den Untergrund gemessen (§24, 150-177 Grad Abstand, also warm-komplementaer, als Kontrast-Absicht bestaetigt). Sie blieb dabei: *"Aus meiner Sicht passen die Farben nicht zum Hintergrund."* Diesmal wurde tiefer gemessen, direkt an ihrem Bildschirmfoto — und der erste Befund war falsch.

**Der Fehler lag nicht in den Bildern, sondern im Schleier darueber.** Jede Kachel hat einen Verlauf von durchsichtig zu dunkel, damit der weisse Titel unten lesbar bleibt (`.lib-cat-tile::after`). Dieser Schleier war **dunkelblau** (`rgba(13,28,47,…)`) — dieselbe Blaufamilie wie der App-Untergrund. Nachgerechnet, was das mit einem warmen Foto macht:

| Bild | Farbton pur | Farbton mit blauem Schleier |
|---|---|---|
| Stress lösen (Wald, gruen) | 56 Grad | **80 Grad** (Sumpfoliv) |
| Entspannen (Bernstein) | 27 Grad | **51 Grad** (schmutziges Gelbgruen), Saettigung von 83 % auf 67 % |

Blau plus Warmton ergibt **kein kraeftigeres Blau**, sondern ein trübes Oliv — genau der unentschiedene, unpassende Farbton, den Christine gesehen, aber nicht benennen konnte.

**Gegengeprueft mit Fachliteratur** (auf ihren Wunsch, mit anderen Apps/Standards zu vergleichen): Fuer Text auf Bildern gilt ein **neutraler schwarzer Schleier** als verlaesslicher Standard — ein farbiger Schleier ist nur dann richtig, wenn er die Bildfarbe bewusst neutralisieren soll. Hier war das Gegenteil beabsichtigt: die vier Eigenfarben (weiss/rose/gruen/bernstein) sollen ja gerade erhalten bleiben.

**Behoben:** `.lib-cat-tile::after` von `rgba(13,28,47,…)` auf **neutrales Schwarz** `rgba(0,0,0,…)`. Die vier Bilder behalten jetzt ihre eigene Farbe bis zum unteren Rand, der Titel bleibt genauso lesbar wie vorher (gleiche Deckkraft-Kurve, nur ohne Blaustich).

**Verwandter, aber (noch) nicht angefasster Fund:** Derselbe dunkelblaue Ton liegt auch als Schleier waehrend der laufenden Meditation ueber dem Hintergrundfoto (`.stage::after`, sogar bis 92 % Deckkraft). Dort faellt es weniger auf, weil die acht `bg-*.jpg` in §21 bereits Richtung Blau umgefaerbt wurden und daher weniger Eigenfarbe zu verlieren haben — trotzdem derselbe Mechanismus. Nicht geaendert, da nicht gemeldet; bei Bedarf dieselbe Loesung anwendbar.


## 27. Gruen und Orange auf Blau — und ein uebersehener eigener Fehler (22. Aug. 2026)

Christines Frage: *"Aber Gruen/Orange passt auf Blau?"* Zwei getrennte Antworten, und beim Nachmessen kam ein eigener Fehler ans Licht.

### Zur Farbenlehre

| Kachel | Farbton | Abstand zum Untergrund (211 Grad) | Bewertung |
|---|---|---|---|
| Entspannen (orange) | 27 Grad | **176 Grad** | Praktisch exakt gegenueber — Blau/Orange ist das klassische Komplementaerpaar und der staerkste harmonische Kontrast ueberhaupt |
| Gedanken (silbrig) | 36 Grad | 175 Grad | dito, nur sehr blass |
| Gefuehle (rose) | 15 Grad | 164 Grad | nah am Komplementaerpunkt |
| Stress loesen (gruen) | **56 Grad** | 155 Grad | Entscheidend: Es ist ein **Moos-/Gelbgruen**, kein Blaugruen. Ein Tuerkis (etwa 180 Grad) waere nachbarschaftlich zu Blau und wuerde verschwimmen — dieses Gruen liegt weit genug weg und wirkt warm |

**Beides passt also**, und das ist keine Geschmacksfrage: Alle vier liegen 155-176 Grad vom Untergrund entfernt, also im komplementaeren Bereich.

### Der eigentliche Fehler war meiner

In §21 wurde die Regel aufgestellt: **"Die Farbe darf verschieden sein, die Helligkeit nicht"** — und alle acht `bg-*.jpg` entsprechend auf eine gemeinsame Helligkeit normiert. Als spaeter die vier neuen Kategoriebilder (§23) eingebaut wurden, **wurde diese Regel nicht auf sie angewendet**. Gemessen:

| | Saettigung | Helligkeit |
|---|---|---|
| Gedanken (silbrig) | 25 % | 50 % |
| Gefuehle (rose) | 53 % | 68 % |
| Stress (gruen) | 42 % | 46 % |
| **Entspannen (orange)** | **83 %** | **73 %** |

Die Saettigung lag um **Faktor 3,4** auseinander, die Helligkeit um 27 Punkte. Das Orange war damit mehr als dreimal so farbstark wie das Silbrige — es schrie, waehrend die Nachbarkachel fluesterte. **Nicht "Orange passt nicht auf Blau" war das Problem, sondern dass diese eine Kachel alle anderen erschlug.**

Behoben: alle vier auf **Helligkeit 56 % und Saettigung 46 %** gebracht — Helligkeit ueber eine Gammakurve (kein Faktor, sonst brennen die Lichter aus), Saettigung proportional skaliert. **Der Farbton jedes Bildes bleibt exakt unveraendert** (36 / 15 / 56 / 27 Grad), jede Kategorie behaelt also ihre Eigenfarbe — nur die Lautstaerke ist jetzt bei allen gleich.

Die von Christine gelieferten Originale liegen unveraendert in **`bilder-original/`**.

**Lehre:** Eine einmal aufgestellte Regel muss beim naechsten Bildwechsel aktiv wieder angewendet werden — sie gilt nicht von selbst weiter. Beim Einbau neuer Bilder immer gegen die bestehenden messen, nicht nur gegen den Untergrund.


## 28. Ein Farbverlauf statt vier Einzelfarben (22. Aug. 2026)

Christines Einwand nach dem Ausgleich von Helligkeit und Saettigung (§27): *"Für mich passt es gar nicht. Farben sollten [sich] gleichen und im Kontrast — oder passend."*

Der Einwand trifft einen Punkt, den §27 nicht geloest hatte: Dort wurden nur **Helligkeit und Saettigung** angeglichen, die vier **Farbtoene** blieben weit auseinander (silbrig 36 / rose 15 / gruen 56 / bernstein 27 Grad). Vier verschiedene Farbfamilien nebeneinander sind weder ein Satz noch ein bewusster Kontrast — es ist der schwache Mittelweg. Christine hat das treffend formuliert: **entweder gleichen oder kontrastieren, nicht dazwischen.**

Zwei saubere Wege gebaut und gezeigt:
- **A — alle in der Blaufamilie der App:** die Bilder gehoeren zur selben Welt wie der Untergrund, unterscheiden sich nur in Motiv und Helligkeit.
- **B — alle in einer warmen Familie:** die vier stehen **gemeinsam** im Kontrast zum Blau statt jede fuer sich in eine andere Richtung.

Christine waehlte **A** und fragte nach mehr Violett; daraufhin drei Abstufungen gezeigt und **A2** gewaehlt.

### Umgesetzt: A2

Statt vier Einzelfarben laeuft jetzt ein **Verlauf ueber die vier Kacheln**:

| Kachel | Farbton | Saettigung | Helligkeit |
|---|---|---|---|
| Gedanken beruhigen | 201 Grad (Blau) | 42 % | 50 % |
| Gefuehle verstehen | 219 Grad | 42 % | 53 % |
| Stress loesen | 237 Grad | 42 % | 50 % |
| Entspannen | 255 Grad (Violett) | 42 % | 57 % |

Gleichmaessige Schritte von **18 Grad**, alle bei identischer Saettigung. Die erste Kachel liegt noch in der Farbe des App-Untergrunds (211 Grad), die letzte setzt einen violetten Akzent — die Reihe hat dadurch eine Richtung, statt zufaellig verschieden zu sein.

**Technisch:** Der Farbton jeder Kachel wird auf den Zielwert gezogen, aber die **Binnenstreuung des Bildes bleibt erhalten** (`Zielton + Abweichung vom Bildmittel * 0.45`, begrenzt auf ±30 Grad). Ohne das wuerde ein flacher Anstrich entstehen statt eines Bildes mit Tiefe. Helligkeit wieder ueber eine Gammakurve, nicht ueber einen Faktor.

**A3 (Violett als Hauptrichtung) wurde abgeraten und nicht genommen:** Dort loest sich die obere Reihe vom Untergrund, und das Lila der letzten Kachel waere der lauteste Punkt der Seite geworden — genau der Fehler, der in §27 beim Orange behoben wurde.

Die von Christine gelieferten Originale bleiben unveraendert in `bilder-original/`; alle Umfaerbungen gehen immer von dort aus, nie von einer bereits bearbeiteten Fassung.

**Nebenbefund, mitgeprueft:** Da `LIB_KAT_FOTO` auch den Vollbild-Hintergrund waehrend der Meditation liefert (§14), wurde eine Uebung gestartet und geprueft — der Hintergrund passt jetzt ebenfalls zur App-Farbwelt, statt warm dagegen zu stehen.


## 29. Die letzten warmen Bilder gefunden (22. Aug. 2026, Christine gemeldet: "Hier ist noch altes Bild orange")

Nach der Umstellung der vier Kacheln auf Blau-Violett (§28) waren auf "Mein Weg" in "Meine letzten Meditationen" weiterhin **orange Miniaturbilder** zu sehen. Zwei getrennte Ursachen, beide beim Nachmessen gefunden:

### 1. Die acht `bg-*.jpg` waren nie im Blau angekommen

Sie wurden in §15 "umgefaerbt" und in §21 auf gleiche Helligkeit gebracht — aber **der Farbton blieb warm**. Nachgemessen lagen alle acht zwischen **9 und 72 Grad** (Orange bis Gelbgruen), waehrend die App bei 211 Grad steht. Die Umfaerbung von §15 hatte nur das Goldgelb *gedaempft*, nicht die Farbfamilie gewechselt — das faellt bei einem grossen Vollbild-Hintergrund kaum auf, bei einem 44px-Miniaturbild neben blauen Karten sofort.

Jetzt bekommt jede Datei den Farbton **der Kategorie, in der sie hauptsaechlich verwendet wird** — dieselbe Skala wie die Kacheln (nord 201 / sued 219 / west 237 / ost 255):

| Datei | vorher | jetzt | Zuordnung |
|---|---|---|---|
| `bg-herzraum.jpg` | 16 | 219 | nur "Gefuehle verstehen" |
| `bg-waldlichtung.jpg` | 40 | 237 | nur "Stress loesen" |
| `bg-bergspitze.jpg` | 15 | 238 | nur "Stress loesen" |
| `bg-bergsee.jpg` | 22 | 238 | geteilt sued/ost, daher dazwischen |
| `bg-lichtraum.jpg` | 72 | 244 | ueberwiegend ost |
| `bg-reinigend.jpg` | 16 | 255 | nur "Entspannen" |
| `bg-warmeszuhause.jpg` | 9 | 256 | nur "Entspannen" |
| `bg-winterlandschaft.jpg` | 355 | 229 | derzeit ungenutzt, mittig eingeordnet |

### 2. Die Miniaturbilder sind eigene Dateien

Der eigentliche Grund, warum die Zeilen auch nach Schritt 1 noch orange blieben: `rowFoto()` laedt **nicht** `bg-*.jpg`, sondern `thumb-*.jpg` — dasselbe Motiv, quadratisch zugeschnitten auf 160px (rund 5 KB statt 100 KB, bei 47 Zeilen ein spuerbarer Unterschied). Diese acht Dateien wurden bei **keiner** frueheren Umfaerbung mitgezogen und lagen noch bei 19 bis 61 Grad.

Sie sind jetzt **aus den umgefaerbten grossen Bildern neu erzeugt** (mittiger quadratischer Zuschnitt, 160px, Qualitaet 82) statt separat eingefaerbt — so koennen sie gar nicht mehr auseinanderlaufen. Ergebnis: alle acht zwischen 219 und 257 Grad, Dateigroesse unveraendert bei rund 5 KB.

Originale liegen in **`bilder-original/bg/`** und **`bilder-original/thumb/`**.

**Lehre:** Bei einem Bildwechsel nach **allen** Ableitungen desselben Motivs suchen. Hier existierte eine zweite, verkleinerte Kopie jeder Datei, die per Namensersetzung (`datei.replace("bg-", "thumb-")`) geladen wird und deshalb bei einer Suche nach dem Dateinamen im Code nicht auftaucht.

**Bekannt, nicht geaendert:** Uebungen ohne eigenes `bg` laden ueber denselben Weg `kat-neu-*.jpg` als Miniaturbild — die Namensersetzung greift dort nicht, es wird also das volle 1448px-Bild auf 44px angezeigt. Funktioniert, ist aber unnoetig gross. Eigene `thumb-kat-*.jpg` waeren die saubere Loesung.


## 30. "Mein Weg" in Violett, mit hellen Bloecken (23. Aug. 2026, Christines Auftrag)

Christine: *"Evtl auch mit violett hier arbeiten dass nicht alles langweilig im blau ist?"* — danach zur ersten Fassung: *"2 aber sehr duester / Wuerde hellere Elemente einbauen?"*

### Der Untergrund

"Mein Weg" laeuft jetzt oben blau an und geht nach unten ins Violett:

```css
body[data-step="meditation"]{ --cream:#1e2950; --cream-2:#4d4291; }
```

Der alte blaue Verlauf (`#172c46` / `#294f83`) steht als Kommentar direkt darueber — Rueckweg offen, wie ueberall in diesem Projekt.

Drei Fassungen wurden gebaut und nachgemessen, bevor eine eingebaut wurde: blau (unveraendert), blau nach violett, durchgehend violett. **Beide violetten Fassungen lagen ueber dem Blau**, die Zielkarte oben zum Beispiel bei 5,10 und 4,96 statt 4,44. Violett kostet hier also keine Lesbarkeit.

Christines Rueckmeldung "sehr duester" kam nicht vom Violett, sondern von der Helligkeit: die gezeigte Fassung (`#1b2547` / `#453a80`) lag rund eine halbe Stufe unter dem bisherigen Blau. Der eingebaute Ton ist darum so gewaehlt, dass die Lesbarkeitswerte Zeile fuer Zeile **exakt** denen des alten Blaus entsprechen: 12,3 oben, 9,9 in der Mitte, 7,9 unten. Violett ja, dunkler nein.

Beim Nachjustieren wieder rechnen: schon eine Stufe heller (`#212d57` / `#554a9d`) faellt der Zweittext auf den hellen Karten am unteren Rand auf 4,07 und damit unter die Grenze von 4,5.

### Die Bloecke liegen jetzt heller als der Untergrund

Das war der eigentliche Punkt hinter "hellere Elemente". Bisher war jede Karte auf der Seite ein schwarzer Schleier (`--card: rgba(0,0,0,.16)`). Nach unten hin, wo der Untergrund heller wird, schrumpft der Unterschied zwischen Karte und Untergrund — die Seite wirkt dort stumpf, obwohl formal alles stimmt.

Auf dieser Seite sind die beiden Flaechen darum umgedreht, und zwar **nur ueber die Variablen**:

```css
body[data-step="meditation"]{
  --card:rgba(255,255,255,.07);
  --flaeche-hoch:rgba(255,255,255,.14);
  --line:rgba(255,255,255,.20);
}
```

Warum ueber Variablen und nicht ueber eigene Regeln: `.card.stats-row` und `#wochenzielCard` (§26) setzen ihren Hintergrund selbst auf `--flaeche-hoch`. Eine seitenweite Regel wie `body[data-step="meditation"] .card` haette diese beiden wegen hoeherer Spezifitaet ueberholt und die zwei Stufen wieder eingeebnet. Ueber die Variablen ziehen alle Karten automatisch mit, und die Rangfolge bleibt: ruhige Karten .07, die zwei wichtigen Bloecke .14.

### Drei Stellen, die sonst blass geblieben waeren

```css
body[data-step="meditation"] .bar{ background:rgba(255,255,255,.16); }
body[data-step="meditation"] .goal-ico{ background:rgba(255,255,255,.18); }
body[data-step="meditation"] .fd-badge{ opacity:1; border-color:rgba(255,255,255,.30); }
```

Der Fortschrittsbalken lag in einer schwarzen Rille (`rgba(0,0,0,.28)`) — auf einer hellen Karte sieht das aus wie ein Loch statt wie eine Spur.

**Lehre, dieselbe wie in §27:** Eine Farbentscheidung ist nie nur die Grundfarbe. Wer den Untergrund umdreht, muss jede Flaeche mitnehmen, die ihren Kontrast aus ihm bezieht — schwarze Schleier, Rillen, gedaempfte Abzeichen.

### Nebenbefund beim Nachbauen

Beim Testen erschienen die beiden Insel-Karten (`profilWeekBox`, `profilJourneyBox`) als leere helle Balken. Kein Fehler der App: die Testfassung hatte den Verlauf im falschen Format im Speicher, `renderMeinWeg()` brach mit einem Fehler ab und `setInselbewohnerOffen()` kam nie dazu, die leeren Karten auszublenden. Mit echtem Verlaufsformat (`ts`, `before`, `after`, `bestaetigt`, `meds`) ist das Verhalten korrekt. Festgehalten, damit dieselbe Verwechslung nicht noch einmal als Fehler gemeldet wird.


## 31. Weisse Karten auf "Mein Weg" (23. Aug. 2026, zweiter Anlauf)

Christine nach §30: *"Ich finde es immer noch duester / Kann man was mit weiss machen?"*

Der erste Anlauf hatte die Karten von einem dunklen auf einen hellen Schleier umgestellt (7 % bzw. 14 % Weiss). Messbar heller, gefuehlt kaum — ein Schleier bleibt ein Schleier. Jetzt sind die Karten **wirklich weiss**, mit dunkler Schrift darin. Der Rahmen der Seite bleibt violett, damit "Mein Weg" weiter zur uebrigen App gehoert.

### Umgesetzt ueber Variablen innerhalb der Karte

```css
body[data-step="meditation"] .card{
  background:#faf9fd;
  --card:#ffffff; --flaeche-hoch:#ffffff;
  --ink:#241f3d; --ink-soft:#5d5678;
  --gold:#4a3f8a; --gold-soft:#7566c4; --gold-deep:#4a3f8a;
  --gold-grad:linear-gradient(135deg,#7566c4,#4a3f8a);
  --line:rgba(36,31,61,.13);
  color:#241f3d;
}
```

Farbvariablen vererben sich — dieser eine Block stellt Schrift, Zweittext, Akzent, Linien und Balken in **jeder** Karte zugleich um. Ohne ihn haetten ein Dutzend Einzelregeln nachgezogen werden muessen, jede mit eigener Spezifitaet und eigener Reihenfolge.

Wichtig darin: der Akzent wechselt von Perle (hell) auf Violett (dunkel). Perle auf Weiss waere praktisch unsichtbar gewesen — dieselbe Falle wie beim Zweittext in §26.

### Was ausserhalb der Variablen nachgezogen werden musste

Drei Gruppen, die ihre Farbe **nicht** aus einer Variablen beziehen:

1. **Fest verdrahtetes `#2a2a26`** — die Schriftfarbe auf allen Flaechen, die den Akzent tragen (`.btn-dark`, `.fd-card-play`, `.avatar-stift`, `.week-cell.on .kreis`, `.wert-chip.active`, `.mini-btn.primary`, `.schritt .nr`, `.status-cta-btn`). Dunkelbraun auf hellem Perle war richtig, auf dunklem Violett nicht. Alle auf Weiss gestellt.
2. **Die gezeichneten Symbole** — alle 43 sind in Perle angelegt, fuer dunkle Untergruende. Auf einer weissen Karte verschwinden sie. Sie werden dort per `filter:brightness(.30) saturate(.35)` abgedunkelt; auf den violetten Feldern (Profilbild, Miniaturbild einer Zeile) bleiben sie hell. Damit die Ausnahme greift, muss sie **dieselbe Spezifitaet** tragen wie die Regel — `img[src^="icon-"]` gehoert also auch in den Ausnahme-Selektor, sonst verliert sie.
3. **Die Fortschritts-Grafik** — SVG erbt keine Textfarbe; `.balken`, `.achs-text` und `.wert-text` brauchen eigene Werte.

### Nebenbefund: ein gruener Ring aus der ersten Farbfassung

Beim Testen des Fensters "Ziel festlegen" fiel ein **mintgruener** Ring am nicht gewaehlten Auswahlpunkt auf: `.radio-opt .dot` stand seit jeher auf dem festen Wert `#c3d1c9`, folgte keiner Variablen und hatte darum alle Farbwechsel (Creme, Grau, Denim, Meerestiefe, Violett) unbeschadet ueberstanden. Jetzt `var(--ink-soft)`, damit er ueberall mitzieht — auf dunklen Seiten hell, in den weissen Karten dunkel.

**Lehre, zum dritten Mal in diesem Projekt (nach §24 und §27):** Was keine Variable hat, aendert sich nie mit. Nach einem Farbwechsel gezielt nach festen Farbwerten im Stylesheet suchen, nicht nur nach den Variablen.

### Geprueft wurde

Seite oben und unten, Insel-Woche und Inselreise aufgeklappt, Fortschritts-Grafik geoeffnet, Fenster "Mein Bild", Fenster "Ziel festlegen" — jeweils bei 390 mal 844 Punkten, dreifache Aufloesung.

### Nachtrag, gleicher Tag: wieder entfernt

Christine hat die weissen Karten **abgelehnt** — *"gefaellt mir gar nicht mit weiss"*, *"bitte stoppen ich finde diese varianten haesslich"*. Die Seite steht wieder auf dem Stand von §30: violetter Verlauf, helle Karten als Schleier darauf. Der Abschnitt bleibt hier stehen, damit der Weg nachvollziehbar ist und niemand denselben Vorschlag ein zweites Mal macht.

**Behalten wurde nur der Nebenbefund:** der mintgruene Ring am Auswahlpunkt (`.radio-opt .dot`) haengt jetzt an `var(--ink-soft)`. Das war ein Fehler aus der ersten Farbfassung und hat mit Weiss nichts zu tun.


## 32. Kein Fehler: die Leiste im iPhone-Ganzseiten-Bild (23. Aug. 2026)

Christine hat zweimal gemeldet, die untere Leiste stehe mitten auf der Seite und scrolle mit — *"das war gestern nicht so"*. Nachgeprueft, beides widerlegt:

**1. Seit gestern hat sich an der Leiste nichts geaendert.** Der Vergleich des Standes von gestern Abend mit heute zeigt in allen Regeln zu Position, Hoehe, Ueberlauf und Abstand nach unten **keine einzige Aenderung**. Die einzige Zeile, die den Suchbegriff `position:` enthaelt, ist der Auswahlpunkt aus §31 — dessen `position:relative` hat mit der Leiste nichts zu tun.

**2. Die Leiste bleibt auf jeder Seite unten.** Gemessen bei 390 mal 844 Punkten, auf allen elf Seiten, jeweils bei 0 %, 50 % und 100 % Scrollhoehe: Unterkante der Leiste = Unterkante des Fensters, immer, `position: fixed`.

| Seite | bleibt unten |
|---|---|
| Startseite, Kompass, Meditationen, Mein Weg | ja |
| Einstellungen, Abo, Ueber, Konto | ja |
| Impressum, Datenschutz, App-Info | ja |

**Was sie wirklich sieht:** ein Ganzseiten-Bildschirmfoto des iPhones. Bei einer langen Seite setzt iOS mehrere Aufnahmen zu einem Bild zusammen und klebt fest stehende Elemente an der Stelle hinein, an der sie im Moment der Aufnahme standen — also mittendrin. Der eindeutige Beleg steckt in denselben Bildern: die **Uhrzeit und die Statusleiste des iPhones** liegen quer ueber dem Seiteninhalt. Auch die stehen dort in Wirklichkeit nicht.

**Lehre fuer kuenftige Meldungen:** Zeigt ein gemeldetes Bild die iPhone-Statusleiste ueber dem Inhalt, ist es ein zusammengesetztes Ganzseiten-Foto — fest stehende Elemente darin nie als Fehler lesen. Vor jeder Aenderung erst messen.

### Nachtrag: Vorsorge an der Leiste selbst

Christine hat die Meldung nach der Erklaerung noch zweimal wiederholt. Die Messung bleibt, wie sie ist — nachstellen liess sich nichts. Es gibt aber eine bekannte Schwaeche von Safari auf dem iPhone, die genau so aussieht wie das Gemeldete: ein fest stehendes Element mit `backdrop-filter` wird beim Schwung-Scrollen zu spaet neu gezeichnet und bleibt fuer den Bruchteil einer Sekunde dort stehen, wo es vorher war. Zwei Aenderungen an der Leiste, beide ohne sichtbare Wirkung:

- **`backdrop-filter: blur(10px)` entfernt.** Der Untergrund war ohnehin zu 97 % deckend; er ist jetzt ganz deckend (`#0a1a2c`). Der Weichzeichner hat also nie etwas gezeigt, aber bei jedem Bild Rechenzeit gekostet — genau die Kombination, die den Fehler ausloest.
- **`transform: translateZ(0)` ergaenzt.** Damit bekommt die Leiste eine eigene Ebene und das Geraet uebernimmt das Stehenbleiben selbst, statt es bei jedem Einzelbild neu zu rechnen.

**Falls es erneut gemeldet wird:** der naechste Hebel waere `background-attachment: fixed` am Untergrund — auf iPhones die zweite bekannte Quelle solcher Zeichenfehler. Das aendert allerdings das Aussehen (der Farbverlauf wuerde sich dann ueber die ganze Seitenlaenge ziehen statt ueber die Bildschirmhoehe), darum nicht ohne Christines Zustimmung.


## 33. Keine goldene Schrift mehr (23. Aug. 2026, Christines Entscheid)

Nachdem die drei Zahlen auf "Mein Weg" von Perle auf Weiss gewechselt sind (§32-Umfeld), fiel Christine der Rest auf: *"bei mein weg hat es wieder goldige schrift / ist nicht schoen"*. Gemessen wurde daraufhin die ganze App — jedes sichtbare Textelement auf allen elf Seiten, gesucht nach Schriftfarben, die waermer als neutral sind. Ergebnis: **24 Regeln**, verteilt ueber jede Seite.

Christine hat sich fuer "in der ganzen App" entschieden. Die Trennlinie:

**Schrift wird weiss** (`var(--ink)`) — kleine Grossbuchstaben-Labels, Zwischentitel auf den Info-Seiten, Links, Preise, Abzeichen, der Hinweistext unter den Zahlen, die Hervorhebung der aktuellen Stufe der Inselreise, die "Details"-Knoepfe, das Zeichen ▶ und der aktive Reiter unten.

**Perle bleibt**, wo sie kein Text ist, sondern eine Flaeche oder ein Zustand:
- gefuellte Knoepfe und aktive Filter (`--gold-grad`) samt ihrer dunklen Schrift
- der Fortschrittsbalken und die Balken der Grafik
- alle Raender, die eine Auswahl markieren (`border-color`)
- der **Stern** fuer Favoriten. Er ist der einzige bewusst behaltene Text-Fall: sein Gegenstueck (nicht gemerkt) steht auf `--ink-soft`, und zwischen `--ink-soft` und `--ink` waere der Unterschied zu klein, um "gemerkt" von "nicht gemerkt" zu unterscheiden.

Damit ist Perle nur noch das Zeichen fuer **die eine Haupthandlung** und fuer **ausgewaehlt** — genau die Rolle, die §22 dem Akzent zugedacht hatte, jetzt konsequent.

### Eine Folge, die mitbedacht werden musste

Der aktive Reiter unten war allein an der Farbe zu erkennen. Weiss neben dem hellen Blaugrau der uebrigen drei reicht dafuer nicht. Er ist darum jetzt zusaetzlich **fett** (`font-weight:800`) — sonst waere nach dem Farbwechsel nicht mehr zu sehen gewesen, auf welcher Seite man gerade ist.

Der Ring um das ▶ war ebenfalls in Perle (`rgba(239,230,216,.55)`) und ist auf denselben hellen Ton gezogen worden — ein weisses Zeichen in einem warmen Ring waere schlechter gewesen als beides warm.

**Nicht angeruehrt:** "Verlauf loeschen" steht auf `#f0968a`. Das ist kein Gold, sondern die Warnfarbe, und soll warm bleiben.

### Nachtrag: mehr Luft zwischen den Abschnitten (23. Aug. 2026)

Christine: *"mein weg mehr abstand zwischen den abschnitten"*. Der Abstand ueber jedem Zwischentitel auf "Mein Weg" geht von **28 auf 46 Punkte**.

Der Grund, warum ausgerechnet diese Seite ihn braucht: sie traegt vier Bloecke (Insel-Aufenthalt, Fortschritt, Wochenziel, letzte Meditationen) und ist die einzige, die man dafuer scrollen muss. Bei 28 Punkten stand ein Zwischentitel fast gleich weit von der Karte darueber wie von der darunter — er sah dann aus, als gehoere er nach oben.

Das Verhaeltnis ist jetzt **46 zu 11**: viermal so viel Luft zwischen zwei Abschnitten wie zwischen einem Titel und dem, was zu ihm gehoert. Nur auf dieser Seite gesetzt; die uebrigen sind kuerzer und kommen mit 28 aus, die Startseite mit 34 (dort muss alles ohne Scrollen aufs Bild).


## 34. Die Leiste unten: Ursache gefunden und behoben (23. Aug. 2026)

In §32 war die Meldung "die Leiste steht mitten auf der Seite" als Foto-Artefakt eingeordnet worden — belegt durch Messung und durch die iPhone-Statusleiste, die in denselben Bildern quer ueber dem Inhalt lag. Das stimmt fuer die Bilder. Es war aber nicht die ganze Geschichte.

Beim vierten Mal hat Christine die **Bedingung** genannt: *"wenn ich mein insel aufenthalt aufklappe ist die menuleiste auf meinem Natel wieder in der mitte"*. Damit passt plotzlich alles zusammen — auch ihre frueheren Meldungen:

| Gemeldet auf | Was kurz davor passiert war |
|---|---|
| Mein Weg | "Mein Insel-Aufenthalt" aufgeklappt — zwei Karten kommen dazu |
| Kompass | Der Zeiger war gesetzt, die Empfehlung eingeblendet |
| Bibliothek | Lange Liste, Kacheln erscheinen und verschwinden beim Suchen |

Der gemeinsame Nenner ist nicht die Seite, sondern das Ereignis: **die Seite wird ploetzlich hoeher oder niedriger.**

### Die Ursache

`background-attachment: fixed` am `<body>`. Auf iPhones ist das die bekannteste Ursache dafuer, dass fest stehende Elemente nach einer Aenderung der Seitenhoehe an der alten Stelle gezeichnet werden: Safari behandelt einen so befestigten Hintergrund als eigene, teure Ebene und rastert bei jeder Hoehenaenderung neu — fest stehende Nachbarn bleiben dabei fuer einen Moment zurueck.

Das erklaert auch, warum es sich hier nie nachstellen liess: die Messung im Testbrowser stimmte jedes Mal, weil dieser Zeichenfehler nur unter Safari auf dem Geraet auftritt.

### Die Loesung

Der Farbverlauf liegt jetzt in einer **eigenen fest stehenden Ebene** statt am body:

```css
body{ background:var(--cream); }
body::before{
  content:""; position:fixed; inset:0; z-index:-1; pointer-events:none;
  background:linear-gradient(180deg, var(--cream) 0%, var(--cream-2) 100%);
}
body[data-step="splash"]::before{ display:none; }
```

Sichtbar ist das **identisch** — der Verlauf steht weiterhin am Bildschirm, nicht am Seiteninhalt. Aber eine fest stehende Ebene mit gewoehnlichem Hintergrund geht einen anderen Weg durch den Zeichner als `background-attachment: fixed` und loest den Fehler nicht aus. Alle Seiten nachgeprueft, einschliesslich Titelseite (die ihre eigene ruhige Farbe behaelt, darum die Ausnahme).

### Sicherheitsgurt dazu

Zusaetzlich wird die Leiste angestupst, sobald sich die Hoehe des Seiteninhalts aendert — ueber einen `ResizeObserver` am body, damit nicht jede einzelne Auf- und Zuklapp-Stelle angefasst werden muss. Das Anstupsen setzt die Deckkraft fuer ein einziges Bild auf 0,999 und danach zurueck: unsichtbar, und es aendert keine Groesse, kann sich also nicht selbst ausloesen.

**Lehre:** Eine Messung, die den Fehler nicht reproduziert, widerlegt die Meldung nicht — sie sagt nur, dass die Bedingung fehlt. In §32 war die Erklaerung zum Foto richtig und trotzdem unvollstaendig. Die entscheidende Frage waere frueher gewesen: *was hast du unmittelbar davor getan?*
