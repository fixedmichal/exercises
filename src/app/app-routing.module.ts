import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/pages/login/login.component';
import { DashboardComponent } from './modules/gameboard/dashboard.component';
import { GamesComponent } from './modules/gameboard/pages/game/games.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'dashboard', component: DashboardComponent },
  { path: 'game', component: GamesComponent },
	{ path: '*', redirectTo: 'dashboard' },
	{ path: '**', redirectTo: 'dashboard' }

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
