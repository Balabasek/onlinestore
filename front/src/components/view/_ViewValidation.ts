import CustomElement from '../utils/_createCustomElement';
import visa from './../../assets/img/png/visa.png';
import defaultPic from './../../assets/img/png/defaultPic.jpg';
import mastercard from './../../assets/img/png/mastercard.png';
import maestro from './../../assets/img/png/maestro.png';


class ViewValidation {
  customElement: CustomElement;
  confirmButton: HTMLButtonElement;
  InputName: HTMLInputElement;
  InputPhone: HTMLInputElement;
  InputAdress: HTMLInputElement;
  InputMail: HTMLInputElement;

  InputCardNumber: HTMLInputElement;
  InputCardNumberDate: HTMLInputElement;
  InputCardNumberCVV: HTMLInputElement;

  creditInputImage: HTMLImageElement;

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
    this.confirmButton = this.customElement.createElement('button', { className: '_btn confirm__button', type: "submit", textContent: 'Confirm' }) as HTMLButtonElement;



    // ИНПУТЫ
    this.InputName = this.customElement.createElement('input',
      { className: '_inp popup__dataInput-name', type: 'text', placeholder: 'Your Name: Lia Maf' }) as HTMLInputElement;
    this.InputPhone = this.customElement.createElement('input',
      { className: '_inp popup__dataInput-phone', type: 'text', placeholder: 'Phone number: +123456789' }) as HTMLInputElement;
    this.InputAdress = this.customElement.createElement('input',
      { className: '_inp popup__dataInput-adress', type: 'text', placeholder: 'Adress: as1** **c/4 a*s*9' }) as HTMLInputElement;
    this.InputMail = this.customElement.createElement('input',
      { className: '_inp popup__dataInput-mail', type: 'email', placeholder: 'E-mail' }) as HTMLInputElement;
    this.InputCardNumber = this.customElement.createElement('input',
      { className: '_inp creditInput__cardNumber-number', type: 'text', placeholder: 'Card: 1111222233334444' }) as HTMLInputElement;
    this.InputCardNumberDate = this.customElement.createElement('input',
      { className: '_inp creditInput__cardNumber-date', type: 'text', placeholder: 'Date: 01/22' }) as HTMLInputElement;
    this.InputCardNumberCVV = this.customElement.createElement('input',
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

    this.customElement.addChildren(divDataInputName, [this.InputName, this.spanDataInputName]);
    this.customElement.addChildren(divDataInputPhone, [this.InputPhone, this.spanDataInputPhone]);
    this.customElement.addChildren(divDataInputAdress, [this.InputAdress, this.spanDataInputAdress]);
    this.customElement.addChildren(divDataInputMail, [this.InputMail, this.spanDataInputMail]);

    this.customElement.addChildren(popupDataInput, [popupPersona, divDataInputName, divDataInputPhone, divDataInputAdress, divDataInputMail]);

    // Создание popupCreditInput
    const creditInputTitle = this.customElement.createElement('h3', { className: 'creditInput__title', textContent: 'Card Details' });
    const creditInputCardNumber = this.customElement.createElement('div', { className: 'creditInput__cardNumber' });
    const creditInputCardSecret = this.customElement.createElement('div', { className: 'creditInput__cardSecret' });
    this.customElement.addChildren(popupCreditInput, [creditInputTitle, creditInputCardNumber, creditInputCardSecret]);

    const divInputCardNumber = this.customElement.createElement('div', { className: 'div__InputCardNumber' });
    const divInputCardNumberDate = this.customElement.createElement('div', { className: 'div__InputCardNumberDate' });
    const divInputCardNumberCVV = this.customElement.createElement('div', { className: 'div__InputCardNumberCVV' });
    this.customElement.addChildren(divInputCardNumber, [this.InputCardNumber, this.spanInputCardNumber]);
    this.customElement.addChildren(divInputCardNumberDate, [this.InputCardNumberDate, this.spanCardNumberDate]);
    this.customElement.addChildren(divInputCardNumberCVV, [this.InputCardNumberCVV, this.spanCardNumberCVV]);

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

    this.confirmButton.addEventListener('click', (e) => {
      e.preventDefault()
      if ([this.isValidInputName(),
      this.isValidInputPhone(),
      this.isValidInputAdress(),
      this.isValidInputInputMail(),
      this.isValidInputCardNumber(),
      this.isValidInputCardNumberDate(),
      this.isValidInputCardNumberCVV()].every((item) => item)) {
        localStorage.removeItem('BascetLocalStorage');
        this.confirmButton.disabled = true
        this.confirmButton.textContent = 'Order paid'
        setTimeout(() => {
          this.confirmButton.dispatchEvent(this.EVENT.clickOnLogo)
        }, 3000);
      }
    });


    this.InputName.addEventListener('keyup', () => {
      this.InputName.value = this.InputName.value.replace(/[^a-z^A-Z\s^А-ЯЁ^а-яё]/g, "")
      if (this.isValidInputName()) {
        this.InputName.style.borderColor = 'green';
      } else {
        this.InputName.style.borderColor = 'red';
      }
      if (this.InputName.value.length === 0) {
        this.spanDataInputName.textContent = '';
        this.InputName.style.borderColor = 'black';
      }
    })

    this.InputPhone.addEventListener('keyup', () => {
      this.InputPhone.value = this.InputPhone.value.replace(/[^0-9+]/g, '')
      if (this.isValidInputPhone()) {
        this.InputPhone.style.borderColor = 'green';
      } else {
        this.InputPhone.style.borderColor = 'red';
      }
      if (this.InputPhone.value.length === 0) {
        this.spanDataInputPhone.textContent = '';
        this.InputPhone.style.borderColor = 'black';
      }
    })

    this.InputAdress.addEventListener('keyup', () => {
      if (this.isValidInputAdress()) {
        this.InputAdress.style.borderColor = 'green';
      } else {
        this.InputAdress.style.borderColor = 'red';
      }
      if (this.InputAdress.value.length === 0) {
        this.spanDataInputAdress.textContent = '';
        this.InputAdress.style.borderColor = 'black';
      }
    })

    this.InputMail.addEventListener('keyup', () => {
      if (this.isValidInputInputMail()) {
        this.InputMail.style.borderColor = 'green';
      } else {
        this.InputMail.style.borderColor = 'red';
      }
      if (this.InputMail.value.length === 0) {
        this.spanDataInputMail.textContent = '';
        this.InputMail.style.borderColor = 'black';
      }
    })

    this.InputCardNumber.addEventListener('input', () => {
      const length = this.InputCardNumber.value.length;
      this.InputCardNumber.value = this.InputCardNumber.value.replace(/[^0-9+]/g, '')

      const fiкstLetter = this.InputCardNumber.value[0] ? this.InputCardNumber.value[0].toString() : ''

      switch (fiкstLetter) {
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
        this.InputCardNumber.value = this.InputCardNumber.value.slice(0, 16)
      }
      if (this.isValidInputCardNumber()) {
        this.InputCardNumber.style.borderColor = 'green';
      } else {
        this.InputCardNumber.style.borderColor = 'red';
      }
      if (this.InputCardNumber.value.length === 0) {
        this.spanInputCardNumber.textContent = '';
        this.InputCardNumber.style.borderColor = 'black';
      }
    })

    this.InputCardNumberDate.addEventListener('input', () => {
      const length = this.InputCardNumberDate.value.length;
      this.InputCardNumberDate.value = this.InputCardNumberDate.value.replace(/[^0-9+/]/g, '')
      if (length === 2) {
        this.InputCardNumberDate.value = this.InputCardNumberDate.value + '/'
      }
      if (length > 5) {
        this.InputCardNumberDate.value = this.InputCardNumberDate.value.slice(0, 5)
      }
      if (this.isValidInputCardNumberDate()) {
        this.InputCardNumberDate.style.borderColor = 'green';
      } else {
        this.InputCardNumberDate.style.borderColor = 'red';
      }
      if (this.InputCardNumberDate.value.length === 0) {
        this.spanCardNumberDate.textContent = '';
        this.InputCardNumberDate.style.borderColor = 'black';
      }
    })

    this.InputCardNumberCVV.addEventListener('keyup', () => {
      this.InputCardNumberCVV.value = this.InputCardNumberCVV.value.replace(/[^0-9]/g, '')
      if (this.InputCardNumberCVV.value.length > 3) {
        this.InputCardNumberCVV.value = this.InputCardNumberCVV.value.slice(0, 3)
      }
      if (this.isValidInputCardNumberCVV()) {
        this.InputCardNumberCVV.style.borderColor = 'green';
      } else {
        this.InputCardNumberCVV.style.borderColor = 'red';
      }
      if (this.InputCardNumberCVV.value.length === 0) {
        this.spanCardNumberCVV.textContent = '';
        this.InputCardNumberCVV.style.borderColor = 'black';
      }
    })
  }

