import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appContentProjection]',
})
export class ContentProjectionDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
