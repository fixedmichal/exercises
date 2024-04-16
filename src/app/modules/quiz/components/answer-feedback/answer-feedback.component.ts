import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  WriteRomajiQuestionResultData,
  FourTilesQuestionResultData,
} from 'src/app/shared/models/question-answer-result-data.type';

@Component({
  selector: 'app-answer-feedback',
  template: `
    <article *ngIf="answerResult" class="answer-feedback">
      <h1 class="answer-feedback__main-header">{{ answerResult.isAnsweredCorrectly ? 'Correct' : 'Wrong' }}!</h1>
      <app-write-romaji-answer-feedback *ngIf="isAnswerResultWriteRomaji(answerResult)" [answerResult]="answerResult" />
    </article>
  `,
  styleUrls: ['./answer-feedback.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnswerFeedbackComponent {
  @Input() answerResult: FourTilesQuestionResultData | WriteRomajiQuestionResultData | null;

  isAnswerResultWriteRomaji(
    answerResult: FourTilesQuestionResultData | WriteRomajiQuestionResultData | null
  ): answerResult is WriteRomajiQuestionResultData {
    return answerResult?.questionType === 'writeRomaji';
  }
}
