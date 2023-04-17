import CustomElement from '../utils/_createCustomElement';
import ControllerMain from '../controller/_ControllerMain';
import { stringArrayObject } from '../typingTS/_type';
import { IitemDATA} from '../typingTS/_interfaces'
import { itemFilterCheckbox } from '../utils/utils';
import { MAIN } from '../utils/const';

// 1. Вынести в конструктор инпуты слайдеров и текст с количеством
// 2. Разделить методы для create еа отдельные категории
// 3. Отрисовать девок по данным this.startServerData
// 4. Отрисовать поиск, сортировку по умолчанию
// 5.1 Повесить слушатель на кнопку ADD CARD, который вызывает метод this.addCardInBasket(условно, покеа пустой)
// 5.2 Повесить слушатель на всю карточку, который вызывает this.showPageProduct(условно, покеа пустой), туда он передаст свой e.target, а this.showPageProduct вызоввет this._controller.showProduct(e.target)
// 6. Вынести в конструктор кнопку ADD и Всю карточку

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

    this.create();
  }

  create() {
    // Создание основной секции
    const pageMain = this.customElement.createElement('div', { className: 'page-main-one _main-container'});
    const mainOne = this.customElement.createElement('div', { className: 'main-one _container'});
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

    // Добавление всего в основной main
    this.customElement.addChildren(MAIN,[pageMain]);
  }

  // Создание Category
  createCategoryBlock(dataFilterCategory: stringArrayObject = this.startCategoryData) {
    const filterCategory = this.customElement.createElement('div', { className: 'filter__item filter__category category filter__item-scroll'});
    const filterCategoryItemName = this.customElement.createElement('h3', { className: 'filter__item-name category__name', textContent: 'Category'});
    this.customElement.addChildren(filterCategory,[filterCategoryItemName, this.filterCategoryMain]);
    for (const key in dataFilterCategory) {
      const itemCategory = itemFilterCheckbox(key, dataFilterCategory[key]); // Функция получение разметки определенного чекбокса
      this.customElement.addChildren(this.filterCategoryMain,[itemCategory]);
    }

    return filterCategory
  }

  // Создание Brand
  createBrandBlock(dataFilterBrand: stringArrayObject = this.startBrandData) {
    const filterBrand = this.customElement.createElement('div', { className: 'filter__item filter__brand brand filter__item-scroll'});
    const filterBrandItemName = this.customElement.createElement('h3', { className: 'filter__item-name brand__name', textContent: 'Brand'});
    this.customElement.addChildren(filterBrand,[filterBrandItemName, this.filterBrandMain]);
    for (const key in dataFilterBrand) {
      const itemBrand = itemFilterCheckbox(key, dataFilterBrand[key]); // Функция получение разметки определенного чекбокса
      this.customElement.addChildren(this.filterBrandMain,[itemBrand]);
    }

    return filterBrand
  }

  // Создание Price
  createPriceBlock(dataFilterPrice: number[] = this.startPriceOfFILTER) {
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
  createStockBlock(dataFilterStock: number[] = this.startStockOfFILTER) {
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

  mainListeners() {
    this.filterCategoryMain.addEventListener('click', this.onMainFc);
    this.filterBrandMain.addEventListener('click', this.onMainFc);
  }

  private onMainFc = () => {
    console.log('123');
  }

}

export default ViewMain