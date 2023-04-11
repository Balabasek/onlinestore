import { stringObject} from './_type'

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
}


export { IitemDATA, IFilter}


// import { option } from './_type'

// interface ISource {
//     category: string;
//     country: string;
//     description: string;
//     id: string;
//     language: string;
//     name: string;
//     url: string;
// }

// interface INews {
//     author: string;
//     content: string;
//     description: string;
//     publishedAt: string;
//     source: {
//         id: string,
//         name: string
//     };
//     title: string;
//     url: string;
//     urlToImage: string;
// }

// interface IGetResp {
//     endpoint: string;
//     options?: Partial<option>;
// }


// interface IDrawSources {
//     status: string;
//     sources: ISource[];
// }

// interface IdrawNews {
//     status: string;
//     totalResults: number;
//     articles: INews[];

// }

// interface IdrawNewsError {
//     status: string;
//     code: string;
//     message: string;
// }
