import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { WriteRomajiQuestionResultData } from 'src/app/shared/models/question-answer-result-data.type';

@Component({
  selector: 'app-write-romaji-answer-feedback',
  template: ` <h3 *ngIf="!answerResult?.isAnsweredCorrectly"
      >Correct answer is <i>"{{ answerResult?.correctAnswerInRomaji }}"</i>.</h3
    >
    <h4>
      It means <i>"{{ answerResult?.wordEnglishTranslation }}".</i>
    </h4>`,
  styleUrls: ['./../answer-feedback.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WriteRomajiAnswerFeedbackComponent {
  @Input() answerResult: WriteRomajiQuestionResultData | null;
}
