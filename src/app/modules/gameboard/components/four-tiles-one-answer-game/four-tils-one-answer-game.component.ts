import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Input, OnInit } from '@angular/core';
import { from, tap, timer, zip } from 'rxjs';
import { GameService } from '../../services/game.service';
import { GameData } from './models/game-data.type';
import { AnswerTile } from './models/game-tile.interface';
import { HiraganaSymbol } from '../../../../shared/constants/hiragana-list-final.constants';

@Component({
  selector: 'app-four-tiles-one-answer-game',
  templateUrl: './four-tiles-one-answer-game.component.html',
  styleUrls: ['./four-tiles-one-answer-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FourTilesOneAnswerGameComponent implements OnInit {
  audioUri: string;

  // gameData: GameData;
  answerTiles: AnswerTile[];
  correctAnswer: HiraganaSymbol;
  isAnsweredCorrectly: boolean;
  isAnsweredWrongly: boolean;
  isAnswerConfirmed = false;

  @Input() gameData: GameData;

  constructor(private cdr: ChangeDetectorRef, private gameService: GameService) {}

  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (this.isAnswerConfirmed) {
      if (event.key === 'Enter') {
        this.onContinue2Click();
      }

      return;
    }

    if (event.key === 'Enter') {
      this.onContinueClick();
    }

    const keyPressedNumberTranslatedToTileIndex = Number(event.key) - 1;

    if (!isNaN(keyPressedNumberTranslatedToTileIndex)) {
      this.selectTileAndUnselectOtherTiles(keyPressedNumberTranslatedToTileIndex);
    }
  }

  ngOnInit(): void {
    // this.gameData = this.gameService.prepareGameData();

    this.answerTiles = this.gameData.answerTiles;
    this.correctAnswer = this.gameData.correctAnswer;
  }

  onTileSelected(tileIndex: number): void {
    // const container = this.gameContentDirective.viewContainerRef.createComponent(AnswerTileComponent);

    this.selectTileAndUnselectOtherTiles(tileIndex);
  }

  selectTileAndUnselectOtherTiles(tileIndex: number): void {
    if (this.answerTiles[tileIndex]) {
      this.answerTiles = this.answerTiles.map((tile, index) =>
        index === tileIndex ? { ...tile, isSelected: !tile.isSelected } : { ...tile, isSelected: false }
      );
    }
  }

  onNextClick(): void {
    this.gameData = this.gameService.prepareGameData();

    this.answerTiles = this.gameData.answerTiles;
    this.correctAnswer = this.gameData.correctAnswer;
  }

  onContinueClick(): void {
    const selectedTile = this.answerTiles.find((tileData) => tileData.isSelected);

    if (selectedTile) {
      const selectedTileIndex = this.answerTiles.indexOf(selectedTile);

      this.answerTiles = this.answerTiles.map((tileData) => ({
        ...tileData,
        isDisabled: true,
      }));

      this.isAnsweredCorrectly = selectedTile.value === this.gameData.correctAnswer.romaji;
      this.isAnsweredWrongly = !this.isAnsweredCorrectly;

      if (this.isAnsweredCorrectly) {
        this.answerTiles[selectedTileIndex].isColoredGreen = true;
      } else {
        this.answerTiles[selectedTileIndex].isColoredRed = true;

        const tileWithCorrectAnswer = this.answerTiles.find(
          (tileData) => tileData.value === this.gameData.correctAnswer.romaji
        );

        if (tileWithCorrectAnswer) {
          tileWithCorrectAnswer.isColoredGreen = true;
        }
      }

      this.isAnswerConfirmed = true;
    }
  }

  onContinue2Click(): void {
    this.isAnswerConfirmed = false;
    this.gameData = this.gameService.prepareGameData();

    this.answerTiles = this.gameData.answerTiles;
    this.correctAnswer = this.gameData.correctAnswer;
  }
}
