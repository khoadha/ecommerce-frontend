import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  ForgotPwdForm!: FormGroup; 
  isLoading: boolean = false;

  constructor(
    private authService: AuthService, 
    private fb: FormBuilder,
    private router: Router
  ) { 
    this.ForgotPwdForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  forgotPassword() {
    if (this.ForgotPwdForm.invalid) {
      this.isLoading = false;
      console.error('Form validation error');
    }

    const formData = new FormData();
    formData.append('email', this.ForgotPwdForm.get('email')!.value);
    this.isLoading = true;

    this.authService.forgotPassword(formData).subscribe({
      next: (res) => {
        this.ForgotPwdForm.reset();
        localStorage.setItem('tempmail', res.email)
        this.router.navigate(['check-email']);
      },
      error: (err) => {
        this.isLoading = false;
        alert(err?.error.message);
      }
    });
  }
}
