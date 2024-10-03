import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, map, tap } from 'rxjs';
import { Cart } from '../models/cart';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartUpdatedSubject = new Subject<void>();

  readonly baseUrl = environment.baseUrl;
  readonly APIUrl = this.baseUrl + "cart";

  constructor(private http: HttpClient) { }

  getCartById(id: number): Observable<Cart> {
    return this.http.get<Cart>(this.APIUrl + '/search/' + id);
  }

  clearCartItems(id: number): Observable<Cart> {
    return this.http.delete<Cart>(this.APIUrl + '/clear/' + id)
      .pipe(tap(() => this.cartUpdatedSubject.next()));
  }

  addItemToCart(id: number, itemId: number): Observable<Cart> {
    return this.http.post<Cart>(this.APIUrl + '/' + id + '/add/' + itemId, {})
      .pipe(tap(() => this.cartUpdatedSubject.next()));
  }

  increaseQuantity(requestOptions: any): Observable<any> {
    return this.http.put<any>(this.APIUrl + '/update', {}, requestOptions)
  }

  decreaseQuantity(requestOptions: any): Observable<any> {
    return this.http.put<any>(this.APIUrl + '/update', {}, requestOptions)
  }

  deleteItemFromCart(id: number, itemId: number): Observable<Cart> {
    return this.http.delete<Cart>(this.APIUrl + '/' + id + '/delete/' + itemId)
      .pipe(tap(() => this.cartUpdatedSubject.next()));
  }

  deleteItemFromCartAfterCheckout(cartItemIds: number[]): Observable<any> {
    return this.http.delete(`${this.APIUrl}/delete-after-checkout`, { body: cartItemIds });
  }

  getCartSize(id: number): Observable<number> {
    return this.getCartById(id).pipe(
      map(cart => cart.items.length)
    );
  }
  

  getCartUpdatedObservable(): Observable<void> {
    return this.cartUpdatedSubject.asObservable();
  }
}
