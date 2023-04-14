import CreateFilterData from '../model/_ModelCreateFilterData'
import { stringArrayObject } from '../typingTS/_type'
// import Router from './router';

class ControllerMain {
  _model: CreateFilterData;
  startCategoryData: stringArrayObject
  // router: Router;


  constructor() {
    this._model = new CreateFilterData()
    this.startCategoryData = this._model.startCategoryData
    // this.router = new Router()

    // this.router.startRouteListenner()
  }


}

export default ControllerMain