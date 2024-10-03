// cart.component.ts
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Cart } from 'src/app/core/models/cart';
import { CartItem } from 'src/app/core/models/cartItem';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartId!: number;
  cartItems!: CartItem[];
  breadcrumbItems: MenuItem[] | undefined;
  selectedItems: CartItem[] = [];
  isLoading:boolean=false;

  constructor(private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar, private authService: AuthService, private cartService: CartService) { }

  ngOnInit(): void {
    this.breadcrumbItems = [{ label: 'Giỏ hàng' }];
    const role = this.authService.getRoleFromToken();
    if (role === "User") {
      this.cartId = this.authService.getCartIdFromToken();
      this.cartService.getCartById(this.cartId).subscribe(res => {
        this.cartItems = res.items.sort((a, b) => (a.product.storeId > b.product.storeId ? 1 : -1))
      });
    }
  }

  isEmptySelectedItems(): boolean{
    return this.selectedItems.length==0;
  }
 
  getTotalCost() {
    return this.cartItems.filter(item => this.selectedItems.includes(item)).map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }

  onRemoveFromCart(itemId: number, itemName: string) {
    this.isLoading = true;
    this.cartService.deleteItemFromCart(this.cartId, itemId).subscribe(res => {
      this.cartService.getCartById(this.cartId).subscribe(res => {
        this.cartItems = res.items.sort((a, b) => (a.product.storeId > b.product.storeId ? 1 : -1))
        this.isLoading=false;
        this.openSnackBar(`${itemName} đã bị xóa khỏi giỏ hàng`, "Hide")
      });
    })
    this.getTotalCost();
  }

  increaseQuantity(id: number) {
    this.isLoading = true;
    let params = new HttpParams();
    params = params.append('itemId', id);
    params = params.append('value', 1);
    params = params.append('isIncrease', true);
    const requestOptions = { params: params };
    this.cartService.increaseQuantity(requestOptions).subscribe(noContent => {
      this.cartService.getCartById(this.cartId).subscribe(res => {
        this.cartItems = res.items.sort((a, b) => (a.product.storeId > b.product.storeId ? 1 : -1))
        this.getTotalCost();
        this.isLoading = false;
      });
    });
    this.getTotalCost();
  }

  decreaseQuantity(id: number, quantity: number) {
    this.isLoading = true;
    if (quantity <= 1) {
      alert("Can't decrease to 0");
    } else {
      let params = new HttpParams();
      params = params.append('itemId', id);
      params = params.append('value', 1);
      params = params.append('isIncrease', false);
      const requestOptions = { params: params };
      this.cartService.decreaseQuantity(requestOptions).subscribe(noContent => {
        this.cartService.getCartById(this.cartId).subscribe(res => {
          this.cartItems = res.items.sort((a, b) => (a.product.storeId > b.product.storeId ? 1 : -1))
          this.isLoading = false;
        });
      });
    }
    this.getTotalCost();
  }

  onPurchase() {
    let dialogRef = this.dialog.open(ConfirmDialogComponent);
    let instance = dialogRef.componentInstance;
    instance.headerContent = this.dialogConfig.headerContent;
    instance.bodyContent = this.dialogConfig.bodyContent;
    instance.submitButtonContent = this.dialogConfig.submitButtonContent;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const seperatedDatas = this.seperateCartItemByStoreId(this.selectedItems);
        sessionStorage.removeItem('check-out-data');
        sessionStorage.setItem('check-out-data', JSON.stringify(seperatedDatas));
        this.router.navigate(['check-out']);
      } else {
        this.openSnackBar(`Kiểm tra kĩ giỏ hàng trước khi tiến hành thanh toán`, "Hide")
      }
    });
  }

  private dialogConfig = {
    headerContent: 'Xác nhận giỏ hàng',
    bodyContent: 'Bạn có chắc chắn chuyển tới bước thanh toán?',
    submitButtonContent: 'Chắc chắn'
  };

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

  seperateCartItemByStoreId(items: CartItem[]): Record<number, CartItem[]> {
    return items.reduce((acc, item) => {
      const key = item.product.storeId;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {} as Record<number, CartItem[]>);
  }
}


