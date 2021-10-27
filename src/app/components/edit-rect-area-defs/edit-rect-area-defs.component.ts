import { Component, Input, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { RectAreaDef } from 'src/app/models/datamodels';
import { EditRectAreaDefComponent } from '../edit-rect-area-def/edit-rect-area-def.component';

@Component({
  selector: 'app-edit-rect-area-defs',
  templateUrl: './edit-rect-area-defs.component.html',
  styleUrls: ['./edit-rect-area-defs.component.scss']
})
export class EditRectAreaDefsComponent implements OnInit {

  @Input() rectAreaDefs: FormArray;

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

}
