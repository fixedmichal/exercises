import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanasListComponent } from './kanas-list.component';

describe('KanasListComponent', () => {
  let component: KanasListComponent;
  let fixture: ComponentFixture<KanasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanasListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KanasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
