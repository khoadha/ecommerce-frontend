import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProvinceService } from 'src/app/core/services/province.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrderService } from 'src/app/core/services/order.service';
import { CartService } from 'src/app/core/services/cart.service';
import { TokenApiModel } from 'src/app/core/models/token-api.model';
import { MenuItem, MessageService } from 'primeng/api';
import { ShippingPriceRequestDto } from 'src/app/core/models/shipping-price-request-dto';
import { SetupService } from 'src/app/core/services/setup.service';
import { GlobalSetting } from 'src/app/core/models/globalSetting';
import { PaymentService } from 'src/app/core/services/payment.service';
import { VoucherService } from 'src/app/core/services/voucher.service';
import { CartItem } from 'src/app/core/models/cartItem';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
  providers: [MessageService]
})
export class CheckOutComponent implements OnInit {

  dataSource: any[] = [];
  cartId!: number;
  cartItemIds: number[] = [];
  cartItems!: CartItem[];
  cartData: any;
  isLoading: boolean = true;
  maskLoading: boolean = false;
  listProvinces: any;
  listDistricts: any;
  listWards: any;
  selectedProvince: any;
  selectedDistrict: any;
  selectedWard: any;
  shippingPriceResponse: any;
  userDistrictId!: number;
  userWardCode!: string;
  userAddress!: string;
  tokenApi!: TokenApiModel;
  breadcrumbItems: MenuItem[] | undefined;
  globalSetting!: GlobalSetting;
  point: number = 0;
  isBuyNow: boolean = false;
   
  selectedShipOption: string = "cod";
  pointNeedToPayment: number=0;
  pointNeedToPaymentAfterCheckout: number=0;
  availableDiscountPoint: number = 0;

  total: number = 0;
  voucherCode!: string;

  constructor(private messageService: MessageService, private voucherService: VoucherService, private router: Router, private fb: FormBuilder, private setupService: SetupService, private cartService: CartService, private provinceService: ProvinceService, private authService: AuthService, private orderService: OrderService, private route: ActivatedRoute, private paymentService: PaymentService) { }

  ngOnInit() {
    this.setupService.getGlobalSetting().subscribe(res => {
       this.globalSetting = res;
    })
    this.paymentService.getWemadePoint(this.authService.getUserIdFromToken()).subscribe(res => {
      this.point = res;
    })
    const role = this.authService.getRoleFromToken();
    if (role === "User") {
      this.cartId = this.authService.getCartIdFromToken();
    }
    this.checkIsBuyNow();
    this.breadcrumbItems = [{ label: 'Thanh toán' }];
    this.loadProvincesData();
    const sessionCartData = sessionStorage.getItem('check-out-data');
    this.cartData = JSON.parse(sessionCartData!);
    for (const key in this.cartData) {
      if (this.cartData.hasOwnProperty(key)) {
        const items = this.cartData[key];
        items.forEach((item: any) => {
          this.cartItemIds.push(item.id);
        });
      }
    }
  }

  checkIsBuyNow(){
    const params = this.route.snapshot.queryParams;
    this.isBuyNow = params['option'] == 'buynow' ? true : false;
  }

  async onSubmitAddressData() {
    if (this.addressFormGroup.valid) {
      this.userAddress = [
        this.addressFormGroup.value.streetControl,
        this.selectedWard.WardName,
        this.selectedDistrict.DistrictName,
        this.selectedProvince.ProvinceName,
        'Việt Nam'
      ].join(',');
      this.userDistrictId = this.selectedDistrict.DistrictID;
      this.userWardCode = this.selectedWard.WardCode;
    }
    await this.loadDataSource();
  }

