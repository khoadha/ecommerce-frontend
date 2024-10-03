import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { FilterMatchMode, FilterService, SelectItem } from 'primeng/api';
import { Store } from 'src/app/core/models/store';
import { StoreService } from 'src/app/core/services/store.service';

@Component({
  selector: 'app-manage-store',
  templateUrl: './manage-store.component.html',
  styleUrls: ['./manage-store.component.css'],
  providers: [FilterService]
})
export class ManageStoreComponent implements OnInit {
  list: Store[] = [];
  cols: any[] = [];
  matchModeOptions: SelectItem[] = [];
  matchModeOptionsForBoo : SelectItem[] = [];

  constructor(private snackBar: MatSnackBar, private storeService: StoreService, private filterService: FilterService) { }

  ngOnInit(): void {
    this.filterService.register('custom-equals', (value: any, filter:any): boolean => {
        if (filter === undefined || filter === null || filter.trim() === '') {
            return true;
        }

        if (value === undefined || value === null) {
            return false;
        }

        return value.toString() === filter.toString();
    }); 

    this.filterService.register('custom-boolean', (value: any, filter:any): boolean => {
      if (filter === undefined || filter === null || filter.trim() === '') {
          return true;
      }

      if (value === undefined || value === null) {
          return false;
      }

      return value.toString() === filter.toString();
  }); 

    this.cols = [
      { field: 'id', header: '#' },
      { field: 'managerUsername', header: 'Người Quản lí' },
      { field: 'name', header: 'Tên' },
      { field: 'description', header: 'Mô tả' },
      { field: 'location', header: 'Địa chỉ'},
      { field: 'isOpen', header: 'Đang hoạt động' },
      { field: 'isVerified', header: 'Đã xác minh' },
      { field: 'isBanned', header: 'Trạng thái' }
    ];

    this.matchModeOptions = [
      { label: 'Equals', value: 'custom-equals' },
      { label: 'Starts With', value: FilterMatchMode.STARTS_WITH },
      { label: 'Contains', value: FilterMatchMode.CONTAINS }
    ];
    
    this.matchModeOptionsForBoo =[
      { label: 'true', value: true },
      { label: 'false', value: false }
    ]
    this.renewTable();
  }

  renewTable() {
    this.storeService.getAllStoresByAdmin().subscribe(res => {
      this.list = res;
    })
  }

  onVerify(id: number) {
    this.storeService.verifyStore(id).subscribe(store => {
      this.renewTable();
      this.openSnackBar(`${store.name} đã được xác minh`, "Đóng")
    })
  }

  onUnverify(id: number) {
    this.storeService.unverifyStore(id).subscribe(store => {
      this.renewTable();
      this.openSnackBar(`${store.name} đã bị hủy xác minh`, "Đóng")
    })
  }

  onBan(id: number) {
    this.storeService.banStore(id).subscribe(store => {
      this.renewTable();
      this.openSnackBar(`${store.name} đã bị cấm`, "Đóng")
    })
  }

  onUnban(id: number) {
    this.storeService.unbanStore(id).subscribe(store => {
      this.renewTable();
      this.openSnackBar(`${store.name} đã hết bị cấm`, "Đóng")
    })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

}
