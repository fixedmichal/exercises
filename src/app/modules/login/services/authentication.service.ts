import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserCredentials } from "src/app/shared/models/user-credentials.type";
import { AuthenticationClientService } from "src/app/shared/services/clients/authentication-client.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private authenticationClientService: AuthenticationClientService) {};

login(userCredentials: UserCredentials): Observable<any> {
  return this.authenticationClientService.login(userCredentials);
}
}
