import CustomElement from '../utils/_createCustomElement';
import ControllerMain from '../controller/_ControllerMain';
import { stringArrayObject } from '../typingTS/_type';
import { IitemDATA } from '../typingTS/_interfaces'
import { MAIN } from '../utils/const';

class ViewItemCardPage {
    customElement: CustomElement;
    _controller: ControllerMain;

    PageMainItemCard: HTMLElement;
    startServerData: IitemDATA[];

    constructor() {
        this._controller = new ControllerMain();
        this.customElement = new CustomElement();

        this.PageMainItemCard = this.customElement.createElement('div', { className: 'page-main-itemCard _main-container' })
        this.startServerData = this._controller.startServerData;

        // this.create();
    }

    create(product: IitemDATA = this.startServerData[0]) {
        const mainItemCard = this.customElement.createElement('section', { className: 'main-itemCard _container itemCard' })
        this.customElement.addChildren(this.PageMainItemCard, [mainItemCard]);

        const itemCardCrumbs = this.customElement.createElement('div', { className: 'itemCard__crumbs crumbs' });

        const crumbsOne = this.customElement.createElement('p', { className: 'crumbs__one', textContent: 'Store' });
        const paragraf = this.customElement.createElement('p', { textContent: '>>' });
        const crumbsTwo = this.customElement.createElement('p', { className: 'crumbs__two', textContent: `${product.category}` });
        const crumbsThree = this.customElement.createElement('p', { className: 'crumbs__three', textContent: `${product.brand}` });
        const crumbsFour = this.customElement.createElement('p', { className: 'crumbs__four', textContent: `${product.title}` });

        this.customElement.addChildren(itemCardCrumbs, [crumbsOne, paragraf, crumbsTwo, paragraf, crumbsThree, paragraf, crumbsFour]);

        const itemCardMain = this.customElement.createElement('section', { className: 'itemCard__main' })

        const itemCardName = this.customElement.createElement('h3', { className: 'itemCard__name', textContent: 'iPhone 9' });
        const itemCardContainer = this.customElement.createElement('div', { className: 'itemCard__container' });

        const itemCardBlock1 = this.customElement.createElement('div', { className: 'itemCard__block1' });

        const itemCardGalery = this.customElement.createElement('div', { className: 'itemCard__galery' });


        for (let index = 0; index < product.images.length; index++) {
            const itemCardImageGalery = this.customElement.createElement('div', { className: 'itemCard__imageGalery' });
            const itemCardImageGaleryImg = this.customElement.createElement('img', {
                className: 'itemCard__imageGalery-img',
                src: product.images[index]
            });

            this.customElement.addChildren(itemCardImageGalery, [itemCardImageGaleryImg]);
            this.customElement.addChildren(itemCardGalery, [itemCardImageGalery]);
        }

        const itemCardMainPhoto = this.customElement.createElement('div', { className: 'itemCard__mainPhoto' });

        const itemCardImagePhoto = this.customElement.createElement('div', { className: 'itemCard__imagePhoto' });

        const itemCardImagePhotoImg = this.customElement.createElement('img', {
            className: 'itemCard__imagePhoto-img',
            src: product.images[0]
        });
        this.customElement.addChildren(itemCardMainPhoto, [itemCardImagePhotoImg]);
        this.customElement.addChildren(itemCardImagePhoto, [itemCardImagePhoto]);

        const itemCardBlock2 = this.customElement.createElement('div', { className: 'itemCard__block2' });

        const itemCardInformation = this.customElement.createElement('div', { className: 'itemCard__information' });

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




        const itemCardSummary = this.customElement.createElement('div', { className: 'itemCard__summary' });

        const itemCardDataPrice = this.customElement.createElement('p', {
            className: 'itemCard-data__price',
            textContent: `Price: $ ${product.price}`
        });

        const cardBtnButton = this.customElement.createElement('button', { className: 'card__btn-button _btn',   textContent: 'Add to Cart' });

// ******************************************** ТУТ 2 ОДИНАКОВЫХ ЭЛЕМЕНТА ПОЧЕМУ?

        const cardBtnButton1234567890 = this.customElement.createElement('button', { className: 'card__btn-button _btn',   textContent: 'Buy now' });



        this.customElement.addChildren(itemCardSummary, [itemCardDataPrice, cardBtnButton, cardBtnButton1234567890]);


        this.customElement.addChildren(itemCardBlock2, [itemCardInformation, itemCardSummary]);

        this.customElement.addChildren(itemCardBlock1, [itemCardGalery, itemCardMainPhoto]);
        this.customElement.addChildren(itemCardContainer, [itemCardBlock1, itemCardBlock2]);
        this.customElement.addChildren(itemCardMain, [itemCardName, itemCardContainer]);
        this.customElement.addChildren(mainItemCard, [itemCardCrumbs, itemCardMain]);

        console.log(this.PageMainItemCard)
        this.customElement.addChildren(MAIN,[this.PageMainItemCard]);
    }
}

export default ViewItemCardPage