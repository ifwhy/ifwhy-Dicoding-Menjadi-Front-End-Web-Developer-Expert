// steps_file.js

module.exports = function () {
  return actor({
    // Define custom steps
    navigateToRestaurantDetails() {
      this.amOnPage('/');
      this.click('.restaurant-card a');
    },
    likeRestaurant() {
      this.click('#likeButton');
    },
  });
};
