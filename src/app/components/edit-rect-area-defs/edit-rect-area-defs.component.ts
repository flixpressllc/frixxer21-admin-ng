import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { RectAreaDef } from 'src/app/models/datamodels';
import { EditRectAreaDefComponent } from '../edit-rect-area-def/edit-rect-area-def.component';

@Component({
  selector: 'app-edit-rect-area-defs',
  templateUrl: './edit-rect-area-defs.component.html',
  styleUrls: ['./edit-rect-area-defs.component.scss']
})
export class EditRectAreaDefsComponent implements OnInit {

  @Input() rectAreaDefs: FormArray;
  selectedRectAreaDef: FormGroup;

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

  onRectAreaDefSelected(rectAreaDef: RectAreaDef): void {
    console.log(`Rect Area Def: ${JSON.stringify(rectAreaDef)}`);
    this.selectedRectAreaDef = this.rectAreaDefs.controls.find(control =>
      (control as FormGroup).value.id === rectAreaDef.id
      ) as FormGroup;
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
    this.rectAreaDefs.push(EditRectAreaDefComponent.ConvertToFormGroup(newRectAreaDef));
  }

  onDeleteRequest(rectAreaDef: FormGroup): void {
    let index = 0;

    for (const currRectAreaDef of this.rectAreaDefs.controls) {
      if (currRectAreaDef.value.id === rectAreaDef.value.id) {
        break;
      }
      index++;
    }

    this.rectAreaDefs.removeAt(index);
  }
}