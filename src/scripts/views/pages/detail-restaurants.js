import RestaurantDetail from '../templates/DetailRestaurants';

if (!customElements.get('restaurant-detail')) {
  customElements.define('restaurant-detail', RestaurantDetail);
}

const detail_restaurants = {
  async render() {
    return `
      <style>
        #detail-restoran {
          text-align: center;
          margin-top: 50px;
          font-weight: bold;
          font-size: 1.5rem;
          margin-bottom: 1rem;
          font-family: "Playfair Display"
        }
      </style>

      <p id="detail-restoran">Detail Restaurant</p>
      <div id="detail-container"></div> 
    `;
  },

  async afterRender() {
    // Mendapatkan ID dari URL dengan format /#/detail/:id
    const urlHash = window.location.hash; // Mendapatkan bagian hash dari URL
    const idMatch = urlHash.match(/\/detail\/(.+)/); // Regex untuk menangkap ID setelah "/detail/"

    if (!idMatch || !idMatch[1]) {
      const detailContainer = document.getElementById('detail-container');
      detailContainer.innerHTML = '<p style="text-align:center">Invalid restaurant ID. Please try again.</p>';
      return;
    }

    const restaurantId = idMatch[1]; // ID restoran yang valid
    const detailContainer = document.getElementById('detail-container');
    const restaurantDetailElement = document.createElement('restaurant-detail');
    restaurantDetailElement.setAttribute('data-id', restaurantId);

    // Menambahkan Web Component ke DOM
    detailContainer.appendChild(restaurantDetailElement);
  },
};

export default detail_restaurants;
