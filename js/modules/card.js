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

export default card;
