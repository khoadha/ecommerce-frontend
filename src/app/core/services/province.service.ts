import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ShippingPriceRequestDto } from '../models/shipping-price-request-dto';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  readonly baseUrl = environment.baseUrl;
  readonly APIUrl = this.baseUrl+"provinces";
  readonly districtAPIUrl = this.baseUrl+"districts";

  constructor(private http: HttpClient) { }


  calculateFee(dto: ShippingPriceRequestDto): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };
    return this.http.post<any>(`${this.baseUrl}ghn/calculate-fee`, dto, httpOptions);
  }

  getProvinces(): Observable<any> {
    return this.http.get(`${this.APIUrl}`);
  }

  getDistrictsByProvinceCode(provinceCode: number): Observable<any> {
    return this.http.get(`${this.APIUrl}/${provinceCode}/districts`);
  }

  getWardsByDistrictCode(districtCode: number): Observable<any> {
    return this.http.get(`${this.districtAPIUrl}/${districtCode}/wards`);
  }

}
