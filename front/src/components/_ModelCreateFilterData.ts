import { IitemDATA, IFilter } from './typingTS/_interfaces'
import { stringArrayObject } from './typingTS/_type';

import CreateBaseDate from "./_CreateBaseData"

class CreateFilterData {
  private readonly _baseData: CreateBaseDate;
  protected readonly _categoryArray: string[];
  protected _categoryData: stringArrayObject;
  protected readonly _brandArray: string[];
  protected _brandData: stringArrayObject;
  public readonly _serverData: IitemDATA[];
  public _filtredData: IitemDATA[];
  public _FILTER: IFilter;
  public readonly _serverFILTER: IFilter;

  constructor() {
    this._baseData = new CreateBaseDate();
    this._categoryArray = this.baseData.category;
    this._brandArray = this.baseData.brand;
    this._serverData = this.baseData.data;
    this._filtredData = this.baseData.data;
    this._serverFILTER = {
      "category": [],
      "brand": [],
      "price": this.baseData.price,
      "stock": this.baseData.stock,
      // "price": [10, 1749],
      // "stock": [2, 150],
      "search": ['']
    };
    this._FILTER = JSON.parse(JSON.stringify(this._serverFILTER))
    this._categoryData = this.getCategoryBrandDData(this.categoryArray, "category");
    this._brandData = this.getCategoryBrandDData(this.brandArray, "brand");
  }

  public get baseData() {
    return this._baseData
  }

  public get categoryArray() {
    return this._categoryArray
  }

  public get categoryData() {
    this._categoryData = this.getCategoryBrandDData(this.categoryArray, "category");
    return this._categoryData
  }

  public get brandArray() {
    return this._brandArray
  }

  public get brandData() {
    this._brandData = this.getCategoryBrandDData(this.brandArray, "brand");
    return this._brandData
  }

  public get serverData() {
    return this._serverData
  }

  public get filtredData() {
    return this._filtredData
  }

  public get serverFILTER() {
    return this._serverFILTER
  }

  public get FILTER() {
    return this._FILTER
  }

  private getCategoryBrandDData(obj: string[], key: "brand" | "category") {
    const result: stringArrayObject = {}

    obj.forEach((categoryValue) => {
      this.filtredData.forEach((product) => {
        if (!result[categoryValue]) result[categoryValue] = [0, 0]
        if (product[key] === categoryValue) result[categoryValue][0] += 1
      })
    })

    obj.forEach((categoryValue) => {
      this.serverData.forEach((product) => {
        if (!result[categoryValue]) result[categoryValue] = [0, 0]
        if (product[key] === categoryValue) result[categoryValue][1] += 1
      })
    })

    return result
  }

  updateFiltredData(): IitemDATA[] {
    let resultfilterData: IitemDATA[] = this.serverData.slice()
    resultfilterData = resultfilterData.filter((product) => {
      if (this.FILTER.category.length === 0) return true
      if (this.FILTER.category.includes(product.category)) return true
      return false
    })

    resultfilterData = resultfilterData.filter((product) => {
      if (this.FILTER.brand.length === 0) return true
      if (this.FILTER.brand.includes(product.brand)) return true
      return false
    })

    resultfilterData = resultfilterData.filter((product) => {
      this.FILTER.price.sort((a, b) => a - b)
      if ((this.FILTER.price[1] - this.FILTER.price[0]) === (1749 - 10)) return true
      if (this.FILTER.price[0] <= product.price && product.price <= this.FILTER.price[1]) {
        return true
      }
      return false
    })

    resultfilterData = resultfilterData.filter((product) => {
      this.FILTER.stock.sort((a, b) => a - b)
      if ((this.FILTER.price[1] - this.FILTER.price[0]) === (150 - 2)) return true
      if (this.FILTER.stock[0] <= product.stock && product.stock <= this.FILTER.stock[1]) {
        return true
      }
      return false
    })

    resultfilterData = resultfilterData.filter((product) => {

      const text = this.FILTER.search[0]

      if (text === '') return true
      if (product.title.toLocaleLowerCase().includes(text.toLocaleLowerCase()) ||
        product.description.toLocaleLowerCase().includes(text.toLocaleLowerCase()) ||
        product.price.toString().includes(text) ||
        product.discountPercentage.toString().includes(text) ||
        product.rating.toString().includes(text) ||
        product.stock.toString().includes(text) ||
        product.brand.toLocaleLowerCase().includes(text.toLocaleLowerCase()) ||
        product.category.toLocaleLowerCase().includes(text.toLocaleLowerCase())
      ) { return true }
      return false
    })

    this._filtredData = resultfilterData
    this.categoryData
    this.brandData
    return this._filtredData
  }

  clearFILTER() {
    this._FILTER = JSON.parse(JSON.stringify(this._serverFILTER))
    this.updateFiltredData()
  }

}

