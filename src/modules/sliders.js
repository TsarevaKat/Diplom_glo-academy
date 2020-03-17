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
  let curSlide = 0,
    interval;
  const slide = slider.querySelectorAll('.slide'),
    dot = slider.querySelectorAll('.dot');

  slide.forEach((item, index) => {
    item.style.transition = '0.5s';
    if (index > 0) {
      item.style.display = 'none';
    }
  });

  const autoPlay = (slide, typeBlock, dot) => {
    fadeOutSlide(slide, curSlide);
    if (dot.length) {
      dot[curSlide].classList.remove('slick-active');
    }
    curSlide++;
    if (curSlide >= slide.length) {
      curSlide = 0;
    }
    fadeInSlide(slide, curSlide, typeBlock);
    if (dot.length) {
      dot[curSlide].classList.add('slick-active');
    }
  };

  const playSlide = () => {
    interval = setInterval(() => {
      autoPlay(slide, typeBlock, dot);
    }, time);
  };

  const stopSlide = () => {
    clearInterval(interval);
  };

  slider.addEventListener('click', (e) => {
    let target = e.target;

    console.log('target: ', target);
    if (!(target.closest('.dot') || target.closest('.slider-arrow'))) {
      return;
    }

    fadeOutSlide(slide, curSlide);
    if (dot.length) {
      dot[curSlide].classList.remove('slick-active');
    }

    if (target.closest('.next')) {
      curSlide++;
    } else if (target.closest('.prev')) {
      curSlide--;
    } else if (target.closest('.dot')) {
      dot.forEach((elem, index) => {
        if (elem === target.closest('.dot')) {
          curSlide = index;
        }
      });
    }

    if (curSlide >= slide.length) {
      curSlide = 0;
    }

    if (curSlide < 0) {
      curSlide = slide.length - 1;
    }

    fadeInSlide(slide, curSlide, typeBlock);
    if (dot.length) {
      dot[curSlide].classList.add('slick-active');
    }

  });

  slider.addEventListener('mouseover', (e) => {
    if (e.target.closest('.dot') || e.target.closest('.slider-arrow')) {
      stopSlide();
    }
  });

  slider.addEventListener('mouseout', (e) => {
    if (e.target.closest('.dot') || e.target.closest('.slider-arrow')) {
      playSlide();
    }
  });

  playSlide();

};

const addArrow = (slider) => {
  slider.style.position = 'relative';
  const img = document.createElement('img'),
    span = document.createElement('span'),
    arrow = document.createElement('div');
  span.appendChild(img);
  arrow.appendChild(span);
  arrow.classList.add('slider-arrow');
  const arrowNext = arrow.cloneNode(true),
    arrowPrev = arrow.cloneNode(true);
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
    li.classList.add('dot');
    if (i === 0) {
      li.classList.add('slick-active');
    }
    li.appendChild(button);
    dots.appendChild(li);
  }
  slider.appendChild(dots);
};

class SiderCar {
  constructor(){

  }

  init(){

  }
}

const sliders = () => {
  const sliderMain = document.querySelector('.main-slider'),
    sliderGalley = document.querySelector('.gallery-slider'), 
    sliderServices = document.querySelector('.services-slider');

  startSlide(sliderMain, 'flex');
  addArrow(sliderGalley);
  dotsAdd(sliderGalley);
  startSlide(sliderGalley, 'block');
  
};

export default sliders;