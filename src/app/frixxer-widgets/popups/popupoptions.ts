import { TemplateRef } from '@angular/core';

export type DockAnchor = 'top-left' | 'top-center' | 'top-right' |
  'center-left' | 'center' | 'center-right' |
  'bottom-left' | 'bottom-center' | 'bottom-right';

export type DockReference = 'none' | 'host' | 'viewport';

export class PopupOptions {

  constructor(public dockAnchor: DockAnchor = 'center',
              public dockReference: DockReference = 'none',
              public dockPadding: number = 20,
              public coordinates: { top: string, left: string } = { top: '0', left: '0' },
              public hostBoundingClientRect?: any,
              public isModal: boolean = true,
              public heading: string = '',
              public headingTemplate: TemplateRef<any> = null,
              public transitionDurationMs: number = 500) {
  }
}
