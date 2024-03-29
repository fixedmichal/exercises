import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, first, map, mergeMap, of, scan, take, tap } from 'rxjs';
import { Question } from '../models/question.class';
import {
  FourTilesQuestionResultData,
  WriteRomajiQuestionResultData,
} from 'src/app/shared/models/question-answer-result-data.type';
import { QuestionCreatorService } from './question-creator.service';

@Injectable({ providedIn: 'root' })
export class QuizControllerService {
  get gotoNextQuestion$(): Observable<void> {
    return this.goToNextQuestion$$.asObservable();
  }

  get currentQuestion$(): Observable<Question> {
    return this.currentQuestion$$.asObservable();
  }

  constructor(private questionCreaterService: QuestionCreatorService) {}

  setupQuiz(): Observable<void> {
    return of('setupQuiz').pipe(
      tap(() => (this.quizConfiguration = this.questionCreaterService.createQuiz())),
      mergeMap(() => this.setupQuizQuestionsStream())
    );
  }

  setupQuizQuestionsStream(): Observable<void> {
    return this.goToNextQuestion$$.pipe(
      scan((acc: number) => acc + 1, -1),
      map((questionCounter) => {
        console.log(questionCounter);

        this.currentQuestion$$.next(this.quizConfiguration[questionCounter]);

        return;
      }),
      take(this.quizConfiguration.length)
    );
  }

  sendGoToNextQuestion(): void {
    this.goToNextQuestion$$.next();
  }

  checkIfIsAnswerCorrect(answer: number): Observable<FourTilesQuestionResultData>;
  checkIfIsAnswerCorrect(answer: string): Observable<WriteRomajiQuestionResultData>;
  checkIfIsAnswerCorrect(answer: number | string): Observable<any> {
    return this.currentQuestion$.pipe(
      first(),
      map((currentQuestion) => {
        if (typeof answer === 'number' && currentQuestion.data.questionType === 'fourTiles') {
          const correctAnswerIndex = currentQuestion.data.correctAnswer.index;
          const isAnsweredCorrectly = answer === correctAnswerIndex;

          console.log('check if is ANSWER CORRECT');
          return { questionType: 'fourTiles', isAnsweredCorrectly, correctAnswerIndex };
        }

        if (typeof answer === 'string' && currentQuestion.data.questionType === 'writeRomaji') {
          const correctAnswerInRomaji = currentQuestion.data.correctAnswerRomaji;
          const isAnsweredCorrectly = answer === correctAnswerInRomaji;
          const wordEnglishTranslation = currentQuestion.data.wordEnglishTranslation;
          console.log('check if is ANSWER CORRECT');

          return { questionType: 'writeRomaji', isAnsweredCorrectly, correctAnswerInRomaji, wordEnglishTranslation };
        }
        // TODO: write this \/ better
        return {};
      })
    );
  }

  private quizConfiguration: Question[];
  private currentQuestion$$ = new ReplaySubject<Question>(1);
  private goToNextQuestion$$ = new Subject<void>();
}
