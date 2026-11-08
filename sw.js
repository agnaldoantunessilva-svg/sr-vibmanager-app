const CACHE_NAME = 'vibmanager-v1';
const urlsToCache = [
  './teste.html',
  './manifest.json'
];

// Instala o Service Worker e salva os arquivos no cache (para abrir mais rápido)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercepta as requisições para funcionar offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Retorna do cache se estiver lá
        }
        return fetch(event.request); // Senão, busca na internet
      })
  );
});