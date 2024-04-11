import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, distinctUntilChanged, tap } from 'rxjs';
import {
  FourTilesQuestionResultData,
  WriteRomajiQuestionResultData,
} from 'src/app/shared/models/question-answer-result-data.type';

@Injectable({ providedIn: 'root' })
export class QuestionCommunicationService {
  private continueButtonClicked$$ = new Subject<void>();
  private isContinueButtonDisabled$$ = new BehaviorSubject<boolean>(true);

  private fourTilesQuestionAnswered$$ = new Subject<number>();
  private writeRomajiQuestionAnswered$$ = new Subject<string>();

  private answerAssessedFourTiles$$ = new Subject<FourTilesQuestionResultData>();
  private answerAssessedWriteRomaji$$ = new Subject<WriteRomajiQuestionResultData>();

  get continueButtonClicked$(): Observable<void> {
    return this.continueButtonClicked$$.asObservable();
  }

  get isContinueButtonDisabled$(): Observable<boolean> {
    return this.isContinueButtonDisabled$$.asObservable().pipe(distinctUntilChanged());
  }

  get fourTilesQuestionAnswered$(): Observable<number> {
    return this.fourTilesQuestionAnswered$$.asObservable();
  }

  get writeRomajiQuestionAnswered$(): Observable<string> {
    return this.writeRomajiQuestionAnswered$$.asObservable();
  }

  get answerAssessedFourTiles$(): Observable<FourTilesQuestionResultData> {
    return this.answerAssessedFourTiles$$.asObservable();
  }

  get answerAssessedWriteRomaji$(): Observable<WriteRomajiQuestionResultData> {
    return this.answerAssessedWriteRomaji$$.asObservable();
  }

  sendContinueButtonClicked(): void {
    this.continueButtonClicked$$.next();
  }

  sendIsContinueButtonDisabled(isContinueButtonDisabled: boolean) {
    this.isContinueButtonDisabled$$.next(isContinueButtonDisabled);
  }

  sendFourTilesQuestionAnswered(answerIndex: number): void {
    this.fourTilesQuestionAnswered$$.next(answerIndex);
  }

  sendwriteRomajiQuestionAnswered(answer: string): void {
    this.writeRomajiQuestionAnswered$$.next(answer);
  }

  sendAnswerAssessedFourTiles(value: FourTilesQuestionResultData): void {
    this.answerAssessedFourTiles$$.next(value);
  }

  sendAnswerAssessedWriteRomaji(value: WriteRomajiQuestionResultData): void {
    this.answerAssessedWriteRomaji$$.next(value);
  }
}
