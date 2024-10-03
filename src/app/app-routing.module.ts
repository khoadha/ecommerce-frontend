import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CartComponent } from './features/cart/cart.component';
import { StoreManagerComponent } from './pages/manager-dashboard/store-manager/store-manager.component';
import {
  adminGuard,
  authGuard,
  managerGuard,
  signUpStoreGuard,
  signedInGuard,
} from './core/guards/auth.guard';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AddProductFormComponent } from './pages/manager-dashboard/add-product-form/add-product-form.component';
import { StoreDetailComponent } from './pages/store-detail/store-detail.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { MyOrderComponent } from './pages/my-order/my-order.component';
import { OrderManagerComponent } from './pages/manager-dashboard/order-manager/order-manager.component';
import { SignUpStoreComponent } from './pages/sign-up-store/sign-up-store.component';
import { ManagerDashboardComponent } from './pages/manager-dashboard/manager-dashboard.component';
import { TermOfUseComponent } from './pages/term-of-use/term-of-use.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ManageStoreComponent } from './pages/admin-dashboard/manage-store/manage-store.component';
import { ManageCustomerComponent } from './pages/admin-dashboard/manage-customer/manage-customer.component';
import { HomeComponent } from './pages/admin-dashboard/home/home.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ManageVoucherComponent } from './pages/admin-dashboard/manage-voucher/manage-voucher.component';
import { ManageBannerComponent } from './pages/admin-dashboard/manage-banner/manage-banner.component';
import { ManageProductComponent } from './pages/admin-dashboard/manage-product/manage-product.component';
import { ManageLetterComponent } from './pages/admin-dashboard/manage-letter/manage-letter.component';
import { ManageCategoriesComponent } from './pages/admin-dashboard/manage-categories/manage-categories.component';
import { BiddingComponent } from './pages/bidding/bidding.component';
import { DiyKitComponent } from './pages/diy-kit/diy-kit.component';
import { HandworkComponent } from './pages/handwork/handwork.component';
import { ProductManagerComponent } from './pages/manager-dashboard/product-manager/product-manager.component';
import { DeliveryManagerComponent } from './pages/manager-dashboard/delivery-manager/delivery-manager.component';
import { MessageManagerComponent } from './pages/manager-dashboard/message-manager/message-manager.component';
import { BiddingManagerComponent } from './pages/manager-dashboard/bidding-manager/bidding-manager.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { ConfirmEmailSuccessComponent } from './pages/confirm-email-success/confirm-email-success.component';
import { CheckEmailComponent } from './pages/check-email/check-email.component';
import { InstructionPageComponent } from './pages/instruction-page/instruction-page.component';
import { ResetPasswordSuccessComponent } from './pages/reset-password-success/reset-password-success.component';
import { ChattingComponent } from './pages/chatting/chatting.component';
import { CreateBiddingComponent } from './pages/create-bidding/create-bidding.component';
import { WemadePayComponent } from './pages/wemade-pay/wemade-pay.component';
import { ManageProfileComponent } from './pages/manage-profile/manage-profile.component';
import { PaymentRedirectComponent } from './features/payment-redirect/payment-redirect.component';
import { PaymentSuccessComponent } from './pages/payment-success/payment-success.component';
import { OrderSuccessComponent } from './pages/order-success/order-success.component';
import { BiddingDetailComponent } from './pages/bidding-detail/bidding-detail.component';
import { ManageTransactionComponent } from './pages/admin-dashboard/manage-transaction/manage-transaction.component';
import { ManageBillingComponent } from './pages/admin-dashboard/manage-billing/manage-billing.component';
import { BillingManagerComponent } from './pages/manager-dashboard/billing-manager/billing-manager.component';
import { BuyBillingPackageComponent } from './pages/manager-dashboard/buy-billing-package/buy-billing-package.component';
const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title:
      'Wemade - Nền tảng thương mại điện tử đến từ Việt Nam dành cho sản phẩm Handmade',
  },
  {
    path: 'instruction-page',
    component: InstructionPageComponent,
    title: 'Hướng dẫn mua hàng Wemade',
  },
  {
    path: 'chatting',
    component: ChattingComponent,
    title: 'Nhắn tin',
    canActivate: [authGuard],
  },
  {
    path: 'term-of-use',
    component: TermOfUseComponent,
    title: 'Điều khoản sử dụng Wemade',
  },
  {
    path: 'store-detail/:id',
    component: StoreDetailComponent,
    title: 'Chi tiết cửa hàng ',
  },
  {
    path: 'product-detail/:id',
    component: ProductDetailComponent,
    title: 'Chi tiết sản phẩm',
  },
  { path: 'search', component: SearchPageComponent, title: 'Wemade tìm kiếm' },
  { path: 'diy-kit', component: DiyKitComponent, title: 'Wemade DIY Kit' },
  { path: 'handwork', component: HandworkComponent, title: 'Wemade Handmade' },
  {
    path: 'check-out',
    component: CheckOutComponent,
    title: 'Thanh toán',
    canActivate: [authGuard],
  },
  {
    path: 'pcb',
    component: PaymentRedirectComponent,
    canActivate: [authGuard],
  },
  {
    path: 'order-success',
    component: OrderSuccessComponent,
    title: 'Khởi tạo đơn hàng thành công!',
    canActivate: [authGuard],
  },
  {
    path: 'payment-success',
    component: PaymentSuccessComponent,
    title: 'Thanh toán thành công',
    canActivate: [authGuard],
  },
  {
    path: 'wemade-pay',
    component: WemadePayComponent,
    title: 'Ví điện tử WemadePay',
    canActivate: [authGuard],
  },
  {
    path: 'manage-profile',
    component: ManageProfileComponent,
    title: 'Tài khoản của tôi',
    canActivate: [authGuard],
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'Giỏ hàng',
    canActivate: [authGuard],
  },
  { path: 'bidding', 
    component: BiddingComponent, 
    title: 'Wemade đấu giá' 
  },
  { path: 'bidding-detail/:id', 
    component: BiddingDetailComponent, 
    title: 'Chi tiết đấu giá' 
  },
  {
    path: 'create-bidding',
    component: CreateBiddingComponent,
    title: 'Tạo yêu cầu đấu giá',
    canActivate: [authGuard],
  },
  {
    path: 'my-order',
    component: MyOrderComponent,
    title: 'Đơn hàng của tôi',
    canActivate: [authGuard],
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    title: 'Wemade Đăng nhập',
    canActivate: [signedInGuard],
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    title: 'Wemade Đăng kí',
    canActivate: [signedInGuard],
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    title: 'Wemade Quên mật khẩu',
    canActivate: [signedInGuard],
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    title: 'Wemade Đặt lại mật khẩu',
    canActivate: [signedInGuard],
  },
  {
    path: 'reset-password-success',
    component: ResetPasswordSuccessComponent,
    title: 'Đã đặt lại mật khẩu thành công',
    canActivate: [signedInGuard],
  },
  {
    path: 'check-register-email',
    component: ConfirmEmailComponent,
    canActivate: [signedInGuard],
  },
  {
    path: 'check-email',
    component: CheckEmailComponent,
    canActivate: [signedInGuard],
  },
  {
    path: 'confirm-email',
    component: ConfirmEmailSuccessComponent,
    title: 'Đã xác nhận email thành công',
    canActivate: [signedInGuard],
  },
  {
    path: 'sign-up-store',
    component: SignUpStoreComponent,
    title: 'Wemade Đăng kí cửa hàng',
    canActivate: [signUpStoreGuard],
  },
  {
    path: 'mdashboard',
    component: ManagerDashboardComponent,
    canActivate: [managerGuard],
    children: [
      {
        path: 'store-manager',
        component: StoreManagerComponent,
        canActivate: [managerGuard],
      },
      {
        path: 'product-manager',
        component: ProductManagerComponent,
        canActivate: [managerGuard],
      },
      {
        path: 'order-manager',
        component: OrderManagerComponent,
        canActivate: [managerGuard],
      },
      {
        path: 'add-product',
        component: AddProductFormComponent,
        canActivate: [managerGuard],
      },
      {
        path: 'delivery-manager',
        component: DeliveryManagerComponent,
        canActivate: [managerGuard],
      },
      {
        path: 'message-manager',
        component: MessageManagerComponent,
        canActivate: [managerGuard],
      },
      {
        path: 'billing-manager',
        component: BillingManagerComponent,
        canActivate: [managerGuard],
      },
      {
        path: 'buy-billing-package',
        component: BuyBillingPackageComponent,
        canActivate: [managerGuard],
      },
    ],
  },
  {
    path: 'adashboard',
    component: AdminDashboardComponent,
    canActivate: [adminGuard],
    children: [
      { path: '', component: HomeComponent, canActivate: [adminGuard] },
      {
        path: 'manage-store',
        component: ManageStoreComponent,
        canActivate: [adminGuard],
      },
      {
        path: 'manage-voucher',
        component: ManageVoucherComponent,
        canActivate: [adminGuard],
      },
      {
        path: 'manage-transaction',
        component: ManageTransactionComponent,
        canActivate: [adminGuard],
      },
      {
        path: 'manage-customer',
        component: ManageCustomerComponent,
        canActivate: [adminGuard],
      },
      {
        path: 'manage-product',
        component: ManageProductComponent,
        canActivate: [adminGuard],
      },
      {
        path: 'manage-banner',
        component: ManageBannerComponent,
        canActivate: [adminGuard],
      },
      {
        path: 'manage-letter',
        component: ManageLetterComponent,
        canActivate: [adminGuard],
      },
      {
        path: 'manage-category',
        component: ManageCategoriesComponent,
        canActivate: [adminGuard],
      },
      {
        path: 'manage-billing',
        component: ManageBillingComponent,
        canActivate: [adminGuard],
      },
    ],
  },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
