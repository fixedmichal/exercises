import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserCredentials } from 'src/app/shared/models/user-credentials.type';
import { AuthenticationClientService } from 'src/app/shared/services/clients/authentication-client.service';
import { AuthenticationData } from '../models/authentication-data.type';
import { StorageHelper } from 'src/app/shared/services/storage/storage-helper.util';
import { Router } from '@angular/router';
import { createClient } from '@supabase/supabase-js';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	supabase: any;

	constructor(private authenticationClientService: AuthenticationClientService, private router: Router) {}

	login(userCredentials: UserCredentials): Observable<AuthenticationData> {
		return this.authenticationClientService.login(userCredentials).pipe(tap(authenticationData => {
			StorageHelper.setItem('accessToken', authenticationData.access_token);
			StorageHelper.setItem('refreshToken', authenticationData.refresh_token);
			this.router.navigate(['dashboard']);
		}));
	}

	refreshSession(): void {
		const refreshToken = StorageHelper.getItem<string>('refreshToken');

		this.authenticationClientService.refreshSession(refreshToken).subscribe();
	}

	async createClient() {
		const publicAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpdGRtaXdkeGdsdWdlemZzZXJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkxMjk4NjEsImV4cCI6MjAxNDcwNTg2MX0.85T-XAbhdc-miOoGPP7UXXuqft9s1tCD85xC38N21z4';
		const supabase = createClient('https://titdmiwdxglugezfserh.supabase.co', publicAnonKey);
		// const supabase = createClient('https://titdmiwdxglugezfserh.supabase.co', publicAnonKey);
		this.supabase = supabase;

		return Promise.resolve(supabase);
	}

	async loginClient() {
		await this.supabase.auth.signInWithPassword({
			email: 'michal.stuleblak93@gmail.com',
			password: '.Qwer1234',
		}).then(() => 'User logged in!');

	}

	async refreshToken() {
		await this.createClient();
		await this.loginClient();
      
		const { player_data, error } = await this.supabase
			.from('player_data')
			.select();
      
    console.log(player_data)
        
		// await this.supabase.auth.refreshSession().then((resp: any) => console.log(resp));
	}
}
