import { Component, Input, OnInit } from '@angular/core';

import { AuthService } from "../../../shared/services/auth.service";
import { APP_ROUTES } from "../../../shared/routes/app-routes";

interface IProfileParentDd {
	parent: string,
	children: IProfileChildrenDd[]
}

interface IProfileChildrenDd {
	label: string,
	path: string
}

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
	dropdown: IProfileParentDd[] = [];
	routes: any = APP_ROUTES;
	@Input() data: any;

	constructor(private readonly auth: AuthService) { }

	ngOnInit(): void {
		this.dropdown = [
			
			{
				parent: "Your Network",
				children: [
					{ label: "Scheduled Posts", path: APP_ROUTES.dashboard },
				]
			}
		]
	}

	logout(): void {
		this.auth.logout();
	}



}
