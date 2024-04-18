import { ChangeDetectionStrategy, Component } from '@angular/core';
import { hiraganaSyllables } from 'src/app/shared/constants/hiragana-syllables.constants';

@Component({
  selector: 'app-hiragana-page',
  templateUrl: './hiragana-page.component.html',
  styleUrls: ['./hiragana-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HiraganaPageComponent {
  hiraganaSyllables = [...hiraganaSyllables];
}
