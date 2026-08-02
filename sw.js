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
const CACHE_NAME = "myisland-cache-v1";
const SHELL_FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./insel.jpg",
  "./insel-start.jpg",
  "./logo.png",
  "./icon-180.png"
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
