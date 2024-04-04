import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteRomajiQuestionComponent } from './write-romaji-question.component';

describe('WriteRomajiGameComponent', () => {
  let component: WriteRomajiQuestionComponent;
  let fixture: ComponentFixture<WriteRomajiQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WriteRomajiQuestionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WriteRomajiQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
