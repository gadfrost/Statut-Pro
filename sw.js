// Nom du cache
const CACHE_NAME = 'statut-pro-cache-v2'; // J'ai changé le nom pour forcer la mise à jour

const urlsToCache = [
  '/Statut-Pro/',
  '/Statut-Pro/index.html',
  // On ne met plus en cache les fichiers qui changent souvent pour l'instant
];

// Forcer le nouveau Service Worker à s'activer immédiatement
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    }).then(() => self.skipWaiting()) // Force l'activation
  );
});

self.addEventListener('activate', event => {
  // Supprimer les anciens caches
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim()) // Prend le contrôle de la page
  );
});

// Stratégie "Network First" : Toujours essayer de récupérer la version en ligne d'abord
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
