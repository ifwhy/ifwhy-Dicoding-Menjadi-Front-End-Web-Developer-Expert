import 'regenerator-runtime';
import '../styles/main.css';
import '../styles/responsive.css';
import App from './views/app';
import AOS from 'aos';
import 'aos/dist/aos.css';
import swRegister from './utils/swRegister';

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
    AOS.init({once: true, duration: 1000});
    app.renderPage();
    await swRegister();
});
