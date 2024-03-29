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
import {
  Subject,
  concatMap,
  delay,
  exhaust,
  exhaustMap,
  filter,
  first,
  map,
  mergeMap,
  of,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';
import { QuestionCommunicationService } from '../../services/question-communication.service';
import { QuizControllerService } from '../../services/quiz-controller.service';
import {
  FourTilesQuestionResultData,
  WriteRomajiQuestionResultData,
} from 'src/app/shared/models/question-answer-result-data.type';

@Component({
  selector: 'app-quiz-container',
  templateUrl: './quiz-container.component.html',
  styleUrls: ['./quiz-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizContainerComponent implements OnInit, DoCheck, OnDestroy {
  @ViewChild(QuestionContentDirective, { static: true }) questionContentDirective: QuestionContentDirective;
  private enterKeyDownEvent = new Subject<void>();
  // unused so far
  counter$ = of(100);

  answerResultWriteRomaji: WriteRomajiQuestionResultData | null;
  answerResultFourTiles: FourTilesQuestionResultData | null;

  isAnswerConfirmed = false;
  isAnsweredCorrectly: boolean | null;

  currentQuestion$ = this.quizControllerService.currentQuestion$;
  isContinueButtonDisabled$ = this.questionCommunicationService.isContinueButtonDisabled$.pipe();

  constructor(
    private questionCommunicationService: QuestionCommunicationService,
    private quizControllerService: QuizControllerService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  @HostListener('document:keydown.enter')
  onKeydownHandler() {
    this.enterKeyDownEvent.next();
  }

  ngDoCheck(): void {
    // console.log(this.isAnswerConfirmed);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  ngOnInit(): void {
    this.enterKeyDownEvent
      .asObservable()
      .pipe(
        tap(() => console.log('keydown SUBJECT')),
        withLatestFrom(this.isContinueButtonDisabled$),
        tap((x) => console.log('isContinueButtonDisabled$', x)),

        filter(([_, isDisabled]) => !isDisabled),
        tap(() => {
          console.log('ENTER PRESSED');
          this.isAnswerConfirmed ? this.onContinueSecondClick() : this.onContinueClick();
          this.cdr.markForCheck();
        }),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe();

    this.quizControllerService.setupQuiz().pipe(takeUntil(this.componentDestroyed$)).subscribe();
    this.setupCurrentQuestionCallback();
    this.setupFourTilesQuestionAnsweredCallback();
    this.setupWriteRomajiQuestionAnsweredCallback();

    this.quizControllerService.sendGoToNextQuestion();
  }

  onContinueClick(): void {
    this.questionCommunicationService.sendContinueButtonClicked();
  }

  onContinueSecondClick(): void {
    this.quizControllerService.sendGoToNextQuestion();
  }

  private setupCurrentQuestionCallback(): void {
    this.currentQuestion$
      .pipe(
        map((question) => {
          this.answerResultWriteRomaji = null;
          this.answerResultFourTiles = null;
          this.isAnsweredCorrectly = null;

          this.isAnswerConfirmed = false;

          this.questionContentDirective.viewContainerRef.clear();
          let component = this.questionContentDirective.viewContainerRef.createComponent(question.component);
          component.setInput('questionData', question.data);

          this.questionCommunicationService.sendIsContinueButtonDisabled(true);
        }),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe();
  }

  private setupFourTilesQuestionAnsweredCallback(): void {
    this.questionCommunicationService.fourTilesQuestionAnswered$
      .pipe(
        switchMap((answerResult) => this.quizControllerService.checkIfIsAnswerCorrect(answerResult)),
        tap((answerResult) => {
          if (answerResult.questionType === 'fourTiles') {
            this.isAnswerConfirmed = true;
            this.answerResultFourTiles = answerResult;
            console.log(answerResult);

            this.isAnsweredCorrectly = answerResult.isAnsweredCorrectly;
            this.questionCommunicationService.sendAnswerAssessedFourTiles(answerResult);
          }
        }),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe();
  }

  private setupWriteRomajiQuestionAnsweredCallback(): void {
    this.questionCommunicationService.writeRomajiQuestionAnswered$
      .pipe(
        switchMap((answerText) => this.quizControllerService.checkIfIsAnswerCorrect(answerText)),
        tap((answerResult) => {
          if (answerResult.questionType === 'writeRomaji') {
            this.isAnswerConfirmed = true;
            this.answerResultWriteRomaji = answerResult;
            console.log(answerResult);

            this.isAnsweredCorrectly = answerResult.isAnsweredCorrectly;
            this.cdr.markForCheck();
            // It is probably not necessary?
            this.questionCommunicationService.sendAnswerAssessedWriteRomaji(answerResult);
          }
        }),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe();
  }

  private componentDestroyed$ = new Subject<void>();
}
