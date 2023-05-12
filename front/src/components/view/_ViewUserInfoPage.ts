import CustomElement from '../utils/_createCustomElement';

class ViewUserInfoPage {
    customElement: CustomElement
    nickname: HTMLElement
    EVENT: { [x: string]: Event };

    constructor() {
        this.customElement = new CustomElement();
        this.nickname = this.customElement.createElement('span', { className: 'userinfo__nickname', textContent: 'unknown' });

        this.EVENT = {
            clickLogout: new Event('clickLogout', { bubbles: true }),
        };
    }

    create(stringPromise: string) {

        const userInfoContainer = this.customElement.createElement('section', {className: 'userinfo__container'});

        const userInfoText = this.customElement.createElement('h2', {className: 'userinfo__text', textContent: 'Your login:' });
        const logout = this.customElement.createElement('button', { className: 'logout_btn', textContent: 'Logout' });

        logout.addEventListener('click', () => {
            logout.dispatchEvent(this.EVENT.clickLogout);
        })

        const userNicknameText = this.customElement.createElement('p', {className: 'userinfo__nickname' });
        this.setNickname(stringPromise)
        this.customElement.addChildren(userNicknameText, [this.nickname])


        this.customElement.addChildren(userInfoContainer, [userInfoText, userNicknameText, logout]);

        return userInfoContainer;
    }

    async setNickname(stringPromise: string) {
        this.nickname.textContent = await stringPromise;
    }
}
export default ViewUserInfoPage;