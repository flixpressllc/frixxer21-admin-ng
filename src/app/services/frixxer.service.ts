import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoogleSheetUtils } from '../utils/googlesheetutils';
import { AuthService } from './auth.service';
import { ResultSet, ListItem } from '../models/generalmodels';
import { BlockDef, BlockDefEntity } from '../models/datamodels';

@Injectable({
  providedIn: 'root'
})
export class FrixxerService {
  private BLOCK_DEFINITIONS_SHEET_ID = '1gu745DCXyYqwlbE3fqy8878D9pNi0iu84xF35TWX06g';

  constructor(protected authService: AuthService,
              protected httpClient: HttpClient) { }

  searchBlockDefEntities(searchText: string, page: number, pageSize: number): Promise<ResultSet<ListItem>> {
    const projectionClause = 'A, B';
    const whereClause = '';
    const orderingClause = '';

    return GoogleSheetUtils.search(
      this.httpClient, this.authService.getToken(), this.BLOCK_DEFINITIONS_SHEET_ID, 'Sheet1',
      projectionClause, whereClause, orderingClause, page, pageSize,
      (item: any) => {
        const blockDefEntityFromSheets: ListItem = {
          id: item.c[0].v,
          name: item.c[1].v
        };
        return blockDefEntityFromSheets;
      });
  }

  getBlockDefEntity(id: string): Promise<BlockDefEntity> {
    const projectionClause = 'A, B, C';
    const whereClause = `A='${id}'`;

    return GoogleSheetUtils.get(
      this.httpClient, this.authService.getToken(), this.BLOCK_DEFINITIONS_SHEET_ID, 'Sheet1',
      projectionClause, whereClause,
      (item: any) => {
        const blockDefEntity: BlockDefEntity = {
          id: item.c[0].v,
          name: item.c[1].v,
          blockDef: JSON.parse(item.c[2].v) as BlockDef
        };
        return blockDefEntity;
      });
  }
}
