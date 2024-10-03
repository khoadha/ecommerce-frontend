import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  readonly baseUrl = environment.baseUrl;
  readonly APIUrl = this.baseUrl+"order";

  constructor(private http: HttpClient) { }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(this.APIUrl+'/'+ id);
  }

  getOrdersByUserId(userId: string): Observable<Order[]> {
    return this.http.get<Order[]>(this.APIUrl+'/user/'+ userId);
  }
  
  getOrdersByStoreId(storeId: number): Observable<Order[]> {
    return this.http.get<Order[]>(this.APIUrl+'/store/'+ storeId);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.APIUrl + '/add', order);
  }

  onCancelOrder(orderId: number): Observable<Order> {
    return this.http.put<Order>(this.APIUrl + '/'+orderId+'/state'+'/1', {});
  }

  onConfirmOrder(orderId: number): Observable<Order> {
    return this.http.put<Order>(this.APIUrl + '/'+orderId+'/state'+'/3', {});
  }

  onCompleteOrder(orderId: number): Observable<Order> {
    return this.http.put<Order>(this.APIUrl + '/'+orderId+'/state'+'/4', {});
  }
}
