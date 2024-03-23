import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appQuestionContent]',
})
export class QuestionContentDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
