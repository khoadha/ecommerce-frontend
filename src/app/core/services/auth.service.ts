import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInObj, SignUpObj } from '../models/authObj';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenApiModel } from '../models/token-api.model';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map } from 'rxjs';
import { UserStoreService } from './user-store.service';
import * as CryptoJS from 'crypto-js';
import { Store } from '../models/store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly baseUrl = environment.baseUrl;
  readonly APIUrl = this.baseUrl + "auth";
  private redirectUrl: string | null = null;
  private userPayload: any;

  constructor(private http: HttpClient, private router: Router, private userStoreService: UserStoreService) {
    this.userPayload = this.decodeToken();
  }
  
  loginWithGoogle(credential: string): Observable<TokenApiModel> {
    const params = new HttpParams().set('credential', credential);
    const options = { params };
    return this.http.post<TokenApiModel>(`${this.APIUrl}/login-google`, null, options);
  }
  
  register(formData: FormData) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };
    return this.http.post<any>(this.APIUrl + '/register', formData, httpOptions);
  }

  registerStore(formData: FormData): Observable<Store> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };
    return this.http.post<Store>(this.APIUrl + '/register-store', formData, httpOptions);
  }

  login(signInObj: SignInObj) {
    return this.http.post<SignInObj>(this.APIUrl + '/login', signInObj);
  }

  confirmEmail(userId: string, token: string) {
    return this.http.get<any>(this.APIUrl +`/confirm-email?userId=${userId}&token=${token}`);
  }

  forgotPassword(formData: FormData) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };
    return this.http.post<any>(this.APIUrl + '/forgot-password', formData, httpOptions);
  }

  resetPassword(userId: string, token: string, newPassword: string) {
    const body = JSON.stringify(newPassword);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 
        'Accept': 'application/json'
      }),
      params: new HttpParams()
        .set('userId', userId)
        .set('token', token)
    };
    return this.http.post<any>(this.APIUrl + '/reset-password', body, httpOptions);
  }

  renewToken(tokenApi: TokenApiModel) {
    return this.http.post<TokenApiModel>(this.APIUrl + '/refresh', tokenApi).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          this.logOut();
        }
        throw error;
      })
    );
  }

  logOut() {
    document.cookie = "__Secure_a=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/product-detail;";
    document.cookie = "__Secure_r=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/product-detail;";
    document.cookie = "__Secure_a=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/bidding-detail;";
    document.cookie = "__Secure_r=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/bidding-detail;";
    document.cookie = "__Secure_a=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "__Secure_r=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    this.userStoreService.clearAllDatasFromStore();
    this.router.navigate(['']).then(() => {
      window.location.reload();
    });
    ;
  }

//   private deleteAllCookies() {
//     document.cookie.split(';').forEach(cookie => {
//         const eqPos = cookie.indexOf('=');
//         const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
//         document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
//     });
// }

  storeToken(tokenValue: string) {
    document.cookie = `__Secure_a=${this.encrypt(tokenValue, this.getSecureKey())}; secure`;
  }

  storeRefreshToken(tokenValue: string) {
    document.cookie = `__Secure_r=${this.encrypt(tokenValue, this.getSecureKey())}; secure`;
  }

  getToken() {
    return this.decrypt(this.getCookie('__Secure_a')!, this.getSecureKey());
  }

  getRefreshToken() {
    return this.decrypt(this.getCookie('__Secure_r')!, this.getSecureKey());
  }

  isLoggedIn(): boolean {
    return !!this.getCookie('__Secure_a');
  }

  decodeToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token);
  }

  getUsernameFromToken() {
    if (this.userPayload)
      return this.userPayload.name;
  }

  getRoleFromToken() {
    if (this.userPayload)
      return this.userPayload.role;
  }
  getUserIdFromToken() {
    if (this.userPayload)
      return this.userPayload.Id;
  }
  getEmailFromToken() {
    if (this.userPayload)
      return this.userPayload.email;
  }
  getPhoneNumerFromToken() {
    if (this.userPayload)
      return this.userPayload.PhoneNumber;
  }

  getOrderedStateFromToken() {
    if (this.userPayload)
      return this.userPayload.IsFirstOrdered;
  }

  getManagedStoreIdFromToken() {
    if (this.userPayload)
      return this.userPayload.ManagedStoreId;
  }

  getImgPathFromToken(){
    if (this.userPayload)
      return this.userPayload.ImgPath;
  }

  getCartIdFromToken() {
    if (this.userPayload)
      return this.userPayload.CartId;
  }

  getCookie(name: string): string {
    const cookieName = `${name}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return '';
  }

  encrypt(token: string, key: any): string {
    const cipherText = CryptoJS.AES.encrypt(token, key.toString()).toString();
    return cipherText;
  }

  decrypt(token: string, key: any): string {
    const bytes = CryptoJS.AES.decrypt(token, key.toString());
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  }

  getEnvironmentData(): Observable<any> {
    return this.http.get(this.APIUrl + '/environment-data');
  }

  getSecureKey(): Observable<number> {
    return this.getEnvironmentData().pipe(map(x => x.secure_key));
  }

  getSecureClientId(): Observable<string> {
    return this.getEnvironmentData().pipe(map(x => x.secure_client));
  }

  setRedirectUrl(url: string) {
    this.redirectUrl = url;
  }

  getRedirectUrl(): string | null {
    const url = this.redirectUrl;
    this.redirectUrl = null;
    return url;
  }
}
