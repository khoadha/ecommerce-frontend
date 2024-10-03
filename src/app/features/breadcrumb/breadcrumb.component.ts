import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent {

  @Input()
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  ngOnInit() {

      this.home = { label: '', routerLink: '/' };
  }
}
