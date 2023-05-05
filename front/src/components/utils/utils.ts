import { IBascetLocalStorage,IPromoList } from '../typingTS/_interfaces';

// Функция получения HTML элемента из строки
const createElement = (template: string): HTMLElement => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstElementChild as HTMLElement
};

const getLocalStorageValue = (name: string): IBascetLocalStorage[] => {
  const readlocalStorage = localStorage.getItem(name)
  if (readlocalStorage) {
    return JSON.parse(readlocalStorage);
  } else {
    return [];
  }
}

const getLocalStoragePromo = (name: string): IPromoList => {
  const readlocalStoragePromoCount = localStorage.getItem(name)
  if (readlocalStoragePromoCount) {
    return JSON.parse(readlocalStoragePromoCount);
  } else {
    return {
      count: 0,
      list: []
    };
  }
}


export { createElement, getLocalStorageValue, getLocalStoragePromo }