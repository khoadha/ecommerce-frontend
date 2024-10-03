import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { Order } from 'src/app/core/models/order';
import { Statistic } from 'src/app/core/models/statistic';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrderService } from 'src/app/core/services/order.service';
import { StoreService } from 'src/app/core/services/store.service';
import { OrderDetailDialogComponent } from 'src/app/shared/order-detail-dialog/order-detail-dialog.component';
import { StatisticDialogComponent } from 'src/app/shared/statistic-dialog/statistic-dialog.component';

@Component({
  selector: 'app-order-manager',
  templateUrl: './order-manager.component.html',
  styleUrls: ['./order-manager.component.css'],
  providers: [DialogService]
})
export class OrderManagerComponent implements OnInit {

  orderData!: any;
  statistic!: Statistic;
  breadcrumbItems: MenuItem[] | undefined;
  listOrders!: Order[];
  loading: boolean = true;
  ref: DynamicDialogRef | undefined;


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialogService: DialogService,
    private dialog: MatDialog, 
    private authService: AuthService, 
    private orderService: OrderService, 
    private storeService: StoreService, 
    private primengConfig: PrimeNGConfig,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.breadcrumbItems = [{label: 'Quản lí'},{ label: 'Đơn hàng' }];
    const storeId = this.authService.getManagedStoreIdFromToken();
    this.orderService.getOrdersByStoreId(storeId).subscribe(res => {
      this.listOrders=res;
      this.loading=false;
    })
    this.configPrimeNg();
  }

  clear(table: Table) {
    table.clear();
  }

  

  onClickEdit(order: Order){
    this.ref = this.dialogService.open(OrderDetailDialogComponent, {
      data: {
        orderId: order.id,
        role: 'manager'
      },
      header: 'Cập nhật đơn hàng #'+order.id,
      baseZIndex: 10000,
    });
  }

  
  onShowStatistic() {
    const storeId = this.authService.getManagedStoreIdFromToken();
    this.storeService.getStatisticOfStore(storeId).subscribe(res => {
      this.dialog.open(StatisticDialogComponent, {
          data: res
      });
    })
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
