import { Directive, ViewContainerRef, ElementRef } from '@angular/core';

@Directive({
  selector: '[chatHost]'
})
export class ChatDirective {

  constructor(
    public viewContainerRef: ViewContainerRef,
    public el: ElementRef
  ) { }

}
