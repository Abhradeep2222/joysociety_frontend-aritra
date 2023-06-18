import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

import { ApiRoutes } from '../../../../shared/routes/api.routes';
import { DataService } from '../../../../shared/services/data.service';

@Component({
	selector: 'app-event-invite',
	templateUrl: './event-invite.component.html',
	styleUrls: ['./event-invite.component.scss']
})
export class EventInviteComponent implements OnInit {
	@Input() data: any;
	payload: any = {
		page: 1,
		page_size: 5,
		search: "",
		ordering: "-created_on",		// user__first_name, created_on
		role_id: ""
	};
	collectionSize!: number;
	memberList: any[] = [];
	isLoading: boolean = false;
	roles: any[] = [];
	invite: number[] = []

	constructor(private readonly ds: DataService, private readonly spinner: NgxSpinnerService, private readonly activeModal: NgbActiveModal) { }

	ngOnInit(): void {
		this.getRoles();
		console.log(this.data)
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

	getMemberList(): void {
		this.isLoading = true;
		this.memberList = [];
		this.ds.get(this.ds.formUrlParam(ApiRoutes.memberList, this.payload)).subscribe({
			next: (res: any) => {
				this.collectionSize = res.count;
				if (res.count) {
					res.results = res.results.map((i: any) => {
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

	addInvites(id: number): void {
		if (!this.invite.includes(id)) {
			this.invite.push(id);
		} else {
			const index: number = this.invite.findIndex(i => i == id);
			if (index > -1) {
				this.invite.splice(index, 1);
			}
		}
	}
	
	sendInvite(): void {
		this.spinner.show();
		const payload: any = {
			users: this.invite,
			event: this.data.id
		};
		console.log(payload);
		this.ds.post(ApiRoutes.eventInvite, payload).subscribe({
			next: (res) => {
				console.log(res);
				if (res == 'success') {
					this.activeModal.close(true);
				}
				this.spinner.hide();
			},
			error: (err) => {
				console.log(err)
				this.spinner.hide();
			},
			complete: () => {}
		});
	}
}
