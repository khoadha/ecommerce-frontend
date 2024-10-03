import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-delivery-manager',
  templateUrl: './delivery-manager.component.html',
  styleUrls: ['./delivery-manager.component.css']
})
export class DeliveryManagerComponent implements OnInit {

  breadcrumbItems: MenuItem[] | undefined;
  initDelivery:boolean =true;

  ngOnInit(): void {
    this.initDelivery=true;
    this.breadcrumbItems = [{label: 'Quản lí'},{ label: 'Giao hàng' }];
  }

}
