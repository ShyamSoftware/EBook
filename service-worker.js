// Service Worker for EBook PWA - Shyam Software Branding

const CACHE_NAME = 'Shyam-EBook-v2';
const RUNTIME_CACHE = 'Shyam-EBook-runtime-v2';
const urlsToCache = [
  './',
  './index.html',
  './css/style.css',
  './js/db.js',
  './js/ui.js',
  './js/app.js',
  './js/i18n.js',
  './manifest.json',
  './Logo-192.png',
  './Logo-512.png'
];

// Install Event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate Event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            caches.open(RUNTIME_CACHE)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

// Push Notifications
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'New notification',
    icon: 'https://raw.githubusercontent.com/ShyamSoftware/BusinessERP/3e4f308dc12f1c7963ddbc7bace86fa9015602d2/Logo.png',
    badge: 'https://raw.githubusercontent.com/ShyamSoftware/BusinessERP/3e4f308dc12f1c7963ddbc7bace86fa9015602d2/Logo.png'
  };

  event.waitUntil(
    self.registration.showNotification('Shyam EBook', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      // Focus on existing window if open
      for (let client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      // Open new window if not open
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
