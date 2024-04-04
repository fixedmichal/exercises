import { QuestionType } from './question-type.enum';

export interface FourTilesQuestionResultData {
  questionType: QuestionType.FourTiles;
  isAnsweredCorrectly: boolean;
  correctAnswerIndex: number;
}

export interface WriteRomajiQuestionResultData {
  questionType: QuestionType.WriteRomaji;
  isAnsweredCorrectly: boolean;
  correctAnswerInRomaji: string;
  wordEnglishTranslation: string;
}
