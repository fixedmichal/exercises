import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/components/dashboard/dashboard.component';
import { AuthComponent } from './modules/auth/pages/auth/auth.component';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, ...canActivate(() => redirectUnauthorizedTo(['auth'])) },
  {
    path: 'quiz',
    ...canActivate(() => redirectUnauthorizedTo(['auth'])),
    loadChildren: () => import('src/app/modules/quiz/quiz.module').then((m) => m.QuizModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('src/app/modules/auth/auth.module').then((m) => m.AuthModule),
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
