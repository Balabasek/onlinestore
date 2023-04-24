import { IitemDATA } from '../typingTS/_interfaces'
import { stringObject } from '../typingTS/_type';

import { products } from '../DATA/_products'

class CreateBaseDate {
  protected _data: IitemDATA[];
  protected _category: string[];
  protected _brand: string[];
  protected readonly _stock: number[];
  protected readonly _price: number[];

  constructor() {
    this._data = JSON.parse(JSON.stringify(products));
    this._category = this.createCategory();
    this._brand = this.createBrand();
    this._stock = this.createStock("stock");
    this._price = this.createStock("price");
  }

  public get data() {
    return this._data
  }
  public get category() {
    return this._category
  }
  public get brand() {
    return this._brand
  }

  public get stock() {
    return this._stock
  }

  public get price() {
    return this._price
  }

  createCategory() {
    const setCategory: Set<string> = new Set()
    this.data.forEach((product) => {
      let keyItem: keyof IitemDATA
      for (keyItem in product) {
        if (product.category) setCategory.add(product.category)
      }
    })
    this._category = Array.from(setCategory)

    return this.category
  }

  createBrand() {
    const setBrand: Set<string> = new Set()
    this.data.forEach((product) => {
      let keyItem: keyof IitemDATA
      for (keyItem in product) {
        if (product.brand) setBrand.add(product.brand)
      }
    })
    this._brand = Array.from(setBrand)
    return this.brand
  }

  createStock(key: "price" | "stock") {
    let resultArray: number[] = []
    resultArray = this.data.reduce((sum, product) => {
      sum.push(product[key])
      return sum
    }, resultArray)
    resultArray.sort((a, b) => a - b).splice(1, (resultArray.length - 2))
    return resultArray
  }




}


// const www = new CreateBaseDate()
// console.log(www.stock)
// console.log(www.price)

export default CreateBaseDate
