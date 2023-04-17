import ControllerMain from "../controller/_ControllerMain";
import { stringArrayObject } from '../typingTS/_type'
import Router from "../router";
import { FOOTER } from '../utils/const';

class ViewFooter {
    _controller: ControllerMain;
    _router: Router;
    root: HTMLElement;
    startCategoryData: stringArrayObject

    constructor() {
        this.root = document.body;
        this._controller = new ControllerMain();
        this.startCategoryData = this._controller.startCategoryData
        this._router = new Router()

        this._router.startRouteListenner()
        this._router.handleLocation()

        this.createFooter();
    }

    createFooter() {
        FOOTER.innerHTML = `<footer class="page-footer _main-container">
  <section class="footer _container">
        <div class="footer__item github">
            <div class="footer__link-container">
                <div class="footer__link-container-item">
                    <a href="https://github.com/Balabasek" class="footer__link footer__github"></a>
                    <p class="footer__author">Balabasek</p>
                </div>
                <div class="footer__link-container-item">
                    <a href="https://github.com/LjeDmitriy" class="footer__link footer__github"></a>
                    <p class="footer__author">LjeDmitriy</p>
                </div>
            </div>
        </div>
        <p class="footer__item date-relese">2023</p>
        <div class="footer__item sibsutis">
            <a href="https://sibsutis.ru/" class="footer__link footer__sibsutis"></a>
        </div>
  </section>
</footer>`

        FOOTER.onclick = () => { this._router.pushState('/product') }
    }

    createMain() {
        console.log("1")
    }

    init() {
        this.createFooter()
        // this._controller.router.startRouteListenner()

    }

}

export default ViewFooter