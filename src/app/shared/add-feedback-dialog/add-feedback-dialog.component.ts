import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FileUpload } from 'primeng/fileupload';
import { AuthService } from 'src/app/core/services/auth.service';
import { FeedbackService } from 'src/app/core/services/feedback.service';

@Component({
  selector: 'app-add-feedback-dialog',
  templateUrl: './add-feedback-dialog.component.html',
  styleUrls: ['./add-feedback-dialog.component.css'],
  providers: [MessageService]
})
export class AddFeedbackDialogComponent implements OnInit {

  @ViewChild('uploadedFiles') uploadedFiles!: FileUpload;
  rating!: number;
  description!: string;
  isLoading: boolean = false;
  productId: any;

  constructor(
    private config: DynamicDialogConfig,
    private messageService: MessageService,
    private cd: ChangeDetectorRef,
    private ref: DynamicDialogRef, 
    private feedbackService: FeedbackService,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.productId = this.config.data['productData'];
    this.cd.markForCheck();
  }

  onSubmitFeedback() {
    if(this.rating==undefined){
      this.messageService.add({ severity: 'warn', summary: 'Thất bại', detail: `Số sao đánh giá không được để trống!`, life: 3000 });
      return;
    }

    const userId = this.auth.getUserIdFromToken();
    this.isLoading = true;
    const formData = new FormData();
    formData.append('rating', this.rating.toString());
    formData.append('productId', this.productId);
    formData.append('description', this.description);
    formData.append('userId', userId);
    this.uploadedFiles._files.forEach((element: string | Blob) => {
      formData.append('files', element);
    });

    this.feedbackService.addFeedback(formData)
      .subscribe({
        next: (res) => {
          if(res){
            this.isLoading = false;
            this.ref.close(res);
          }
        },
        error: (err) => {
          alert(err?.error.message);
        }
      });
  }
}
