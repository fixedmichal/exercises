import { Type } from '@angular/core';
import { FourTilesQuestionData } from './four-tiles-question-data.type';
import { FourTilesQuestionComponent } from '../components/four-tiles-question/four-tiles-question.component';
import { WriteRomajiQuestionComponent } from '../components/write-romaji-question/write-romaji-question.component';
import { WriteRomajiQuestionData } from './write-romaji-question-data.type';

export class Question {
  constructor(
    public component: Type<FourTilesQuestionComponent | WriteRomajiQuestionComponent>,
    public data: FourTilesQuestionData | WriteRomajiQuestionData
  ) {}
}
