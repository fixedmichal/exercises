import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { WriteRomajiQuestionData } from '../../models/write-romaji-question-data.type';
import { FormControl } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';
import { QuestionCommunicationService } from '../../services/question-communication.service';

@Component({
  selector: 'app-write-romaji-question',
  templateUrl: './write-romaji-question.component.html',
  styleUrls: ['./write-romaji-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WriteRomajiQuestionComponent implements OnInit, OnDestroy {
  @Input() readonly questionData: WriteRomajiQuestionData;
  answerControl = new FormControl('', { nonNullable: true });

  constructor(private questionCommunicationService: QuestionCommunicationService) {}

  ngOnInit(): void {
    this.setContinueButtonClickedCallback();

    this.answerControl.valueChanges.pipe(tap((value) => console.log(value))).subscribe();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  onContinueClick() {
    this.questionCommunicationService.sendAnswerText(this.answerControl.value);

    // if (this.answerControl.value === this.questionData.correctAnswerRomaji) {
    //   console.log('correct');
    // } else {
    //   console.log('false!');
    // }
  }

  setContinueButtonClickedCallback(): void {
    this.questionCommunicationService.continueButtonClicked$
      .pipe(
        tap(() => {
          this.onContinueClick();
        }),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe();
  }

  // setAnswerAssessedCallback(): void {
  //   this.questionCommunicationService.answerAssessedWriteRomaji$
  //     .pipe(
  //       tap((answerAssess) => {
  //         answerAssess.
  //       }),
  //       takeUntil(this.componentDestroyed$)
  //     )
  //     .subscribe();
  // }

  private componentDestroyed$ = new Subject<void>();
}
