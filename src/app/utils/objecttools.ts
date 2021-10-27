import { ResultSet } from '../models/generalmodels';

export function easyDeepClone<T extends any>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}

export function createResultSet<T extends any, U extends any>(
  filteredArray: T[], page: number, pageSize, projector: (from: T) => U): ResultSet<U> {
    const start = (page - 1) * pageSize;
    const end = Math.min(start + pageSize, filteredArray.length);
    const filteredCount = filteredArray.length;
    const paginatedArray = filteredArray.slice(start, end);

    return {
      currentPage: page,
      pageSize,
      numPages: Math.ceil(filteredCount / pageSize),
      totalRecordsCount: filteredCount,
      // tslint:disable-next-line:arrow-return-shorthand
      records: paginatedArray.map<U>((item: T) => projector(item))
    };
  }

export function createGuid(): string {
  function p8(s = false): string {
     const p = (Math.random().toString(16) + '000000000').substr(2, 8);
     return s ? '-' + p.substr(0, 4) + '-' + p.substr(4, 4) : p;
  }

  return p8() + p8(true) + p8(true) + p8();
}
