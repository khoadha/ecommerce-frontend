import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Product } from 'src/app/core/models/product';
import { CategoryAndMaterialService } from 'src/app/core/services/category-and-service.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})
export class SearchPageComponent implements OnInit {
  @ViewChild('paginator', { static: true }) paginator!: Paginator;

  fromPrice: number | undefined;
  toPrice: number | undefined;
  breadcrumbItems: MenuItem[] | undefined;

  searchQuery = '';

  selectedCategories: any[] = [];
  materials!: any[];
  selectedMaterials: any[] = [];
  categories!: any[];

  listProducts: Product[] = [];
  sortItems: any[] | undefined;
  selectedSortOption: any;

  starOption!: any[];
  selectedStarOption: any;

  formGroup!: FormGroup;

  activeIndex: number = 0;
  sortIndex: number = 0;
  size: number = 15;
  offset: number = 0;
  shouldTriggerOnPageChange: boolean = true;
  totalProducts: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private camService: CategoryAndMaterialService, //Category and material
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.breadcrumbItems = [{ label: 'Tìm kiếm' }];
    this.initializeSelectList();
    const params = this.route.snapshot.queryParams;
    this.searchQuery = params['q'] ?? '';

    this.sortIndex = parseInt(params['sort'] ?? 0);

    this.route.queryParams.subscribe((params) => {
      window.scrollTo(0, 0);
      this.searchQuery = params['q'] ?? '';
      this.sortIndex = parseInt(params['sort'] ?? 0);
      this.handleSearch();
    });
  }

  handleSearch() {
    const payload: SearchPayload = {
      search: this.searchQuery,
      size: this.size,
      offSet: this.offset,
      sortOption: this.sortIndex,
    };

    if (
      this.selectedCategories != undefined &&
      this.selectedCategories.length > 0
    ) {
      payload.categories = this.selectedCategories;
    }

    if (
      this.selectedMaterials != undefined &&
      this.selectedMaterials.length > 0
    ) {
      payload.materials = this.selectedMaterials;
    }

    if (this.fromPrice != undefined && this.toPrice != undefined) {
      if (this.fromPrice > this.toPrice) return;
      payload.fromPrice = this.fromPrice;
      payload.toPrice = this.toPrice;
    }

    if(this.selectedStarOption!= undefined) {
      payload.starOption = this.selectedStarOption;
    }

    this.productService.searchProducts(payload).subscribe((res) => {
      this.listProducts = res.data;
      this.totalProducts = res.total;
    });
  }

  onPageChange(e: PageEvent) {
    if (this.shouldTriggerOnPageChange) {
      this.offset = e.page;
      this.handleSearch();
    }
  }

  onSortChange(e: Event) {
    this.sortIndex = parseInt(this.selectedSortOption.code);
    this.updateUrl();
  }

  updateUrl() {
    this.resetPage();
    this.offset = 0;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        q: this.searchQuery,
        sort: this.selectedSortOption?.code,
      },
      queryParamsHandling: 'merge',
    });
  }

  onClearFilter() {
    this.selectedCategories = [];
    this.selectedMaterials = [];
    this.fromPrice = undefined;
    this.toPrice = undefined;
    this.selectedStarOption = undefined;
  }

  onApplyFilter() {
    this.offset = 0;
    this.handleSearch();
  }

  get displayPaginatorText() {
    const from = this.totalProducts > 0 ? this.paginator.first + 1 : 0;
    const to =
      this.paginator.first + this.paginator.rows > this.totalProducts
        ? this.totalProducts
        : this.paginator.first + this.paginator.rows;
    const ofTotal = this.totalProducts;
    return `Hiển thị từ ${from} đến ${to} của ${ofTotal} kết quả`;
  }

  private resetPage() {
    this.shouldTriggerOnPageChange = false;
    this.paginator.changePage(0);
    this.shouldTriggerOnPageChange = true;
  }

  initializeSelectList() {
    this.camService.getMaterials().subscribe((res) => {
      this.materials = res;
    });
    this.camService.getCategories().subscribe((res) => {
      this.categories = res;
    });
    this.sortItems = [
      { name: 'Liên quan', code: 0 },
      { name: 'Giá từ thấp đến cao', code: 1 },
      { name: 'Giá từ cao đến thấp', code: 2 },
    ];
    this.starOption = [
      { name: 'Từ 5 sao', numberOfStars: [1, 2, 3, 4, 5], value: 5 },
      { name: 'Từ 4 sao', numberOfStars: [1, 2, 3, 4], value: 4 },
      { name: 'Từ 3 sao', numberOfStars: [1, 2, 3], value: 3 },
      { name: 'Từ 2 sao', numberOfStars: [1, 2], value: 2 },
      { name: 'Từ 1 sao', numberOfStars: [1], value: 1 },
    ];
  }
}

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

interface SearchPayload {
  search: string;
  size: number;
  offSet: number;
  sortOption: number;
  categories?: any;
  materials?: any;
  starOption?: number;
  fromPrice?: number;
  toPrice?: number;
}
