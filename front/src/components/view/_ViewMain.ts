import CustomElement from '../utils/_createCustomElement';
import ControllerMain from '../controller/_ControllerMain';
import { stringArrayObject } from '../typingTS/_type';
import { IitemDATA} from '../typingTS/_interfaces'
import { createElement } from '../utils/utils';
import { MAIN } from '../utils/const';

// 1. Вынести в конструктор инпуты слайдеров и текст с количеством
// 2. Разделить методы для create еа отдельные категории
// 3. Отрисовать девок по данным this.startServerData
// 4. Отрисовать поиск, сортировку по умолчанию
// 5.1 Повесить слушатель на кнопку ADD CARD, который вызывает метод this.addCardInBasket(условно, покеа пустой)
// 5.2 Повесить слушатель на всю карточку, который вызывает this.showPageProduct(условно, покеа пустой), туда он передаст свой e.target, а this.showPageProduct вызоввет this._controller.showProduct(e.target)
// 6. Вынести в конструктор кнопку ADD и Всю карточку !!! КНОПКУ АДД НЕ ВЫНЕСТИ

class ViewMain {
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
  viewBlock: HTMLElement;
  viewList: HTMLElement;
  cardList: HTMLElement;
  customElement: CustomElement;
  _controller: ControllerMain;
  startCategoryData: stringArrayObject;
  startBrandData: stringArrayObject;
  startPriceOfFILTER: number[];
  startStockOfFILTER: number[];
  startServerData: IitemDATA[];

  constructor() {
    this._controller = new ControllerMain();

    this.startCategoryData = this._controller.startCategoryData;
    this.startBrandData = this._controller.startBrandData;
    this.startPriceOfFILTER = this._controller.startPriceOfFILTER;
    this.startStockOfFILTER = this._controller.startStockOfFILTER;
    this.startServerData = this._controller.startServerData;

    this.customElement = new CustomElement();

    this.buttonReset = this.customElement.createElement('button', { className: 'stock__reset _btn', textContent: 'Reset Filter'}); // button Reset
    this.buttonCopy = this.customElement.createElement('button', { className: 'stock__copy _btn', textContent: 'Copy Link'}); // button Copy
    this.filterCategoryMain = this.customElement.createElement('div', { className: 'filter__item-container category__container filter__item-container-scroll'}); // Category
    this.filterBrandMain = this.customElement.createElement('div', { className: 'filter__item-container brand__container filter__item-container-scroll'}); // Brand
    //------Price------//
    this.itemPriceNumberFrom = this.customElement.createElement('div', { className: 'item-price__from'}); // Price Text Min
    this.itemPriceNumberTo = this.customElement.createElement('div', { className: 'item-price__to'}); // Price Text Max
    this.itemPriceInputOne = this.customElement.createElement('input', { type: 'range', step: '1', id:'slider1'}); // Price Input One
    this.itemPriceInputTwo = this.customElement.createElement('input', { type: 'range', step: '1', id:'slider2'}); // Price Input Two
    //------Stock------//
    this.itemStockNumberFrom = this.customElement.createElement('div', { className: 'item-stock-slider__from'}); // Stock Text Min
    this.itemStockNumberTo = this.customElement.createElement('div', { className: 'item-stock-slider__to'}); // Stock Text Max
    this.itemStockInputOne = this.customElement.createElement('input', { type: 'range', step: '1', id:'slider3'}); // Stock Input One
    this.itemStockInputTwo = this.customElement.createElement('input', { type: 'range', step: '1', id:'slider4'}); // Stock Input Two
    //------Right Top------//
    this.viewSort = this.customElement.createElement('input', { className: 'view__sort', name: 'sort', placeholder: 'Sorting'}); // Сортировка
    this.findCount = this.customElement.createElement('span', { className: 'view__find-count-span', textContent: '100' }); // Число найденных совпадений
    this.viewSearch = this.customElement.createElement('input', { className: 'view__search', type:'search', placeholder: 'Search product' }); // Поиск
    this.viewBlock = this.customElement.createElement('div', { className: 'visible__item viewBlock'}); // Вид для блочной модели
    this.viewList = this.customElement.createElement('div', { className: 'visible__item viewList'}); // Вид для строчной модели
    //------Right Bottom------//
    this.cardList = this.customElement.createElement('div', { className: 'right__list cardlist'}); // Контейнер с карточками

    this.create();
  }

