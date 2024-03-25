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
  audioUri: string;

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
    this.setContinueButtonClickedCallback();
    this.setAnswerAssessedCallback();
    this.correctAnswerRomaji = this.questionData.correctAnswer.value;
    console.log('correctAnswerIndex: ', this.questionData.correctAnswer.index);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  onTileSelected(tileIndex: number): void {
    this.selectTileAndUnselectOtherTiles(tileIndex);
  }

  selectTileAndUnselectOtherTiles(tileIndex: number): void {
    if (this.answerTiles[tileIndex]) {
      this.answerTiles = this.answerTiles.map((tile, index) =>
        index === tileIndex ? { ...tile, isSelected: !tile.isSelected } : { ...tile, isSelected: false }
      );
    }
  }

  setContinueButtonClickedCallback(): void {
    this.questionCommunicationService.continueButtonClicked$
      .pipe(
        filter(() => this.selectedTileIndex !== -1),
        tap(() => {
          this.questionCommunicationService.sendAnswerIndex(this.selectedTileIndex);
          this.areTilesDisabled = true;
        }),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe();
  }

  setAnswerAssessedCallback(): void {
    this.questionCommunicationService.answerAssessedFourTiles$
      .pipe(
        filter(() => this.selectedTileIndex !== -1),
        tap((questionAnswerAssessed) => {
          console.log('questionAnswerAssessed', questionAnswerAssessed?.isAnsweredCorrectly);
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

  private componentDestroyed$ = new Subject<void>();

  private disableAllTiles(): void {
    this.answerTiles = this.answerTiles.map((tileData) => ({
      ...tileData,
      isDisabled: true,
    }));
  }

  // sendAnswerData(): void {}

  // onNextClick(): void {
  //   this.questionData = this.gameService.createFourTilesOneAnswerQuestionData();

  //   this.answerTiles = this.questionData.answerTiles;
  //   this.correctAnswerRomaji = this.questionData.correctAnswerRomaji;
  // }

  // onContinueClick(): void {
  //   const selectedTile = this.answerTiles.find((tileData) => tileData.isSelected);

  //   if (selectedTile) {
  //     const selectedTileIndex = this.answerTiles.indexOf(selectedTile);

  //     // sets each element
  //     this.answerTiles = this.answerTiles.map((tileData) => ({
  //       ...tileData,
  //       isDisabled: true,
  //     }));

  //     this.isAnsweredCorrectly = selectedTile.value === this.questionData.correctAnswerRomaji;
  //     this.isAnsweredWrongly = !this.isAnsweredCorrectly;

  //     if (this.isAnsweredCorrectly) {
  //       this.answerTiles[selectedTileIndex].isColoredGreen = true;
  //     } else {
  //       this.answerTiles[selectedTileIndex].isColoredRed = true;

  //       const tileWithCorrectAnswer = this.answerTiles.find(
  //         (tileData) => tileData.value === this.questionData.correctAnswerRomaji
  //       );

  //       if (tileWithCorrectAnswer) {
  //         tileWithCorrectAnswer.isColoredGreen = true;
  //       }
  //     }

  //     this.isAnswerConfirmed = true;
  //   }
  // }

  // onContinue2Click(): void {
  //   this.isAnswerConfirmed = false;
  //   this.questionData = this.gameService.createFourTilesOneAnswerQuestionData();

  //   this.answerTiles = this.questionData.answerTiles;
  //   this.correctAnswerRomaji = this.questionData.correctAnswerRomaji;
  // }
}
