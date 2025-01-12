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
            position: relative;
            height: 10rem;
            border-top-left-radius: 0.5rem;
            border-top-right-radius: 0.5rem;
            padding: 1rem;
            transition: transform 0.5s ease, background-size 0.5s ease;
          }

          .restoran-atas img {
            width: 100%;
            height: 100%;
            object-fit: cover; /* Makes the image cover the container */
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1; /* Place the image behind the other content */
            border-top-left-radius: 0.5rem;
            border-top-right-radius: 0.5rem;
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
            padding: 0.5rem 1rem 1rem 1rem; /* Reduced padding on top */
            min-height: 8rem;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .restoran-bawah .location-rating {
            display: flex;
            justify-content: space-between;
            width: 100%;
            margin-top: 1rem;
          }

          .restoran-bawah .location-icon,
          .restoran-bawah .rating-icon {
            display: flex;
            gap: 0.5rem;
            font-weight: normal;  /* Font size becomes smaller */
            align-items: center;
          }

          .restoran-bawah .location-icon img,
          .restoran-bawah .rating-icon img {
            width: 1.5rem;  /* Smaller icon size */
            height: 1.5rem;
            object-fit: contain; 
          }

          .restoran-bawah .location-icon p,
          .restoran-bawah .rating-icon p {
            margin: 0;
            color: black;
            font-size: 1rem;  /* Smaller text size */
            font-weight: normal; /* Font weight adjusted */
            text-shadow: none;  /* Removed text shadow for a cleaner look */
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
            text-align: center; /* Center the title */
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
            <img loading="lazy" data-src="https://raw.githubusercontent.com/dicodingacademy/a219-mfwde-labs/099-shared-files/shared-media/10-proyek-akhir/placeholder-image.jpg" src="${this.getAttribute('foto')}" alt="Restoran Image">
          </div>
          
          <div class="restoran-bawah">
            <a href="#/detail/${this.getAttribute('id')}">${this.getAttribute('nama')}</a>
            <div class="location-rating">
              <div class="location-icon">
                <img src="./images/icons/location-icon.png" alt="Lokasi">
                <div>
                  <p>${this.getAttribute('lokasi')}</p>
                </div>
              </div>
              <div class="rating-icon">
                <img  src="./images/icons/rating-icon.png" alt="Rating">
                <div>
                  <p>${this.getAttribute('rating')}</p>
                </div>
              </div>
            </div>
            <p>${this.getAttribute('deskripsi')}</p>
          </div>
        </div>
      `;

    // Add the template to the shadow root
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

export default RestoranCard;
