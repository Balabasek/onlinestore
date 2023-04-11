import './_global.scss';
import '../index.html';
import './components/_add_favicon';
// import './components/_CreateBaseData';
// import './components/_ModelCreateFilterData'
import './components/_add_rangeSlider';
import ViewMain from './components/view/_ViewMain'

const App = new ViewMain()

App.init()
