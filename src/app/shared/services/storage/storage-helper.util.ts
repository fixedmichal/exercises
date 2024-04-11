export class StorageHelper {
  static getItem<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key) ?? '');
  }

  static setItem<T>(key: string, value: T): void {
    return localStorage.setItem(key, JSON.stringify(value));
  }
}
