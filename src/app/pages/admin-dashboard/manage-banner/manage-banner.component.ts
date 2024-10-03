import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { SetupService } from 'src/app/core/services/setup.service';

@Component({
  selector: 'app-manage-banner',
  templateUrl: './manage-banner.component.html',
  styleUrls: ['./manage-banner.component.css'],
  providers: [MessageService]
})
export class ManageBannerComponent implements OnInit {

  imgs: string[] | undefined;
  subimgs: string[] | undefined;
  tempUrl!: string;
  selectedImageFile!: File;
  isImageSelected: boolean = false;
  getImageLinkForm!: FormGroup;
  loading: boolean = false;

  max: number = 5
  subMax: number = 2

  constructor(private messageService: MessageService, private fb: FormBuilder, private setupService: SetupService) { }

  ngOnInit(): void {
    this.setupService.getBannerImages().subscribe(res => {
      this.imgs = res.bannerCarouselImages;
      this.subimgs = res.bannerImages;
    })
    this.getImageLinkForm = this.fb.group({
      image: [null, Validators.required],
    })
  }

  onClick() {
    var data = {
      bannerCarouselImages: this.imgs,
      bannerImages: this.subimgs
    }

    this.setupService.updateBanner(data).subscribe(res => { })
    window.location.reload()
  }

  onGetLink() {
    this.loading = true;
      const formData = new FormData();
      formData.append('image', this.getImageLinkForm.get('image')!.value);
      this.setupService.uploadFile(formData).subscribe(res => {
        this.tempUrl = res.url;
        this.loading = false;
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Lấy đường dẫn hình ảnh thành công!' });
      })
  }

  onFileSelected(event: Event, controlName: string) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      if (file.type.includes('image')) {
        this.isImageSelected = true;
        this.selectedImageFile = file;
      }
      this.getImageLinkForm.get(controlName)!.setValue(file);
    }
  }
}
