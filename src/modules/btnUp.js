const btnUp = () => {
  const btn = document.getElementById('totop'),
    mainHeight = document.querySelector('.header-main').offsetHeight;
    
  btn.style.opacity = 0;
  btn.style.transition = '0.5s';

  window.addEventListener('scroll', () => {
    if (window.pageYOffset >= mainHeight) {
      btn.style.opacity = 1;
    } else {
      btn.style.opacity = 0;
    }
  });

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const scrollUp = () => {
      window.scrollBy(0, -100);
      if (window.pageYOffset > 0) {
        requestAnimationFrame(scrollUp);
      }
    };
    scrollUp();
  });
};

export default btnUp;