import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginData, SignupData } from '../../models/auth-data.type';
import { AuthenticationService } from '../../services/authentication.service';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  createAccount(signupData: SignupData) {
    console.log(signupData);
    this.authenticationService
      .signup(signupData)
      .pipe(
        tap(() => {
          this.router.navigate(['dashboard']);
        }),
        catchError((error) => {
          console.error(error);
          this.snackBar.open('Error occurred when creating account! Please try again!');

          return EMPTY;
        })
      )
      .subscribe();
  }

  login(loginData: LoginData) {
    this.authenticationService
      .login(loginData)
      .pipe(
        tap(() => {
          this.router.navigate(['dashboard']);
        }),
        catchError((error) => {
          console.error(error);
          this.snackBar.open('Error occurred when logging in! Please try again!');

          return EMPTY;
        })
      )
      .subscribe();
  }
}
