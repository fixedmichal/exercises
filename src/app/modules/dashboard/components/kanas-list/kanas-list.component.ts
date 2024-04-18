import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Kana } from 'src/app/shared/models/kana.type';

@Component({
  selector: 'app-kanas-list',
  templateUrl: './kanas-list.component.html',
  styleUrls: ['./kanas-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanasListComponent {
  @Input() kanasList: Kana[];
}
