const forms = () => {
  const formCallback = document.getElementById('form1'),
    formVizit = document.getElementById('form2'),
    formBanner = document.getElementById('banner-form'),
    formCard = document.getElementById('card_order'),
    formFooter = document.getElementById('footer_form');

  const sendForm = (form) => {
    let index = 0;
    const formInputs = form.querySelectorAll('input');

    const checkError = document.createElement('div');
    checkError.classList.add('error');
    checkError.style.cssText = `
      margin-top: 5px;
      font-weight: 700;
      color: #ff0000;
    `;

    form.appendChild(checkError);

    form.addEventListener('input', (e) => {
      const target = e.target;
      if (target.matches('input[type="text"]')) {
        target.value = target.value.replace(/[^а-яё\s]/gi, '');
      } else if (target.matches('input[type="tel"]')) {
        const leng = target.value.length;
        target.value = target.value.replace(/[^\+\d)(-]/, '');

        if (leng < index) {
          index--;
          return;
        }

        if (leng === 1) {
          target.value = '+' + target.value + '(';
        }

        if (leng === 6) {
          target.value = target.value + ")";
        }

        if (leng === 10) {
          target.value = target.value + "-";
        }

        if (leng === 13) {
          target.value = target.value + "-";
        }

        if (leng > 16) {
          target.value = target.value.substring(0, target.value.length - 1);
        }

        index++;

      }
    });


    const postData = (body) => {
      return fetch('./server.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);

      let body = {};

      formData.forEach((val, key) => {
        body[key] = val;
      });

      const popupSend = () => {
        const errorMessage = 'Что-то пошло не так...',
          loadMessage = 'Загрузка...',
          successMessage = 'Спасибо! Мы скоро с вами свяжемся';

        const statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        statusMessage.style.cssText = `
          height: 100%;
          font-size: 20px;
          font-weight: 700;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        `;
        statusMessage.textContent = loadMessage;

        form.style.display = 'none';
        form.closest('.form-content').appendChild(statusMessage);

        postData(body)
          .then(
            (response) => {
              if (response.status !== 200) {
                throw new Error('status network not 200');
              }
              statusMessage.textContent = successMessage;
            })
          .catch(
            () => {
              statusMessage.textContent = errorMessage;
            }
          );

        formInputs.forEach((item) => {
          item.value = '';
        });
      };

      const formSend = () => {
        const thanks = document.getElementById('thanks'),
          thanksText = thanks.querySelector('p');

        postData(body)
          .then(
            (response) => {
              if (response.status !== 200) {
                throw new Error('status network not 200');
              }
              thanks.style.display = 'block';
              thanksText.innerHTML = `Ваша заявка отправлена. <br> Мы свяжемся с вами в ближайшее время`;

            })
          .catch(
            () => {
              thanks.style.display = 'block';
              thanksText.innerHTML = `Что-то пошло не так`;
            }
          );

        formInputs.forEach((item) => {
          if (!(item.matches('[type="checkbox"]') || item.matches('[type="radio"]') || item.matches('[type="hidden"]'))) {
            item.value = '';
          }
        });
      };

      if (!form.matches('#footer_form')) {
        const agree = form.querySelector('.personal-data');
        let check = agree.querySelector('input');

        if (!check.checked) {
          checkError.textContent = 'необходимо подтвердить согласие';
        } else {
          checkError.textContent = '';
          if (e.target.closest('.popup')) {
            popupSend();
          } else {
            formSend();
          }
        }
      } else {
        const club = form.querySelectorAll('.club input');
        let check = 1;

        club.forEach((item) => {
          if (item.checked) {
            check = 0;
            return;
          }
        });

        if (check === 1) {
          checkError.textContent = 'необходимо выбрать клуб';
        } else {
          checkError.textContent = '';
          formSend();
        }
      }
    });
  };

  sendForm(formCallback);
  sendForm(formVizit);
  sendForm(formBanner);
  sendForm(formCard);
  sendForm(formFooter);
};

export default forms;