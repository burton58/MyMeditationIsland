# Checkliste vor der Live-Schaltung

Das ist die laufende Liste aller offenen Punkte, bevor mit „My Meditation Island"
wirklich Geld verdient werden kann. Frag mich jederzeit „wie ist der Stand?"
oder „zeig mir die Checkliste" – ich halte diese Datei aktuell und hake ab,
was erledigt ist.

Stand: 3. August 2026 (zuletzt aktualisiert: Stufen der Inselreise offengelegt)

---

## 1. Das musst du (bzw. Fachleute) ausserhalb der App klären

- [ ] **Zahlungsanbieter auswählen und anschliessen** (z. B. Stripe, PayPal, Wallee) –
      ohne das kann niemand wirklich bezahlen.
- [ ] **Meditationen einsprechen.** Auf der Titelseite und bei „Über mich" steht
      schon „gesprochen von …" – das muss stimmen, bevor bezahlt wird.
- [ ] **Rechtliche Prüfung von Impressum und Datenschutzerklärung.** Beide Texte
      sind sorgfältig, aber von mir geschrieben, nicht von einer Anwältin –
      einmal gegenlesen lassen, besonders wegen Schweiz/EU-Vorgaben.
- [ ] **Hausnummer „Heinrichstrasse 241" bestätigen** – prüfen, ob das wirklich
      die Nummer ist oder ob sich ein Zeichen eingeschlichen hat.
- [ ] **Entscheiden, ob und wie Nutzung gemessen werden soll** (z. B. wie viele
      die Testphase abschliessen) – das ist auch eine Datenschutz-Frage, nicht
      nur eine technische.
- [ ] **Foto für den Begleiter aussuchen** (eine meditierende Person). Der
      Platz dafür ist in der App schon eingebaut – sobald du mir das Bild
      schickst, erscheint es automatisch. Bis dahin steht dort das
      Sprechblasen-Zeichen. Passender Prompt für ChatGPT: *Grundstil aus
      der Bild-Anleitung einfügen, dann:* „Motiv: eine ruhige Person in
      aufrechter Meditationshaltung, von der Seite oder leicht von hinten,
      vor weichem goldenem Licht. Kein erkennbares Gesicht. Quadratisch,
      Person mittig – das Bild wird rund zugeschnitten."

## 2. Das erledige ich im Code, sobald du mir sagst „jetzt"

- [ ] **Datenschutzerklärung um den echten Zahlungsanbieter ergänzen**, sobald
      Punkt 1 (Zahlungsanbieter) feststeht.
- [ ] **`ABO_LIVE` auf „an" stellen** – erst dann werden Preise wirklich
      verlangt und die Bibliothek für Nicht-Zahlende gesperrt.
