import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category';
import { Material } from 'src/app/core/models/material';
import { CategoryAndMaterialService } from 'src/app/core/services/category-and-service.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css'],
  providers: [MessageService],

})
export class ManageCategoriesComponent implements OnInit {

  listCategories: Category[] = [];
  listMaterials: Material[] = [];
  categoryDialog: boolean = false;
  materialDialog: boolean = false;

  submitted: boolean = false;
  category!: Category;
  material!: Material;

  constructor(private service: CategoryAndMaterialService, private messageService: MessageService) { }

  openNewCategory() {
    this.category = {};
    this.submitted = false;
    this.categoryDialog = true;
  }

  hideCategoryDialog() {
    this.categoryDialog = false;
    this.submitted = false;
  }

  openNewMaterial() {
    this.material = {};
    this.submitted = false;
    this.materialDialog = true;
  }

  hideMaterialDialog() {
    this.materialDialog = false;
    this.submitted = false;
  }


  ngOnInit() {
    this.service.getCategories().subscribe(res => {
      this.listCategories = res;
    })
    this.service.getMaterials().subscribe(res => {
      this.listMaterials = res;
    })
  }

  createCategory() {
    this.service.addCategory(this.category).subscribe(res => {
      this.messageService.add({ severity: 'success', summary: 'Thành công', detail: `Tạo thành công danh mục ${res.name}`, life: 3000 });
      this.categoryDialog = false;
      this.category = {};
      this.service.getCategories().subscribe(res => {
        this.listCategories = res;
      })
    })
  }

  createMaterial() {
    this.service.addMaterial(this.material).subscribe(res => {
      this.messageService.add({ severity: 'success', summary: 'Thành công', detail: `Tạo thành công chất liệu ${res.name}`, life: 3000 });
      this.materialDialog = false;
      this.material = {};
      this.service.getMaterials().subscribe(res => {
        this.listMaterials = res;
      })
    })
  }
}
