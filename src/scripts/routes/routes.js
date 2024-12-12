import home from '../views/pages/home';
import detail_restaurants from '../views/pages/detail-restaurants';
import favorite_restaurants from '../views/pages/favorite-restaurants';

const routes = {
  '/': home,
  '/favorite': favorite_restaurants,
  '/detail/:id': detail_restaurants
};

export default routes;