import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/core/services/payment.service';

@Component({
  selector: 'app-manage-transaction',
  templateUrl: './manage-transaction.component.html',
  styleUrls: ['./manage-transaction.component.css']
})
export class ManageTransactionComponent implements OnInit {

  list: any;
  cols: any[] = [];

  constructor(private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.paymentService.getAllTransactions().subscribe(res => {
      this.list = res;
    })
    this.initializeColumns();
  }

  initializeColumns(){
    this.cols = [
      { field: 'id', header: '#' },
      { field: 'vnPayTransactionId', header: 'Mã giao dịch VNPAY' },
      { field: 'accountId', header: 'ID Người dùng' },
      { field: 'amount', header: 'Thành tiền' },
      { field: 'description', header: 'Mô tả'},
      { field: 'transactionStatus', header: 'Trạng thái' },
      { field: 'createdDate', header: 'Ngày tạo' },
    ];
  }
}
