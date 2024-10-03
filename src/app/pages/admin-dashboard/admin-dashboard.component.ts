import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { SetupService } from 'src/app/core/services/setup.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { StoreService } from 'src/app/core/services/store.service';
import { Store } from 'src/app/core/models/store';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Section, sideNavItems } from './admin-dashboard.constant';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class AdminDashboardComponent {

  constructor(private router: Router) {
  }

  items: Section[] = sideNavItems;

  isLinkActive(url: string): boolean {
    return this.router.isActive(url, true);
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }
  
}