  create() {
    // Создание основной секции
    const pageMain = this.customElement.createElement('div', { className: 'page-main-one _main-container'});
    const mainOne = this.customElement.createElement('section', { className: 'main-one _container'});
    this.customElement.addChildren(pageMain,[mainOne]);

    // Создание ЛЕВОЙ СЕКЦИИ!!!
    const mainLeft = this.customElement.createElement('div', { className: 'main-one__left filter'});
    this.customElement.addChildren(mainOne,[mainLeft]);

    // Создание кнопок
    const containerButtons = this.customElement.createElement('div', { className: 'filter__stock stock'});
    this.customElement.addChildren(mainLeft,[containerButtons]);
    this.customElement.addChildren(containerButtons,[this.buttonReset, this.buttonCopy]);

    //Добавление Category
    this.customElement.addChildren(mainLeft,[this.createCategoryBlock()]);

    // Добавление Brand
    this.customElement.addChildren(mainLeft,[this.createBrandBlock()]);

    // Создание Price
    this.customElement.addChildren(mainLeft,[this.createPriceBlock()]);

    // Создание Stock
    this.customElement.addChildren(mainLeft,[this.createStockBlock()]);


    // Создание ПРАВОЙ ВЕРХНЕЙ СЕКЦИИ!!!
    const mainRight = this.customElement.createElement('div', { className: 'main-one__right right'});
    this.customElement.addChildren(mainOne,[mainRight]);

    // Создание верхней правой секции (поиск, сортировка, количество, вид карточек)
    const rightView = this.customElement.createElement('div', { className: 'right__view view'});
    this.customElement.addChildren(mainRight,[rightView]);

    // Сортировка
    this.viewSort.setAttribute('list','sorting');
    const dataListSort = this.customElement.createElement('datalist', { id: "sorting"});
    const optionSortABC = this.customElement.createElement('option', { value: "SortABC"});
    const optionSortPrice = this.customElement.createElement('option', { value: "SortPrice"});
    const optionSortRating = this.customElement.createElement('option', { value: "SortRating"});
    this.customElement.addChildren(dataListSort,[optionSortABC, optionSortPrice, optionSortRating]);

    //Число найденных товров
    const viewFindCount = this.customElement.createElement('p', { className: 'view__find-count', textContent: 'Found:'});
    this.customElement.addChildren(viewFindCount,[this.findCount]);

    //Вид карточек
    const viewVisible = this.customElement.createElement('div', { className: 'view__visible visible'});
    this.customElement.addChildren(viewVisible,[this.viewBlock, this.viewList]);

    // Добавление в правый вернхнюю правую секцию
    this.customElement.addChildren(rightView,[this.viewSort, viewFindCount, this.viewSearch, viewVisible]);

    // Создание ПРАВОЙ НИЖНЕЙ СЕКЦИИ!!!
    this.customElement.addChildren(this.cardList,[...this.createItemCard()]);
    this.customElement.addChildren(mainRight,[this.cardList]);
    // Добавление всего в основной main
    this.customElement.addChildren(MAIN,[pageMain]);
  }

  // Создание Category
  createCategoryBlock(dataFilterCategory: stringArrayObject = this.startCategoryData):HTMLElement {
    const filterCategory = this.customElement.createElement('div', { className: 'filter__item filter__category category filter__item-scroll'});
    const filterCategoryItemName = this.customElement.createElement('h3', { className: 'filter__item-name category__name', textContent: 'Category'});
    this.customElement.addChildren(filterCategory,[filterCategoryItemName, this.filterCategoryMain]);
    for (const key in dataFilterCategory) {
      const itemCategory = this.itemFilterCheckbox(key, dataFilterCategory[key]); // Функция получение разметки определенного чекбокса
      this.customElement.addChildren(this.filterCategoryMain,[itemCategory]);
    }

    return filterCategory
  }

