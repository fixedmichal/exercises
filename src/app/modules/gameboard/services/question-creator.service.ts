import { WriteRomajiQuestionComponent } from '../components/write-romaji-game/write-romaji-question.component';
import { Injectable } from '@angular/core';
import { hiraganaSyllables } from '../../../shared/constants/hiragana-syllables.constants';
import { Builder } from 'builder-pattern';
import { FourTilesQuestionData } from '../models/four-tiles-question-data.type';
import { AnswerTile } from '../components/four-tiles-one-answer-game/models/answer-tile.interface';
import { hiraganaWords } from 'src/app/shared/constants/hiragana-words.constants';
import { HiraganaWord } from 'src/app/shared/models/hiragana-word.type';
import { WriteRomajiQuestionData } from '../models/write-romaji-question-data.type';
import { FourTilesQuestionComponent } from '../components/four-tiles-one-answer-game/four-tiles-question.component';
import { Question } from '../models/question.class';

@Injectable({ providedIn: 'root' })
export class QuestionCreatorService {
  readonly tileImagePathBase = '/assets/images/hiragana/';

  createQuiz(): Question[] {
    return [
      new Question(WriteRomajiQuestionComponent, this.createWriteRomajiQuestionData()),
      new Question(FourTilesQuestionComponent, this.createFourTilesOneAnswerQuestionData()),
      new Question(WriteRomajiQuestionComponent, this.createWriteRomajiQuestionData()),
      new Question(FourTilesQuestionComponent, this.createFourTilesOneAnswerQuestionData()),
      new Question(FourTilesQuestionComponent, this.createFourTilesOneAnswerQuestionData()),
      new Question(FourTilesQuestionComponent, this.createFourTilesOneAnswerQuestionData()),
      new Question(FourTilesQuestionComponent, this.createFourTilesOneAnswerQuestionData()),
      new Question(FourTilesQuestionComponent, this.createFourTilesOneAnswerQuestionData()),
      // new Question(WriteRomajiGameComponent, this.createWriteRomajiQuestionData()),
    ];
  }

  createFourTilesOneAnswerQuestionData(): FourTilesQuestionData {
    const kanaSymbolsCount = hiraganaSyllables.length;
    const fourRandomIndexes = this.genereateRandomIndexes(4, kanaSymbolsCount);

    const fourKanaAnswers = hiraganaSyllables.filter((_, index) => fourRandomIndexes.some((i) => i === index));

    const correntAnswerIndex = this.generateUniqueIndex(fourKanaAnswers.length);

    const correctAnswer = fourKanaAnswers[correntAnswerIndex].romaji;

    const gameTiles = fourKanaAnswers.map((answerData) => {
      const imagePath = `${this.tileImagePathBase}${answerData.romaji}.png`;

      return Builder<AnswerTile>()
        .imagePath(imagePath)
        .isSelected(false)
        .isColoredGreen(false)
        .isColoredRed(false)
        .isDisabled(false)
        .build();
    });

    return {
      questionType: 'fourTiles',
      answerTiles: gameTiles,
      correctAnswer: { value: correctAnswer, index: correntAnswerIndex },
    };
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

  createWriteRomajiQuestionData(): WriteRomajiQuestionData {
    const kanaWord = this.getRandomKanaWord();
    const kanaImages = this.getImagesForWriteRomajiQuestion(kanaWord);

    return { questionType: 'writeRomaji', kanaImages, correctAnswerRomaji: kanaWord.romaji };
  }
}
