import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './paginator/paginator.component';
import { PopupComponent } from './popups/popup/popup.component';
import { PopupClientInsertionDirective } from './popups/popup-client-insertion.directive';
import { PopupTogglerDirective } from './popups/popup-toggler.directive';



@NgModule({
  declarations: [PaginatorComponent, PopupComponent, PopupClientInsertionDirective, PopupTogglerDirective],
  imports: [
    CommonModule
  ]
})
export class FrixxerWidgetsModule { }
