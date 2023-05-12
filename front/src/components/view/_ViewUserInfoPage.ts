import CustomElement from '../utils/_createCustomElement';

class ViewUserInfoPage {
    customElement: CustomElement

    constructor() {
        this.customElement = new CustomElement();
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