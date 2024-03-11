import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-answer-tile',
  templateUrl: './answer-tile.component.html',
  styleUrls: ['./answer-tile.component.scss']
})
export class AnswerTileComponent implements OnChanges{
  @Input() imagePath: string;
  @Input() answerValue: string;
  @Input() index: number;
  @Input() isSelected = false;
  @Input() isDisabled = false;

  @Input() isAnsweredCorrectly: boolean | undefined;
  @Input() isAnsweredWrongly: boolean | undefined;

  @Output() tileSelected = new EventEmitter<number>();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
  }
  
  onClick(): void {
    this.tileSelected.emit(this.index);
  }
}
