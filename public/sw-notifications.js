/**
 * Thyself — Daily Reminder Service Worker
 *
 * Registered from settings when user enables device notifications.
 * Checks once per hour whether a daily reminder should fire.
 */

const CACHE_NAME = "thyself-sw-v1";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// Periodic background sync fires the notification check
self.addEventListener("periodicsync", (event) => {
  if (event.tag === "daily-reminder") {
    event.waitUntil(checkAndNotify());
  }
});

// Also check on push (for future server-sent pushes)
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  event.waitUntil(
    self.registration.showNotification(data.title ?? "Thyself", {
      body: data.body ?? "Time to practice! Keep your streak alive 🔥",
      icon: "/icons/icon-192x192.png",
      badge: "/icons/icon-72x72.png",
      tag: "thyself-daily",
      renotify: true,
      data: { url: "/daily" },
    })
  );
});

// Notification click — open the app to /daily
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then((clients) => {
      for (const client of clients) {
        if (client.url.includes(self.location.origin) && "focus" in client) {
          client.navigate("/daily");
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow("/daily");
      }
    })
  );
});

async function checkAndNotify() {
  // Read the scheduled time from a broadcast channel or IndexedDB
  // For now, fire at 19:00 if not practiced today
  const now = new Date();
  const hour = now.getHours();

  // Only fire between 7pm and 9pm
  if (hour < 19 || hour >= 21) return;

  // Check if we already notified today
  const todayKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
  const cache = await caches.open(CACHE_NAME);
  const stored = await cache.match("last-notif-date");
  const lastDate = stored ? await stored.text() : null;
  if (lastDate === todayKey) return; // already notified today

  await self.registration.showNotification("Thyself", {
    body: "Don't lose your streak today! A quick practice keeps it alive 🔥",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/icon-72x72.png",
    tag: "thyself-daily",
    data: { url: "/daily" },
  });

  // Record that we notified today
  await cache.put("last-notif-date", new Response(todayKey));
}
