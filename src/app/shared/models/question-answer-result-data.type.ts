export type FourTilesQuestionResultData = {
  questionType: 'fourTiles';
  isAnsweredCorrectly: boolean;
  correctAnswerIndex: number;
};

export type WriteRomajiQuestionResultData = {
  questionType: 'writeRomaji';
  isAnsweredCorrectly: boolean;
  correctAnswerInRomaji: string;
  wordEnglishTranslation: string;
};
