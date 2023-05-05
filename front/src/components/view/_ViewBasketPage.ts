import CustomElement from '../utils/_createCustomElement';
import { IitemDATA } from '../typingTS/_interfaces';
import FormatURL from '../utils/_formatUrl';
import { IBascetLocalStorage, IPromoList } from '../typingTS/_interfaces';
import { createElement } from '../utils/utils';
import { numberObject } from '../typingTS/_type';


class ViewBasketPage {
  customElement: CustomElement;
  pageMainBasket: HTMLElement;
  pagesButtonPrev: HTMLElement;
  pagesButtonNext: HTMLElement;
  promoButtonAdd: HTMLElement;
  pagesCurrent: HTMLElement;
  productList: HTMLElement;
  promolistActive: HTMLElement;
  promoSearchInput: HTMLElement;
  summaryInfo: HTMLElement;
  productItemsInputView: HTMLElement;
  promolistActiveFather: HTMLElement;
  BascetLocalStorage: IBascetLocalStorage[];
  activePromoListArray: string[];
  currentPromo: string;
  promocodeInfo: IPromoList;

  summaryInfoSpanTotal: HTMLSpanElement;
  summaryInfoSpanTotalProducts: HTMLSpanElement;
  summaryInfoSpanTotalNew: HTMLSpanElement;
  summaryInfoDataTotal: HTMLSpanElement;
  summaryInfoDataTotalNew: HTMLSpanElement;

  EVENT: { [x: string]: Event };
  objectItemsPages: { [x: string]: number };
  serverData: IitemDATA[];
  summaryInfoDataButton: HTMLElement;
  maxPage: number;
  _formatURL: FormatURL;

  constructor(serverData: IitemDATA[], objectItemPage: numberObject = { items: 3, pages: 1 }) {
    this.customElement = new CustomElement();
    this._formatURL = new FormatURL();

    const readlocalStorage = localStorage.getItem('BascetLocalStorage')
    if (readlocalStorage) {
      this.BascetLocalStorage = JSON.parse(readlocalStorage)
      console.log(this.BascetLocalStorage);
    } else {
      this.BascetLocalStorage = []
    }

    // Значение для количества промокодов
    const readlocalStoragePromoCount = localStorage.getItem('listPromo')
    if (readlocalStoragePromoCount) {
      this.promocodeInfo = JSON.parse(readlocalStoragePromoCount);
    } else {
      this.promocodeInfo = {
        count: 0,
        list: []
      };
    }

    this.pageMainBasket = this.customElement.createElement('div', { className: 'page-main-basket _main-container' });
    this.summaryInfoDataButton = this.customElement.createElement('button', { className: 'card__btn-button _btn', textContent: 'Buy now' });

    this.productList = this.customElement.createElement('div', { className: 'product__list' }); // Лист карточек
    this.productItemsInputView = this.customElement.createElement('input', { className: 'product__items-inputView', type: 'text', value: '4' }); // Количество отображаемых на странице карточек товара
    this.pagesButtonPrev = this.customElement.createElement('button', { className: 'product__pages-btnPrev product__pages-btn', textContent: '-' }); // Кнопка странички ПРЕДЫДУЩАЯ
    this.pagesButtonNext = this.customElement.createElement('button', { className: 'product__pages-btnNext product__pages-btn', textContent: '+' }); // Кнопка странички СЛЕДУЮЩАЯ
    this.promoSearchInput = this.customElement.createElement('input', { className: 'summaryInfo__search', type: 'search', placeholder: 'Search promocode' });
    this.promoButtonAdd = this.customElement.createElement('button', { className: '_btn promo__div-btn', textContent: 'Add' }); // Кноппка применения промокода
    this.promolistActive = this.customElement.createElement('div', { className: 'promolist' });
    this.pagesCurrent = this.customElement.createElement('p', { className: 'product__pages-current', textContent: '2' }); // Лист карточек
    this.summaryInfo = this.customElement.createElement('div', { className: 'summary__info summaryInfo' }); // Итоговая информация
    this.promolistActiveFather = this.customElement.createElement('div', { className: 'promolist-father promolist__hide', textContent: 'Active promo' });

    this.summaryInfoSpanTotal = this.customElement.createElement('span', { className: 'summaryInfo__total_span', textContent: '0' }) as HTMLSpanElement;
    this.summaryInfoSpanTotalNew = this.customElement.createElement('span', { className: 'summaryInfo__total_spanNew', textContent: '0' }) as HTMLSpanElement;
    this.summaryInfoSpanTotalProducts = this.customElement.createElement('span', { className: 'summaryInfo__total-products_span', textContent: '0' }) as HTMLSpanElement;

    this.summaryInfoDataTotal = this.customElement.createElement('p', { className: 'summaryInfo__total total-old', textContent: 'Total: $ ' });
    this.summaryInfoDataTotalNew = this.customElement.createElement('p', { className: 'summaryInfo__total  total-new hide', textContent: 'New Total: $' });

    this.EVENT = {
      clickOnProductAddInBascetBuy: new Event('clickOnProductAddInBascetBuy', { bubbles: true }),
      clickOnProductPlus: new Event('clickOnProductPlus', { bubbles: true }),
      clickOnProductMinus: new Event('clickOnProductMinus', { bubbles: true }),
      clickOnPromoAdd: new Event('clickOnPromoAdd', { bubbles: true }),
      clickOnPromoRemove: new Event('clickOnPromoRemove', { bubbles: true }),
    };

    this.serverData = [...serverData]; // Сюда будем перезаписывать данные
    this.objectItemsPages = { ...objectItemPage }; // Создадим копию нашего входящего объекта с инпутом и страничкой
    this.activePromoListArray = []; // Сюда будем закидывать введенные промокоды
    this.currentPromo = ''; //Текущий промокод который ввел пользователь

    this.maxPage = this.serverData.length / this.objectItemsPages.items;

    this.listenersMain();
  }

