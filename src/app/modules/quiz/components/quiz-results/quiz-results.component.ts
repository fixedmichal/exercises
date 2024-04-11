import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { QuizControllerService } from '../../services/quiz-controller.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizResultsComponent implements OnInit {
  readonly kanjiNumbers = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
  quizScore$ = this.quizControllerService.quizScore$;
  kanaScores$ = this.quizControllerService.kanaScores$.pipe(map((kanaScores) => kanaScores.scores));

  constructor(private quizControllerService: QuizControllerService) {}

  ngOnInit(): void {
    if (this.quizControllerService.isQuizInProgress) {
      console.log('UPDATE SCORES');
      // TODO: add some spinner!
      this.quizControllerService.updateScores();
      this.quizControllerService.isQuizInProgress = false;
    }
  }

  onClick(): void {
    console.log('clicked');
  }
}
