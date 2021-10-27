import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPopupClientInsertion]'
})
export class PopupClientInsertionDirective {

  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }

}
