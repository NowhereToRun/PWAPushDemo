var dataCacheName = 'precache-next-page-v1';
var cacheName = 'precache-static-v2';
var filesToCache = [
  'https://nowheretorun.github.io/PWA_push-demo/empty_test/pwa.html',
  // './pwa.html',
  'https://mjs.sinaimg.cn/wap/project/homev8/8.1.5/homev8/homev8.min.css',
  'https://mjs.sinaimg.cn/wap/online/others/pwa/manifestTest/manifest.json',
  'https://mjs.sinaimg.cn/wap/online/others/pwa/manifestTest/index.js'
];

self.addEventListener('install', function (e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    }).then(function () {
      return self.skipWaiting();
    }).catch(function(err){
      console.log(err);
    })
  );
});

self.addEventListener('activate', function (e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function (e) {
  console.log('[Service Worker] Fetch', e.request.url);
  var fakeUrl = 'https://my_fake.api.com';
  if (e.request.url.indexOf(fakeUrl) > -1) {

  } else {
    /*
     * The app is asking for app shell files.
     * "Cache, falling back to the network" offline strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
     */
    e.respondWith(
      caches.match(e.request).then(function (response) {
        return response || fetch(e.request);
      })
    );
  }
});
