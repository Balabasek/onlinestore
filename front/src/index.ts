import './_global.scss';
import '../index.html';
import './components/_add_favicon';
// import './components/_CreateBaseData';
// import './components/_ModelCreateFilterData'
import './components/_add_rangeSlider';
import ViewFooter from './components/view/_ViewFooter';
import ViewHeader from './components/view/_ViewHeader';
import ViewMain from './components/view/_ViewMain';

const header = new ViewHeader();
const main = new ViewMain();


const App = new ViewFooter()
App.init()