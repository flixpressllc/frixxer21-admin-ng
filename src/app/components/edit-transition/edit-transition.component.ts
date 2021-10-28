import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Transition } from '../../models/datamodels';

@Component({
  selector: 'app-edit-transition',
  templateUrl: './edit-transition.component.html',
  styleUrls: ['./edit-transition.component.scss']
})
export class EditTransitionComponent implements OnInit {

  @Input() transition: FormGroup;

  public static ConvertToFormGroup(transition: Transition): FormGroup {
    return new FormGroup({
      type: new FormControl(transition.type),
      imageUrl: new FormControl(transition.imageUrl),
      videoUrl: new FormControl(transition.videoUrl),
      swapAtTimeInMs: new FormControl(transition.swapAtTimeInMs),
      durationInMs: new FormControl(transition.durationInMs)
    });
  }

  constructor() { }

  ngOnInit(): void {
  }

}
