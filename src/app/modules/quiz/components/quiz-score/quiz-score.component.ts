import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { QuizQuestionsScore } from '../../models/quiz-score.class';

@Component({
  selector: 'app-quiz-score',
  templateUrl: './quiz-score.component.html',
  styleUrls: ['./quiz-score.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizScoreComponent {
  @Input() quizScore: QuizQuestionsScore;
}
