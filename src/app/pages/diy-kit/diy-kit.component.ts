import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-diy-kit',
  templateUrl: './diy-kit.component.html',
  styleUrls: ['./diy-kit.component.css']
})
export class DiyKitComponent implements OnInit {

  breadcrumbItems: MenuItem[] | undefined;
  fromPrice: number | undefined;
  toPrice: number | undefined;
  selectedCategories: any[] = [];
  categories!: any[];
  selectedComponents!: any[];
  selectedStarOptions!: any[];
  searchQuery = '';
  sortItems: any[] | undefined;
  formGroup!: FormGroup;
  listProducts!: any[];
  starOption!: any[];

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    this.breadcrumbItems = [{ label: 'DIY Kit' }];
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'];
      if (this.searchQuery) {
        if (this.searchQuery != '') {
          this.searchProductsAndUpdateList();
        } else {
          this.getAllProducts();
        }
      } else {
        this.getAllProducts();
      }
    });
    this.initializeSelectList();
    this.formGroup = new FormGroup({
      selectedOption: new FormControl<any | null>(null)
    });
    this.formGroup.get('selectedOption')?.valueChanges.subscribe((selectedOption) => {
    });
  }


  getAllProducts(){
    // tạm thời get 24 cái nếu trang này init ko có searchQuery
    this.productService.getAllProductsForUser(24).subscribe(res => {
      this.listProducts = res;
    })
  }

  searchProductsAndUpdateList() {
    if (this.searchQuery != '') {
      this.productService.searchProducts(this.searchQuery).subscribe(
        (res) => {
          this.listProducts = res;
          this.sortProducts('RELEVANT');
          this.formGroup = new FormGroup({
            selectedOption: new FormControl<any | null>(null)
          });
        },
        (error) => {
          console.error('Error fetching search results:', error);
        }
      );
    }
  }


  initializeSelectList() {
    this.categories = [
      { name: 'Búp bê và mô hình', key: '1' },
      { name: 'Hình dán', key: '2' },
      { name: 'May thêu nghệ thuật', key: '3' },
      { name: 'Ảnh nghệ thuật', key: '4' },
      { name: 'Doanh nghiệp', key: '5' },
      { name: 'Tranh vẽ và Minh họa', key: '6' },
      { name: 'Bưu thiếp', key: '7' },
    ];
    this.sortItems = [
      { name: 'Liên quan', code: 'RELEVANT' },
      { name: 'Giá từ thấp đến cao', code: 'CHEAP_TO_EXPENSIVE' },
      { name: 'Giá từ cao đến thấp', code: 'EXPENSIVE_TO_CHEAP' },
      { name: 'Đánh giá thấp đến cao', code: 'RATING_ASC' },
      { name: 'Đánh giá cao đến thấp', code: 'RATING_DESC' },
    ];
    this.starOption = [
      { name: 'Từ 5 sao', numberOfStars: [1,2,3,4,5], value:'5'},
      { name: 'Từ 4 sao', numberOfStars: [1,2,3,4], value:'4'},
      { name: 'Từ 3 sao', numberOfStars: [1,2,3], value:'3'},
      { name: 'Từ 2 sao', numberOfStars: [1,2], value:'2'},
      { name: 'Từ 1 sao', numberOfStars: [1], value:'1'},
    ]
  }

  sortProducts(selectedOption: string) {
    switch (selectedOption) {
      case 'CHEAP_TO_EXPENSIVE':
        this.listProducts.sort((a, b) => a.price - b.price);
        break;
      case 'EXPENSIVE_TO_CHEAP':
        this.listProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
  }
}
