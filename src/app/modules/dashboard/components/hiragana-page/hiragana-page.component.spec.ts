import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiraganaPageComponent } from './hiragana-page.component';

describe('HiraganaPageComponent', () => {
  let component: HiraganaPageComponent;
  let fixture: ComponentFixture<HiraganaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiraganaPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HiraganaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
