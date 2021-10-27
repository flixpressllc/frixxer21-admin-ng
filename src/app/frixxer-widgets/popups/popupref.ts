import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { PopupComponent } from './popup/popup.component';

@Injectable()
export class PopupRef {

  public isOpen: boolean;
  public popupComponentInstance: PopupComponent;
  private onCloseRequest$: Subject<any | void>;
  private onOpenRequest$: Subject<void>;

  public identifier: string;

  constructor() {
    this.onCloseRequest$ = new Subject<any | void>();

    this.onOpenRequest$ = new Subject<void>();
  }

  open(): void {
    this.onOpenRequest$.next(null);
    this.isOpen = true;
  }

  close(data?: any): void {
    if (data) {
      this.onCloseRequest$.next(data);
    } else {
      this.onCloseRequest$.next(null);
    }

    this.isOpen = false;
  }

  onClose(): Observable<any | void> {
    return this.onCloseRequest$;
  }

  onOpen(): Observable<void> {
    return this.onOpenRequest$;
  }
}
