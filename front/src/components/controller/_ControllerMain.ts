// Типы интерфейсы
import { numberArrayObject } from '../typingTS/_type'
import { IitemDATA, IFilter, IBascetLocalStorage, IPromoList } from '../typingTS/_interfaces'

// Модель
import CreateFilterData from '../model/_ModelCreateFilterData'

// VIEWS
import ViewHeader from '../view/_ViewHeader';
import ViewMainPage from '../view/_ViewMainPage';
import ViewFooter from '../view/_ViewFooter';
import ViewItemCardPage from '../view/_ViewItemCardPage';
import ViewBasketPage from '../view/_ViewBasketPage';
import ViewNotFound from '../view/_ViewNotFoundPage';
import ViewNotBasket from '../view/_ViewNotBasketPage';
import ViewValidation from '../view/_ViewValidation';
import ViewLoginPage from '../view/_ViewLoginPage';
import ViewUserInfoPage from "../view/_ViewUserInfoPage";

// Служебные программки
import CustomElement from '../utils/_createCustomElement';
import FormatURL from '../utils/_formatUrl';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { getLocalStorageValue, getLocalStoragePromo } from '../utils/utils';

class ControllerMain {

  BascetLocalStorage: IBascetLocalStorage[]

  routes: {
    [key: string]: {
      name: string;
      routesPage: (x: string) => void;
    }
  };

  customElement: CustomElement

  MODEL: CreateFilterData;
  ViewHEADER: ViewHeader;
  ViewMainPAGE: ViewMainPage;
  ViewFOOTER: ViewFooter;
  ViewItemCardPAGE: ViewItemCardPage;
  ViewBASKETPAGE: ViewBasketPage;
  ViewUserInfoPage: ViewUserInfoPage;
  ViewLoginPage: ViewLoginPage;
  ViewNotFound: ViewNotFound;
  ViewNotBasket: ViewNotBasket;
  ViewValidation: ViewValidation;

  _formatURL: FormatURL;

  FILTER: IFilter;

  BODY: HTMLElement
  HEADER: HTMLElement
  MAIN: HTMLElement
  FOOTER: HTMLElement

  readonly startCategoryData: numberArrayObject;
  readonly startBrandData: numberArrayObject;
  readonly startServerData: IitemDATA[];

  readonly startPriceOfFILTER: number[];
  readonly startStockOfFILTER: number[];
  readonly startSearchOfFILTER: string[];

  protected priceOfFILTER: number[];
  protected stockOfFILTER: number[];
  readonly searchOfFILTER: string[];
  sortOfFILTER: string[];
  viewOfFILTER: string[];
  promocodeInfo: IPromoList;

