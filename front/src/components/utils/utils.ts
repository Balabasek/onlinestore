import { stringArrayObject } from '../typingTS/_type';

// Функция получения HTML элемента из строки
const createElement = (template: string): HTMLElement => {
    const newElement = document.createElement('div');
    newElement.innerHTML = template;

    return newElement.firstElementChild as HTMLElement
};

const itemFilterCheckbox = (name: string, data: number[]): HTMLElement  => {
    const temp = `<div>
    <input type="checkbox" id=${name}>
    <label for=${name}>${name}</label>
    <div>(${data[0]}/${data[1]})</div>
  </div>`

    return createElement(temp)
}

export { itemFilterCheckbox }