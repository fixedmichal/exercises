import { Injectable } from '@angular/core';
import { HiraganaSyllable, hiraganaSyllables } from '../../../shared/constants/hiragana-syllables.constants';
import { Builder } from 'builder-pattern';
import { Observable, Subject, map, startWith } from 'rxjs';
import { FourTilesOneAnswerQuestionData } from '../models/four-tiles-one-answer-question-data.type';
import { AnswerTile } from '../components/four-tiles-one-answer-game/models/answer-tile.interface';
import { hiraganaWords } from 'src/app/shared/constants/hiragana-words.constants';
import { HiraganaWord } from 'src/app/shared/models/hiragana-word.type';
import { WriteRomajiQuestionData } from '../models/write-romaji-question-data.type';

@Injectable({ providedIn: 'root' })
export class GameCreatorService {
  readonly tileImagePathBase = '/assets/images/hiragana/';
  goToNextExercise$ = new Subject<void>();

  getGameData$(): Observable<FourTilesOneAnswerQuestionData> {
    return this.goToNextExercise$.pipe(
      startWith(0),
      map(() => this.prepareGameData())
    );
  }

  createQuiz() {}

  prepareGameData(): FourTilesOneAnswerQuestionData {
    const kanaSymbolsCount = hiraganaSyllables.length;
    let fourRandomKanas: HiraganaSyllable[];
    const fourRandomIndexes = this.genereateRandomIndexes(4, kanaSymbolsCount);

    fourRandomKanas = hiraganaSyllables.filter((_, index) => fourRandomIndexes.some((i) => i === index));

    const randomIndex = this.generateUniqueIndex(fourRandomKanas.length);
    const correctAnswer = {
      symbol: fourRandomKanas[randomIndex].symbol,
      romaji: fourRandomKanas[randomIndex].romaji,
    };

    const gameTiles = fourRandomKanas.map((answerData) => {
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

  // to do osobnego pliku rejczel
  generateUniqueIndex(arrayLength: number, indexes: number[] = []): number {
    let randomIndex: number;
    let isDuplicate: boolean;

    do {
      randomIndex = Math.floor(Math.random() * arrayLength);

      isDuplicate = indexes.some((value) => value === randomIndex);
    } while (isDuplicate);

    return randomIndex;
  }

  getRandomKanaWord(): HiraganaWord {
    const randomIndex = this.generateUniqueIndex(hiraganaWords.length);
    return hiraganaWords[randomIndex];
  }

  getImagesForWriteRomajiQuestion(word: HiraganaWord): string[] {
    const romajiDividedIntoSyllables = word.dividedRomaji.split('-');
    console.log(romajiDividedIntoSyllables);
    let kanaImages: string[] = [];

    for (const romajiSyllable of romajiDividedIntoSyllables) {
      kanaImages.push(`/assets/images/hiragana/${romajiSyllable}.png`);
    }

    return kanaImages;
  }

  getWriteRomajiQuestionData(): WriteRomajiQuestionData {
    const kanaWord = this.getRandomKanaWord();
    const kanaImages = this.getImagesForWriteRomajiQuestion(kanaWord);

    return { kanaImages, correctAnswer: kanaWord.romaji };
  }
}
