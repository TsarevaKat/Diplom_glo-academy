const fadeOutSlide = (slide, cur) => {
  const slideNow = slide[cur];
  slideNow.style.opacity = 0;
  setTimeout(() => {
    slideNow.style.display = 'none';
  }, 500);
};

const fadeInSlide = (slide, cur, typeBlock) => {
  const slideNow = slide[cur];
  slideNow.style.opacity = 0;
  setTimeout(() => {
    slideNow.style.display = typeBlock;
  }, 500);
  setTimeout(() => {
    slideNow.style.opacity = 1;
  }, 600);
};

const startSlide = (slider, typeBlock, time = 5000) => {
  let curSlide = 0, interval;
  const autoPlay = (slide, typeBlock) => {
    fadeOutSlide(slide, curSlide);
    curSlide++;
    if (curSlide >= slide.length) {
      curSlide = 0;
    }
    fadeInSlide(slide, curSlide, typeBlock);
  };
  const slide = slider.querySelectorAll('.slide');
  slide.forEach((item, index) => {
    item.style.transition = '0.5s';
    if (index > 0) {
      item.style.display = 'none';
    }
  });

  interval = setInterval(() => { autoPlay(slide, typeBlock); }, time);
};

const addArrow = (slider) => {
  slider.style.position = 'relative';
  const img = document.createElement('img'),
  span = document.createElement('span'),
    arrow = document.createElement('div');
  span.appendChild(img);
  arrow.appendChild(span);
  arrow.classList.add('slider-arrow');
  const arrowNext = arrow.cloneNode(true), arrowPrev = arrow.cloneNode(true);
  arrowNext.classList.add('next');
  arrowPrev.classList.add('prev');
  const imgArrowPrev = arrowPrev.querySelector('img');
  const imgArrowNext = arrowNext.querySelector('img');
  imgArrowPrev.src = 'images/arrow-left.png';
  imgArrowNext.src = 'images/arrow-right.png';
  slider.appendChild(arrowNext);
  slider.appendChild(arrowPrev);
};

const dotsAdd = (slider) => {
  const slide = slider.querySelectorAll('.slide');
  const dots = document.createElement('ul');
  dots.classList.add('slider-dots');
  for (let i = 0; i < slide.length; i++) {
    let li = document.createElement('li'),
    button = document.createElement('button');
    li.appendChild(button);
    dots.appendChild(li);
  }
  slider.appendChild(dots);
};

const sliders = () => {
  const sliderMain = document.querySelector('.main-slider'),
    sliderGalley = document.querySelector('.gallery-slider');

  // const stopSlide = () => {
  //   clearInterval(interval);
  // };

  startSlide(sliderMain, 'flex');
  startSlide(sliderGalley, 'block');
  addArrow(sliderGalley);
  dotsAdd(sliderGalley);
};

export default sliders;