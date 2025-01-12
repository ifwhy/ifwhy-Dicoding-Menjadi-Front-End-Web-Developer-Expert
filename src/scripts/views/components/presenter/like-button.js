import FavoriteRestaurantIdb from '../../../data/favorite-restaurant-idb';

// object yang akan digunakan untuk mengatur tampilan tombol favorite.
const LikeButtonPresenter = {
  async init({ likeButtonContainer, restaurant }) {
    this._likeButtonContainer = likeButtonContainer;
    this._restaurant = restaurant;
    this._favoriteRestaurants = FavoriteRestaurantIdb;

    await this._renderButton();
  },

  // Fungsi ini akan dipanggil ketika tombol favorite di-render.
  async _renderButton() {
    const { id } = this._restaurant;
    const favoriteButton = document.createElement('favorite-button');
    favoriteButton.setAttribute('restaurant', JSON.stringify(this._restaurant));
    favoriteButton.setAttribute(
      'is-favorite',
      `${await this._isRestaurantExist(id)}`
    );
    favoriteButton.addEventListener('add-favorite', (ev) => {
      FavoriteRestaurantIdb.putRestaurant(ev.detail.restaurant);
    });

    favoriteButton.addEventListener('delete-favorite', (ev) => {
      FavoriteRestaurantIdb.deleteRestaurant(ev.detail.id);
    });
    this._likeButtonContainer.appendChild(favoriteButton);
  },

  // Fungsi ini akan dipanggil ketika tombol favorite di-render.
  async _isRestaurantExist(id) {
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(id);
    return !!restaurant;
  },
};

export default LikeButtonPresenter;
