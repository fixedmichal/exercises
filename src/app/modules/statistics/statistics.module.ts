import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerStatisticsPageComponent } from './components/player-statistics-page/player-statistics-page.component';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [PlayerStatisticsPageComponent],
  exports: [PlayerStatisticsPageComponent],
  imports: [CommonModule, StatisticsRoutingModule, SharedModule],
})
export class StatisticsModule {}
