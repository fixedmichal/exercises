import { HiraganaSyllable } from '../../../shared/constants/hiragana-syllables.constants';
import { AnswerTile } from '../components/four-tiles-one-answer-game/models/answer-tile.interface';

export interface FourTilesOneAnswerQuestionData {
  answerTiles: AnswerTile[];
  correctAnswer: HiraganaSyllable;
}
