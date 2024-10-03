import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { Profile, UpdateUsernameDto , UpdatePhoneDto, UpdatePasswordDto} from 'src/app/core/models/profile';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { PasswordCriteria} from 'src/app/core/models/profile';
import { UserStoreService } from 'src/app/core/services/user-store.service';


@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.css'],
  providers: [MessageService]
})
export class ManageProfileComponent implements OnInit{
  // component
  profile!: Profile;
  loginMethod: string | null = null;
  breadcrumbItems: MenuItem[] | undefined;
  isLoading: boolean = false;
  
  // form
  updatePasswordForm!: FormGroup; 

  // dialog visisbility
  updateUserNameVisible: boolean = false;
  updatePhoneNumberVisible: boolean = false;
  updatePasswordVisible: boolean = false;
  updateAvatarVisible: boolean = false;

  // model
  newUsername: string ='';
  newPhoneNumber: string='';
  newPassword: string='';
  isImageSelected: boolean = false;
  selectedImageFile: File | null = null;
  imagePreviewUrl: string | ArrayBuffer | null = null;

  // validate model
  userNameError: boolean = false;
  phoneNumberError: boolean = false;
  passwordError: boolean = false;
  passwordCriteria: PasswordCriteria = {
    hasLowercase: false,
    hasUppercase: false,
    hasDigit: false,
    hasSpecialChar: false,
    isValidLength: false,
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private userStore: UserStoreService) { }

