import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductService } from 'src/app/core/services/product.service';
import { FileUpload } from 'primeng/fileupload';
import { CategoryAndMaterialService } from 'src/app/core/services/category-and-service.service';
import { Material } from 'src/app/core/models/material';
import { Category } from 'src/app/core/models/category';
@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.css'],
  providers: [MessageService]
})
export class AddProductFormComponent implements OnInit, AfterViewInit {

  @ViewChild('uploadedFiles') uploadedFiles!: FileUpload;
  addProductForm!: FormGroup;
  id!: string;
  breadcrumbItems: MenuItem[] | undefined;
  isLoading: boolean = false;
  materials: Material[] = [];
  categories: Category[] = [];

  constructor(private categoryService: CategoryAndMaterialService,private messageService: MessageService, private authService: AuthService, private snackBar: MatSnackBar, private fb: FormBuilder, private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.breadcrumbItems = [{label: 'Tạo mới sản phẩm'},];
    this.id = this.authService.getManagedStoreIdFromToken();
    this.addProductForm! = this.fb.group({
      name: ['', [Validators.required, this.nameValidator]],
      selectedCategories: ['', [Validators.required]],
      selectedMaterials: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0), Validators.max(50000000), this.numericValidator]],
    });
    this.initMultiselect();
  }

  initMultiselect(){
    this.categoryService.getCategories().subscribe(res => {
      this.categories = res;
    })
    this.categoryService.getMaterials().subscribe(res => {
      this.materials = res;
    })
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
    if (!/^[a-zA-Z0-9\u0041-\u007A\u00C0-\u00FF\u0102-\u1EF9\s]{4,50}$/.test(productName)) {
      return { invalidProductName: true };
    }
    return null;
  }
  
  onAddProduct() {
    if (this.addProductForm.valid) {
      this.isLoading=true;
      const formData = new FormData();
      formData.append('name', this.addProductForm.get('name')!.value);
      formData.append('price', this.addProductForm.get('price')!.value);
      var listCateIds = this.addProductForm.get('selectedCategories')!.value
      var listMaterialIds = this.addProductForm.get('selectedMaterials')!.value

      listCateIds.forEach((element: any) => {
        formData.append('categoryIds', element);
      })
      
      listMaterialIds.forEach((element: any) => {
        formData.append('materialIds', element);
      })

      this.uploadedFiles._files.forEach((element: string | Blob) => {
        formData.append('files', element);
      });
      formData.append('storeId', this.id);
      formData.append('description', this.addProductForm.get('description')!.value);
      this.productService.addProduct(formData)
        .subscribe({
          next: (res) => {
            this.router.navigate(['mdashboard/product-manager']);
            this.openSnackBar(`${res.name} đã được thêm thành công!`, "Ẩn");
            this.isLoading=false;
          },
          error: (err) => {
            alert(err?.error.message);
          }
        });
    }
  }

  public ngAfterViewInit(): void {
    const imgButton = document.getElementsByClassName('ql-image');
    for (let i = 0; i < imgButton.length; i++) {
      imgButton[i].remove();
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }
}
