import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Table } from 'primeng/table';
import { Product } from 'src/app/core/models/product';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductService } from 'src/app/core/services/product.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductDetailDialogComponent } from 'src/app/shared/product-detail-dialog/product-detail-dialog.component';
import { MenuItem, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.css'],
  providers: [DialogService]
})
export class ProductManagerComponent implements OnInit {

  listProducts: Product[] = [];
  statuses!: any[];
  ref: DynamicDialogRef | undefined;
  processingOrderSize = 0;
  id!: string;
  loading: boolean = true;
  activityValues: number[] = [0, 100];
  breadcrumbItems: MenuItem[] | undefined;

  constructor(
    private dialogService: DialogService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private productService: ProductService,
    private primengConfig: PrimeNGConfig,
  ) {
  }


  ngOnInit(): void {
    this.breadcrumbItems = [{label: 'Quản lí'},{ label: 'Sản phẩm' }];
    const id: string = this.authService.getManagedStoreIdFromToken();
    this.configPrimeNg();
    this.productService.getProductsByStoreId(id).subscribe(res => {
      this.listProducts = res;
      this.loading = false;
    })
  }

  initializeFilter() {
    this.statuses = [
      { label: 'Sold out', value: 'true' },
      { label: 'Available', value: 'false' },
    ];
  }

  onClickEdit(product: Product){
    this.ref = this.dialogService.open(ProductDetailDialogComponent, {
      data: {
        product: product
      },
      header: 'Cập nhật sản phẩm #'+product.id,
      baseZIndex: 10000,
    });
  }

  clear(table: Table) {
    table.clear();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

  configPrimeNg(){
    this.primengConfig.setTranslation({
      startsWith: 'Bắt đầu với',
      contains: 'Chứa',
      notContains: 'Không chứa',
      endsWith: 'Kết thúc với',
      equals: 'Bằng',
      notEquals: 'Không bằng',
      noFilter: 'Không lọc',
      lt: 'Ít hơn',
      lte: 'Ít hơn hoặc bằng',
      gt: 'Nhiều hơn',
      gte: 'Nhiều hơn hoặc bằng',
      is: 'Là',
      isNot: 'Không phải là',
      before: 'Trước',
      after: 'Sau',
      clear: 'Xóa',
      apply: 'Áp dụng',
      matchAll: 'Phù hợp với tất cả',
      matchAny: 'Phù hợp với bất kỳ',
      addRule: 'Thêm quy tắc',
      removeRule: 'Xóa quy tắc',
      accept: 'Chấp nhận',
      reject: 'Từ chối',
      choose: 'Chọn',
      upload: 'Tải lên',
      cancel: 'Hủy',
      dayNames: ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'],
      dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
      dayNamesMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
      monthNames: ['Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư', 'Tháng Năm', 'Tháng Sáu', 'Tháng Bảy', 'Tháng Tám', 'Tháng Chín', 'Tháng Mười', 'Tháng Mười Một', 'Tháng Mười Hai'],
      monthNamesShort: ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'],
      today: 'Hôm nay',
      weekHeader: 'Tuần'
  });
  }
}
