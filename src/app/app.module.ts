import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './features/header/header.component';
import { FooterComponent } from './features/footer/footer.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { MatDividerModule } from '@angular/material/divider';
import { ListProductsComponent } from './features/list-products/list-products.component';
import { CartComponent } from './features/cart/cart.component';
import { ListStoresComponent } from './features/list-stores/list-stores.component';
import { StoreManagerComponent } from './pages/manager-dashboard/store-manager/store-manager.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { MatTabsModule } from '@angular/material/tabs';
import { PlatformModule } from '@angular/cdk/platform';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateProductFormComponent } from './shared/update-product-form/update-product-form.component';
import { AddProductFormComponent } from './pages/manager-dashboard/add-product-form/add-product-form.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { StoreDetailComponent } from './pages/store-detail/store-detail.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { ProductDetailDialogComponent } from './shared/product-detail-dialog/product-detail-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CdkTreeModule } from '@angular/cdk/tree';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MyOrderComponent } from './pages/my-order/my-order.component';
import { OrderManagerComponent } from './pages/manager-dashboard/order-manager/order-manager.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSidenavModule } from '@angular/material/sidenav';
import { StatisticDialogComponent } from './shared/statistic-dialog/statistic-dialog.component';
import { SignUpStoreComponent } from './pages/sign-up-store/sign-up-store.component';
import { ManagerDashboardComponent } from './pages/manager-dashboard/manager-dashboard.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TermOfUseComponent } from './pages/term-of-use/term-of-use.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ManageCustomerComponent } from './pages/admin-dashboard/manage-customer/manage-customer.component';
import { ManageStoreComponent } from './pages/admin-dashboard/manage-store/manage-store.component';
import { HomeComponent } from './pages/admin-dashboard/home/home.component';
import { LineChartComponent } from './features/charts/line-chart/line-chart.component';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { BarChartComponent } from './features/charts/bar-chart/bar-chart.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ListCouponsComponent } from './features/list-coupons/list-coupons.component';
import { CarouselModule } from 'primeng/carousel';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { VndCurrencyPipePipe } from './core/pipes/vnd-currency-pipe.pipe';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { BreadcrumbComponent } from './features/breadcrumb/breadcrumb.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { ManageVoucherComponent } from './pages/admin-dashboard/manage-voucher/manage-voucher.component';
import { ManageBannerComponent } from './pages/admin-dashboard/manage-banner/manage-banner.component';
import { ManageProductComponent } from './pages/admin-dashboard/manage-product/manage-product.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { ManageLetterComponent } from './pages/admin-dashboard/manage-letter/manage-letter.component';
import { ManageCategoriesComponent } from './pages/admin-dashboard/manage-categories/manage-categories.component';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { GalleriaModule } from 'primeng/galleria';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ImageModule } from 'primeng/image';
import { FieldsetModule } from 'primeng/fieldset';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CalendarModule } from 'primeng/calendar';
import { BiddingComponent } from './pages/bidding/bidding.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { HandworkComponent } from './pages/handwork/handwork.component';
import { DiyKitComponent } from './pages/diy-kit/diy-kit.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { LoaderComponent } from './shared/loader/loader.component';
import { MessagesModule } from 'primeng/messages';
import { TagModule } from 'primeng/tag';
import { ProductManagerComponent } from './pages/manager-dashboard/product-manager/product-manager.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AccordionModule } from 'primeng/accordion';
import { DeliveryManagerComponent } from './pages/manager-dashboard/delivery-manager/delivery-manager.component';
import { DataViewModule } from 'primeng/dataview';
import { TooltipModule } from 'primeng/tooltip';
import { MessageManagerComponent } from './pages/manager-dashboard/message-manager/message-manager.component';
import { BiddingManagerComponent } from './pages/manager-dashboard/bidding-manager/bidding-manager.component';
import { OrderDetailDialogComponent } from './shared/order-detail-dialog/order-detail-dialog.component';
import { PaginatorModule } from 'primeng/paginator';
import { RequestAiDialogComponent } from './shared/request-ai-dialog/request-ai-dialog.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { ConfirmEmailSuccessComponent } from './pages/confirm-email-success/confirm-email-success.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { CheckEmailComponent } from './pages/check-email/check-email.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { EditorModule } from 'primeng/editor';
import { RichTextToHtmlPipe } from './core/pipes/rich-text-to-html.pipe';
import { ChipModule } from 'primeng/chip';
import { InstructionPageComponent } from './pages/instruction-page/instruction-page.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { ResetPasswordSuccessComponent } from './pages/reset-password-success/reset-password-success.component';
import { ChattingComponent } from './pages/chatting/chatting.component';
import { CreateBiddingComponent } from './pages/create-bidding/create-bidding.component';
import { ListBiddingsComponent } from './features/list-biddings/list-biddings.component';
import { ChatInputComponent } from './shared/chat-input/chat-input.component';
import { MessageDialogComponent } from './shared/message-dialog/message-dialog.component';
import { WemadePayComponent } from './pages/wemade-pay/wemade-pay.component';
import { PaymentRedirectComponent } from './features/payment-redirect/payment-redirect.component';
import { PaymentSuccessComponent } from './pages/payment-success/payment-success.component';
import { ManageProfileComponent } from './pages/manage-profile/manage-profile.component';
import { TabViewModule } from 'primeng/tabview';
import { OrderSuccessComponent } from './pages/order-success/order-success.component';
import { BiddingDetailComponent } from './pages/bidding-detail/bidding-detail.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ManageTransactionComponent } from './pages/admin-dashboard/manage-transaction/manage-transaction.component';
import { ChipsModule } from 'primeng/chips';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { ReportDialogComponent } from './shared/report-dialog/report-dialog.component';
import { AddFeedbackDialogComponent } from './shared/add-feedback-dialog/add-feedback-dialog.component';
import { RatingModule } from 'primeng/rating';
import { ManageBillingComponent } from './pages/admin-dashboard/manage-billing/manage-billing.component';
import { BillingManagerComponent } from './pages/manager-dashboard/billing-manager/billing-manager.component';
import { BuyBillingPackageComponent } from './pages/manager-dashboard/buy-billing-package/buy-billing-package.component';

