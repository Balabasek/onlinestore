import CustomElement from '../utils/_createCustomElement';
import basket from '../../assets/img/png/basket.png';
import { HEADER } from '../utils/const';

class ViewHeader {
  headerTotalPrice: HTMLElement
  headerBasket: HTMLElement
  headerBasketCount: HTMLElement
  customElement: CustomElement

  constructor() {
    this.customElement = new CustomElement();
    this.headerTotalPrice = this.customElement.createElement('span', { className: 'header__total-span', textContent: '0'});
    this.headerBasket = this.customElement.createElement('div', { className: 'header__basket'});
    this.headerBasketCount = this.customElement.createElement('span', { className: 'header__basket-count', textContent: '0'});

    this.createHeader();
    this.headerListeners();
  }


  createHeader() {
    //Header контейнер
    const headerContainer = this.customElement.createElement('section', { className: 'header _container'});
    this.customElement.addChildren(HEADER,[headerContainer])

    // Основные секции header
    const headerLogo = this.customElement.createElement('a', { className: 'header__logo logo', href: '#'});
    const headerTotal = this.customElement.createElement('p', { className: 'header__total', textContent: 'Total: $'});
    this.customElement.addChildren(headerContainer,[headerLogo, headerTotal, this.headerBasket])

    // Заполнение headerLogo
    const logoTitle = this.customElement.createElement('h1', { className: 'logo__title', textContent: 'Online Store'});
    this.customElement.addChildren(headerLogo,[logoTitle]);
    // Заполнение headerTotal
    this.customElement.addChildren(headerTotal,[this.headerTotalPrice]);
    // Заполнение headerBasket
    const headerBasketImg = this.customElement.createElement('img', { className: 'logo__title', src: basket});
    this.customElement.addChildren(this.headerBasket,[headerBasketImg, this.headerBasketCount]);

    document.body.prepend(HEADER)
  }

  updateheaderBasketCount(count: number = 0) {
    this.headerBasketCount.textContent = count.toString()
  }

  headerListeners() {
    this.headerTotalPrice.addEventListener('click', this.onheaderBasketClick);
  }

  private onheaderBasketClick = () => {
    console.log(this.headerBasketCount.textContent)
  }

}

export default ViewHeader