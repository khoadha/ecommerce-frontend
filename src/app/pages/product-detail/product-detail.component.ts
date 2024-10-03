import { HttpParams } from '@angular/common/http';
import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Paginator } from 'primeng/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Cart } from 'src/app/core/models/cart';
import { Category } from 'src/app/core/models/category';
import { GetFeedbackDto } from 'src/app/core/models/feedback';
import { Material } from 'src/app/core/models/material';
import { Product, ProductRatingData } from 'src/app/core/models/product';
import { Store } from 'src/app/core/models/store';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { CategoryAndMaterialService } from 'src/app/core/services/category-and-service.service';
import { FeedbackService } from 'src/app/core/services/feedback.service';
import { ProductService } from 'src/app/core/services/product.service';
import { StoreService } from 'src/app/core/services/store.service';
import { AddFeedbackDialogComponent } from 'src/app/shared/add-feedback-dialog/add-feedback-dialog.component';
import { ReportDialogComponent } from 'src/app/shared/report-dialog/report-dialog.component';
import { StoreOverviewStatistic } from 'src/app/core/models/statistic';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [DialogService, DynamicDialogRef, DynamicDialogConfig, MessageService]
})
export class ProductDetailComponent implements OnInit {

  @ViewChild('paginator', { static: true }) paginator!: Paginator;
  role!: string;
  cartId!: number;
  cart!: Cart;
  product!: Product;
  maskLoading: boolean = false;
  categories: Category[] = [];
  materials: Material[] = [];
  showToolbar!: boolean;
  quantityValue: number = 1;
  productId!: number;
  breadcrumbItems: MenuItem[] | undefined;
  images: any[] | undefined;
  responsiveOptions: any[] | undefined;
  appListProducts: Product[] = [];
  imagesData: any[] = [];
  store!: Store;
  ratingData!: ProductRatingData;
  storeOverviewStatistic!: StoreOverviewStatistic;

  feedbacks: GetFeedbackDto[] = [];
  offset: number = 0;
  size: number = 5;
  totalFeedbacks: number = 0;

  constructor(
    private messageService: MessageService,
    private dialogService: DialogService,
    private ref: DynamicDialogRef,
    private storeService: StoreService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryAndMaterialService,
    private feedbackService: FeedbackService
  ) { }

