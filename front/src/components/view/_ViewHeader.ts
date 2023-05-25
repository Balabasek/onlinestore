import CustomElement from '../utils/_createCustomElement';
import basket from '../../assets/img/png/basket.png';
import login from '../../assets/img/png/login.png';

class ViewHeader {
  headerTotalPrice: HTMLElement
  headerBasket: HTMLElement
  headerBasketCount: HTMLElement
  headerLogin: HTMLElement
  popup: HTMLElement;
  textPopup: HTMLElement;
  logoTitle: HTMLElement
  customElement: CustomElement
  EVENT: { [x: string]: Event }

  constructor() {
    this.customElement = new CustomElement();
    this.headerTotalPrice = this.customElement.createElement('span', { className: 'header__total-span', textContent: '0' });
    this.headerLogin = this.customElement.createElement('div', { className: 'header__login' });
    this.headerBasket = this.customElement.createElement('div', { className: 'header__basket' });
    this.headerBasketCount = this.customElement.createElement('span', { className: 'header__basket-count', textContent: '0' });
    this.logoTitle = this.customElement.createElement('h1', { className: 'logo__title', textContent: 'Online Store' });

    this.popup = this.customElement.createElement('div', {className: 'popuper'});
    this.textPopup = this.customElement.createElement('p', { className: 'text__popup', textContent: 'unknown' });
    this.headerListeners();
    this.EVENT = {
      clickOnLogin: new Event('clickOnLogin', { bubbles: true }),
      clickOnBacket: new Event('clickOnBacket', { bubbles: true }),
      clickOnLogo: new Event('clickOnLogo', { bubbles: true })
    }
  }

  create() {
    //Header контейнер
    const headerContainer = this.customElement.createElement('section', { className: 'header _container' });

    // const textPopup = this.customElement.createElement('p', {className: 'text__popup', textContent: 'unknown'});

    // Основные секции header
    const headerLogo = this.customElement.createElement('a', { className: 'header__logo logo', href: '#' });
    const headerTotal = this.customElement.createElement('p', { className: 'header__total', textContent: 'Total: $' });
    this.customElement.addChildren(headerContainer, [headerLogo, headerTotal, this.headerBasket, this.headerLogin, this.popup])

    this.customElement.addChildren(this.popup, [this.textPopup]);
    // Заполнение headerLogo
    this.customElement.addChildren(headerLogo, [this.logoTitle]);
    // Заполнение headerTotal
    this.customElement.addChildren(headerTotal, [this.headerTotalPrice]);
    // Заполнение headerLogin
    const headerLoginImg = this.customElement.createElement('img', { src: login });
    this.headerLogin.innerHTML = ''
    this.customElement.addChildren(this.headerLogin, [headerLoginImg, this.headerBasketCount]);
    // Заполнение headerBasket
    const headerBasketImg = this.customElement.createElement('img', { src: basket });
    this.headerBasket.innerHTML = ''
    this.customElement.addChildren(this.headerBasket, [headerBasketImg, this.headerBasketCount]);
    return headerContainer
  }

  showPopup() {
    this.popup.classList.add('active');
  }

  hidePopup() {
    this.popup.classList.remove('active');
  }

  async setTextPopupGood(stringPromise: string | null) {
    this.textPopup.textContent = await stringPromise;
    this.popup.className = 'popuper'
    this.showPopup();
    await new Promise(resolve => setTimeout(resolve, 3000));
    this.hidePopup();
  }

  async setTextPopupBad(stringPromise: string | null) {
    this.textPopup.textContent = await stringPromise;
    this.popup.className = 'popuperbad'
    this.showPopup();
    await new Promise(resolve => setTimeout(resolve, 3000));
    this.hidePopup();
  }

  // фунция обновления счетчика на корзине
  updateHeaderBasketCount(count: number = 0) {
    this.headerBasketCount.textContent = count.toString()
  }
  // фунция обновления Суммы заказа 
  updateHeaderTotalPrice(count: number = 0) {
    this.headerTotalPrice.textContent = count.toString()
  }

  headerListeners() {
    this.headerLogin.addEventListener('click', () => {
      this.headerLogin.dispatchEvent(this.EVENT.clickOnLogin)
    })

    this.headerBasket.addEventListener('click', () => {
      this.headerBasket.dispatchEvent(this.EVENT.clickOnBacket)
    })

    this.logoTitle.addEventListener('click', (e) => {
      e.preventDefault()
      this.logoTitle.dispatchEvent(this.EVENT.clickOnLogo)
    })
  }


}

export default ViewHeader
