import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appGameContent]',
})
export class GameContentDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
