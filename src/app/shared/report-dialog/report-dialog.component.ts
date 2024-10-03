import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ReportService } from 'src/app/core/services/report.service';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.css'],
  providers: [MessageService]
})
export class ReportDialogComponent implements OnInit {

  description!: string;
  email!: string;
  reportType:number = 0;

  constructor(
    private messageService: MessageService,
    private config: DynamicDialogConfig,
    private cd: ChangeDetectorRef,
    private ref: DynamicDialogRef, 
    private reportService: ReportService
  ) {
  }

  ngOnInit(): void {
    this.description = this.config.data['productData'];
    this.cd.markForCheck();
  }

  onSubmitReport(){
    if (this.email == undefined || this.email == '') {
      this.messageService.add({ severity: 'error', summary: 'Gửi thất bại', detail: 'Hãy nhập email nhé để chúng tôi có thể phản hồi với bạn tin mới nè!' });
      return;
    }

    const data = {
      email: this.email,
      reportType: this.reportType,
      description: this.description
    }
    this.reportService.addReport(data).subscribe(res => {})
    this.ref.close('done');
  }

}
