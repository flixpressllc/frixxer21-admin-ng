import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RectAreaDef } from '../../models/datamodels';

@Component({
  selector: 'app-edit-rect-area-def',
  templateUrl: './edit-rect-area-def.component.html',
  styleUrls: ['./edit-rect-area-def.component.scss']
})
export class EditRectAreaDefComponent implements OnInit {

  @Input() rectAreaDef: FormGroup;

  public static ConvertToFormGroup(rectAreaDef: RectAreaDef): FormGroup {
    return new FormGroup({
      id: new FormControl(rectAreaDef.id, [Validators.required]),
      renderingComponentType: new FormControl(rectAreaDef.renderingComponentType),
      x: new FormControl(rectAreaDef.x),
      y: new FormControl(rectAreaDef.y),
      z: new FormControl(rectAreaDef.z),
      width: new FormControl(rectAreaDef.width),
      height: new FormControl(rectAreaDef.height)
    });
  }

  constructor() { }

  ngOnInit(): void {
  }

}
