export const sideNavItems: Section[] = [
    // {
    //     name: 'Tổng quan',
    //     icon: 'dashboard',
    //     url: '/mdashboard'
    // },
    {
        name: 'Tổng quan',
        icon: 'storefront',
        url: '/mdashboard/store-manager'
    },
    {
        name: 'Quản lí đơn hàng',
        icon: 'inventory',
        url: '/mdashboard/order-manager',
    },
    {
        name: 'Quản lí sản phẩm',
        icon: 'list_alt_add',
        url: '/mdashboard/product-manager',
    },
    {
        name: 'Thêm sản phẩm',
        icon: 'post_add',
        url: '/mdashboard/add-product',
    },
    {
        name: 'Quản lí giao hàng',
        icon: 'local_shipping',
        url: '/mdashboard/delivery-manager',
    },
    {
        name: 'Tin nhắn',
        icon: 'forum',
        url: '/mdashboard/message-manager',
    },
    {
        name: 'Quản lí thanh toán',
        icon: 'request_quote',
        url: '/mdashboard/billing-manager',
    },
    {
        name: 'Chọn gói thanh toán',
        icon: 'request_quote',
        url: '/mdashboard/buy-billing-package',
    },
];

export interface Section {
    name?: string;
    icon?: string;
    url?: string;
}