import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/components/dashboard/dashboard.component';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { AppRoutes } from './app-routes.enum';
import { HiraganaPageComponent } from './modules/dashboard/components/hiragana-page/hiragana-page.component';

const routes: Routes = [
  {
    path: AppRoutes.Dashboard,
    component: DashboardComponent,
    ...canActivate(() => redirectUnauthorizedTo([AppRoutes.Auth])),
  },
  {
    path: AppRoutes.Auth,
    loadChildren: () => import('src/app/modules/auth/auth.module').then((m) => m.AuthModule),
    ...canActivate(() => redirectLoggedInTo([AppRoutes.Dashboard])),
  },
  {
    path: AppRoutes.Quiz,
    ...canActivate(() => redirectUnauthorizedTo([AppRoutes.Auth])),
    loadChildren: () => import('src/app/modules/quiz/quiz.module').then((m) => m.QuizModule),
  },
  {
    path: AppRoutes.Statistics,
    ...canActivate(() => redirectUnauthorizedTo([AppRoutes.Auth])),
    loadChildren: () => import('src/app/modules/statistics/statistics.module').then((m) => m.StatisticsModule),
  },
  {
    path: AppRoutes.Hiragana,
    component: HiraganaPageComponent,
    ...canActivate(() => redirectUnauthorizedTo([AppRoutes.Auth])),
  },

  { path: '*', redirectTo: AppRoutes.Dashboard },
  { path: '**', redirectTo: AppRoutes.Dashboard },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
