const navbarActive = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const navbarItems = document.querySelectorAll('#navbar-big ul li');

    navbarItems.forEach((navbarItem) => {
      navbarItem.addEventListener('click', (event) => {
        event.stopPropagation(); // Menghentikan event bubbling

        // Pastikan target adalah elemen li
        const targetItem = event.target.closest('li');

        if (targetItem) {
          // Hapus class active-nav dari semua item
          navbarItems.forEach((item) => {
            item.classList.remove('active-nav');
          });

          // Tambahkan class active-nav hanya pada elemen yang diklik
          targetItem.classList.add('active-nav');
        }
      });
    });
  });
};

export default navbarActive;
