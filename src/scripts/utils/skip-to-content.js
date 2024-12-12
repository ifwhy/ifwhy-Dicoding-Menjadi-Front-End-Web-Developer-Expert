const skipToContent = () => {
  document.querySelector('.skip-to-content').addEventListener('click', (event) => {
    event.preventDefault(); // Mencegah default behavior
    const currentHash = window.location.hash;
    const mainContent = document.getElementById('main-content');
    // Hapus '#main-content' jika sudah ada
    const cleanHash = currentHash.replace('#main-content', '');
    // Update hash jika perlu
    if (!currentHash.includes('#main-content')) {
      window.history.replaceState(
        null,
        '',
        `${cleanHash}#main-content`
      );
    }
    // Fokus dan scroll
    mainContent.focus();
    mainContent.scrollIntoView({ behavior: 'smooth' });
  });
};

export default skipToContent;
