import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/gameboard/components/dashboard/dashboard.component';
import { GameContainerComponent } from './modules/gameboard/components/game-container/game-container.component';
import { AuthComponent } from './modules/auth/pages/auth/auth.component';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, ...canActivate(() => redirectUnauthorizedTo(['auth'])) },
  { path: 'learn', component: GameContainerComponent },
  {
    path: 'auth',
    component: AuthComponent,
    ...canActivate(() => redirectLoggedInTo(['dashboard'])),
  },

  { path: '*', redirectTo: 'dashboard' },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
