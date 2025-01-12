import drawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';
import skipToContent from '../utils/skip-to-content';
import navbarActive from '../utils/navbar-active.js';

class App {
  constructor({ drawerButton, drawerNavigation, closeIcon, sideBarButton, menuButton, content }) {
    this._drawerButton = drawerButton;
    this._drawerNavigation = drawerNavigation;
    this._closeIcon = closeIcon;
    this._sideBarButton = sideBarButton;
    this._menuButton = menuButton;
    this._content = content;

    this._initialAppShell();
    skipToContent();
    navbarActive();
  }

  _initialAppShell() {
    drawerInitiator({
      drawerButton: this._drawerButton,
      drawerNavigation: this._drawerNavigation,
      closeIcon: this._closeIcon,
      sideBarButton: this._sideBarButton,
      menuButton: this._menuButton,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];

    if (!page) {
      this._content.innerHTML = '<p  style="text-align:center; font-weight:bold; font-size:1.5rem">404 Halaman tidak ditemukan</p>';
      return;
    }

    try {
      this._content.innerHTML = await page.render();
      await page.afterRender();
    } catch (error) {
      console.error('Error rendering page:', error);
      this._content.innerHTML = '<p style="text-align:center; font-weight:bold; font-size:1.5rem">Terjadi kesalahan saat memuat halaman</p>';
    }
  }
};

export default App;