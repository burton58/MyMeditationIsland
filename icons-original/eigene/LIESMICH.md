# Selbst gezeichnete Symbole

Diese drei sind **Muster**, entstanden am 7. Aug. 2026, und noch **nicht in
der App eingebaut**.

## Warum es sie gibt

Die Symbole für die Zugangs-Karte kamen aus ChatGPT zweimal in einer Form, die
in der App nicht funktioniert — einmal als Leuchtreklame (nach Abzug des
Scheins praktisch leer), einmal zweifarbig und ausgefüllt. Weil es sich um
sehr einfache Linienzeichnungen handelt, lassen sie sich direkt als SVG
zeichnen. Die drei hier zeigen, wie das aussieht.

Christine entscheidet, ob die restlichen Symbole weiter über ChatGPT entstehen
oder auf diesem Weg.

## Was drin ist

| Datei | Motiv | wofür gedacht |
|---|---|---|
| `haken.svg` / `icon-haken.png` | Haken in einem Kreis | Zugangs-Karte „Abo aktiv" (heute ✅) |
| `sanduhr.svg` / `icon-sanduhr.png` | Sanduhr | Zugangs-Karte „Testphase läuft" (heute ⏳) |
| `schloss.svg` / `icon-schloss.png` | geschlossenes Vorhängeschloss | Zugangs-Karte „Test beendet" (heute 🔒) |

## Wie sie gemacht sind

`zeichne.js` enthält die Motive als kurze SVG-Pfade und rendert sie mit
Chromium zu PNG (240×240, durchsichtiger Hintergrund). Aufruf:

```
node icons-original/eigene/zeichne.js
```

Die Werte sind so gewählt, dass sie zur bestehenden Familie passen:

- **Farbe** `#8A6A2F` — derselbe Ton wie die elf Stimmungsbilder
- **Strichstärke** 5,2 bei einem Feld von 100 × 100 — zwischen der feineren
  Wolke und den kräftigeren Zeichnungen
- **runde Enden und Ecken** (`stroke-linecap`/`-linejoin: round`)
- **keine Füllung** (`fill: none`), Motiv füllt rund drei Viertel des Feldes

Wer ein Motiv ändern will, ändert den SVG-Pfad in `zeichne.js` und lässt das
Skript neu laufen — Farbe und Strichstärke stehen dort als zwei Werte ganz
oben und gelten für alle.
