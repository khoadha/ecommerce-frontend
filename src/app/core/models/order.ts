export interface Order {
    id?: number;
    userAddress: string;
    shippingCost: number;
    totalCost: number;
    customerId?: string;
    customerName?: string;
    storeId: number;
    orderItems?: any;
    orderDate?: any;
    shipDate?: any;
    storeName?: string;
    status?: number;
    isPaid?: boolean;
}


export interface OrderItems {
    Id: number;
    OrderId: number;
    ProductId: number;
    Quantity: number;
    Cost: number;
}