  constructor() {

    this.BascetLocalStorage = getLocalStorageValue('BascetLocalStorage');

    // Значение для количества промокодов
    this.promocodeInfo = getLocalStoragePromo('listPromo');

    this.customElement = new CustomElement();
    this._formatURL = new FormatURL();


    this.BODY = document.body
    this.HEADER = this.customElement.createElement('header', { className: "page-header _main-container" });
    this.MAIN = this.customElement.createElement('main');
    this.FOOTER = this.customElement.createElement('footer', { className: "page-footer _main-container" });
    this.customElement.addChildren(this.BODY, [this.HEADER, this.MAIN, this.FOOTER])

    this.MODEL = new CreateFilterData();
    this.ViewHEADER = new ViewHeader();
    this.ViewFOOTER = new ViewFooter();
    this.ViewNotFound = new ViewNotFound();
    this.ViewNotBasket = new ViewNotBasket();
    this.ViewValidation = new ViewValidation();


    this.FILTER = this.MODEL.FILTER
    this.startCategoryData = this.MODEL.startCategoryData
    this.startBrandData = this.MODEL.startBrandData
    this.startServerData = this.MODEL.startServerData
    // Значиния для установки минимальных и максимальных значений инпута и строки поиска
    this.startPriceOfFILTER = this.MODEL.startPriceOfFILTER
    this.startStockOfFILTER = this.MODEL.startStockOfFILTER
    this.startSearchOfFILTER = this.MODEL.startSearchOfFILTER
    // Будущие значения для установки велью инпутов и строки поиска
    this.priceOfFILTER = this.MODEL.priceOfFILTER
    this.stockOfFILTER = this.MODEL.stockOfFILTER
    this.searchOfFILTER = this.MODEL.searchOfFILTER
    this.sortOfFILTER = this.MODEL.sortOfFILTER
    this.viewOfFILTER = this.MODEL.viewOfFILTER

    this.ViewMainPAGE = new ViewMainPage(this.startServerData,
        this.startCategoryData,
        this.startBrandData,
        this.startPriceOfFILTER,
        this.startStockOfFILTER,
        this.sortOfFILTER,
        this.viewOfFILTER
    );
    this.ViewItemCardPAGE = new ViewItemCardPage(this.startServerData[0]);
    this.ViewBASKETPAGE = new ViewBasketPage(this.startServerData);
    this.ViewLoginPage = new ViewLoginPage();
    this.ViewUserInfoPage = new ViewUserInfoPage();

    this.ListenersController()

    this.routes = {
      '/page404': {
        name: 'Page not found',
        routesPage: this.pageNotFound.bind(this)
      },
      '/nonbasket': {
        name: 'Page not basket',
        routesPage: this.pageNotBasket.bind(this)
      },
      '/product': {
        name: 'Product details',
        routesPage: this.renderItemCardPAGEFromRouter.bind(this)
      },
      '/basket': {
        name: 'Backet',
        routesPage: this.renderBacket.bind(this)
      },
      '/login': {
        name: 'Login',
        routesPage: this.renderLogin.bind(this)
      },
      '/userinfo': {
        name: 'userinfo',
        routesPage: this.renderUserInfo.bind(this)
      },
      '/validation': {
        name: 'Validation',
        routesPage: this.renderValidation.bind(this)
      },
      '/': {
        name: 'Home',
        routesPage: this.renderMainPageFromRouter.bind(this)
      },
      '/successAuthorization': {
        name: 'successAuthorization',
        routesPage: this.renderSuccessAuthorization.bind(this)
      },
    };

  }
  // Конец конструктора

  // МЕТОД добавления и удаления  ПО ID из КОРЗИНЫ
  updateBascetLocalStorage(id: number, key: boolean = true): IBascetLocalStorage[] {
    const index = this.BascetLocalStorage.findIndex((el) => {
      return el.id === id
    })
    if (index === -1) {
      this.BascetLocalStorage.push(this.convertIDtoBascetObject(id))
    } else if (index !== -1 && key) {
      this.BascetLocalStorage.splice(index, 1);
    }
    localStorage.setItem('BascetLocalStorage', JSON.stringify(this.BascetLocalStorage));
    localStorage.setItem('listPromo', JSON.stringify(this.promocodeInfo));
    return this.BascetLocalStorage
  }

