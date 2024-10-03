import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { SetupService } from 'src/app/core/services/setup.service';
import { FilterMatchMode, FilterService, SelectItem } from 'primeng/api';
@Component({
  selector: 'app-manage-customer',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.css'],
  providers: [FilterService]
})
export class ManageCustomerComponent implements OnInit {
  listCustomers: User[] = [];
  cols: any[] = [];
  matchModeOptions: SelectItem[] = [];

  constructor(private setupService: SetupService, private filterService: FilterService) { }

  ngOnInit(){
    this.filterService.register('custom-equals', (value: any, filter:any): boolean => {
        if (filter === undefined || filter === null || filter.trim() === '') {
            return true;
        }

        if (value === undefined || value === null) {
            return false;
        }

        return value.toString() === filter.toString();
    }); 

    this.cols = [
      { field: 'id', header: 'Mã định danh' },
      { field: 'userName', header: 'Tên người dùng' },
      { field: 'imgPath', header: 'Ảnh hồ sơ' },
      { field: 'email', header: 'Email' },
      { field: 'phoneNumber', header: 'Số điện thoại' },
      { field: 'roleName', header: 'Vai trò'},
      { field: 'lastLoginTime', header: 'Đăng nhập lần cuối'}
    ];

    this.matchModeOptions = [
        { label: 'Bằng', value: 'custom-equals' },
        { label: 'Bắt đầu với', value: FilterMatchMode.STARTS_WITH },
        { label: 'Chứa', value: FilterMatchMode.CONTAINS }
    ];

    this.setupService.getAllUsers().subscribe(res => {
      this.listCustomers = res;
    })
  }
}
