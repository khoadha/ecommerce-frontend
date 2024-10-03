import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Product } from 'src/app/core/models/product';
import { StoreOverviewStatistic } from 'src/app/core/models/statistic';
import { Store } from 'src/app/core/models/store';
import { ProductService } from 'src/app/core/services/product.service';
import { StoreService } from 'src/app/core/services/store.service';
import { ReportDialogComponent } from 'src/app/shared/report-dialog/report-dialog.component';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.css'],
  providers: [DialogService, DynamicDialogRef, DynamicDialogConfig, MessageService]
})
export class StoreDetailComponent implements OnInit, AfterViewInit {

  storeId!: number;
  store!: Store;
  productsList!: Product[];
  visible: boolean = false;
  breadcrumbItems: MenuItem[] | undefined;
  overviewAddress: string = '';
  storeOverviewStatistic!: StoreOverviewStatistic;

  constructor(
    private messageService: MessageService,
    private dialogService: DialogService, 
    private ref: DynamicDialogRef,
    private snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router, private storeService: StoreService, private productService: ProductService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idFromRoute = params.get('id')!;
      this.storeId = parseInt(idFromRoute, 10);
      this.storeService.getStoreById(this.storeId).subscribe(
        res => {
          this.store = res;
          this.overviewAddress = this.getOverviewAddressString(res.location);
        },
        err => {
          this.router.navigate(['']);
          this.openSnackBar(`Store with id ${idFromRoute} is not existed`, "Ẩn")
        }
      );
      this.storeService.getStoreOverviewStatistic(this.storeId).subscribe(res => {
        this.storeOverviewStatistic = res;
      })
      this.productService.getProductsByStoreIdForUser(this.storeId).subscribe(res => {
        this.productsList = res;
      })
    });
  }

  onClickChat(){
    this.router.navigate(['chatting'], {
      queryParams: { q: this.store.storeEmail },
    });
  }


  ngAfterViewInit(): void {
    this.breadcrumbItems = [{ label: 'Cửa hàng' }, { label: this.store.name }];
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

  onClickReport(){
    this.ref = this.dialogService.open(ReportDialogComponent, {
      header: 'Báo cáo/Khiếu nại cửa hàng',
      width: '30%',
      contentStyle: { "max-height": "600px", "overflow": "auto" },
      baseZIndex: 10000,
      data: {
        productData: `Báo cáo/khiếu nại cửa hàng (#${this.storeId}) ${this.store.name}`
      }
    });
    this.ref.onClose.subscribe((data) => {
      if (data) {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Gửi báo cáo/khiếu nại cửa hàng thành công!' });
      } else {
        return;
      }
    });
  }

  getOverviewAddressString(address: string): string {
    const addressParts = address.split(',');
    if (addressParts.length > 3) {
      const extractedString = addressParts[3].trim();
      return extractedString;
    } else {
      return address;
    }
  }

  showDialog() {
    this.visible = true;
  }

}
