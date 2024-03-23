import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { QuestionContentDirective } from 'src/app/shared/directives/game-content.directive';
import { GameCreatorService } from '../../services/game-creator.service';
import { FourTilesOneAnswerGameComponent } from '../four-tiles-one-answer-game/four-tiles-one-answer.component';
import { Observable, interval, map, of, startWith, take, tap, timer } from 'rxjs';
import { WriteRomajiGameComponent } from '../write-romaji-game/write-romaji.component';
import { GameControllerService } from '../../services/game-controller.service';

@Component({
  selector: 'app-question-container',
  templateUrl: './question-container.component.html',
  styleUrls: ['./question-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameContainerComponent implements OnInit, DoCheck {
  @ViewChild(QuestionContentDirective, { static: true }) questionContentDirective: QuestionContentDirective;

  counter$ = of(100);
  isAnswerConfirmed = false;

  constructor(
    private gameService: GameCreatorService,
    private gameControllerService: GameControllerService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngDoCheck(): void {
    console.log('>>>CHECK');
  }

  ngOnInit(): void {
    // const component1 = this.questionContentDirective.viewContainerRef.createComponent(WriteRomajiGameComponent);
    const component2 = this.questionContentDirective.viewContainerRef.createComponent(FourTilesOneAnswerGameComponent);

    // component1.setInput('questionData', this.gameService.getWriteRomajiQuestionData());
    component2.setInput('gameData', this.gameService.prepareGameData());
  }

  onContinueClick(): void {
    //
    console.log('onContinueClick QUESTION CONTAINER');
    this.gameControllerService.sendContinueButonClicked(1);
    // this.isAnswerConfirmed = true;
  }

  onContinue2Click(): void {
    //
  }
}
