import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BlockDef } from 'src/app/models/datamodels';
import { EditBackgroundComponent } from '../edit-background/edit-background.component';
import { EditTransitionComponent } from '../edit-transition/edit-transition.component';

@Component({
  selector: 'app-edit-block-def',
  templateUrl: './edit-block-def.component.html',
  styleUrls: ['./edit-block-def.component.scss']
})
export class EditBlockDefComponent implements OnInit {

  @Input() blockDef: FormGroup;

  public static ConvertToFormGroup(blockDef: BlockDef): FormGroup {
    return new FormGroup({
      durationInMinutes: new FormControl(blockDef.durationInMinutes),
      background: EditBackgroundComponent.ConvertToFormGroup(blockDef.background),
      transition: EditTransitionComponent.ConvertToFormGroup(blockDef.transition)
    });
  }

  constructor() { }

  ngOnInit(): void {
  }

}
