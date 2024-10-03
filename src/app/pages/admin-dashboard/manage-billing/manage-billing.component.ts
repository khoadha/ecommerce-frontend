import { Component, OnInit } from '@angular/core';
import { BillingService } from 'src/app/core/services/billing.service';

@Component({
  selector: 'app-manage-billing',
  templateUrl: './manage-billing.component.html',
  styleUrls: ['./manage-billing.component.css']
})
export class ManageBillingComponent implements OnInit {

  billings: any;
  cols: any;

  constructor(private billingService: BillingService) {
  }
  
  ngOnInit(): void {
    this.billingService.getAllBilling().subscribe(res => {
      this.billings = res;
    })
    this.cols = [
      { field: 'id', header: '#' },
      { field: 'email', header: 'Mã cửa hàng' },
      { field: 'reportType', header: 'Tiền thanh toán' },
      { field: 'createdDate', header: 'Ngày tạo' },
      { field: 'isHandled', header: 'Trạng thái' },
      { field: 'isHandled', header: 'Cập nhật' },
      { field: 'isHandled', header: 'Cập nhật' },

    ];
  }

  onUpdateBilling(status: number, billingId: number) {
    this.billingService.adminUpdateBilling(status, billingId).subscribe(res => {
      this.billings = res;
    })
  }
}
