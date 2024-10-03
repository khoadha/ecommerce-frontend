import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenApiModel } from 'src/app/core/models/token-api.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProvinceService } from 'src/app/core/services/province.service';
import { SetupService } from 'src/app/core/services/setup.service';
import { UserStoreService } from 'src/app/core/services/user-store.service';
import { Message } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-sign-up-store',
  templateUrl: './sign-up-store.component.html',
  styleUrls: ['./sign-up-store.component.css']
})
export class SignUpStoreComponent implements OnInit {

  isImageSelected: boolean = false;
  isThumbnailImageSelected: boolean = false;
  isLoading: boolean = false;

  storeInformationForm!: FormGroup;
  storeImageForm!: FormGroup;
  storeLocationForm!: FormGroup;

  currentUserId!: string;
  currentUserEmail!: string;
  userAddress!: string;

  selectedImageFile!: File;
  selectedThumbnailImageFile!: File;
  tokenApi!: TokenApiModel;
  messages: Message[] | undefined;

  listProvinces: any;
  listDistricts: any;
  listWards: any;
  selectedProvince: any;
  selectedDistrict: any;
  selectedWard: any;
  overviewInformation: any = {};

  constructor(private dialog: MatDialog, private provinceService: ProvinceService, private fb: FormBuilder, private auth: AuthService, private router: Router, private userStoreService: UserStoreService, private setupService: SetupService) { }

  ngOnInit(): void {
    this.loadProvincesData();
    this.initializeFormGroup();
    this.initializeUserInformation();
  }

  initializeUserInformation() {
    this.tokenApi = {
      accessToken: this.auth.getToken()!,
      refreshToken: this.auth.getRefreshToken()!
    };
    this.userStoreService.getUserIdFromStore()
      .subscribe(val => {
        const userId = this.auth.getUserIdFromToken();
        this.currentUserId = val || userId;
      })
    this.userStoreService.getEmailFromStore()
      .subscribe(val => {
        const email = this.auth.getEmailFromToken();
        this.currentUserEmail = val || email;
      });
  }

  initializeFormGroup() {
    this.storeInformationForm = this.fb.group({
      phoneNumber: ['', [Validators.required, this.phoneNumberValidator]],
      name: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.storeLocationForm = this.fb.group({
      cityControl: ['', Validators.required],
      districtControl: ['', Validators.required],
      wardControl: ['', Validators.required],
      streetControl: ['', Validators.required],
    });

    this.storeImageForm = this.fb.group({
      image: [null, Validators.required],
      thumbnailImage: [null, Validators.required],
    });
  }

  async onSubmitAddressData() {
    if (this.storeLocationForm.valid) {
      this.userAddress = [
        this.storeLocationForm.value.streetControl,
        this.selectedWard.WardName,
        this.selectedDistrict.DistrictName,
        this.selectedProvince.ProvinceName,
        'Việt Nam'
      ].join(',');
    }

    const userEmail = this.auth.getEmailFromToken();
    this.overviewInformation = {
      email: userEmail,
      phoneNumber: this.storeInformationForm.get('phoneNumber')!.value,
      name: this.storeInformationForm.get('name')!.value,
      description: this.storeInformationForm.get('description')!.value,
      location: this.userAddress,
      wardCode: this.selectedWard.WardCode,
      districtId: this.selectedDistrict.DistrictID
    }
  }

  onFileSelected(event: Event, controlName: string) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      if (file.type.includes('image')) {
        if (controlName === 'image') {
          this.isImageSelected = true;
          this.selectedImageFile = file;
        } else if (controlName === 'thumbnailImage') {
          this.isThumbnailImageSelected = true;
          this.selectedThumbnailImageFile = file;
        }
      }
      this.storeInformationForm.get(controlName)!.setValue(file);
    }
  }


  onSubmit() {
    let dialogRef = this.dialog.open(ConfirmDialogComponent);
    let instance = dialogRef.componentInstance;
    instance.headerContent = this.dialogConfig.headerContent;
    instance.bodyContent = this.dialogConfig.bodyContent;
    instance.submitButtonContent = this.dialogConfig.submitButtonContent;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true;
        const formData = new FormData();
        formData.append('email', this.overviewInformation.email);
        formData.append('phoneNumber', this.overviewInformation.phoneNumber);
        formData.append('name', this.overviewInformation.name);
        formData.append('description', this.overviewInformation.description);
        formData.append('location', this.overviewInformation.location);
        formData.append('wardCode', this.overviewInformation.wardCode)
        formData.append('districtId', this.overviewInformation.districtId)
        formData.append('image', this.selectedImageFile);
        formData.append('thumbnailImage', this.selectedThumbnailImageFile);
        this.auth.registerStore(formData)
          .subscribe({
            next: (res) => {
              this.isLoading = false;
              alert('Vui lòng đăng nhập lại để hoàn tất quá trình đăng kí!')
              this.auth.logOut();
              this.router.navigate(['sign-in']);
            },
            error: (err) => {
              this.isLoading = false;
              alert(err?.error.message);
            }
          });
      }
    })
  }

  private dialogConfig = {
    headerContent: 'Xác nhận thông tin',
    bodyContent: 'Hãy kiểm tra thật kĩ thông tin trước khi xác nhận!',
    submitButtonContent: 'Tôi đã đọc kĩ!'
  };

  loadProvincesData() {
    this.provinceService.getProvinces().subscribe(res => {
      this.listProvinces = res.data;
    })
  }

  loadDistrictsData(selectedProvince: any) {
    this.selectedProvince = selectedProvince;
    this.provinceService.getDistrictsByProvinceCode(this.selectedProvince.ProvinceID).subscribe((res: any) => {
      this.listDistricts = res.data;
    });
  }

  loadWardsData(selectedDistrict: any) {
    this.selectedDistrict = selectedDistrict;
    this.provinceService.getWardsByDistrictCode(this.selectedDistrict.DistrictID).subscribe((res: any) => {
      this.listWards = res.data;
    });
  }

  onWardSelect(selectedWard: any) {
    this.selectedWard = selectedWard;
  }


  phoneNumberValidator(control: AbstractControl): ValidationErrors | null {
    const phoneNumber = control.value;
    if (!/^\d{10,11}$/.test(phoneNumber)) {
      return { invalidPhoneNumber: true };
    }
    return null;
  }

  getImagePreviewUrl(): string | null {
    return this.isImageSelected ? URL.createObjectURL(this.selectedImageFile) : null;
  }

  getThumbnailImagePreviewUrl(): string | null {
    return this.isThumbnailImageSelected ? URL.createObjectURL(this.selectedThumbnailImageFile) : null;
  }
}
