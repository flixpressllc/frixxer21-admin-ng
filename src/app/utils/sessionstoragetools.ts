export class SessionStorageTools {
  public static storeObject<T extends any>(key: string, object: T): void {
    sessionStorage.setItem(key, JSON.stringify(object));
  }

  public static getObject<T extends any>(key: string): T {
    const itemAsString = sessionStorage.getItem(key);
    try {
      return JSON.parse(itemAsString) as T;
    } catch {
      return null;
    }
  }
}
