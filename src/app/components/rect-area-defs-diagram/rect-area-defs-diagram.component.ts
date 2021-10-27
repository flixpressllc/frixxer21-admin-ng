import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList,
  Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { RectAreaDef } from '../../models/datamodels';

@Component({
  selector: 'app-rect-area-defs-diagram',
  templateUrl: './rect-area-defs-diagram.component.html',
  styleUrls: ['./rect-area-defs-diagram.component.scss']
})
export class RectAreaDefsDiagramComponent implements OnInit, AfterViewInit {
  @Input() rectAreaDefs: RectAreaDef[];
  @Output() rectAreaDefSelected: EventEmitter<RectAreaDef> = new EventEmitter<RectAreaDef>();

  @ViewChild('rectAreaDefsContainer') rectAreaDefsContainer: ElementRef;
  @ViewChildren('rectAreaDivs', { read: ElementRef}) rectAreaDivs: QueryList<ElementRef>;
  selectedRectAreaDef: RectAreaDef;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.selectedRectAreaDef = this.rectAreaDefs[0];
    this.rectAreaDefSelected.emit(this.selectedRectAreaDef);
  }

  ngAfterViewInit(): void {
    const { width } = this.rectAreaDefsContainer.nativeElement.getBoundingClientRect();
    const scaleFactor = 1600 / width;
    const height = 9 / 16 * width;
    this.renderer.setStyle(this.rectAreaDefsContainer.nativeElement, 'height', `${height}px`);

    let i = 0;
    this.rectAreaDivs.forEach(rectAreaDiv => {
      const { x, y, width: raWidth, height: raHeight} = this.rectAreaDefs[i];
      this.renderer.setStyle(rectAreaDiv.nativeElement, 'height', `${raHeight / scaleFactor}px`);
      this.renderer.setStyle(rectAreaDiv.nativeElement, 'width', `${raWidth / scaleFactor}px`);
      this.renderer.setStyle(rectAreaDiv.nativeElement, 'left', `${x / scaleFactor}px`);
      this.renderer.setStyle(rectAreaDiv.nativeElement, 'top', `${y / scaleFactor}px`);
      i++;
    });
  }

  selectRectAreaDef(rectAreaDef: RectAreaDef): void {
    this.selectedRectAreaDef = rectAreaDef;
    this.rectAreaDefSelected.emit(this.selectedRectAreaDef);
  }
}
