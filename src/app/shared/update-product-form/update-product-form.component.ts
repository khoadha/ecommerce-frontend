import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/product';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-update-product-form',
  templateUrl: './update-product-form.component.html',
  styleUrls: ['./update-product-form.component.css']
})
export class UpdateProductFormComponent implements OnInit {

  @Input()
  product!: Product;
  updateProductForm!: FormGroup;

  constructor(private snackBar: MatSnackBar, private fb: FormBuilder, private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.updateProductForm = this.fb.group({
      name: ['', [Validators.required, this.nameValidator]],
      price: ['', [Validators.required, Validators.min(0), Validators.max(50000000), this.numericValidator]]
    });
  }
  
  numericValidator(control: AbstractControl): ValidationErrors | null {
    const price = control.value;
    if (!/^\d+$/.test(price)) {
      return { invalidPrice: true };
    }
    return null;
  }

  nameValidator(control: AbstractControl): ValidationErrors | null {
    const productName = control.value;
    if (!/^[a-zA-Z0-9\s]{4,50}$/.test(productName)) {
      return { invalidProductName: true };
    }
    return null;
  }
  

  onUpdateProduct(){
    if (this.updateProductForm.valid) {
      this.productService.updateProduct(this.product.id ,this.updateProductForm.value)
        .subscribe({
          next: (res) => {
            this.updateProductForm.reset();
            this.openSnackBar(`${res.name} is successfully updated!`,"Ẩn");
          },
          error: (err) => {
            alert(err?.error.message);
          }
        });
    } else {
      console.error('Form validation error');
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }
}
