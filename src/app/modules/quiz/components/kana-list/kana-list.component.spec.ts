import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanaListComponent } from './kana-list.component';

describe('KanaListComponent', () => {
  let component: KanaListComponent;
  let fixture: ComponentFixture<KanaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanaListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KanaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
