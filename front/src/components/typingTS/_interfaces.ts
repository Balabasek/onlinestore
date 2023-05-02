interface IitemDATA {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
  }


  interface IFilter {
    category: string[];
    brand: string[];
    price: number[];
    stock: number[];
    search: string[];
    sort: string[]
    view: string[]
}



interface IBascetLocalStorage {
  id: number
  price: number
  count: number
  total: number
  stock: number
}

interface IPromoList {
  count: number
  list: string[]
}


export { IitemDATA, IFilter, IBascetLocalStorage, IPromoList}