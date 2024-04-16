import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, first, map, scan, take, tap } from 'rxjs';
import { Question } from '../models/question.class';
import {
  FourTilesQuestionResultData,
  WriteRomajiQuestionResultData,
} from 'src/app/shared/models/question-answer-result-data.type';
import { QuestionCreatorService } from './question-creator.service';
import { QuestionType } from 'src/app/shared/models/question-type.enum';
import { QuizScoreService } from './quiz-score.service';
import { QuestionScore } from '../models/question-score.enum';
import { QuizQuestionsScore } from '../models/quiz-score.class';
import { KanasScoresAggregator } from '../models/kana-scores.class';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class QuizControllerService {
  isQuizInProgress = false;

  get gotoNextQuestion$(): Observable<void> {
    return this.goToNextQuestion$$.asObservable();
  }

  get currentQuestion$(): Observable<Question> {
    return this.currentQuestion$$.asObservable();
  }

  get quizScore$(): Observable<QuizQuestionsScore> {
    return this.quizScoreService.quizScore$;
  }

  get quizKanasScores$(): Observable<KanasScoresAggregator> {
    return this.quizScoreService.quizKanaScores$;
  }

  constructor(
    private questionCreaterService: QuestionCreatorService,
    private quizScoreService: QuizScoreService,
    private router: Router
  ) {}

  setupQuizAndGetPlayerScores(): Observable<void> {
    this.quizScoreService.cleanupScore();
    this.quizConfiguration = this.questionCreaterService.createQuiz();

    return this.setupQuizQuestionsStream().pipe(
      tap(() => {
        this.isQuizInProgress = true;
        this.quizScoreService.fetchPlayerTotalKanasScores();
        this.quizScoreService.fetchPlayerTotalQuestionsScore();
      })
    );
  }

  sendGoToNextQuestion(): void {
    this.goToNextQuestion$$.next();
  }

  checkIfIsAnswerCorrect(answer: number): Observable<FourTilesQuestionResultData>;
  checkIfIsAnswerCorrect(answer: string): Observable<WriteRomajiQuestionResultData>;
  checkIfIsAnswerCorrect(answer: number | string): Observable<unknown> {
    return this.currentQuestion$.pipe(
      first(),
      map((currentQuestion) => {
        if (typeof answer === 'number' && currentQuestion.data.questionType === QuestionType.FourTiles) {
          const correctAnswerIndex = currentQuestion.data.correctAnswer.index;
          const isAnsweredCorrectly = answer === correctAnswerIndex;

          this.quizScoreService.rateQuestion(isAnsweredCorrectly ? QuestionScore.GOOD : QuestionScore.BAD);

          this.quizScoreService.changeKanaScore(
            currentQuestion.data.answerTiles[correctAnswerIndex].value,
            isAnsweredCorrectly ? QuestionScore.GOOD : QuestionScore.BAD
          );

          return { questionType: 'fourTiles', isAnsweredCorrectly, correctAnswerIndex };
        }

        if (typeof answer === 'string' && currentQuestion.data.questionType === QuestionType.WriteRomaji) {
          const correctAnswerInRomaji = currentQuestion.data.correctAnswerRomaji;
          const isAnsweredCorrectly = answer === correctAnswerInRomaji;
          const wordEnglishTranslation = currentQuestion.data.wordEnglishTranslation;

          this.quizScoreService.rateQuestion(isAnsweredCorrectly ? QuestionScore.GOOD : QuestionScore.BAD);

          return { questionType: 'writeRomaji', isAnsweredCorrectly, correctAnswerInRomaji, wordEnglishTranslation };
        }
        // TODO: write this \/ better
        return {};
      })
    );
  }

  updateScoresInDatabase(): void {
    this.quizScoreService.updatePlayerTotalKanasScoresInDatabase();
    this.quizScoreService.updatePlayerTotalQuestionsScoreInDatabase();
  }

  private setupQuizQuestionsStream(): Observable<void> {
    return this.goToNextQuestion$$.pipe(
      scan((acc: number) => acc + 1, -1),
      tap((counter) => {
        if (counter === this.quizConfiguration.length) {
          this.router.navigate(['/quiz/results']);
        }
      }),
      map((questionCounter) => {
        if (questionCounter !== this.quizConfiguration.length) {
          this.currentQuestion$$.next(this.quizConfiguration[questionCounter]);
        }

        return;
      }),
      take(this.quizConfiguration.length + 1)
    );
  }

  private quizConfiguration: Question[];
  private currentQuestion$$ = new ReplaySubject<Question>(1);
  private goToNextQuestion$$ = new Subject<void>();
}
