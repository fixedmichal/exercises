import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerStatisticsPageComponent } from './player-statistics-page.component';

describe('PlayerStatisticsPageComponent', () => {
  let component: PlayerStatisticsPageComponent;
  let fixture: ComponentFixture<PlayerStatisticsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerStatisticsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerStatisticsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
