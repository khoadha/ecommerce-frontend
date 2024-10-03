import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { StoreService } from 'src/app/core/services/store.service';
import { Store } from 'src/app/core/models/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { OrderCountStatistic, ProductForTopProductStatistic, TopProductStatistic } from 'src/app/core/models/statistic';
import { DialogService } from 'primeng/dynamicdialog';
import { MatDialog } from '@angular/material/dialog';
import { StatisticDialogComponent } from 'src/app/shared/statistic-dialog/statistic-dialog.component';

@Component({
  selector: 'app-store-manager',
  templateUrl: './store-manager.component.html',
  styleUrls: ['./store-manager.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers: [DialogService]
})
export class StoreManagerComponent implements OnInit {

  store!: Store;
  updateStoreForm!: FormGroup;
  id!: string;
  breadcrumbItems: MenuItem[] | undefined;
  orderCountStatistic!: OrderCountStatistic;
  topProductStatistic!: TopProductStatistic;
  topByView: ProductForTopProductStatistic[] = [];
  topBySale: ProductForTopProductStatistic[] = [];
  lastMonthRevenueData: any;

  constructor(
    private dialog: MatDialog, 
    private snackBar: MatSnackBar, 
    private authService: AuthService, 
    private storeService: StoreService, 
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.breadcrumbItems = [{label: 'Tổng quan'}];
    this.initializeOrderCountStatistic();
    this.initializeRevenueFromLastMonth();
    this.initializeTopProductStatistic();
    this.initializeUpdateStoreForm();
  }

  initializeOrderCountStatistic(){
    const id = this.authService.getManagedStoreIdFromToken();
    this.storeService.getOrderStatisticOfStore(parseInt(id, 10)).subscribe(res => {
      this.orderCountStatistic = res;
    })
  }

  initializeTopProductStatistic(){
    const id = this.authService.getManagedStoreIdFromToken();
    this.storeService.getTopProductStatisticOfStore(parseInt(id, 10)).subscribe(res => {
      this.topBySale = res.topProductsBySale;
      this.topByView = res.topProductsByViewCount;
    })
  }

  initializeRevenueFromLastMonth(){
    const id = this.authService.getManagedStoreIdFromToken();
    this.storeService.getRevenueFromLastMonth(parseInt(id, 10)).subscribe(res => {
      this.lastMonthRevenueData = res;
    })
  }

  initializeUpdateStoreForm(){
    const id = this.authService.getManagedStoreIdFromToken();
    this.updateStoreForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.storeService.getStoreById(parseInt(id, 10)).subscribe(res => {
      this.store = res;
      this.resetFormValue();
    })
  }

  resetFormValue() {
    this.updateStoreForm.get('name')!.setValue(this.store.name);
    this.updateStoreForm.get('description')!.setValue(this.store.description);
  }

  onShowStatistic() {
    const storeId = this.authService.getManagedStoreIdFromToken();
    this.storeService.getStatisticOfStore(storeId).subscribe(res => {
      this.dialog.open(StatisticDialogComponent, {
          data: res
      });
    })
  }
  

  onOpenStore(id: number) {
    this.storeService.openStore(id).subscribe(store => {
      this.storeService.getStoreById(id).subscribe(res => {
        this.store = res;
        this.openSnackBar(`${store.name} đã được mở cửa`, "Ẩn");
      })
    })
  }

  onCloseStore(id: number) {
    this.storeService.closeStore(id).subscribe(store => {
      this.storeService.getStoreById(id).subscribe(res => {
        this.store = res;
        this.openSnackBar(`${store.name} đã được đóng cửa`, "Ẩn");
      })
    })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

  onUpdateStore() {
    if (this.updateStoreForm.valid) {
      this.storeService.updateStore(this.store.id, this.updateStoreForm.value)
        .subscribe({
          next: (res) => {
            window.location.reload();
           this.openSnackBar(`Thông tin cửa hàng ${res.name} đã được cập nhật`, "Ẩn");
          },
          error: (err) => {
            alert(err?.error.message);
          }
        });
    } else {
      console.error('Form validation error');
    }
  }

  
  onImageFileSelected(event: Event, productId: number) {
    const file: File = (event.target as HTMLInputElement).files![0];
    if (file) {
      const formData = new FormData();
      formData.append('Image', file);
      this.storeService.updateStoreImage(productId, formData)
      .subscribe(res => {
        window.location.reload();
        this.openSnackBar(`Ảnh bìa cửa hàng ${res.name} đã được cập nhật`, "Ẩn");
      });
    }
  }

  onThumbnailFileSelected(event: Event, productId: number) {
    const file: File = (event.target as HTMLInputElement).files![0];
    if (file) {
      const formData = new FormData();
      formData.append('ThumbnailImage', file);
      this.storeService.updateStoreThumbnailImage(productId, formData)
        .subscribe(res => {
          window.location.reload();
          this.openSnackBar(`Ảnh bìa cửa hàng ${res.name} đã được cập nhật`, "Ẩn");
        });
    }
  }

  resetForm(){
    this.resetFormValue();
    this.openSnackBar(`Thông tin cửa hàng đã được đặt lại`, "Ẩn");
  }

  navigateToDetail() {
    const url = '/store-detail/'+this.store.id;
    window.open(url, '_blank');
  }
}
