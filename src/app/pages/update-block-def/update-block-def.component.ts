import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FrixxerService } from '../../services/frixxer.service';
import { EditBlockDefEntityComponent } from '../../components/edit-block-def-entity/edit-block-def-entity.component';
import { AutoUnsubscribe } from '../../utils/autounsubscribe';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BlockDefEntity } from 'src/app/models/datamodels';

@Component({
  selector: 'app-update-block-def',
  templateUrl: './update-block-def.component.html',
  styleUrls: ['./update-block-def.component.scss']
})
@AutoUnsubscribe()
export class UpdateBlockDefComponent implements OnInit {

  blockDefEntityFormGroup: FormGroup;
  paramSubscription: Subscription;

  constructor(private frixxerService: FrixxerService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  async loadBlockDefEntity(id: string): Promise<void> {
    const blockDefEntity = await this.frixxerService.getBlockDefEntity(id);
    this.blockDefEntityFormGroup = EditBlockDefEntityComponent.ConvertToFormGroup(blockDefEntity);
  }

  ngOnInit(): void {
    this.paramSubscription = this.activatedRoute.paramMap.subscribe(async (params: ParamMap) => {
      const id = params.get('id');
      await this.loadBlockDefEntity(id);
    });
  }

  onSaveRequest(blockDefEntity: BlockDefEntity): void {
  }

}
