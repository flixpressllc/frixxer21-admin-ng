import {
  Injectable,
  Type,
  ComponentFactoryResolver,
  ApplicationRef,
  ComponentRef,
  EmbeddedViewRef,
  Injector,
} from '@angular/core';

import { PopupRef } from './popupref';
import { PopupComponent } from './popup/popup.component';
import { PopupOptions } from './popupoptions';
import { PopupInjector } from './popupinjector';

@Injectable()
export class PopupService {

  popupComponentRefArray: Array<ComponentRef<PopupComponent>>;

  private currentPopupIdentifierNumber = 1;

  constructor(
    private injector: Injector,
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef
  ) {
  }

  generateNextPopupIdentifier(): string {
    const identifier = `popup-${this.currentPopupIdentifierNumber}`;
    this.currentPopupIdentifierNumber++;
    return identifier;
  }

  private findComponentRef(popupIdentifier: string): ComponentRef<PopupComponent> {
    return this.popupComponentRefArray.find(pcr => pcr.instance.identifier === popupIdentifier);
  }

  private appendDialogComponentToBody(options: PopupOptions, popupStartData: any): PopupRef {
    const popupIdentifier = this.generateNextPopupIdentifier();
    const popupRef = new PopupRef();
    popupRef.identifier = popupIdentifier;

    const map = new WeakMap();
    map.set(PopupOptions, options);
    map.set(PopupRef, popupRef);

    const factory = this.componentFactoryResolver.resolveComponentFactory(PopupComponent);
    const injector = Injector.create({
      providers: [
        {
          provide: 'popup-start-data',
          useValue: popupStartData
        }
      ],
      parent: new PopupInjector(this.injector, map)
    });
    const popupComponentRef = factory.create(injector);

    popupComponentRef.instance.identifier = popupIdentifier;

    popupComponentRef.instance.requestCloseCallback = () => {
      this.close(popupIdentifier);
    };

    const onCloseSubscription = popupRef.onClose().subscribe(() => {
      this.findComponentRef(popupIdentifier).instance.requestClose();
      onCloseSubscription.unsubscribe();
    });

    if (this.popupComponentRefArray == null) {
      this.popupComponentRefArray = new Array<ComponentRef<PopupComponent>>();
    }

    this.popupComponentRefArray.push(popupComponentRef);

    this.applicationRef.attachView(popupComponentRef.hostView);

    const domElement = (popupComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElement);

    return popupRef;

  }

  open<C>(popupType: Type<C>, popupStartData: any, options: PopupOptions): PopupRef {
    const popupRef = this.appendDialogComponentToBody(options, popupStartData);

    // this.getTopComponentRef().instance.childComponentType = popupType;
    const dialogComponentRef = this.findComponentRef(popupRef.identifier);
    dialogComponentRef.instance.childComponentType = popupType;
    popupRef.popupComponentInstance = dialogComponentRef.instance;

    return popupRef;
  }

  close(popupIdentifier: string): void {
    const popupComponentRef = this.findComponentRef(popupIdentifier);
    this.applicationRef.detachView(popupComponentRef.hostView);
    popupComponentRef.destroy();

    const deleteIndex = this.popupComponentRefArray.indexOf(popupComponentRef);
    this.popupComponentRefArray.splice(deleteIndex, 1);
  }
}