  listenersMain() {
    this.productItemsInputView.addEventListener('input', (event) => this.changeNumberItems(event));
    this.pagesButtonPrev.addEventListener('click', (event) => this.changeNumberPage(event));
    this.pagesButtonNext.addEventListener('click', (event) => this.changeNumberPage(event));
    this.promoSearchInput.addEventListener('input', (event) => this.searchPromo(event));

    this.promoButtonAdd.addEventListener('click', () => {
      this.promoButtonAdd.dispatchEvent(this.EVENT.clickOnPromoAdd);
      this.changePromoForList();
    })

    this.summaryInfoDataButton.addEventListener('click', () => {
      this.summaryInfoDataButton.dispatchEvent(this.EVENT.clickOnProductAddInBascetBuy)
    });
  }

  create(data: IitemDATA[], basketItem: numberObject = { items: 3, pages: 1 }) {
    
    this.objectItemsPages = { ...basketItem };

    if (this.objectItemsPages.pages > 1) {
      this.objectItemsPages.pages = 1
    }

    if (!this.objectItemsPages.pages || !this.objectItemsPages.items) {
      this.objectItemsPages.items = 3
      this.objectItemsPages.pages = 1
    }

    this.pageMainBasket.innerHTML = '';
    this.productList.innerHTML = '';
    this.summaryInfo.innerHTML = '';
    this.serverData = [...data]; // Запишем входящие данные, чтобы не потерять

    // Отрисовка контейнера (для попапа и секции)
    if (this.serverData.length === 0) {
      const notFound = `
      <div class="page-main-NotFound _main-container">
        <section class="main-NotFound _container NotFound">
          <h3 class="NotFound__title">Basket is Empty</h3>
        </section>
      </div>`
      return createElement(notFound)
    }
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
    this.changeItemsForList();

    // Отрисовка mainBasketSummary
    const summaryName = this.customElement.createElement('h3', { className: 'summary__name', textContent: 'Summary' });
    this.customElement.addChildren(mainBasketSummary, [summaryName, this.summaryInfo]);

    // Отрисовка summaryInfo
    this.customElement.addChildren(this.summaryInfo, [...this.renderSummary()]);
    return this.pageMainBasket
  }

