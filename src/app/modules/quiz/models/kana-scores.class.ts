import { KanasScores } from './kana-score.type';
import { QuestionScore } from './question-score.enum';

export class KanasScoresAggregator {
  public scores: KanasScores = {};

  changeScore(kana: string, score: QuestionScore): void {
    if (!(kana in this.scores)) {
      this.scores[kana] = { correctAnswersCount: 0, attemptsCount: 0 };
    }

    const kanaScore = this.scores[kana];

    if (kanaScore) {
      kanaScore.attemptsCount++;
      if (score === QuestionScore.GOOD) {
        kanaScore.correctAnswersCount++;
      }
    }
  }

  getParticularKanaCorrectnessPercentage(kana: string): number {
    const kanaScore = this.scores[kana];

    if (kanaScore) {
      return (kanaScore?.correctAnswersCount / kanaScore?.attemptsCount) * 100;
    }

    throw Error('Kana not found');
  }
}
