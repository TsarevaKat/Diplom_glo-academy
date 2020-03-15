const mobileMenu = () => {
  const burgerBtn = document.querySelector('.menu-button'),
    burgerMenu = document.querySelector('.popup-menu'),
    topMenu = document.querySelector('.top-menu'),
    menuHeight = topMenu.offsetHeight,
    menuItems = topMenu.querySelectorAll('.scroll a'),
    headHeight = document.querySelector('.head').offsetHeight;

  burgerBtn.addEventListener('click', () => {
    burgerMenu.style.display = 'flex';
  });

  burgerMenu.addEventListener('click', (e) => {
    let target = e.target;
    if (target.closest('.close-menu-btn') || target.closest('.scroll')) {
      burgerMenu.style.display = 'none';
    }
  });

  // фиксация бургем меню 
  window.addEventListener('scroll', () => {
    if (window.pageYOffset >= headHeight) {
      topMenu.style.position = 'fixed';
    } else {
      topMenu.style.position = 'static';
    }
  });

  // прокрутка по странице
  const scrollBlock = (btn) => {
    let href = btn.getAttribute('href'),
      blockForScroll = document.querySelector(href),
      topBlock = blockForScroll.offsetTop - menuHeight;
      
    const scrollDown = () => {
      window.scrollBy(0, 50);
      if (window.pageYOffset < topBlock) {
        requestAnimationFrame(scrollDown);
      }
    };

    const scrollUp = () => {
      window.scrollBy(0, -50);
      if (window.pageYOffset > topBlock) {
        requestAnimationFrame(scrollUp);
      }
    };

    if (window.pageYOffset < topBlock) {
      scrollDown();
    } else {
      scrollUp();
    }
  };

  menuItems.forEach(item => item.addEventListener('click', (e) => {
    e.preventDefault();
    scrollBlock(e.target);
  }));
};

export default mobileMenu;