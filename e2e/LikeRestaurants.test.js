Feature('Likes Restaurant');

Scenario('shows empty liked restaurants', async ({ I }) => {
  I.amOnPage('/');
  I.scrollTo('header');
  I.seeElement('a[href="#/favorite"]');
  I.click('a[href="#/favorite"]');
  I.wait(3);
  I.see('Anda belum menambahkan restoran favorit.', '.hero .hero-content h3'); // Memastikan tidak ada restoran yang ditampilkan
});

Scenario('Unlikes a restaurant and then verifies it in favorite restaurants', async ({ I }) => {
  I.amOnPage('/');
  I.wait(2);

  I.scrollTo('#daftar-restoran');
  I.wait(2);

  I.executeScript(() => {
    const firstCard = document.querySelector('restoran-card');
    const shadowRoot = firstCard.shadowRoot;
    const link = shadowRoot.querySelector('.restoran .restoran-bawah a');
    link.click();
  });
  I.see('Add Restaurant to Favorite', '#form-add-to-favorite button');
  I.wait(2);

  I.seeElement('.content #form-add-to-favorite button');
  I.wait(2);
  // I.executeScript(() => {
  //   const firstCard = document.querySelector('restaurant-detail');
  //   const shadowRoot = firstCard.shadowRoot;
  //   const buttonFavorite = shadowRoot.querySelector('#form-add-to-favorite button');
  //   buttonFavorite.click();
  // });
  // I.click('restaurant-detail #form-add-to-favorite button');
  I.wait(2);
  I.seeElement('#form-add-to-favorite button');
  I.click('#form-add-to-favorite button');

  // I.wait(5);
  // I.waitForVisible('.swal2-popup .swal2-actions .swal2-confirm', 2);

  // Klik tombol "OK" pada SweetAlert
  // I.waitForElement('button.swal2-confirm.swal2-styled.swal2-default-outline', 5);
  // I.wait(3);
  // I.click('button.swal2-confirm.swal2-styled.swal2-default-outline');
  I.wait(2);
  I.see('Remove Restaurant from Favorite', '#form-add-to-favorite button');

  I.scrollTo('header');
  I.seeElement('a[href="#/favorite"]');
  I.click('a[href="#/favorite"]');
  I.scrollTo('#daftar-restoran');
  I.wait(3);
  I.seeElement('.restoran'); // Memastikan ada restoran yang ditampilkan
  I.wait(2);
});
