import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  FourTilesQuestionResultData,
  WriteRomajiQuestionResultData,
} from 'src/app/shared/models/question-answer-result-data.type';

@Injectable({ providedIn: 'root' })
export class QuestionCommunicationService {
  private continueButtonClicked$$ = new Subject<void>();
  private continueButtonDisabled$$ = new Subject<boolean>();

  private answerIndex$$ = new Subject<number>();
  private answerText$$ = new Subject<string>();

  private answerAssessedFourTiles$$ = new Subject<FourTilesQuestionResultData>();
  private answerAssessedWriteRomaji$$ = new Subject<WriteRomajiQuestionResultData>();

  get continueButtonClicked$(): Observable<void> {
    return this.continueButtonClicked$$.asObservable();
  }

  get continueButtonDisabled$(): Observable<boolean> {
    return this.continueButtonDisabled$$.asObservable();
  }

  get answerIndex$(): Observable<number> {
    return this.answerIndex$$.asObservable();
  }

  get answerText$(): Observable<string> {
    return this.answerText$$.asObservable();
  }

  get answerAssessedFourTiles$(): Observable<FourTilesQuestionResultData> {
    return this.answerAssessedFourTiles$$.asObservable();
  }

  get answerAssessedWriteRomaji$(): Observable<WriteRomajiQuestionResultData> {
    return this.answerAssessedWriteRomaji$$.asObservable();
  }

  sendContinueButonClicked(): void {
    this.continueButtonClicked$$.next();
  }

  sendAnswerIndex(answerIndex: number): void {
    this.answerIndex$$.next(answerIndex);
  }

  sendAnswerText(answer: string): void {
    this.answerText$$.next(answer);
  }

  sendAnswerAssessedFourTiles(value: FourTilesQuestionResultData): void {
    this.answerAssessedFourTiles$$.next(value);
  }

  sendAnswerAssessedWriteRomaji(value: WriteRomajiQuestionResultData): void {
    this.answerAssessedWriteRomaji$$.next(value);
  }
}
