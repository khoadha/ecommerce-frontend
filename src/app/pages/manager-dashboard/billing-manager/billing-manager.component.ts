import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/core/models/order';
import { AuthService } from 'src/app/core/services/auth.service';
import { BillingService } from 'src/app/core/services/billing.service';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-billing-manager',
  templateUrl: './billing-manager.component.html',
  styleUrls: ['./billing-manager.component.css']
})
export class BillingManagerComponent implements OnInit {

  billings!: any[];
  loading: boolean = false;
  boughtPackage: any;
  availableOrders: Order[] = [];

  calculateData: any;

  constructor(private billingService: BillingService,
     private authService: AuthService,
     private orderService: OrderService,
     private router: Router) {}

  ngOnInit(): void {
    this.loading=true;
    const storeId = this.authService.getManagedStoreIdFromToken();
    this.billingService.getBillingsByStoreId(storeId).subscribe(res => {
      this.billings = res;
    })
    this.billingService.getStorePackageData(storeId).subscribe(res => {
       this.boughtPackage = res.response;
    })
    this.billingService.calculateBilling(storeId).subscribe(res => {
      this.calculateData = res.response;
    })
    this.billingService.getBillingAvailableOrders(storeId).subscribe(res => {
      this.availableOrders = res;
      this.loading=false;
    })
  }

  onClick() {
    const storeId = this.authService.getManagedStoreIdFromToken();
    var dto = {
      totalBill: this.calculateData.finalCost,
      storeId: storeId
    }
    this.billingService.createBilling(dto).subscribe(res => {})
    alert('Yêu cầu đã được gửi đi!')
    window.location.reload();
  }
}
