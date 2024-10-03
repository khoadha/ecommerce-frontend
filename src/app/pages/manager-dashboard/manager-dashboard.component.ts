import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Section, sideNavItems } from './manager-dashboard.constant';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent {

  items: Section[] = sideNavItems;

  constructor(private router: Router) {

  }
  
  isLinkActive(url: string): boolean {
    return this.router.isActive(url, true);
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }
}
