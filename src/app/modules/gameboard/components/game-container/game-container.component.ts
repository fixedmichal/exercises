import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GameContentDirective } from 'src/app/shared/directives/game-content.directive';
import { GameService } from '../../services/game.service';
import { FourTilesOneAnswerGameComponent } from '../four-tiles-one-answer-game/four-tils-one-answer-game.component';
import { Observable, interval, map, startWith, take, tap, timer } from 'rxjs';

@Component({
  selector: 'app-game-container',
  templateUrl: './game-container.component.html',
  styleUrls: ['./game-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameContainerComponent implements OnInit, DoCheck {
  @ViewChild(GameContentDirective, { static: true }) gameContentDirective: GameContentDirective;

  constructor(private gameService: GameService, private cdr: ChangeDetectorRef, private ngZone: NgZone) {}

  counter$ = interval(100).pipe(
    map((value) => value * 10),
    tap(console.log),
    take(11)
  );

  ngDoCheck(): void {
    console.log('>>>CHECK');
  }

  ngOnInit(): void {
    // this.ngZone.runOutsideAngular(() => {
    //   interval()
    // })
    // const component = this.gameContentDirective.viewContainerRef.createComponent(FourTilesOneAnswerGameComponent);
    const component = this.gameContentDirective.viewContainerRef.createComponent(FourTilesOneAnswerGameComponent);

    component.setInput('gameData', this.gameService.prepareGameData());
  }
}