export default CreateFilterData


// const App = new CreateFilterData()


// function returnObjForURLSearch(obj: IFilter) {
//   const result: stringObject = {}
//   let prop: keyof typeof obj
//   for (prop in obj) {
//     result[prop] = obj[prop].join("|")
//   }
//   return result
// }

// console.log("77", returnObjForURLSearch(App.FILTER))


// const params = new URLSearchParams(returnObjForURLSearch(App.FILTER))


// // window.history.pushState({}, '', `?${params.toString()}`)
// window.history.pushState({}, '', `?id=${2}`)
// // window.history.pushState({}, '', `/watch1?${params.toString()}`)
// // window.history.pushState({}, '', `/watch2?${params.toString()}`)
// // window.history.pushState({}, '', `/watch3?${params.toString()}`)
// console.log("80 =window.location.search =", window.location.search)


// const ABC: { [x: string]: string[] } = {}

// for (const [key, value] of params.entries()) {
//   // console.log("100=", key, value)
//   ABC[key] = value.split("|")
// }

// console.log("ABC ВЕРНУЛ из строки= ", ABC)




// // console.log("10",App.serverData)
// console.log("20", App.filtredData)
// console.log("30",App.serverFILTER)
// console.log("40", App.FILTER)

// // App.clearFILTER()

// App.FILTER.category.push("smartphones")
// // App.FILTER.search[0] = "Lo"
// App.updateFiltredData()
// // App.categoryData()

// // console.log("50",App.serverData)
// console.log("60", App.filtredData)
// // console.log("70",App.serverFILTER)
// console.log("80 App.FILTER =", App.FILTER)

// // App.clearFILTER()

// // console.log("90",App.serverData)
// console.log("100", App.filtredData)
// // console.log("110",App.serverFILTER)
// console.log("120", App.FILTER)


// // console.log("App.baseData.brand", App.baseData.brand)
// // console.log("App.categoryArray", App.categoryArray)
// console.log("App.brandData", App.brandData)
// console.log("App.categoryData", App.categoryData)


// App.clearFILTER()

// console.log("App.brandData", App.brandData)
// console.log("App.categoryData", App.categoryData)






































// for (const value of params.values()) {
//   console.log("200",value)
// }

// function updateURL() {
//   if (history.pushState) {
//       const baseUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
//       const newUrl = baseUrl + '?tyapk=awesome';
//       history.pushState(null, "", newUrl);
//   }
//   else {
//       console.warn('History API не поддерживается');
//   }
// }

// window.onpopstate = updateURL;

// window.history.pushState({},'',params.toString())


// console.log(window.location.search)
// console.log(window.location.origin)


// window.location.assign(
//   `${window.location.origin}${window.location.pathname}?${params.toString()}`
// )






// const route = (event: Event) => {
//   event = event || window.event;
//   event.preventDefault();
//   window.history.pushState({}, "", params.toString());
//   handleLocation();
// };

// const routes = {
//   404: "/pages/404.html",
//   "/": "/pages/index.html",
//   "/about": "/pages/about.html",
//   "/lorem": "/pages/lorem.html",
// };

// const handleLocation = async () => {
//   const path = window.location.pathname;
//   const route = routes[path] || routes[404];
//   const html = await fetch(route).then((data) => data.text());
//   document.getElementById("main-page").innerHTML = html;
// };

// window.onpopstate = handleLocation;
// window.route = route;

// handleLocation();



//   changeFiltredData(obj = this._FILTER): IitemDATA[] {
//     let filterData: IitemDATA[] = []

//     filterData = this._serverData.filter((item) => {
//       let keyObj: keyof typeof this.FILTER
//       for (keyObj in obj) {
//         if (keyObj === "category") {
//           let keyObjCategory: keyof typeof this.FILTER.category
//           for (keyObjCategory in this.FILTER.category) {
//             if (this.FILTER.category[keyObjCategory] && item.category === keyObjCategory) return true
//           }
//         }
//         if (keyObj === "brand") {
//           let keyObjBrand: keyof typeof this.FILTER.brand
//           for (keyObjBrand in this.FILTER.brand) {
//             if (this.FILTER.brand[keyObjBrand] && item.brand === keyObjBrand) return true
//           }
//         }
//         if (keyObj === "price") {
//           this.FILTER.price.sort((a, b) => a - b)
//           if (this.FILTER.price[0] <= item.price && item.price <= this.FILTER.price[1]) return true
//         }
//         if (keyObj === "stock") {
//           this.FILTER.stock.sort((a, b) => a - b)
//           if (this.FILTER.stock[0] <= item.stock && item.stock <= this.FILTER.stock[1]) return true
//         }
//       }
//       return false
//     })
//     this._filtredData = filterData
//     return this._filtredData
//   }
