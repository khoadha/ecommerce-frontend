import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  Profile,
  UpdatePasswordDto,
  UpdatePhoneDto,
  UpdateUsernameDto,
} from '../models/profile';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly baseUrl = environment.baseUrl;
  readonly APIUrl = this.baseUrl + 'user';

  constructor(private http: HttpClient) {}

  getProfileByUserId(id: string): Observable<Profile> {
    return this.http.get<Profile>(this.APIUrl + '/profile/' + id);
  }

  checkLoginMethod(id: string): Observable<any> {
    return this.http.get<any>(`${this.APIUrl}/check-login-method/${id}`);
  }

  updateUserName(id: string, model: UpdateUsernameDto): Observable<any> {
    return this.http.put<any>(`${this.APIUrl}/update-username/${id}`, model);
  }

  updatePhoneNumber(id: string, model: UpdatePhoneDto): Observable<any> {
    return this.http.put<any>(
      `${this.APIUrl}/update-phone-number/${id}`,
      model
    );
  }

  updatePassword(id: string, model: UpdatePasswordDto): Observable<any> {
    return this.http.post<any>(`${this.APIUrl}/change-password/${id}`, model);
  }

  updateAvatar(userId: string, formData: FormData): Observable<any> {
    return this.http.put(`${this.APIUrl}/update-avatar/${userId}`, formData);
  }

  getProfileByEmail(email: string): Observable<Profile> {
    return this.http.get<Profile>(this.APIUrl + '/profile-img/' + email);
  }
}
