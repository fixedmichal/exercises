import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginData, SignupData } from '../../models/auth-data.type';
import { AuthenticationService } from '../../services/authentication.service';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { NotificationService } from 'src/app/shared/services/storage/notification.service';
import { AppRoutes } from 'src/app/app-routes.enum';

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
    private notificationService: NotificationService
  ) {}

  createAccount(signupData: SignupData) {
    this.authenticationService
      .signup(signupData)
      .pipe(
        tap(() => {
          this.navigateToDashboardPage();
        }),
        catchError((error) => {
          console.error(error);
          this.notificationService.showErrorSnackbar('Error occurred when creating account! Please try again!');

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
          this.navigateToDashboardPage();
        }),
        catchError((error) => {
          console.error(error);
          this.notificationService.showErrorSnackbar('Error occurred when logging in! Please try again!');

          return EMPTY;
        })
      )
      .subscribe();
  }

  navigateToDashboardPage(): void {
    this.router.navigate([AppRoutes.Dashboard]);
  }
}
