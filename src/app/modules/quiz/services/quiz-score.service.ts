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
  private quizQuestionsScore$$ = new BehaviorSubject<QuizQuestionsScore>(new QuizQuestionsScore(10, 0));
  private quizKanasScores$$ = new BehaviorSubject<KanasScoresAggregator>(new KanasScoresAggregator());

  private playerTotalKanaScores$$ = new BehaviorSubject<KanasScores>({});
  private playerTotalQuestionsScore$$ = new BehaviorSubject<Score>({ correctAnswersCount: 0, attemptsCount: 0 });

  get quizScore$(): Observable<QuizQuestionsScore> {
    return this.quizQuestionsScore$$.asObservable();
  }

  get quizKanaScores$(): Observable<KanasScoresAggregator> {
    return this.quizKanasScores$$.asObservable();
  }

  constructor(private quizScoreClientService: QuizScoreClientService) {}

  rateQuestion(score: QuestionScore): void {
    this.quizQuestionsScore$$.value.rateQuestion(score);
    this.quizQuestionsScore$$.next(this.quizQuestionsScore$$.value.clone());
  }

  changeKanaScore(kana: string, score: QuestionScore): void {
    this.quizKanasScores$$.value.changeScore(kana, score);
  }

  cleanupScore(): void {
    this.quizQuestionsScore$$.next(new QuizQuestionsScore(10, 0));
    this.quizKanasScores$$.next(new KanasScoresAggregator());
  }

  fetchPlayerTotalKanasScores(): void {
    this.quizScoreClientService
      .fetchKanaScores(JapaneseScript.Hiragana)
      .pipe(
        filter((data) => !!data),
        tap((playerKanaScores) => {
          if (playerKanaScores) {
            this.playerTotalKanaScores$$.next(playerKanaScores);
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
      this.playerTotalKanaScores$$.value,
      this.quizKanasScores$$.value.scores
    );

    this.quizScoreClientService.updateKanaScore(updatedPlayerKanaScores, JapaneseScript.Hiragana);
  }

  updatePlayerTotalQuestionsScoreInDatabase(): void {
    const updatedCorrectAnswersCount =
      this.quizQuestionsScore$$.value.correctAnswersCount + this.playerTotalQuestionsScore$$.value.correctAnswersCount;
    const updatedAttemptsCount =
      this.quizQuestionsScore$$.value.questionsCount + this.playerTotalQuestionsScore$$.value.attemptsCount;

    this.quizScoreClientService
      .updatePlayerScore({
        correctAnswersCount: updatedCorrectAnswersCount,
        attemptsCount: updatedAttemptsCount,
      })
      .subscribe();
  }

  private mergeTotalAndCurrentPlayerKanasScores(
    playerKanaScores: KanasScores,
    quizKanasScores: KanasScores
  ): KanasScores {
    const updatedPlayerKanaScores: KanasScores = {};

    for (const [kana, playerKanaScore] of Object.entries(playerKanaScores)) {
      const quizKanaScore = quizKanasScores[kana];

      if (quizKanaScore) {
        const updatedAttemptsCount = playerKanaScore.attemptsCount + quizKanaScore.attemptsCount;
        const updatedCorrectAnswersCount = playerKanaScore.correctAnswersCount + quizKanaScore.correctAnswersCount;

        updatedPlayerKanaScores[kana] = {
          attemptsCount: updatedAttemptsCount,
          correctAnswersCount: updatedCorrectAnswersCount,
        };
      }
    }

    for (const [kana, quizKanaScore] of Object.entries(quizKanasScores)) {
      if (!playerKanaScores.hasOwnProperty(kana)) {
        updatedPlayerKanaScores[kana] = quizKanaScore;
      }
    }

    return updatedPlayerKanaScores;
  }
}