  setDefauldValueInputs() {
    this.InputName.value = '';
    this.InputPhone.value = '';
    this.InputAdress.value = '';
    this.InputMail.value = '';
    this.InputCardNumber.value = '';
    this.InputCardNumberDate.value = '';
    this.InputCardNumberCVV.value = ''
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
    const array = this.InputName.value.split(' ').filter(item => item)
    if (array.length > 1 && array.every(item => item.length > 2)) {
      this.spanDataInputName.textContent = '';
      return true
    }
    this.spanDataInputName.textContent = 'ERROR';
    return false
  }

  isValidInputPhone(inputPhone = this.InputPhone.value) {
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
    const array = this.InputAdress.value.split(' ').filter(item => item)
    if (array.length > 2 && array.every(item => item.length > 4)) {
      this.spanDataInputAdress.textContent = '';
      return true
    }
    this.spanDataInputAdress.textContent = 'ERROR';
    return false
  }

  isValidInputInputMail() {
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    if (EMAIL_REGEXP.test(this.InputMail.value)) {
      this.spanDataInputMail.textContent = '';
      return true
    }
    this.spanDataInputMail.textContent = 'ERROR';
    return false
  }

  isValidInputCardNumber() {
    const CardNumber_REGEXP = /(\d{4}([-]|)\d{4}([-]|)\d{4}([-]|)\d{4})/;
    if (CardNumber_REGEXP.test(this.InputCardNumber.value)) {
      this.spanInputCardNumber.textContent = '';
      return true
    }
    this.spanInputCardNumber.textContent = 'ERROR';
    return false
  }

  isValidInputCardNumberDate() {
    const CardNumberDate_REGEXP = /^(0[1-9]|1[0-2])\/([0-9]{2})/;

    if (CardNumberDate_REGEXP.test(this.InputCardNumberDate.value)
      &&
      +this.InputCardNumberDate.value.split('/')[1] > 22
    ) {
      this.spanCardNumberDate.textContent = '';
      return true
    }
    this.spanCardNumberDate.textContent = 'ERROR';
    return false
  }

  isValidInputCardNumberCVV() {
    const CardNumberCVV_REGEXP = /^\d{3}$/;
    if (CardNumberCVV_REGEXP.test(this.InputCardNumberCVV.value)) {
      this.spanCardNumberCVV.textContent = '';
      return true
    }
    this.spanCardNumberCVV.textContent = 'ERROR';
    return false
  }
}

export default ViewValidation