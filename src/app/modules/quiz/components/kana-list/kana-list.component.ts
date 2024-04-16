import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Kana } from 'src/app/shared/models/kana.type';
import { KanasScores } from '../../models/kana-score.type';

@Component({
  selector: 'app-kana-list',
  templateUrl: './kana-list.component.html',
  styleUrls: ['./kana-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanaListComponent {
  @Input() kanasList?: Kana[];
  @Input() kanasScores?: KanasScores | null;
}
