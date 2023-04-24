const inputDataPrice: number[] = [0,1000];
const inputDataStock: number[] = [0,100];

const inputOneFirst: HTMLElement | null = document.querySelector('#slider1');
const inputOneSecond: HTMLElement | null = document.querySelector('#slider2');
const inputTwoFirst: HTMLElement | null = document.querySelector('#slider3');
const inputTwoSecond: HTMLElement | null = document.querySelector('#slider4');

function changeInput(event: Event, item: HTMLElement | null):void {
  if (event.target !== null) {
    switch(item) {
      case inputOneFirst: inputDataPrice[0] = +(<HTMLInputElement>event.target).value;
        break;
      case inputOneSecond: inputDataPrice[1] = +(<HTMLInputElement>event.target).value;
        break;
      case inputTwoFirst: inputDataStock[0] = +(<HTMLInputElement>event.target).value;
        break;
      case inputTwoSecond: inputDataStock[1] = +(<HTMLInputElement>event.target).value;
        break;
    }
  }
  console.log(inputDataPrice);
  console.log(inputDataStock);
}

inputOneFirst?.addEventListener('change', (event) => changeInput(event, inputOneFirst));
inputOneSecond?.addEventListener('change', (event) => changeInput(event, inputOneSecond));
inputTwoFirst?.addEventListener('change', (event) => changeInput(event, inputTwoFirst));
inputTwoSecond?.addEventListener('change', (event) => changeInput(event, inputTwoSecond));