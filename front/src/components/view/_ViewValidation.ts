import CustomElement from '../utils/_createCustomElement';
import visa from './../../assets/img/png/visa.png';
import defaultPic from './../../assets/img/png/defaultPic.jpg';
import mastercard from './../../assets/img/png/mastercard.png';
import maestro from './../../assets/img/png/maestro.png';
import {IBascetLocalStorage} from "../typingTS/_interfaces";


class ViewValidation {
  customElement: CustomElement;
  confirmButton: HTMLButtonElement;
  inputName: HTMLInputElement;
  inputPhone: HTMLInputElement;
  inputAdress: HTMLInputElement;
  inputMail: HTMLInputElement;

  inputCardNumber: HTMLInputElement;
  inputCardNumberDate: HTMLInputElement;
  inputCardNumberCVV: HTMLInputElement;

  creditInputImage: HTMLImageElement;
  BascetLocalStorage: IBascetLocalStorage[];

  spanDataInputName: HTMLElement;
  spanDataInputPhone: HTMLElement;
  spanDataInputAdress: HTMLElement;
  spanDataInputMail: HTMLElement;
  spanInputCardNumber: HTMLElement;
  spanCardNumberDate: HTMLElement;
  spanCardNumberCVV: HTMLElement;

  EVENT: { [x: string]: Event }

  constructor() {
    this.customElement = new CustomElement();

    const readlocalStorage = localStorage.getItem('BascetLocalStorage')
    if (readlocalStorage) {
      this.BascetLocalStorage = JSON.parse(readlocalStorage)
    } else {
      this.BascetLocalStorage = []
    }

    this.confirmButton = this.customElement.createElement('button', { className: '_btn confirm__button', type: "submit", textContent: 'Confirm' }) as HTMLButtonElement;

    // ИНПУТЫ
    this.inputName = this.customElement.createElement('input',
        { className: '_inp popup__dataInput-name', type: 'text', placeholder: 'Your Name: Lia Maf' }) as HTMLInputElement;
    this.inputPhone = this.customElement.createElement('input',
        { className: '_inp popup__dataInput-phone', type: 'text', placeholder: 'Phone number: +123456789' }) as HTMLInputElement;
    this.inputAdress = this.customElement.createElement('input',
        { className: '_inp popup__dataInput-adress', type: 'text', placeholder: 'Adress: as1** **c/4 a*s*9' }) as HTMLInputElement;
    this.inputMail = this.customElement.createElement('input',
        { className: '_inp popup__dataInput-mail', type: 'email', placeholder: 'E-mail' }) as HTMLInputElement;
    this.inputCardNumber = this.customElement.createElement('input',
        { className: '_inp creditInput__cardNumber-number', type: 'text', placeholder: 'Card: 1111222233334444' }) as HTMLInputElement;
    this.inputCardNumberDate = this.customElement.createElement('input',
        { className: '_inp creditInput__cardNumber-date', type: 'text', placeholder: 'Date: 01/22' }) as HTMLInputElement;
    this.inputCardNumberCVV = this.customElement.createElement('input',
        { className: '_inp creditInput__cardNumber-cvv', type: 'text', placeholder: 'CVV' }) as HTMLInputElement;

    this.creditInputImage = this.customElement.createElement('img', { className: 'credit-img', src: defaultPic }) as HTMLImageElement;

    //СПАНЫ ДЛЯ ОШИБОК
    this.spanDataInputName = this.customElement.createElement('span', { className: 'span__dataInput-name', textContent: '' });
    this.spanDataInputPhone = this.customElement.createElement('span', { className: 'span__dataInput-phone', textContent: 'ERROR' });
    this.spanDataInputAdress = this.customElement.createElement('span', { className: 'span__dataInput-adress', textContent: 'ERROR' });
    this.spanDataInputMail = this.customElement.createElement('span', { className: 'span__dataInput-mail', textContent: 'ERROR' });

    this.spanInputCardNumber = this.customElement.createElement('span', { className: 'span__InputCardNumber', textContent: 'ERROR' });
    this.spanCardNumberDate = this.customElement.createElement('span', { className: 'span__CardNumberDate', textContent: 'ERROR' });
    this.spanCardNumberCVV = this.customElement.createElement('span', { className: 'span__CardNumberCVV', textContent: 'ERROR' });

    this.EVENT = {
      clickOnLogo: new Event('clickOnLogo', { bubbles: true }),// Клик на кнопку confirm
    }

    this.listenersValidationPage();
  }

