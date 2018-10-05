// THIS THE MENU JS CODE

const theMenuButton = document.getElementById('menu');

const theCloseButton = document.getElementById('closer');

const showMenu = () => {
  theMenuButton.onclick = () => {
    toggleMenuBody();
    toggleCloseButton();
  };
};

const hideMenu = () => {
  theCloseButton.onclick = () => {
    toggleMenuBody();
    toggleCloseButton();
  };
};

const toggleMenuBody = () => {
  const menuid = document.getElementById('bodyMenu');

  if (menuid.classList.contains('not-visible')) {
    menuid.classList.remove('not-visible');
    menuid.classList.add('visible');
  } else {
    menuid.classList.remove('visible');
    menuid.classList.add('not-visible');
  }
};

const toggleMenuButton = () => {
  const menu_button = document.getElementById('menu');

  if (menu_button.classList.contains('show')) {
    menu_button.classList.remove('show');
    menu_button.classList.add('hide');
  } else {
    menu_button.classList.remove('hide');
    menu_button.classList.add('show');
  }
};

const toggleCloseButton = () => {
  const close_button = document.getElementById('closer');

  if (close_button.classList.contains('show')) {
    close_button.classList.remove('show');
    close_button.classList.add('hide');
  } else {
    close_button.classList.remove('hide');
    close_button.classList.add('show');
  }
};

// THIS IS THE MODAL JS CODE

const overlay = document.getElementById('overlay');
const modalOpener = document.getElementById('open-modal');
const modalCloser = document.getElementById('close-modal');

const openModal = () => {
  // CHECK FIRST IF MODAL EXISTS IN PAGE
  const element = document.getElementById('open-modal');
  if (typeof element !== 'undefined' && element != null) {
    modalOpener.onclick = () => {
      overlay.classList.remove('is-hidden');
    };
  }
};

const closeModal = () => {
  // CHECK FIRST IF MODAL EXISTS IN PAGE
  const element = document.getElementById('close-modal');
  if (typeof element !== 'undefined' && element != null) {
    modalCloser.onclick = () => {
      overlay.classList.add('is-hidden');
    };
  }
};

const user_name = localStorage.getItem('user_name');

const showName = () => {
  const header_name = document.getElementById('username-header');

  header_name.innerHTML = `${user_name}`;
};

// TO ENSURE THESE JS FILES ONLY RUN WHEN DOM ELEMENTS HAVE LOADED
window.onload = () => {
  showName();
  showMenu();
  hideMenu();
  openModal();
  closeModal();
  if (window.location.pathname == '/UserProfile.html') {
    getUserRecent();
    getProfile();
    getMostAnswered();
  }

  if (window.location.pathname == '/ViewQuestion.html') {
    openQuestion();
  }
};
