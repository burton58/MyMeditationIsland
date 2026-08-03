# Checkliste vor der Live-Schaltung

Das ist die laufende Liste aller offenen Punkte, bevor mit „My Meditation Island"
wirklich Geld verdient werden kann. Frag mich jederzeit „wie ist der Stand?"
oder „zeig mir die Checkliste" – ich halte diese Datei aktuell und hake ab,
was erledigt ist.

Stand: 3. August 2026 (zuletzt aktualisiert: Wochenziel-Knopf und neue Kategorie-Icons optisch nachgebessert)

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

## 2. Das erledige ich im Code, sobald du mir sagst „jetzt"

- [ ] **Datenschutzerklärung um den echten Zahlungsanbieter ergänzen**, sobald
      Punkt 1 (Zahlungsanbieter) feststeht.
- [ ] **`ABO_LIVE` auf „an" stellen** – erst dann werden Preise wirklich
      verlangt und die Bibliothek für Nicht-Zahlende gesperrt.
- [ ] **Konto/Cloud-Speicherung einbauen**, damit ein Gerätewechsel niemanden
      seinen bezahlten Zugang kostet (aktuell liegt alles nur auf einem Gerät –
      „Abo wiederherstellen" ist bisher nur eine Attrappe ohne Funktion).

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
      Hintergrund fast unter – sie haben jetzt denselben goldenen Ring wie
      die Stimmungs-Anzeige beim Kompass, damit sie mehr hervorstechen.
