import CustomElement from '../utils/_createCustomElement';

class ViewUserInfoPage {
    headerTotalPrice: HTMLElement
    headerBasket: HTMLElement
    headerBasketCount: HTMLElement
    headerLogin: HTMLElement
    logoTitle: HTMLElement
    customElement: CustomElement

    constructor() {
        this.customElement = new CustomElement();
        this.headerTotalPrice = this.customElement.createElement('span', {
            className: 'header__total-span',
            textContent: '0'
        });
        this.headerLogin = this.customElement.createElement('div', {className: 'header__login'});
        this.headerBasket = this.customElement.createElement('div', {className: 'header__basket'});
        this.headerBasketCount = this.customElement.createElement('span', {
            className: 'header__basket-count',
            textContent: '0'
        });
        this.logoTitle = this.customElement.createElement('h1', {
            className: 'logo__title',
            textContent: 'Online Store'
        });
    }

    create() {
        //Header контейнер
        const userInfoContainer = this.customElement.createElement('section', {className: 'userInfo _container'});

        const userInfoText = this.customElement.createElement('h2', {className: 'userinfo__login', textContent: 'Your login:' });

        this.customElement.addChildren(userInfoContainer, [userInfoText])

        return userInfoContainer
    }
}
export default ViewUserInfoPage;