import { Component, OnInit } from '@angular/core';
// import { RegisterObj } from 'src/app/core/models/authObj';
import { FormGroup, FormControl, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm!: FormGroup; 
  isLoading: boolean = false;
  selectedImageFile!: File;
  isImageSelected: boolean = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  pwHide = true; //password's hide
  cpwHide = true; //confirm password's hide

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      userName: ['', [Validators.required, this.userNameValidator]],
      email: ['', [Validators.required, Validators.email]],
      image: [null, Validators.required],
      password: ['', [Validators.required, this.passwordValidator]],
      phoneNumber: ['', [Validators.required, this.phoneNumberValidator]],
      confirmedPassword: ['', Validators.required],
      agreeCheckBox: ['', Validators.requiredTrue],
    }, { validator: this.passwordMatchValidator });
  }


  onSignUp() {
    if (this.signUpForm.valid) {
      const formData = new FormData();
      formData.append('userName', this.signUpForm.get('userName')!.value);
      formData.append('email', this.signUpForm.get('email')!.value);
      formData.append('password', this.signUpForm.get('password')!.value);
      formData.append('phoneNumber', this.signUpForm.get('phoneNumber')!.value);
      formData.append('image', this.signUpForm.get('image')!.value);
      this.isLoading = true;
      this.auth.register(formData)
        .subscribe({
          next: (res) => {
            this.signUpForm.reset();
            localStorage.setItem('tempmail', res.email)
            this.router.navigate(['check-email']);
          },
          error: (err) => {
            this.isLoading = false;
            alert(err?.error.message);
          }
        });
    } else {
      this.isLoading = false;
      console.error('Form validation error');
    }
  }

  onFileSelected(event: Event, controlName: string) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      if(file.type.includes('image')) {
        this.isImageSelected = true;
        this.selectedImageFile = file;
      }
      this.signUpForm.get(controlName)!.setValue(file);
    }
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')!.value;
    const confirmedPassword = control.get('confirmedPassword')!.value;
    if (password !== confirmedPassword) {
      control.get('confirmedPassword')!.setErrors({ passwordMatch: true });
      return true;
    } else {
      return null;
    }
  }

  userNameValidator(control: AbstractControl): ValidationErrors | null {
    const userName = control.value;

    if (!/^[a-z0-9]{8,14}$/.test(userName)) {
      return { invalidUserName: true };
    }

    return null;
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}/.test(password)) {
      return { invalidPassword: true };
    }
    return null;
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
}