  // Создание Brand
  createBrandBlock(dataFilterBrand: stringArrayObject = this.startBrandData):HTMLElement {
    const filterBrand = this.customElement.createElement('div', { className: 'filter__item filter__brand brand filter__item-scroll'});
    const filterBrandItemName = this.customElement.createElement('h3', { className: 'filter__item-name brand__name', textContent: 'Brand'});
    this.customElement.addChildren(filterBrand,[filterBrandItemName, this.filterBrandMain]);
    for (const key in dataFilterBrand) {
      const itemBrand = this.itemFilterCheckbox(key, dataFilterBrand[key]); // Функция получение разметки определенного чекбокса
      this.customElement.addChildren(this.filterBrandMain,[itemBrand]);
    }

    return filterBrand
  }

  // Создание Price
  createPriceBlock(dataFilterPrice: number[] = this.startPriceOfFILTER):HTMLElement {
    const filterPrice = this.customElement.createElement('div', { className: 'filter__item filter__price price'});
    const filterPriceItemName = this.customElement.createElement('h3', { className: 'filter__item-name price__name', textContent: 'Price'});
    const filterPriceContainer = this.customElement.createElement('div', { className: 'filter__item-container price__container'});
    this.customElement.addChildren(filterPrice,[filterPriceItemName, filterPriceContainer]);

    const itemPriceNumberContainer = this.customElement.createElement('div', { className: 'filter__item-data item-price'});
    const itemPriceInputContainer = this.customElement.createElement('div', { className: 'range-slider'});
    this.customElement.addChildren(filterPriceContainer,[itemPriceNumberContainer, itemPriceInputContainer]);

    this.itemPriceNumberFrom.textContent = `${dataFilterPrice[0]}`;
    this.itemPriceNumberTo.textContent = `${dataFilterPrice[1]}`;
    const itemPriceNumberMid = this.customElement.createElement('div', { textContent: '⟷'});
    this.customElement.addChildren(itemPriceNumberContainer,[this.itemPriceNumberFrom, itemPriceNumberMid, this.itemPriceNumberTo]);

    this.itemPriceInputOne.setAttribute('min', `${dataFilterPrice[0]}`);
    this.itemPriceInputOne.setAttribute('max', `${dataFilterPrice[1]}`);
    this.itemPriceInputOne.setAttribute('value', `${dataFilterPrice[0]}`);

    this.itemPriceInputTwo.setAttribute('min', `${dataFilterPrice[0]}`);
    this.itemPriceInputTwo.setAttribute('max', `${dataFilterPrice[1]}`);
    this.itemPriceInputTwo.setAttribute('value', `${dataFilterPrice[1]}`);

    this.customElement.addChildren(itemPriceInputContainer,[this.itemPriceInputOne, this.itemPriceInputTwo]);

    return filterPrice
  }

  // Создание Stock
  createStockBlock(dataFilterStock: number[] = this.startStockOfFILTER):HTMLElement {
    const filterStock = this.customElement.createElement('div', { className: 'filter__item filter__stock-slider stock-slider'});
    const filterStockItemName = this.customElement.createElement('h3', { className: 'filter__item-name stock-slider__name', textContent: 'Stock'});
    const filterStockContainer = this.customElement.createElement('div', { className: 'filter__item-container stock-slider__container'});
    this.customElement.addChildren(filterStock,[filterStockItemName, filterStockContainer]);

    const itemStockNumberContainer = this.customElement.createElement('div', { className: 'filter__item-data item-stock-slider'});
    const itemStockInputContainer = this.customElement.createElement('div', { className: 'range-slider'});
    this.customElement.addChildren(filterStockContainer,[itemStockNumberContainer, itemStockInputContainer]);

    this.itemStockNumberFrom.textContent = `${dataFilterStock[0]}`;
    this.itemStockNumberTo.textContent = `${dataFilterStock[1]}`;
    const itemStockNumberMid = this.customElement.createElement('div', { textContent: '⟷'});
    this.customElement.addChildren(itemStockNumberContainer,[this.itemStockNumberFrom, itemStockNumberMid, this.itemStockNumberTo]);

    this.itemStockInputOne.setAttribute('min', `${dataFilterStock[0]}`);
    this.itemStockInputOne.setAttribute('max', `${dataFilterStock[1]}`);
    this.itemStockInputOne.setAttribute('value', `${dataFilterStock[0]}`);

    this.itemStockInputTwo.setAttribute('min', `${dataFilterStock[0]}`);
    this.itemStockInputTwo.setAttribute('max', `${dataFilterStock[1]}`);
    this.itemStockInputTwo.setAttribute('value', `${dataFilterStock[1]}`);

    this.customElement.addChildren(itemStockInputContainer,[this.itemStockInputOne, this.itemStockInputTwo]);

    return filterStock
  }

