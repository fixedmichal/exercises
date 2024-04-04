import { JapaneseScript } from './japanese-script';
import { QuestionScore } from './question-score.enum';

export type QuizScore = {
  detailedQuestionsScore: QuestionScore[];
  correctlyAnsweredQuestionsCount: number;
  totalQuestionsCount: number;
  scriptType: JapaneseScript;
};