  ngOnInit(): void {
    this.breadcrumbItems = [{ label: 'Thông tin cá nhân' }];
    const role = this.authService.getRoleFromToken();
    const userId = this.authService.getUserIdFromToken();

    this.userService.getProfileByUserId(userId).subscribe(res => {
      this.profile = res;
    });

    this.userService.checkLoginMethod(userId).subscribe(res => {
      this.loginMethod = res.loginMethod;
    }, error => {
      console.error('Error checking login method', error);
    });

    this.updatePasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, this.passwordValidator]],
      confirmedPassword: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });   
  }

  openUserNameDialog() {
    this.updateUserNameVisible = true;
  }

  openPhoneNumberDialog() {
    this.updatePhoneNumberVisible = true;
  }

  openPasswordDialog() {
    this.updatePasswordVisible = true;
  }

  openAvatarDialog() {
    this.updateAvatarVisible = true;
  }

  updateUsername() {
    const control = { value: this.newUsername } as AbstractControl;
    const validationErrors = this.userNameValidator(control);
    const usernameError = validationErrors ? validationErrors['invalidUserName'] : false;
  
    if (usernameError) {
      this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: 'Tên người dùng không hợp lệ' });
      return;
    }
  
    const model: UpdateUsernameDto = { username: this.newUsername };
    this.userService.updateUserName(this.profile.id, model).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật tên người dùng thành công' });
        this.updateUserNameVisible = false; 
        this.userService.getProfileByUserId(this.profile.id).subscribe(res => {
          this.profile = res;
          this.storeUserInformation(res);
        });
        this.newUsername='';
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: 'Cập nhật tên người dùng thất bại' });
      }
    );
  }

  userNameValidator(control: AbstractControl): ValidationErrors | null {
    const userName = control.value;

    if (!/^[a-z0-9]{8,14}$/.test(userName)) {
      return { invalidUserName: true };
    }

    return null;
  }
  updatePhoneNumber() {
    const control = { value: this.newPhoneNumber } as AbstractControl;
    const validationErrors = this.phoneNumberValidator(control);
    this.phoneNumberError = validationErrors ? validationErrors['invalidPhoneNumber'] : false;

    if (this.phoneNumberError) {
      return;
    }

    const model: UpdatePhoneDto = { phonenumber: this.newPhoneNumber };
    this.userService.updatePhoneNumber(this.profile.id, model).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật số điện thoại thành công' });
        this.updatePhoneNumberVisible = false; 
        this.userService.getProfileByUserId(this.profile.id).subscribe(res => {
          this.profile = res;
          this.storeUserInformation(res);
        });
        this.newPhoneNumber = '';
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: 'Cập nhật số điện thoại thất bại' });
      }
    );
  }
  
  validatePhoneNumber() {
    const control = { value: this.newPhoneNumber } as AbstractControl;
    const validationErrors = this.phoneNumberValidator(control);
    this.phoneNumberError = validationErrors ? validationErrors['invalidPhoneNumber'] : false;
  }

  validateUsername() {
    const control = { value: this.newUsername } as AbstractControl;
    const validationErrors = this.userNameValidator(control);
    this.userNameError = validationErrors ? validationErrors['invalidUserName'] : false;
  }

  updatePassword() {
    if(this.updatePasswordForm.invalid){
      return;
    }
    const oldPassword = this.updatePasswordForm.get('oldPassword')!.value;
    const newPassword = this.updatePasswordForm.get('newPassword')!.value;

    const model: UpdatePasswordDto = {
        newpassword: newPassword,
        currentpassword: oldPassword
    };
    this.userService.updatePassword(this.profile.id, model).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật mật khẩu thành công' });
        this.updatePasswordVisible = false; 
        this.userService.getProfileByUserId(this.profile.id).subscribe(res => {
          this.profile = res;
        });
        this.updatePasswordForm.reset();
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: 'Cập nhật mật khẩu thất bại' });
      }
    );
  }

  phoneNumberValidator(control: AbstractControl): ValidationErrors | null {
    const phoneNumber = control.value;
    if (!/^\d{10,11}$/.test(phoneNumber)) {
      return { invalidPhoneNumber: true };
    }
    return null;
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('newPassword')!.value;
    const confirmedPassword = control.get('confirmedPassword')!.value;
    if (password !== confirmedPassword) {
      control.get('confirmedPassword')!.setErrors({ passwordMatch: true });
      return true;
    } else {
      return null;
    }
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}/.test(password)) {
      return { invalidPassword: true };
    }
    return null;
  }

  onPasswordChange(password: string): void {
    this.passwordCriteria.hasLowercase = this.hasLowercase(password);
    this.passwordCriteria.hasUppercase = this.hasUppercase(password);
    this.passwordCriteria.hasDigit = this.hasDigit(password);
    this.passwordCriteria.hasSpecialChar = this.hasSpecialChar(password);
    this.passwordCriteria.isValidLength = this.isValidLength(password);
  }
  
  hasLowercase(password: string): boolean {
    return /[a-z]/.test(password);
  }

  hasUppercase(password: string): boolean {
    return /[A-Z]/.test(password);
  }

  hasDigit(password: string): boolean {
    return /\d/.test(password);
  }

  hasSpecialChar(password: string): boolean {
    return /[!@#$%^&*(),.?":{}|<>]/.test(password);
  }

  isValidLength(password: string): boolean {
    return password.length >= 8;
  }

  updateAvatar() {
    if (!this.isImageSelected || !this.selectedImageFile) {
      this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: 'Vui lòng chọn một hình ảnh.' });
      return;
    }
  
    const formData = new FormData();
    formData.append('avatar', this.selectedImageFile);
  
    this.userService.updateAvatar(this.profile.id, formData).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật avatar thành công' });
        this.updateAvatarVisible = false; 
        this.userService.getProfileByUserId(this.profile.id).subscribe(res => {
          this.profile = res;
          this.storeUserInformation(res);
        });
        this.isImageSelected = false;
        this.selectedImageFile = null;
        this.imagePreviewUrl = null;
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: 'Cập nhật avatar thất bại' });
      }
    );
  }
  
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      if (file.type.includes('image')) {
        this.isImageSelected = true;
        this.selectedImageFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          const target = e.target as FileReader;
          this.imagePreviewUrl = target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }
  
  getImagePreviewUrl(): string | ArrayBuffer | null {
    return this.imagePreviewUrl;
  }

  storeUserInformation(res: Profile) {
    this.userStore.setUsernameForStore(res.userName);
    this.userStore.setPhoneNumberForStore(res.phoneNumber);
    this.userStore.setImgPathForStore(res.imgPath);
  }
}   
