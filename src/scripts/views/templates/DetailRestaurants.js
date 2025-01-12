import FavoriteRestaurantDB from '../../data/favorite-restaurant-idb';
import { API_ENDPOINT } from '../../globals/API_ENDPOINT';
import Swal from 'sweetalert2';
import FavoriteButton from '../components/favorite-button';

if (!customElements.get('favorite-button')) {
  customElements.define('favorite-button', FavoriteButton);
}

class RestaurantDetail extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    try {
      const id = this.getAttribute('data-id');
      const restaurantData = await this._fetchRestaurantDetail(id);
      if (restaurantData) {
        await this._render(restaurantData);
        await this._handleAddToFavorite();
      } else {
        throw new Error('Invalid restaurant data');
      }
    } catch (error) {
      this.shadowRoot.innerHTML = '<p>Failed to load restaurant details. Please try again later.</p>';
    }
  }

  async _fetchRestaurantDetail(id) {
    try {
      const response = await fetch(`${API_ENDPOINT}/detail/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch restaurant details: ${response.statusText}`);
      }
      const data = await response.json();
      return data.restaurant;
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to load restaurant details. Please try again later.',
        icon: 'error',
        color: '#10375C',
        confirmButtonColor: '#EB8317'
      });
      return null;
    }
  }

  async _handleAddToFavorite() {
    const button = this.shadowRoot.querySelector('#form-add-to-favorite button');

    const updateButtonText = async () => {
      const isDataExist = await FavoriteRestaurantDB.getRestaurant(this.getAttribute('data-id'));
      button.textContent = isDataExist
        ? 'Remove Restaurant from Favorite'
        : 'Add Restaurant to Favorite';
    };

    // Perbarui teks tombol saat listener diinisialisasi
    await updateButtonText();

    button.addEventListener('click', async (event) => {
      event.preventDefault();
      const isDataExist = await FavoriteRestaurantDB.getRestaurant(this.getAttribute('data-id'));

      if (isDataExist) {
        await FavoriteRestaurantDB.deleteRestaurant(this.getAttribute('data-id'));
      } else {
        const restaurantData = await this._fetchRestaurantDetail(this.getAttribute('data-id'));
        await FavoriteRestaurantDB.putRestaurant(restaurantData);
      }

      // Perbarui teks tombol setelah operasi selesai
      await updateButtonText();
    });
  }

  _render(restaurant) {
    if (!restaurant) {
      this.shadowRoot.innerHTML = '<p style="text-align:center;">Failed to load restaurant details. Please try again later.</p>';
      return;
    }

    const {
      name,
      description,
      pictureId,
      city,
      address,
      categories,
      menus: { foods, drinks },
      rating,
      customerReviews,
    } = restaurant;

    const categoryTags = categories.map((cat) => `<span class="tag">${cat.name}</span>`).join('');
    const foodList = foods.map((food) => `<li>${food.name}</li>`).join('');
    const drinkList = drinks.map((drink) => `<li>${drink.name}</li>`).join('');
    const reviews = customerReviews
      .map(
        (review) =>
          `<div class="review">
              <p><strong>${review.name}</strong> (${review.date}):</p>
              <p>${review.review}</p>
            </div>`
      )
      .join('');

    this.shadowRoot.innerHTML = `
        <style>
          .card-resto {
            max-width: 60%;
            margin: 20px auto;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
            font-family: "Roboto", sans-serif;
            background: linear-gradient(135deg, #f8f9fa, #ffffff);
            transition: transform 0.3s ease;
          }

          .card-resto:hover {
            transform: translateY(-10px);
          }

          .review-form {
          padding: 15px;
          margin-top: 1rem;
          background: #f9f9f9;
          border-radius: 8px;
        }

        .review-form input,
        .review-form textarea,
        .review-form button {
          display: block;
          margin-left: auto;
          margin-right: auto;
          width: 90%;
          padding:0.2rem;
          margin-bottom: 1rem;
          font-family: 'Play', sans-serif;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 1rem;
          max-width: 95%;
        }

        .review-form input,
        .review-form textarea, #form-add-to-favorite button {
            min-height: 44px;
            min-width: 44px;
        }

        .review-form button {
          background: #EB8317;
          color: #fff;
          border: none;
          min-width: 44px;
          min-height: 44px;
          cursor: pointer;
          border: 0.125rem solid #EB8317;
          font-weight: bold;
          font-family: 'Playfair Display', serif;
        }

        .review-form button:hover {
          background: #F4F6FF;
          border: 0.125rem solid #EB8317;
          color: #EB8317;
        }

          .card-resto .image-container {
            position: relative;
          }

          .card-resto img {
            width: 100%;
            height: auto;
            display: block;
          }

          .card-resto .overlay {
            position: absolute;
            bottom: 0;
            width: 100%;
            background: rgba(0, 0, 0, 0.8);
            color: #fff;
            padding: 20px;
            transition: all 0.3s ease;
            opacity: 1;
          }

          #customer-reviews {
            color: #10375C;
            font-size: 1.25rem;
            font-weight: bold;
            text-align: center;
          }

          .card-resto .overlay:hover {
            opacity: 0;
          }

          .card-resto .overlay h2 {
            font-size: 1.8rem;
            margin: 0 0 10px;
            color: #FFD700;
          }

          .card-resto .overlay p {
            margin: 5px 0;
            font-size: 0.9rem;
            color: #ddd;
          }

          .card-resto .overlay p:hover {
            color: #fff;
          }

          .card-resto .overlay .tags {
            margin-top: 10px;
            display: flex;
            gap: 8px;
          }

          .card-resto .overlay .tag {
            background: rgba(255, 255, 255, 0.8);
            color: #333;
            padding: 5px 10px;
            border-radius: 8px;
            font-size: 0.8rem;
          }

          .card-resto .content {
            padding: 20px 30px;
          }

          .card-resto p {
            color: #666;
            line-height: 1.8;
            font-size: 1rem;
            text-align: justify;
          }

          .menu strong {
            color: #10375C;
          }

          .card-resto ul {
            padding-left: 20px;
            color: #666;
          }

          .card-resto .review {
            margin-top: 20px;
            padding: 15px;
            border-radius: 8px;
            background: #f1f3f5;
          }

          #form-add-to-favorite {
            display: flex;
            justify-content: center;
            margin-bottom: 1rem;
          }

          #form-add-to-favorite button {
            background-color: #FFD700;
            color: #333;
            font-size: 1rem;
            font-weight: bold;
            padding: 10px 20px;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            transition: background-color 0.3s ease, transform 0.3s ease;
          }

          #form-add-to-favorite button:hover {
            background-color: #FFC107;
            transform: scale(1.1);
          }

          @media (max-width: 768px) {
            .card-resto {
              max-width: 90%;
              margin: 20px auto;
            }
            .card-resto .content {
              padding: 1.5rem;
            }
          }
        </style>
        <div class="card-resto">
          <div class="image-container">
            <img src="${API_ENDPOINT}/images/large/${pictureId}" alt="${name}">
            <div class="overlay">
              <h2>${name}</h2>
              <p><strong>Rating:</strong> ${rating} ⭐</p>
              <p><strong>City:</strong> ${city}</p>
              <p><strong>Address:</strong> ${address}</p>
              <div class="tags">${categoryTags}</div>
            </div>
          </div>
          <div class="content">
            <form id="form-add-to-favorite">
              <button>Add Restaurant to Favorite</button>
            </form>
            <p>${description}</p>
            <div class="menu">
              <p><strong>Foods:</strong></p>
              <ul>${foodList}</ul>
              <p><strong>Drinks:</strong></p>
              <ul>${drinkList}</ul>
            </div>
            <div class="reviews">
              <p id="customer-reviews">Customer Reviews</p>
              ${reviews}
            </div>
            <div class="review-form">
              <h3>Add Your Review</h3>
              <form method="POST" id="add-reviews">
                <input type="text" id="review-name" placeholder="Your Name" />
                <textarea id="review-content" rows="4" placeholder="Your Review"></textarea>
                <button id="submit-review">Submit</button>
              </form>
            </div>
          </div>
        </div>
      `;

    // Attach event listener to the submit button
    this.shadowRoot.querySelector('#add-reviews').addEventListener('submit', async (event) => {
      event.preventDefault();
      const name = this.shadowRoot.querySelector('#review-name').value;
      const reviewContent = this.shadowRoot.querySelector('#review-content').value;

      const urlHash = window.location.hash; // Mendapatkan bagian hash dari URL
      const idMatch = urlHash.match(/\/detail\/(.+)/);

      if (name && reviewContent) {
        const reviewData = {
          id:idMatch[1],
          name,
          review: reviewContent,
        };

        const result = await this._postReview(reviewData);
        if (result) {
          const date = result.customerReviews.slice(-1)[0].date;

          const newReview = `
              <div class="review">
                <p><strong>${reviewData.name}</strong> (${date}):</p>
                <p>${reviewData.review}</p>
              </div>
            `;
          this.shadowRoot.querySelector('.reviews').innerHTML += newReview;

          // Clear input fields
          this.shadowRoot.querySelector('#review-name').value = '';
          this.shadowRoot.querySelector('#review-content').value = '';

          Swal.fire({
            title: 'Thank You!',
            text: 'Success to add your review!',
            icon: 'success',
            color: '#10375C',
            confirmButtonColor: '#EB8317'
          });
        }
      } else {
        Swal.fire({
          title: 'Ups...!',
          text: 'Please fill in both the name and review.!',
          icon: 'warning',
          color: '#10375C',
          confirmButtonColor: '#EB8317'
        });
      }
    });
  }

  async _createFavoriteButton(restaurant) {
    const favoriteButton = document.createElement('favorite-button');
    favoriteButton.setAttribute('restaurant', JSON.stringify(restaurant));
    favoriteButton.setAttribute(
      'is-favorite',
      `${await this._checkFavorite(restaurant.id)}`
    );
    favoriteButton.addEventListener('add-favorite', (ev) => {
      FavoriteRestaurantIdb.putRestaurant(ev.detail.restaurant);
    });

    favoriteButton.addEventListener('delete-favorite', (ev) => {
      FavoriteRestaurantIdb.deleteRestaurant(ev.detail.id);
    });

    return favoriteButton;
  };

  async _postReview(reviewData) {
    try {
      const response = await fetch(`${API_ENDPOINT}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error(`Failed to post review: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'There was an error submitting your review. Please try again.',
        icon: 'error',
        color: '#10375C',
        confirmButtonColor: '#EB8317'
      });
    }
  }
}

export default RestaurantDetail;