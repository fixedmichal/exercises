import { Injectable } from '@angular/core';
import { QuizScoreService } from 'src/app/modules/quiz/services/quiz-score.service';

@Injectable({ providedIn: 'root' })
export class CleanupService {
  constructor(private quizScoreService: QuizScoreService) {}

  cleanup(): void {
    this.quizScoreService.cleanupAllScores();
  }
}
