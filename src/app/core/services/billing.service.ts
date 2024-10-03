import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  readonly baseUrl = environment.baseUrl;
  readonly APIUrl = this.baseUrl + "billing";
  
  constructor(private http: HttpClient) { }

  getBillingPackage(): Observable<any> {
    return this.http.get<any>(this.APIUrl+'-package');
  }

  getAllBilling() {
    return this.http.get(this.APIUrl);
  }

  adminUpdateBilling(status: number, billingId: number) {
    return this.http.put(`${this.APIUrl}?status=${status}&billingId=${billingId}`,{})
  }

  createBilling(data: any) {
    return this.http.post(this.APIUrl, data);
  }

  getBillingsByStoreId(storeId: number): Observable<any> {
    return this.http.get<any>(this.APIUrl+'/'+storeId);
  }

  calculateBilling(storeId: number): Observable<any> {
    return this.http.get<any>(this.APIUrl+'-calculate?storeId='+storeId);
  }

  getStorePackage(id: number) {
    return this.http.get<any>(this.APIUrl+'-package-store/'+id);
  }

  getStorePackageData(id: number) {
    return this.http.get<any>(this.APIUrl+'-package-store-data/'+id);
  }

  getBillingAvailableOrders(storeId: number):Observable<Order[]> {
    return this.http.get<Order[]>(this.APIUrl+'-available-orders?storeId='+storeId);
  }

  buyBillingPackage(storeId: number, packageId: number) {
    return this.http.put(this.APIUrl+ `-package-buy?storeId=${storeId}&packageId=${packageId}`, {});
  }
}
