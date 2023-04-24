// Типы интерфейсы
import { stringArrayObject } from '../typingTS/_type'
import { IitemDATA, IFilter, IBascetLocalStorage } from '../typingTS/_interfaces'

// Модель
import CreateFilterData from '../model/_ModelCreateFilterData'

// VIEWS

import ViewHeader from '../view/_ViewHeader';
import ViewMainPage from '../view/_ViewMainPage';
import ViewFooter from '../view/_ViewFooter';
import ViewItemCardPage from '../view/_ViewItemCardPage';
import ViewBasketPage from '../view/_ViewBasketPage';
import ViewNotFound from '../view/_ViewNotFoundPage';
import ViewValidation from '../view/_ViewValidation';

// Служебные программки
import CustomElement from '../utils/_createCustomElement';
import FormatURL from '../utils/_formatUrl';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';



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
  ViewNotFound: ViewNotFound;
  ViewValidation:ViewValidation;

  _formatURL: FormatURL;

  FILTER: IFilter;

  BODY: HTMLElement
  HEADER: HTMLElement
  MAIN: HTMLElement
  FOOTER: HTMLElement

  readonly startCategoryData: stringArrayObject;
  readonly startBrandData: stringArrayObject;
  readonly startServerData: IitemDATA[];

  readonly startPriceOfFILTER: number[];
  readonly startStockOfFILTER: number[];
  readonly startSearchOfFILTER: string[];

  protected priceOfFILTER: number[];
  protected stockOfFILTER: number[];
  readonly searchOfFILTER: string[];
  sortOfFILTER: string[];

  constructor() {

    const readlocalStorage = localStorage.getItem('BascetLocalStorage')
    if (readlocalStorage) {
      this.BascetLocalStorage = JSON.parse(readlocalStorage)
    } else {
      this.BascetLocalStorage = []
    }

    // console.log('this.BascetLocalStorage', this.BascetLocalStorage)

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

    this.ViewMainPAGE = new ViewMainPage(this.startServerData,
      this.startCategoryData,
      this.startBrandData,
      this.startPriceOfFILTER,
      this.startStockOfFILTER,
      this.sortOfFILTER);
    this.ViewItemCardPAGE = new ViewItemCardPage(this.startServerData[0]);
    this.ViewBASKETPAGE = new ViewBasketPage(this.startServerData)

    this.ListenersController()

    this.routes = {
      '/page404': {
        name: 'Page not found',
        routesPage: this.pageNotFound.bind(this)
      },
      '/product': {
        name: 'Product details',
        routesPage: this.renderItemCardPAGEFromRouter.bind(this)
      },
      '/basket': {
        name: 'Backet',
        routesPage: this.renderBacket.bind(this)
      },
      '/validation': {
        name: 'Validation',
        routesPage: this.renderValidation.bind(this)
      },
      '/': {
        name: 'Home',
        routesPage: this.renderMainPageFromRouter.bind(this)
      },
    };

  }

  // Конец конструктора

  // МЕТОД добавления и удаления  ПО ID из КОРЗИНЫ
  updateBascetLocalStorage(id: number, key: boolean = true): IBascetLocalStorage[] {
    const index = this.BascetLocalStorage.findIndex((el, index) => {
      return el.id === id
    })
    if (index === -1) {
      this.BascetLocalStorage.push(this.convertIDtoBascetObject(id))
    } else if (index !== -1 && key) {
      this.BascetLocalStorage.splice(index, 1);
    }
    localStorage.setItem('BascetLocalStorage', JSON.stringify(this.BascetLocalStorage))
    return this.BascetLocalStorage
  }

  // МЕТОД возврата ОБЪЕКТА ПО ID для КОРЗИНЫ
  convertIDtoBascetObject(id: number): IBascetLocalStorage {
    return {
      id: id,
      price: this.MODEL.startServerData[id - 1].price,
      count: 1,
    }
  }

  init() {
    this.startRouteListenner();
    this.handleLocation();
    this.HEADER.append(this.ViewHEADER.create())
    this.FOOTER.append(this.ViewFOOTER.create())

    this.ViewHEADER.updateHeaderBasketCount(this.BascetLocalStorage.length)
    const summTotal = this.BascetLocalStorage.reduce((summ, el) => summ + el.price * el.count, 0)// возможно эти 2 надо вынести в отельный метод
    this.ViewHEADER.updateHeaderTotalPrice(summTotal)// возможно эти 2 надо вынести в отельный метод
  }

    // Рендер Validation страницы из роутера
  renderValidation(name: string){
    document.title = `Store - ${name}`;
    this.MAIN.innerHTML = '';
    this.MAIN.append(this.ViewValidation.create())
    this.updateBascetCountAndTotaPriseHeader()
  }

  // Рендер главной страницы из роутера
  renderMainPageFromRouter(name: string) {
    document.title = `Store - ${name}`;
    const search = new URLSearchParams(window.location.search);
    const filter = this._formatURL.createObjectFromURLSearchParams(search)
    // console.log('ИЗ ЛОВЛИ РОУТЕРА ФИЛЬТЕР С АДРЕСНОЙ СТРОКИ', filter)
    this.MODEL.setFILTER(filter)
    this.rerenderMainPageComponents()
  }

  // Рендер КОМПАНЕНТОВ главной страницы из роутера
  rerenderMainPageComponents() {
    if (this.MAIN.firstChild === this.ViewMainPAGE.pageMain) {
      // console.log('this.MAIN.firstChild первая ветка', this.MAIN.firstChild)
      // this.MAIN.append(this.ViewMainPAGE.create())
      this.viewMainPAGEupdate();
    } else {
      // console.log('this.MAIN.firstChild вторая ветка', this.MAIN.firstChild)
      this.MAIN.innerHTML = ''
      // console.log('this.MAIN.firstChild вторая ветка Обнулили', this.MAIN.firstChild)
      this.viewMainPAGEupdate()
      // console.log('300 =this.sortOfFILTER РЕНДЕР', this.sortOfFILTER)
      // console.log('400 =this.MODEL.FILTER РЕНДЕР', this.MODEL.FILTER)
      this.MAIN.append(this.ViewMainPAGE.create(this.MODEL.filtredData,
        this.MODEL.filtredCategoryData,
        this.MODEL.filtredBrandData,
        this.priceOfFILTER,
        this.stockOfFILTER,
        this.sortOfFILTER))
    }

    if (document.querySelector('.noUi-base') === null) {
      // console.log('this.MAIN.firstChild третья ветка', this.MAIN.firstChild)
      this.fnSliderPrice(); // Создание noUISlider на цену
      this.fnSliderStock(); // Создание noUISlider на количество 
      // const inputs = [this.ViewMainPAGE.itemPriceNumberFrom,  this.ViewMainPAGE.itemPriceNumberTo];

    } else {
      (this.ViewMainPAGE.silderPrice as noUiSlider.target).noUiSlider?.destroy();
      this.fnSliderPrice();
      (this.ViewMainPAGE.silderStock as noUiSlider.target).noUiSlider?.destroy();
      this.fnSliderStock()
      // this.ViewMainPAGE.itemPriceNumberFrom.textContent = '40'
      // this.ViewMainPAGE.itemPriceNumberTo.textContent = '50'
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
    this.ViewMainPAGE.updateCardList(this.MODEL.filtredData)
    this.ViewMainPAGE.updateBrandBlock(this.MODEL.filtredBrandData)
    this.ViewMainPAGE.updateCategoryBlock(this.MODEL.filtredCategoryData)
    this.ViewMainPAGE.updateSearchValue(this.MODEL.searchOfFILTER[0])
  }

  // Рендер главной страницы ПРОДУКТА из роутера
  renderItemCardPAGEFromRouter(name: string) {
    document.title = `Store - ${name}`;
    const search = new URLSearchParams(window.location.search);
    // console.log('search!!!!!!!!', this._formatURL.createFromURLSearchParams(search))
    const id = this._formatURL.createFromURLSearchParams(search).id
    // const filter = this._formatURL.createObjectFromURLSearchParams(search)
    // this.MODEL.setFILTER(filter)
    // this.rerenderMainPageComponents()
    this.MAIN.innerHTML = ''
    this.MAIN.append(this.ViewItemCardPAGE.create(this.MODEL.startServerData[Number(id) - 1]))
    this.updateBascetCountAndTotaPriseHeader()
  }

  // Рендер корзины
  renderBacket(name: string = 'Backet') {
    document.title = `Store - ${name}`;
    // const search = new URLSearchParams(window.location.search);
    // console.log('search!!!!!!!!', this._formatURL.createIDFromURLSearchParams(search))
    // const id = this._formatURL.createIDFromURLSearchParams(search).id
       
    // // Логика из корзины временно тут
    // const basketObject1 = {
    //   items: 5,
    //   pages: 2,
    // }
    // console.log('50 =basketObject1', basketObject1)
    //    const params: URLSearchParams = this._formatURL.createURLSearchParamsBasket(basketObject1)
    //        window.history.pushState({}, '', `/basket?${params}`)

    // // Логика из корзины временно тут

    const search = new URLSearchParams(window.location.search);
    // console.log('60 =window.location.search!!!!', window.location.search)
    // console.log('70 =search', search.toString())

    const basketObject = search.toString() ? this._formatURL.createFromURLSearchParams(search) : {
      items: 3,
      pages: 1,
    } 

    // console.log('100 =basketObject!!!!!!', basketObject)
    // const params: URLSearchParams = this._formatURL.createURLSearchParamsBasket(basketObject)
    // console.log('150 =params!!!', params.toString())
    // window.history.pushState({}, '', `/basket?${params}`)
    // console.log('300 =search!!!!!!!!', search)
    // const returnbasketObject = this._formatURL.createFromURLSearchParams(search)
    // console.log('400 = returnbasketObject!!!!!!!!', returnbasketObject)


    this.MAIN.innerHTML = ''
    this.MAIN.append(this.ViewBASKETPAGE.create(this.generateProductsForBascet(), basketObject)) // НЕ ДОРАБОТАНО нудно  пушить объект

    this.updateBascetCountAndTotaPriseHeader()
  }


  updateBascetFROMLocalStorage(){
      const readlocalStorage = localStorage.getItem('BascetLocalStorage')
  if (readlocalStorage) {
    this.BascetLocalStorage = JSON.parse(readlocalStorage)
  } else {
    this.BascetLocalStorage = []
  }
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
      // console.log('pushStateFilter ПЕРВАЯ ВЕТКА фильтрованный массив равен стартовому')
      window.history.replaceState({}, '', '/')
    } else {
      // console.log('pushStateFilter Вторая ВЕТКА фильтрованный массив НЕ равен стартовому')
      // console.log(`{window.location.pathname}`)
      window.history.pushState({}, '', `/?${params}`)
    }
  }

  updateTextContent() {
    this.MODEL.updateFILTER_Price_Stock()
    // console.log('!!!!!!!!!',this.MODEL._FILTERpriceTEXT, this.MODEL._FILTERstockTEXT)
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
      // this.MODEL.updateFILTER_Price_Stock()
      // // console.log('!!!!!!!!!',this.MODEL._FILTERpriceTEXT, this.MODEL._FILTERstockTEXT)
      // this.ViewMainPAGE.itemPriceNumberFrom.textContent = this.MODEL._FILTERpriceTEXT[0].toString()
      // this.ViewMainPAGE.itemPriceNumberTo.textContent = this.MODEL._FILTERpriceTEXT[1].toString()
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
      // console.log('500 = target.value', target.value)
      this.MODEL.setSortOfFILTER(target.value)
      // this.sortOfFILTER = this.MODEL.sortOfFILTER
      // console.log('ОБНОВИЛАСЬ ЛИ СОРТИРОВКА', this.sortOfFILTER)
      // console.log('ОБНОВИЛАСЬ ЛИ СОРТИРОВКА модель', this.MODEL.sortOfFILTER)
      this.rerenderMainPageComponents()
      this.pushStateFilter()
      this.updateTextContent()
    })

    // Клик по кнопке РЕСЕТ сброса фильтров из Мейна
    this.MAIN.addEventListener('clickOnbuttonResetMain', (e) => {
      this.MODEL.clearFILTER()
      this.rerenderMainPageComponents()
      this.pushStateFilter()

    })

    // Клик по корзине из Хедера и запуск страницы корзины
    this.BODY.addEventListener('clickOnBacket', (e) => {


      // const search = new URLSearchParams(window.location.search);
      // console.log('60 =window.location.search!!!!', window.location.search)
      // console.log('70 =search', search.toString())
  
      // const basketObject = search.toString() ? this._formatURL.createFromURLSearchParams(search) : {
      const basketObject = {
        items: 3,
        pages: 1,
      } 
  
      console.log('100 =basketObject!!!!!!', basketObject)
      const params: URLSearchParams = this._formatURL.createURLSearchParamsBasket(basketObject)
      console.log('150 =params!!!', params.toString())
      window.history.pushState({}, '', `/basket?${params}`)
      // console.log('300 =search!!!!!!!!', search)
      // const returnbasketObject = this._formatURL.createFromURLSearchParams(search)
      // console.log('400 = returnbasketObject!!!!!!!!', returnbasketObject)

      this.renderBacket() 
      // this.MAIN.innerHTML = ''
      // // console.log('this.generateProductsForBascet()====',this.generateProductsForBascet())
      // this.MAIN.append(this.ViewBASKETPAGE.create(this.generateProductsForBascet())) // НЕ ДОРАБОТАНО ПОЛУЧАТЬ ДАННЫЕ ИЗ ЛОКАЛ СТОРИДЖ
      // window.history.pushState({}, '', '/basket')
    })


    // Клик по ЛОГОТИПУ из Хедера и запуск страницы main
    this.BODY.addEventListener('clickOnLogo', (e) => {
      // this.MAIN.innerHTML = ''
      // console.log('EEEEEEEEEEEEEEEEEEEEE', e)
      window.history.pushState({}, '', '/')
      this.rerenderMainPageComponents()
      this.pushStateFilter()
      this.updateBascetCountAndTotaPriseHeader()
    })



    // Клик по карточке для запуска страницы продукта из Мейна
    this.MAIN.addEventListener('clickOnСardListMain', (e) => {
      const target = e.target as HTMLElement;
      const id = target.id
      this.MAIN.innerHTML = ''
      this.MAIN.append(this.ViewItemCardPAGE.create(this.MODEL.startServerData[Number(id) - 1]))
      window.history.pushState({}, '', `/product?id=${id}`)
    })

    // Клик по карточке для добавления  продукта в КОРЗИНУ из Мейна
    this.MAIN.addEventListener('clickOnProductAddInBascetMain', (e) => {
      const target = e.target as HTMLElement;
      const id = +target.id.split('|')[1]
      const key: boolean = target.id.split('|')[0] === 'button-buy' ? false : true
      this.updateBascetLocalStorage(id, key)
      this.updateBascetCountAndTotaPriseHeader()

    })

    // Клик по карточке для запуска страниц Validation из Мейна
    this.MAIN.addEventListener('clickOnProductAddInBascetBuy', (e) => {
      window.history.pushState({}, '', `/validation`)
      this.MAIN.innerHTML = ''
      this.MAIN.append(this.ViewValidation.create())
    })
  }

