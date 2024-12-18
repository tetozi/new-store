import { Injectable, Provider } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ErrorService } from './services/error.service';

const {apiUrl} = environment  


@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(private errorService : ErrorService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    if ( request.url.startsWith('/api')) {
      request = request.clone({
        url:request.url.replace('/api', apiUrl),
        withCredentials: true,
      });
    }
    return next.handle(request).pipe(
      catchError(err => {
        return [err]
      })
    )
  }
 
}
export const appInterceptProvider : Provider  = {
    multi: true,
    useClass:AppInterceptor,
    provide : HTTP_INTERCEPTORS

}