import { AnswerTile } from '../components/four-tiles-one-answer-game/models/answer-tile.interface';

export interface FourTilesQuestionData {
  questionType: 'fourTiles';
  answerTiles: AnswerTile[];
  correctAnswer: { value: string; index: number };
}