  create() {
    const pageMainValidation = this.customElement.createElement('div', { className: 'page-main-itemCard _main-container' }); // Основная cекция
    this.confirmButton.disabled = false;
    this.confirmButton.textContent = 'Confirm';
    this.setDefauldValueInputs();
    this.setDefauldTextSpanError();
    this.creditInputImage.src = defaultPic;

    // Создание pageMainValidation
    const popupWrapper = this.customElement.createElement('div', { className: 'popupWrapper' });
    this.customElement.addChildren(pageMainValidation, [popupWrapper]);

    // Создание popupWrapper
    const popup = this.customElement.createElement('div', { className: 'popup' });
    this.customElement.addChildren(popupWrapper, [popup]);

    // Создание popup
    const popupBlock = this.customElement.createElement('form', { className: 'popup__block' });
    this.customElement.addChildren(popup, [popupBlock]);

    // Создание popupBlock
    const popupDataInput = this.customElement.createElement('div', { className: 'popup__dataInput' });
    const popupCreditInput = this.customElement.createElement('div', { className: 'popup__creditInput creditInput' });
    this.customElement.addChildren(popupBlock, [popupDataInput, popupCreditInput, this.confirmButton]);

    // Создание popupDataInput
    const popupPersona = this.customElement.createElement('h3', { className: 'popup__persona', textContent: 'Personal details' });
    const divDataInputName = this.customElement.createElement('div', { className: 'div__dataInput-name' });
    const divDataInputPhone = this.customElement.createElement('div', { className: 'div__dataInput-phone' });
    const divDataInputAdress = this.customElement.createElement('div', { className: 'div__dataInput-adress' });
    const divDataInputMail = this.customElement.createElement('div', { className: 'div__dataInput-mail' });

    this.customElement.addChildren(divDataInputName, [this.inputName, this.spanDataInputName]);
    this.customElement.addChildren(divDataInputPhone, [this.inputPhone, this.spanDataInputPhone]);
    this.customElement.addChildren(divDataInputAdress, [this.inputAdress, this.spanDataInputAdress]);
    this.customElement.addChildren(divDataInputMail, [this.inputMail, this.spanDataInputMail]);

    this.customElement.addChildren(popupDataInput, [popupPersona, divDataInputName, divDataInputPhone, divDataInputAdress, divDataInputMail]);

    // Создание popupCreditInput
    const creditInputTitle = this.customElement.createElement('h3', { className: 'creditInput__title', textContent: 'Card Details' });
    const creditInputCardNumber = this.customElement.createElement('div', { className: 'creditInput__cardNumber' });
    const creditInputCardSecret = this.customElement.createElement('div', { className: 'creditInput__cardSecret' });
    this.customElement.addChildren(popupCreditInput, [creditInputTitle, creditInputCardNumber, creditInputCardSecret]);

    const divInputCardNumber = this.customElement.createElement('div', { className: 'div__InputCardNumber' });
    const divInputCardNumberDate = this.customElement.createElement('div', { className: 'div__InputCardNumberDate' });
    const divInputCardNumberCVV = this.customElement.createElement('div', { className: 'div__InputCardNumberCVV' });
    this.customElement.addChildren(divInputCardNumber, [this.inputCardNumber, this.spanInputCardNumber]);
    this.customElement.addChildren(divInputCardNumberDate, [this.inputCardNumberDate, this.spanCardNumberDate]);
    this.customElement.addChildren(divInputCardNumberCVV, [this.inputCardNumberCVV, this.spanCardNumberCVV]);

    // Создание creditInputCardNumber
    const creditInputImage = this.customElement.createElement('div', { className: 'creditInput__image' });
    this.customElement.addChildren(creditInputCardNumber, [creditInputImage, divInputCardNumber]);

    // Создание creditInputImage
    this.customElement.addChildren(creditInputImage, [this.creditInputImage]);

    // Создание creditInputCardSecret
    this.customElement.addChildren(creditInputCardSecret, [divInputCardNumberDate, divInputCardNumberCVV]);

    return pageMainValidation
  }

