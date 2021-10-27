import { Injectable, Type, TemplateRef } from '@angular/core';
import { PopupService } from '../popups/popup.service';
import { PopupOptions } from '../popups/popupoptions';
import { PopupRef } from '../popups/popupref';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private popupService: PopupService
  ) { }

  open<C>(popupType: Type<C>, heading: string, popupStartData: any, headingTemplate?: TemplateRef<any>,
          options?: PopupOptions, transitionDurationMs: number = 0): PopupRef {
    options = (options != null) ? options :
      new PopupOptions('center', 'viewport', null, null, null, true, heading);

    options.transitionDurationMs = transitionDurationMs;

    if (headingTemplate != null) {
      options.headingTemplate = headingTemplate;
    }

    return this.popupService.open(popupType, popupStartData, options);
  }
}
