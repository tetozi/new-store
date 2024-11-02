export interface Category {
    _id : string,
    name: string
    products:[Product]
}


export interface Product {
    _id: string;
    name: string;
    imageUrl: string;
    price: number;
    description: string;
    quantity:number;  
}