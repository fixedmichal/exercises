import { HiraganaSymbol } from "../constants/hiragana-list-final.constants";
import { GameTile } from "./game-tile.interface";

export interface GameData {
  gameTiles: GameTile[];
  correctAnswer: HiraganaSymbol
}