export interface FourTilesQuestionResultData {
  questionType: 'fourTiles';
  isAnsweredCorrectly: boolean;
  correctAnswerIndex: number;
}

export interface WriteRomajiQuestionResultData {
  questionType: 'writeRomaji';
  isAnsweredCorrectly: boolean;
  correctAnswerInRomaji: string;
  wordEnglishTranslation: string;
}