  ngOnInit(): void {
    this.initUserInfo();
    this.maskLoading = true;
    this.route.paramMap.subscribe((params) => {
      const idFromRoute = params.get('id')!;
      this.productId = parseInt(idFromRoute, 10);
      this.productService
        .getProductImagesById(this.productId)
        .subscribe((res) => {
          res.images.forEach((element: string) => {
            var data = {
              itemImageSrc: element,
              thumbnailImageSrc: element,
              alt: 'Hình ảnh sản phẩm',
              title: '',
            };
            this.imagesData.push(data);
          });
          this.images = this.imagesData;
        });
      this.productService.getProductById(this.productId).subscribe((res) => {
        this.product = res;
        this.categoryService
          .getCategoriesByProductId(this.product.id)
          .subscribe((res) => {
            this.categories = res;
          });
        this.categoryService
          .getMaterialsByProductId(this.product.id)
          .subscribe((res) => {
            this.materials = res;
          });
        this.storeService
          .getStoreById(this.product.storeId)
          .subscribe((res) => {
            this.store = res;
          });
          this.storeService.getStoreOverviewStatistic(this.product.storeId).subscribe(res => {
            this.storeOverviewStatistic = res;
          })
        this.productService.getProductRatingData(this.product.id).subscribe(res => {
          this.ratingData = res;
        })
        this.breadcrumbItems = [{ label: 'Sản phẩm' }, { label: res.name }];
      });
      this.productService.getAllProductsForUser(12).subscribe((res) => {
        this.appListProducts = res;
      });
    });
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 5,
      },
      {
        breakpoint: '768px',
        numVisible: 3,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
      },
    ];
    this.getFeedbacks();
    this.maskLoading = false;
  }

  initUserInfo() {
    this.role = this.authService.getRoleFromToken();
    if (this.role === 'User') {
      this.cartId = this.authService.getCartIdFromToken();
      this.cartService.getCartById(this.cartId).subscribe((res) => {
        this.cart = res;
      });
    }
  }

  onClickReport() {
    this.ref = this.dialogService.open(ReportDialogComponent, {
      header: 'Báo cáo/Khiếu nại sản phẩm',
      width: '30%',
      contentStyle: { "max-height": "600px", "overflow": "auto" },
      baseZIndex: 10000,
      data: {
        productData: `Báo cáo/khiếu nại sản phẩm (#${this.productId}) ${this.product.name}`
      }
    });
    this.ref.onClose.subscribe((data) => {
      if (data) {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Gửi báo cáo/khiếu nại sản phẩm thành công!' });
      } else {
        return;
      }
    });
  }

  onAttempSubmitFeedback() {
    const userId = this.authService.getUserIdFromToken();
    if (userId == undefined) {
      this.router.navigate(['sign-in'], { queryParams: { redirectUrl: `/product-detail/${this.productId}` } });
    } else {
      this.feedbackService.isAvailableToAddFeedback(this.productId, userId).subscribe(res => {
        if (res.data == true) {
          this.openFeedbackDialog();
        } else {
          this.messageService.add({ severity: 'info', summary: 'Chưa mua sản phẩm', detail: 'Bạn hãy mua sản phẩm sau đó quay lại và cho chúng tôi biết về trải nghiệm nhé!!' });
        }
      })
    }
  }

  openFeedbackDialog() {
    this.ref = this.dialogService.open(AddFeedbackDialogComponent, {
      header: 'Đánh giá sản phẩm ' + `(#${this.productId}) ${this.product.name}`,
      width: '40%',
      contentStyle: { "max-height": "600px", "overflow": "auto" },
      baseZIndex: 10000,
      data: {
        productData: `${this.productId}`
      }
    });
    this.ref.onClose.subscribe((data) => {
      if (data) {
        this.getFeedbacks();
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Gửi đánh giá sản phẩm thành công!' });
      } else {
        return;
      }
    });
  }

  onAddToCart(itemId: number, itemName: string) {
    if (this.role == 'User') {
      const existingItem = this.cart.items.find(
        (item) => item.product.id === itemId
      );
      if (existingItem) {
        let params = new HttpParams();
        params = params.append('itemId', existingItem.id);
        params = params.append('value', this.quantityValue);
        params = params.append('isIncrease', true);
        const requestOptions = { params: params };
        this.cartService
          .increaseQuantity(requestOptions)
          .subscribe((noContent) => {
            this.openSnackBar(`Số lượng của ${itemName} đă được tăng`, 'Ẩn');
          });
      } else {
        this.cartService.addItemToCart(this.cartId, itemId).subscribe((res) => {
          this.cart = res;
          this.openSnackBar(`${itemName} đã được thêm vào giỏ`, 'Ẩn');
        });
      }
    } else if (this.role == undefined) {
      this.router.navigate(['sign-in'], { queryParams: { redirectUrl: `/product-detail/${itemId}` } });
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  getFeedbacks() {
    this.feedbackService.getFeedbacksByProductId(this.productId, this.offset).subscribe((res) => {
      this.feedbacks = res.data;
      this.totalFeedbacks = res.total;
    });
  }

  onPageChange(e: PageEvent) {
    this.offset = e.page;
    this.getFeedbacks();
  }

  onClickViewStore() {
    window.open('/store-detail/' + this.store.id, '_blank');
  }

  onClickOpenChatting() {
    this.router.navigate(['chatting'], {
      queryParams: { q: this.store.storeEmail },
    });
  }

  onClickBuyNow() {
    var product = this.product;
    if (this.role == 'User') {
      var productData = [
        {
          cost: product.price * this.quantityValue,
          quantity: this.quantityValue,
          product: product,
        },
      ];
      var data = { 0: productData } as Record<number, any>;
      sessionStorage.removeItem('check-out-data');
      sessionStorage.setItem('check-out-data', JSON.stringify(data));
      this.router.navigate(['check-out'], {
        queryParams: { option: 'buynow' },
      });
    } else if (this.role == undefined) {
      this.router.navigate(['sign-in'], { queryParams: { redirectUrl: `/product-detail/${product.id}` } });
    }
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const threshold = 400;
    this.showToolbar = window.scrollY > threshold;
  }
}

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
