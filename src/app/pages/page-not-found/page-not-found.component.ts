import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
  breadcrumbItems: MenuItem[] | undefined;
 
  ngOnInit() {
    this.breadcrumbItems = [{ label: 'Không tìm thấy' }];
  }
}
