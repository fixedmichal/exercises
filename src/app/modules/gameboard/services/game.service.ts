import { Injectable } from '@angular/core';
import { HiraganaSymbol, hiraganaSystem } from '../../../shared/constants/hiragana-list-final.constants';
import { Builder } from 'builder-pattern';
import { Observable, Subject, map, startWith } from 'rxjs';
import { GameData } from '../components/four-tiles-one-answer-game/models/game-data.type';
import { AnswerTile } from '../components/four-tiles-one-answer-game/models/game-tile.interface';

@Injectable({ providedIn: 'root' })
export class GameService {
  readonly tileImagePathBase = './../../../assets/images/hiragana/';
  goToNextExercise$ = new Subject<void>();

  getGameData$(): Observable<GameData> {
    return this.goToNextExercise$.pipe(
      startWith(0),
      map(() => this.prepareGameData())
    );
  }

  createQuiz() {}

  prepareGameData(): GameData {
    const hiraganaSymbolsCount = hiraganaSystem.length;
    let fourRandomHiraganas: HiraganaSymbol[];
    let fourRandomIndexes: number[];

    fourRandomIndexes = this.genereateRandomIndexes(4, hiraganaSymbolsCount);

    fourRandomHiraganas = hiraganaSystem.filter((_, index) => fourRandomIndexes.some((i) => i === index));

    const randomIndex = this.generateUniqueIndex(fourRandomHiraganas.length);
    const correctAnswer = {
      sign: fourRandomHiraganas[randomIndex].sign,
      romaji: fourRandomHiraganas[randomIndex].romaji,
    };

    const gameTiles = fourRandomHiraganas.map((answerData) => {
      const imagePath = `${this.tileImagePathBase}${answerData.romaji}.png`;

      return Builder<AnswerTile>()
        .value(answerData.romaji)
        .imagePath(imagePath)
        .isSelected(false)
        .isColoredGreen(false)
        .isColoredRed(false)
        .build();
    });

    return { answerTiles: gameTiles, correctAnswer };
  }

  genereateRandomIndexes(indexesToGenerateCount: number, syllablesCount: number): number[] {
    let uniqueRandomIndexes: number[] = [];

    for (let i = 0; i < indexesToGenerateCount; i++) {
      const randomIndex = this.generateUniqueIndex(syllablesCount, uniqueRandomIndexes);

      uniqueRandomIndexes.push(randomIndex);
    }

    return uniqueRandomIndexes;
  }

  generateUniqueIndex(syllablesCount: number, indexes: number[] = []): number {
    let randomIndex: number;
    let isDuplicate: boolean;

    do {
      randomIndex = Math.floor(Math.random() * syllablesCount);

      isDuplicate = indexes.some((value) => value === randomIndex);
    } while (isDuplicate);

    return randomIndex;
  }
}
