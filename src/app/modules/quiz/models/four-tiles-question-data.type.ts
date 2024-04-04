import { AnswerTile } from '../../../shared/models/answer-tile.interface';

export interface FourTilesQuestionData {
  questionType: 'fourTiles';
  answerTiles: AnswerTile[];
  correctAnswer: { value: string; index: number };
}
