import FavoriteRestaurantDB from '../../data/favorite-restaurant-idb';
import { IMAGE_ENDPOINT } from '../../globals/API_ENDPOINT';
import Swal from 'sweetalert2';

if (!customElements.get('restoran-card')) {
  customElements.define('restoran-card', RestoranCard);
}

const FavoriteRestaurants = {
  async render() {
    return `
        <!-- Jumbotron -->
        <section
            class="hero" 
            data-aos="zoom-in" 
            data-aos-duration="1000" 
            data-aos-delay="200"
        >
            <div class="hero-content">
                <h3>Temukan Restoran Terbaik di Sekitar Anda</h3>
                <p>
                    Kulinary adalah platform katalog restoran yang memudahkan pencinta kuliner menemukan tempat makan terbaik. 
                    <br id="break"> Temukan petualangan rasa yang tak terlupakan bersama Kulinary!
                </p>
            </div>
        </section>

        <div id="tulisan-jika-ada"></div>

        <!-- Daftar Restoran -->
        <section id="daftar-restoran">
            <div class="custom-loader"></div>
            <div class="custom-loader"></div>
            <div class="custom-loader"></div>
        </section>
        `;
  },

  async afterRender(){
    // Fungsi ini akan dipanggil setelah render()
    const daftarRestoran = document.getElementById('daftar-restoran');
    const tulisanJikaAda = document.getElementById('tulisan-jika-ada');
    const heroContent = document.querySelector('.hero-content');
    const h3HeroContent = heroContent.querySelector('h3');
    const pHeroContent = heroContent.querySelector('p');

    try {
      const restaurants = await FavoriteRestaurantDB.getAllRestaurants();
      if (!restaurants.length) {
        h3HeroContent.textContent = 'Anda belum menambahkan restoran favorit.';
        pHeroContent.textContent = 'Tambahkan restoran favorit Anda sekarang!';
        daftarRestoran.style.display = 'none';
        return;
      }

      let restoranCard = '';
      let duration = 0;
      let delay = 100;

      tulisanJikaAda.innerHTML = `<p style="text-align:center; font-weight:bold; font-size:1.5rem; margin-top:1rem; color:#10375C;" data-aos="fade-up">Anda memiliki ${restaurants.length} restoran favorit.</p>`;

      restaurants.forEach((restoran) => {
        let deskripsi = restoran.description;

        // Memotong deskripsi jika lebih dari 125 karakter
        if (deskripsi.length > 125) {
          deskripsi = `${deskripsi.substring(0, 125)  }...`;
        }

        duration += 1000;
        delay += 25;

        restoranCard += `
            <restoran-card
                nama="${restoran.name}"
                lokasi="${restoran.city}"
                rating="${restoran.rating}"
                deskripsi="${deskripsi}"
                id="${restoran.id}"
                foto="${IMAGE_ENDPOINT}/small/${restoran.pictureId}"
                data-aos="fade-down"
                data-aos-duration="${duration}"
                data-aos-delay="${delay}"
            ></restoran-card>
            `;
      });

      daftarRestoran.innerHTML = restoranCard;
    } catch (error) {
      Swal.fire({
        title: 'Ups...!',
        text: `There is something wrong: ${  error}`,
        icon: 'warning',
        color: '#10375C',
        confirmButtonColor: '#EB8317'
      });
      const main = document.querySelector('main');
      main.innerHTML = '<p  style="text-align:center; font-weight:bold;">Terjadi kesalahan saat memuat data restoran. Silakan coba lagi nanti.</p>';
    }
  }
};

export default FavoriteRestaurants;