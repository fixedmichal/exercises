import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageHelper } from 'src/app/shared/services/storage/storage-helper.util';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const apiKey = 'bla';
    let clonedRequest = request.clone({ setHeaders: { apiKey } });
    const accessToken = StorageHelper.getItem('accessToken');

    if (accessToken) {
      clonedRequest = clonedRequest.clone({ setHeaders: { Authentication: `Bearer ${accessToken}` } });
    }

    return next.handle(clonedRequest);
  }
}
