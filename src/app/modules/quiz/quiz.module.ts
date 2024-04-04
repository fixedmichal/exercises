import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizContainerComponent } from './components/quiz-container/quiz-container.component';
import { FourTilesQuestionComponent } from './components/four-tiles-question/four-tiles-question.component';
import { WriteRomajiQuestionComponent } from './components/write-romaji-question/write-romaji-question.component';
import { AnswerTileComponent } from './components/answer-tile/answer-tile.component';
import { AnswerFeedbackComponent } from './components/answer-feedback/answer-feedback.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { QuizRoutingModule } from './quiz-routing.module';

@NgModule({
  declarations: [
    QuizContainerComponent,
    FourTilesQuestionComponent,
    WriteRomajiQuestionComponent,
    AnswerTileComponent,
    AnswerFeedbackComponent,
  ],
  imports: [CommonModule, SharedModule, QuizRoutingModule],
})
export class QuizModule {}
