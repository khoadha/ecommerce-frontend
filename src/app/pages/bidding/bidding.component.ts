import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Bidding } from 'src/app/core/models/bidding';
import { Product } from 'src/app/core/models/product';
import { ArService } from 'src/app/core/services/ar.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { BiddingService } from 'src/app/core/services/bidding.service';
import { ProductService } from 'src/app/core/services/product.service';
import { UserStoreService } from 'src/app/core/services/user-store.service';
import { RequestAiDialogComponent } from 'src/app/shared/request-ai-dialog/request-ai-dialog.component';

@Component({
  selector: 'app-bidding',
  templateUrl: './bidding.component.html',
  styleUrls: ['./bidding.component.css'],
  providers:[DialogService, DynamicDialogRef,DynamicDialogConfig]
})
export class BiddingComponent implements OnInit {

  loading: boolean =false;
  public role!: string[];
  listProduct: Product[]=[];
  biddingList!: Bidding[];
  breadcrumbItems: MenuItem[] | undefined;
  maskLoading: boolean = false;

  constructor(
    private productService: ProductService, private router: Router,private auth: AuthService, private userStore: UserStoreService, private biddingService: BiddingService) {
  }

  ngOnInit(): void {
    this.maskLoading = true;
    this.biddingService.getAllBiddings(8).subscribe(res => {
      this.biddingList = res;
    })
    this.breadcrumbItems = [{ label: 'Đấu giá' }];
    this.userStore.getRoleFromStore()
      .subscribe(val => {
        const roleFromToken = this.auth.getRoleFromToken();
        this.role = val || roleFromToken;
      })
      this.productService.getAllProductsForUser(10).subscribe(res => {
        this.listProduct = res;
        this.maskLoading = false;
      })
  }


  // initializeBidData(){
  //   this.bidList = [
  //     {
  //       shopName: "Giả lập cửa hàng",
  //       bidPrice: 2000,
  //       completeDate: new Date(),
  //       levelOfFinish: 89,
  //       images: [
  //         "https://www.chapi.vn/img/product/2017/8/26/vong-tay-handmade-day-da-kem-da-new.jpg",
  //         "https://www.chapi.vn/img/product/2017/8/26/vong-tay-handmade-day-da-kem-da-new.jpg",
  //         "https://www.chapi.vn/img/product/2017/8/26/vong-tay-handmade-day-da-kem-da-new.jpg",
  //       ]
  //     },
  //     {
  //       shopName: "Giả lập cửa hàng",
  //       bidPrice: 3000,
  //       completeDate: new Date(),
  //       levelOfFinish: 89,
  //       images: [
  //         "https://www.chapi.vn/img/product/2017/8/26/vong-tay-handmade-day-da-kem-da-new.jpg",
  //         "https://www.chapi.vn/img/product/2017/8/26/vong-tay-handmade-day-da-kem-da-new.jpg",
  //         "https://www.chapi.vn/img/product/2017/8/26/vong-tay-handmade-day-da-kem-da-new.jpg",
  //       ]
  //     },
  //     {
  //       shopName: "Giả lập cửa hàng",
  //       bidPrice: 4000,
  //       completeDate: new Date(),
  //       levelOfFinish: 89,
  //       images: [
  //         "https://www.chapi.vn/img/product/2017/8/26/vong-tay-handmade-day-da-kem-da-new.jpg",
  //         "https://www.chapi.vn/img/product/2017/8/26/vong-tay-handmade-day-da-kem-da-new.jpg",
  //         "https://www.chapi.vn/img/product/2017/8/26/vong-tay-handmade-day-da-kem-da-new.jpg",
  //       ]
  //     },
  //     {
  //       shopName: "Giả lập cửa hàng",
  //       bidPrice: 3700,
  //       completeDate: new Date(),
  //       levelOfFinish: 89,
  //       images: [
  //         "https://www.chapi.vn/img/product/2017/8/26/vong-tay-handmade-day-da-kem-da-new.jpg",
  //         "https://www.chapi.vn/img/product/2017/8/26/vong-tay-handmade-day-da-kem-da-new.jpg",
  //         "https://www.chapi.vn/img/product/2017/8/26/vong-tay-handmade-day-da-kem-da-new.jpg",
  //       ]
  //     },
  //     {
  //       shopName: "Giả lập cửa hàng",
  //       bidPrice: 1200,
  //       completeDate: new Date(),
  //       levelOfFinish: 89,
  //       images: [
  //         "https://www.chapi.vn/img/product/2017/8/26/vong-tay-handmade-day-da-kem-da-new.jpg",
  //         "https://www.chapi.vn/img/product/2017/8/26/vong-tay-handmade-day-da-kem-da-new.jpg",
  //         "https://www.chapi.vn/img/product/2017/8/26/vong-tay-handmade-day-da-kem-da-new.jpg",
  //       ]
  //     },
  //     {
  //       shopName: "Giả lập cửa hàng",
  //       bidPrice: 8000,
  //       completeDate: new Date(),
  //       levelOfFinish: 89,
  //       images: [
  //         "https://www.chapi.vn/img/product/2017/8/26/vong-tay-handmade-day-da-kem-da-new.jpg",
  //         "https://www.chapi.vn/img/product/2017/8/26/vong-tay-handmade-day-da-kem-da-new.jpg",
  //         "https://www.chapi.vn/img/product/2017/8/26/vong-tay-handmade-day-da-kem-da-new.jpg",
  //       ]
  //     },
  //   ]
  // }
  
  onClickBidding(){
    if(this.role==undefined){
      this.router.navigate(['sign-in']);
    } else {
      this.router.navigate(['bidding']);
    }
  }

  format = (value: number) => {
    return value.toString().padStart(2, '0');
  };

}
