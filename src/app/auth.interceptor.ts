import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() { }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    console.log(err)
    if (err.status === 401) {
      localStorage.removeItem('token');
    }
    return throwError(err);
}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("--- Hello ----");
    if (localStorage.getItem("token")) {
      request = request.clone({
        setHeaders: {
          "Authorization": "Token  " + localStorage.getItem("token")
        }
      })
    }
    return next.handle(request).pipe(catchError(x => this.handleAuthError(x)));
  }
}