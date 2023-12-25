import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { apiKey } from "src/app/shared/constants/api-key.constants";

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const apiKeyHeader = new HttpHeaders({ 'apikey': apiKey });
    const clonedRequest = request.clone({ headers: apiKeyHeader});

    return next.handle(clonedRequest);
  }
}
