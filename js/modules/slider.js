function slider() {
  // SLIDER FIRST WAY (EASY)
  // const slides = document.querySelectorAll('.offer__slide'),
  //   prev = document.querySelector('.offer__slider-prev'),
  //   next = document.querySelector('.offer__slider-next'),
  //   current = document.querySelector('#current'),
  //   total = document.querySelector('#total');

  // let slideIndex = 1;
  // show(slideIndex)
  // function show(s) {
  //   if(s > slides.length){
  //     slideIndex = 1
  //   }
  //   if(s < 1) {
  //     slideIndex = slides.length
  //   }
  //   slides.forEach(item => item.style.cssText = 'display: none')
  //   slides[slideIndex - 1].style.display = 'block'
  //   if(slides.length < 10) {
  //     current.textContent = `0${slideIndex}`
  //   }else{
  //     current.textContent = slideIndex
  //   }
  // }
  // function sliderPlus(s) {
  //   show(slideIndex += 1)
  // }
  // prev.addEventListener('click', () => {
  //   sliderPlus(-1)
  // })
  // next.addEventListener('click', () => {
  //   sliderPlus(1)
  // })

  const slides = document.querySelectorAll(".offer__slide"),
    slider = document.querySelector(".offer__slider"),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    current = document.querySelector("#current"),
    total = document.querySelector("#total"),
    slidesWrapper = document.querySelector(".offer__slider-wrapper"),
    width = window.getComputedStyle(slidesWrapper).width,
    slidesField = document.querySelector(".offer__slider-inner");

  let slideIndex = 1,
    offset = 0;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  slidesField.style.width = 100 * slides.length + "%";

  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";
  slidesWrapper.style.overflow = "hidden";

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  slider.style.position = "relative";
  let indicator = document.createElement("ol"),
    dots = [];

  indicator.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none
  `;

  slider.append(indicator);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin: 0 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transform: opacity .6s ease;
    `;
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicator.append(dot);
    dots.push(dot);
  }

  function deleteNotDigits(str) {
    return +str.replace(/\D/g, "");
  }

  next.addEventListener("click", () => {
    if (offset == deleteNotDigits(width) * (slides.length - 1)) {
      // 650
      offset = 0;
    } else {
      offset += deleteNotDigits(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }

    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = 1;
  });

  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset = deleteNotDigits(width) * (slides.length - 1);
    } else {
      offset -= deleteNotDigits(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }

    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = 1;
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");

      slideIndex = slideTo;
      offset = deleteNotDigits(width) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
      } else {
        current.textContent = slideIndex;
      }

      dots.forEach((dot) => (dot.style.opacity = ".5"));
      dots[slideIndex - 1].style.opacity = 1;
    });
  });
}

export default slider;