@NgModule({
  imports: [
    NgxEchartsModule.forRoot({
      echarts,
    }),
    ReactiveFormsModule,
    BrowserModule,
    CKEditorModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatDividerModule,
    MatTableModule,
    MatTabsModule,
    PlatformModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    CdkTreeModule,
    MatListModule,
    MatBadgeModule,
    MatSidenavModule,
    MatButtonToggleModule,
    CarouselModule,
    BreadcrumbModule,
    InputNumberModule,
    CheckboxModule,
    MultiSelectModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    DividerModule,
    MenuModule,
    DialogModule,
    GalleriaModule,
    ScrollTopModule,
    FieldsetModule,
    ImageModule,
    ToggleButtonModule,
    CalendarModule,
    InputTextareaModule,
    RadioButtonModule,
    MessagesModule,
    TagModule,
    DynamicDialogModule,
    InputSwitchModule,
    AccordionModule,
    DataViewModule,
    TooltipModule,
    PaginatorModule,
    ToastModule,
    ToolbarModule,
    ConfirmDialogModule,
    FileUploadModule,
    EditorModule,
    ChipModule,
    CardModule,
    PasswordModule,
    TabViewModule,
    ProgressBarModule,
    SliderModule,
    AutoCompleteModule,
    ChipsModule,
    ClipboardModule,
    RatingModule,
    
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    SignInComponent,
    SignUpComponent,
    ListProductsComponent,
    CartComponent,
    ListStoresComponent,
    StoreManagerComponent,
    AdminDashboardComponent,
    UpdateProductFormComponent,
    AddProductFormComponent,
    ConfirmDialogComponent,
    StoreDetailComponent,
    CheckOutComponent,
    ProductDetailDialogComponent,
    MyOrderComponent,
    OrderManagerComponent,
    StatisticDialogComponent,
    SignUpStoreComponent,
    ManagerDashboardComponent,
    TermOfUseComponent,
    PageNotFoundComponent,
    ManageCustomerComponent,
    ManageStoreComponent,
    HomeComponent,
    LineChartComponent,
    BarChartComponent,
    ProductDetailComponent,
    ListCouponsComponent,
    VndCurrencyPipePipe,
    SearchPageComponent,
    BreadcrumbComponent,
    ManageVoucherComponent,
    ManageBannerComponent,
    ManageProductComponent,
    ManageLetterComponent,
    ManageCategoriesComponent,
    BiddingComponent,
    HandworkComponent,
    DiyKitComponent,
    LoaderComponent,
    ProductManagerComponent,
    DeliveryManagerComponent,
    MessageManagerComponent,
    BiddingManagerComponent,
    OrderDetailDialogComponent,
    RequestAiDialogComponent,
    ConfirmEmailComponent,
    ConfirmEmailSuccessComponent,
    CheckEmailComponent,
    RichTextToHtmlPipe,
    InstructionPageComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ResetPasswordSuccessComponent,
    ChattingComponent,
    CreateBiddingComponent,
    ListBiddingsComponent,
    ChatInputComponent,
    MessageDialogComponent,
    WemadePayComponent,
    PaymentRedirectComponent,
    PaymentSuccessComponent,
    ManageProfileComponent,
    OrderSuccessComponent,
    BiddingDetailComponent,
    ManageTransactionComponent,
    ReportDialogComponent,
    AddFeedbackDialogComponent,
    ManageBillingComponent,
    BillingManagerComponent,
    BuyBillingPackageComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
