import CustomElement from '../utils/_createCustomElement';
import ControllerMain from '../controller/_ControllerMain';
import { stringArrayObject } from '../typingTS/_type';
import { IitemDATA} from '../typingTS/_interfaces'

class ViewMain {
  mainCheckList: HTMLElement
  customElement: CustomElement
  _controller: ControllerMain;
  startCategoryData: stringArrayObject
  startBrandData: stringArrayObject
  startServerData: IitemDATA[]

  constructor() {
    this._controller = new ControllerMain();
    this.startCategoryData = this._controller.startCategoryData;
    this.startBrandData = this._controller.startBrandData;
    this.startServerData = this._controller.startServerData;
    this.customElement = new CustomElement();
    this.mainCheckList = this.customElement.createElement('div', { className: 'filter__item-container category__container filter__item-container-scroll'});

    this.create();
  }


  create(data: stringArrayObject = this.startCategoryData) {
    console.log("this.startCategoryData",this.startCategoryData)
    console.log("this.startBrandData",this.startBrandData)
    console.log("this.startServerData",this.startServerData)
    const filterCategory = this.customElement.createElement('div', { className: 'filter__item filter__category category filter__item-scroll'});

    const filterItemName = this.customElement.createElement('h3', { className: 'filter__item-name category__name', textContent: 'Category'});
    this.customElement.addChildren(filterCategory,[filterItemName, this.mainCheckList]);

    for (const key in data) {
      const item = this.customElement.createElement('div');
      // console.log()
      const input = this.customElement.createElement('input', { type: 'checkbox', id: key});
      const label = this.customElement.createElement('label', { textContent: key});
      label.setAttribute('for', key)
      this.customElement.addChildren(item,[input, label]);
      this.customElement.addChildren(this.mainCheckList,[item]);
    }

    document.body.append(filterCategory)
  }


  headerListeners() {
    this.mainCheckList.addEventListener('click', this.onheaderBasketClick);
  }

  private onheaderBasketClick = () => {
    console.log('123');
  }

}

export default ViewMain