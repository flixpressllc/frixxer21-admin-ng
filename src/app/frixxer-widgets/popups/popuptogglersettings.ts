import { Type } from '@angular/core';
import { DockAnchor } from './popupoptions';

export interface PopupTogglerSettings {
  popupClass: Type<any>;
  popupStartData: any;
  dockAnchor: DockAnchor;
}
