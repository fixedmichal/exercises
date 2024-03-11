import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserCredentials } from '../../models/user-credentials.type';
import { AuthenticationData } from 'src/app/modules/login/models/authentication-data.type';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationClientService {
	constructor(private httpClient: HttpClient) {}

	login(userCredentials: UserCredentials): Observable<AuthenticationData> {
		return this.httpClient.post<AuthenticationData>(this.LOGIN, userCredentials);
	}

	refreshSession(refreshToken: string): Observable<AuthenticationData> {
		return this.httpClient.post<AuthenticationData>(this.REFRESH_TOKEN, { refresh_token: refreshToken });
	}

	private readonly LOGIN = '/auth/v1/token?grant_type=password';
	private readonly REFRESH_TOKEN = '/auth/v1/token?grant_type=refresh_token';
}
