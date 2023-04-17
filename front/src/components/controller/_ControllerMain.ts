import CreateFilterData from '../model/_ModelCreateFilterData'
import { stringArrayObject } from '../typingTS/_type'
import { IitemDATA, IFilter } from '../typingTS/_interfaces'
import FormatURL from '../utils/_formatUrl';
import state from '../utils/state';
// import Router from './router';

class ControllerMain {
  _model: CreateFilterData;
  _formatURL: FormatURL;
  FILTER: IFilter;

  readonly startCategoryData: stringArrayObject;
  readonly startBrandData: stringArrayObject;
  readonly startServerData: IitemDATA[];

  readonly startPriceOfFILTER: number[];
  readonly startStockOfFILTER: number[];
  readonly startSearchOfFILTER: string[];

  readonly priceOfFILTER: number[];
  readonly stockOfFILTER: number[];
  readonly searchOfFILTER: string[];

  // router: Router;

  a:URLSearchParams

  constructor() {
    this._model = new CreateFilterData()
    this._formatURL = new FormatURL()

    this.FILTER = this._model.FILTER

    this.startCategoryData = this._model.startCategoryData
    this.startBrandData = this._model.startBrandData
    this.startServerData = this._model.startServerData

    // Значиния для установки минимальных и максимальных значений инпута и строки поиска
    this.startPriceOfFILTER = this._model.startPriceOfFILTER
    this.startStockOfFILTER = this._model.startStockOfFILTER
    this.startSearchOfFILTER = this._model.startSearchOfFILTER

    // Будущие значения для установки велью инпутов и строки поиска
    this.priceOfFILTER = this._model.priceOfFILTER
    this.stockOfFILTER = this._model.stockOfFILTER
    this.searchOfFILTER = this._model.searchOfFILTER
    // this.router = new Router()

    // this.router.startRouteListenner()
    this._model.setSearchOfFILTER('ap')
    console.log("this.FILTER 3000",this.FILTER)
    console.log("state 3000",state)
    this.a = this._formatURL.createURLSearchParams(this.FILTER)
    console.log("200000",this._formatURL.createURLSearchParams(this.FILTER).toString())
    console.log(this._formatURL.createObjectFromURLSearchParams(this.a))
  }


}

export default ControllerMain