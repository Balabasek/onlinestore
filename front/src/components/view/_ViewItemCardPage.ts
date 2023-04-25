import CustomElement from '../utils/_createCustomElement';
import ControllerMain from '../controller/_ControllerMain';
// import { stringArrayObject } from '../typingTS/_type';
import { IitemDATA } from '../typingTS/_interfaces';
import { createElement } from '../utils/utils';
// import { MAIN } from '../utils/const';

class ViewItemCardPage {
  customElement: CustomElement;
  // _controller: ControllerMain;

  pageMainItemCard: HTMLElement;
  itemCardImagePhotoImg: HTMLElement;
  cardBtnButtonAdd: HTMLElement;
  cardBtnButtonBuy: HTMLElement;

  // startServerData: IitemDATA[];
  startServerProduct: IitemDATA
  EVENT: { [x: string]: Event }

  constructor(product: IitemDATA) {
    this.startServerProduct = product;
    this.customElement = new CustomElement();
    this.pageMainItemCard = this.customElement.createElement('div', { className: 'page-main-itemCard _main-container' }); // Основная сакция картчоки
    this.itemCardImagePhotoImg = this.customElement.createElement('img', { className: 'itemCard__imagePhoto-img' });

    this.cardBtnButtonAdd = this.customElement.createElement('button', { className: 'card__btn-button _btn button-add', textContent: 'Add to Cart' });
    this.cardBtnButtonBuy = this.customElement.createElement('button', { className: 'card__btn-button _btn button-buy', textContent: 'Buy now' });

    this.EVENT = {
      clickOnProductAddInBascetMain: new Event('clickOnProductAddInBascetMain', { bubbles: true }),// Клик на контейнере с Карточками
      clickOnProductAddInBascetBuy: new Event('clickOnProductAddInBascetBuy', { bubbles: true }),// Клик на контейнере с Карточками
    }

    this.listenersCardPage();

  }

  listenersCardPage() {

    this.cardBtnButtonAdd.addEventListener('click', (e) => {
      this.cardBtnButtonAdd.dispatchEvent(this.EVENT.clickOnProductAddInBascetMain)
    });

    this.cardBtnButtonBuy.addEventListener('click', (e) => {
      console.log('this.cardBtnButtonBuy')
      this.cardBtnButtonBuy.dispatchEvent(this.EVENT.clickOnProductAddInBascetMain)
      this.cardBtnButtonBuy.dispatchEvent(this.EVENT.clickOnProductAddInBascetBuy)
    })

  }

  create(product: IitemDATA = this.startServerProduct) {
    this.pageMainItemCard.innerHTML = ''
    this.customElement.addChildren(this.pageMainItemCard, [this.renderCardBlock(product)]);
    // this.customElement.addChildren(MAIN, [this.pageMainItemCard]);
    return this.pageMainItemCard
  }