  async updateBascetWithoutLocalStorage(id: number, key: boolean = true): Promise<IBascetLocalStorage[]> {
    const index = this.BascetLocalStorage.findIndex((el) => {
      return el.id === id
    })
    if (index === -1) {
      const requestBody = {
        id: id
      };
      console.log(requestBody);
      const settings = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      };
      const response = await fetch("http://localhost:8888/userService/addNewItem/" + localStorage.getItem('token'), settings);
      const answer = await response.text();
      if (!response.ok) {
        alert("Ошибка HTTP: " + response.status);
        this.ViewHEADER.setTextPopupBad(answer)
      }else if(answer.trim() === "Ошибка сервера!"){
        this.ViewHEADER.setTextPopupBad("Ошибка сервера!");
      }else{
        this.ViewHEADER.setTextPopupGood(answer);
      }
      this.BascetLocalStorage.push(this.convertIDtoBascetObject(id))
    } else if (index !== -1 && key) {
      const response = await fetch("http://localhost:8888/userService/deleteItem/" + localStorage.getItem('token') + "/" + id);
      if (!response.ok) {
        alert("Ошибка HTTP: " + response.status);
      }
      this.BascetLocalStorage.splice(index, 1);
    }
    return this.BascetLocalStorage
  }

  // МЕТОД возврата ОБЪЕКТА ПО ID для КОРЗИНЫ
  convertIDtoBascetObject(id: number): IBascetLocalStorage {
    return {
      id: id,
      price: this.MODEL.startServerData[id - 1].price,
      count: 1,
      total: this.MODEL.startServerData[id - 1].price,
      stock: this.MODEL.startServerData[id - 1].stock,
    }
  }

  init() {
    this.startRouteListenner();
    this.handleLocation();
    this.HEADER.append(this.ViewHEADER.create())
    this.FOOTER.append(this.ViewFOOTER.create())

    this.updateBascetCountAndTotaPriseHeader()
  }

  // Рендер Validation страницы из роутера
  renderValidation(name: string) {
    document.title = `Store - ${name}`;
    this.MAIN.innerHTML = '';
    this.MAIN.append(this.ViewValidation.create())
    this.updateBascetCountAndTotaPriseHeader()
  }

  // Рендер главной страницы из роутера
  async renderMainPageFromRouter(name: string) {
    document.title = `Store - ${name}`;
    const search = new URLSearchParams(window.location.search);
    const filter = this._formatURL.createObjectFromURLSearchParams(search)
    this.MODEL.setFILTER(filter)
    this.ViewItemCardPAGE.updateBascetFROMLocalStorage();
    await new Promise(resolve => setTimeout(resolve, 100));
    this.rerenderMainPageComponents()
  }

  // Рендер КОМПАНЕНТОВ главной страницы из роутера
  rerenderMainPageComponents() {
    if (this.MAIN.firstChild === this.ViewMainPAGE.pageMain) {
      this.viewMainPAGEupdate();
    } else {
      this.MAIN.innerHTML = ''
      this.viewMainPAGEupdate()
      this.MAIN.append(this.ViewMainPAGE.create(this.MODEL.filtredData,
          this.MODEL.filtredCategoryData,
          this.MODEL.filtredBrandData,
          this.priceOfFILTER,
          this.stockOfFILTER,
          this.sortOfFILTER,
          this.viewOfFILTER,
      ))
    }

    if (document.querySelector('.noUi-base') === null) {
      this.fnSliderPrice(); // Создание noUISlider на цену
      this.fnSliderStock(); // Создание noUISlider на количество

    } else {
      (this.ViewMainPAGE.silderPrice as noUiSlider.target).noUiSlider?.destroy();
      this.fnSliderPrice();
      (this.ViewMainPAGE.silderStock as noUiSlider.target).noUiSlider?.destroy();
      this.fnSliderStock()
    }
    this.updateTextContent()
    this.updateBascetCountAndTotaPriseHeader()
  }
  // Подфунция рендора Компанента главной страниц из роутера Мейна
  viewMainPAGEupdate() {
    this.MODEL.updateFiltredData() // Добавил сюда и отключил на элементах в модели
    this.sortOfFILTER = this.MODEL.sortOfFILTER
    this.priceOfFILTER = this.MODEL.priceOfFILTER
    this.stockOfFILTER = this.MODEL.stockOfFILTER
    this.viewOfFILTER = this.MODEL.viewOfFILTER
    this.ViewMainPAGE.updateCardList(this.MODEL.filtredData, this.viewOfFILTER)
    this.ViewMainPAGE.updateBrandBlock(this.MODEL.filtredBrandData)
    this.ViewMainPAGE.updateCategoryBlock(this.MODEL.filtredCategoryData)
    this.ViewMainPAGE.updateSearchValue(this.MODEL.searchOfFILTER[0])
  }

  // Рендер главной страницы ПРОДУКТА из роутера
  renderItemCardPAGEFromRouter(name: string) {
    document.title = `Store - ${name}`;
    const search = new URLSearchParams(window.location.search);
    const id = this._formatURL.createFromURLSearchParams<URLSearchParams>(search).id
    this.MAIN.innerHTML = ''
    this.MAIN.append(this.ViewItemCardPAGE.create(this.MODEL.startServerData[Number(id) - 1]))
    this.updateBascetCountAndTotaPriseHeader()
  }

  // Рендер корзины
  async renderBacket(name: string = 'Backet') {
    document.title = `Store - ${name}`;
    const search = new URLSearchParams(window.location.search);
    const basketObject = search.toString() ? this._formatURL.createFromURLSearchParams<URLSearchParams>(search) : {
      items: 3,
      pages: 1,
    }
    this.updateBascetFROMLocalStorage();
    await new Promise(resolve => setTimeout(resolve, 300));
    this.MAIN.innerHTML = '';
    this.MAIN.append(this.ViewBASKETPAGE.create(this.generateProductsForBascet(), basketObject)) // НЕ ДОРАБОТАНО нудно  пушить объект
    this.updateBascetCountAndTotaPriseHeader();
  }

  renderLogin(name: string = 'login') {
    document.title = `Store - ${name}`;
    this.MAIN.innerHTML = ''
    this.MAIN.append(this.ViewLoginPage.create())
    this.updateBascetCountAndTotaPriseHeader();
  }

  async renderUserInfo(name: string = 'userInfo') {
    document.title = `Store - ${name}`;
    const token = localStorage.getItem("token");
    this.MAIN.innerHTML = ''
    const response = await fetch("http://localhost:8888/sessionService/getUser/" + token);
    this.MAIN.append(this.ViewUserInfoPage.create(await response.text()));
    // window.history.pushState({}, '', `/userinfo`)
    this.updateBascetCountAndTotaPriseHeader();
  }

  async renderSuccessAuthorization(name: string = 'successAuthorization') {
    document.title = `Store - ${name}`;
    const searchParams = new URLSearchParams(new URL(window.location.href).search);
    //localStorage.setItem("token", <string>searchParams.get('code'))
    const response = await fetch("http://localhost:8888/login/github/callback?code=" + <string>searchParams.get('code'));
    localStorage.setItem("token", await response.text());
    document.location.href = "http://localhost:8080/userinfo";
  }


  async updateBascetFROMLocalStorage() {
    if (localStorage.getItem('token') == null) {
      this.BascetLocalStorage = getLocalStorageValue('BascetLocalStorage');
    } else {
      const response = await fetch("http://localhost:8888/userService/getUserBasket/" + localStorage.getItem("token"));
      const readlocalStorage = await response.json();
      this.BascetLocalStorage = readlocalStorage;
      console.log("second");
    }
  }

  updatePromoFROMLocalStorage() {
    this.promocodeInfo = getLocalStoragePromo('listPromo');
  }

  // Метод получения товаров в корзину по Списку из ЛОКАЛ СТОРИДЖ
  generateProductsForBascet(localData: IBascetLocalStorage[] = this.BascetLocalStorage): IitemDATA[] {
    this.updateBascetFROMLocalStorage()
    return this.startServerData.filter((el) => {
      for (let index = 0; index < localData.length; index++) {
        if (el.id === localData[index].id) return true
      }
    })
  }

  pageNotFound(name: string) {
    document.title = `Store - ${name}`;
    this.MAIN.innerHTML = ''
    this.MAIN.append(this.ViewNotFound.create())
    window.history.pushState({}, '', `/page404`)
    this.updateBascetCountAndTotaPriseHeader()
  }

  pageNotBasket(name: string) {
    document.title = `Store - ${name}`;
    this.MAIN.innerHTML = ''
    this.MAIN.append(this.ViewNotBasket.create())
    window.history.pushState({}, '', `/nonbasket`)
    this.updateBascetCountAndTotaPriseHeader()
  }

  // Главыный слушаетль на кнопках АДРЕССНОЙ СТРОКИ
  startRouteListenner() {
    window.onpopstate = (event: PopStateEvent) => {
      event.preventDefault()
      this.handleLocation()
    };
  }
  // Метод распределения направлений
  handleLocation() {
    const path = window.location.pathname;
    const route = this.routes[path] || this.routes['/page404'];
    route.routesPage(route.name);
  }

  // Запись в историю адрессной строки с событий МЕЙНА
  pushStateFilter(filter = this.MODEL.FILTER) {
    const params: URLSearchParams = this._formatURL.createURLSearchParams(filter)
    if (JSON.stringify(this.FILTER) === JSON.stringify(this.MODEL.startServerFILTER)) {
      window.history.replaceState({}, '', '/')
    } else {
      window.history.pushState({}, '', `/?${params}`)
    }
  }

  updateTextContent() {
    this.MODEL.updateFILTER_Price_Stock()
    this.ViewMainPAGE.itemPriceNumberFrom.textContent = this.MODEL._FILTERpriceTEXT[0].toString()
    this.ViewMainPAGE.itemPriceNumberTo.textContent = this.MODEL._FILTERpriceTEXT[1].toString()
    this.ViewMainPAGE.itemStockNumberFrom.textContent = this.MODEL._FILTERstockTEXT[0].toString()
    this.ViewMainPAGE.itemStockNumberTo.textContent = this.MODEL._FILTERstockTEXT[1].toString()
  }

  // СЛУШАТЕЛИ СОБЫТИЙ
  ListenersController() {

    // Ловля клика по Инпутам категорий из Мейна
    this.MAIN.addEventListener('clickOnCategoryMain', (e) => {
      const target = e.target as HTMLElement;
      this.MODEL.setFILTERCategory(target.id)
      this.rerenderMainPageComponents()
      this.pushStateFilter()
      this.updateTextContent()
    })
    // Ловля клика по Инпутам brend из Мейна
    this.MAIN.addEventListener('clickOnBrandMain', (e) => {
      const target = e.target as HTMLElement;
      this.MODEL.setFILTERBrand(target.id)
      this.rerenderMainPageComponents()
      this.pushStateFilter()
      this.updateTextContent()
    })

    // Ловля изменения инпута СЕРЧ
    this.MAIN.addEventListener('changeOnSearchMain', (e) => {
      const target = e.target as HTMLInputElement;

      this.MODEL.setSearchOfFILTER(target.value)
      this.rerenderMainPageComponents()
      this.pushStateFilter()
      this.updateTextContent()
    })

    // Ловля изменения СОРТИРОВКИ
    this.MAIN.addEventListener('choiceOnSortMain', (e) => {
      const target = e.target as HTMLSelectElement;
      this.MODEL.setSortOfFILTER(target.value)
      this.rerenderMainPageComponents()
      this.pushStateFilter()
      this.updateTextContent()
    })

    // Клик по кнопке РЕСЕТ сброса фильтров из Мейна
    this.MAIN.addEventListener('clickOnbuttonResetMain', () => {
      this.MODEL.clearFILTER()
      this.rerenderMainPageComponents()
      this.pushStateFilter()

    })

    // Клик по корзине из Хедера и запуск страницы корзины
    this.BODY.addEventListener('clickOnBacket', () => {
      const basketObject = {
        items: 3,
        pages: 1,
      }
      const params: URLSearchParams = this._formatURL.createURLSearchParamsBasket(basketObject)
      window.history.pushState({}, '', `/basket?${params}`)
      this.renderBacket()
    })

    this.BODY.addEventListener('clickOnLogin', async () => {
      const token = localStorage.getItem("token");
      if (token != null) {
        this.MAIN.innerHTML = ''
        document.location.href = "http://localhost:8080/userinfo";
      } else {
        this.MAIN.innerHTML = ''
        this.MAIN.append(this.ViewLoginPage.create());
        window.history.pushState({}, '', `/login`)
      }
    })


    // Клик по ЛОГОТИПУ из Хедера и запуск страницы main
    this.BODY.addEventListener('clickOnLogo', () => {
      window.history.pushState({}, '', '/')
      this.rerenderMainPageComponents()
      this.pushStateFilter()
      this.updateBascetCountAndTotaPriseHeader()
    })



    // Клик по карточке для запуска страницы продукта из Мейна
    this.MAIN.addEventListener('clickOnCardListMain', (e) => {
      const target = e.target as HTMLElement;
      const id = target.id
      this.MAIN.innerHTML = ''
      this.MAIN.append(this.ViewItemCardPAGE.create(this.MODEL.startServerData[Number(id) - 1]))
      window.history.pushState({}, '', `/product?id=${id}`)
    })

    // Клик по карточке для добавления продукта в КОРЗИНУ из Мейна
    this.MAIN.addEventListener('clickOnProductAddInBascetMain', async (e) => {
      const target = e.target as HTMLElement;
      const id = +target.id.split('|')[1];
      const key: boolean = target.id.split('|')[0] === 'button-buy' ? false : true;
      if (localStorage.getItem('token') == null) {
        this.updateBascetLocalStorage(id, key)
      } else {
        this.updateBascetWithoutLocalStorage(id, key);
      }
      this.updateBascetCountAndTotaPriseHeader()
    })

    this.MAIN.addEventListener('clickGithubLogin', async () => {
      const response = await fetch("http://localhost:8888/login/github");
      document.location.href = await response.text();
    })

    this.MAIN.addEventListener('clickLogout', async () => {
      const token = localStorage.getItem("token");
      await fetch("http://localhost:8888/sessionService/logout/" + token);
      localStorage.removeItem("token");
      document.location.href = "http://localhost:8080/login";
    })

    // Клик по карточке для добавления копии продукта из КОРЗИНЫ
    this.MAIN.addEventListener('clickOnProductPlus', async (e) => {
      const target = e.target as HTMLElement;
      const card = target.closest('.itemBasket');
      const cardId = Number(card?.id);

      // Обновим LS и значение когда плюсуем
      const oneLocalStorage = this.BascetLocalStorage.map((item) => {
        if (cardId === item.id) {
          if (item.stock > item.count) {
            item.count = item.count + 1;
          }
        }
        return item
      });
      if (localStorage.getItem('token') == null) {
        localStorage.setItem('BascetLocalStorage', JSON.stringify(oneLocalStorage));
      } else {
        const response = await fetch("http://localhost:8888/userService/updateItemCount/" + localStorage.getItem('token') + "/increase/" + cardId);
        if (!response.ok) {
          alert("Ошибка HTTP: " + response.status);
        }
      }
      this.updateBascetCountAndTotaPriseHeader();
    })

    // Клик по карточке для уменьшения количества товаров или удаления
    this.MAIN.addEventListener('clickOnProductMinus', async (e) => {
      const target = e.target as HTMLElement;
      const card = target.closest('.itemBasket');
      const cardId = Number(card?.id);

      // Обновим LS и значение когда минусуем
      const oneLocalStorage = this.BascetLocalStorage.map((item) => {
        if (item.id === cardId) {
          if (item.count >= 1) {
            item.count = item.count - 1;
          }
        }
        return item
      });

      if (localStorage.getItem('token') == null) {
        // Обновим LS путем исключения удаленных
        const twoLocalStorage = oneLocalStorage.filter((item) => item.count !== 0);
        localStorage.setItem('BascetLocalStorage', JSON.stringify(twoLocalStorage));
      } else {
        const response = await fetch("http://localhost:8888/userService/updateItemCount/" + localStorage.getItem('token') + "/decrease/" + cardId);
        if (!response.ok) {
          alert("Ошибка HTTP: " + response.status);
        }
      }
      this.updateBascetCountAndTotaPriseHeader();
    })

    // Клик по карточке для запуска страниц Validation из Мейна
    this.MAIN.addEventListener('clickOnProductAddInBascetBuy', () => {
      window.history.pushState({}, '', `/validation`)
      this.MAIN.innerHTML = ''
      this.MAIN.append(this.ViewValidation.create())
    });

    // Клик по кнопочке удаления промоика
    this.BODY.addEventListener('clickOnPromoAdd', (e) => this.updatePromoAdd(e));
    this.BODY.addEventListener('clickOnPromoRemove', (e) => this.updatePromoRemove(e));
  }

  updatePromoAdd(event: Event) {
    this.updatePromoFROMLocalStorage();
    const target = event.target as HTMLElement;
    const summaryInfo = target.closest('.summaryInfo');
    const currentCodeElement = summaryInfo?.querySelector('.summaryInfo__search');
    const currentCode = (currentCodeElement as HTMLInputElement).value;

    //Если введенный промик уже есть, то игнорим
    if (this.promocodeInfo.list.includes(currentCode)) return
    // Обновим данные по промокоду
    this.promocodeInfo.list.push(currentCode);
    this.promocodeInfo.count++
    localStorage.setItem('listPromo', JSON.stringify(this.promocodeInfo));

    this.updateBascetCountAndTotaPriseHeader();
  }

  updatePromoRemove(event: Event) {
    this.updatePromoFROMLocalStorage();
    const target = event.target as HTMLElement;
    const targetItem = target.closest('.promoItem');
    const targetCode = targetItem?.querySelector('.promoItem__text');

    //Изменил LS для отрисовки нового списка
    this.promocodeInfo.count--
    const newPromoList = this.promocodeInfo.list.filter(item => item !== targetCode?.textContent);
    this.promocodeInfo.list = [...newPromoList]

    localStorage.setItem('listPromo', JSON.stringify(this.promocodeInfo));

    this.updateBascetCountAndTotaPriseHeader();
  }

  async updateBascetCountAndTotaPriseHeader() {
    await new Promise(resolve => setTimeout(resolve, 200));
    this.updateBascetFROMLocalStorage();
    this.updatePromoFROMLocalStorage();

    const promoCount = Number(this.promocodeInfo.count);
    this.ViewHEADER.updateHeaderBasketCount(this.BascetLocalStorage.reduce((count, el) => count + el.count, 0));
    const summTotal = this.BascetLocalStorage.reduce((summ, el) => summ + el.price * el.count, 0); // возможно эти 2 надо вынести в отельный метод
    const summTotalNew = Math.round(summTotal * ((10 - promoCount) / 10)); // Новая цена на товар

    this.ViewHEADER.updateHeaderTotalPrice(summTotalNew)// возможно эти 2 надо вынести в отельный метод
    this.ViewBASKETPAGE.summaryInfoSpanTotal.textContent = summTotal.toString();
    this.ViewBASKETPAGE.summaryInfoSpanTotalNew.textContent = summTotalNew.toString();
    this.ViewBASKETPAGE.summaryInfoSpanTotalProducts.textContent = this.BascetLocalStorage.reduce((count, el) => count + el.count, 0).toString();
  }


  fnSliderPrice() {

    if (this.ViewMainPAGE.silderPrice) {
      noUiSlider.create(this.ViewMainPAGE.silderPrice, {
        start: [this.priceOfFILTER[0], this.priceOfFILTER[1]],
        tooltips: true,
        format: {
          to: function (value: string | number) {
            return Math.ceil(+value);
          },
          from: function (value: string | number) {
            return Math.ceil(+value);
          }
        },
        connect: true,
        step: 1,
        range: {
          'min': this.startPriceOfFILTER[0],
          'max': this.startPriceOfFILTER[1],
        },

      });

      const inputs = [this.ViewMainPAGE.itemPriceNumberFrom, this.ViewMainPAGE.itemPriceNumberTo];

      (this.ViewMainPAGE.silderPrice as noUiSlider.target).noUiSlider?.on('update',
          function (values: (string | number)[], handle: number): void {
            inputs[handle].textContent = String(Math.round(Number(values[handle])));
          });

      (this.ViewMainPAGE.silderPrice as noUiSlider.target).noUiSlider?.on('set', (values: (string | number)[]) => {
        const valueArray = values.map((el: string | number) => Math.round(+el))
        this.MODEL.setPriceOfFILTER(valueArray)
        this.rerenderMainPageComponents()
        this.pushStateFilter()
        this.MODEL.updateFILTER_Price_Stock()
        this.ViewMainPAGE.itemStockNumberFrom.textContent = this.MODEL._FILTERstockTEXT[0].toString()
        this.ViewMainPAGE.itemStockNumberTo.textContent = this.MODEL._FILTERstockTEXT[1].toString()
      });

    }
  }

  fnSliderStock() {

    if (this.ViewMainPAGE.silderStock) {
      noUiSlider.create(this.ViewMainPAGE.silderStock, {
        start: [this.stockOfFILTER[0], this.stockOfFILTER[1]],
        tooltips: true,
        format: {
          to: function (value: string | number) {
            return Math.ceil(+value);
          },

          from: function (value: string | number) {
            return Math.ceil(+value);
          }
        },
        connect: true,
        step: 1,
        range: {
          'min': this.startStockOfFILTER[0],
          'max': this.startStockOfFILTER[1],
        }
      });

      const inputs = [this.ViewMainPAGE.itemStockNumberFrom, this.ViewMainPAGE.itemStockNumberTo];

      (this.ViewMainPAGE.silderStock as noUiSlider.target).noUiSlider?.on('update',
          function (values: (string | number)[], handle: number): void {
            inputs[handle].textContent = String(Math.round(Number(values[handle])));

          });

      (this.ViewMainPAGE.silderStock as noUiSlider.target).noUiSlider?.on('set', (values: (string | number)[]) => {
        const valueArray = values.map((el: string | number) => Math.round(+el))

        this.MODEL.setStockOfFILTER(valueArray)
        this.rerenderMainPageComponents()
        this.pushStateFilter()
        this.MODEL.updateFILTER_Price_Stock()
        this.ViewMainPAGE.itemPriceNumberFrom.textContent = this.MODEL._FILTERpriceTEXT[0].toString()
        this.ViewMainPAGE.itemPriceNumberTo.textContent = this.MODEL._FILTERpriceTEXT[1].toString()
      });

    }
  }
}

export default ControllerMain