  // Создание ItemCard корзины
  renderProductCard(dataServerItem: IitemDATA[]) {
    const itemContainer: HTMLElement[] = [];

    // Проверим корзину на пустоту
    if (this.serverData.length === 0) {
      const main = document.querySelector('main') as HTMLElement;
      const notFound = `
      <div class="page-main-NotFound _main-container">
        <section class="main-NotFound _container NotFound">
          <h3 class="NotFound__title">Basket is Empty</h3>
        </section>
      </div>`
      createElement(notFound)
      return main.innerHTML = notFound;
    }

    for (const item of dataServerItem) {
      // Значения из localStorage
      this.updateBascetFROMLocalStorage()
      const count = this.BascetLocalStorage.find(element => element.id === item.id)?.count;
      const total = this.BascetLocalStorage.find(element => element.id === item.id)?.total;
      const numberItem = this.objectItemsPages.items * (this.objectItemsPages.pages - 1) + (dataServerItem.indexOf(item) + 1);

      // Обертка карточки
      const itemBasket = this.customElement.createElement('div', { className: 'product__itemBasket itemBasket', id: `${item.id}` });

      // Создание itemBasket
      const itemNumberBasket = this.customElement.createElement('div', { className: 'itemBasket__numberBasket', textContent: `${numberItem}` });
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
      const itemDataTotal = this.customElement.createElement('p', { className: 'basket-data__name basket-data__total', textContent: `Total: $${total}` });
      this.customElement.addChildren(itemSummaryBasket, [basketDataStock, itemDataCount, itemDataTotal]);

      // Создание itemDataCount
      const basketDataBtnMinus = this.customElement.createElement('button', { className: 'basket-data__count-btnMinus basket-data__count-btn', textContent: '-' });
      const itemDataCurrent = this.customElement.createElement('p', { className: 'basket-data__count-current', textContent: `${count}` });
      const basketDataBtnPlus = this.customElement.createElement('button', { className: 'basket-data__count-btnPlus basket-data__count-btn', textContent: '+' });

      // Навешиваем обработчики на + и - карточек
      basketDataBtnMinus.addEventListener('click', (e) => {
        basketDataBtnMinus.dispatchEvent(this.EVENT.clickOnProductMinus);
        this.countItemMinus(e);
      })
      basketDataBtnPlus.addEventListener('click', (e) => {
        basketDataBtnPlus.dispatchEvent(this.EVENT.clickOnProductPlus);
        this.countItemPlus(e);
      })

      this.customElement.addChildren(itemDataCount, [basketDataBtnMinus, itemDataCurrent, basketDataBtnPlus]);

      itemContainer.push(itemBasket)
    }

    return itemContainer
  }

  renderPromoList() {
    this.updatePromoFROMLocalStorage();
    const itemContainer: HTMLElement[] = [];
    this.promolistActive.innerHTML = '';


    // Проверка на пустой массив промокодов
    if (!this.promocodeInfo.list.length) {
      this.promolistActiveFather.classList.add('promolist__hide');
    } else {
      this.promolistActiveFather.classList.remove('promolist__hide');
    }

    for (let i = 0; i < this.promocodeInfo.list.length; i++) {
      const promoItem = this.customElement.createElement('div', { className: 'promoItem' });

      const promoItemText = this.customElement.createElement('p', { className: 'promoItem__text', textContent: `${this.promocodeInfo.list[i]}` });
      const promoItemSale = this.customElement.createElement('p', { className: 'promoItem__sale', textContent: 'Sale: 10%' });
      const promoItemButton = this.customElement.createElement('button', { className: 'promoItem__button _btn', textContent: 'drop' });

      promoItemButton.addEventListener('click', (event) => {
        promoItemButton.dispatchEvent(this.EVENT.clickOnPromoRemove);
        this.deletePromo(event);
      })

      this.customElement.addChildren(promoItem, [promoItemText, promoItemSale, promoItemButton]);
      itemContainer.push(promoItem)
    }

    this.showNewPrice();
    return itemContainer
  }

  renderSummary() {
    const itemContainer: HTMLElement[] = [];

    const summaryInfoDataProducts = this.customElement.createElement('p', { className: 'summaryInfo-data__products', textContent: 'Products: ' });
    this.customElement.addChildren(summaryInfoDataProducts, [this.summaryInfoSpanTotalProducts])

    this.customElement.addChildren(this.summaryInfoDataTotal, [this.summaryInfoSpanTotal]);
    this.customElement.addChildren(this.summaryInfoDataTotalNew, [this.summaryInfoSpanTotalNew]);
    const summaryInfoDataProme = this.customElement.createElement('p', { className: 'summaryInfo__name', textContent: 'Test promo: Balabasek, Ljedmitr' });

    // Чекнем на скидку и добавим нудные классы 
    this.checkNewPrice(this.summaryInfoDataTotal, this.summaryInfoDataTotalNew);

    //Div Promo Add
    const summaryInfoDataPromoAddDiv = this.customElement.createElement('div', { className: 'promoadd promoadd-hide' });
    const promoAddText = this.customElement.createElement('p', { className: 'promodadd-txt', textContent: 'Promo Balabasek - 10%' });
    this.customElement.addChildren(summaryInfoDataPromoAddDiv, [promoAddText, this.promoButtonAdd]);
    this.customElement.addChildren(this.promolistActiveFather, [this.promolistActive]);
    this.customElement.addChildren(this.promolistActive, [...this.renderPromoList()]); // Рендер массив примененных промокодов
    itemContainer.push(summaryInfoDataProducts, this.summaryInfoDataTotal, this.summaryInfoDataTotalNew, this.promolistActiveFather, this.promoSearchInput, summaryInfoDataProme, summaryInfoDataPromoAddDiv, this.summaryInfoDataButton)
    return itemContainer
  }

