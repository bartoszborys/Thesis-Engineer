import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class HttpRequestInterceptorService implements HttpInterceptor {
  constructor(private cookieProvide : CookieService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any>{
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.cookieProvide.get('Authorization')}`
      }
    });
    return next.handle(request);
  }
}
