import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/product';
import { ProductService } from 'src/app/core/services/product.service';
import { DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-detail-dialog',
  templateUrl: './product-detail-dialog.component.html',
  styleUrls: ['./product-detail-dialog.component.css']
})
export class ProductDetailDialogComponent implements OnInit {

  product!: Product;

  constructor(
    private snackBar: MatSnackBar,
    public productService: ProductService, 
    public config: DynamicDialogConfig, 
    public ref: DynamicDialogRef, 
    private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.product = this.config.data['product'];
    this.cd.markForCheck();
  }

  onChangeState() {
    if(this.product.isSoldOut){
       this.onInStock(this.product.id);
    } else {
      this.onSoldOut(this.product.id);
    }
  }

  onSoldOut(id: number) {
    this.productService.onSoldOutProduct(id).subscribe(product => {
      this.productService.getProductById(product.id).subscribe(product => {
        this.product = product;
        this.openSnackBar(`${product.name} đã được đánh dấu là hết hàng`, "Ẩn");
      });
    })
  }

  onInStock(id: number) {
    this.productService.onInStockProduct(id).subscribe(product => {
      this.productService.getProductById(product.id).subscribe(product => {
        this.product = product;
        this.openSnackBar(`${product.name} đã được đánh dấu là còn hàng`, "Ẩn");
      });
    })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }
}

