import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { forkJoin, Observable, Subject } from 'rxjs';
import { saveAs } from '@progress/kendo-file-saver';

import { AuthService } from './auth.service';
import { LocalStorage } from './storage.service';

const CACHE_TIMEOUT = 3600;

@Injectable({
	providedIn: "root"
})

export class DataService {
	// ipConfig: any = null;
	state: any = new Map();
	load: boolean = false;
	countryId!: string | number;
	stateId!: string | number;
	stateEvent = new Subject<boolean>();
	stateEvent$ = this.stateEvent.asObservable();

	constructor(private readonly http: HttpClient, private readonly auth: AuthService, private readonly ls: LocalStorage) { }

	loadState(urls: string[]): Promise<any> {
		return new Promise((resolve, reject) => {
			this.forkJoin(urls).subscribe({
				next: (res) => {
					if (res.length) {
						this.state.set('ipConfig', res[0]);
						this.state.set('profileData', res[1]);
						this.ls.setItem('joy-state', JSON.stringify(Array.from(this.state.entries())));
						this.load = true;
						this.broadCastState(true);
						console.log("ds", this.state);
					}
					resolve(true);
				},
				error: (err) => {
					console.error(err)
					reject(false)
				},
				complete: () => { }
			});
		});
	}

	broadCastState(isStateUpdated: boolean): void {
		this.stateEvent.next(isStateUpdated);
	}

	public get(url: string): Observable<any> {
		return this.http.get<any>(url).pipe(
			map((data) => {
				return data;
			})
		);
	}

	public delete(url: string): Observable<any> {
		return this.http.delete<any>(url).pipe(
			map((data) => {
				return data;
			})
		);
	}

	public forkJoin(urls: string[]): Observable<any[]> {
		const response: any[] = [];
		for (let i = 0; i < urls.length; i++) {
			response.push(this.http.get(urls[i]));
		}
		return forkJoin(response);
	}

	public post(url: string, reqBody: any): Observable<any> {
		return this.http.post<any>(url, reqBody).pipe(
			map((data) => {
				return data;
			})
		);
	}

	public patch(url: string, reqBody: any): Observable<any> {
		return this.http.patch<any>(url, reqBody).pipe(
			map((data) => {
				return data;
			})
		);
	}

	public put(url: string, reqBody: any): Observable<any> {
		return this.http.put<any>(url, reqBody).pipe(
			map((data) => {
				return data;
			})
		);
	}

	public formUrlParam(url: string, data: any): string {
		let queryString: string = '';
		for (const key in data) {
			if (data.hasOwnProperty(key) && data[key]) {
				if (!queryString) {
					queryString = `?${key}=${data[key]}`;
				} else {
					queryString += `&${key}=${data[key]}`;
				}
			}
		}
		return url + queryString;
	}
	

	public downloadDocumentBlob(downLoadUrl: string, fileName: string, extension: string) {
		var HTTPOptions = {
			headers: new HttpHeaders({ Accept: 'application/json' }),
			observe: 'response' as 'body', // to display the full response & as 'body' for type cast
			responseType: 'blob' as 'json',
		};
		return this.http.get(downLoadUrl, HTTPOptions).pipe(
			map((res: any) => {
				var blob = new Blob([res.body], { type: 'application/json' });
				saveAs(blob, fileName + extension);
				return res;
			})
		);
	}
}