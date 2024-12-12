import Home from '../views/pages/Home';
import DetailRestaurants from '../views/pages/Detail-restaurants';
import FavoriteRestaurants from '../views/pages/Favorite-restaurants';

const routes = {
  '/': Home,
  '/favorite': FavoriteRestaurants,
  '/detail/:id': DetailRestaurants
};

export default routes;