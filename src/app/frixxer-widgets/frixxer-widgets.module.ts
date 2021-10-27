import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginatorComponent } from './paginator/paginator.component';
import { PopupComponent } from './popups/popup/popup.component';
import { PopupClientInsertionDirective } from './popups/popup-client-insertion.directive';
import { PopupTogglerDirective } from './popups/popup-toggler.directive';
import { TabPaneComponent } from './tabbing/tab-pane/tab-pane.component';
import { TabsComponent } from './tabbing/tabs/tabs.component';



@NgModule({
  declarations: [PaginatorComponent, PopupComponent, PopupClientInsertionDirective, PopupTogglerDirective, TabPaneComponent, TabsComponent],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    PaginatorComponent,
    TabPaneComponent,
    TabsComponent
  ]
})
export class FrixxerWidgetsModule { }
