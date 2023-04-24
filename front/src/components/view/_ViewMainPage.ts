import CustomElement from '../utils/_createCustomElement';
// import ControllerMain from '../controller/_ControllerMain';
import { stringArrayObject } from '../typingTS/_type';
import { IitemDATA } from '../typingTS/_interfaces'
import { createElement } from '../utils/utils';
// import { MAIN } from '../utils/const';

class ViewMainPage {
  pageMain: HTMLElement;
  buttonReset: HTMLElement;
  buttonCopy: HTMLElement;
  itemPriceNumberFrom: HTMLElement;
  itemPriceNumberTo: HTMLElement;
  itemPriceInputOne: HTMLElement;
  itemPriceInputTwo: HTMLElement;
  itemStockNumberFrom: HTMLElement;
  itemStockNumberTo: HTMLElement;
  itemStockInputOne: HTMLElement;
  itemStockInputTwo: HTMLElement;
  filterCategoryMain: HTMLElement;
  filterBrandMain: HTMLElement;
  viewSort: HTMLElement;
  viewSearch: HTMLElement;
  findCount: HTMLElement;
  cardList: HTMLElement;
  filterPrice: HTMLElement;
  silderPrice: HTMLElement;
  silderStock: HTMLElement;
  customElement: CustomElement;
  startCategoryData: stringArrayObject;
  startBrandData: stringArrayObject;
  startPriceOfFILTER: number[];
  startStockOfFILTER: number[];
  startSortOfFILTER: string[];
  startServerData: IitemDATA[];
  EVENT: { [x: string]: Event }

  constructor(startServerData: IitemDATA[],
    startCategoryData: stringArrayObject,
    startBrandData: stringArrayObject,
    startPriceOfFILTER: number[],
    startStockOfFILTER: number[],
    startSortOfFILTER: string[]) {

    // console.log("200 = startSortOfFILTER КОНСТРУКТОР МАЙН ПАЙДЖ", startSortOfFILTER)

    this.startServerData = startServerData;
    this.startCategoryData = startCategoryData;
    this.startBrandData = startBrandData;
    this.startPriceOfFILTER = startPriceOfFILTER;
    this.startStockOfFILTER = startStockOfFILTER;
    this.startSortOfFILTER = startSortOfFILTER;

    this.customElement = new CustomElement();

    this.pageMain = this.customElement.createElement('div', { className: 'page-main-one _main-container' });

    this.buttonReset = this.customElement.createElement('button', { className: 'stock__reset _btn', textContent: 'Reset Filter' }); // button Reset
    this.buttonCopy = this.customElement.createElement('button', { className: 'stock__copy _btn', textContent: 'Copy Link' }); // button Copy

    this.filterCategoryMain = this.customElement.createElement('div', { className: 'filter__item filter__category category filter__item-scroll' }); // Category
    this.filterBrandMain = this.customElement.createElement('div', { className: 'filter__item filter__brand brand filter__item-scroll' }); // Brand
    //------Price------//

    this.filterPrice = this.customElement.createElement('div', { className: 'filter__item filter__price price' });

    this.silderPrice = this.customElement.createElement('div', { id: 'sliderPrice' }); // No Ui Slider Price
    this.silderStock = this.customElement.createElement('div', { id: 'sliderStock' }); // No Ui Slider Stock
    this.itemPriceNumberFrom = this.customElement.createElement('div', { className: 'item-price__from' }); // Price Text Min
    this.itemPriceNumberTo = this.customElement.createElement('div', { className: 'item-price__to' }); // Price Text Max
    this.itemPriceInputOne = this.customElement.createElement('input', { type: 'range', step: '1', id: 'slider1' }); // Price Input One
    this.itemPriceInputTwo = this.customElement.createElement('input', { type: 'range', step: '1', id: 'slider2' }); // Price Input Two
    //------Stock------//
    this.itemStockNumberFrom = this.customElement.createElement('div', { className: 'item-stock__from' }); // Stock Text Min
    this.itemStockNumberTo = this.customElement.createElement('div', { className: 'item-stock__to' }); // Stock Text Max
    this.itemStockInputOne = this.customElement.createElement('input', { type: 'range', step: '1', id: 'slider3' }); // Stock Input One
    this.itemStockInputTwo = this.customElement.createElement('input', { type: 'range', step: '1', id: 'slider4' }); // Stock Input Two
    //------Right Top------//
    this.viewSort = this.customElement.createElement('select', { className: 'view__sort', name: 'sort', placeholder: 'Sorting', id: "sorting" }) as HTMLSelectElement; // Сортировка
    this.findCount = this.customElement.createElement('span', { className: 'view__find-count-span', textContent: `${this.startServerData.length}` }); // Число найденных совпадений
    this.viewSearch = this.customElement.createElement('input', { className: 'view__search', type: 'search', placeholder: 'Search product' }); // Поиск
    //------Right Bottom------//
    this.cardList = this.customElement.createElement('div', { className: 'right__list cardlist' }); // Контейнер с карточками

    this.EVENT = {
      clickOnCategoryMain: new Event('clickOnCategoryMain', { bubbles: true }),
      clickOnBrandMain: new Event('clickOnBrandMain', { bubbles: true }),
      changeOnSearchMain: new Event('changeOnSearchMain', { bubbles: true }),
      choiceOnSortMain: new Event('choiceOnSortMain', { bubbles: true }),// в процессе 
      clickOnСardListMain: new Event('clickOnСardListMain', { bubbles: true }),// Клик на контейнере с Карточками
      clickOnProductAddInBascetMain: new Event('clickOnProductAddInBascetMain', { bubbles: true }),// Клик на кнопке добавить с Карточками
      clickOnbuttonResetMain: new Event('clickOnbuttonResetMain', { bubbles: true }),// Клик на кнопке сброса
    }
    this.listenersMainPage();
  }

