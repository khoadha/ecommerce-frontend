import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Report } from '../models/report';
@Injectable({
  providedIn: 'root'
})
export class ReportService {

  readonly baseUrl = environment.baseUrl;
  readonly APIUrl = this.baseUrl + 'report';
  
  constructor(private http: HttpClient) { }

  getReports(): Observable<Report[]> {
    return this.http.get<Report[]>(this.APIUrl);
  }

  getReportsByCount(count: number): Observable<Report[]> {
    return this.http.get<Report[]>(this.APIUrl+'?count='+count);
  }

  getReportById(reportId: number): Observable<Report> {
    return this.http.get<Report>(`${this.APIUrl}/${reportId}`);
  }

  addReport(addReportDto: any): Observable<any> {
    return this.http.post<any>(this.APIUrl, addReportDto);
  }

  updateReportStatus(reportId: number, staffId: string): Observable<any>{
    return this.http.put<any>(`${this.APIUrl}?reportId=${reportId}&staffId=${staffId}`, {}, {})
  }
}
