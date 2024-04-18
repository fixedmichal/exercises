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
import { Subject, filter, map, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs';
import { QuestionCommunicationService } from '../../services/question-communication.service';
import { QuizControllerService } from '../../services/quiz-controller.service';
import {
  FourTilesQuestionResultData,
  WriteRomajiQuestionResultData,
} from 'src/app/shared/models/question-answer-result-data.type';
import { ContentProjectionDirective } from 'src/app/shared/directives/content-projection.directive';
import { AppRoutes } from 'src/app/app-routes.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-container',
  templateUrl: './quiz-container.component.html',
  styleUrls: ['./quiz-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizContainerComponent implements OnInit, OnDestroy {
  @ViewChild(ContentProjectionDirective, { static: true }) questionContentDirective: ContentProjectionDirective;

  private enterKeydown$ = new Subject<void>();
  private componentDestroyed$ = new Subject<void>();

  quizScore$ = this.quizControllerService.quizScore$;
  answerResult: WriteRomajiQuestionResultData | FourTilesQuestionResultData | null;

  isAnswerConfirmed = false;
  isAnsweredCorrectly: boolean | null = null;

  currentQuestion$ = this.quizControllerService.currentQuestion$;
  isContinueButtonDisabled$ = this.questionCommunicationService.isContinueButtonDisabled$;

  constructor(
    private router: Router,
    private questionCommunicationService: QuestionCommunicationService,
    private quizControllerService: QuizControllerService,
    private cdr: ChangeDetectorRef
  ) {}

  @HostListener('document:keydown.enter')
  onEnterKeydownHandler() {
    this.enterKeydown$.next();
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

  onCancelClick(): void {
    this.router.navigate([AppRoutes.Dashboard]);
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
        takeUntil(this.componentDestroyed$)
      )
      .subscribe();
  }

  private setupFourTilesQuestionAnsweredCallback(): void {
    this.questionCommunicationService.fourTilesQuestionAnswered$
      .pipe(
        switchMap((answer) => this.quizControllerService.checkIfIsAnswerCorrect(answer)),
        tap((answerResult) => {
          this.isAnswerConfirmed = true;
          this.answerResult = answerResult;

          this.isAnsweredCorrectly = answerResult.isAnsweredCorrectly;
          this.questionCommunicationService.sendAnswerAssessedFourTiles(answerResult);
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
          this.isAnswerConfirmed = true;
          this.answerResult = answerResult;
          this.isAnsweredCorrectly = answerResult.isAnsweredCorrectly;
          this.cdr.markForCheck();
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
    this.answerResult = null;
    this.isAnsweredCorrectly = null;

    this.isAnswerConfirmed = false;
  }
}