updateBascetCountAndTotaPriseHeader(){
  this.updateBascetFROMLocalStorage()
  this.ViewHEADER.updateHeaderBasketCount(this.BascetLocalStorage.length)
  const summTotal = this.BascetLocalStorage.reduce((summ, el) => summ + el.price * el.count, 0)// возможно эти 2 надо вынести в отельный метод
  this.ViewHEADER.updateHeaderTotalPrice(summTotal)// возможно эти 2 надо вынести в отельный метод
}


  fnSliderPrice() {

    if (this.ViewMainPAGE.silderPrice) {
      noUiSlider.create(this.ViewMainPAGE.silderPrice, {
        start: [this.priceOfFILTER[0], this.priceOfFILTER[1]],
        tooltips: true,
        format: {
          to: function (value) {
              return Math.ceil(+value);
          },
          from: function (value) {
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

      (this.ViewMainPAGE.silderPrice as noUiSlider.target).noUiSlider?.on('set', (values, handle) => {
        const valueArray = values.map(el => Math.round(+el))
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
          to: function (value) {
              return Math.ceil(+value);
          },

          from: function (value) {
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

      (this.ViewMainPAGE.silderStock as noUiSlider.target).noUiSlider?.on('set', (values, handle) => {
        const valueArray = values.map(el => Math.round(+el))

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

// export function processOrder(time: number): Promise<void> {
//   return new Promise((res) => setTimeout(res, time));
// }