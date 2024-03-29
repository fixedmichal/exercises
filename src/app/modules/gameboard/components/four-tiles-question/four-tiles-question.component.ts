import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FourTilesQuestionData } from '../../models/four-tiles-question-data.type';
import { AnswerTile } from './models/answer-tile.interface';
import { QuestionCommunicationService } from '../../services/question-communication.service';
import { Subject, filter, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-four-tiles-question',
  templateUrl: './four-tiles-question.component.html',
  styleUrls: ['./four-tiles-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FourTilesQuestionComponent implements OnInit, OnDestroy {
  audioUri: string; // TODO: add sounds or DELETE THIS

  answerTiles: AnswerTile[];
  correctAnswerRomaji: string;

  areTilesDisabled = false;

  @Input() questionData: FourTilesQuestionData;

  get selectedTileIndex(): number {
    console.log(
      'selectedTileIndex: ',
      this.answerTiles.findIndex((tileData) => tileData.isSelected)
    );

    return this.answerTiles.findIndex((tileData) => tileData.isSelected);
  }

  constructor(private questionCommunicationService: QuestionCommunicationService, private cdr: ChangeDetectorRef) {}

  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (!this.areTilesDisabled) {
      const keyPressedNumberTranslatedToTileIndex = Number(event.key) - 1;

      if (!isNaN(keyPressedNumberTranslatedToTileIndex)) {
        this.selectTileAndUnselectOtherTiles(keyPressedNumberTranslatedToTileIndex);
      }
    }
  }

  ngOnInit(): void {
    this.answerTiles = this.questionData.answerTiles;
    this.correctAnswerRomaji = this.questionData.correctAnswer.value;

    this.setContinueButtonClickedCallback();
    this.setAnswerAssessedCallback();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  onTileSelected(tileIndex: number): void {
    this.selectTileAndUnselectOtherTiles(tileIndex);
  }

  private componentDestroyed$ = new Subject<void>();

  private selectTileAndUnselectOtherTiles(tileIndex: number): void {
    if (this.answerTiles[tileIndex]) {
      this.questionCommunicationService.sendIsContinueButtonDisabled(false);
      this.answerTiles = this.answerTiles.map((tile, index) =>
        index === tileIndex ? { ...tile, isSelected: !tile.isSelected } : { ...tile, isSelected: false }
      );
    }
  }

  private disableAllTiles(): void {
    this.answerTiles = this.answerTiles.map((tileData) => ({
      ...tileData,
      isDisabled: true,
    }));
  }

  private setContinueButtonClickedCallback(): void {
    this.questionCommunicationService.continueButtonClicked$
      .pipe(
        filter(() => this.selectedTileIndex !== -1),
        tap(() => {
          this.questionCommunicationService.sendfourTilesQuestionAnswered(this.selectedTileIndex);
          this.areTilesDisabled = true;
        }),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe();
  }

  private setAnswerAssessedCallback(): void {
    this.questionCommunicationService.answerAssessedFourTiles$
      .pipe(
        // filter(() => this.selectedTileIndex !== -1),
        tap((questionAnswerAssessed) => {
          this.answerTiles[this.selectedTileIndex].isColoredGreen = questionAnswerAssessed.isAnsweredCorrectly;

          if (!questionAnswerAssessed.isAnsweredCorrectly) {
            this.answerTiles[this.selectedTileIndex].isColoredRed = true;
            this.answerTiles[questionAnswerAssessed.correctAnswerIndex].isColoredGreen = true;
          }

          this.disableAllTiles();

          this.cdr.markForCheck();
        }),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe();
  }
}
