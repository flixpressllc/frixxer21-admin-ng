import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tab-pane',
  templateUrl: './tab-pane.component.html',
  styleUrls: ['./tab-pane.component.scss']
})
export class TabPaneComponent implements OnInit {

  @Input() id: string;
  @ViewChild('contentTemplate') contentTemplate: TemplateRef<any>;

  constructor() { }

  ngOnInit(): void {
  }

}
