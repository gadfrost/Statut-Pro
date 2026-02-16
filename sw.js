// Nom du cache
const CACHE_NAME = 'statut-pro-cache-v1';

// Fichiers à mettre en cache
const urlsToCache = [
  '/Statut-Pro/',
  '/Statut-Pro/index.html',
  '/Statut-Pro/manifest.json',
  '/Statut-Pro/icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Lobster&family=Pacifico&family=Roboto:wght@900&family=Caveat:wght@700&family=Oswald:wght@700&family=Anton&family=Bebas+Neue&display=swap'
];

// Étape d'installation : ouvrir le cache et ajouter les fichiers
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache ouvert');
        return cache.addAll(urlsToCache);
      })
  );
});

// Étape de fetch : servir depuis le cache si disponible
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Si la ressource est dans le cache, on la retourne
        if (response) {
          return response;
        }
        // Sinon, on fait une requête réseau
        return fetch(event.request);
      }
    )
  );
});
