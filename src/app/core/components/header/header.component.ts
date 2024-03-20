import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EMPTY, catchError, startWith, tap } from 'rxjs';
import { AuthenticationService } from 'src/app/modules/auth/services/authentication.service';

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
    private snackBar: MatSnackBar
  ) {}

  isUserLoggedIn$ = this.authenticationService.isUserLoggedIn$.pipe(startWith(undefined));

  onLoginClick(): void {
    this.router.navigate(['auth']);
  }

  onLogoutClick(): void {
    this.authenticationService
      .logout()
      .pipe(
        tap(() => {
          this.router.navigate(['auth']);
        }),
        catchError((error) => {
          console.error(error);
          this.snackBar.open('Error occurred when logging out! Please try again!');

          return EMPTY;
        })
      )
      .subscribe();
  }
}
