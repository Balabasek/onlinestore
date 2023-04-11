class Header {
  header: HTMLElement
  headerBasket: HTMLDivElement
  headerBasketCount: HTMLSpanElement
  functionСreateHtmlElement: functionСreateHtmlElement

  constructor() {
    this.header = document.createElement('header')
    this.headerBasket = document.createElement('div')
    this.headerBasketCount = document.createElement('span')
    this.functionСreateHtmlElement = new functionСreateHtmlElement()

    this.createHeader()
    this.headerListeners()
  }




createHeader() {
// new div = this.functionСreateHtmlElement("div", class="newclass")
// this.header.append(new div)
}

updateheaderBasketCount(count: number = 0) {
this.headerBasketCount.textContent = count.toString()
}


headerListeners() {
  this.headerBasket.addEventListener('click', this.onheaderBasketClick);

}


private onheaderBasketClick = () => {
  console.log(this.headerBasketCount.textContent)
}
}

export default Header