  listenersValidationPage() {

    this.confirmButton.addEventListener('click', async (e) => {
      e.preventDefault()
      const readlocalStorage = localStorage.getItem('BascetLocalStorage')
      if (readlocalStorage) {
        this.BascetLocalStorage = JSON.parse(readlocalStorage)
      } else {
        this.BascetLocalStorage = []
      }
      const basketitems = [...this.BascetLocalStorage];
      console.log(this.BascetLocalStorage);
      console.log(basketitems);
      if ([this.isValidInputName(),
        this.isValidInputPhone(),
        this.isValidInputAdress(),
        this.isValidInputInputMail(),
        this.isValidInputCardNumber(),
        this.isValidInputCardNumberDate(),
        this.isValidInputCardNumberCVV()].every((item) => item)) {
        const requestBody = {
          items: basketitems.map(item => ({
            id: item.id,
            isBuy: true,
            count: item.count
          }))
        };
        console.log(requestBody);
        const settings = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody.items)
        };
        localStorage.removeItem('BascetLocalStorage');
        this.confirmButton.disabled = true
        this.confirmButton.textContent = 'Order paid'

        const response = await fetch("http://localhost:8888/itemService/updateStockItems", settings);

        if (!response.ok) {
          alert("Ошибка HTTP: " + response.status);
        }
      }

      const response2 = await fetch("http://localhost:8888/itemService/load");

      if (!response2.ok) {
        alert("Ошибка HTTP: " + response2.status);
      }

      setTimeout(() => {
        this.confirmButton.dispatchEvent(this.EVENT.clickOnLogo)
      }, 3000);
    });

    this.inputName.addEventListener('keyup', () => {
      this.inputName.value = this.inputName.value.replace(/[^a-z^A-Z\s^А-ЯЁ^а-яё]/g, "")
      if (this.isValidInputName()) {
        this.inputName.style.borderColor = 'green';
      } else {
        this.inputName.style.borderColor = 'red';
      }
      if (this.inputName.value.length === 0) {
        this.spanDataInputName.textContent = '';
        this.inputName.style.borderColor = 'black';
      }
    })

    this.inputPhone.addEventListener('keyup', () => {
      this.inputPhone.value = this.inputPhone.value.replace(/[^0-9+]/g, '')
      if (this.isValidInputPhone()) {
        this.inputPhone.style.borderColor = 'green';
      } else {
        this.inputPhone.style.borderColor = 'red';
      }
      if (this.inputPhone.value.length === 0) {
        this.spanDataInputPhone.textContent = '';
        this.inputPhone.style.borderColor = 'black';
      }
    })

    this.inputAdress.addEventListener('keyup', () => {
      if (this.isValidInputAdress()) {
        this.inputAdress.style.borderColor = 'green';
      } else {
        this.inputAdress.style.borderColor = 'red';
      }
      if (this.inputAdress.value.length === 0) {
        this.spanDataInputAdress.textContent = '';
        this.inputAdress.style.borderColor = 'black';
      }
    })

    this.inputMail.addEventListener('keyup', () => {
      if (this.isValidInputInputMail()) {
        this.inputMail.style.borderColor = 'green';
      } else {
        this.inputMail.style.borderColor = 'red';
      }
      if (this.inputMail.value.length === 0) {
        this.spanDataInputMail.textContent = '';
        this.inputMail.style.borderColor = 'black';
      }
    })

    this.inputCardNumber.addEventListener('input', () => {
      const length = this.inputCardNumber.value.length;
      this.inputCardNumber.value = this.inputCardNumber.value.replace(/[^0-9+]/g, '')

      const firstLetter = this.inputCardNumber.value[0] ? this.inputCardNumber.value[0].toString() : ''

      switch (firstLetter) {
        case '3':
          this.creditInputImage.src = maestro
          break;
        case '4':
          this.creditInputImage.src = visa
          break;
        case '5':
          this.creditInputImage.src = mastercard
          break;
        case '6':
          this.creditInputImage.src = maestro
          break;

        default:
          this.creditInputImage.src = defaultPic
          break;
      }

      if (length > 16) {
        this.inputCardNumber.value = this.inputCardNumber.value.slice(0, 16)
      }
      if (this.isValidInputCardNumber()) {
        this.inputCardNumber.style.borderColor = 'green';
      } else {
        this.inputCardNumber.style.borderColor = 'red';
      }
      if (this.inputCardNumber.value.length === 0) {
        this.spanInputCardNumber.textContent = '';
        this.inputCardNumber.style.borderColor = 'black';
      }
    })

    this.inputCardNumberDate.addEventListener('input', () => {
      const length = this.inputCardNumberDate.value.length;
      this.inputCardNumberDate.value = this.inputCardNumberDate.value.replace(/[^0-9+/]/g, '')
      if (length === 2) {
        this.inputCardNumberDate.value = this.inputCardNumberDate.value + '/'
      }
      if (length > 5) {
        this.inputCardNumberDate.value = this.inputCardNumberDate.value.slice(0, 5)
      }
      if (this.isValidInputCardNumberDate()) {
        this.inputCardNumberDate.style.borderColor = 'green';
      } else {
        this.inputCardNumberDate.style.borderColor = 'red';
      }
      if (this.inputCardNumberDate.value.length === 0) {
        this.spanCardNumberDate.textContent = '';
        this.inputCardNumberDate.style.borderColor = 'black';
      }
    })

    this.inputCardNumberCVV.addEventListener('keyup', () => {
      this.inputCardNumberCVV.value = this.inputCardNumberCVV.value.replace(/[^0-9]/g, '')
      if (this.inputCardNumberCVV.value.length > 3) {
        this.inputCardNumberCVV.value = this.inputCardNumberCVV.value.slice(0, 3)
      }
      if (this.isValidInputCardNumberCVV()) {
        this.inputCardNumberCVV.style.borderColor = 'green';
      } else {
        this.inputCardNumberCVV.style.borderColor = 'red';
      }
      if (this.inputCardNumberCVV.value.length === 0) {
        this.spanCardNumberCVV.textContent = '';
        this.inputCardNumberCVV.style.borderColor = 'black';
      }
    })
  }

  setDefauldValueInputs() {
    this.inputName.value = '';
    this.inputPhone.value = '';
    this.inputAdress.value = '';
    this.inputMail.value = '';
    this.inputCardNumber.value = '';
    this.inputCardNumberDate.value = '';
    this.inputCardNumberCVV.value = ''
  }

  setDefauldTextSpanError() {
    this.spanDataInputName.textContent = '';
    this.spanDataInputPhone.textContent = '';
    this.spanDataInputAdress.textContent = '';
    this.spanDataInputMail.textContent = '';
    this.spanInputCardNumber.textContent = '';
    this.spanCardNumberDate.textContent = '';
    this.spanCardNumberCVV.textContent = '';
  }

  isValidInputName() {
    const array = this.inputName.value.split(' ').filter(item => item)
    if (array.length > 1 && array.every(item => item.length > 2)) {
      this.spanDataInputName.textContent = '';
      return true
    }
    this.spanDataInputName.textContent = 'ERROR';
    return false
  }

  isValidInputPhone(inputPhone = this.inputPhone.value) {
    if ((inputPhone[0] === '+') &&
        (inputPhone.length > 9) &&
        (inputPhone.replace(/['+']/g, '').length === (inputPhone.length - 1))) {
      this.spanDataInputPhone.textContent = '';
      return true
    }
    this.spanDataInputPhone.textContent = 'ERROR';
    return false
  }

  isValidInputAdress() {
    const array = this.inputAdress.value.split(' ').filter(item => item)
    if (array.length > 2 && array.every(item => item.length > 4)) {
      this.spanDataInputAdress.textContent = '';
      return true
    }
    this.spanDataInputAdress.textContent = 'ERROR';
    return false
  }

  isValidInputInputMail() {
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    if (EMAIL_REGEXP.test(this.inputMail.value)) {
      this.spanDataInputMail.textContent = '';
      return true
    }
    this.spanDataInputMail.textContent = 'ERROR';
    return false
  }

  isValidInputCardNumber() {
    const CardNumber_REGEXP = /(\d{4}([-]|)\d{4}([-]|)\d{4}([-]|)\d{4})/;
    if (CardNumber_REGEXP.test(this.inputCardNumber.value)) {
      this.spanInputCardNumber.textContent = '';
      return true
    }
    this.spanInputCardNumber.textContent = 'ERROR';
    return false
  }

  isValidInputCardNumberDate() {
    const CardNumberDate_REGEXP = /^(0[1-9]|1[0-2])\/([0-9]{2})/;

    if (CardNumberDate_REGEXP.test(this.inputCardNumberDate.value)
        &&
        +this.inputCardNumberDate.value.split('/')[1] > 22
    ) {
      this.spanCardNumberDate.textContent = '';
      return true
    }
    this.spanCardNumberDate.textContent = 'ERROR';
    return false
  }

  isValidInputCardNumberCVV() {
    const CardNumberCVV_REGEXP = /^\d{3}$/;
    if (CardNumberCVV_REGEXP.test(this.inputCardNumberCVV.value)) {
      this.spanCardNumberCVV.textContent = '';
      return true
    }
    this.spanCardNumberCVV.textContent = 'ERROR';
    return false
  }
}

export default ViewValidation