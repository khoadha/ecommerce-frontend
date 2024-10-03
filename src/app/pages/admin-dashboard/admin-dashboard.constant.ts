export const sideNavItems: Section[] = [
    {
        name: 'Dashboard',
        icon: 'dashboard',
        url: '/adashboard'
    },
    {
        name: 'Quản lí cửa hàng',
        icon: 'store',
        url: '/adashboard/manage-store',
    },
    // {
    //     name: 'Quản lí sản phẩm',
    //     icon: 'inventory',
    //     url: '/adashboard/manage-product',
    // },
    {
        name: 'Quản lí tài khoản',
        icon: 'man',
        url: '/adashboard/manage-customer',
    },
    {
        name: 'Quản lí voucher',
        icon: 'confirmation_number',
        url: '/adashboard/manage-voucher',
    },
    {
        name: 'Quản lí banner',
        icon: 'photo',
        url: '/adashboard/manage-banner',
    },
    {
        name: 'Quản lí giao dịch',
        icon: 'currency_exchange',
        url: '/adashboard/manage-transaction',
    },
    {
        name: 'Quản lí đơn từ',
        icon: 'mail',
        url: '/adashboard/manage-letter',
    },
    {
        name: 'Quản lí danh mục',
        icon: 'category',
        url: '/adashboard/manage-category',
    },
    {
        name: 'Quản lí thanh toán',
        icon: 'money',
        url: '/adashboard/manage-billing',
    },
];

export interface Section {
    name?: string;
    icon?: string;
    url?: string;
}