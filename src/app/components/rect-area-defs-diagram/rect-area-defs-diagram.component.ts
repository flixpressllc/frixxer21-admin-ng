import { AfterViewChecked, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList,
  Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-rect-area-defs-diagram',
  templateUrl: './rect-area-defs-diagram.component.html',
  styleUrls: ['./rect-area-defs-diagram.component.scss']
})
export class RectAreaDefsDiagramComponent implements OnInit, AfterViewChecked {
  @Input() rectAreaDefs: FormArray;
  @Output() rectAreaDefSelected: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() deleteRequest: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  @ViewChild('rectAreaDefsContainer') rectAreaDefsContainer: ElementRef;
  @ViewChildren('rectAreaDivs', { read: ElementRef}) rectAreaDivs: QueryList<ElementRef>;
  selectedRectAreaDef: FormGroup;
  scaleFactor: number;

  faTrash = faTrash;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {

    this.selectedRectAreaDef = this.rectAreaDefs.controls[0] as FormGroup;
    this.rectAreaDefSelected.emit(this.selectedRectAreaDef);
  }

  ngAfterViewChecked(): void {
    const { width } = this.rectAreaDefsContainer.nativeElement.getBoundingClientRect();
    /*
    console.log(`width: ${width}`);
    if (width === 0) {
      width = 1000;
    }
    */
    this.scaleFactor = 1600 / width;
    const height = 9 / 16 * width;
    this.renderer.setStyle(this.rectAreaDefsContainer.nativeElement, 'height', `${height}px`);

    let i = 0;
    this.rectAreaDivs.forEach(rectAreaDiv => {
      const { x, y, width: raWidth, height: raHeight} = (this.rectAreaDefs.controls[i] as FormGroup).value;
      this.renderer.setStyle(rectAreaDiv.nativeElement, 'height', `${raHeight / this.scaleFactor}px`);
      this.renderer.setStyle(rectAreaDiv.nativeElement, 'width', `${raWidth / this.scaleFactor}px`);
      this.renderer.setStyle(rectAreaDiv.nativeElement, 'left', `${x / this.scaleFactor}px`);
      this.renderer.setStyle(rectAreaDiv.nativeElement, 'top', `${y / this.scaleFactor}px`);

      if (this.selectedRectAreaDef != null) {
        if (this.rectAreaDefs.controls[i] === this.selectedRectAreaDef) {
          this.renderer.addClass(rectAreaDiv.nativeElement, 'selected');
        } else {
          this.renderer.removeClass(rectAreaDiv.nativeElement, 'selected');
        }
      }

      i++;
    });
  }

  selectRectAreaDef(rectAreaDef: FormGroup): void {
    this.selectedRectAreaDef = rectAreaDef;
    this.rectAreaDefSelected.emit(this.selectedRectAreaDef);
  }

  clickDeleteRequest(rectAreaDef: FormGroup): void {
    this.deleteRequest.emit(rectAreaDef);
  }
}
