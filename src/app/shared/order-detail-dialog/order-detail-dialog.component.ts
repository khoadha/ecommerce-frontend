import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Order } from 'src/app/core/models/order';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['./order-detail-dialog.component.css']
})
export class OrderDetailDialogComponent implements OnInit {

  order!: Order;
  role!: string;
  orderId!: number;

  constructor(private snackBar: MatSnackBar,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private orderService: OrderService,
    private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.orderId = this.config.data['orderId'];
    this.role = this.config.data['role'];
    this.orderService.getOrderById(this.orderId).subscribe(res => {
      this.order = res;
    })
    this.cd.markForCheck();
  }

  onCancelOrder(orderId: number) {
    this.orderService.onCancelOrder(orderId).subscribe(res => {
      this.orderService.getOrderById(orderId).subscribe(res => {
        this.order = res;
      })
    })
    this.openSnackBar(`This order status has been set to Canceled`, "Ẩn")
  }

  onCompleteOrder(orderId: number) {
    this.orderService.onCompleteOrder(orderId).subscribe(res => {
      this.orderService.getOrderById(orderId).subscribe(res => {
        this.order = res;
      })
    })
    this.openSnackBar(`Trạng thái đơn hàng đã được chuyển thành Hoàn thành`, "Ẩn")
  }

  onConfirmOrder(orderId: number) {
    this.orderService.onConfirmOrder(orderId).subscribe(res => {
      this.orderService.getOrderById(orderId).subscribe(res => {
        this.order = res;
      })
    })
    this.openSnackBar(`Trạng thái đơn hàng đã được chuyển thành Đã xác nhận`, "Ẩn")
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }
}