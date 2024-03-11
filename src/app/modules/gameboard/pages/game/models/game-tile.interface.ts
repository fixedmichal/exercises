export interface GameTile {
  answer: string;
  imagePath: string;
  isSelected: boolean;
  isDisabled: boolean;
  isAnsweredCorrectly?: boolean;
  isAnsweredWrongly?: boolean;
}