  listenersMainPage() {
    this.filterCategoryMain.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.getAttribute('type') === "checkbox") {
        target.dispatchEvent(this.EVENT.clickOnCategoryMain)
      }
    })

    this.filterBrandMain.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.getAttribute('type') === "checkbox") {
        target.dispatchEvent(this.EVENT.clickOnBrandMain)
      }
    })

    this.viewSearch.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      if (target) {
        target.dispatchEvent(this.EVENT.changeOnSearchMain)
      }

      // this.viewSort.addEventListener('change', (e) => {
      //   console.log(this.viewSort)
      // })
    })

    this.cardList.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const card = target.closest('.cardlist__item')
      const addToCard = target.closest('._btn_add-to-card')
      // console.log('addToCard >',addToCard,'<')
      if (card && !addToCard) {
        card.dispatchEvent(this.EVENT.clickOnСardListMain)
        // console.log('card >',card,'<')      
      } else {
        addToCard?.dispatchEvent(this.EVENT.clickOnProductAddInBascetMain)
      }
    })

    // cлушаетль на кнопке копирования адресса
    this.buttonCopy.addEventListener('click', (e) => {
      this.copyPageUrl()
    })

    // cлушаетль на кнопке сброса ФИЛЬТРОВ
    this.buttonReset.addEventListener('click', (e) => {
      this.buttonReset.dispatchEvent(this.EVENT.clickOnbuttonResetMain)
    })
  }

  async copyPageUrl() {
    try {
      await navigator.clipboard.writeText(location.href);
      console.log('URL страницы скопирован в буфер обмена');
    } catch (err) {
      console.error('Не удалось скопировать: ', err);
    }
  }



  create(startServerData: IitemDATA[] = this.startServerData,
    startCategoryData: stringArrayObject = this.startCategoryData,
    startBrandData: stringArrayObject = this.startBrandData,
    startPriceOfFILTER: number[] = this.startPriceOfFILTER,
    startStockOfFILTER: number[] = this.startStockOfFILTER,
    startSortOfFILTER: string[]) {

    // console.log('700 = startSortOfFILTER из create МАИН ПАДЖЕ', startSortOfFILTER)
    // Создание основной секции
    // const pageMain = this.customElement.createElement('div', { className: 'page-main-one _main-container' });
    const mainOne = this.customElement.createElement('section', { className: 'main-one _container' });
    this.pageMain.innerHTML = ''
    this.viewSort.innerHTML = ''
    this.customElement.addChildren(this.pageMain, [mainOne]);

    // Создание ЛЕВОЙ СЕКЦИИ!!!
    const mainLeft = this.customElement.createElement('div', { className: 'main-one__left filter' });
    this.customElement.addChildren(mainOne, [mainLeft]);

    // Создание кнопок
    const containerButtons = this.customElement.createElement('div', { className: 'filter__stock stock' });
    this.customElement.addChildren(mainLeft, [containerButtons]);
    this.customElement.addChildren(containerButtons, [this.buttonReset, this.buttonCopy]);

    //Добавление Category
    // this.customElement.addChildren(this.filterCategoryMain, [...this.renderCategoryBlock(startCategoryData)]);

    // Добавление Brand 
    // this.customElement.addChildren(this.filterBrandMain, [...this.renderBrandBlock(startBrandData)]);

    // Добавление всего в левую часть
    this.customElement.addChildren(mainLeft, [this.filterCategoryMain, this.filterBrandMain]);

    // Создание Price
    this.customElement.addChildren(mainLeft, [this.renderPriceBlock(startPriceOfFILTER)]);

    // Создание Stock
    this.customElement.addChildren(mainLeft, [this.renderStockBlock(startStockOfFILTER)]);

    // Создание ПРАВОЙ ВЕРХНЕЙ СЕКЦИИ!!!
    const mainRight = this.customElement.createElement('div', { className: 'main-one__right right' });
    this.customElement.addChildren(mainOne, [mainRight]);

    // Создание верхней правой секции (поиск, сортировка, количество, вид карточек)
    const rightView = this.customElement.createElement('div', { className: 'right__view view' });
    this.customElement.addChildren(mainRight, [rightView]);

    // Сортировка
    this.viewSort.setAttribute('list', 'sorting');

    [{ value: "SortABC", textContent: "SortABC" },
    { value: "SortCBA", textContent: "SortCBA" },
    { value: "SortByPriceLow", textContent: "SortByPriceLow" },
    { value: "SortByPriceUp", textContent: "SortByPriceUp" },
    { value: "SortByRatingLow", textContent: "SortByRatingLow" },
    { value: "SortByRatingUp", textContent: "SortByRatingUp" }].forEach((atributs) => {
const option = this.customElement.createElement('option', atributs)
if ((option as HTMLOptionElement).value === startSortOfFILTER[0]) {
  (option as HTMLOptionElement).selected = true
}
this.customElement.addChildren(this.viewSort, [option])
    })



    //Число найденных товров
    const viewFindCount = this.customElement.createElement('p', { className: 'view__find-count', textContent: 'Found:' });
    this.findCount.textContent = `${startServerData.length}`
    this.customElement.addChildren(viewFindCount, [this.findCount]);


    // Создание ПРАВОЙ НИЖНЕЙ СЕКЦИИ!!!
    // this.customElement.addChildren(this.cardList, [...this.renderItemCard(startServerData)]);
    this.customElement.addChildren(mainRight, [this.cardList]);


    this.viewSort.addEventListener('change', (e) => {
      const target = e.target as HTMLSelectElement;
      target.dispatchEvent(this.EVENT.choiceOnSortMain)
      // console.log(target.value)
    })

    // this.listenersMain();

    return this.pageMain
  }

  // Создание Category
  renderCategoryBlock(dataFilterCategory: stringArrayObject = this.startCategoryData): HTMLElement[] {
    const itemContainer: HTMLElement[] = [];
    // this.filterCategoryMain.innerHTML = '';

    const filterCategoryItemName = this.customElement.createElement('h3', { className: 'filter__item-name category__name', textContent: 'Category' });
    const filterCategory = this.customElement.createElement('div', { className: 'filter__item-container category__container filter__item-container-scroll' });

    for (const key in dataFilterCategory) {
      const itemCategory = this.itemFilterCheckbox(key, dataFilterCategory[key]); // Функция получение разметки определенного чекбокса
      this.customElement.addChildren(filterCategory, [itemCategory]);
    }

    itemContainer.push(filterCategoryItemName, filterCategory)
    return itemContainer
  }

  // Создание Brand
  renderBrandBlock(dataFilterBrand: stringArrayObject = this.startBrandData): HTMLElement[] {
    const itemContainer: HTMLElement[] = [];
    // this.filterBrandMain.innerHTML = '';


    const filterBrandItemName = this.customElement.createElement('h3', { className: 'filter__item-name brand__name', textContent: 'Brand' });
    const filterBrand = this.customElement.createElement('div', { className: 'filter__item-container brand__container filter__item-container-scroll' });

    for (const key in dataFilterBrand) {
      const itemBrand = this.itemFilterCheckbox(key, dataFilterBrand[key]); // Функция получение разметки определенного чекбокса
      this.customElement.addChildren(filterBrand, [itemBrand]);
    }

    itemContainer.push(filterBrandItemName, filterBrand)
    return itemContainer
  }

  // Создание Price
  renderPriceBlock(dataFilterPrice: number[] = this.startPriceOfFILTER): HTMLElement {
    this.filterPrice.innerHTML=''
    // const filterPrice = this.customElement.createElement('div', { className: 'filter__item filter__price price' });
    const filterPriceItemName = this.customElement.createElement('h3', { className: 'filter__item-name price__name', textContent: 'Price' });
    const filterPriceContainer = this.customElement.createElement('div', { className: 'inputRange_container price__container' });
    this.customElement.addChildren(this.filterPrice, [filterPriceItemName, filterPriceContainer]);

    const itemPriceNumberContainer = this.customElement.createElement('div', { className: 'filter__item-data item-price' });
    this.customElement.addChildren(filterPriceContainer, [itemPriceNumberContainer, this.silderPrice]);

    this.itemPriceNumberFrom.textContent = `${dataFilterPrice[0]}`;
    this.itemPriceNumberTo.textContent = `${dataFilterPrice[1]}`;
    const itemPriceNumberMid = this.customElement.createElement('div', { textContent: '⟷' });
    this.customElement.addChildren(itemPriceNumberContainer, [this.itemPriceNumberFrom, itemPriceNumberMid, this.itemPriceNumberTo]);

    return this.filterPrice
  }

  // Создание Stock
  renderStockBlock(dataFilterStock: number[] = this.startStockOfFILTER): HTMLElement {
    const filterStock = this.customElement.createElement('div', { className: 'filter__item filter__stock-slider stock-slider' });
    const filterStockItemName = this.customElement.createElement('h3', { className: 'filter__item-name stock-slider__name', textContent: 'Stock' });
    const filterStockContainer = this.customElement.createElement('div', { className: 'inputRange_container stock-slider__container' });
    this.customElement.addChildren(filterStock, [filterStockItemName, filterStockContainer]);

    const itemStockNumberContainer = this.customElement.createElement('div', { className: 'filter__item-data item-stock-slider' });
    this.customElement.addChildren(filterStockContainer, [itemStockNumberContainer, this.silderStock]);

    this.itemStockNumberFrom.textContent = `${dataFilterStock[0]}`;
    this.itemStockNumberTo.textContent = `${dataFilterStock[1]}`;
    const itemStockNumberMid = this.customElement.createElement('div', { textContent: '⟷' });
    this.customElement.addChildren(itemStockNumberContainer, [this.itemStockNumberFrom, itemStockNumberMid, this.itemStockNumberTo]);

    return filterStock
  }


  // Создание ItemCard (девок)
  renderItemCard(dataServerItem: IitemDATA[] = this.startServerData) {
    const itemContainer: HTMLElement[] = [];

    for (const item of dataServerItem) {
      // Создание обертки карточки которую мы будем закидывать в контейнер
      const card = this.customElement.createElement('div', { className: 'cardlist__item card', id: `${item.id}` });

      // ТУТ БАГ, ЧТО ПРИ КЛИКЕ НА АДД ВЫЗЫВАЕТСЯ ОТРИСОВКА КАРТОЧКИ
      // card.addEventListener('click', this.showPageProduct);
      // ТУТ БАГ, ЧТО ПРИ КЛИКЕ НА АДД ВЫЗЫВАЕТСЯ ОТРИСОВКА КАРТОЧКИ

      //Заполнение самой карточки
      const cardName = this.customElement.createElement('h4', { className: 'card__name', textContent: `${item.title}` });
      const cardInfo = this.customElement.createElement('div', { className: 'card__info' });
      const cardButtons = this.customElement.createElement('div', { className: 'card__btn' });
      this.customElement.addChildren(card, [cardName, cardInfo, cardButtons]);

      //Заполнение cardButtons
      const buttonItemAdd = this.customElement.createElement('button', { className: '_btn _btn_add-to-card', id: `_btn_add-to-card|${item.id}`, textContent: 'Add to card' }); // Кнопка добавления в корзину
      // buttonItemAdd.addEventListener('click', this.addCardInBasket)
      const buttonItemDetails = this.customElement.createElement('button', { className: '_btn', textContent: 'Detais' });  // Кнопка просмотра товара

      this.customElement.addChildren(cardButtons, [buttonItemAdd, buttonItemDetails]);

      //Заполнение cardInfo
      const cardImg = this.customElement.createElement('img', { className: 'card__info-img', src: `${item.images[0]}` });
      const cardData = this.customElement.createElement('div', { className: 'card__data i-data' });
      this.customElement.addChildren(cardInfo, [cardImg, cardData]);

      //Заполнение cardData
      const cardDataСategory = this.customElement.createElement('p', { textContent: `Category: ${item.category}` });
      const cardDataBrand = this.customElement.createElement('p', { textContent: `Brand: ${item.brand}` });
      const cardDataPrice = this.customElement.createElement('p', { textContent: `Price: ${item.price}$` });
      const cardDataDiscount = this.customElement.createElement('p', { textContent: `Discount: ${item.discountPercentage}%` });
      const cardDataRating = this.customElement.createElement('p', { textContent: `Rating: ${item.rating}` });
      const cardDataStock = this.customElement.createElement('p', { textContent: `Stock: ${item.stock}` });

      this.customElement.addChildren(cardData, [cardDataСategory, cardDataBrand, cardDataPrice, cardDataDiscount, cardDataRating, cardDataStock]);

      itemContainer.push(card)
    }

    return itemContainer
  }

  // Присвоение велью Search
  updateSearchValue(search: string) {
    (this.viewSearch as HTMLInputElement).value = search
  }

  updateCardList(data: IitemDATA[] = this.startServerData) {
    this.cardList.innerHTML = ''
    this.findCount.textContent = `${data.length}`
    this.customElement.addChildren(this.cardList, [...this.renderItemCard(data)]);
  }

  updateCategoryBlock(data: stringArrayObject = this.startCategoryData) {
    this.filterCategoryMain.innerHTML = '';
    this.customElement.addChildren(this.filterCategoryMain, [...this.renderCategoryBlock(data)]);
  }

  updateBrandBlock(data: stringArrayObject = this.startBrandData) {
    this.filterBrandMain.innerHTML = ''
    this.customElement.addChildren(this.filterBrandMain, [...this.renderBrandBlock(data)]);
  }

  // mainListeners(): void {
  //   this.filterCategoryMain.addEventListener('click', this.onMainFc);
  //   this.filterBrandMain.addEventListener('click', this.onMainFc);
  // }

  itemFilterCheckbox(name: string, data: number[]): HTMLElement {
    const temp = `<div class = 'filterCheckbox'>
      <input type="checkbox" id='${name}' ${!data[2] ? '' : 'checked'}>
      <label for='${name}'>${name}</label>
      <div>(${data[0]}/${data[1]})</div>
    </div>`

    return createElement(temp)
  }


  // private onMainFc = () => {
  //   console.log('123');
  // }

  // addCardInBasket() {
  //   console.log('Добавление карточки в корзину')
  // }

  // showPageProduct() {
  //   console.log('Открытие карточки товара')
  // }

}

export default ViewMainPage