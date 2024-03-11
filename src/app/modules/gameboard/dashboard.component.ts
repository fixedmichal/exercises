import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../login/services/authentication.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

	constructor(private authenticationService: AuthenticationService, private router: Router) {}

	ngOnInit(): void {
	}

	onRefreshClick() {
		this.authenticationService.refreshSession();
	}

  onRefreshSUPABASE() {
    this.authenticationService.refreshToken();
  }

  onPlayClick(): void {
    this.router.navigate(['game'])
  }

}
