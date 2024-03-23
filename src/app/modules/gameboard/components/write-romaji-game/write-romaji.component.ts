import { Component, Input, OnInit } from '@angular/core';
import { GameCreatorService } from '../../services/game-creator.service';
import { WriteRomajiQuestionData } from '../../models/write-romaji-question-data.type';
import { FormControl } from '@angular/forms';
import { tap } from 'rxjs';
import { GameControllerService } from '../../services/game-controller.service';

@Component({
  selector: 'app-write-romaji',
  templateUrl: './write-romaji.component.html',
  styleUrls: ['./write-romaji.component.scss'],
})
export class WriteRomajiGameComponent implements OnInit {
  @Input() readonly questionData: WriteRomajiQuestionData;
  answerControl = new FormControl('', { nonNullable: true });

  constructor(private gameControllerService: GameControllerService) {}

  ngOnInit(): void {
    this.setContinueButtonClickedCallback();

    this.answerControl.valueChanges.pipe(tap((value) => console.log(value))).subscribe();
  }

  onContinueClick() {
    if (this.answerControl.value === this.questionData.correctAnswer) {
      console.log('correct');
    } else {
      console.log('false!');
    }
  }

  setContinueButtonClickedCallback(): void {
    this.gameControllerService.continueButtonClicked$
      .pipe(
        tap((value) => {
          console.log('>>>callback');
          this.onContinueClick();
        })
      )
      .subscribe();
  }
}
