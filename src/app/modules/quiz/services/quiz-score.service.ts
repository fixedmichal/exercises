import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, first, mergeMap, tap } from 'rxjs';
import { QuizQuestionsScore } from '../models/quiz-score.class';
import { JapaneseScript } from '../../../shared/models/japanese-script';
import { QuestionScore } from '../models/question-score.enum';
import { KanasScoresAggregator } from '../models/kana-scores.class';
import { QuizScoreClientService } from './score-client.service';
import { Score } from '../models/score.type';
import { KanasScores } from '../models/kana-score.type';

@Injectable({ providedIn: 'root' })
export class QuizScoreService {
  private currentQuizQuestionsScore$$ = new BehaviorSubject<QuizQuestionsScore>(new QuizQuestionsScore(10, 0));
  private currentQuizKanasScores$$ = new BehaviorSubject<KanasScoresAggregator>(new KanasScoresAggregator());

  private playerTotalKanasScores$$ = new BehaviorSubject<KanasScores>({});
  private playerTotalQuestionsScore$$ = new BehaviorSubject<Score>({ correctAnswersCount: 0, attemptsCount: 0 });

  get currentQuizQuestionsScore$(): Observable<QuizQuestionsScore> {
    return this.currentQuizQuestionsScore$$.asObservable();
  }

  get currentQuizKanasScores$(): Observable<KanasScoresAggregator> {
    return this.currentQuizKanasScores$$.asObservable();
  }

  get playerTotalKanasScores$(): Observable<KanasScores> {
    return this.playerTotalKanasScores$$.asObservable();
  }

  get playerTotalQuestionsScore$(): Observable<Score> {
    return this.playerTotalQuestionsScore$$.asObservable();
  }

  constructor(private quizScoreClientService: QuizScoreClientService) {}

  rateQuestion(score: QuestionScore): void {
    this.currentQuizQuestionsScore$$.value.rateQuestion(score);
    this.currentQuizQuestionsScore$$.next(this.currentQuizQuestionsScore$$.value.clone());
  }

  changeKanaScore(kana: string, score: QuestionScore): void {
    this.currentQuizKanasScores$$.value.changeScore(kana, score);
  }

  cleanupAllScores(): void {
    this.currentQuizQuestionsScore$$.next(new QuizQuestionsScore(10, 0));
    this.currentQuizKanasScores$$.next(new KanasScoresAggregator());
    this.playerTotalKanasScores$$.next({});
    this.playerTotalQuestionsScore$$.next({ correctAnswersCount: 0, attemptsCount: 0 });
  }

  fetchPlayerTotalKanasScores(): void {
    this.quizScoreClientService
      .fetchKanaScores(JapaneseScript.Hiragana)
      .pipe(
        filter((data) => !!data),
        tap((playerKanaScores) => {
          if (playerKanaScores) {
            console.log('playerKanaScores: ', playerKanaScores);
            this.playerTotalKanasScores$$.next(playerKanaScores);
          }
        })
      )
      .subscribe();
  }

  fetchPlayerTotalQuestionsScore(): void {
    this.quizScoreClientService
      .fetchPlayerScore()
      .pipe(
        filter((data) => !!data),
        tap((playerScore) => {
          if (playerScore) {
            this.playerTotalQuestionsScore$$.next(playerScore);
          }
        })
      )
      .subscribe();
  }

  updatePlayerTotalKanasScoresInDatabase(): void {
    const updatedPlayerKanaScores = this.mergeTotalAndCurrentPlayerKanasScores(
      this.playerTotalKanasScores$$.value,
      this.currentQuizKanasScores$$.value.scores
    );
    console.log('playerTotalKanaScores: ', this.playerTotalKanasScores$$.value);
    console.log('currentQuizKanasScores', this.currentQuizKanasScores$$.value.scores);
    console.log('updatedPlayerKanaScores', updatedPlayerKanaScores);

    this.quizScoreClientService.updateKanaScore(updatedPlayerKanaScores, JapaneseScript.Hiragana);
  }

  updatePlayerTotalQuestionsScoreInDatabase(): void {
    const updatedCorrectAnswersCount =
      this.currentQuizQuestionsScore$$.value.correctAnswersCount +
      this.playerTotalQuestionsScore$$.value.correctAnswersCount;
    const updatedAttemptsCount =
      this.currentQuizQuestionsScore$$.value.questionsCount + this.playerTotalQuestionsScore$$.value.attemptsCount;

    this.quizScoreClientService
      .updatePlayerScore({
        correctAnswersCount: updatedCorrectAnswersCount,
        attemptsCount: updatedAttemptsCount,
      })
      .subscribe();
  }

  private mergeTotalAndCurrentPlayerKanasScores(
    totalPlayerKanasScores: KanasScores,
    currentQuizKanasScores: KanasScores
  ): KanasScores {
    const updatedPlayerKanaScores: KanasScores = {};

    for (const [kana, playerKanasScore] of Object.entries(totalPlayerKanasScores)) {
      const quizKanaScore = currentQuizKanasScores[kana];

      if (quizKanaScore) {
        const updatedAttemptsCount = playerKanasScore.attemptsCount + quizKanaScore.attemptsCount;
        const updatedCorrectAnswersCount = playerKanasScore.correctAnswersCount + quizKanaScore.correctAnswersCount;

        updatedPlayerKanaScores[kana] = {
          attemptsCount: updatedAttemptsCount,
          correctAnswersCount: updatedCorrectAnswersCount,
        };
      } else {
        updatedPlayerKanaScores[kana] = playerKanasScore;
      }
    }

    for (const [kana, quizKanaScore] of Object.entries(currentQuizKanasScores)) {
      if (!totalPlayerKanasScores.hasOwnProperty(kana)) {
        updatedPlayerKanaScores[kana] = quizKanaScore;
      }
    }

    return updatedPlayerKanaScores;
  }
}
