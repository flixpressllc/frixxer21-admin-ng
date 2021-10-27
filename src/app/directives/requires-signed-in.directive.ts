import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appRequiresSignedIn]'
})
export class RequiresSignedInDirective implements OnInit {
  isSignedInChangedSubscription: Subscription;
  notSignedInRef: TemplateRef<any>;

  constructor(private templateRef: TemplateRef<any>,
              private viewContainerRef: ViewContainerRef,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isSignedInChangedSubscription = this.authService.isSignedInChanged$().subscribe((isSignedIn: boolean) => {
      this.viewContainerRef.clear();
      if (isSignedIn) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        if (this.notSignedInRef != null) {
          this.viewContainerRef.createEmbeddedView(this.notSignedInRef);
        }
      }
    });
  }

  @Input() set appRequiresSignedIn(condition: boolean | '') {
  }

  @Input() set appRequiresSignedInElse(notSignedInRef: TemplateRef<any>) {
    this.notSignedInRef = notSignedInRef;
  }
}
