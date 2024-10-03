import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { PaymentService } from 'src/app/core/services/payment.service';
import { UserStoreService } from 'src/app/core/services/user-store.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-wemade-pay',
  templateUrl: './wemade-pay.component.html',
  styleUrls: ['./wemade-pay.component.css']
})
export class WemadePayComponent implements OnInit {

  userId!: string;
  point!: number;
  value!: number;
  maskLoading: boolean = false;

  constructor(private auth: AuthService, private paymentService: PaymentService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.maskLoading = true;
    this.initPageInfo();
  }

  initPageInfo() {
    this.userId = this.auth.getUserIdFromToken();
    this.paymentService.getWemadePoint(this.userId).subscribe(res => {
      this.point = res;
      this.maskLoading = false;
    })
  }

  onClickProcess() {
    let dialogRef = this.dialog.open(ConfirmDialogComponent);
    let instance = dialogRef.componentInstance;
    instance.headerContent = this.dialogConfig.headerContent;
    this.dialogConfig.bodyContent = `Mua ${this.value} điểm bằng hình thức thanh toán qua VNPAY`;
    instance.bodyContent = this.dialogConfig.bodyContent;
    instance.submitButtonContent = this.dialogConfig.submitButtonContent;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        var paymentRequest = {
          paymentAmount: this.value,
          description: `Mua ${this.value} điểm bằng hình thức thanh toán VNPAY. Tổng thanh toán: ${this.value * 1000} VNĐ`
        }
        this.paymentService.createPayment(paymentRequest, this.userId).subscribe(res => {
          window.location.href = res.url;
        });
      } else {
      }
    });
  }

  private dialogConfig = {
    headerContent: 'Xác nhận thanh toán',
    bodyContent: ``,
    submitButtonContent: 'Xác nhận'
  };

  isValueValid() {
    return this.value > 0 && this.value <= 10000;
  }
}
