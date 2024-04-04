import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AnswerTile } from '../../../../shared/models/answer-tile.interface';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-answer-tile',
  templateUrl: './answer-tile.component.html',
  styleUrls: ['./answer-tile.component.scss'],
})
export class AnswerTileComponent {
  @Input() index: number;

  @Input() answerTileConfig: AnswerTile;
  @Output() tileSelected = new EventEmitter<number>();

  onClick(): void {
    this.tileSelected.emit(this.index);
  }
}
