import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[contactHost]'
})
export class ContactDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
