import * as TestFactories from './helpers/testFactories';
import '../src/scripts/views/components/favorite-button';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
describe(' A Restaurant To Favorite', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('should show the add favorite button when the restaurant not in favorit', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });
    const favoriteButton = document.querySelector('#favorite-button');
    expect(favoriteButton).toBeTruthy();
    expect(favoriteButton.textContent).toContain('Tambahkan ke Favorit');
  });

  it('should be able to add restaurant to favorite', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });
    document.querySelector('#favorite-button').dispatchEvent(new Event('click'));
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(1);
    expect(restaurant).toEqual({ id: 1 });
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should not show the remove favorite button when the restaurant has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });
    const favoriteButton = document.querySelector('#favorite-button');
    expect(favoriteButton).toBeTruthy();
    expect(favoriteButton.textContent).not.toContain('Hapus dari Favorit');
  });

  it('should not add a restaurant again when its already in favorite', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });
    // Menambahkan restoran dengan id 1 ke daftar restoran yang disukai
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
    // Simulasikan pengguna menekan tombol suka restoran
    document.querySelector('#favorite-button').dispatchEvent(new Event('click'));
    // Tidak ada restoran yang duplikat
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([
      { id: 1 },
    ]);
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should not add a restaurant when it has no id', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({});
    document.querySelector('#favorite-button').dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
