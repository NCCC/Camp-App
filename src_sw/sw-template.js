if ('function' === typeof importScripts) {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js'
  );
  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded');

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([]);

/* custom cache rules*/
workbox.routing.registerNavigationRoute('/index.html', {
      blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/],
    });

workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg|ico)$/,
      workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          }),
        ],
      })
    );

workbox.routing.registerRoute(
      /^https:\/\/fonts\.googleapis\.com\/icon|\.(?:woff|woff2)$/,
      workbox.strategies.cacheFirst({
        cacheName: 'fonts',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          }),
        ],
      })
    );

// Network first for API calls, since we want this to be updated whenever possible.
workbox.routing.registerRoute(
  /^https:\/\/api\.nccc\.se\//,
  workbox.strategies.networkFirst({
        cacheName: 'api-cache',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          }),
        ],
      })
);

} else {
    console.log('Workbox could not be loaded. No Offline support');
  }
}