import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { GlobalSetting } from '../models/globalSetting';
import { AdminDashboardInformation } from '../models/statistic';

@Injectable({
  providedIn: 'root'
})
export class SetupService {

  readonly baseUrl = environment.baseUrl;
  readonly APIUrl = this.baseUrl+"setup";

  constructor(private http: HttpClient) { }

  getGlobalSetting(): Observable<GlobalSetting> {
    return this.http.get<GlobalSetting>(this.APIUrl+ '/global-settings');
  }

  getBannerImages(): Observable<any> {
    return this.http.get<any>(this.APIUrl+ '/carousel-images');
  }

  updateBanner(data: any): Observable<any> {
    return this.http.put<any>(this.APIUrl+ '/carousel-images', data);
  }

  getDashboardInformation(): Observable<AdminDashboardInformation> {
    return this.http.get<AdminDashboardInformation>(this.APIUrl+ '/dashboard-information');
  }

  uploadFile(formData: FormData) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };
    return this.http.post<any>(this.APIUrl + '/upload', formData, httpOptions);
  }


  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.APIUrl + '/roles');
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.APIUrl + '/users');
  }

  addToRole(data: any): Observable<any> {
    let params = new HttpParams();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        params = params.append(key, data[key]);
      }
    }
    return this.http.post<any>(`${this.APIUrl}/roles/user/userToManager`, {}, { params });
  }

  // removeFromRole(data: any): Observable<any> {
  //   let params = new HttpParams();
  //   for (const key in data) {
  //     if (data.hasOwnProperty(key)) {
  //       params = params.append(key, data[key]);
  //     }
  //   }
  //   return this.http.post<any>(`${this.APIUrl}/roles/user/remove`, {}, { params });
  // }

}
