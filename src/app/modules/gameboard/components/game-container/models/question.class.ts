import { Type } from '@angular/core';
import { FourTilesOneAnswerQuestionData } from '../../../models/four-tiles-one-answer-question-data.type';

export class Game {
  constructor(
    public component: Type<unknown>,
    public stepName: string,
    public stepData?: FourTilesOneAnswerQuestionData
  ) {}
}