  changePromoForList() {
    this.hidePromo(); // Скроем окошко промика
    this.customElement.addChildren(this.promolistActive, [...this.renderPromoList()]); // Рендер массив примененных промокодов
  }

  changeItemsForList() {
    this.productList.innerHTML = '';
    console.log(this.objectItemsPages)

    const newListElement = this.serverData.slice((this.objectItemsPages.pages - 1) * this.objectItemsPages.items, Number(this.objectItemsPages.items) * this.objectItemsPages.pages); // Создадим новый массив из старого
    this.customElement.addChildren(this.productList, [...this.renderProductCard(newListElement)]); // Рендер массив

    // Обновляем данные, после изменения одним из методов
    this.pagesCurrent.textContent = String(this.objectItemsPages.pages);
    (this.productItemsInputView as HTMLInputElement).value = String(this.objectItemsPages.items);

    // Сравнение максимальной строки при перестроении отображаемых карточек, чтобы сбросилась, если максимум уменьшился
    this.maxPage = Math.ceil(this.serverData.length / this.objectItemsPages.items);
    if (this.objectItemsPages.pages > this.maxPage) {
      this.objectItemsPages.pages = this.maxPage;
      (this.productItemsInputView as HTMLInputElement).value = String(this.objectItemsPages.items);
      this.changeItemsForList();
    }

    // Сравнение введенных в инпут данных на число большее длины массива данных
    if (this.objectItemsPages.items > this.serverData.length) {
      this.objectItemsPages.items = this.serverData.length;
      this.changeItemsForList();
    }
  }

  // Пушим в историю адресной строки
  pushState() {
    const params: URLSearchParams = this._formatURL.createURLSearchParamsBasket(this.objectItemsPages);
    window.history.pushState({}, '', `/basket?${params}`)
  }

  changeNumberPage(event: Event) {
    const target = event.target as HTMLElement
    this.maxPage = Math.ceil(this.serverData.length / this.objectItemsPages.items);

    if (this.objectItemsPages.pages < this.maxPage && this.objectItemsPages.pages >= 1) {
      if (target.classList.contains('product__pages-btnNext')) {
        this.objectItemsPages.pages += 1;
        this.pushState()
      }
    }

    if (this.objectItemsPages.pages <= this.maxPage && this.objectItemsPages.pages > 1) {
      if (target.classList.contains('product__pages-btnPrev')) {
        this.objectItemsPages.pages -= 1;
        this.pushState()
      }
    }

    this.changeItemsForList();
  }

  searchPromo(event: Event) {
    const promocode = ['Balabasek', 'Ljedmitr'];
    const targetValue = (event.target as HTMLInputElement).value;
    // Завершим, если промокод не равен указанным
    if (this.promocodeInfo.list.includes(targetValue)) return
    if (promocode.includes(targetValue)) {
      this.showPromo(targetValue)
    } else {
      const fatherContainerPromo = document.querySelector('.promoadd') as HTMLElement;
      fatherContainerPromo.classList.add('promoadd-hide'); // Удалим скрытие блока
    }
  }

  showPromo(promo: string) {
    //Если его нет, то продолжим
    const fatherContainerPromo = document.querySelector('.promoadd') as HTMLElement;
    const promoText = fatherContainerPromo?.querySelector('.promodadd-txt') as HTMLElement;
    promoText.textContent = `Promo ${promo} - 10%`; // Заменим текст
    this.currentPromo = promo; // Занесем данный промокод как текущий активный
    fatherContainerPromo.classList.remove('promoadd-hide'); // Удалим скрытие блока
  }

  hidePromo() {
    const fatherContainerPromo = document.querySelector('.promoadd') as HTMLElement;
    const input = document.querySelector('.summaryInfo__search') as HTMLElement;
    (input as HTMLInputElement).value = ''; // Сотрем инпут
    this.currentPromo = ''; // Занесем данный промокод как текущий активный
    fatherContainerPromo.classList.add('promoadd-hide'); // Удалим скрытие блока
  }

