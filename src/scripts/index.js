import 'regenerator-runtime';
import '../styles/main.css';
import '../styles/responsive.css';
import App from './views/app';
import AOS from 'aos';
import 'aos/dist/aos.css';
import * as WorkboxWindow from 'workbox-window';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const app = new App({
  drawerButton: document.querySelector('#drawer-button'),
  drawerNavigation: document.querySelector('#nav-list'),
  closeIcon: document.querySelector('.close'),
  sideBarButton: document.querySelectorAll('.isOpen'),
  menuButton: document.querySelector('.menu-button'),
  content: document.querySelector('#main-content')
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', async () => {
  AOS.init({ once: true, duration: 1000 });
  app.renderPage();

  // Daftarkan Service Worker menggunakan Workbox
  if ('serviceWorker' in navigator) {
    const wb = new WorkboxWindow.Workbox('/sw.bundle.js'); // Pastikan jalur benar
    try {
      const registration = await wb.register();
      console.log('SW registered:', registration);
    } catch (error) {
      console.error('SW registration failed:', error);
    }
  }

  // const wb = new WorkboxWindow.Workbox('sw.bundle.js');
  // await wb.register();
});
