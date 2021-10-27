import { Component, OnInit } from '@angular/core';
import { ListItem, ResultSet } from '../../models/generalmodels';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FrixxerService } from '../../services/frixxer.service';

@Component({
  selector: 'app-block-defs',
  templateUrl: './block-defs.component.html',
  styleUrls: ['./block-defs.component.scss']
})
export class BlockDefsComponent implements OnInit {
  results: ResultSet<ListItem> = null;
  faEdit = faEdit;

  constructor(private frixxerService: FrixxerService) { }

  async ngOnInit(): Promise<void> {
    try {
      await this.loadResults(1, 10);
    } catch {
      // ?
    }
  }

  async loadResults(page: number, pageSize: number): Promise<void> {
    this.results = await this.frixxerService.searchBlockDefEntities('', page, pageSize);
  }

  async onPageChanged(page: number): Promise<void> {
    await this.loadResults(page, 3);
  }

}
