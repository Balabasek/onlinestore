import { HEADER, MAIN, FOOTER } from '../utils/const';

export default function renderHTMLBlocks(one: HTMLElement, two: HTMLElement, three: HTMLElement):void {
    document.body.prepend(one, two, three);
}

renderHTMLBlocks(HEADER, MAIN, FOOTER); // Отрисуем блоки