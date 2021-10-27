import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Background } from '../../models/datamodels';

@Component({
  selector: 'app-edit-background',
  templateUrl: './edit-background.component.html',
  styleUrls: ['./edit-background.component.scss']
})
export class EditBackgroundComponent implements OnInit {

  @Input() background: FormGroup;

  constructor() { }

  public static ConvertToFormGroup(background: Background): FormGroup {
    return new FormGroup({
      type: new FormControl(background.type),
      url: new FormControl(background.url)
    });
  }

  ngOnInit(): void {
  }

}
