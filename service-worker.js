/* eslint-disable no-restricted-globals */

const cacheName = 'your-cache-name';
const filesToCache = [
  '/',
  '/index.html',
  // Add other paths or assets you want to cache
  // '/path/to/your/asset.png',
  // '/path/to/your/another-asset.css',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
