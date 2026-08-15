// Sorgt dafür, dass die App auch ohne Internetverbindung startet (z. B. im
// Zug oder Flugzeug) - genau der Moment, in dem eine Achtsamkeits-App oft
// gebraucht wird. Strategie bewusst "immer zuerst das Netz fragen, nur bei
// Fehler den Speicher nutzen" (network-first), NICHT "immer aus dem
// Speicher" - so bleibt die App online immer aktuell, und der Service
// Worker wird nicht selbst zu einer neuen Quelle für alte, hängengebliebene
// Inhalte (siehe die iPhone-Zwischenspeicher-Probleme in SPEC.md §1).
//
// CACHE_NAME bei jeder wichtigen Aenderung mit hochzaehlen (gleiche Idee
// wie AKTUELLE_VERSION in index.html) - das raeumt alte Speicherstaende auf.
const CACHE_NAME = "myisland-cache-v89";
const SHELL_FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./insel.jpg",
  "./insel-start.jpg",
  // Titelseite und Startseite seit 10. Aug. 2026: Christines eigene Fotos.
  // Die Startseite hat vier davon - eines je Tageszeit (tageszeitBild()).
  "./titel.jpg",
  "./start.jpg",
  "./start-morgen.jpg",
  "./start-tag.jpg",
  "./start-abend.jpg",
  "./start-nacht.jpg",
  // Die vier grossen Fotokacheln in der Bibliothek.
  "./kat-nord.jpg",
  "./kat-sued.jpg",
  "./kat-west.jpg",
  "./kat-ost.jpg",
  "./logo.png",
  "./icon-180.png",
  "./bg-waldlichtung.jpg",
  "./bg-bergspitze.jpg",
  "./bg-winterlandschaft.jpg",
  "./bg-bergsee.jpg",
  "./bg-lichtraum.jpg",
  "./bg-warmeszuhause.jpg",
  "./bg-herzraum.jpg",
  "./bg-reinigend.jpg",
  "./icon-gedanken.png",
  "./icon-gefuehle.png",
  "./icon-stress.png",
  "./icon-entspannen.png",
  // Quadratische Miniaturen (160x160) derselben acht Fotos - das kleine
  // Bild links in jeder Listenzeile, seit 5. Aug. 2026.
  "./thumb-waldlichtung.jpg",
  "./thumb-bergspitze.jpg",
  "./thumb-winterlandschaft.jpg",
  "./thumb-bergsee.jpg",
  "./thumb-lichtraum.jpg",
  "./thumb-warmeszuhause.jpg",
  "./thumb-herzraum.jpg",
  "./thumb-reinigend.jpg",
  // Die elf gezeichneten Stimmungsbilder - seit 7. Aug. 2026 stehen sie
  // ueberall dort, wo vorher ein Emoji war (Kompass, Abschluss-Seite,
  // Insel-Woche, Rueckblick).
  "./icon-ausgeglichen.png",
  "./icon-gruebelnd.png",
  "./icon-angespannt.png",
  "./icon-gedankenvoll.png",
  "./icon-gelassen.png",
  "./icon-aufgewuehlt.png",
  "./icon-unruhig.png",
  "./icon-geborgen.png",
  "./icon-entspannt.png",
  "./icon-unberuehrt.png",
  "./icon-sonnenaufgang.png",
  // Die vier Bilder der Zugangs-Karte in den Einstellungen - seit
  // 7. Aug. 2026 gezeichnet statt 🤍 ✅ ⏳ 🔒.
  "./icon-zugang-offen.png",
  "./icon-zugang-aktiv.png",
  "./icon-zugang-test.png",
  "./icon-zugang-zu.png",
  // Die verstreuten Symbole - seit 7. Aug. 2026 gezeichnet statt
  // ☀️ 🌴 🌙 🇨🇭 🧘. Sonne, Palme und Mond stehen in der Begruessung
  // ganz oben auf der Startseite.
  "./icon-sonne.png",
  "./icon-palme.png",
  "./icon-mond.png",
  "./icon-schweizerkreuz.png",
  "./icon-sitzende.png",
  // Inselreise, Einstellungs-Liste, Insel gestalten und die acht
  // Profilbilder - seit 8. Aug. 2026 gezeichnet. Damit ist die App
  // vollstaendig emoji-frei.
  "./icon-boot.png",
  "./icon-anker.png",
  "./icon-kompassrose.png",
  "./icon-insel-zwei-palmen.png",
  "./icon-zahlkarte.png",
  "./icon-schluessel.png",
  "./icon-person.png",
  "./icon-info.png",
  "./icon-schriftrolle.png",
  "./icon-papierkorb.png",
  "./icon-wolke.png",
  "./icon-welle-flach.png",
  "./icon-welle-bewegt.png",
  "./icon-mann.png",
  "./icon-strandliege.png",
  "./icon-hibiskus.png",
  "./icon-muschel.png",
  "./icon-taube.png",
  "./icon-lotus.png"
];

self.addEventListener("install", function(event){
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      return cache.addAll(SHELL_FILES).catch(function(){ /* einzelne Datei fehlt - kein Absturz */ });
    })
  );
});

self.addEventListener("activate", function(event){
  event.waitUntil(
    caches.keys().then(function(names){
      return Promise.all(names.filter(function(n){ return n !== CACHE_NAME; }).map(function(n){ return caches.delete(n); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function(event){
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request).then(function(response){
      var kopie = response.clone();
      caches.open(CACHE_NAME).then(function(cache){ cache.put(event.request, kopie); });
      return response;
    }).catch(function(){
      return caches.match(event.request).then(function(cached){
        return cached || caches.match("./index.html");
      });
    })
  );
});
