export class StorageHelper {
	static getItem<T>(key: string): T {
		console.log(localStorage.getItem(key));
		return JSON.parse(JSON.stringify(localStorage.getItem(key) ?? 'unknown'));
	}

	static setItem<T>(key: string, value: T): void {
		return localStorage.setItem(key, JSON.stringify(value));
	}
}