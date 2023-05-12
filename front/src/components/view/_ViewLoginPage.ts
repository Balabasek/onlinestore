import CustomElement from '../utils/_createCustomElement';

class ViewLoginPage {
    githubButton: HTMLElement;
    EVENT: { [x: string]: Event };
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
        this.githubButton = this.customElement.createElement('button', { className: 'product__pages-btnPrev product__pages-btn', textContent: 'Github' });
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

        this.EVENT = {
            clickGithubLogin: new Event('clickGithubLogin', { bubbles: true }),
        };
    }


    create() {
        //Header контейнер
        const userLoginContainer = this.customElement.createElement('section', {className: 'login__container'});

        const userInfoText = this.customElement.createElement('h2', {className: 'login__text', textContent: 'Time to choose an authorization method:' });

        const githubLogin = this.customElement.createElement('button', { className: 'githubbutton'});
        const containerColor = getComputedStyle(userLoginContainer).backgroundColor;
        githubLogin.style.color = containerColor;

        const githubTextUnder = this.customElement.createElement('p', {className: 'github__textunder', textContent: 'GitHub' });

        this.customElement.addChildren(githubLogin, [githubTextUnder]);

        githubLogin.addEventListener('click', () => {
            githubLogin.dispatchEvent(this.EVENT.clickGithubLogin);
        })

        this.customElement.addChildren(userLoginContainer, [userInfoText, githubLogin])

        return userLoginContainer
    }
}
export default ViewLoginPage;