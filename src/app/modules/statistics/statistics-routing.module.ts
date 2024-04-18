import { RouterModule, Routes } from '@angular/router';
import { PlayerStatisticsPageComponent } from './components/player-statistics-page/player-statistics-page.component';
import { NgModule } from '@angular/core';

const routes: Routes = [{ path: '', component: PlayerStatisticsPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatisticsRoutingModule {}
