import { QuizScoreService } from './quiz-score.service';
import { QuizScoreClientService } from './score-client.service';
import { SpectatorService, SpyObject, createServiceFactory } from '@ngneat/spectator';

describe('QuizScoreService', () => {
  let spectator: SpectatorService<QuizScoreService>;

  let quizScoreClientServiceMock: SpyObject<QuizScoreClientService>;

  const spySubscribe = jest.fn();

  const createService = createServiceFactory({
    mocks: [QuizScoreClientService],
    service: QuizScoreService,
  });

  beforeEach(() => {
    spectator = createService();
    quizScoreClientServiceMock = spectator.inject(QuizScoreClientService);
  });

  describe('mergeTotalAndCurrentPlayerKanasScores', () => {
    it('should merge the total and current player kana scores correctly', () => {
      // Arrange
      const playerKanaScores = {
        a: { attemptsCount: 2, correctAnswersCount: 1 },
        b: { attemptsCount: 3, correctAnswersCount: 2 },
      };

      const quizKanaScores = {
        b: { attemptsCount: 1, correctAnswersCount: 1 },
        c: { attemptsCount: 4, correctAnswersCount: 3 },
      };

      const expectedMergedScores = {
        a: { attemptsCount: 2, correctAnswersCount: 1 },
        b: { attemptsCount: 4, correctAnswersCount: 3 },
        c: { attemptsCount: 4, correctAnswersCount: 3 },
      };

      // Act
      const mergedScores = spectator.service['mergeTotalAndCurrentPlayerKanasScores'](playerKanaScores, quizKanaScores);

      // Assert
      expect(mergedScores).toEqual(expectedMergedScores);
    });

    it('should handle empty player kana scores correctly', () => {
      // Arrange
      const playerKanaScores = {};

      const quizKanaScores = {
        a: { attemptsCount: 2, correctAnswersCount: 1 },
        b: { attemptsCount: 3, correctAnswersCount: 2 },
      };

      const expectedMergedScores = {
        a: { attemptsCount: 2, correctAnswersCount: 1 },
        b: { attemptsCount: 3, correctAnswersCount: 2 },
      };

      // Act
      const mergedScores = spectator.service['mergeTotalAndCurrentPlayerKanasScores'](playerKanaScores, quizKanaScores);

      // Assert
      expect(mergedScores).toEqual(expectedMergedScores);
    });

    it('should handle empty quiz kana scores correctly', () => {
      // Arrange
      const playerKanaScores = {
        a: { attemptsCount: 2, correctAnswersCount: 1 },
        b: { attemptsCount: 3, correctAnswersCount: 2 },
      };

      const quizKanaScores = {};

      const expectedMergedScores = {
        a: { attemptsCount: 2, correctAnswersCount: 1 },
        b: { attemptsCount: 3, correctAnswersCount: 2 },
      };

      // Act
      const mergedScores = spectator.service['mergeTotalAndCurrentPlayerKanasScores'](playerKanaScores, quizKanaScores);

      // Assert
      expect(mergedScores).toEqual(expectedMergedScores);
    });

    // Add more test cases as needed
  });
});
