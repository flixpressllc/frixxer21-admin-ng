import { Component, OnInit, ViewChild, ElementRef, AfterContentChecked,
  ChangeDetectorRef, AfterViewInit, Type, ComponentRef, ComponentFactoryResolver, TemplateRef, Renderer2 } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { PopupOptions } from '../popupoptions';
import { PopupClientInsertionDirective } from '../popup-client-insertion.directive';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit, AfterContentChecked, AfterViewInit {

  childComponentType: Type<any>;
  childComponentRef: ComponentRef<any>;

  absoluteCoordinates: { top: string, left: string };
  faTimes = faTimes;

  public identifier: string;

  requestCloseCallback: () => void;

  @ViewChild('popupElement') popupElement: ElementRef;
  @ViewChild(PopupClientInsertionDirective) insertionPoint: PopupClientInsertionDirective;
  @ViewChild('defaultHeadingTemplate', { read: TemplateRef }) defaultHeadingTemplate: TemplateRef<any>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private changeDetectorRef: ChangeDetectorRef,
    public options: PopupOptions,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();
    if (this.options.transitionDurationMs > 0) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'transition-duration', `${this.options.transitionDurationMs}ms`);
      setTimeout(() => {
        this.renderer.addClass(this.elementRef.nativeElement, 'open');
      }, 50);
    } else {
      this.renderer.addClass(this.elementRef.nativeElement, 'open');
    }

    if (this.options.dockReference === 'none') {
      this.absoluteCoordinates = this.options.coordinates || {
        top: '0px',
        left: '120px'
      };
    }
  }

  ngAfterViewInit(): void {
    this.loadChildComponent(this.childComponentType);
    this.changeDetectorRef.detectChanges();
  }

  loadChildComponent(childComponentType: Type<any>): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(childComponentType);

    const viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.childComponentRef = viewContainerRef.createComponent(componentFactory);
  }

  private handleViewportDockReference(): void {

    if (this.options.isModal || this.popupElement == null) {
      return;
    }

    const { height, width } = this.popupElement.nativeElement.getBoundingClientRect();
    let topToUse = `${(window.innerHeight - height + window.pageYOffset) / 2}px`;
    let leftToUse = `${(window.innerWidth - width + window.pageXOffset) / 2}px`;

    if (this.options.dockAnchor === 'top-left') {
      topToUse = `${this.options.dockPadding + window.pageYOffset}px`;
      leftToUse = `${this.options.dockPadding + window.pageXOffset}px`;
    } else if (this.options.dockAnchor === 'center-left') {
      leftToUse = `${this.options.dockPadding + window.pageXOffset}px`;
    } else if (this.options.dockAnchor === 'bottom-left') {
      topToUse = `${window.innerHeight - height - this.options.dockPadding + window.pageYOffset}px`;
      leftToUse = `${this.options.dockPadding + window.pageXOffset}px`;
    } else if (this.options.dockAnchor === 'top-center') {
      topToUse = `${this.options.dockPadding + window.pageYOffset}px`;
    } else if (this.options.dockAnchor === 'bottom-center') {
      topToUse = `${window.innerHeight - height - this.options.dockPadding + window.pageYOffset}px`;
    } else if (this.options.dockAnchor === 'top-right') {
      topToUse = `${this.options.dockPadding + window.pageYOffset}px`;
      leftToUse = `${window.innerWidth - width - this.options.dockPadding + window.pageXOffset}px`;
    } else if (this.options.dockAnchor === 'center-right') {
      leftToUse = `${window.innerWidth - width - this.options.dockPadding + window.pageXOffset}px`;
    } else if (this.options.dockAnchor === 'bottom-right') {
      topToUse = `${window.innerHeight - height - this.options.dockPadding + window.pageYOffset}px`;
      leftToUse = `${window.innerWidth - width - this.options.dockPadding + window.pageXOffset}px`;
    }

    this.absoluteCoordinates = {
      top: topToUse,
      left: leftToUse
    };
  }

  private ensureWithinViewportX(x: number, width: number): number {
    if (x < window.pageXOffset) {
      return window.pageXOffset;
    } else if (x + width > window.innerWidth + window.pageXOffset) {
      return window.innerWidth + window.pageXOffset - width;
    } else {
      return x;
    }
  }

  private ensureWithinViewportY(y: number, height: number): number {
    if (y < window.pageYOffset) {
      return window.pageYOffset;
    } else if (y + height > window.innerHeight + window.pageYOffset) {
      return window.innerHeight + window.pageYOffset - height;
    } else {
      return y;
    }
  }

  private handleHostDockReference(): void {

    if (this.options.isModal || this.popupElement == null) {
      return;
    }

    const { height, width } = this.popupElement.nativeElement.getBoundingClientRect();
    const { height: hostHeight, width: hostWidth, top: hostTop, left: hostLeft } = this.options.hostBoundingClientRect;

    /* The default is place the popup right below the host (bottom-center)
    */
    let topToUse = `${this.ensureWithinViewportY(hostTop + hostHeight + window.pageYOffset, height)}px`;
    let leftToUse = `${this.ensureWithinViewportX(hostLeft + window.pageXOffset, width)}px`;

    if (this.options.dockAnchor === 'top-left') {
      topToUse = `${this.ensureWithinViewportY(hostTop - height + window.pageYOffset, height)}px`;
      leftToUse = `${this.ensureWithinViewportX(hostLeft - width + window.pageXOffset, width)}px`;
    } else if (this.options.dockAnchor === 'center-left') {
      topToUse = `${this.ensureWithinViewportY(hostTop + window.pageYOffset, height)}px`;
      leftToUse = `${this.ensureWithinViewportX(hostLeft - width + window.pageXOffset, width)}px`;
    } else if (this.options.dockAnchor === 'bottom-left') {
      leftToUse = `${this.ensureWithinViewportX(hostLeft - width + window.pageXOffset, width)}px`;
    } else if (this.options.dockAnchor === 'top-center') {
      topToUse = `${this.ensureWithinViewportY(hostTop - height + window.pageYOffset, height)}px`;
    } else if (this.options.dockAnchor === 'top-right') {
      topToUse = `${this.ensureWithinViewportY(hostTop - height + window.pageYOffset, height)}px`;
      leftToUse = `${this.ensureWithinViewportX(hostLeft + hostWidth + window.pageXOffset, width)}px`;
    } else if (this.options.dockAnchor === 'center-right') {
      topToUse = `${this.ensureWithinViewportY(hostTop + window.pageYOffset, height)}px`;
      leftToUse = `${this.ensureWithinViewportX(hostLeft + hostWidth + window.pageXOffset, width)}px`;
    } else if (this.options.dockAnchor === 'bottom-right') {
      leftToUse = `${this.ensureWithinViewportY(hostLeft + hostWidth + window.pageXOffset, width)}px`;
    }

    this.absoluteCoordinates = {
      top: topToUse,
      left: leftToUse
    };
  }

  ngAfterContentChecked(): void {

    if (this.options.isModal) {
      return;
    }

    if (this.options.dockReference === 'viewport') {
      this.handleViewportDockReference();
    } else if (this.options.dockReference === 'host') {
      this.handleHostDockReference();
    }
  }

  requestClose = () => {
    if (this.requestCloseCallback) {
      if (this.options.transitionDurationMs > 0) {
        this.renderer.removeClass(this.elementRef.nativeElement, 'open');
        setTimeout(() => this.requestCloseCallback(), this.options.transitionDurationMs);
      } else {
        this.requestCloseCallback();
      }
    }
  }

  createHeadingTemplateContext(): any {
    return {
      $implicit: this.options.heading,
      close: this.requestClose
    };
  }
}
