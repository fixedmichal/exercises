import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginData } from '../../models/auth-data.type';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  hidePassword = true;
  @Output() formSubmitted = new EventEmitter<LoginData>();

  loginForm = new FormGroup({
    email: new FormControl('', { validators: [Validators.required, Validators.email], nonNullable: true }),
    password: new FormControl('', { validators: [Validators.required], nonNullable: true }),
  });

  constructor() {}

  getEmailControlError(): string {
    if (this.loginForm.get('email')?.hasError('required')) {
      return 'Email address is required';
    }

    return this.loginForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  onLoginClick() {
    if (this.loginForm.valid) {
      const loginData: LoginData = {
        email: this.loginForm.controls.email.value,
        password: this.loginForm.controls.email.value,
      };

      this.formSubmitted.emit(loginData);
    }
  }
}
