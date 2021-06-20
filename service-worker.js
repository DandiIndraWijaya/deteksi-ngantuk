importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);


workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1'},
    { url: '/manifest.json', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/deteksi_kantuk.html', revision: '1' },
    { url: '/ml5.min.js', revision: '1' },
    { url: '/p5.dom.min.js', revision: '1' },
    { url: '/p5.js', revision: '1' },
    { url: '/p5.sound.min.js', revision: '1' },
    { url: '/sketch.js', revision: '1' },
    { url: '/style.css', revision: '1' },
    { url: '/supir_tidur.png', revision: '1' },
    { url: '/wordplay.mp3', revision: '1' },
    // { url: '/css/materialize.min.css', revision: '1' },
    // { url: '/js/materialize.min.js', revision: '1' },
    // { url: '/js/index.js', revision: '1'},
    // { url: '/js/main.js', revision: '1' },
    // { url: '/js/idb.js', revision: '1' },
    // { url: '/js/db.js', revision: '1' },
    // { url: '/js/api.js', revision: '1' },
    // { url: '/images/logo.png', revision: '1' },
    // { url: '/images/premiere_league_emblem.jpg', revision: '1' },
    // { url: '/images/bundesliga.svg', revision: '1' },
    // { url: '/images/la_liga.png', revision: '1' },
    // { url: '/images/ligue_1.png', revision: '1' },
    // { url: '/images/eredivisie.jpg', revision: '1' },
    // { url: '/images/serie_a.jpg', revision: '1' }, 
    // { url: 'icons/iphone/apple-launch-1125x2436.png', revision:'1' },
    { url: 'icons/icon-128x128.png', revision: '1' },
    { url: 'icons/icon-144x144.png', revision: '1' },
    { url: 'icons/icon-192x192.png', revision: '1' },
    { url: 'icons/icon-256x256.png', revision: '1' },
    { url: 'icons/icon-384x384.png', revision: '1' },
    { url: 'icons/icon-512x512.png', revision: '1' },
]);

workbox.routing.registerRoute(
  new RegExp('https://storage.googleapis.com/'),
  workbox.strategies.networkFirst({
    cacheName: 'model',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, 
      }),
    ],
  })
);


// const offlinePage = '/offline_page.html';
const url = 'http://127.0.0.1:5500/'

workbox.routing.registerRoute(
  new RegExp(url),
  async ({event}) => {
    try {
      return await workbox.strategies.staleWhileRevalidate({
          cacheName: 'cache-pages',
      }).handle({event});
    } catch (error) {
      console.log(error)
    }
  },
);

// workbox.routing.registerRoute(
//   new RegExp('https://top-euro-league.web.app/'),
//   async ({event}) => {
//     try {
//       return await workbox.strategies.staleWhileRevalidate({
//           cacheName: 'cache-pages',
//       }).handle({event});
//     } catch (error) {
//       return caches.match(offlinePage);
//     }
//   },
// );

// workbox.routing.registerRoute(
//   new RegExp('https://top-euro-league.firebaseapp.com/'),
//   async ({event}) => {
//     try {
//       return await workbox.strategies.staleWhileRevalidate({
//           cacheName: 'cache-pages',
//       }).handle({event});
//     } catch (error) {
//       return caches.match(offlinePage);
//     }
//   },
// );

