import CustomElement from '../utils/_createCustomElement';
// import ControllerMain from '../controller/_ControllerMain';
// import { stringArrayObject } from '../typingTS/_type';
import { IitemDATA } from '../typingTS/_interfaces';
// import { createElement } from '../utils/utils';


class ViewBasketPage {
  customElement: CustomElement;
  // _controller: ControllerMain;

  pageMainBasket: HTMLElement;
  pagesButtonPrev: HTMLElement;
  pagesButtonNext: HTMLElement;
  pagesCurrent: HTMLElement;
  productList: HTMLElement;
  summaryInfo: HTMLElement;
  productItemsInputView: HTMLElement;
  EVENT: { [x: string]: Event };
  objectItemsPages: { [x: string]: number };
  serverData: IitemDATA[];
  summaryInfoDataButton: HTMLElement;
  numberPage: number;
  numberItem: number;
  maxPage: number;
  // startServerData: IitemDATA[];

  constructor(serverData: IitemDATA[], objectItemPage:{ [x: string]: number } = { items: 3, pages: 1} ) {
    // this._controller = new ControllerMain();
    this.customElement = new CustomElement();

    this.pageMainBasket = this.customElement.createElement('div', { className: 'page-main-basket _main-container' });
    this.summaryInfoDataButton = this.customElement.createElement('button', { className: 'card__btn-button _btn', textContent: 'Buy now' });

    this.productList = this.customElement.createElement('div', { className: 'product__list' }); // Лист карточек
    this.productItemsInputView = this.customElement.createElement('input', { className: 'product__items-inputView', type: 'text', value: '4' }); // Количество отображаемых на странице карточек товара
    this.pagesButtonPrev = this.customElement.createElement('button', { className: 'product__pages-btnPrev product__pages-btn', textContent: '-' }); // Кнопка странички ПРЕДЫДУЩАЯ
    this.pagesButtonNext = this.customElement.createElement('button', { className: 'product__pages-btnNext product__pages-btn', textContent: '+' }); // Кнопка странички СЛЕДУЮЩАЯ
    this.pagesCurrent = this.customElement.createElement('p', { className: 'product__pages-current', textContent: '2' }); // Лист карточек
    this.summaryInfo = this.customElement.createElement('div', { className: 'summary__info summaryInfo' }); // Итоговая информация

    this.EVENT = {
      // inputOnItemsVisible: new Event('inputOnItemsVisible', { bubbles: true }),
      clickOnProductAddInBascetBuy: new Event('clickOnProductAddInBascetBuy', { bubbles: true }),
    };

    this.serverData = [...serverData]; // Сюда будем перезаписывать данные
    this.objectItemsPages = { ...objectItemPage }; // Создадим копию нашего входящего объекта с инпутом и страничкой
    this.numberPage = this.objectItemsPages.pages;
    this.numberItem = this.objectItemsPages.items;
    this.maxPage = this.serverData.length / this.numberItem;

    this.listenersMain();
  }

  listenersMain() {
    this.productItemsInputView.addEventListener('input', (event) => this.changeNumberItems(event));
    this.pagesButtonPrev.addEventListener('click', (event) => this.changeNumberPage(event))
    this.pagesButtonNext.addEventListener('click', (event) => this.changeNumberPage(event))

    this.summaryInfoDataButton.addEventListener('click', (e) => {
      this.summaryInfoDataButton.dispatchEvent(this.EVENT.clickOnProductAddInBascetBuy)
    })
  }