  deletePromo(event: Event) {
    const target = event.target as HTMLElement;
    const containerPromo = target.closest('.promoItem');
    const promoName = containerPromo?.querySelector('.promoItem__text')?.textContent;

    // Обвновим массив активных промиков
    const newActivePromoList = this.activePromoListArray.filter(item => item !== promoName);
    this.activePromoListArray = [...newActivePromoList];

    //Запустим отрисовку нового
    this.customElement.addChildren(this.promolistActive, [...this.renderPromoList()]);
  }

  changeNumberItems(event: Event) {
    const target = event.target as HTMLInputElement
    target.value = target.value.replace(/[^0-9]/g, '')
    if (target.value === '0' || target.value === '') return
    // Проверка на ввод пустого значения
    if ((Number(target.value) > this.serverData.length)) {
      target.value = this.objectItemsPages.items.toString()
      return
    }

    // Перезапишем количество указанных карточек
    this.objectItemsPages.items = Number(target.value);

    if (this.objectItemsPages.items <= this.serverData.length) {
      this.pushState()
    }

    this.changeItemsForList();
  }

  countItemPlus(e: Event) {
    const itemCard = (e.target as HTMLElement).closest('.product__itemBasket');
    const itemCardCount = itemCard?.querySelector('.basket-data__count-current');
    const itemCardTotal = itemCard?.querySelector('.basket-data__total');
    this.updateBascetFROMLocalStorage();

    //Прибавляем значение у нужного элемента
    this.BascetLocalStorage.forEach((item) => {
      if (Number(itemCard?.id) === item.id) {
        if (itemCardCount) itemCardCount.textContent = String(item.count)
        if (itemCardTotal) itemCardTotal.textContent = `Total: $${String(item.total)}`;
      }
    });
  }

  countItemMinus(e: Event) {
    const itemCard = (e.target as HTMLElement).closest('.product__itemBasket');
    const itemCardCount = itemCard?.querySelector('.basket-data__count-current');
    const itemCardTotal = itemCard?.querySelector('.basket-data__total');
    this.updateBascetFROMLocalStorage();

    //Убавляем значение у нужного элемента
    this.BascetLocalStorage.forEach((item) => {
      if (Number(itemCard?.id) === item.id) {
        if (item.count >= 1) {
          if (itemCardCount) {
            itemCardCount.textContent = String(item.count)
          }
          if (itemCardTotal) itemCardTotal.textContent = `Total: $${String(item.total)}`;
        }
      }
    });

    // Проверим нет ли пустых caount
    const newData: IitemDATA[] = [];
    this.serverData.forEach((serverItem) => {
      this.BascetLocalStorage.forEach((item) => {
        if (Number(serverItem.id) === item.id) newData.push(serverItem);
      });
    })

    this.serverData = [...newData];
    this.changeItemsForList();
  }

  showNewPrice() {
    const oldPrice = document.querySelector('.total-old');
    const newPrice = document.querySelector('.total-new');

    if (Number(this.promocodeInfo.count) && Number(this.promocodeInfo.count) > 0) {
      oldPrice?.classList.add('sale-redline');
      newPrice?.classList.remove('hide');
    } else {
      oldPrice?.classList.remove('sale-redline');
      newPrice?.classList.add('hide');
    }
  }

  checkNewPrice(oldPrice: HTMLElement, newPrice: HTMLElement) {

    if (Number(this.promocodeInfo.count) && Number(this.promocodeInfo.count) > 0) {
      oldPrice?.classList.add('sale-redline');
      newPrice?.classList.remove('hide');
    } else {
      oldPrice?.classList.remove('sale-redline');
      newPrice?.classList.add('hide');
    }
  }

  updateBascetFROMLocalStorage() {
    const readlocalStorage = localStorage.getItem('BascetLocalStorage')
    if (readlocalStorage) {
      this.BascetLocalStorage = JSON.parse(readlocalStorage)
    } else {
      this.BascetLocalStorage = []
    }
  }

  updatePromoFROMLocalStorage() {
    const readlocalStoragePromoCount = localStorage.getItem('listPromo')
    if (readlocalStoragePromoCount) {
      this.promocodeInfo = JSON.parse(readlocalStoragePromoCount);
    } else {
      this.promocodeInfo = {
        count: 0,
        list: []
      };
    }
  }

}

export default ViewBasketPage