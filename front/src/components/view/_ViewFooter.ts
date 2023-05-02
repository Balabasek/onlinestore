import { createElement } from '../utils/utils';

class ViewFooter {
  create() {
    const footer = `
  <section class="footer _container">
    <div class="footer__item github">
      <div class="footer__link-container">
        <div class="footer__link-container-item">
          <a href="https://github.com/Balabasek" class="footer__link footer__github"></a>
          <p class="footer__author">Balabasek</p>
        </div>
        <div class="footer__link-container-item">
          <a href="https://github.com/Ljedmitr" class="footer__link footer__github"></a>
          <p class="footer__author">Ljedmitr</p>
        </div>
      </div>
    </div>
    <p class="footer__item date-relese">2023</p>
    <div class="footer__item sibsutis">
      <a href="https://sibsutis.ru/" class="footer__link footer__sibsutis"></a>
    </div>
  </section>`
  return createElement(footer)
}

}

export default ViewFooter