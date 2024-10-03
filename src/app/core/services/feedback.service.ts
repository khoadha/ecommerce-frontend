import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetFeedbackDto, GetFeedbackPaginationDto } from '../models/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  readonly baseUrl = environment.baseUrl;
  readonly apiUrl = this.baseUrl+"feedback";
  constructor(private http: HttpClient) { }

  getFeedbacksByProductId(productId: number, offset: number): Observable<GetFeedbackPaginationDto> {
    return this.http.get<GetFeedbackPaginationDto>(`${this.apiUrl}/${productId}?offset=${offset}`);
  }

  isAvailableToAddFeedback(productId: number, userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/available?id=${productId}&userId=${userId}`);
  }

  deleteFeedback(feedbackId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${feedbackId}`);
  }

  addFeedback(formData: FormData): Observable<GetFeedbackDto> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };
    return this.http.post<GetFeedbackDto>(this.apiUrl, formData, httpOptions);
  }
}
