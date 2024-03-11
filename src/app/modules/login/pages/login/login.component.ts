import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { LoginForm } from './models/login-form.type';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	form = new FormGroup<LoginForm>({
		email: new FormControl('', { nonNullable: true }),
		password: new FormControl('', { nonNullable: true }),
	});

	constructor(private authenticationService: AuthenticationService, private router: Router) {}

	ngOnInit(): void {
	}

	onSubmit(): void {
		const userCredentials = { email: this.form.controls.email.value, password: this.form.controls.password.value };
    
		this.authenticationService.login(userCredentials).subscribe();

		console.log(this.form.controls.email.value);
	}
}