- [ ] **Konto/Cloud-Speicherung einbauen**, damit ein Gerätewechsel niemanden
      seinen bezahlten Zugang kostet (aktuell liegt alles nur auf einem Gerät –
      „Abo wiederherstellen" ist bisher nur eine Attrappe ohne Funktion).
- [ ] **Eigene Symbole statt Emoji auf der Status-Karte im Profil**
      (aktuell 🤍 ✅ ⏳ 🔒 für „offen"/„aktiv"/„Testphase"/„gesperrt") –
      beim App-weiten Formatierungs-Check aufgefallen: das ist die letzte
      Stelle, die noch Emoji statt eigener Bilder zeigt.

## 3. Kann warten, lohnt sich aber früh

- [ ] Einfache, anonyme Nutzungs-Zahlen einführen.

---

## Schon erledigt

- [x] Impressum ergänzt (Yoga Island – Christine Maranta Gutmann, Heinrichstrasse 241,
      8005 Zürich, chris@yogaisland.ch) – erreichbar über Profil und die Abo-Seite.
- [x] Datenschutzerklärung ergänzt (ehrlich beschrieben: alles bleibt auf dem
      Gerät, kein Server, kein Konto, Hinweis auf den Begleiter-Chat-Versuch
      und auf GitHub Pages als Hosting).
- [x] **Kompass per Tastatur bedienbar** – Pfeiltasten bewegen den Zeiger,
      eine Sprachausgabe-Beschreibung aktualisiert sich mit.
- [x] **Grundlegende Offline-Fähigkeit** – ein Service Worker speichert die
      App beim ersten Besuch zwischen; getestet, dass sie danach auch ganz
      ohne Verbindung startet.
- [x] **Eigene Bestätigungs-Karte für „Verlauf löschen"** statt des grauen
      System-Dialogs.
- [x] **Tab-Leiste auf der Konto-Seite ausgeblendet**, solange die App noch
      nicht betreten wurde (z. B. direkt über „Anmelden" von der Titelseite).
- [x] **„Kurze Probe" und „Preise" auf der Titelseite als echte Knöpfe**
      gestaltet (runde Pillen wie „Anmelden"), statt als reiner Text – man
      sieht jetzt sofort, dass man draufdrücken kann.
- [x] **Mindestdauer von 20 Sekunden** eingeführt, bevor eine Sitzung als
      abgeschlossen gilt und in den Verlauf/die Serie einfliesst – ein
      versehentliches sofortiges „Fertig" zählt nicht mehr mit.
- [x] **„Minuten gesamt" rundet jetzt immer aufwärts** – eine echte, kurze
      Meditation zeigt nie mehr „0 Minuten".
- [x] **Begleiter-Symbol von 🤖 auf 💬 geändert** (Bibliothek-Karte und
      Profil-Menü), damit er nicht als „echte KI" missverstanden wird,
      solange kein Schlüssel angeschlossen ist.
- [x] **Begleiter-Texte klarer geschrieben**, statt vage: Er sagt jetzt überall
      offen, was er kann – eine passende Meditation finden, dazu auf Wunsch
      ein Mudra oder Mantra vorschlagen. Nirgends mehr das Wort „KI" (ausser
      in der ehrlichen technischen Erklärung im Datenschutz-Text).
- [x] **7 Mudras mit Dauer, Chakra und Mantra-Silbe aus deinem Mudra-Guide ergänzt**
      (Gyan, Hakini, Hridaya, Anjali, Apana, Prana, Surya) – erscheint automatisch,
      wenn der Begleiter genau eines davon vorschlägt oder du dir ein Mudra
      anzeigen lässt. Nichts erfunden: die übrigen Mudras, die nicht in
      deinem Dokument stehen, zeigen weiterhin nur Anleitung und Wirkung.
- [x] **Surya Mudra neu im Begleiter** – gab es vorher nur in deinem Guide,
      jetzt auch in der App (passt zu Müdigkeit/Erschöpfung).
- [x] **SPEC.md-Stelle zum Meditationen-Untertitel nachgezogen** (Feinschliff-Punkt 17).
- [x] **Entscheid festgehalten: kein echter, bezahlter KI-Dienst für den
      Begleiter** – die kostenlose, lokale Logik bleibt dauerhaft so, wie sie
      ist. Ein echter KI-Anschluss würde einen eigenen Server und laufende
      Kosten pro Nachricht brauchen; das ist bewusst nicht geplant.
- [x] **7 neue Meditationen ergänzt** (jetzt 47 statt 40): Kronenchakra –
      Körperfreiheit, Halschakra – Widerstände lösen, Solarplexuschakra –
      Willensstärke, Sakralchakra – Vertrauen, Seelenmeditation, Kiefer
      entspannen, Reinigende Meditation. Vorher abgeglichen, dass Wurzel-,
      Herz- und Stirnchakra schon eine eigene Meditation hatten – da wurde
      nichts doppelt angelegt.
- [x] **„Deine Ziele" (Mein Weg) durch ein selbst gesetztes Wochenziel
      ersetzt** – die vier festen Balken mit der erfundenen Zahl 10 sind weg.
      Stattdessen legst du selbst fest: entweder "X Mal pro Woche" oder
      "Y Minuten pro Woche", über "Ziel festlegen"/"Ziel anpassen". Zählung
      startet immer neu ab Montag. Hinweis: "Deine Insel-Woche" im Profil
      hat weiterhin ihr eigenes, unverändertes Ziel "7 Tage" – falls
      gewünscht, liesse sich das später auch noch zusammenführen.
- [x] **Deine Bilder eingebaut**: passende Hintergrundfotos für 30 Meditationen
      (Wald, Bergspitze, Winterlandschaft, Bergsee, Licht, warmes Zuhause,
      Herzraum, plus ein Wasser-Bild extra für "Reinigende Meditation") statt
      überall der Insel; dazu die vier eigenen Kategorie-Symbole (Kopf, Herz,
      Bambus, Blatt) statt Emoji – bei den Filter-Chips, den Kategorie-Karten
      und in jeder Übungszeile. Alle Bilder liegen auch offline bereit
      (Service Worker aktualisiert).
- [x] **Profil-Seite aufgeräumt** (drei von dir gemeldete Stellen):
      „Dein Inselbewohner" tut jetzt wirklich etwas, wenn man draufklickt
      (führt zu Inselreise/-woche gleich darunter) – vorher war der Pfeil
      dort ein echter, unentdeckter Blindgänger. Die Zeile „Dein Begleiter"
      ist entfernt (war an zwei anderen Stellen schon gut erreichbar, eine
      dritte im Menü war zu viel). „Statistiken" und „Favoriten" haben
      keinen Pfeil „›" mehr, weil sie nur auf einen anderen Reiter springen,
      statt eine echte Unterseite mit Rückweg zu öffnen.
- [x] **Zwei optische Korrekturen** (von dir gemeldet): Der Knopf „Ziel
      festlegen" beim Wochenziel sass ohne Rand direkt an der Kartenrundung
      und wirkte abgeschnitten – jetzt mit richtigem Abstand wie bei den
      anderen Karten. Die vier neuen Kategorie-Symbole gingen im hellen
      Hintergrund fast unter.
- [x] **Kategorie-Symbole nochmals nachgebessert**: der erste Versuch (Ring
      wie beim Kompass) wirkte selbst zu auffällig – Hintergrund zog mehr
      Blick auf sich als das Symbol. Jetzt: Hintergrund ganz schlicht/flach,
      dafür das Symbol selbst deutlich grösser – der Hintergrund bleibt
      zurückhaltend, das Icon ist das Auffällige.
- [x] **Kategorie-Symbole deutlich fetter nachgezeichnet**: die feinen
      Linien aus dem ChatGPT-Bild waren selbst gross dargestellt noch zu
      dünn/blass, um sie richtig zu erkennen. Die vier Bilder sind jetzt neu
      aufbereitet – Linien künstlich verdickt und auf ein kräftiges,
      einheitliches Gold gesetzt statt der ausgefransten Originalfarben.
- [x] **Das ganze Icon-Feld grösser**: nicht nur das Symbol, auch der
      Hintergrund-Kasten drumherum ist jetzt deutlich grösser (in der
      Übungsliste von 50 auf 64 Pixel, bei den Kategorie-Karten von 34 auf
      46) – wächst künftig nochmal etwas, wächst das Symbol automatisch
      mit, weil es sich jetzt am Feld orientiert statt an einer festen Zahl.
- [x] **Begleiter-Text ohne Dopplung**: auf „Mein Weg" stand über der
      Chat-Box derselbe Satz zweimal fast identisch. Die doppelte Zeile ist
      weg, und der Begleiter stellt sich jetzt überall gleich vor: „Kann ich
      dir helfen, die passende Meditation zu finden – und optional dazu ein
      Mudra oder Mantra?" statt der bisherigen Aufforderung „Erzähl mir, wie
      es dir geht".
- [x] **App-weiter Formatierungs-Check**: alle Seiten der Reihe nach mit
      Screenshots durchgegangen (Schrift, Grösse, Stil, Abstände). Einen
      echten Treffer gefunden und behoben: die Insel-Gestalten-Seite hatte
      einen kleineren Titel als der Rest der App – jetzt einheitlich. Die
      vielen winzigen Schriftgrössen-Unterschiede im Rest des Codes
      (Bruchteile eines Pixels) sind bewusst unangetastet geblieben – nicht
      wahrnehmbar, aber ein Risiko für neue Fehler beim Anpassen. Einen
      echten, noch offenen Stilbruch gibt's noch (siehe Status-Karte oben
      in Punkt 2).
- [x] **Begleiter erklärt Mudras jetzt immer richtig**: bisher stand die
      Handhaltungs-Anleitung ("Zeigefinger und Daumen berühren sich,
      Handfläche nach oben" usw.) nur da, wenn man ausdrücklich nach einem
      Mudra gefragt hat. Schlug der Begleiter eines von sich aus vor (als
      Zusatz zu einer Meditation, im Abschluss-Gespräch oder bei unklarer
      Nachricht), stand bisher nur der Name da, ohne zu erklären, wie man
      es macht – jetzt überall mit Anleitung.
- [x] **Blauer Rahmen beim Kompass entfernt**: nach dem Bewegen des Zeigers
      blieb ein blauer System-Rahmen um den Kompass sichtbar (Nebenwirkung
      der Tastatur-Bedienbarkeit). Ist jetzt weg – nur noch beim Bedienen
      per Tastatur erscheint der (gewollte) goldene Ring.
- [x] **Begleiter erkennt jetzt auch „Mudra"/„Mantra" mit Tippfehler**: du
      hattest „Mudrs" geschrieben (ein Buchstabe fehlte), das wurde nicht
      erkannt – der Begleiter hat darum zufällig ein Mantra statt eines
      Mudras vorgeschlagen. Jetzt reicht schon der Wortanfang, auch mit
      kleinem Tippfehler.
- [x] **Blauer Rahmen beim Kompass endgültig weg**: der erste Versuch hatte
      nicht gereicht. Grund: Safari zeichnet um die Kompass-Zeichnung selbst
      einen eigenen Rahmen, den man dort nicht wegbekommt. Jetzt sitzt die
      Tastatur-Bedienung auf dem Kasten drumherum statt auf der Zeichnung –
      damit ist der blaue Rahmen weg, und alles andere funktioniert wie zuvor.
- [x] **„Zurück zum Profil"-Knopf bei Statistiken und Favoriten**: wer über
      das Profil dorthin geht, kommt jetzt mit einem Knopf oben wieder
      zurück. Über die Leiste unten aufgerufen erscheint er nicht – dort ist
      man ja nicht „zu Besuch".
- [x] **„Dein Inselbewohner" klappt jetzt auf und zu**: Insel-Woche und
      Inselreise sind normalerweise zugeklappt, ein Tipp zeigt sie, der
      nächste versteckt sie wieder. Der Text auf der Karte sagt jeweils, was
      als Nächstes passiert.
- [x] **Platz für das Begleiter-Foto eingebaut** – erscheint automatisch,
      sobald du mir das Bild schickst (siehe Punkt 1 oben).
- [x] **Rückblick zeigt jetzt die Abstufung**: statt nur „geborgen" steht
      dort „sehr geborgen" – genau das Wort, das auch der Kompass anzeigt.
      Gilt automatisch auch für die Vorher/Nachher-Zeilen der Insel-Woche
      im Profil. Gespeichert war das schon vorher (die Zeigerposition wird
      bei jeder Sitzung mitgeschrieben), es wurde nur gröber angezeigt.
- [x] **Abschluss-Seite aufgeräumt**: „Noch eine Meditation" ist weg – gleich
      nach einer Meditation die nächste anzubieten passte nicht zum Ausklang.
      Mudra und Mantra bleiben. Auch die Begleiter-Karte ist dort weg; nach
      einer beendeten Meditation braucht es kein Gespräch mehr. Der Begleiter
      bleibt auf „Mein Weg" und in der Bibliothek.
- [x] **„Neu beginnen" heisst jetzt „Kompass neu setzen"** und tut auch das:
      es bringt dich zurück zum Kompass, mit deinem Zustand von jetzt als
      Ausgangspunkt – nicht mehr einfach zur Startseite.
- [x] **Startseiten-Foto bleibt immer gleich gross**: bisher war das Bild der
      „Gummi“ der Seite und wurde zusammengedrückt, sobald die Liste
      länger wurde. Jetzt hat es eine feste Grösse – wächst die Liste,
      wächst einfach die Seite und man scrollt etwas.
- [x] **„Deine Lieblingsmeditationen“ auf der Startseite**: zeigt mit Platz
      1–3, welche Meditationen du am häufigsten gehört hast, samt Anzahl.
      Erscheint erst, sobald du eine Meditation mindestens zweimal gehört
      hast – vorher wäre es nur eine Wiederholung der Liste darüber.
      (Nicht zu verwechseln mit den ⭐-Favoriten: die wählst du selbst aus,
      diese Liste ergibt sich von allein aus dem, was wirklich gelaufen ist.)
- [x] **„Dein Fortschritt" zeigt jetzt den Zeitraum** („seit …", ab dem Tag,
      an dem du die App das erste Mal geöffnet hast) – vorher stand dort
      keine Angabe, worauf sich die Zahlen beziehen.
- [x] **Grafik zur Entwicklung**: ein Tipp auf die Zahlenreihe klappt zwei
      kleine Diagramme auf – Meditationen pro Tag und Minuten pro Tag,
      beide mit derselben Zeitachse. Tippst du einen Tag an, wird er in
      beiden hervorgehoben und die Zahlen dazu stehen darunter.
      (Anmerkung: Du hattest zwei Achsen in einem Bild gewünscht. Davon
      habe ich abgesehen – zwei Skalen in einem Diagramm stehen willkürlich
      zueinander und täuschen leicht einen Zusammenhang vor, den es nicht
      gibt. Zwei Diagramme untereinander zeigen dasselbe, nur ehrlicher.
      Wenn du es trotzdem anders möchtest, sag Bescheid.)
- [x] **„Deine letzten Meditationen" zeigt nur noch drei** – darunter ein
      Knopf „Alle N anzeigen" bzw. „Weniger anzeigen". Bei drei oder
      weniger Einträgen erscheint der Knopf gar nicht.
- [x] **Insel-Woche und Inselreise erscheinen jetzt direkt unter dem
      Inselbewohner-Knopf** statt weiter unten hinter der Zugangs-Karte.
- [x] **Lieblingsmeditationen ohne Nummerierung** – die Reihenfolge sagt
      den Rang ja schon.
- [x] **Skala steht jetzt auch am rechten Rand** der beiden Diagramme,
      damit man Werte auch rechts ablesen kann. Es ist dieselbe Skala
      gespiegelt – zwei verschiedene Skalen in einem Bild wären wieder
      genau die Falle, die wir vermeiden wollten.
- [x] **Karte „Dein persönliches Meditationstraining" auf „Mein Weg"
      entfernt** – sie zeigte nichts Eigenes an (immer derselbe Text, nur
      die Knopfbeschriftung wechselte) und nahm den obersten Platz der
      Auswertungsseite ein. Der Kompass ist unten in der Leiste ohnehin
      immer erreichbar. Die Seite beginnt jetzt direkt mit „Dein Fortschritt".
- [x] **Begleiter-Chat direkt bei den Meditationen**: statt eines Knopfes,
      der auf „Mein Weg" gesprungen ist, kannst du dort jetzt gleich
      schreiben – mit Eingabefeld und Sprechblasen wie beim anderen Chat.
      Beide laufen unabhängig voneinander.
- [x] **Suche mit Lupe bei den Meditationen**: filtert schon beim Tippen und
      durchsucht Titel, Beschreibung und Bereich – so findet auch „Stress",
      „Wald" oder „Chakra" etwas. Die Suche wirkt zusätzlich zum gewählten
      Chip; ein ✕ setzt sie zurück.
- [x] **Dopplung auf „Mein Weg" entfernt** (von dir bemerkt): „Alle
      Meditationen entdecken" und der Begleiter-Chat sind dort weg, weil der
      Reiter „Meditationen" genau dasselbe bietet. „Mein Weg" ist jetzt
      reine Auswertung. Der Bild-Platz fürs Begleiter-Foto ist mit in die
      Bibliothek gewandert, geht also nicht verloren.
- [x] **Grafik lässt sich jetzt eindeutig zuklappen**: Der Hinweis stand über
      der Grafik und las sich, als solle man die Grafik antippen – dort
      passiert aber nichts. Jetzt gibt es unten in der Karte einen klaren
      Knopf „Grafik zuklappen". Die Zahlenreihe schaltet weiterhin auch um.
- [x] **Profilbild ist jetzt wählbar**: Tipp auf das Bild links oben im
      Profil (es hat neu einen kleinen Stift). Acht Zeichen zur Auswahl
      oder ein eigenes Foto vom Handy. Das Foto wird klein gerechnet und
      bleibt nur auf deinem Gerät.
- [x] **Zurück-Knopf oben auf allen Unterseiten**: „Dein Zugang" und
      „Meine Insel gestalten" hatten oben keinen – jetzt schon. Er sitzt
      links, wie bei den anderen Unterseiten auch.
- [x] **Vorschlag des Begleiters direkt im Gespräch startbar**: statt
      „… steht jetzt oben als Empfehlung" (was in der Bibliothek nicht
      stimmte, da gibt es kein „oben") erscheint die Meditation jetzt als
      Karte im Chat, mit Abspiel-Knopf.
- [x] **Nur noch ein Ziel, und zwar deins**: Die Insel-Woche im Profil zeigt
      jetzt dein selbst gesetztes Wochenziel statt der festen „7 Tage".
      Hast du keines gesetzt, steht dort nur deine Serie, ohne Balken.
      Die Inselreise sagt neu „… bis zur nächsten Stufe", damit die beiden
      Zahlen nicht verwechselt werden – die eine gilt für diese Woche, die
      andere für deinen ganzen Weg.
- [x] **Startseite zeigt, was du heute wirklich gemacht hast** – auch wenn du
      den Kompass an dem Tag nicht (nochmals) gestellt hast. Vorher stand
      dort in dem Fall „Sobald du deinen Kompass gestellt hast …", obwohl
      du schon meditiert hattest.
- [x] **Stufen der Inselreise sind jetzt nachvollziehbar**: Unter jedem
      Symbol steht, ab wie vielen Meditationen die Stufe beginnt
      (ab 0 · 5 · 15 · 30 · 60). Unter „Details" stehen alle fünf Stufen
      mit Namen und Schwelle ausgeschrieben, die aktuelle mit „du bist
      hier" markiert. Gezählt werden alle Meditationen seit Beginn.
