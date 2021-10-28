import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { RectAreaDef } from 'src/app/models/datamodels';
import { EditRectAreaDefComponent } from '../edit-rect-area-def/edit-rect-area-def.component';
import { RectAreaDefsDiagramComponent } from '../rect-area-defs-diagram/rect-area-defs-diagram.component';

@Component({
  selector: 'app-edit-rect-area-defs',
  templateUrl: './edit-rect-area-defs.component.html',
  styleUrls: ['./edit-rect-area-defs.component.scss']
})
export class EditRectAreaDefsComponent implements OnInit {

  @Input() rectAreaDefs: FormArray;
  selectedRectAreaDef: FormGroup;

  @ViewChild('rectAreaDefsDiagram', { read: RectAreaDefsDiagramComponent}) rectAreaDefsDiagram: RectAreaDefsDiagramComponent;

  public static ConvertToFormArray(rectAreaDefs: RectAreaDef[]): FormArray {
    const formArray = new FormArray([]);

    rectAreaDefs.forEach(rectAreaDef => {
      formArray.push(EditRectAreaDefComponent.ConvertToFormGroup(rectAreaDef));
    });

    return formArray;
  }

  constructor() { }

  ngOnInit(): void {
  }

  onRectAreaDefSelected(rectAreaDef: FormGroup): void {
    this.selectedRectAreaDef = rectAreaDef;
  }

  addRectArea(): void {
    const newRectAreaDef: RectAreaDef = {
      height: 500,
      width: 500,
      id: 'new-rect-area',
      renderingComponentType: 'multi',
      x: 0,
      y: 0,
    };
    const rectAreaDefFormGroup = EditRectAreaDefComponent.ConvertToFormGroup(newRectAreaDef);
    this.rectAreaDefs.push(rectAreaDefFormGroup);
    this.rectAreaDefsDiagram.selectRectAreaDef(rectAreaDefFormGroup);
  }

  onDeleteRequest(rectAreaDef: FormGroup): void {
    let index = 0;

    for (const currRectAreaDef of this.rectAreaDefs.controls) {
      if (currRectAreaDef === rectAreaDef) {
        if (rectAreaDef === this.selectedRectAreaDef) {
          this.selectedRectAreaDef = null;
        }
        break;
      }
      index++;
    }

    this.rectAreaDefs.removeAt(index);
  }
}
