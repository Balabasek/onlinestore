const inputDataPrice: number[] = [0,1000];
const inputDataStock: number[] = [0,100];

const inputOneFirst: HTMLElement | null = document.querySelector('#slider1');
const inputOneSecond: HTMLElement | null = document.querySelector('#slider2');
const inputTwoFirst: HTMLElement | null = document.querySelector('#slider3');
const inputTwoSecond: HTMLElement | null = document.querySelector('#slider4');

function changeInputOneFirst(event: Event):void {
  if (event.target !== null) inputDataPrice[0] = +(<HTMLInputElement>event.target).value;
  console.log(inputDataPrice);
}

function changeInputOneSecond(event: Event):void {
  if (event.target !== null) inputDataPrice[1] = +(<HTMLInputElement>event.target).value;
  console.log(inputDataPrice);
}

function changeInputTwoFirst(event: Event):void {
  if (event.target !== null) inputDataStock[0] = +(<HTMLInputElement>event.target).value;
  console.log(inputDataStock);
}

function changeInputTwoSecond(event: Event):void {
  if (event.target !== null) inputDataStock[1] = +(<HTMLInputElement>event.target).value;
  console.log(inputDataStock);
}

inputOneFirst?.addEventListener('change', changeInputOneFirst);
inputOneSecond?.addEventListener('change', changeInputOneSecond);
inputTwoFirst?.addEventListener('change', changeInputTwoFirst);
inputTwoSecond?.addEventListener('change', changeInputTwoSecond);