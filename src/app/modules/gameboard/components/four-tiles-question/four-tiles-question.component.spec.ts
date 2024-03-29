import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourTilesQuestionComponent } from './four-tiles-question.component';

describe('GameComponent', () => {
  let component: FourTilesQuestionComponent;
  let fixture: ComponentFixture<FourTilesQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FourTilesQuestionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FourTilesQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
