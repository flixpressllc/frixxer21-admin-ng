import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EditBlockDefEntityComponent } from 'src/app/components/edit-block-def-entity/edit-block-def-entity.component';
import { BlockDefEntity } from 'src/app/models/datamodels';
import { FrixxerService } from 'src/app/services/frixxer.service';
import { createGuid } from 'src/app/utils/objecttools';

@Component({
  selector: 'app-create-block-def',
  templateUrl: './create-block-def.component.html',
  styleUrls: ['./create-block-def.component.scss']
})
export class CreateBlockDefComponent implements OnInit {

  blockDefEntityFormGroup: FormGroup;

  constructor(private frixxerService: FrixxerService,
              private router: Router) { }

  ngOnInit(): void {
    this.fillBlockDefEntityFormGroup();
  }

  private fillBlockDefEntityFormGroup(): void {
    const blockDefEntity: BlockDefEntity = {
      id: createGuid(),
      name: 'New Block Def',
      blockDef: {
        background: {
          type: 'image',
          url: ''
        },
        transition: {
          type: 'image',
          durationInMs: 1000,
          imageUrl: '',
          videoUrl: '',
          swapAtTimeInMs: 500
        },
        durationInMinutes: 2,
        rectAreaDefs: []
      },
      rowNumber: 0
    };
    this.blockDefEntityFormGroup = EditBlockDefEntityComponent.ConvertToFormGroup(blockDefEntity);
  }

  async onSaveRequest(blockDefEntity: BlockDefEntity): Promise<void> {
    try {
      await this.frixxerService.postBlockDefEntity(blockDefEntity);
      this.router.navigate(['blockdefs']);
    } catch {
      // ?
    }
  }

}
