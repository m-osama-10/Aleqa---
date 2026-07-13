/* ================================================================
 *  Alieqa Service Worker — PWA offline support
 *  Strategy:
 *  - App shell (HTML/JS/CSS): stale-while-revalidate
 *  - Static assets (icons, fonts): cache-first
 *  - API & Supabase: network-first, fallback to cache
 *  ================================================================ */

const CACHE_VERSION = "alieqa-v1.0.0";
const STATIC_CACHE = `alieqa-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `alieqa-dynamic-${CACHE_VERSION}`;
const RUNTIME_CACHE = `alieqa-runtime-${CACHE_VERSION}`;

// Assets to pre-cache on install (app shell)
const PRECACHE_URLS = [
  "/",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
  "/logo.svg",
];

// Install — pre-cache app shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

// Activate — clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => ![STATIC_CACHE, DYNAMIC_CACHE, RUNTIME_CACHE].includes(key))
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Helper: determine cache strategy based on request
function getStrategy(url) {
  const { pathname, origin } = new URL(url);

  // Same-origin static assets → cache-first
  if (
    pathname.startsWith("/_next/static/") ||
    pathname.match(/\.(?:png|jpg|jpeg|svg|gif|webp|ico|woff2?|ttf|eot)$/) ||
    pathname === "/manifest.json"
  ) {
    return "cache-first";
  }

  // Supabase API → network-first with cache fallback
  if (origin.includes("supabase.co") || origin.includes("effectivecpmnetwork") || origin.includes("highperformanceformat")) {
    return "network-first";
  }

  // Navigation requests (HTML pages) → network-first (fresh content)
  if (self.request.mode === "navigate" || pathname === "/") {
    return "network-first";
  }

  // Everything else → stale-while-revalidate
  return "stale-while-revalidate";
}

// Fetch — apply caching strategy
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Skip non-GET requests
  if (request.method !== "GET") return;

  // Skip cross-origin requests that aren't API calls (ads, analytics)
  const url = new URL(request.url);
  if (
    !url.origin.startsWith(self.location.origin) &&
    !url.origin.includes("supabase.co")
  ) {
    // Let ad scripts through without caching
    return;
  }

  const strategy = getStrategy(request.url);

  if (strategy === "cache-first") {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            const clone = response.clone();
            caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone));
            return response;
          })
      )
    );
  } else if (strategy === "network-first") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match("/")))
    );
  } else {
    // stale-while-revalidate
    event.respondWith(
      caches.match(request).then((cached) => {
        const fetchPromise = fetch(request)
          .then((response) => {
            const clone = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, clone));
            return response;
          })
          .catch(() => cached);
        return cached || fetchPromise;
      })
    );
  }
});

// Handle messages from the app (e.g., "skip waiting")
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Background sync — flush pending writes when back online
self.addEventListener("sync", (event) => {
  if (event.tag === "alieqa-sync") {
    event.waitUntil(
      self.clients.matchAll().then((clients) =>
        clients.forEach((client) => client.postMessage({ type: "BACKGROUND_SYNC" }))
      )
    );
  }
});

// Push notifications
self.addEventListener("push", (event) => {
  let data = { title: "عليقة", body: "إشعار جديد" };
  try {
    data = event.data ? event.data.json() : data;
  } catch {
    data = { title: "عليقة", body: event.data?.text() || "إشعار جديد" };
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/icon-192.png",
      badge: "/icon-192.png",
      dir: "rtl",
      lang: "ar",
      vibrate: [100, 50, 100],
      data: data.data || {},
    })
  );
});

// Notification click — open the app
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(self.clients.openWindow("/"));
});
