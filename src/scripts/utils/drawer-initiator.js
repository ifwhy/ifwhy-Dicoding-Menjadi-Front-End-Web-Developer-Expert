let isSideBarOpen = false;

function drawerInitiator({
  drawerButton,
  drawerNavigation,
  closeIcon,
  sideBarButton,
  menuButton,
}) {

  const updateAriaAttributes = () => {
    drawerButton.setAttribute('aria-expanded', isSideBarOpen.toString());
    drawerNavigation.setAttribute('aria-hidden', (!isSideBarOpen).toString());
  };

  const toggleSidebar = () => {
    drawerNavigation.classList.toggle('open');
    sideBarButton.forEach((button) => {
      button.classList.toggle('close');
    });
    isSideBarOpen = !isSideBarOpen;
    updateAriaAttributes();
  };

  const closeSidebar = () => {
    if (isSideBarOpen) {
      drawerNavigation.classList.remove('open');
      sideBarButton.forEach((button) => button.classList.remove('close'));
      isSideBarOpen = false;
      updateAriaAttributes();

      closeIcon.classList.add('close');
      menuButton.classList.remove('close');
    }
  };

  drawerButton.addEventListener('click', toggleSidebar);
  document.body.addEventListener('click', (event) => {
    if (
      !drawerNavigation.contains(event.target) &&
      !drawerButton.contains(event.target)
    ) {
      closeSidebar();
    }
  });
}

export default drawerInitiator;