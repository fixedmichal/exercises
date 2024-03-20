import { HiraganaSymbol } from '../../../../../shared/constants/hiragana-list-final.constants';
import { AnswerTile } from './game-tile.interface';

export interface GameData {
  answerTiles: AnswerTile[];
  correctAnswer: HiraganaSymbol;
}
