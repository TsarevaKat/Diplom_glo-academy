const forms = () => {
  const formCallback = document.getElementById('form1'),
    formVizit = document.getElementById('form2'),
    formBanner = document.getElementById('banner-form'),
    formCard = document.getElementById('card_order'),
    formFooter = document.getElementById('footer_form');

  const sendForm = (form) => {
    let index = 0;
    const formInputs = form.querySelectorAll('input');

    form.addEventListener('input', (e) => {
      const target = e.target;
      if (target.matches('input[type="text"]')) {
        target.value = target.value.replace(/[^а-я!]/gi, '');
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

        console.log('leng: ', leng);
        console.log('target.value: ', target.value);
      }
    });


    const postData = (body) => {
      return fetch('./server.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      });
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const check = form.querySelector('.personal-data input'),
        checkError = document.createElement('div');
      checkError.classList.add('error');

      if (check.length && !check.checked) {
        checkError.textContent = 'необходимо подтвердить согласие';
      } else {
        checkError.textContent = '';
      }
      form.appendChild(checkError);

      const formData = new FormData(form);

      const popupSend = () => {
        const errorMessage = 'Что-то пошло не так...',
          loadMessage = 'Загрузка...',
          successMessage = 'Спасибо! Мы скоро с вами свяжемся';

        const statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        statusMessage.textContent = loadMessage;

        form.style.display = 'none';
        form.closest('.form-content').appendChild(statusMessage);
        postData(formData)
          .then(
            (response) => {
              if (response.status !== 200) {
                throw new Error('status network not 200');
              }
              statusMessage.textContent = successMessage;
              formInputs.forEach((item) => {
                item.value = '';
              });
            })
          .catch(
            () => {
              statusMessage.textContent = errorMessage;
            }
          );
      };

      const formSend = () => {
        const thanks = document.getElementById('thanks'),
          thanksText = thanks.querySelector('p');

        postData(formData)
          .then(
            (response) => {
              if (response.status !== 200) {
                throw new Error('status network not 200');
              }
              thanks.style.display = 'block';
              thanksText.innerHTML = `Ваша заявка отправлена. <br> Мы свяжемся с вами в ближайшее время`;
              formInputs.forEach((item) => {
                item.value = '';
              });
            })
          .catch(
            () => {
              thanks.style.display = 'block';
              thanksText.innerHTML = `Что-то пошло не так`;
            }
          );
      }

      if (e.target.closest('.popup')) {
        popupSend();
      } else {
        formSend();
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