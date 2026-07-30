const CACHE_NAME = "gtec-v1";

const PRECACHE_URLS = [
  "/",
  "/en",
  "/~offline",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    }).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)),
      );
    }).then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Never cache API, auth, portal, or admin routes
  if (
    url.pathname.startsWith("/api/") ||
    url.pathname.includes("/sign-in") ||
    url.pathname.includes("/sign-up") ||
    url.pathname.includes("/portal/") ||
    url.pathname.includes("/admin/")
  ) {
    return;
  }

  // Cache-first for images and static assets
  if (
    request.destination === "image" ||
    url.pathname.startsWith("/_next/") ||
    url.pathname.startsWith("/icons/")
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const fetchPromise = fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        });
        return cached ?? fetchPromise;
      }),
    );
    return;
  }

  // Network-first for HTML documents (public pages)
  if (request.destination === "document") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => {
          return caches.match(request).then((cached) => {
            return cached ?? caches.match("/~offline");
          });
        }),
    );
  }
});
