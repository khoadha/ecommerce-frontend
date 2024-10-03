import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  readonly baseUrl = environment.baseUrl;
  readonly APIUrl = this.baseUrl+"payment";

  constructor(private http: HttpClient) { }

  getAllTransactions(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl+'/transactions');
  }

  getLatestTransactionsByCount(count: number): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl+'/transactions?count='+count);
  }

  createPayment(createPaymentRequest: any ,userId: string){
    return this.http.post<any>(this.APIUrl+`/create/${userId}`, createPaymentRequest);
  }

  getWemadePoint(userId: string): Observable<any> {
    return this.http.get<any>(`${this.APIUrl}/point?userId=${userId}`);
  }

  handlePaymentSuccess(txnRef: string, userId: string) {
    return this.http.put(`${this.APIUrl}/payment-success/${txnRef}/${userId}`, {});
  }
}
