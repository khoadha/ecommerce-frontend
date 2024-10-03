import { Store } from "./store";

export interface Bidding {
    fromPrice?: number;
    toPrice?: number;
    createdDate?: any;
    completedDate?: any;
    quantity?: number;
    imageUrl?: string;
    note?: string;
    isDone?: boolean;
    customerId?: string;
    id?: number;
    unitOfMeasure?: string
}

export interface GetAuctioneersByBiddingDto {
    id?: number;
    completedTime?: any;
    price?: number;
    biddingId?: number;
    percentOfComplete?: number;
    isChosen?: boolean;
    storeId?: number;
    storeName?: string;
    storeImgPath?: string;
    listImages?: string[]
}