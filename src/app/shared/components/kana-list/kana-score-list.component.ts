import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { KanasScores } from '../../../modules/quiz/models/kana-score.type';

@Component({
  selector: 'app-kana-score-list',
  templateUrl: './kana-score-list.component.html',
  styleUrls: ['./kana-score-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanaScoreListComponent {
  @Input() kanasScores: KanasScores | null;
  @Input() rowsConfiguration: 'few' | 'many' = 'many';
}
