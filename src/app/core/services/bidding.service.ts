import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bidding, GetAuctioneersByBiddingDto } from '../models/bidding';

@Injectable({
  providedIn: 'root'
})
export class BiddingService {

  readonly baseUrl = environment.baseUrl;
  readonly APIUrl = this.baseUrl + "bidding";

  constructor(private http: HttpClient) {}

  addBidding(formData: FormData): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };
    return this.http.post<any>(this.APIUrl, formData, httpOptions);
  }

  addAuctioneer(formData: FormData):Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };
    return this.http.post<any>(this.APIUrl+'/auctioneer', formData, httpOptions);
  }

  getAutioneersByBiddingId(biddingId: number): Observable<GetAuctioneersByBiddingDto[]> {
    return this.http.get<GetAuctioneersByBiddingDto[]>(`${this.APIUrl}/${biddingId}/auctioneer`);
  }

  getAllBiddings(count: number): Observable<Bidding[]> {
    return this.http.get<Bidding[]>(this.APIUrl+'?count='+count);
  }

  getBiddingById(id: number): Observable<Bidding> {
    return this.http.get<Bidding>(this.APIUrl+'/'+id);
  }

  isValidToAddAuctioneer(storeId: number, biddingId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.APIUrl}/valid?storeId=${storeId}&biddingId=${biddingId}`)
  }
}
