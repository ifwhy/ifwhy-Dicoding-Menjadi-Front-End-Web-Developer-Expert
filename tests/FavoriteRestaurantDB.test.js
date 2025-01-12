import FavoriteRestaurantDB from '../src/scripts/data/favorite-restaurant-idb.js';

describe('Favorite Restaurant IndexedDB Contract Test', () => {
  const testRestaurant = {
    id: '6c7bqjgi84kcowlqdz',
    name: 'Bring Your Phone Cafe',
    description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.',
    pictureId: 'https://restaurant-api.dicoding.dev/images/medium/41',
    city: 'Medan',
    rating: 4.6
  };

  beforeEach(async () => {
    // Pastikan database bersih sebelum setiap tes
    const allRestaurants = await FavoriteRestaurantDB.getAllRestaurants();
    allRestaurants.forEach(async (restaurant) => {
      await FavoriteRestaurantDB.deleteRestaurant(restaurant.id);
    });
  });

  afterEach(async () => {
    // Bersihkan database setelah setiap tes
    const allRestaurants = await FavoriteRestaurantDB.getAllRestaurants();
    allRestaurants.forEach(async (restaurant) => {
      await FavoriteRestaurantDB.deleteRestaurant(restaurant.id);
    });
  });

  test('should be able to add a restaurant to IndexedDB', async () => {
    await FavoriteRestaurantDB.putRestaurant(testRestaurant);

    const restaurant = await FavoriteRestaurantDB.getRestaurant(testRestaurant.id);
    expect(restaurant).toEqual(testRestaurant);
  });

  test('should retrieve all restaurants from IndexedDB', async () => {
    await FavoriteRestaurantDB.putRestaurant(testRestaurant);

    const restaurants = await FavoriteRestaurantDB.getAllRestaurants();
    expect(restaurants).toEqual([testRestaurant]);
  });

  test('should delete a restaurant from IndexedDB', async () => {
    await FavoriteRestaurantDB.putRestaurant(testRestaurant);

    await FavoriteRestaurantDB.deleteRestaurant(testRestaurant.id);

    const restaurants = await FavoriteRestaurantDB.getAllRestaurants();
    expect(restaurants).toEqual([]);
  });

  test('should not add a restaurant without an id', async () => {
    const invalidRestaurant = { name: 'Invalid Restaurant' };

    await FavoriteRestaurantDB.putRestaurant(invalidRestaurant);

    const restaurants = await FavoriteRestaurantDB.getAllRestaurants();
    expect(restaurants).toEqual([]);
  });

  test('should be able to search restaurants by query', async () => {
    const restaurantA = { id: 1, name: 'Sate Ayam' };
    const restaurantB = { id: 2, name: 'Sate Kambing' };

    await FavoriteRestaurantDB.putRestaurant(restaurantA);
    await FavoriteRestaurantDB.putRestaurant(restaurantB);

    const results = await FavoriteRestaurantDB.searchRestaurants('kambing');
    expect(results).toEqual([restaurantB]);
  });
});
