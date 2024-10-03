import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CheckAvailableVoucherResponseDto, Voucher } from '../models/voucher';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  readonly baseUrl = environment.baseUrl;
  readonly APIUrl = this.baseUrl + "voucher";

  constructor(private http: HttpClient) { }

  getAllVouchers(): Observable<Voucher[]> {
    return this.http.get<Voucher[]>(this.APIUrl);
  }

  addVoucher(voucher: Voucher): Observable<Voucher> {
    return this.http.post<Voucher>(this.APIUrl, voucher);
  }

  getAllVouchersByAdmin(): Observable<Voucher[]> {
    return this.http.get<Voucher[]>(this.APIUrl + '/admin');
  }

  getVoucherById(id: number): Observable<Voucher> {
    return this.http.get<Voucher>(this.APIUrl + '/' + id);
  }

  updateDisplayState(voucherId: number): Observable<Voucher> {
    return this.http.put<Voucher>(this.APIUrl + '/display-state/' + voucherId, {});
  }

  deleteVoucher(voucherId: number): Observable<Voucher> {
    return this.http.delete<Voucher>(this.APIUrl + '/' + voucherId);
  }

  checkIsVoucherAvailableToUse(code: string, orderTotalPrice: number): Observable<CheckAvailableVoucherResponseDto> {
    return this.http.get<CheckAvailableVoucherResponseDto>(`${this.APIUrl}/check-available?code=${code}&orderTotalPrice=${orderTotalPrice}`);
  }

}
