import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  HostListener,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { QuestionContentDirective } from 'src/app/shared/directives/game-content.directive';
import { Subject, map, of, switchMap, takeUntil, tap } from 'rxjs';
import { QuestionCommunicationService } from '../../services/question-communication.service';
import { QuizControllerService } from '../../services/quiz-controller.service';

@Component({
  selector: 'app-quiz-container',
  templateUrl: './quiz-container.component.html',
  styleUrls: ['./quiz-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizContainerComponent implements OnInit, DoCheck, OnDestroy {
  @ViewChild(QuestionContentDirective, { static: true }) questionContentDirective: QuestionContentDirective;

  counter$ = of(100);
  isAnswerConfirmed = false;
  isAnsweredCorrectly: boolean | null;
  currentQuestion$ = this.quizControllerService.currentQuestion$;

  constructor(
    private questionCommunicationService: QuestionCommunicationService,
    private quizControllerService: QuizControllerService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  @HostListener('document:keydown.enter')
  onKeydownHandler() {
    this.questionCommunicationService.sendContinueButonClicked();
  }

  ngDoCheck(): void {
    console.log(this.isAnswerConfirmed);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  ngOnInit(): void {
    this.quizControllerService.setupQuiz().pipe(takeUntil(this.componentDestroyed$)).subscribe();

    this.currentQuestion$
      .pipe(
        map((question) => {
          this.isAnswerConfirmed = false;
          console.log('&&&&&& NEXT Question');

          this.questionContentDirective.viewContainerRef.clear();
          let component = this.questionContentDirective.viewContainerRef.createComponent(question.component);
          component.setInput('questionData', question.data);
        }),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe();

    this.quizControllerService.sendGoToNextQuestion();

    this.questionCommunicationService.answerIndex$
      .pipe(
        tap(() => console.log('questionAnswerIndex  RECEIVED!!')),
        switchMap((answerResult) => this.quizControllerService.checkIfIsAnswerCorrect(answerResult)),
        tap((answerResult) => {
          if (answerResult.questionType === 'fourTiles') {
            this.isAnswerConfirmed = true;
            this.isAnsweredCorrectly = answerResult.isAnsweredCorrectly;
            console.log('sendQuestionAnswerAssessed');
            this.questionCommunicationService.sendAnswerAssessedFourTiles(answerResult);
          }
        }),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe();

    this.questionCommunicationService.answerText$
      .pipe(
        tap(() => console.log('questionAnswerIndex  RECEIVED!!')),
        switchMap((answerText) => this.quizControllerService.checkIfIsAnswerCorrect(answerText)),
        tap((answerResult) => {
          if (answerResult.questionType === 'writeRomaji') {
            console.log('setting isAnswerConfirmed to TRUE');

            this.isAnswerConfirmed = true;

            this.isAnsweredCorrectly = answerResult.isAnsweredCorrectly;
            console.log('sendQuestionAnswerAssessed');

            // I suppose it is unnecessary ??
            this.questionCommunicationService.sendAnswerAssessedWriteRomaji(answerResult);
          }
        }),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe();
  }

  onContinueClick(): void {
    this.questionCommunicationService.sendContinueButonClicked();
  }

  onContinue2Click(): void {
    //
    this.quizControllerService.sendGoToNextQuestion();
  }

  onNextClick(): void {
    this.quizControllerService.sendGoToNextQuestion();
  }

  private componentDestroyed$ = new Subject<void>();
}
