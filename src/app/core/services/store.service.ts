import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '../models/store';
import { DailyRevenue, OrderCountStatistic, Statistic, StoreOverviewStatistic, TopProductStatistic } from '../models/statistic';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StoreService {

  readonly baseUrl = environment.baseUrl;
  readonly APIUrl = this.baseUrl+"store";

  constructor(private http: HttpClient) { }

  getAllStores(): Observable<Store[]> {
    return this.http.get<Store[]>(this.APIUrl);
  }

  getAllStoresByAdmin(): Observable<Store[]> {
    return this.http.get<Store[]>(this.APIUrl+'/admin');
  }

  getStoreById(id: number): Observable<Store> {
    return this.http.get<Store>(this.APIUrl + '/search/' + id);
  }

  getStoreOverviewStatistic(id: number): Observable<StoreOverviewStatistic> {
    return this.http.get<StoreOverviewStatistic>(this.APIUrl + '/overview-statistic/' + id);
  }

  getStatisticOfStore(storeId: number, fromDate?: Date, toDate?: Date): Observable<Statistic> {
    let params = new HttpParams();
    if (fromDate && toDate) {
      params = params.append('fromDate', fromDate.toISOString());
      params = params.append('toDate', toDate.toISOString());
    }
    return this.http.get<Statistic>(this.APIUrl + '/statistic/' + storeId, {params});
  }

  getOrderStatisticOfStore(storeId: number): Observable<OrderCountStatistic> {
    return this.http.get<OrderCountStatistic>(this.APIUrl + '/statistic-order/' + storeId);
  }

  getTopProductStatisticOfStore(storeId: number): Observable<TopProductStatistic> {
    return this.http.get<TopProductStatistic>(this.APIUrl + '/statistic-top-product/' + storeId);
  }

  getRevenueFromLastMonth(storeId: number): Observable<DailyRevenue[]> {
    return this.http.get<DailyRevenue[]>(this.APIUrl + '/revenue-last-month/' + storeId);
  }

  getOrderStatistic(): Observable<OrderCountStatistic> {
    return this.http.get<OrderCountStatistic>(this.APIUrl + '/statistic-order-admin');
  }

  getRevenueFromLastMonthAdmin(): Observable<DailyRevenue[]> {
    return this.http.get<DailyRevenue[]>(this.APIUrl + '/revenue-last-month-admin');
  }

  verifyStore(id: number): Observable<Store> {
    return this.http.put<Store>(this.APIUrl + '/admin/verify/' + id, {});
  }

  unverifyStore(id: number): Observable<Store> {
    return this.http.put<Store>(this.APIUrl + '/admin/unverify/' + id, {});
  }

  banStore(id: number): Observable<Store> {
    return this.http.put<Store>(this.APIUrl + '/admin/ban/' + id, {});
  }

  unbanStore(id: number): Observable<Store> {
    return this.http.put<Store>(this.APIUrl + '/admin/unban/' + id, {});
  }

  openStore(id: number): Observable<Store> {
    return this.http.put<Store>(this.APIUrl + '/open/' + id, {});
  }

  closeStore(id: number): Observable<Store> {
    return this.http.put<Store>(this.APIUrl + '/close/' + id, {});
  }

  updateStore(id: number, store: Store) {
    return this.http.put<Store>(this.APIUrl + '/update/' + id, store);
  }

  updateStoreImage(id: number, formData: FormData): Observable<Store> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };
    return this.http.put<Store>(this.APIUrl +'/'+id+ '/image', formData, httpOptions);
  }

  updateStoreThumbnailImage(id: number, formData: FormData): Observable<Store> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };
    return this.http.put<Store>(this.APIUrl +'/'+id+ '/thumbnailImage', formData, httpOptions);
  }
  
}
