

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
    search: string;
}


export { IitemDATA, IFilter}
