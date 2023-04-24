import '../index.html';
import './components/_add_favicon';
import ControllerMain from './components/controller/_ControllerMain'
import './_global.scss';
// import * as noUiSlider from 'nouislider';
// import 'nouislider/dist/nouislider.css';

const APP = new ControllerMain()
APP.init();