import CacheHelper from './utils/cache-helper';

const assetsToCache = [
  './images/heros/hero-image_1.jpg',
  './images/heros/hero-image_2.jpg',
  './images/heros/hero-image_3.jpg',
  './images/heros/hero-image_4.jpg',
  './images/icons/facebook-icon.png',
  './images/icons/instagram-icon.png',
  './images/icons/x-icon.png',
  './images/icons/rating-icon.png',
  './images/icons/kulinary-icon.png',
  './images/webmanifest/android-icon-144x144.png',
  './images/webmanifest/android-icon-192x192.png',
  './images/webmanifest/favicon-16x16.png',
  './images/webmanifest/favicon-32x32.png',
  './images/webmanifest/favicon-96x96.png',
  './images/webmanifest/kulinary-icon.png',
  './images/webmanifest/ms-icon-310x310.png',
  './index.html',
  './main.bundle.js',
  './app.webmanifest',
  './sw.bundle.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(CacheHelper.cachingAppShell([...assetsToCache]));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(CacheHelper.deleteOldCache());
});

self.addEventListener('fetch', (event) => {
  if (!(event.request.url.indexOf('http') === 0)) return;
  event.respondWith(CacheHelper.revalidateCache(event.request));
});
