import { Component, AfterContentInit, Input, TemplateRef, ContentChildren, QueryList,
  ChangeDetectorRef } from '@angular/core';
import { TabItem } from '../tabitem';
import { TabPaneComponent } from '../tab-pane/tab-pane.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements AfterContentInit {

  selectedTabItem: TabItem;

  @Input() tabItems: Array<TabItem>;

  @ContentChildren(TabPaneComponent) tabPanesQueryList: QueryList<TabPaneComponent>;
  private allTabPaneComponents: Array<TabPaneComponent>;

  selectedTabPaneTemplate: TemplateRef<any>;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngAfterContentInit(): void {
    if (this.allTabPaneComponents == null) {
      this.allTabPaneComponents = new Array<TabPaneComponent>();
    }

    this.tabPanesQueryList.forEach(tabPane => {
      this.allTabPaneComponents.push(tabPane);
    });

    setTimeout(() => {
      if ((this.selectedTabItem == null) && (this.tabItems.length > 0)) {
        this.selectTab(this.tabItems[0]);
      }
    }, 10);

  }

  selectTab = (tabItem: TabItem) => {
    this.selectedTabItem = tabItem;

    if (this.allTabPaneComponents != null) {
      const tabPane = this.allTabPaneComponents.find(tp => tp.id === tabItem.id);
      if (tabPane.contentTemplate == null) {
        console.log(`tab pane contentTemplate is null`);
      }
      if (tabPane != null) {
        this.selectedTabPaneTemplate = tabPane.contentTemplate;
      }
    }
  }
}
