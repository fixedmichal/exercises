import { Type } from '@angular/core';
import { FourTilesQuestionData } from './four-tiles-question-data.type';
import { FourTilesQuestionComponent } from '../components/four-tiles-one-answer-game/four-tiles-question.component';
import { WriteRomajiQuestionComponent } from '../components/write-romaji-game/write-romaji-question.component';
import { WriteRomajiQuestionData } from './write-romaji-question-data.type';

export class Question {
  constructor(
    public component: Type<FourTilesQuestionComponent | WriteRomajiQuestionComponent>,
    public data: FourTilesQuestionData | WriteRomajiQuestionData
  ) {}
}
