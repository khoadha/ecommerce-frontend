import { Component, OnInit } from '@angular/core';
import { Voucher } from 'src/app/core/models/voucher';
import { VoucherService } from 'src/app/core/services/voucher.service';

@Component({
  selector: 'app-list-coupons',
  templateUrl: './list-coupons.component.html',
  styleUrls: ['./list-coupons.component.css']
})
export class ListCouponsComponent implements OnInit {

  voucherList: Voucher[] = [];
  visible: boolean = false;
  selectedVoucher!: Voucher;

  constructor(private voucherService: VoucherService) {}

  ngOnInit(): void {
      this.voucherService.getAllVouchers().subscribe(res => {
        this.voucherList = res;
      })
  }

  showVoucherDetail(voucher: Voucher){
    this.selectedVoucher = voucher;
    this.visible = true;
  }
}
