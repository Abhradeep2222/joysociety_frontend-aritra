import { Component } from '@angular/core';

import { ApiRoutes } from './shared/routes/api.routes';
import { AuthService } from './shared/services/auth.service';
import { DataService } from './shared/services/data.service';
import { LocalStorage } from "./shared/services/storage.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent {
	// load: boolean = false;

	constructor(public ds: DataService, private readonly ls: LocalStorage, private readonly auth: AuthService) {
		const state: any = this.ls.getItem('joy-state');
		if (state?.length) {
			this.ds.state = new Map(state);
			this.ds.load = true;
			console.log("app", this.ds.state);
		} else {
			let urls: string[] = [];
			if (!this.auth.isAuthenticated()) {
				urls = [ApiRoutes.ipConfig];
			} else {
				urls = [ApiRoutes.ipConfig, ApiRoutes.profile];
			}
			this.ds.loadState(urls).then((res: boolean) => {});
		}
	}
}
// https://gold-robot-853320.postman.co/workspace/New-Team-Workspace~5dc534b4-436b-4dc3-ac12-33cd2c2df7a8/collection/23225105-50231058-9de7-42cc-815a-2658c292b995?action=share&creator=23225105&ctx=documentation