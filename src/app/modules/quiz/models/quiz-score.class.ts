import { QuestionScore } from './question-score.enum';

export class QuizQuestionsScore {
  constructor(
    public questionsCount: number,
    public currentQuestionIndex: number,
    public questionsScore = new Array(questionsCount).fill(QuestionScore.UNANSWERED)
  ) {}

  get correctAnswersCount(): number {
    return this.questionsScore.filter((score) => score === QuestionScore.GOOD).length;
  }

  rateQuestion(score: QuestionScore): void {
    this.questionsScore[this.currentQuestionIndex] = score;
    this.currentQuestionIndex++;
  }

  clone(): QuizQuestionsScore {
    return new QuizQuestionsScore(this.questionsCount, this.currentQuestionIndex, [...this.questionsScore]);
  }
}
