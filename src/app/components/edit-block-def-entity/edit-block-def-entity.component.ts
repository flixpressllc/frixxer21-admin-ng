import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { TabItem } from '../../frixxer-widgets/tabbing/tabitem';
import { BlockDef, BlockDefEntity } from '../../models/datamodels';
import { EditBlockDefComponent } from '../edit-block-def/edit-block-def.component';
import { easyDeepClone } from '../../utils/objecttools';

@Component({
  selector: 'app-edit-block-def-entity',
  templateUrl: './edit-block-def-entity.component.html',
  styleUrls: ['./edit-block-def-entity.component.scss']
})
export class EditBlockDefEntityComponent implements OnInit {

  @Input() blockDefEntity: FormGroup;
  @Output() saveRequest: EventEmitter<BlockDefEntity> = new EventEmitter<BlockDefEntity>();
  tabItems: TabItem[];

  public static ConvertToFormGroup(blockDefEntity: BlockDefEntity): FormGroup {
    return new FormGroup({
      id: new FormControl(blockDefEntity.id),
      name: new FormControl(blockDefEntity.name),
      blockDef: EditBlockDefComponent.ConvertToFormGroup(blockDefEntity.blockDef),
      rowNumber: new FormControl(blockDefEntity.rowNumber)
    });
  }

  constructor() { }

  ngOnInit(): void {
    this.tabItems = [
      { id: 'basics', name: 'Basics', customTabData: {}},
      { id: 'background', name: 'Background', customTabData: {}},
      { id: 'transition', name: 'Transition', customTabData: {}},
      { id: 'rectareas', name: 'Rect Areas', customTabData: {}},
    ];
  }

  get backgroundFormGroup(): FormGroup {
    return (this.blockDefEntity.controls.blockDef as FormGroup).controls.background as FormGroup;
  }

  get transitionFormGroup(): FormGroup {
    return (this.blockDefEntity.controls.blockDef as FormGroup).controls.transition as FormGroup;
  }

  get durationInMinutesFormControl(): FormControl {
    return (this.blockDefEntity.controls.blockDef as FormGroup).controls.durationInMinutes as FormControl;
  }

  get rectAreaDefsFormArray(): FormArray {
    return (this.blockDefEntity.controls.blockDef as FormGroup).controls.rectAreaDefs as FormArray;
  }

  save(): void {
    const blockDefEntityToSave = easyDeepClone<BlockDefEntity>(this.blockDefEntity.value);
    this.saveRequest.emit(blockDefEntityToSave);
  }

}
