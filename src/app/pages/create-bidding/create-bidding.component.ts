import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { BiddingService } from 'src/app/core/services/bidding.service';
import { CategoryAndMaterialService } from 'src/app/core/services/category-and-service.service';
import { UserStoreService } from 'src/app/core/services/user-store.service';
import { RequestAiDialogComponent } from 'src/app/shared/request-ai-dialog/request-ai-dialog.component';

@Component({
  selector: 'app-create-bidding',
  templateUrl: './create-bidding.component.html',
  styleUrls: ['./create-bidding.component.css'],
  providers: [DialogService, DynamicDialogRef, DynamicDialogConfig]
})
export class CreateBiddingComponent implements OnInit {

  currentSrc: string = '';
  loading: boolean = false;
  public role!: string[];
  selectedCategories: any[] = [];
  materials!: any[];
  selectedMaterials!: any[];
  selectedUnitOfMeasure!: any;
  categories!: any[];
  size!: number;
  fromPrice!: number;
  toPrice!: number;
  unitOfMeasure!: any[];
  minDate!: Date;
  selectedImageFile!: File;
  isImageSelected: boolean = false;
  breadcrumbItems: MenuItem[] | undefined;
  createBiddingForm!: FormGroup;


  constructor(
    private biddingService: BiddingService,
    private fb: FormBuilder,
    private camService: CategoryAndMaterialService,
    private dialogService: DialogService, private ref: DynamicDialogRef,
    private router: Router, private auth: AuthService, private userStore: UserStoreService,) {
  }

  ngOnInit(): void {
    this.breadcrumbItems = [{ label: 'Tạo đấu giá' }];
    this.initializeSelectList();
    this.userStore.getRoleFromStore()
      .subscribe(val => {
        const roleFromToken = this.auth.getRoleFromToken();
        this.role = val || roleFromToken;
      })
    this.minDate = new Date();
    this.initialCreateBiddingForm();
  }

  onCreateBidding() {
    if (this.createBiddingForm.valid) {
      this.loading = true;
      const customerId = this.auth.getUserIdFromToken();
      const formData = new FormData();

      var fromPrice = this.createBiddingForm.get('fromPrice')!.value;
      var toPrice = this.createBiddingForm.get('toPrice')!.value

      if(fromPrice >= toPrice) {
        formData.append('fromPrice', toPrice);
        formData.append('toPrice', fromPrice);
      } else {
        formData.append('fromPrice', fromPrice);
        formData.append('toPrice', toPrice);
      }

      var parsedDate = new Date(this.createBiddingForm.get('completedDate')!.value);
      formData.append('completedDate', parsedDate.toDateString());

      formData.append('quantity', this.createBiddingForm.get('quantity')!.value);
      formData.append('size', this.createBiddingForm.get('size')!.value);
      formData.append('unitOfMeasure', this.createBiddingForm.get('unitOfMeasure')!.value);
      formData.append('note', this.createBiddingForm.get('note')!.value);
      formData.append('customerId', customerId);

      if(this.selectedImageFile != undefined) {
        formData.append('image', this.selectedImageFile);
      } else {
        formData.append('imageUrl', this.currentSrc);
      }
      var listCateIds = this.createBiddingForm.get('selectedCategories')!.value;
      var listMaterialIds = this.createBiddingForm.get('selectedMaterials')!.value;
      listCateIds.forEach((element: any) => {
        formData.append('categoryIds', element);
      })
      listMaterialIds.forEach((element: any) => {
        formData.append('materialIds', element);
      })
      this.biddingService.addBidding(formData).subscribe(res => {
        this.router.navigate(['bidding']);
      }
      )
    }
  }

  initialCreateBiddingForm() {
    this.createBiddingForm = this.fb.group({
      fromPrice: ['', [Validators.required]],
      toPrice: ['', [Validators.required]],
      completedDate: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      size: ['', [Validators.required]],
      unitOfMeasure: ['', [Validators.required]],
      note: ['', [Validators.required]],
      selectedCategories: ['', [Validators.required]],
      selectedMaterials: ['', [Validators.required]]
    });
  }

  openARDialog() {
    this.ref = this.dialogService.open(RequestAiDialogComponent, {
      header: 'Tìm kiếm ảnh mẫu',
      width: '70%',
      contentStyle: { "max-height": "600px", "overflow": "auto" },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((data) => {
      if (data.length > 1) {
        this.isImageSelected = false;
        this.currentSrc = data;
        this.getFileFromUrl(data)
      } else {
        return;
      }
    });
  }

  getFileFromUrl = async (imgUrl: string) => {
    var imgExt = this.getUrlExtension(imgUrl);
    const response = await fetch(imgUrl);
    const blob = await response.blob();
    const file = new File([blob], "hinh-mau." + imgExt, {
      type: blob.type,
    });
    return file;
  }

  getUrlExtension = (url: any) => {
    return url
      .split(/[#?]/)[0]
      .split(".")
      .pop()
      .trim();
  }

  onFileSelected(event: Event, controlName: string) {
    const fileInput = event.target as HTMLInputElement;
    this.currentSrc = '';
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      if (file.type.includes('image')) {
        this.isImageSelected = true;
        this.selectedImageFile = file;
      }
    }
  }

  getImagePreviewUrl(): any {
    return this.isImageSelected ? URL.createObjectURL(this.selectedImageFile) : null;
  }

  initializeSelectList() {
    this.camService.getCategories().subscribe(res => {
      this.categories = res;
    })
    this.camService.getMaterials().subscribe(res => {
      this.materials = res;
    })
    this.unitOfMeasure = [
      { name: 'mm', key: 'mm' },
      { name: 'cm', key: 'cm' },
      { name: 'm', key: 'm' },
    ]
  }

  

}

