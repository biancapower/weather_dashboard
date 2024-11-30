const CACHE_VERSION = 'v1';
const CACHE_NAME = `weather-dashboard-${CACHE_VERSION}`;

const CACHED_ASSETS = [
  '/',
  '/icon.png',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CACHED_ASSETS))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch new version
        return response || fetch(event.request)
          .then(response => {
            // Cache new successful responses
            if (response.ok && event.request.method === 'GET') {
              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => cache.put(event.request, responseToCache));
            }
            return response;
          });
      })
  );
});
