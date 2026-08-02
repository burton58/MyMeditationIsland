# Checkliste vor der Live-Schaltung

Das ist die laufende Liste aller offenen Punkte, bevor mit „My Meditation Island"
wirklich Geld verdient werden kann. Frag mich jederzeit „wie ist der Stand?"
oder „zeig mir die Checkliste" – ich halte diese Datei aktuell und hake ab,
was erledigt ist.

Stand: 2. August 2026

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
- [ ] **Passende Hintergrundbilder je Meditationsthema** statt immer der Insel
      (z. B. bei „Fantasiereise: Bergspitze" läuft aktuell trotzdem das
      Insel-Boot-Foto).
- [ ] **Kompass per Tastatur bedienbar machen**, für Menschen, die nicht
      wischen können.

## 3. Kann warten, lohnt sich aber früh

- [ ] Einfache, anonyme Nutzungs-Zahlen einführen.
- [ ] Eigene Bestätigungs-Karte für „Verlauf löschen" statt des grauen
      System-Dialogs.
- [ ] Grundlegende Offline-Fähigkeit, falls die Verbindung mal fehlt.

---

## Schon erledigt

- [x] Impressum ergänzt (Yoga Island – Christine Maranta Gutmann, Heinrichstrasse 241,
      8005 Zürich, chris@yogaisland.ch) – erreichbar über Profil und die Abo-Seite.
- [x] Datenschutzerklärung ergänzt (ehrlich beschrieben: alles bleibt auf dem
      Gerät, kein Server, kein Konto, Hinweis auf den Begleiter-Chat-Versuch
      und auf GitHub Pages als Hosting).