  create(data: IitemDATA[], basketItem:{ [x: string]: number } = { items: 3, pages: 3}) {
    console.log('DATA КРЕАТЕ КОРЗИНЫ',data)
    console.log('basketItem КОРЗИНЫ',basketItem)

    this.numberPage = basketItem.pages;
    this.numberItem = basketItem.items;
    console.log('this.numberItem КОРЗИНЫ',this.numberItem)
    console.log('this.numberPage КОРЗИНЫ',this.numberPage)

    this.pageMainBasket.innerHTML = '';
    this.productList.innerHTML = '';
    this.summaryInfo.innerHTML = '';
    this.serverData = [...data]; // Запишем входящие данные, чтобы не потерять

    // Отрисовка контейнера (для попапа и секции)
    // const pageMainBasket = this.customElement.createElement('div', { className: 'page-main-basket _main-container' });
    const popupWrapper = this.customElement.createElement('div', { className: 'popup-wrapper' });
    const mainBasket = this.customElement.createElement('section', { className: 'main-basket _container' });
    this.customElement.addChildren(this.pageMainBasket, [popupWrapper, mainBasket]);

    // Отрисовка mainBasket
    const mainBasketProduct = this.customElement.createElement('div', { className: 'main-basket__product product' });
    const mainBasketSummary = this.customElement.createElement('div', { className: 'main-basket__product product' });
    this.customElement.addChildren(mainBasket, [mainBasketProduct, mainBasketSummary]);

    // Отрисовка mainBasketProduct
    const productTitle = this.customElement.createElement('div', { className: 'product__title' });
    this.customElement.addChildren(mainBasketProduct, [productTitle, this.productList]);

    // Отрисовка productTitle
    const productName = this.customElement.createElement('h3', { className: 'product__name', textContent: 'Product in Cart' });
    const productItemsView = this.customElement.createElement('div', { className: 'product__itemsView' });
    const productPages = this.customElement.createElement('div', { className: 'product__pages' });
    this.customElement.addChildren(productTitle, [productName, productItemsView, productPages]);

    // Отрисовка productItemsView
    const productItemsName = this.customElement.createElement('p', { className: 'product__items-name', textContent: 'Items:' });
    this.customElement.addChildren(productItemsView, [productItemsName, this.productItemsInputView]);

    // Отрисовка productPages
    const productItemsPages = this.customElement.createElement('p', { className: 'product__items-pages', textContent: 'Pages:' });
    this.customElement.addChildren(productPages, [productItemsPages, this.pagesButtonPrev, this.pagesCurrent, this.pagesButtonNext]);

    // Отрисовка Листа товаров корзины
    // this.customElement.addChildren(this.productList, [...this.renderProductCard(data)]);
    this.changeItemsForList();

    // Отрисовка mainBasketSummary
    const summaryName = this.customElement.createElement('h3', { className: 'summary__name', textContent: 'Summary' });
    this.customElement.addChildren(mainBasketSummary, [summaryName, this.summaryInfo]);

    // Отрисовка summaryInfo
    this.customElement.addChildren(this.summaryInfo, [...this.renderSummary()]);

    // const test = document.querySelector('main') as HTMLElement;
    // this.customElement.addChildren(test,[pageMainBasket]);
    return this.pageMainBasket
  }

  // Создание ItemCard корзины
  renderProductCard(dataServerItem: IitemDATA[]) {
    const itemContainer: HTMLElement[] = [];
    // const test: IitemDATA[] = dataServerItem.slice(0, 6)

    for (const item of dataServerItem) {
      // Обертка карточки
      const itemBasket = this.customElement.createElement('div', { className: 'product__itemBasket itemBasket' });

      // Создание itemBasket
      const itemNumberBasket = this.customElement.createElement('div', { className: 'itemBasket__numberBasket', textContent: '1' });
      const itemImageBasket = this.customElement.createElement('div', { className: 'infoBasket__image' });
      const itemDataBasket = this.customElement.createElement('div', { className: 'infoBasket__title basket-data' });
      const itemSummaryBasket = this.customElement.createElement('div', { className: 'itemBasket__summaryBasket summaryBasket' });
      this.customElement.addChildren(itemBasket, [itemNumberBasket, itemImageBasket, itemDataBasket, itemSummaryBasket]);

      // Создание itemImageBasket
      const itemImageBasketIMG = this.customElement.createElement('img', { className: 'infoBasket__image-img', src: `${item.images[0]}` });
      this.customElement.addChildren(itemImageBasket, [itemImageBasketIMG]);

      // Создание itemDataBasket
      const basketDataName = this.customElement.createElement('p', { textContent: `Name: ${item.title}` });
      const basketDataDescription = this.customElement.createElement('p', { textContent: `Description: ${item.description}` });
      const basketDataRating = this.customElement.createElement('p', { textContent: `Rating: ${item.rating}` });
      const basketDataDiscount = this.customElement.createElement('p', { textContent: `Discount: ${item.discountPercentage}%` });
      this.customElement.addChildren(itemDataBasket, [basketDataName, basketDataDescription, basketDataRating, basketDataDiscount]);

      // Создание itemSummaryBasket
      const basketDataStock = this.customElement.createElement('p', { className: 'basket-data__name', textContent: `Stock: ${item.stock}` });
      const itemDataCount = this.customElement.createElement('div', { className: 'basket-data__count' });
      const itemDataTotal = this.customElement.createElement('p', { className: 'basket-data__name', textContent: `Total: $${item.price}` });
      this.customElement.addChildren(itemSummaryBasket, [basketDataStock, itemDataCount, itemDataTotal]);

      // Создание itemDataCount
      const basketDataBtnMinus = this.customElement.createElement('button', { className: 'basket-data__count-btnMinus basket-data__count-btn', textContent: '-' });
      const itemDataCurrent = this.customElement.createElement('p', { className: 'basket-data__count-current', textContent: '9' });
      const basketDataBtnPlus = this.customElement.createElement('button', { className: 'basket-data__count-btnPlus basket-data__count-btn', textContent: '+' });
      this.customElement.addChildren(itemDataCount, [basketDataBtnMinus, itemDataCurrent, basketDataBtnPlus]);

      itemContainer.push(itemBasket)
    }

    return itemContainer
  }

