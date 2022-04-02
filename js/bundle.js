/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/accordion.js":
/*!*********************************!*\
  !*** ./js/modules/accordion.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function accordion() {
  const accordion = document.querySelectorAll(".accordion");

  accordion.forEach((acc) => {
    acc.addEventListener("click", () => {
      acc.classList.toggle("active");
      const panel = acc.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (accordion);


/***/ }),

/***/ "./js/modules/card.js":
/*!****************************!*\
  !*** ./js/modules/card.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function card() {
  const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Couldn't fetch ${url} status: ${res.status}`);
    }

    return res.json();
  };

  class CarCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classess) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classess = classess;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 10;
      this.changeToUSD();
    }

    changeToUSD() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement("div");
      // if(this.classess.length === 0) {
      //   this.classess = 'menu__item'
      //   element.classList.add(this.classess)
      // }else{
      //   this.classess.forEach(className => element.classList.add(className))
      // }
      element.innerHTML = `
        <div class="menu__item">
          <img src=${this.src} alt=${this.alt} />
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">${this.descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
            <div class="menu__item-cost">Price:</div>
            <div class="menu__item-total"><span>${this.price}</span> $</div>
          </div>
        </div>
      `;
      this.parent.append(element);
    }
  }

  // getResource("http://localhost:3000/menu").then((data) =>
  //   data.forEach(({ img, altimg, title, descr, price }) => {
  //     new CarCard(
  //       img,
  //       altimg,
  //       title,
  //       descr,
  //       price,
  //       ".menu .container"
  //     ).render();
  //   })
  // );

  axios.get("http://localhost:3000/menu").then((data) => {
    data.data.forEach(({ img, altimg, title, descr, price }) => {
      new CarCard(
        img,
        altimg,
        title,
        descr,
        price,
        ".menu .container"
      ).render();
    });
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (card);


/***/ }),

/***/ "./js/modules/date.js":
/*!****************************!*\
  !*** ./js/modules/date.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function date() {
  const deadline = "2022-04-30";
  function getTime(endTime) {
    const total = Date.parse(endTime) - Date.parse(new Date()),
      day = Math.floor(total / 1000 / 3600 / 24),
      hours = Math.floor((total / 1000 / 3600) % 24),
      minutes = Math.floor(
        (total - day * 24 * 3600 * 1000 - hours * 3600 * 1000) / 1000 / 60
      ),
      seconds = Math.floor(
        (total -
          day * 24 * 3600 * 1000 -
          hours * 3600 * 1000 -
          minutes * 60 * 1000) /
          1000
      );

    return {
      hours: hours,
      days: day,
      seconds: seconds,
      minutes: minutes,
    };
  }

  function setClock(selector, endTime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);
    updateClock();

    function getZero(number) {
      if (number > 0 && number < 10) {
        return "0" + number;
      } else {
        return number;
      }
    }

    function updateClock() {
      const time = getTime(endTime);
      days.innerHTML = getZero(time.days);
      hours.innerHTML = getZero(time.hours);
      minutes.innerHTML = getZero(time.minutes);
      seconds.innerHTML = getZero(time.seconds);
      if (time.total == 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (date);


/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");


function form(modalTimer) {
  const forms = document.querySelectorAll("form");

  const message = {
    loading: "img/form/spinner.svg",
    success: "Murojatingiz qabul qilindi",
    failure: "Error",
  };

  forms.forEach((item) => {
    bindpostData(item);
  });

  const postdata = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },

      body: data,
    });

    return await res.json();
  };

  function bindpostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto
      `;
      form.insertAdjacentElement("afterend", statusMessage);

      // const request = new XMLHttpRequest();
      // request.open("POST", "server.php");
      // request.setRequestHeader("Content-type", "application/json");
      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      const axiosJson = Object.fromEntries(formData.entries());

      postdata("http://localhost:3000/request", json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
          statusMessage.remove();
        })
        .finally(() => {
          form.reset();
        });

      // axiosPostData("http://localhost:3000/request", axiosJson)
      //   .then((data) => {
      //     console.log(data);
      //     showThanksModal(message.success);
      //     statusMessage.remove();
      //   })
      //   .catch(() => {
      //     showThanksModal(message.failure);
      //     statusMessage.remove();
      //   })
      //   .finally(() => {
      //     form.reset();
      //   });

      // function axiosPostData(url, data) {
      //   const res = axios.post(url, {
      //     body: data,
      //   });

      //   return res;
      // }

      // axios
      //   .post("http://localhost:3000/request", {
      //     body: axiosJson
      //   })
      //   .then((data) => {
      //     console.log(axiosJson);
      //     console.log(data);
      //     showThanksModal(message.success);
      //     statusMessage.remove();
      //   })
      //   .catch(() => {
      //     showThanksModal(message.failure);
      //     statusMessage.remove();
      //   })
      //   .finally(() => {
      //     form.reset();
      //   });

      // request.addEventListener("load", () => {
      //   if (request.status === 200) {
      //     console.log(request.response);
      //     showThanksModal(message.success);
      //     form.reset();
      //     statusMessage.remove();
      //   } else {
      //     showThanksModal(message.failure);
      //   }
      // });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(".modal", modalTimer)

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>×</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".modal");
    }, 4000);
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);


/***/ }),

/***/ "./js/modules/loader.js":
/*!******************************!*\
  !*** ./js/modules/loader.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function loader() {
  const loader = document.querySelector(".loader");
  setTimeout(function () {
    loader.style.opacity = 0;
    setTimeout(function () {
      loader.style.display = "none";
    }, 1500);
  }, 2000);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (loader);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modalTimer) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add("show");
  modal.classList.remove("hide");
  document.body.style.overflow = "visible";

  console.log(modalTimer);
  if(modalTimer) {
    clearInterval(modalTimer);
  }
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add("hide");
  modal.classList.remove("show");
  document.body.style.overflow = "";
}

function modal(triggerSelector, modalSelector, modalTimer) {
  const allModalBtn = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);

  allModalBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      openModal(modalSelector, modalTimer);
    });
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") === "") {
      closeModal(modalSelector);
    }
  });


  function showMyModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal(modalSelector, modalTimer);
      window.removeEventListener("scroll", showMyModalByScroll);
    }
  } 
  window.addEventListener("scroll", showMyModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);




/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs() {
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabContent = document.querySelectorAll(".tabcontent"),
    headerParents = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabContent.forEach((item) => {
      item.style.display = "none";
    });
    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabContent[i].style.display = "block";
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

  headerParents.addEventListener("click", (event) => {
    console.log(event);
    const target = event.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_accordion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/accordion */ "./js/modules/accordion.js");
/* harmony import */ var _modules_card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/card */ "./js/modules/card.js");
/* harmony import */ var _modules_date__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/date */ "./js/modules/date.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/loader */ "./js/modules/loader.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");












window.addEventListener("DOMContentLoaded", () => {
  const modalTimer = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_5__.openModal)(".modal", modalTimer), 50000);
  (0,_modules_loader__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_7__["default"])();
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_5__["default"])("[data-modal]", ".modal", modalTimer);
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])();
  (0,_modules_form__WEBPACK_IMPORTED_MODULE_3__["default"])(modalTimer);
  (0,_modules_date__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_card__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_modules_accordion__WEBPACK_IMPORTED_MODULE_0__["default"])();

  console.log("Assalomu aleeykum");
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map