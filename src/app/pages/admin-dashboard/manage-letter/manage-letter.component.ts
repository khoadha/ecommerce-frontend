import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ReportService } from 'src/app/core/services/report.service';

@Component({
  selector: 'app-manage-letter',
  templateUrl: './manage-letter.component.html',
  styleUrls: ['./manage-letter.component.css']
})
export class ManageLetterComponent implements OnInit {

  list: any;
  cols: any[] = [];

  constructor(private reportService: ReportService, private auth: AuthService) { }

  ngOnInit(): void {
    this.reportService.getReportsByCount(10).subscribe(res => {
      this.list = res;
    })
    this.initializeColumns();
  }

  initializeColumns(){
    this.cols = [
      { field: 'id', header: '#' },
      { field: 'email', header: 'Email' },
      { field: 'reportType', header: 'Loại đơn từ' },
      { field: 'createdDate', header: 'Ngày tạo' },
      { field: 'description', header: 'Mô tả'},
      { field: 'isHandled', header: 'Trạng thái' },
      { field: 'isHandled', header: 'Cập nhật' },
      { field: 'isHandled', header: 'Xử lí' },

    ];
  }

  updateReportStatus(reportId: number){
    const staffId = this.auth.getUserIdFromToken();
    this.reportService.updateReportStatus(reportId, staffId).subscribe(res => {});
    window.location.reload();
  }
}
