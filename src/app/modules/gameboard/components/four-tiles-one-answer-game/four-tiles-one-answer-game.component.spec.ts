import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourTilesOneAnswerGameComponent } from './four-tils-one-answer-game.component';

describe('GameComponent', () => {
  let component: FourTilesOneAnswerGameComponent;
  let fixture: ComponentFixture<FourTilesOneAnswerGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FourTilesOneAnswerGameComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FourTilesOneAnswerGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
