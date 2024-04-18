import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { QuizControllerService } from '../../services/quiz-controller.service';
import { map, tap } from 'rxjs';
import { kanjiNumbers } from 'src/app/shared/constants/kanji-numbers.constants';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/app-routes.enum';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizResultsComponent implements OnInit {
  kanjiNumbers = kanjiNumbers;
  quizScore$ = this.quizControllerService.quizScore$;
  kanaScores$ = this.quizControllerService.currentQuizKanasScores$.pipe(
    // map(() => new KanasScoresAggregator({ ki: { correctAnswersCount: 1, attemptsCount: 2 } })),
    tap((kanaScores) => kanaScores.generateKanasSymbols()),
    map((kanaScores) => kanaScores.scores)
  );

  constructor(private router: Router, private quizControllerService: QuizControllerService) {}

  ngOnInit(): void {
    if (this.quizControllerService.isQuizInProgress) {
      // TODO: add some spinner!
      this.quizControllerService.updateScoresInDatabase();
      this.quizControllerService.isQuizInProgress = false;
    }
  }

  onRepeatClick(): void {
    this.router.navigate([AppRoutes.Quiz]);
  }
  
  onBackClick(): void {
    this.router.navigate([AppRoutes.Dashboard]);
  }
}
