import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ResultSet, SheetInfo, SpreadsheetInfo } from '../models/generalmodels';
import { map } from 'rxjs/operators';


export class GoogleSheetUtils {
  public static GOOGLE_SHEETS_API_ROOT = 'https://sheets.googleapis.com/v4/spreadsheets/';
  public static GOOGLE_SHEETS_SPREADSHEET_ROOT = 'https://docs.google.com/spreadsheets/d/';

  private static resolveOptions(accessToken: string): any {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${accessToken}`
      })
    };
  }

  private static convertQueryResponseToObjectArray<T extends any>(
    queryResponse: string,
    convertQueryRowToItem: (queryRow: any) => T,
    startIndex = 0): T[] {

    const responseText = queryResponse.substring(queryResponse.indexOf('(') + 1, queryResponse.lastIndexOf(')'));
    const responseJson = JSON.parse(responseText);
    const queryRows = responseJson.table.rows;
    const entries: T[] = [];
    for (let i = startIndex; i < queryRows.length; i++) {
      const item = queryRows[i];
      entries.push(convertQueryRowToItem(item));
    }

    return entries;
  }

  private static extractCount(queryResponse: string): number {
    return this.convertQueryResponseToObjectArray<number>(queryResponse, (item: any) => {
      return parseInt(item.c[0].v, 10);
    }, 0)[0];
  }

  private static spreadPropertiesToArray<T extends any>(obj: T): any[] {
    const array: any[] = [];

    Object.keys(obj).forEach(key => {
      array.push(obj[key]);
    });

    return array;
  }

  private static simplifySpreadsheetInfo(spreadsheet: any): SpreadsheetInfo {
    const sheets: SheetInfo[] = spreadsheet.sheets.map((sheet) => {
      return {
        sheetId: sheet.properties.sheetId,
        title: sheet.properties.title,
        index: sheet.properties.index
      };
    });
    return {
      spreadSheetId: spreadsheet.id,
      title: spreadsheet.properties.title,
      sheets
    };
  }

  static async getSpreadsheetInfo(
    http: HttpClient,
    accessToken: string,
    spreadSheetId: string,
  ): Promise<SpreadsheetInfo> {
    return http.get(
      `${this.GOOGLE_SHEETS_API_ROOT}${spreadSheetId}`,
      this.resolveOptions(accessToken)
    ).pipe(
        map((data: any) => this.simplifySpreadsheetInfo(data))
      ).toPromise();
  }

  static async getCount(
    http: HttpClient,
    accessToken: string,
    spreadSheetId: string,
    sheetName = 'Sheet 1',
    whereClause = ''): Promise<number> {

    const options = this.resolveOptions(accessToken);
    options.responseType = 'text';
      // First, we'll need to count
    let countSql = `SELECT COUNT(A)`;
    if (whereClause.length > 0) {
      countSql = countSql + ` WHERE A <> '' AND ${whereClause}`;
    }
    const urlEncodedCountSql = encodeURIComponent(countSql);

    const countResponse = await http.get(
      `${this.GOOGLE_SHEETS_SPREADSHEET_ROOT}${spreadSheetId}/gviz/tq?tq=${urlEncodedCountSql}&sheet=${sheetName}`,
      options)
      .pipe(
        map((response: any) => response)
      ).toPromise();

    return this.extractCount(countResponse);
  }

  static async search<T extends any>(
    http: HttpClient,
    accessToken: string,
    spreadSheetId: string,
    sheetName = 'Sheet 1',
    projectionClause = '*',
    whereClause = '',
    orderingClause = '',
    page = 1,
    pageSize = 10,
    convertQueryRowToItem: (queryRow: any) => T
  ): Promise<ResultSet<T>> {

    const options = this.resolveOptions(accessToken);
    options.responseType = 'text';

    // First, we'll need to count
    const countResult = await this.getCount(http, accessToken, spreadSheetId, sheetName, whereClause);
    const skip = (page - 1) * pageSize;
    const fullWhereClause = whereClause.length > 0 ? `WHERE A <> '' AND ${whereClause}` : `WHERE A <> ''`;
    const fullOrderingClause = orderingClause.length > 0 ? `ORDER BY ${orderingClause}` : '';
    const sql = `SELECT ${projectionClause} ${fullWhereClause} ${fullOrderingClause} LIMIT ${pageSize} OFFSET ${skip} `;
    const urlEncodedSql = encodeURIComponent(sql);

    // Then get the results
    const array = await http.get(
      `${this.GOOGLE_SHEETS_SPREADSHEET_ROOT}${spreadSheetId}/gviz/tq?tq=${urlEncodedSql}&sheet=${sheetName}&range=A2:Z`,
      options)
      .pipe(
        map((response: any) => {
          return this.convertQueryResponseToObjectArray<T>(response, convertQueryRowToItem, 0);
        })
      ).toPromise();

    return {
      currentPage: page,
      pageSize,
      records: array,
      numPages: Math.ceil(countResult / pageSize),
      totalRecordsCount: countResult
    };
  }

  static async append<T extends any>(
    http: HttpClient,
    accessToken: string,
    spreadSheetId: string,
    sheetName = 'Sheet 1',
    newData: T,
    startColumn = 'A',
    endColumn: string
  ): Promise<any> {

    const body = {
      range: `${sheetName}!${startColumn}1:${endColumn}`,
      majorDimension: 'ROWS',
      values: [this.spreadPropertiesToArray(newData)]
    };

    return http.post(
      // tslint:disable-next-line:max-line-length
      `${this.GOOGLE_SHEETS_API_ROOT}${spreadSheetId}/values/${sheetName}!${startColumn}1:${endColumn}:append?valueInputOption=USER_ENTERED&includeValuesInResponse=true`,
      body,
      this.resolveOptions(accessToken))
      .pipe(
        map((data: any) => data)
      ).toPromise();
  }

  static async update<T extends any>(
    http: HttpClient,
    accessToken: string,
    spreadSheetId: string,
    sheetName = 'Sheet 1',
    newData: T,
    rowNumber: number,
    startColumn = 'A',
    endColumn: string
  ): Promise<any> {

    const body = {
      range: `${sheetName}!${startColumn}${rowNumber}:${endColumn}${rowNumber}`,
      majorDimension: 'ROWS',
      values: [this.spreadPropertiesToArray(newData)]
    };

    return http.put(
      `${this.GOOGLE_SHEETS_API_ROOT}${spreadSheetId}/values/${sheetName}!${startColumn}${rowNumber}:${endColumn}${rowNumber}?valueInputOption=USER_ENTERED`,
      body,
      this.resolveOptions(accessToken) )
      .pipe(
        map((data: any) => data)
      ).toPromise();
  }

  static async updateBulk<T extends any>(
    http: HttpClient,
    accessToken: string,
    spreadSheetId: string,
    sheetName = 'Sheet 1',
    newData: T,
    startColumn = 'A',
    endColumn: string
  ): Promise<any> {

    const count = await this.getCount(http, accessToken, spreadSheetId, sheetName, '');
    const values = [];
    for (let i = 0; i < count; i++) {
      values.push(this.spreadPropertiesToArray(newData));
    }
    const body = {
      range: `${sheetName}!${startColumn}2:${endColumn}`,
      majorDimension: 'ROWS',
      values
    };

    return http.put(
      `${this.GOOGLE_SHEETS_API_ROOT}${spreadSheetId}/values/${sheetName}!${startColumn}2:${endColumn}?valueInputOption=USER_ENTERED`,
      body,
      this.resolveOptions(accessToken) )
      .pipe(
        map((data: any) => data)
      ).toPromise();
  }

  static async clear(
    http: HttpClient,
    accessToken: string,
    spreadSheetId: string,
    sheetName = 'Sheet 1',
    rowNumber: number,
    startColumn: 'A',
    endColumn: string
  ): Promise<any> {
    return http.post(
      `${this.GOOGLE_SHEETS_API_ROOT}${spreadSheetId}/values/${sheetName}!${startColumn}${rowNumber}:${endColumn}${rowNumber}:clear`,
      null,
      this.resolveOptions(accessToken) )
      .pipe(
        map((data: any) => data)
      ).toPromise();
  }

  static async delete(
    http: HttpClient,
    accessToken: string,
    spreadSheetId: string,
    sheetId = 0,
    rowNumber: number
  ): Promise<any> {

    const body = {
      requests: [
        {
          deleteDimension: {
            range: {
              sheetId,
              dimension: 'ROWS',
              startIndex: rowNumber - 1,
              endIndex: rowNumber
            }
          }
        }
      ]
    };

    return http.post(
      `${this.GOOGLE_SHEETS_API_ROOT}${spreadSheetId}:batchUpdate`,
      body,
      this.resolveOptions(accessToken) )
      .pipe(
        map((data: any) => data)
      ).toPromise();
  }

  static async getByRowNumber<T extends any>(
    http: HttpClient,
    accessToken: string,
    spreadSheetId: string,
    sheetName = 'Sheet 1',
    rowNumber: number,
    rowNumberColumn: string,
    projectionClause = '*',
    convertQueryRowToItem: (queryRow: any) => T
  ): Promise<T> {
    const options = this.resolveOptions(accessToken);
    options.responseType = 'text';

    const sql = `SELECT ${projectionClause} WHERE ${rowNumberColumn} = ${rowNumber}`;
    const urlEncodedSql = encodeURIComponent(sql);

    const array = await http.get(
      `${this.GOOGLE_SHEETS_SPREADSHEET_ROOT}${spreadSheetId}/gviz/tq?tq=${urlEncodedSql}&sheet=${sheetName}`,
      options)
      .pipe(
        map((response: any) => {
          return this.convertQueryResponseToObjectArray<T>(response, convertQueryRowToItem);
        })
      ).toPromise();

    return array.length > 0 ? array[0] : null;
  }

  static async get<T extends any>(
    http: HttpClient,
    accessToken: string,
    spreadSheetId: string,
    sheetName = 'Sheet 1',
    projectionClause = '*',
    whereClause = '',
    convertQueryRowToItem: (queryRow: any) => T
  ): Promise<T> {
    const options = this.resolveOptions(accessToken);
    options.responseType = 'text';
    const fullWhereClause = whereClause.length > 0 ? `WHERE ${whereClause}` : '';
    const sql = `SELECT ${projectionClause} ${fullWhereClause}`;
    const urlEncodedSql = encodeURIComponent(sql);

    const array = await http.get(
      `${this.GOOGLE_SHEETS_SPREADSHEET_ROOT}${spreadSheetId}/gviz/tq?tq=${urlEncodedSql}&sheet=${sheetName}`,
      options)
      .pipe(
        map((response: any) => {
          return this.convertQueryResponseToObjectArray<T>(response, convertQueryRowToItem);
        })
      ).toPromise();

    return array.length > 0 ? array[0] : null;
  }

}
