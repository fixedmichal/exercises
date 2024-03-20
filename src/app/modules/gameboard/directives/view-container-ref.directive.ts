import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: '[appGameContent]',
  standalone: true
})
export class VieContainerRefDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}