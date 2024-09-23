// @ts-ignore
// @ts-nocheck
importScripts("version.js");

var CACHE_NAME = "prefetch-v" + CACHE_VERSION;
var CACHE_HOT_LIST = [".json"];
var CACHE_STATIC_LIST = [
  "script",
  "document",
  "style",
  "image",
  "font",
  "media",
];

self.addEventListener("install", function (event) {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  var cacheWhitelist = [CACHE_NAME];
  self.clients.claim();
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

function staleWhileRevalidateHandler(cacheResponse, event, name) {
  const fetchResponse = fetch(event.request).then((networkResponse) =>
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        cache.put(name, networkResponse.clone());
        return networkResponse;
      })
      .catch(() => cacheResponse)
  );

  return cacheResponse || fetchResponse;
}

function cacheFirstHandler(cacheResponse, event) {
  if (cacheResponse) {
    return cacheResponse;
  }

  return fetch(event.request).then((networkResponse) =>
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        cache.put(event.request, networkResponse.clone());
        return networkResponse;
      })
      .catch(() => cacheResponse)
  );
}

self.addEventListener("fetch", (event) => {
  const { url, method } = event.request;
  if (CACHE_HOT_LIST.find((val) => url.indexOf(val) > -1)) {
    event.respondWith(
      caches.open(CACHE_NAME).then(() =>
        caches.match(event.request).then((cacheResponse) => {
          return staleWhileRevalidateHandler(
            cacheResponse,
            event,
            event.request
          );
        })
      )
    );
    return;
  }

  if (method === "POST" || !(url.indexOf("http:") === 0)) {
    return;
  }

  if (CACHE_STATIC_LIST.includes(event.request.destination)) {
    event.respondWith(
      caches.open(CACHE_NAME).then(() =>
        caches.match(event.request).then((cacheResponse) => {
          return cacheFirstHandler(cacheResponse, event);
        })
      )
    );
    return;
  }

  const fetchEvent = fetch(event.request)
    .then((response) => response)
    .catch((err) => {
      console.log(err);
    });
  event.respondWith(fetchEvent);
});
