
// Функция получения HTML элемента из строки
const createElement = (template: string): HTMLElement => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstElementChild as HTMLElement
};

export { createElement }