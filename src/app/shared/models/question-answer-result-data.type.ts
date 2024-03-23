export type QuestionAnswerResultData<T> = {
  isAnsweredCorrectly: boolean;
  data: T;
};

export type WriteRomajiQuestionResultData = {
  correctAnswer: string;
  wordEnglishTranslation: string;
};
