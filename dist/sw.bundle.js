if(!self.define){let e,i={};const a=(a,n)=>(a=new URL(a+".js",n).href,i[a]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=i,document.head.appendChild(e)}else e=a,importScripts(a),i()})).then((()=>{let e=i[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,s)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let o={};const d=e=>a(e,r),c={module:{uri:r},exports:o,require:d};i[r]=Promise.all(n.map((e=>c[e]||d(e)))).then((e=>(s(...e),o)))}}define(["./workbox-3bd9af45"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"198d07d4a138115e1f17.jpg",revision:null},{url:"2ce4e2dbff063dde5080.jpg",revision:null},{url:"620f091b6ae1202c54bc.jpg",revision:null},{url:"9b5e586f2526748ebe76.jpg",revision:null},{url:"app.webmanifest",revision:"5d115335023e3dad2e8bb80e98d321b5"},{url:"images/heros/hero-image_2 -small.jpg",revision:"15918f42dc17bd244e912c7ee2253987"},{url:"images/heros/hero-image_2-medium.jpg",revision:"dee98c421309e02d0a5ac635e74dbed9"},{url:"images/heros/hero-image_2.jpg",revision:"3808fdfb036082dfddf2faa8eafb3989"},{url:"images/heros/hero-image_3.jpg",revision:"d232e05589056e05f52cf2689f315c6c"},{url:"images/icons/facebook-icon.png",revision:"39ce59828073bdda5d90fbf3f7b81a0c"},{url:"images/icons/instagram-icon.png",revision:"8c40d2ac7ce47de7951f5c65d6950ce6"},{url:"images/icons/kulinary-icon.png",revision:"3693a29aa251ea725ae666431de9f138"},{url:"images/icons/location-icon.png",revision:"5a51e5343f79c28e51aef1db9fab8022"},{url:"images/icons/rating-icon.png",revision:"f32a1feb06d0af9701616dd4da623de0"},{url:"images/icons/x-icon.png",revision:"5a128d65c6ece97d70a7cfd0b6cabcd5"},{url:"images/placeholder-image.webp",revision:"f6b305447ae579f6092012dcb6eb8155"},{url:"images/webmanifest/android-icon-144x144.png",revision:"e30608e973c69965db023bbca4f44a69"},{url:"images/webmanifest/android-icon-192x192.png",revision:"186d96b17ea0267b49c992abbcbd8097"},{url:"images/webmanifest/favicon-16x16.png",revision:"82cec342b6f376bcf576d3acb3f4ae48"},{url:"images/webmanifest/favicon-32x32.png",revision:"d0dbed49bf42657a9b3899adaa87a094"},{url:"images/webmanifest/favicon-96x96.png",revision:"67a15d1e89f9924c5f24438c4fa4952e"},{url:"images/webmanifest/kulinary-icon.png",revision:"3693a29aa251ea725ae666431de9f138"},{url:"images/webmanifest/ms-icon-310x310.png",revision:"bfbe3c972d6f49742912ac0d97dbbff8"},{url:"index.html",revision:"9646629a7d2cd3163fe04effba13656a"},{url:"main.bundle.js",revision:"21e46366171e8c79f43f10a3289a5501"},{url:"main.bundle.js.LICENSE.txt",revision:"4e0e34f265fae8f33b01b27ae29d9d6f"},{url:"vendors.bundle.js",revision:"b66efe4437c0712e85acd21794b72af5"}],{}),e.registerRoute((({url:e})=>e.href.startsWith("https://restaurant-api.dicoding.dev/")),new e.StaleWhileRevalidate({cacheName:"restaurant-api",plugins:[]}),"GET")}));
//# sourceMappingURL=sw.bundle.js.map