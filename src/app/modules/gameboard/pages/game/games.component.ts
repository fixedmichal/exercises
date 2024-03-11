import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { from, tap, timer, zip } from 'rxjs';
import { GameService } from '../../services/game.service';
import { GameData } from './models/game-data.type';
import { GameTile } from './models/game-tile.interface';
import { HiraganaSymbol } from './constants/hiragana-list-final.constants';

@Component({
  selector: 'app-game',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesComponent implements OnInit {
  audioUri: string;

  gameData: GameData;
  gameTiles: GameTile[];
  correctAnswer: HiraganaSymbol;
  isAnsweredCorrectly: boolean;
  isAnsweredWrongly: boolean;
  isAnswerConfirmed = false;

  constructor(private cdr: ChangeDetectorRef, private gameService: GameService) {}

  @HostListener('document:keydown', ['$event']) 
  onKeydownHandler(event: KeyboardEvent) {
    if (this.isAnswerConfirmed) { return; }
    const keyPressedNumberTranslatedToTileIndex = Number(event.key) - 1;

    this.selectTileAndUnselectOtherTiles(keyPressedNumberTranslatedToTileIndex);
  }


  ngOnInit(): void {

    this.gameData = this.gameService.prepareGameData();

    this.gameTiles = this.gameData.gameTiles;
    this.correctAnswer = this.gameData.correctAnswer;
  }

  onTileSelected(tileIndex: number): void {
    this.selectTileAndUnselectOtherTiles(tileIndex);
  }

  selectTileAndUnselectOtherTiles(tileIndex: number): void {
    if (this.gameTiles[tileIndex]) {
      this.gameTiles.forEach((_, index) => 
      (this.gameTiles[index].isSelected = index === tileIndex ? !this.gameTiles[index].isSelected : false));
    }
  }

  onNextClick(): void {
    this.gameData = this.gameService.prepareGameData();

    this.gameTiles = this.gameData.gameTiles;
    this.correctAnswer = this.gameData.correctAnswer;
  }

  onContinueClick(): void {
    const selectedTile = this.gameTiles.find(tileData => tileData.isSelected);
    
    
    if (selectedTile) {
      const selectedTileIndex = this.gameTiles.indexOf(selectedTile);

      this.gameTiles = this.gameTiles.map( tileData => ({ ...tileData, isDisabled: true}));

      this.isAnsweredCorrectly = selectedTile.answer === this.gameData.correctAnswer.romaji;
      this.isAnsweredWrongly = !this.isAnsweredCorrectly;
      
      if (this.isAnsweredCorrectly) {
        this.gameTiles[selectedTileIndex].isAnsweredCorrectly = true;
      } else {
        this.gameTiles[selectedTileIndex].isAnsweredWrongly = true;
      }

      this.isAnswerConfirmed = true;
    }
  }

  onContinue2Click(): void {
    this.isAnswerConfirmed = false;
    this.gameData = this.gameService.prepareGameData();

    this.gameTiles = this.gameData.gameTiles;
    this.correctAnswer = this.gameData.correctAnswer;
  }


}
