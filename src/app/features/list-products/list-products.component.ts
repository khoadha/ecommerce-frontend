import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Cart } from 'src/app/core/models/cart';
import { Product } from 'src/app/core/models/product';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent implements OnInit {

  @Input()
  listProducts: Product[] = [];
  @Input()
  itemsPerRow!: number;
  @Input()
  title!: string;
  @Input()
  isCarousel!: boolean;
  @Output() 
  cartSizeUpdated = new EventEmitter<number>();

  role!: string;
  cartId!: number;
  cart!: Cart;

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, private authService: AuthService, private cartService: CartService, public router: Router) { }

  ngOnInit(): void {
    this.role = this.authService.getRoleFromToken();
    if (this.role === "User") {
      this.cartId = this.authService.getCartIdFromToken();
      this.cartService.getCartById(this.cartId).subscribe(res => {
        this.cart = res;
      });
    }
  }

  loadingStates: { [key: number]: boolean } = {};

  onAddToCart(itemId: number, itemName: string) {
    if (this.role == "User") {
      this.loadingStates[itemId] = true;
      const existingItem = this.cart.items.find(item => item.product.id === itemId);
      if (existingItem) {
        let params = new HttpParams();
        params = params.append('itemId', existingItem.id);
        params = params.append('value', 1);
        params = params.append('isIncrease', true);
        const requestOptions = { params: params };
        this.cartService.increaseQuantity(requestOptions).subscribe(noContent => {
          this.loadingStates[itemId] = false;
          this.openSnackBar(`Số lượng của ${itemName} đă được tăng`, "Ẩn")
        });
      } else {
        this.cartService.addItemToCart(this.cartId, itemId).subscribe(res => {
          this.cart = res;
          this.loadingStates[itemId] = false;
          this.openSnackBar(`${itemName} đã được thêm vào giỏ`, "Ẩn")
        });
      }

    } else if (this.role == undefined) {
      this.router.navigate(['sign-in'], {queryParams: { redirectUrl: `/product-detail/${itemId}`}});
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

  isStoreDetailRoute() {
    return this.router.url.includes("store-detail");
  }

  onClickBuyNow(product: Product) {
    if (this.role == "User") {
      var productData = [
        {
          cost: product.price,
          quantity: 1,
          product: product
        }
      ];
      var data = { 0: productData } as Record<number, any>;
      sessionStorage.removeItem('check-out-data');
      sessionStorage.setItem('check-out-data', JSON.stringify(data));
      this.router.navigate(['check-out'], { queryParams: { option: 'buynow' } });
    } else if (this.role == undefined) {
      this.router.navigate(['sign-in'], {queryParams: { redirectUrl: `/product-detail/${product.id}`}});
    }
  }
}
