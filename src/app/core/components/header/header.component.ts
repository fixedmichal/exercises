import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, catchError, startWith, tap } from 'rxjs';
import { AppRoutes } from 'src/app/app-routes.enum';
import { AuthenticationService } from 'src/app/modules/auth/services/authentication.service';
import { NotificationService } from 'src/app/shared/services/storage/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  isUserLoggedIn$ = this.authenticationService.isUserLoggedIn$.pipe(startWith(undefined));

  onLoginClick(): void {
    this.navigateToAuth();
  }

  onLogoutClick(): void {
    this.authenticationService
      .logout()
      .pipe(
        tap(() => {
          this.navigateToAuth();
        }),
        catchError((error) => {
          console.error(error);
          this.notificationService.showErrorSnackbar('Error occurred when logging out! Please try again!');

          return EMPTY;
        })
      )
      .subscribe();
  }

  navigateToAuth(): void {
    this.router.navigate([AppRoutes.Auth]);
  }
}
