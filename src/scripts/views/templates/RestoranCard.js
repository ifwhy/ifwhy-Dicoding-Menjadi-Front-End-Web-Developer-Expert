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
            display: inline-block;
            min-height: 44px;
            min-width: 44px;
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
            <a href="#/detail/${this.getAttribute('id')}">${this.getAttribute('nama')}</a>
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

export default RestoranCard;