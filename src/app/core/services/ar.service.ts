import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArService {

  readonly baseUrl = environment.baseUrl;
  readonly APIUrl = this.baseUrl;
  
  constructor(private http: HttpClient) { }

  generateImages(query: string): Observable<any> {
    return this.http.get<any>(this.APIUrl+"image-generate?query="+query);
  }

  generateImagesByMedia(formData: FormData): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };
    return this.http.post<any>(this.APIUrl+"image-generate-by-media", formData, httpOptions);
  }
}
