import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/models/product';
import { Store } from 'src/app/core/models/store';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductService } from 'src/app/core/services/product.service';
import { SetupService } from 'src/app/core/services/setup.service';
import { StoreService } from 'src/app/core/services/store.service';
import { UserStoreService } from 'src/app/core/services/user-store.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor(
    private userStore: UserStoreService,
    private authService: AuthService,
    private storeService: StoreService,
    private productService: ProductService,
    private setupService: SetupService
  ) {}

  appListStores!: Store[];
  appListProducts!: Product[];
  appListProductsBySale!: Product[];
  role!: string[];
  username!: string;

  bannerCarouselImages: string[] = [];
  bannerImages: string[] = [];

  ngOnInit(): void {
    this.setupService.getBannerImages().subscribe(res => {
      this.bannerCarouselImages = res.bannerCarouselImages;
      this.bannerImages = res.bannerImages;
    })
    this.storeService.getAllStores().subscribe((res) => {
      this.appListStores = res.filter((a) => a.isVerified == true);
    });
    this.productService.getAllProductsForUser(12).subscribe((res) => {
      this.appListProducts = res;
    });
    this.productService.getAllProductsForUserBySale(12).subscribe((res) => {
      this.appListProductsBySale = res;
    });
    this.userStore.getUsernameFromStore().subscribe((val) => {
      let usernameFromToken = this.authService.getUsernameFromToken();
      this.username = val || usernameFromToken;
    });
    this.userStore.getRoleFromStore().subscribe((val) => {
      const roleFromToken = this.authService.getRoleFromToken();
      this.role = val || roleFromToken;
    });
  }
}
