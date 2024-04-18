import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KanaScoreListComponent } from './kana-score-list.component';

describe('KanaListComponent', () => {
  let component: KanaScoreListComponent;
  let fixture: ComponentFixture<KanaScoreListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KanaScoreListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KanaScoreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
