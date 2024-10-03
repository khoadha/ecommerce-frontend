import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { BillingService } from 'src/app/core/services/billing.service';

@Component({
  selector: 'app-buy-billing-package',
  templateUrl: './buy-billing-package.component.html',
  styleUrls: ['./buy-billing-package.component.css']
})
export class BuyBillingPackageComponent implements OnInit {

  billings!: any[];
  boughtPackageId: number = 0;
  constructor(private billingService: BillingService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.billingService.getBillingPackage().subscribe(res => {
      this.billings = res;
    })
    const storeId = this.authService.getManagedStoreIdFromToken();
    this.billingService.getStorePackage(storeId).subscribe(res => {
       this.boughtPackageId = res.response;
    })
  }

  onClickBuyNow(packageId: number) {
    const storeId = this.authService.getManagedStoreIdFromToken();
    this.billingService.buyBillingPackage(storeId, packageId).subscribe(res => {})
    alert('Chọn gói thành công, gói sẽ hết hạn sau 30 ngày!')
    this.router.navigate(['/mdashboard/billing-manager']);
  }
}
