import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { UserCredentials } from "../../models/user-credentials.type";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationClientService {
  constructor(private httpClient: HttpClient) {};

  login(userCredentials: UserCredentials): Observable<unknown> {
    return this.httpClient.post(this.LOGIN, userCredentials);
  }

  private readonly LOGIN = '/auth/v1/token?grant_type=password';
}
