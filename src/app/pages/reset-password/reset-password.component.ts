import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})

export class ResetPasswordComponent implements OnInit {
  newPasswordForm: FormGroup = this.fb.group({
    newPassword: ['', [Validators.required, this.passwordValidator]],
    confirmedPassword: ['', Validators.required]
  }, { validator: this.passwordMatchValidator });

  pwHide = true; //password's hide
  cpwHide = true; //confirm password's hide
  token: string = '';
  userId: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || '';
      this.userId = params['userId'] || '';
    });
  }

  resetPassword() {
    if (this.newPasswordForm.invalid) {
      return;
    }
    const newPassword = this.newPasswordForm.get('newPassword')!.value;

    this.authService.resetPassword(this.userId, this.token, newPassword).subscribe({
      next: () => {        
        this.newPasswordForm.reset();
        this.router.navigate(['reset-password-success']);
      },
      error: (err) => {   
        alert(err?.error.message);
      }
    });
  }

  passwordMatchValidator(control: AbstractControl) {
    const newPassword = control.get('newPassword')!.value;
    const confirmedPassword = control.get('confirmedPassword')!.value;
    if (newPassword !== confirmedPassword) {
      control.get('confirmedPassword')!.setErrors({ passwordMatch: true });
      return { passwordMatch: true };
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
}
