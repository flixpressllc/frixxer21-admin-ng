import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { PopupRef } from './popupref';
import { PopupTogglerSettings } from './popuptogglersettings';
import { PopupService } from './popup.service';
import { PopupOptions } from './popupoptions';

@Directive({
  selector: '[appPopupToggler]'
})
export class PopupTogglerDirective {

  @Input('appPopupToggler') popupTogglerSettings: PopupTogglerSettings;
  @Output() popupClosingWithResult: EventEmitter<any> = new EventEmitter<any>();

  isPopupShowing: boolean;
  private popupRef: PopupRef;

  constructor(
    private elementRef: ElementRef,
    private popupService: PopupService
  ) { }

  @HostListener('click')
  click(): void {
    if (!this.isPopupShowing) {
      this.popupRef = this.popupService.open(this.popupTogglerSettings.popupClass,
        this.popupTogglerSettings.popupStartData,
        new PopupOptions(this.popupTogglerSettings.dockAnchor, 'host', 0, null,
          this.elementRef.nativeElement.getBoundingClientRect()));

      this.isPopupShowing = true;

      const popupSubscription = this.popupRef.onClose().subscribe((popupResult: any) => {

        if (popupResult != null) {
          this.popupClosingWithResult.emit(popupResult);
        }

        this.isPopupShowing = false;
        popupSubscription.unsubscribe();
      });

    } else {
      if (this.popupRef != null) {
        this.popupRef.close();
        this.isPopupShowing = false;
      }
    }
  }
}
