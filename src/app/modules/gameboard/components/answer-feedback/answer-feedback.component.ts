import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  WriteRomajiQuestionResultData,
  FourTilesQuestionResultData,
} from 'src/app/shared/models/question-answer-result-data.type';

@Component({
  selector: 'app-answer-feedback',
  templateUrl: './answer-feedback.component.html',
  styleUrls: ['./answer-feedback.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnswerFeedbackComponent {
  @Input() answerResultWriteRomaji: WriteRomajiQuestionResultData | null;
  @Input() answerResultFourTiles: FourTilesQuestionResultData | null;
}
