// Thyself PWA Service Worker
// Strategy:
//   - /_next/static/** → cache-first (content-hashed filenames, safe forever)
//   - Everything else  → network-first (always fresh, fall back to cache offline)

const CACHE_NAME = "thyself-static-v2";

self.addEventListener("install", () => {
  // Activate immediately — don't wait for old tabs to close
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // Delete any caches from previous versions
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // Only handle same-origin requests
  if (url.origin !== location.origin) return;

  // ── Immutable static assets (Next.js content-hashes these filenames) ──
  // Cache-first: filename changes on every deploy, so stale is impossible
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          if (response.ok) {
            caches
              .open(CACHE_NAME)
              .then((cache) => cache.put(event.request, response.clone()));
          }
          return response;
        });
      })
    );
    return;
  }

  // ── Everything else: Network-first ──
  // Pages, API routes, images, sprites — always try network so users see updates
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache successful non-navigation responses for offline fallback
        if (response.ok && event.request.mode !== "navigate") {
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(event.request, response.clone()));
        }
        return response;
      })
      .catch(() => {
        // Offline: serve from cache if available
        return caches.match(event.request).then(
          (cached) =>
            cached ||
            (event.request.mode === "navigate"
              ? caches.match("/")
              : new Response("Offline", { status: 503 }))
        );
      })
  );
});