  onCheckVoucherAvailable() {
    this.voucherService.checkIsVoucherAvailableToUse(this.voucherCode, this.pointNeedToPayment * 1000).subscribe(res => {
      if (res.isAvailable != null) {
        if (res.isAvailable == false) {
          this.availableDiscountPoint = 0;
          this.pointNeedToPaymentAfterCheckout = this.pointNeedToPayment - this.availableDiscountPoint;
          this.showError();
        } else {
          this.availableDiscountPoint = Math.ceil(res.discountValue/1000);
          this.pointNeedToPaymentAfterCheckout = this.pointNeedToPayment - this.availableDiscountPoint;
          this.showSuccess()
        }
      } else {
        this.availableDiscountPoint = 0;
        this.pointNeedToPaymentAfterCheckout = this.pointNeedToPayment - this.availableDiscountPoint;
        this.showError();
      }
    })
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Áp dụng thành công', detail: 'Khuyến mãi bạn chọn đã được áp dụng!' });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Áp dụng thất bại', detail: 'Khuyến mãi bạn chọn chưa được áp dụng, hãy kiểm trả kĩ lại điều kiện sử dụng nhé!' });
  }

  removeFromCartAfterCheckout() {
    this.cartService.deleteItemFromCartAfterCheckout(this.cartItemIds).subscribe(res => {});
  }

  onConfirmOrder() {
    this.maskLoading = true;
    const orders: any[] = this.dataSource;
    for (const order of orders) {
      const totalCost = order.totalCost;
      const shippingCost = order.shippingPrice;
      const storeId = order.items[0].product.storeId;
      const customerId = this.authService.getUserIdFromToken();
      const phoneNumber = this.authService.getPhoneNumerFromToken();
      const userAddress = this.userAddress;
      const orderItems = order.items.map((item: any) => ({
        productId: item.product.id,
        quantity: item.quantity,
        cost: item.cost
      }));
      const orderData = {
        storeId: storeId,
        customerId: customerId,
        phoneNumber: phoneNumber,
        userAddress: userAddress,
        totalCost: totalCost,
        shippingCost: shippingCost,
        orderItems: orderItems,
        shipOption: this.selectedShipOption,
        pointToPayment: this.pointNeedToPaymentAfterCheckout,
        appliedVoucherCode: this.voucherCode
      };
      this.orderService.createOrder(orderData).subscribe(res => {});
    }
    localStorage.setItem('orderss', 'true')
    this.router.navigate(['order-success']);
    if(this.isBuyNow==false){
      this.removeFromCartAfterCheckout();
    }
  }

  async loadDataSource() {
    this.isLoading = true;
    for (let storeId in this.cartData) {
      let items = this.cartData[storeId];
      let storeImgPath = items[0].product.storeImgPath;
      let storeName = items[0].product.storeName;
      let districtId = items[0].product.districtId;
      let wardCode = items[0].product.wardCode;
      const shippingPriceRequestDto: ShippingPriceRequestDto = {
        from_district_id: districtId,
        from_ward_code: wardCode,
        service_id: 53320, // giao hang chuan service tier
        to_district_id: this.userDistrictId,
        to_ward_code: this.userWardCode,
        weight: 500 //assume that all item combined 0,5kg
      }

      // let shippingPriceResponse = await this.getShippingPrice(shippingPriceRequestDto);
      // let shippingPriceTemp = shippingPriceResponse.data.total;

      let shippingPrice = 0;

      let productsPrice = items.reduce((sum: any, item: { cost: any; }) => sum + item.cost, 0);

      let platformPrice = (productsPrice*this.globalSetting.platformFeePercent!)/100;

      let totalCost = productsPrice + shippingPrice + platformPrice;

      this.total += totalCost;

      this.pointNeedToPayment += Math.ceil(totalCost/1000);
      
      this.dataSource.push({
        items,
        storeImgPath,
        storeName,
        shippingPrice,
        productsPrice,
        platformPrice,
        totalCost,
        // shippingPriceTemp
      });
    }
    this.pointNeedToPaymentAfterCheckout = this.pointNeedToPayment - this.availableDiscountPoint;
    this.isLoading = false;
  }

  async getShippingPrice(dto: ShippingPriceRequestDto): Promise<any> {
    let response = await this.provinceService.calculateFee(dto).toPromise();
    return response;
  }

  addressFormGroup = this.fb.group({
    streetControl: ['', Validators.required],
    wardControl: ['', Validators.required],
    districtControl: ['', Validators.required],
    cityControl: ['', Validators.required],
  });

  isValidToUsePoint(): boolean {
    var isUsePoint = this.selectedShipOption==='wmp'
    if(!isUsePoint){
      return true;
    }
    return this.point - this.pointNeedToPaymentAfterCheckout > 0 && isUsePoint;
  }

  loadProvincesData() {
    this.provinceService.getProvinces().subscribe(res => {
      this.listProvinces = res.data;
    })
  }

  loadDistrictsData(selectedProvince: any) {
    this.selectedProvince = selectedProvince;
    this.provinceService.getDistrictsByProvinceCode(this.selectedProvince.ProvinceID).subscribe((res: any) => {
      this.listDistricts = res.data;
    });
  }

  loadWardsData(selectedDistrict: any) {
    this.selectedDistrict = selectedDistrict;
    this.provinceService.getWardsByDistrictCode(this.selectedDistrict.DistrictID).subscribe((res: any) => {
      this.listWards = res.data;
    });
  }

  onWardSelect(selectedWard: any) {
    this.selectedWard = selectedWard;
  }

  resetPage() {
    window.location.reload();
  }
}

