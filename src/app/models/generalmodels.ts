export interface Entity {
  id: string;
}

export interface ResultSet<T> {
  currentPage: number;
  pageSize: number;
  records: T[];
  totalRecordsCount: number;
  numPages: number;
}

export interface ListItem {
  id: string;
  name: string;
}

export interface SheetInfo {
  sheetId: number;
  title: string;
  index: number;
}

export interface SpreadsheetInfo {
  spreadSheetId: string;
  title: string;
  sheets: SheetInfo[];
}

export interface SaveResponse {
  id: string;
}
