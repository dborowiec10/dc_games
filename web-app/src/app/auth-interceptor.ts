import { Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const idToken = localStorage.getItem('id_token');
      if (idToken) {
          req = req.clone({
              headers: req.headers.set('Authorization', 'Bearer ' + idToken)
          });
      }
      return next.handle(req).pipe(tap(() => {}, (err: any) => {
        switch(err.status) {
          case 401:
            this.router.navigate(['login']);
            break;
          case 500:
            this.router.navigate(['500']);
            break;
          default:
            return;
          }
      }));
  }
}
