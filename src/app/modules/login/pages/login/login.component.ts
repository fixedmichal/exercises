import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { UntypedFormControl, FormBuilder, FormGroup } from '@angular/forms';
import { LoginForm } from './models/login-form.type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form = new FormGroup<LoginForm>({
    email: new UntypedFormControl(''),
    password: new UntypedFormControl(''),
  });

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    const userCredentials = {
      email: 'michal.stuleblak93@gmail.com',
      password: '.Qwer1234'
    };

    this.authenticationService.login(userCredentials).subscribe();
  }
}
