import { AfterContentInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { KanasScoresAggregator } from 'src/app/modules/quiz/models/kana-scores.class';
import { QuizScoreService } from 'src/app/modules/quiz/services/quiz-score.service';

@Component({
  selector: 'app-player-statistics-page',
  templateUrl: './player-statistics-page.component.html',
  styleUrls: ['./player-statistics-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerStatisticsPageComponent implements OnInit, AfterContentInit {
  playerTotalKanasScores$ = this.quizScoreService.playerTotalKanasScores$.pipe(
    map((scores) => {
      const kanasScoresAggregator = new KanasScoresAggregator(scores);
      kanasScoresAggregator.generateKanasSymbols();

      return kanasScoresAggregator.scores;
    })
  );

  playerTotalQuestionsScore$ = this.quizScoreService.playerTotalQuestionsScore$;

  constructor(private quizScoreService: QuizScoreService) {}

  ngOnInit(): void {
    this.quizScoreService.fetchPlayerTotalKanasScores();
    this.quizScoreService.fetchPlayerTotalQuestionsScore();
  }

  ngAfterContentInit(): void {
    this.playerTotalQuestionsScore$.subscribe((x) => console.log('playerTotalQuestionsScore: ', x));
  }
}