  // Создание ItemCard (девок)
  createItemCard(dataServerItem:IitemDATA[] = this.startServerData) {
    const itemContainer: HTMLElement[] = [];

    for (const item of dataServerItem) {
      // Создание обертки карточки которую мы будем закидывать в контейнер
      const card = this.customElement.createElement('div', { className: 'cardlist__item card', id: `${item.id}`});
      card.addEventListener('click', this.showPageProduct); // ТУТ БАГ, ЧТО ПРИ КЛИКЕ НА АДД ВЫЗЫВАЕТСЯ ОТРИСОВКА КАРТОЧКИ

      //Заполнение самой карточки
      const cardName = this.customElement.createElement('h4', { className: 'card__name', textContent: `${item.title}`});
      const cardInfo = this.customElement.createElement('div', { className: 'card__info'});
      const cardButtons = this.customElement.createElement('div', { className: 'card__btn'});
      this.customElement.addChildren(card,[cardName, cardInfo, cardButtons]);

      //Заполнение cardButtons
      const buttonItemAdd = this.customElement.createElement('button', { className: '_btn', textContent: 'Add to card'}); // Кнопка добавления в корзину
      buttonItemAdd.addEventListener('click', this.addCardInBasket)
      const buttonItemDetails = this.customElement.createElement('button', { className: '_btn', textContent: 'Detais'});  // Кнопка просмотра товара

      this.customElement.addChildren(cardButtons,[buttonItemAdd, buttonItemDetails]);

      //Заполнение cardInfo
      const cardImg = this.customElement.createElement('img', { className: 'card__info-img', src: `${item.images[0]}`});
      const cardData = this.customElement.createElement('div', { className: 'card__data i-data'});
      this.customElement.addChildren(cardInfo,[cardImg, cardData]);

      //Заполнение cardData
      const cardDataСategory = this.customElement.createElement('p', { textContent: `Category: ${item.category}`});
      const cardDataBrand = this.customElement.createElement('p', { textContent: `Brand: ${item.brand}`});
      const cardDataPrice = this.customElement.createElement('p', { textContent: `Price: ${item.price}$`});
      const cardDataDiscount = this.customElement.createElement('p', { textContent: `Discount: ${item.discountPercentage}%`});
      const cardDataRating = this.customElement.createElement('p', { textContent: `Rating: ${item.rating}`});
      const cardDataStock = this.customElement.createElement('p', { textContent: `Stock: ${item.stock}`});

      this.customElement.addChildren(cardData,[cardDataСategory, cardDataBrand, cardDataPrice, cardDataDiscount, cardDataRating,cardDataStock]);

      itemContainer.push(card)
    }

    return itemContainer
  }

  mainListeners():void {
    this.filterCategoryMain.addEventListener('click', this.onMainFc);
    this.filterBrandMain.addEventListener('click', this.onMainFc);
  }

  itemFilterCheckbox(name: string, data: number[]): HTMLElement {
    const temp = `<div>
      <input type="checkbox" id=${name} ${!data[2] ? '' : 'checked'}>
      <label for=${name}>${name}</label>
      <div>(${data[0]}/${data[1]})</div>
    </div>`

    return createElement(temp)
  }


  private onMainFc = () => {
    console.log('123');
  }

  addCardInBasket() {
    console.log('Добавление карточки в корзину')
  }

  showPageProduct() {
    console.log('Открытие карточки товара')
  }

}

export default ViewMain