import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import * as TestFactories from './helpers/testFactories';
import '../src/scripts/views/components/favorite-button';

describe('Delete Restaurant from Favorite', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should be able to remove favorite restaurant from the list', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });
    document.querySelector('#favorite-button').dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });

  it('should not display add to favorite button when the restaurant has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });
    const favoriteButton = document.querySelector('#favorite-button');
    expect(favoriteButton).toBeTruthy();
    expect(favoriteButton.textContent).not.toContain('Tambahkan ke Favorit');
  });

  it('should display delete from favorite button when the restaurant has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });
    const favoriteButton = document.querySelector('#favorite-button');
    expect(favoriteButton).toBeTruthy();
    expect(favoriteButton.textContent).toContain('Hapus dari Favorit');
  });

  it('should not throw error when user click delete from favorite if that restaurant is not in the list', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });
    // Hapus restoran dari daftar restoran yang sudah disukai
    await FavoriteRestaurantIdb.deleteRestaurant(1);
    // Kemudian, simulasikan pengguna menekan widget batal menyukai restoran
    document.querySelector('#favorite-button').dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
