import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GameControllerService {
  private continueButtonClicked$$ = new Subject<number>();
  private questionAnswered$$ = new Subject<any>();

  get continueButtonClicked$(): Observable<number> {
    return this.continueButtonClicked$$.asObservable();
  }

  get questionAnswered$(): Observable<number> {
    return this.questionAnswered$$.asObservable();
  }

  sendContinueButonClicked(value: number): void {
    console.log('sendContinueButtonClicked');
    this.continueButtonClicked$$.next(value);
  }

  sendQuestionAnswered$(value: Record<string, any>): void {
    this.questionAnswered$$.next(value);
  }
}
