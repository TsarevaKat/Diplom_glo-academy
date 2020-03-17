const calc = () => {
  const calcForm = document.getElementById('card_order'),
    calcResult = document.getElementById('price-total'),
    calcSale = calcForm.querySelector('.price input');
  let timeVal = '1',
    clubName = 'mozaika',
    saleVal = false;

  if (calcResult) {

    calcForm.addEventListener('click', (e) => {
      let target = e.target;
      if (target.matches('input') && target.closest('.time')) {
        timeVal = target.value;
      } else if (target.matches('input') && target.closest('.club')) {
        clubName = target.value;
      }
      calcSum(timeVal, clubName, saleVal);
    });

    calcSale.addEventListener('input', () => {
      if (calcSale.value === 'ТЕЛО2019') {
        saleVal = true;
      } else {
        saleVal = false;
      }
      calcSum(timeVal, clubName, saleVal);
    });

    const calcSum = (time = '1', club = 'mozaika', sale = false) => {
      let price;
      if (club === 'mozaika') {
        switch (time) {
          case '1': price = 1999;
            break;
          case '6': price = 9900;
            break;
          case '9': price = 13900;
            break;
          case '12': price = 19900;
            break;
        }
      } else if (club === 'schelkovo') {
        switch (time) {
          case '1': price = 2999;
            break;
          case '6': price = 14990;
            break;
          case '9': price = 21990;
            break;
          case '12': price = 24990;
            break;
        }
      }
      if (sale) {
        price *= 0.7;
      }
      calcResult.textContent = Math.ceil(price);
    };

    calcSum();
  }
};

export default calc;