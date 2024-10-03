import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Voucher } from 'src/app/core/models/voucher';
import { AuthService } from 'src/app/core/services/auth.service';
import { VoucherService } from 'src/app/core/services/voucher.service';

@Component({
  selector: 'app-manage-voucher',
  templateUrl: './manage-voucher.component.html',
  styleUrls: ['./manage-voucher.component.css']
})
export class ManageVoucherComponent implements OnInit {
  list: Voucher[] = [];
  cols: any[] = [];
  createVoucherForm!: FormGroup;
  createVoucherVisible: boolean = false;

  constructor(private snackBar: MatSnackBar, private fb: FormBuilder, private voucherService: VoucherService, private authService: AuthService) { }

  ngOnInit(): void {
    this.renewTable();

    this.createVoucherForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      description: ['', [Validators.required]],
      percentage: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(0), Validators.max(100)]],
      approvedValue: ['', [Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.min(1000),Validators.max(10000000)]],
      maxValue: ['', [Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.min(1000),Validators.max(10000000)]],
      availableCount: ['', [Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.min(1)]],
      createdBy: [null] 
    });

    this.cols = [
      { field: 'id', header: '#' },
      { field: 'name', header: 'Tên' },
      { field: 'description', header: 'Mô tả' },
      { field: 'createdBy', header: 'Người tạo' },
      { field: 'createdAt', header: 'Thời gian tạo'},
      { field: 'percentage', header: 'Tỉ lệ' },
      { field: 'approvedValue', header: 'Giá trị tối thiểu' },
      { field: 'maxValue', header: 'Giảm tối đa' },
      { field: 'availableCount', header: 'Lượt còn lại' },
      { field: '', header: 'Ẩn' },
      { field: '', header: 'Xóa' }
    ];
  }

  openVoucherDialog() {
    this.createVoucherVisible = true;
  }
  
  onChangeState(voucherId: number) {
    this.voucherService.updateDisplayState(voucherId).subscribe(res => {
      this.renewTable();
      this.openSnackBar(`Trạng thái của ${res.name} đã được thay đổi`, "Đóng");
    })
  }

  onDelete(voucherId: number) {
    // this.voucherService.deleteVoucher(voucherId).subscribe(res => {
    //   this.renewTable();
    //   this.openSnackBar(`${res.name} đã bị xóa`, "Đóng");
    // })
    this.openSnackBar(`Tính năng này hiện tại chưa đưa vào sử dụng`, "Đóng");
  }

  onCreateVoucher() {
    let username = this.authService.getUsernameFromToken();
    this.createVoucherForm.patchValue({
      createdBy: username
    });
     this.voucherService.addVoucher(this.createVoucherForm.value).subscribe(res => {
      this.renewTable();
      this.createVoucherForm.reset();
      this.openSnackBar(`${res.name} đã được tạo`, "Đóng");
     })
  }

  renewTable() {
    this.voucherService.getAllVouchersByAdmin().subscribe(res => {
      this.list = res;
    })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }
}
