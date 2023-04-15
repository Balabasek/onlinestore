import { IitemDATA, IFilter } from '../typingTS/_interfaces'
import { stringObject, stringArrayObject } from '../typingTS/_type';

import CreateBaseDate from "./_CreateBaseData"

class CreateFilterData {
    private readonly _baseData: CreateBaseDate;
    private readonly _startCategoryArray: string[];
    private _startCategoryData: stringArrayObject;
    protected _filtredCategoryData: stringArrayObject;
    private readonly _startBrandArray: string[];
    private _startBrandData: stringArrayObject;
    protected _filtredBrandData: stringArrayObject;
    private readonly _startServerData: IitemDATA[];
    private _filtredData: IitemDATA[];
    public _FILTER: IFilter;
    private readonly _startServerFILTER: IFilter;

    constructor() {
        this._baseData = new CreateBaseDate();
        this._startCategoryArray = this.baseData.category;
        this._startBrandArray = this.baseData.brand;
        this._startServerData = this.baseData.data;
        this._filtredData = this.baseData.data;
        this._startServerFILTER = {
            "category": [],
            "brand": [],
            "price": this.baseData.price,
            "stock": this.baseData.stock,
            // "price": [10, 1749],
            // "stock": [2, 150],
            "search": ['']
        };
        this._FILTER = JSON.parse(JSON.stringify(this._startServerFILTER))
        this._startCategoryData = this.getCategoryAndBrandData(this.startCategoryArray, "category");
        this._filtredCategoryData = this.getCategoryAndBrandData(this.startCategoryArray, "category", this.filtredData);
        this._startBrandData = this.getCategoryAndBrandData(this.startBrandArray, "brand");
        this._filtredBrandData = this.getCategoryAndBrandData(this.startBrandArray, "brand", this.filtredData);


        this.FILTER.category.push("smartphones")
    }
// ссылка на класс Базы данных
    public get baseData() {
        return this._baseData
    }
// возвращает стартовый массив категорий
    public get startCategoryArray() {
        return this._startCategoryArray
    }
    // возвращает стартовый массив брендов
    public get startBrandArray() {
        return this._startBrandArray
    }
// возвращает стартовый Объект категорий
    public get startCategoryData() {
        this._startCategoryData = this.getCategoryAndBrandData(this.startCategoryArray, "category");
        return this._startCategoryData
    }
// возвращает измененный Объект категорий по this._filtredData
    public get filtredCategoryData() {
        this._filtredCategoryData = this.getCategoryAndBrandData(this.startCategoryArray, "category", this.filtredData);
        return this._filtredCategoryData
    }
// возвращает стартовый Объект брендов
    public get startBrandData() {
        this._startBrandData = this.getCategoryAndBrandData(this.startBrandArray, "brand");
        return this._startBrandData
    }
// возвращает измененный Объект брендов по this._filtredData
    public get filtredBrandData() {
        this._filtredBrandData = this.getCategoryAndBrandData(this.startBrandArray, "brand", this.filtredData);
        return this._filtredBrandData
    }
// возвращает стартовый Объект c данными ПРОДУКТА
    public get startServerData() {
        return this._startServerData
    }
// возвращает измененный Объект c данными ПРОДУКТА
    public get filtredData() {
        this.updateFiltredData();
        return this._filtredData
    }
// возвращает стартовый Объект Фильтра
    public get startServerFILTER() {
        return this._startServerFILTER
    }
// возвращает измененный Объект Фильтра
    public get FILTER() {
        return this._FILTER
    }
// подметод для формирования стартовых Объектов категорий и бренда а также измененных
// меняет по измененному filtredData
    private getCategoryAndBrandData(obj: string[],
                                    key: "brand" | "category",
                                    filtredData:IitemDATA[] = this.startServerData,

                                    filter = this._FILTER) {
        const result: stringArrayObject = {}

        obj.forEach((categoryValue) => {
            filtredData.forEach((product) => {
                if (!result[categoryValue]) result[categoryValue] = [0, 0, 0]
                if (product[key] === categoryValue) result[categoryValue][0] += 1
            })
        })

        obj.forEach((categoryValue) => {
            this.startServerData.forEach((product) => {
                if (!result[categoryValue]) result[categoryValue] = [0, 0, 0]
                if (product[key] === categoryValue) result[categoryValue][1] += 1
            })
        })

        filter.category.forEach((item) => {


            //  result[item][0] +=1
        })

        return result
    }



// медод обновляющий отфильтрованный Объект c данными ПРОДУКТА по измененному Объекту Фильтра
    updateFiltredData(): IitemDATA[] {
        let resultfilterData: IitemDATA[] = this.startServerData.slice()
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
        // this.startCategoryData
        // this.startBrandData
        return this._filtredData
    }
// Метод очищающий Объект фильтра до стартового
// и обновляющий отфильтрованный Объект c данными ПРОДУКТА
    clearFILTER() {
        this._FILTER = JSON.parse(JSON.stringify(this._startServerFILTER))
        this.updateFiltredData()
    }

}

export default CreateFilterData