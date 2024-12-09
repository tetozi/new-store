import { Injectable, Provider } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

const {apiUrl} = environment  


@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('token'); // Извличане на токена
    if (authToken && request.url.startsWith('/api')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    }
    return next.handle(request);
  }
 
}
export const appInterceptProvider : Provider  = {
    multi: true,
    useClass:AppInterceptor,
    provide : HTTP_INTERCEPTORS

}