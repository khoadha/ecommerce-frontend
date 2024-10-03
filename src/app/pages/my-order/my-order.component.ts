import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Order } from 'src/app/core/models/order';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrderService } from 'src/app/core/services/order.service';
import { OrderDetailDialogComponent } from 'src/app/shared/order-detail-dialog/order-detail-dialog.component';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css'],
  providers: [DialogService]
})
export class MyOrderComponent implements OnInit {

  maskLoading: boolean = false;
  expandedElement!: Order | null;
  orderData!: any;
  breadcrumbItems: MenuItem[] | undefined;
  listOrders!: Order[];
  loading: boolean = false;
  ref: DynamicDialogRef | undefined;
  statuses!: any[];

  constructor(
    private dialogService: DialogService,
    private authService: AuthService,
    private orderService: OrderService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.maskLoading = true;
    this.breadcrumbItems = [{ label: 'Đơn hàng của tôi' }];
    const userId = this.authService.getUserIdFromToken();
    this.orderService.getOrdersByUserId(userId).subscribe(res => {
      this.listOrders = res;
      this.maskLoading = false;
    })
    this.initStatuses();
  }

  initStatuses() {
    this.statuses = [
      { label: 'Đã hủy', value: 1 },
      { label: 'Chờ xác nhận', value: 2 },
      { label: 'Đã xác nhận', value: 3 },
      { label: 'Hoàn thành', value: 4 },
    ];
  }

  onCancelOrder(orderId: number) {
    this.orderService.onCancelOrder(orderId).subscribe(res => {
      this.orderService.getOrderById(orderId).subscribe(res => {
        this.orderData = res;
      })
    })
    this.openSnackBar(`Trạng thái đơn hàng đã được chuyển thành Đã bị hủy`, "Ẩn")
  }

  onClickDetail(order: Order) {
    this.ref = this.dialogService.open(OrderDetailDialogComponent, {
      data: {
        orderId: order.id,
        role: 'user'
      },
      header: 'Cập nhật đơn hàng #' + order.id,
      baseZIndex: 10000,
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

  getSeverity(status: number) {
    switch (status) {
      case 1:
        return 'danger';
      case 2:
        return 'info';
      case 3:
        return 'warning';
      case 4:
        return 'success';
      default:
        return '';
    }
  }
}
