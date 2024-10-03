import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { AdminDashboardInformation, DailyRevenue, OrderCountStatistic } from 'src/app/core/models/statistic';
import { AuthService } from 'src/app/core/services/auth.service';
import { PaymentService } from 'src/app/core/services/payment.service';
import { ReportService } from 'src/app/core/services/report.service';
import { SetupService } from 'src/app/core/services/setup.service';
import { StoreService } from 'src/app/core/services/store.service';
import { UserStoreService } from 'src/app/core/services/user-store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {
  public numbers: number = 5;
  public username!: string;
  public role!: string;
  imgPath!: string;
  breadcrumbItems: MenuItem[] | undefined;
  reports: any[] = [];
  transactions: any[] = [];
  orderCountStatistic!: OrderCountStatistic;
  dailyRevenue!: DailyRevenue[];
  adi!: AdminDashboardInformation;

  constructor(private messageService: MessageService,private setupService: SetupService,private storeService: StoreService, private paymentService: PaymentService, private reportService: ReportService, private auth: AuthService, private userStore: UserStoreService) { }

  ngOnInit(): void {
    this.breadcrumbItems = [{ label: 'Dashboard' }];
    this.initDashboard();
  }

  initDashboard(){
    this.userStore.getUsernameFromStore()
      .subscribe(val => {
        let usernameFromToken = this.auth.getUsernameFromToken();
        this.username = val || usernameFromToken
      })
    this.userStore.getRoleFromStore()
      .subscribe(val => {
        const roleFromToken = this.auth.getRoleFromToken();
        this.role = val || roleFromToken;
        if (this.role == 'Admin') {
          this.role = 'Quản trị viên';
        }
      })
    this.userStore.getImgPathFromStore()
      .subscribe(val => {
        const imgPath = this.auth.getImgPathFromToken();
        this.imgPath = val || imgPath;
      })
    this.setupService.getDashboardInformation().subscribe(res => {
      this.adi = res;
    })
    this.reportService.getReportsByCount(10).subscribe(res => {
      this.reports = res;
    })
    this.paymentService.getLatestTransactionsByCount(10).subscribe(res => {
      this.transactions = res;
    })
    this.storeService.getOrderStatistic().subscribe(res => {
      this.orderCountStatistic = res;
    })
    this.storeService.getRevenueFromLastMonthAdmin().subscribe(res => {
      this.dailyRevenue = res;
    })
    this.messageService.add({ severity: 'success', summary: 'Thành công', detail: `Thông tin dashboard đã được làm mới!`, life: 3000 });
  }

  updateReportStatus(reportId: number) {
    const staffId = this.auth.getUserIdFromToken();
    this.reportService.updateReportStatus(reportId, staffId).subscribe(res => { });
    window.location.reload();
  }

}