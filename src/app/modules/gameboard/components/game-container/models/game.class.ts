import { Type } from '@angular/core';
import { GameData } from '../../four-tiles-one-answer-game/models/game-data.type';

export class Game {
  constructor(public component: Type<unknown>, public stepName: string, public stepData?: GameData) {}
}
