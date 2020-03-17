const popup = () => {
  const popupLink = document.querySelector('.open-popup'),
    btnPopupCallBack = document.querySelectorAll('.head-main .callback-btn'),
    gift = document.querySelector('.fixed-gift'),
    popup = document.querySelectorAll('.popup');

  const popupOpen = (e) => {
    e.preventDefault();
    let target = e.target;
    let href = target.dataset.popup,
      popupNow = document.querySelector(href), popupForm = popupNow.querySelector('form'), status = popupNow.querySelector('.status');
    popupNow.style.display = 'block';
    popupForm.style.display = 'block';
    if (status) {
      status.remove();
    }
  };

  const popupClose = (e) => {
    let target = e.target;
    if (target.matches('.overlay') || target.matches('.close_icon') || target.matches('.close-btn')) {
      target.closest('.popup').style.display = 'none';
    }
  };

  popupLink.addEventListener('click', popupOpen);
  btnPopupCallBack.forEach((item) => {
    item.addEventListener('click', popupOpen);
  });

  popup.forEach((item) => {
    item.addEventListener('click', popupClose);
  });

  if (gift) {
    gift.addEventListener('click', () => {
      let href = '#gift',
        popupNow = document.querySelector(href);
      popupNow.style.display = 'block';
      gift.remove();
    });
  }
};

export default popup;