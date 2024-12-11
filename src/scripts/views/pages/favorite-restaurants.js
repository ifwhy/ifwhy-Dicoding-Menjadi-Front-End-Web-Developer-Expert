if (!customElements.get('restoran-card')) {
  customElements.define('restoran-card', RestoranCard);
}

const favorite_restaurants = {
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

    async afterRender(){
        
    }
};

export default favorite_restaurants;