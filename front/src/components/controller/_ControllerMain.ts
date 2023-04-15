import CreateFilterData from '../model/_ModelCreateFilterData'
import { stringArrayObject } from '../typingTS/_type'
import { IitemDATA} from '../typingTS/_interfaces'
// import Router from './router';

class ControllerMain {
  _model: CreateFilterData;
  startCategoryData: stringArrayObject
  startBrandData: stringArrayObject
  startServerData: IitemDATA[]
  // router: Router;


  constructor() {
    this._model = new CreateFilterData()
    this.startCategoryData = this._model.startCategoryData
    this.startBrandData = this._model.startBrandData
    this.startServerData = this._model.startServerData
    // this.router = new Router()

    // this.router.startRouteListenner()
  }


}

export default ControllerMain