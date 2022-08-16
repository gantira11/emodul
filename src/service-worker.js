import { precacheAndRoute } from "workbox-precaching";


precacheAndRoute(self.__WB_MANIFEST);


self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request).then(async fetchRes => {
        const cache = await caches.open('dynamicCache');
        cache.put(evt.request.url, fetchRes.clone());
        return fetchRes;
      });
    })
  )
})

