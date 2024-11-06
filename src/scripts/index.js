// import 'regenerator-runtime'; /* for async await transpile */
// import '../styles/main.css';

const drawerButton = document.querySelector('#drawer-button');
const drawerNavigation = document.querySelector('#nav-list');
const closeIcon = drawerButton.querySelector('.close');
const sideBarButton = document.querySelectorAll('.isOpen');

drawerButton.addEventListener('click', () => {
  drawerNavigation.classList.toggle('open');

  sideBarButton.forEach((button) => {
    button.classList.toggle('close');
  });
});

document.body.addEventListener('click', (event) => {
  if (!drawerNavigation.contains(event.target) && !drawerButton.contains(event.target)) {
    drawerNavigation.classList.remove('open');
    
  }
});

const RestoCards = async (url) => {
  try {
    const daftar_restoran = document.getElementById('daftar-restoran');

    const response = await fetch(url);
    const data = await response.json();
    const { restaurants } = data;

  } catch (error) {
    console.log('Error:', error);
  }
};

RestoCards('../public/data/DATA.json');