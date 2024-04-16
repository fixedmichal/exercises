import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { QuizControllerService } from '../../services/quiz-controller.service';
import { map, tap } from 'rxjs';
import { kanjiNumbers } from 'src/app/shared/constants/kanji-numbers.constants';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizResultsComponent implements OnInit {
  kanjiNumbers = kanjiNumbers;
  quizScore$ = this.quizControllerService.quizScore$;
  kanaScores$ = this.quizControllerService.quizKanasScores$.pipe(
    // map(() => new KanasScoresAggregator({ ki: { correctAnswersCount: 1, attemptsCount: 2 } })),
    tap((kanaScores) => kanaScores.generateKanasSymbols()),
    map((kanaScores) => kanaScores.scores)
  );

  constructor(private quizControllerService: QuizControllerService) {}

  ngOnInit(): void {
    if (this.quizControllerService.isQuizInProgress) {
      // TODO: add some spinner!
      this.quizControllerService.updateScoresInDatabase();
      this.quizControllerService.isQuizInProgress = false;
    }
  }

  onClick(): void {
    console.log('clicked');
  }
}
