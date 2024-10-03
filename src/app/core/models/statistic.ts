export interface Statistic {
    storeId?: number,
    revenue: number,
    shippingCost: number,
    orderCount: number
}

export interface OrderCountStatistic {
    completedCount?: number,
    processingCount?: number,
    confirmedCount?: number,
    canceledCount?: number
}

export interface AdminDashboardInformation {
    totalPlatformRevenue: number;
    totalProductCount: number;
    totalShopCount: number;
    totalOrderCount: number;
}

export interface TopProductStatistic {
    topProductsByViewCount: ProductForTopProductStatistic[];
    topProductsBySale: ProductForTopProductStatistic[];
}

export interface ProductForTopProductStatistic {
    id: number,
    name: string,
    imgPath: string,
    numberOfSales: number,
    viewCount: number
}

export interface DailyRevenue {
    date: string;
    totalRevenue: number;
}

export interface StoreOverviewStatistic {
    totalProductCount: number;
    totalProductRatingCount: number;
}