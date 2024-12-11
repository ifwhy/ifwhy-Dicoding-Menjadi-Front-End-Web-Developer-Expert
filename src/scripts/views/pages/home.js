import 'regenerator-runtime'; /* for async await transpile */
import RestoranCard from '../templates/RestoranCard';
import { API_ENDPOINT, IMAGE_ENDPOINT } from '../../globals/API_ENDPOINT';
import Swal from 'sweetalert2';

if (!customElements.get('restoran-card')) {
  customElements.define('restoran-card', RestoranCard);
}

const home = {
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

      <!-- Daftar Restoran -->
      <section id="daftar-restoran">
        <div class="custom-loader"></div>
        <div class="custom-loader"></div>
        <div class="custom-loader"></div>
      </section>
    `;
  },

  async afterRender() {
    // Fungsi ini akan dipanggil setelah render()
    const daftar_restoran = document.getElementById('daftar-restoran');

    try {
      // Ganti API_ENDPOINT dengan URL API yang sesuai
      const response = await fetch(API_ENDPOINT + '/list');
      
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const { restaurants } = await response.json();
      if (!restaurants.length) {
        daftar_restoran.innerHTML = '<p  style="text-align:center">Data restoran tidak tersedia.</p>';
        return;
      }

      let restoranCard = '';
      let duration = 0;
      let delay = 100;

      restaurants.forEach((restoran) => {
        let deskripsi = restoran.description;

        // Memotong deskripsi jika lebih dari 125 karakter
        if (deskripsi.length > 125) {
          deskripsi = deskripsi.substring(0, 125) + '...';
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

      daftar_restoran.innerHTML = restoranCard;
    } catch (error) {
      Swal.fire({
        title: "Ups...!",
        text: "There is something wrong: " + error,
        icon: "warning",
        color: "#10375C",
        confirmButtonColor: "#EB8317"
      });
      const main = document.querySelector('main');
      main.innerHTML = '<p  style="text-align:center; font-weight:bold;">Terjadi kesalahan saat memuat data restoran. Silakan coba lagi nanti.</p>';
    }
  },
};

export default home;
