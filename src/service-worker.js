import { precacheAndRoute } from "workbox-precaching";

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("fetch", (evt) => {
  if (evt.request.url.includes("/v1/")) {
    evt.respondWith(
      caches.match(evt.request).then((cacheRes) => {
        return (
          cacheRes ||
          fetch(evt.request).then(async (fetchRes) => {
            const cache = await caches.open("dynamicCache");
            cache.put(evt.request.url, fetchRes.clone());
            return fetchRes;
          })
        );
      })
    );

    evt.waitUntil(update(evt.request));
  } else {
    evt.respondWith(
      caches.match(evt.request).then((cacheRes) => {
        return (
          cacheRes ||
          fetch(evt.request).then(async (fetchRes) => {
            const cache = await caches.open("dynamicCache");
            cache.put(evt.request.url, fetchRes.clone());
            return fetchRes;
          })
        );
      })
    );
  }
});

const delay = (ms) => (_) =>
  new Promise((resolve) => setTimeout(() => resolve(_), ms));

function update(request) {
  return fetch(request.url + `?per_page=${Math.ceil(Math.random() * 10)}`)
    .then(delay(1000))
    .then(async (response) => {
      const cache = await caches.open("dynamicCache");
      cache.put(request.url, response.clone()); // we can put response in cache
      return response;
    }); // resolve promise with the Response object
}

// function refresh(response) {
//   return response
//     .jsonResponse() // read and parse JSON response
//     .then((jsonResponse) => {
//       self.clients.matchAll().then((clients) => {
//         clients.forEach((client) => {
//           // report and send new data to client
//           client.postMessage(
//             JSON.stringify({
//               type: response.url,
//               data: jsonResponse.data,
//             })
//           );
//         });
//       });
//       return jsonResponse.data; // resolve promise with new data
//     });
// }
