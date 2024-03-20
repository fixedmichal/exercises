import { Component } from '@angular/core';

@Component({
  selector: 'app-write-romaji-game',
  templateUrl: './write-romaji-game.component.html',
  styleUrls: ['./write-romaji-game.component.scss'],
})
export class WriteRomajiGameComponent {
  constructor() {}
  
  readonly tileImagePathBase = './../../../assets/images/hiragana/mo.png';
}
