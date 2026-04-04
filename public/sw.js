// Thyself PWA Service Worker
// Caches all static assets for offline use

const CACHE_NAME = "thyself-v1";

// Assets to pre-cache on install
const PRECACHE_URLS = [
  "/",
  "/daily",
  "/profile",
  "/enneagram",
  "/thyself-logo.svg",
  "/manifest.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // Clean up old caches
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Only handle GET requests
  if (event.request.method !== "GET") return;

  // Skip cross-origin requests
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          // Cache successful responses for static assets
          if (
            response.ok &&
            (url.pathname.startsWith("/_next/static") ||
              url.pathname.startsWith("/sprites") ||
              url.pathname.startsWith("/sounds") ||
              url.pathname.match(/\.(svg|png|jpg|webp|woff2|css|js)$/))
          ) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => {
          // Offline fallback for navigation requests
          if (event.request.mode === "navigate") {
            return caches.match("/") || new Response("Offline", { status: 503 });
          }
        });
    })
  );
});
