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
    protected _FILTER: IFilter;
    private readonly _startServerFILTER: IFilter;

    protected readonly _startPriceOfFILTER: number[];
    protected readonly _startStockOfFILTER: number[];
    protected readonly _startSearchOfFILTER: string[];

    protected readonly _priceOfFILTER: number[];
    protected readonly _stockOfFILTER: number[];
    protected readonly _searchOfFILTER: string[];

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

        this._startPriceOfFILTER = this._startServerFILTER.price
        this._startStockOfFILTER = this._startServerFILTER.stock
        this._startSearchOfFILTER = this._startServerFILTER.search

        this._priceOfFILTER = this._FILTER.price
        this._stockOfFILTER = this._FILTER.stock
        this._searchOfFILTER = this._FILTER.search


        // this.setSearchOfFILTER('iPhone 9')
        this.setFILTERcategory('groceries')
        // this.setPriceOfFILTER([500,900])
        // this.setStockOfFILTER([30,100])
        // this.updateFILTER_Price_Stock()

        this._startCategoryData = this.getCategoryAndBrandData(this.startCategoryArray, "category");
        this._filtredCategoryData = this.getCategoryAndBrandData(this.startCategoryArray, "category", this.filtredData);
        this._startBrandData = this.getCategoryAndBrandData(this.startBrandArray, "brand");
        this._filtredBrandData = this.getCategoryAndBrandData(this.startBrandArray, "brand", this.filtredData);


        console.log("222 this.FILTER", this.FILTER)
        console.log("333 filtredData =====", this.filtredData)
        console.log("444 this.filtredCategoryData", this.filtredCategoryData)
        console.log("555 this.filtredBrandData", this.filtredBrandData)
    }
    // ссылка на класс Базы данных
    public get baseData() {
        return this._baseData
    }

    // обновляем мин и мак цены и количества товара в FILTER
    updateFILTER_Price_Stock(data: IitemDATA[] = this.filtredData) {
        const price: number[] = []
        const stock: number[] = []

        if (data.length === 0) {
            this._FILTER.price = new Array(2).fill(this.startServerFILTER.price[0])
            this._FILTER.stock = new Array(2).fill(this.startServerFILTER.stock[0])
            // this._FILTER.price = [0,0]
            // this._FILTER.stock = [0,0]

        } else if (data.length === 1) {
            console.log("new Array(2).fill(data[0].price)",new Array(2).fill(data[0].price))
            this._FILTER.price = new Array(2).fill(data[0].price)
            this._FILTER.stock = new Array(2).fill(data[0].stock)
        } else {
            this._FILTER.price = data.reduce((res, product) => {
                res.push(product.price)
                return res
            }, price).sort((a, b) => a - b)
                .filter((item, index, arr) => index === 0 || index === (arr.length - 1))

            this._FILTER.stock = data.reduce((res, product) => {
                res.push(product.stock)
                return res
            }, stock).sort((a, b) => a - b)
                .filter((item, index, arr) => index === 0 || index === (arr.length - 1))
        }

    }

    // метод добавления и удаления значений в FILTER.category
    setFILTERcategory(data: string) {
        const index = this._FILTER.category.indexOf(data);
        if (index !== -1) {
            this._FILTER.category.splice(index, 1);
        } else {
            this._FILTER.category.push(data)
        }
        // this.updateFILTER_Price_Stock()
        this.updateFiltredData()
        this.updateFILTER_Price_Stock()

    }

    // метод УСТАНОВКИ массива цены фильтра
    setPriceOfFILTER(data: number[] = this.startServerFILTER.price) {
        this._FILTER.price = data;
        this.updateFiltredData()
        this.updateFILTER_Price_Stock()
    }
    // метод Установки массива колличества товара фильтра
    setStockOfFILTER(data: number[] = this.startServerFILTER.stock) {
        this._FILTER.stock = data;
        this.updateFiltredData()
        this.updateFILTER_Price_Stock()
    }

    // метод Установки поиска товара фильтра
    setSearchOfFILTER(data: string = this.startServerFILTER.search[0]) {
        this._FILTER.search[0] = data;
        this.updateFiltredData()
        this.updateFILTER_Price_Stock()
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


    // возвращает массив цен из стартовогоФильтра
    public get startPriceOfFILTER() {
        return this._startServerFILTER.price
    }
    // возвращает массив количества товаров из стартовогоФильтра
    public get startStockOfFILTER() {
        return this._startServerFILTER.stock
    }
    // возвращает  строкe поиска из стартовогоФильтра
    public get startSearchOfFILTER() {
        return this._startServerFILTER.search
    }

    // возвращает массив цен из Фильтра
    public get priceOfFILTER() {
        // this.updateFILTER_Price_Stock()
        return this._FILTER.price
    }
    // возвращает массив количества товаров из Фильтра
    public get stockOfFILTER() {
        // this.updateFILTER_Price_Stock()
        return this._FILTER.stock
    }
    // возвращает  строку поиска из Фильтра
    public get searchOfFILTER() {
        // this.updateFILTER_Price_Stock()
        return this._FILTER.search
    }

    // подметод для формирования стартовых Объектов категорий и бренда а также измененных
    // меняет по измененному filtredData
    private getCategoryAndBrandData(obj: string[],
                                    key: "brand" | "category",
                                    filtredData: IitemDATA[] = this.startServerData,
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
            if (result[item]) {
                result[item][2] += 1
            }
        })


        filter.brand.forEach((item) => {
            if (result[item]) {
                result[item][2] += 1
            }
        })

        // console.log("100 = result", result)
        return result
    }

    // медод обновляющий отфильтрованный Объект c данными ПРОДУКТА по измененному FILTER
    updateFiltredData(): IitemDATA[] {
        let resultfilterData: IitemDATA[] = this.startServerData.slice()
        // console.log("769 =resultfilterData", resultfilterData)
        // console.log("770 =this.FILTER", this.FILTER)
        resultfilterData = resultfilterData.filter((product) => {
            if (this.FILTER.category.length === 0) return true
            if (this.FILTER.category.includes(product.category)) return true
            return false
        })
        // console.log("771 =resultfilterData", resultfilterData)

        resultfilterData = resultfilterData.filter((product) => {
            if (this.FILTER.brand.length === 0) return true
            if (this.FILTER.brand.includes(product.brand)) return true
            return false
        })
        // console.log("772 =resultfilterData", resultfilterData)

        resultfilterData = resultfilterData.filter((product) => {
            this.FILTER.price.sort((a, b) => a - b)
            if ((this.FILTER.price[1] - this.FILTER.price[0]) === (this.startServerFILTER.price[1] - this.startServerFILTER.price[0])) return true
            if (this.FILTER.price[0] <= product.price && product.price <= this.FILTER.price[1]) {
                return true
            }
            return false
        })
        // console.log("773 =resultfilterData", resultfilterData)


        resultfilterData = resultfilterData.filter((product) => {
            this.FILTER.stock.sort((a, b) => a - b)
            if ((this.FILTER.stock[1] - this.FILTER.stock[0]) === (this.startServerFILTER.stock[1] - this.startServerFILTER.stock[0])) return true
            if (this.FILTER.stock[0] <= product.stock && product.stock <= this.FILTER.stock[1]) {
                return true
            }
            return false
        })
        // console.log("774 =resultfilterData", resultfilterData)

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
        // console.log("777 =resultfilterData", resultfilterData)

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