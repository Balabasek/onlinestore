import { numberArrayObject } from '../typingTS/_type';

// Функция получения HTML элемента из строки
const createElement = (template: string): HTMLElement => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
// console.log('template==',template,'newElement.firstElementChild===',newElement.firstElementChild)
  return newElement.firstElementChild as HTMLElement
};

export { createElement }