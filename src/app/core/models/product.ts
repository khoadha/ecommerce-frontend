export interface Product {
    cost?: number;
    id: number;
    name: string;
    imgPath: string;
    price: number;
    storeId: number;
    isSoldOut: boolean;
    numberOfSales: number;
    storeImgPath:string;
    storeName:string;
    description: string;
}

export interface ProductRatingData {
    averageRating: number;
    totalRating: number;
}