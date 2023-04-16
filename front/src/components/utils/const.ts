import CustomElement from '../utils/_createCustomElement';
const customElement = new CustomElement();

const HEADER = customElement.createElement('header', {className: "page-header _main-container"});
const MAIN = customElement.createElement('main');
const FOOTER = customElement.createElement('footer', {className: "page-footer _main-container"});

export { HEADER, MAIN, FOOTER }