  renderSummary() {
    const itemContainer: HTMLElement[] = [];

    const summaryInfoDataProducts = this.customElement.createElement('p', { className: 'summaryInfo-data__products', textContent: 'Products: 6' });
    const summaryInfoDataTotal = this.customElement.createElement('p', { className: 'summaryInfo__total', textContent: 'Total: $10.000' });
    const summaryInfoDataSearch = this.customElement.createElement('input', { className: 'summaryInfo__search', type: 'search', placeholder: 'Search promocode' });
    const summaryInfoDataProme = this.customElement.createElement('p', { className: 'summaryInfo__name', textContent: 'Test promo: Balabasek, LjeDmitr' });
    // const summaryInfoDataButton = this.customElement.createElement('button', { className: 'card__btn-button _btn', textContent: 'Buy now' });

    itemContainer.push(summaryInfoDataProducts, summaryInfoDataTotal, summaryInfoDataSearch, summaryInfoDataProme, this.summaryInfoDataButton)
    return itemContainer
  }

  changeItemsForList() {
    this.productList.innerHTML = '';
    const newListElement = this.serverData.slice((this.numberPage - 1) * this.numberItem, Number(this.numberItem) * this.numberPage); // Создадим новый массив из старого
    this.customElement.addChildren(this.productList, [...this.renderProductCard(newListElement)]); // Рендер массив

    this.pagesCurrent.textContent = String(this.numberPage);
    (this.productItemsInputView as HTMLInputElement).value = String(this.numberItem);
    console.log(this.numberItem)
    
    this.maxPage = Math.ceil(this.serverData.length / this.numberItem);
    if (this.numberPage > this.maxPage) {
      this.numberPage = this.maxPage;
      (this.productItemsInputView as HTMLInputElement).value = String(this.numberItem);
      this.changeItemsForList();
    }

    if (this.numberItem > this.serverData.length) {
      this.numberItem = this.serverData.length;
      this.changeItemsForList();
    }

  }

  changeNumberPage(event:Event) {
    const target = event.target as HTMLElement
    this.maxPage = Math.ceil(this.serverData.length / this.numberItem);

    if (this.numberPage < this.maxPage && this.numberPage >= 1) {
      if (target.classList.contains('product__pages-btnNext')) {
        this.numberPage += 1;
      }
    } 
    
    if (this.numberPage <= this.maxPage && this.numberPage > 1) {
      if (target.classList.contains('product__pages-btnPrev')) {
        this.numberPage -= 1;
      } 
    }
    
    this.changeItemsForList();
  }

  changeNumberItems(event:Event) {
    const target = event.target as HTMLInputElement
    if (target.value === '') { // Проверка на ввод пустого значения
      return 
    }

    this.numberItem = Number(target.value); // Перезапишем количество указанных карточек
    this.changeItemsForList();
  }

}

export default ViewBasketPage