  renderCardBlock(product: IitemDATA = this.startServerProduct): HTMLElement {
    // Создание основной секции
    const mainItemCard = this.customElement.createElement('section', { className: 'main-itemCard _container itemCard' })
    this.customElement.addChildren(this.pageMainItemCard, [mainItemCard]);

    // Заполнение карточки
    const itemCardCrumbs = this.customElement.createElement('div', { className: 'itemCard__crumbs crumbs' });
    const itemCardMain = this.customElement.createElement('div', { className: 'itemCard__main' })
    this.customElement.addChildren(mainItemCard, [itemCardCrumbs, itemCardMain]);

    // Заполнение itemCardCrumbs
    const crumbsOne = this.customElement.createElement('p', { className: 'crumbs__one', textContent: 'Store' });
    const paragraf1 = this.customElement.createElement('p', { textContent: '>>' });
    const crumbsTwo = this.customElement.createElement('p', { className: 'crumbs__two', textContent: `${product.category}` });
    const paragraf2 = this.customElement.createElement('p', { textContent: '>>' });
    const crumbsThree = this.customElement.createElement('p', { className: 'crumbs__three', textContent: `${product.brand}` });
    const paragraf3 = this.customElement.createElement('p', { textContent: '>>' });
    const crumbsFour = this.customElement.createElement('p', { className: 'crumbs__four', textContent: `${product.title}` });

    this.customElement.addChildren(itemCardCrumbs, [crumbsOne, paragraf1, crumbsTwo, paragraf2, crumbsThree, paragraf3, crumbsFour]);

    // Заполнение itemCardMain
    const itemCardName = this.customElement.createElement('h3', { className: 'itemCard__name', textContent: `${product.title}` });
    const itemCardContainer = this.customElement.createElement('div', { className: 'itemCard__container' });

    this.customElement.addChildren(itemCardMain, [itemCardName, itemCardContainer]);

    // Заполнение itemCardContainer
    const itemCardBlock1 = this.customElement.createElement('div', { className: 'itemCard__block1' });
    const itemCardBlock2 = this.customElement.createElement('div', { className: 'itemCard__block2' });

    this.customElement.addChildren(itemCardContainer, [itemCardBlock1, itemCardBlock2]);

    // Заполнение itemCardBlock1
    const itemCardGalery = this.customElement.createElement('div', { className: 'itemCard__galery' });
    const itemCardMainPhoto = this.customElement.createElement('div', { className: 'itemCard__mainPhoto' });
    this.customElement.addChildren(itemCardBlock1, [itemCardGalery, itemCardMainPhoto]);

    // Заполнение itemCardGalery
    for (const key in product.images) {
      const itemCardImage = this.itemFilterCheckbox(product.images[key]); // Функция получение разметки определенной карточки
      itemCardImage.addEventListener('mouseover', (e) => this.changeItemCardImagePhotoImg(e))
      this.customElement.addChildren(itemCardGalery, [itemCardImage]);
    }

    // Заполнение itemCardMainPhoto
    const itemCardImagePhoto = this.customElement.createElement('div', { className: 'itemCard__imagePhoto' });
    this.itemCardImagePhotoImg.setAttribute('src', product.images[0])
    // const itemCardImagePhotoImg = this.customElement.createElement('img', { className: 'itemCard__imagePhoto-img', src: product.images[0] });

    this.customElement.addChildren(itemCardImagePhoto, [this.itemCardImagePhotoImg]);
    this.customElement.addChildren(itemCardMainPhoto, [itemCardImagePhoto]);

    // Заполнение itemCardBlock2
    const itemCardInformation = this.customElement.createElement('div', { className: 'itemCard__information' });
    const itemCardSummary = this.customElement.createElement('div', { className: 'itemCard__summary' });

    this.customElement.addChildren(itemCardBlock2, [itemCardInformation, itemCardSummary]);

    // Заполнение itemCardInformation
    const itemCardDataDescription = this.customElement.createElement('p', {
      className: 'itemCard-data__description',
      textContent: `Description: ${product.description}`
    });
    const itemCardDataDiscount = this.customElement.createElement('p', {
      className: 'itemCard-data__discount',
      textContent: `Discount: ${product.discountPercentage}`
    });
    const itemCardDataRating = this.customElement.createElement('p', {
      className: 'itemCard-data__rating',
      textContent: `Rating: ${product.rating}`
    });
    const itemCardDataStock = this.customElement.createElement('p', {
      className: 'itemCard-data__stock',
      textContent: `Stock: ${product.stock}`
    });
    const itemCardDataBrand = this.customElement.createElement('p', {
      className: 'itemCard-data__brand',
      textContent: `Description: ${product.brand}`
    });
    const itemCardDataCategory = this.customElement.createElement('p', {
      className: 'itemCard-data__category',
      textContent: `Category: ${product.category}`
    });


    this.customElement.addChildren(itemCardInformation, [itemCardDataDescription, itemCardDataDiscount,
      itemCardDataRating, itemCardDataStock, itemCardDataBrand, itemCardDataCategory
    ]);

    // Заполнение itemCardSummary
    const itemCardDataPrice = this.customElement.createElement('p', {
      className: 'itemCard-data__price', textContent: `Price: $ ${product.price}`
    });

    this.cardBtnButtonAdd.setAttribute('id', `button-add|${product.id}`)
    this.cardBtnButtonBuy.setAttribute('id', `button-buy|${product.id}`)
    this.customElement.addChildren(itemCardSummary, [itemCardDataPrice, this.cardBtnButtonAdd, this.cardBtnButtonBuy]);

    return mainItemCard
  }

  itemFilterCheckbox(src: string): HTMLElement {
    const temp = `<div class="itemCard__imageGalery">
    <img class="itemCard__imageGalery-img" src="${src}">
    </div>`

    return createElement(temp)
  }


  changeItemCardImagePhotoImg(e: Event) {
    const target = e.target as HTMLElement
    if (target) {
      const newSrc = target.getAttribute('src')
      if (newSrc) this.itemCardImagePhotoImg.setAttribute('src', newSrc)
    }

  }
}

export default ViewItemCardPage