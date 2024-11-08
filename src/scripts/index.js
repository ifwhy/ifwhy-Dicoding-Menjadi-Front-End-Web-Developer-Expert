import 'regenerator-runtime'; /* for async await transpile */
import '../styles/style.css';

import AOS from 'aos';
import 'aos/dist/aos.css';

const drawerButton = document.querySelector('#drawer-button');
const drawerNavigation = document.querySelector('#nav-list');
const closeIcon = drawerButton.querySelector('.close');
const sideBarButton = document.querySelectorAll('.isOpen');
const menuButton = document.querySelector('.menu-button');

class RestoranCard extends HTMLElement {
  constructor() {
    super();
    
    // Attach Shadow DOM to the component
    this.attachShadow({ mode: 'open' });
    
    // Prepare the HTML template
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        .restoran {
          text-align: justify;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5), 0 1.5px 3px rgba(0, 0, 0, 0.1);
          border-radius: 0.5rem;
          overflow: hidden;
          margin-bottom: 2rem;
          transition: box-shadow 0.3s ease; /* Smooth transition */
        }

        .restoran:hover {
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.5), 0 4px 6px rgba(0, 0, 0, 0.1); /* Larger shadow on hover */
        }

        .restoran-atas {
          display: flex;
          justify-content: space-between;
          align-items: end;
          background-image: var(--foto);
          background-size: cover;
          background-position: center;
          height: 10rem;
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
          padding: 1rem;
          position: relative;
          transition: transform 0.5s ease, background-size 0.5s ease;
        }

        .restoran-atas::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
        }

        .restoran-bawah {
          padding: 1.5rem 1rem 1rem 1rem;
          min-height: 8rem;
          display:flex;
          flex-direction: column;
          align-items: center;
        }

        .restoran-atas .location-icon,
        .restoran-atas .rating-icon {
          display: flex;
          justify-content: center;
          font-weight: bold;
          gap: 0.5rem;
          align-items: center;
          z-index: 1;
        }

        .restoran-atas .location-icon img,
        .restoran-atas .rating-icon img {
          width: 2rem; 
          height: 2rem;
          object-fit: contain; 
        }

        .restoran-atas .location-icon p,
        .restoran-atas .rating-icon p {
          margin: 0;
          color: white;
          font-size: 1.2rem;
          font-weight: bold;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7); 
        }

        .restoran a {
          color: var(--tertiary-color);
          text-decoration: none;
          font-weight: bold;
          font-size: 1.5rem;
          border-bottom: 2px solid none;
          padding: 0.1rem 0.25rem;
        }
          
        .restoran a:hover {
          text-decoration: underline;
        }
          
        .restoran a:focus {
          text-decoration: none;
          border-radius: 0.5rem;
          outline: 2px solid var(--tertiary-color);
        }

        @media screen and (min-width: 576px) {
          .restoran-bawah {
            min-height: 13rem;
          }
        }
      </style>

      <div class="restoran">
        <div class="restoran-atas">
          <div class="location-icon">
            <img src="./images/icons/location-icon.png" alt="Lokasi">
            <div>
              <p>${this.getAttribute('lokasi')}</p>
            </div>
          </div>
          <div class="rating-icon">
            <img src="./images/icons/rating-icon.png" alt="Rating">
            <div>
              <p>${this.getAttribute('rating')}</p>
            </div>
          </div>
        </div>
        
        <div class="restoran-bawah">
          <a href="#">${this.getAttribute('nama')}</a>
          <p>${this.getAttribute('deskripsi')}</p>
        </div>
      </div>
    `;

    // Add the template to the shadow root
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // Set the background image from the 'foto' attribute
    const restoranAtas = this.shadowRoot.querySelector('.restoran-atas');
    restoranAtas.style.setProperty('--foto', `url(${this.getAttribute('foto')})`);
  }
}

// Register the custom element
customElements.define('restoran-card', RestoranCard);

document.addEventListener('DOMContentLoaded', () => {
  AOS.init({once: true, duration: 1000});
});

let isSideBarOpen = false;
drawerButton.addEventListener('click', () => {
  drawerNavigation.classList.toggle('open');

  sideBarButton.forEach((button) => {
    button.classList.toggle('close');
  });

  isSideBarOpen = !isSideBarOpen;

  if (isSideBarOpen) {
    drawerButton.setAttribute('aria-expanded', 'true');
    drawerNavigation.setAttribute('aria-hidden', 'false');
  } else {
    drawerButton.setAttribute('aria-expanded', 'false');
    drawerNavigation.setAttribute('aria-hidden', 'true');
  }
});

document.body.addEventListener('click', (event) => {
  if (!drawerNavigation.contains(event.target) && !drawerButton.contains(event.target)) {
    drawerNavigation.classList.remove('open');
    sideBarButton.forEach((button) => {
      button.classList.toggle('close');
    });

    isSideBarOpen = false;
    closeIcon.classList.add('close');
    menuButton.classList.remove('close');
  }
});

const RestoCards = async (url) => {
  try {
    const daftar_restoran = document.getElementById('daftar-restoran');

    const response = await fetch(url);
    const data = await response.json();
    const { restaurants } = data;
    let restoranCard = '';

    let duration = 0;
    let delay = 100;
    restaurants.forEach((restoran) => {
      
      let deskripsi = restoran.description;

      // Memotong deskripsi jika lebih dari 125 karakter
      if (deskripsi.length > 125) {
        deskripsi = deskripsi.substring(0, 125) + '...';
      }

      duration += 1000;
      delay += 25;

      restoranCard += `
        <restoran-card
          nama="${restoran.name}"
          lokasi="${restoran.city}"
          rating="${restoran.rating}"
          deskripsi="${deskripsi}"
          foto="${restoran.pictureId}"
          data-aos="fade-down"
          data-aos-duration="${duration}"
          data-aos-delay="${delay}"
        ></restoran-card>
      `;
    });
    daftar_restoran.innerHTML = restoranCard;

  } catch (error) {
    console.log('Error:', error.message);
  }
};

RestoCards("./data/DATA.json");