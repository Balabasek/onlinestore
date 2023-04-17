import './_global.scss';
import '../index.html';
import './components/view/_ViewBlocks' // Отрисовка основных блоков, выше всех должно быть
import './components/_add_favicon';
// import './components/_CreateBaseData';
// import './components/_ModelCreateFilterData'
import './components/_add_rangeSlider';

import ViewFooter from './components/view/_ViewFooter';
import ViewHeader from './components/view/_ViewHeader';
import ViewMain from './components/view/_ViewMain';
import ViewItemCardPage from './components/view/_ViewItemCardPage';

// Отрисовка
const viewHeader = new ViewHeader();
const viewMain = new ViewMain(); // Запустит отрисовку основной секции main\
const viewItemCardPage = new ViewItemCardPage(); // Запустит отрисовку страницы карточки товара
const viewFooter = new ViewFooter();