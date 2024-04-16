import { Score } from './score.type';

export type KanasScores = {
  [kana: string]: Score & { kanaSymbol?: string };
};
