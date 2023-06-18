import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorage {

	constructor() { }

	public clear(): void {
		localStorage.clear();
	}

	public removeItem(key: string): void {
		localStorage.removeItem(key);
	}

	public setItem(key: string, data: string): void {
		localStorage.setItem(key, data);
	}

	public getItemString(key: string): string {
		return localStorage.getItem(key)!;
	}

	public getItem(key: string) {
		if (key === 'joy-token') {
			return localStorage.getItem(key);
		}
		return JSON.parse(localStorage.getItem(key)!);
	}
}
