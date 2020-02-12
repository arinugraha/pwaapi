var CACHE_NAME = 'latihan1';
var urlsToCache = [
  '/',
  '/follback.json',
  '/index.html',
  '/images/icons-192.png',
  '/js/main.js',
  '/manifest.json'

];

self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function (event) {
  var request = event.request
  var _url = new URL(request.url)

  if (_url.origin === location.origin) {
    event.respondWith(
      caches.match(request).then(function (response) {
        return response || fetch(request)
      }))
  } else {
    event.respondWith(
      caches.open('product-caches').then(function(cache){
        return fetch(request).then(function(liveResponse){
          cache.put(request, liveResponse.clone());
          return liveResponse
        }).catch(function(){
          return caches.match(request).then(function(response){
            if (response) return response
            return caches.match('/follback.json')
          })
        })
      })
    );
  }


});


self.addEventListener('activate', function (event) {

  var cacheWhitelist = CACHE_NAME; //['/', 'blog-posts-cache-v1'];

  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          return cacheName != CACHE_NAME
        }).map(function (cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});