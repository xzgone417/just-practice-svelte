// @ts-ignore
// @ts-nocheck
importScripts("version.js");

var CACHE_NAME = "v" + CACHE_VERSION;

// 使用url识别并缓存的优先级高于post不缓存请求，具体优先级可在下方函数内进行调整
// 根据文件名或者文件后缀来选择不进行缓存的get请求
var NO_CACHE_URL_LIST = [
  "sofish.umd.cjs",
  "api-shushu",
  "client",
  "gtag",
  "appsflyer",
  "facebook.com",
  "googleapis.com",
  "fb.gg",
];
//根据文件名或者文件后缀进行缓存，先用缓存同时更新缓存，
var CACHE_ACTIVE_URL_LIST = [".json"];
//根据文件名或者文件后缀进行缓存，优先使用缓存，
var CACHE_STATIC_URL_LIST = [];

// 根据文件属性进行缓存，先用缓存同时更新缓存
var CACHE_ACTIVE_TYPE_LIST = ["document"];
//   根据文件属性进行缓存，优先使用缓存
var CACHE_STATIC_TYPE_LIST = ["style", "image", "font", "media"];
var cacheExpirationTime = Date.now() + 604800 * 1000; // 1个星期的毫秒数,修改时间戳以变更未进行更新的最长缓存时间

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
// 先用缓存同时更新缓存
function staleWhileRevalidateHandler(cacheResponse, event, name) {
  const fetchResponse = fetch(event.request)
    .then((networkResponse) =>
      caches
        .open(CACHE_NAME)
        .then((cache) => {
          cache.put(name, networkResponse.clone());
          return networkResponse;
        })
        .catch(() => cacheResponse)
    )
    .catch(() => cacheResponse);

  return cacheResponse || fetchResponse;
}
// 优先使用缓存
function cacheFirstHandler(cacheResponse, event, name) {
  if (cacheResponse) {
    return cacheResponse;
  }

  return fetch(event.request)
    .then((networkResponse) =>
      caches
        .open(CACHE_NAME)
        .then((cache) => {
          cache.put(name, networkResponse.clone());
          return networkResponse;
        })
        .catch(() => cacheResponse)
    )
    .catch(() => cacheResponse);
}

self.addEventListener("fetch", (event) => {
  // 在函数上方的优先执行
  const { url, method } = event.request;
  // POST请求以及http请求不缓存
  if (method === "POST" || url.indexOf("http://") === 0) {
    return;
  }
  // 根据文件名或者文件后缀判断选择不进行缓存的get请求
  if (NO_CACHE_URL_LIST.find((val) => url.includes(val))) {
    return;
  }

  // 根据文件名或者文件后缀进行缓存，先用缓存同时更新缓存，优先级高于不缓存post请求
  if (CACHE_ACTIVE_URL_LIST.find((val) => url.endsWith(val))) {
    event.respondWith(
      caches.open(CACHE_NAME).then(() =>
        caches.match(event.request).then((cacheResponse) => {
          return staleWhileRevalidateHandler(
            cacheResponse,
            event,
            event.request.url
          );
        })
      )
    );
    return;
  }
  // 根据文件名或者文件后缀进行缓存，优先使用缓存，优先级高于不缓存post请求
  if (CACHE_STATIC_URL_LIST.find((val) => url.endsWith(val))) {
    event.respondWith(
      caches.open(CACHE_NAME).then(() =>
        caches.match(event.request).then((cacheResponse) => {
          return cacheFirstHandler(cacheResponse, event, event.request.url);
        })
      )
    );
    return;
  }
  // 根据文件属性进行缓存，先用缓存同时更新缓存
  if (CACHE_ACTIVE_TYPE_LIST.includes(event.request.destination)) {
    event.respondWith(
      caches.open(CACHE_NAME).then(() =>
        caches.match(event.request).then((cacheResponse) => {
          return staleWhileRevalidateHandler(
            cacheResponse,
            event,
            event.request.url
          );
        })
      )
    );
    return;
  }
  //   根据文件属性进行缓存，优先使用缓存
  if (CACHE_STATIC_TYPE_LIST.includes(event.request.destination)) {
    event.respondWith(
      caches.open(CACHE_NAME).then(() =>
        caches.match(event.request).then((cacheResponse) => {
          return cacheFirstHandler(cacheResponse, event, event.request.url);
        })
      )
    );
    return;
  }
  // 未匹配到的重新请求
  const fetchEvent = fetch(event.request)
    .then((response) => response)
    .catch((err) => {
      console.log(err);
      return new Response("An error occurred.");
    });
  event.respondWith(fetchEvent);
});

// push-notifications.js

self.addEventListener("push", function (event) {
  const options = {
    body: "New content is available!",
    icon: "icon.png",
    badge: "badge.png",
  };

  event.waitUntil(self.registration.showNotification("ROIBest", options));
});
