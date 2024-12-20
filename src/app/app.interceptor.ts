import { Injectable, Provider } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
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
      // Обработваме грешки
      catchError((error: HttpErrorResponse) => {
        if (error.error && error.error.message) {
          this.errorService.setError(error.error.message);
        } else {
          this.errorService.setError('An unknown error occurred!');
        }

        console.error('Error intercepted:', error);

        return throwError(() => new Error(error.error?.message || 'Error'));
      })
    );
  }
}
export const appInterceptProvider : Provider  = {
    multi: true,
    useClass:AppInterceptor,
    provide : HTTP_INTERCEPTORS

}