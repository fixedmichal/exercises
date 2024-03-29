import { AnswerTile } from '../components/four-tiles-question/models/answer-tile.interface';

export interface FourTilesQuestionData {
  questionType: 'fourTiles';
  answerTiles: AnswerTile[];
  correctAnswer: { value: string; index: number };
}
