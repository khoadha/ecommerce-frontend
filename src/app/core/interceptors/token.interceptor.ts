import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { TokenApiModel } from '../models/token-api.model';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar,private auth: AuthService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getToken();

    if(myToken){
      request = request.clone({
        setHeaders: {
          Authorization:'bearer ' + myToken
        }
      })
    }
    return next.handle(request).pipe(
      catchError((err:any) => {
        if(err instanceof HttpErrorResponse) {
          if(err.status === 400){
            if(err.error.message === 'TokenExpired'){
              this.auth.logOut();
            } else {
              this.showError(err.error.errors[0]);
            }
          }
            else if(err.status === 401) {
              return this.handleUnauthorizedError(request, next);
            }
        }
        return throwError(() => err);
      })
    );
  }

  handleUnauthorizedError(req: HttpRequest<any>, next: HttpHandler){
     let tokenApiModel = new TokenApiModel();
     tokenApiModel.accessToken = this.auth.getToken()!;
     tokenApiModel.refreshToken = this.auth.getRefreshToken()!;
     return this.auth.renewToken(tokenApiModel)
     .pipe(
      switchMap((data:TokenApiModel) => {
        this.auth.storeRefreshToken(data.refreshToken);
        this.auth.storeToken(data.accessToken);
        req = req.clone({
          setHeaders: {
            Authorization: 'bearer ' + data.accessToken
          }
        })
        return next.handle(req);
      }),
      catchError((err)=> {
        return throwError(()=> {
          this.router.navigate(['sign-in']).then(() => {
            window.location.reload();
          });
        }) 
      })
     )
  }

  showError(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['auth-snackbar'];
    config.duration = 5000;
    this.snackBar.open(message, '', config);
 }
}
