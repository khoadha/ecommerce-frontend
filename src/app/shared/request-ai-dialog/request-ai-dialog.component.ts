import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ArService } from 'src/app/core/services/ar.service';

@Component({
  selector: 'app-request-ai-dialog',
  templateUrl: './request-ai-dialog.component.html',
  styleUrls: ['./request-ai-dialog.component.css']
})
export class RequestAiDialogComponent implements OnInit, AfterContentChecked {

  data!: string;
  listImgStr!: string[];
  loading!: boolean;
  selectedImageFile!: File;

  constructor(private cdRef: ChangeDetectorRef, public ref: DynamicDialogRef, private arService: ArService) { }

  ngOnInit(): void {
    this.listImgStr = [];
    this.loading = false;
  }

  ngAfterContentChecked(): void {
    this.cdRef.detectChanges();
  }

  submit(){
    this.loading = true;
    this.arService.generateImages(this.data).subscribe(res => {
      this.listImgStr = res.data;
      this.loading = false;
    })
  }

  submitImage(){
    this.loading = true;
    var formData = new FormData();
    formData.append('image', this.selectedImageFile);
    this.arService.generateImagesByMedia(formData).subscribe(res => {
      this.listImgStr = res.data;
      this.loading = false;
    })
  }

  onFileSelected(event: Event, controlName: string) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      if (file.type.includes('image')) {
        this.selectedImageFile = file;
      }
    }
    this.submitImage();
  }

  onChooseImage(src: string) {
    this.ref.close(src);
  }


  defaultImageUrl = 'https://blobcuakhoa.blob.core.windows.net/files/img.png';
  URLhandleImageError(event: any) {
    event.target.src = this.defaultImageUrl;
  }
}
