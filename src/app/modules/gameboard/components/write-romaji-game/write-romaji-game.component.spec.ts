import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteRomajiGameComponent } from './write-romaji-game.component';

describe('WriteRomajiGameComponent', () => {
  let component: WriteRomajiGameComponent;
  let fixture: ComponentFixture<WriteRomajiGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WriteRomajiGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WriteRomajiGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
