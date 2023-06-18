import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiRoutes } from '../../../../shared/routes/api.routes';
import { APP_ROUTES } from '../../../../shared/routes/app-routes';
import { DataService } from '../../../../shared/services/data.service';
import { memberSortOption } from "../members-config";

@Component({
	selector: 'app-member-list',
	templateUrl: './member-list.component.html',
	styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
	routes: any = APP_ROUTES;
	memberSortOption: any[] = memberSortOption;
	active: string = 'top';
	memberList: any[] = [];
	isLoading: boolean = true;
	payload: any = {
		page: 1,
		page_size: 10,
		search: "",
		ordering: "-created_on",		// user__first_name, created_on
		role_id: ""
	};
	collectionSize!: number;
	roles: any[] = [];

	constructor(private readonly ds: DataService, private readonly router: Router) { }

	ngOnInit(): void {
		this.getRoles();
	}

	openTab(tab: string): void {
		this.active = tab;
	}

	private getRoles(): void {
		this.ds.get(ApiRoutes.roles).subscribe({
			next: (res: any) => {
				this.roles = res
				this.getMemberList();
			},
			error: (err) => console.error(err),
			complete: () => { }
		});
	}

	private getMemberList(): void {
		this.isLoading = true;
		this.memberList = [];
		this.ds.get(this.ds.formUrlParam(ApiRoutes.memberList, this.payload)).subscribe({
			next: (res: any) => {
				this.collectionSize = res.count;
				if (res.count) {
					res.results = res.results.map((i: any) => {
						if (i.mini_bio && i.mini_bio.length > 80) {
							i.mini_bio = i.mini_bio.substring(0, 80) + '...';
						}
						if (i.role) {
							i.role_name = this.roles.find(k => k.id == i.role).name;
						}
						return i;
					})
					this.memberList = res.results;
				}
			},
			error: (err) => console.error(err),
			complete: () => { this.isLoading = false }
		});
	}

	pageChange(page: number): void {
		this.payload.page = page;
		this.getMemberList();
	}

	filter(key: string, data: any): void {
		this.payload[key] = data;
		this.payload.page = 1;
		this.getMemberList();
	}

	gotoInvite(): void {
		this.router.navigate([APP_ROUTES.memberInvite]);
	}
}