import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductRatingData } from '../models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  readonly baseUrl = environment.baseUrl;
  readonly APIUrl = this.baseUrl + 'product';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.APIUrl);
  }

  searchProducts(payload: any): Observable<any> {
    return this.http.post(`${this.APIUrl}-search`, payload);
  }

  getAllProductsForUser(count: number): Observable<Product[]> {
    return this.http.get<Product[]>(this.APIUrl + `/user?count=${count}`);
  }

  getAllProductsForUserBySale(count: number): Observable<Product[]> {
    return this.http.get<Product[]>(this.APIUrl + `/userBySale?count=${count}`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(this.APIUrl + '/search/' + id);
  }

  getProductRatingData(id: number): Observable<ProductRatingData> {
    return this.http.get<ProductRatingData>(this.APIUrl + '/rating/' + id);
  }

  getProductImagesById(id: number): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/images/' + id);
  }

  getProductsByStoreId(storeId: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.APIUrl + '/searchByStore/' + storeId);
  }

  getProductsByStoreIdForUser(storeId: number): Observable<Product[]> {
    return this.http.get<Product[]>(
      this.APIUrl + '/user/searchByStore/' + storeId
    );
  }

  onSoldOutProduct(id: number): Observable<Product> {
    return this.http.put<Product>(this.APIUrl + '/soldOut/' + id, {});
  }

  onInStockProduct(id: number): Observable<Product> {
    return this.http.put<Product>(this.APIUrl + '/inStock/' + id, {});
  }

  addProduct(formData: FormData): Observable<Product> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };
    return this.http.post<Product>(this.APIUrl + '/add', formData, httpOptions);
  }

  updateProductImage(id: number, formData: FormData): Observable<Product> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };
    return this.http.put<Product>(
      this.APIUrl + '/' + id + '/image',
      formData,
      httpOptions
    );
  }

  updateProduct(id: number, product: Product) {
    return this.http.put<Product>(this.APIUrl + '/update/' + id, product);
  }
}
