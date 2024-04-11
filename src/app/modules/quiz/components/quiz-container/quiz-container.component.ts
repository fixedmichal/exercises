import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subject, filter, finalize, map, of, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs';
import { QuestionCommunicationService } from '../../services/question-communication.service';
import { QuizControllerService } from '../../services/quiz-controller.service';
import {
  FourTilesQuestionResultData,
  WriteRomajiQuestionResultData,
} from 'src/app/shared/models/question-answer-result-data.type';
import { QuestionType } from 'src/app/shared/models/question-type.enum';
import { ContentProjectionDirective } from 'src/app/shared/directives/content-projection.directive';

@Component({
  selector: 'app-quiz-container',
  templateUrl: './quiz-container.component.html',
  styleUrls: ['./quiz-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizContainerComponent implements OnInit, DoCheck, OnDestroy {
  @ViewChild(ContentProjectionDirective, { static: true }) questionContentDirective: ContentProjectionDirective;
  private enterKeydown$ = new Subject<void>();
  private componentDestroyed$ = new Subject<void>();

  // unused so far
  counter$ = of(100);

  quizScore$ = this.quizControllerService.quizScore$.pipe(tap((x) => console.log('>>>>>>>>>>>>>> EMIT QUIZSCORE$', x)));

  answerResultWriteRomaji: WriteRomajiQuestionResultData | null; // there will be more and more of this
  answerResultFourTiles: FourTilesQuestionResultData | null;

  isAnswerConfirmed = false;
  isAnsweredCorrectly: boolean | null;

  currentQuestion$ = this.quizControllerService.currentQuestion$;
  isContinueButtonDisabled$ = this.questionCommunicationService.isContinueButtonDisabled$;

  constructor(
    private questionCommunicationService: QuestionCommunicationService,
    private quizControllerService: QuizControllerService,
    private cdr: ChangeDetectorRef
  ) {}

  @HostListener('document:keydown.enter')
  onEnterKeydownHandler() {
    this.enterKeydown$.next();
  }

  ngDoCheck(): void {
    // console.log(this.isAnswerConfirmed);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  ngOnInit(): void {
    this.quizControllerService.setupQuizAndGetPlayerScores().pipe(takeUntil(this.componentDestroyed$)).subscribe();

    this.setupCurrentQuestionCallback();

    this.setupFourTilesQuestionAnsweredCallback();
    this.setupWriteRomajiQuestionAnsweredCallback();

    this.setupEnterKeyDownCallback();

    this.quizControllerService.sendGoToNextQuestion();
  }

  onContinueFirstClick(): void {
    this.questionCommunicationService.sendContinueButtonClicked();
  }

  onContinueSecondClick(): void {
    this.quizControllerService.sendGoToNextQuestion();
  }

  private setupCurrentQuestionCallback(): void {
    this.currentQuestion$
      .pipe(
        map((question) => {
          this.cleanupAnswerDataFields();

          this.questionContentDirective.viewContainerRef.clear();
          let component = this.questionContentDirective.viewContainerRef.createComponent(question.component);
          component.setInput('questionData', question.data);

          this.questionCommunicationService.sendIsContinueButtonDisabled(true);
        }),
        finalize(() => {
          console.log('FINALIZED setupCurrentQuestionCallback FINALIZED!!!!!!');
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
          if (answerResult.questionType === QuestionType.FourTiles) {
            this.isAnswerConfirmed = true;
            this.answerResultFourTiles = answerResult;

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
          if (answerResult.questionType === QuestionType.WriteRomaji) {
            this.isAnswerConfirmed = true;
            this.answerResultWriteRomaji = answerResult;
            console.log(answerResult);

            this.isAnsweredCorrectly = answerResult.isAnsweredCorrectly;
            this.cdr.markForCheck();

            // TODO: It is probably not necessary?
            this.questionCommunicationService.sendAnswerAssessedWriteRomaji(answerResult);
          }
        }),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe();
  }

  private setupEnterKeyDownCallback(): void {
    this.enterKeydown$
      .asObservable()
      .pipe(
        withLatestFrom(this.isContinueButtonDisabled$),
        filter(([_, isDisabled]) => !isDisabled),
        tap(() => {
          this.isAnswerConfirmed ? this.onContinueSecondClick() : this.onContinueFirstClick();
          this.cdr.markForCheck();
        }),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe();
  }

  private cleanupAnswerDataFields(): void {
    this.answerResultWriteRomaji = null;
    this.answerResultFourTiles = null;
    this.isAnsweredCorrectly = null;

    this.isAnswerConfirmed = false;
  }
}
