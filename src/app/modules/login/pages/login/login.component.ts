import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LoginForm } from './models/login-form.type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form = this.formBuilder.group<LoginForm>({
    email: new FormControl(''),
    password: new FormControl(''),
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
