import { IFilter } from "../typingTS/_interfaces"
import { stringObject } from "../typingTS/_type"

class FormatURL {


    createURLSearchParams(obj: IFilter) {
        const result: stringObject = {}
        let prop: keyof typeof obj
        for (prop in obj) {
            // if (obj[prop].length !== 0) {
            result[prop] = obj[prop].join("|")
            // }
        }
        return new URLSearchParams(result)
    }

    createObjectFromURLSearchParams(params: URLSearchParams) {
        const result: { [x: string]: string[] } = {}
        for (const [key, value] of params.entries()) {
            result[key] = value.split("|")
        }

        return this.strTonumbder(result)
    }
    // const result1: IFilter ={}


    strTonumbder(obj: { [x: string]: string[] }) {
        const result: IFilter = {
            "category": [],
            "brand": [],
            "price": [],
            "stock": [],
            "search": [],
            "sort":[]
        };

        let key: string
        for (key in obj) {
            if (key === "price" || key === "stock") {
                result[key] = obj[key].map((item) => +item)
            } else
            if (key === "brand" || key === "category" ) {
                result[key] = obj[key][0] === '' ? [] : obj[key]

            }
            if (key === "search" || key === "sort") {
                result[key] = obj[key]
            }
        }

        return result
    }

}

export default FormatURL