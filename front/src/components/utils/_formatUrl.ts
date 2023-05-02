import { IFilter } from "../typingTS/_interfaces"
import { stringObject, numberObject, stringArrayObject } from "../typingTS/_type"

class FormatURL {


  createURLSearchParams(obj: IFilter) {
    const result: stringObject = {}
    let prop: keyof typeof obj
    for (prop in obj) {
      result[prop] = obj[prop].join("|")
    }
    return new URLSearchParams(result)
  }

  createURLSearchParamsBasket(obj: numberObject) {
    const result: stringObject = {}
    let prop: keyof typeof obj
    for (prop in obj) {
      result[prop] = obj[prop].toString()
    }
    return new URLSearchParams(result)
  }

  createFromURLSearchParams<T>(params: T) {
    const result: numberObject = {}
if (params instanceof URLSearchParams) {
  for (const [key, value] of params.entries()) {
    result[key] = +value
  }

}

    return result
  }

  createObjectFromURLSearchParams(params: URLSearchParams) {
    const result: stringArrayObject = {}
    for (const [key, value] of params.entries()) {
      result[key] = value.split("|")
    }
    return this.strToNumber(result)
  }

  strToNumber(obj: { [x: string]: string[] }) {
    const result: IFilter = {
      "category": [],
      "brand": [],
      "price": [],
      "stock": [],
      "search": [],
      "sort":[],
      "view":[],
    };

    let key: string
    for (key in obj) {
      if (key === "price" || key === "stock") {
        result[key] = obj[key].map((item) => +item)
      } else 
      if (key === "brand" || key === "category" ) {
        result[key] = obj[key][0] === '' ? [] : obj[key]

      }
      if (key === "search" || key === "sort" || key === "view") {
        result[key] = obj[key]
    }
    }

    return result
  }

}

export default FormatURL