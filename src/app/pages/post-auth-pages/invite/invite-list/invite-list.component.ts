import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DatatableComponent, TableColumn } from '@swimlane/ngx-datatable';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { columns } from "../invite.config";
import { DataService } from '../../../../shared/services/data.service';
import { ApiRoutes } from '../../../../shared/routes/api.routes';
import { MemberInviteComponent } from "../../members/member-invite/member-invite.component";
import { InfoPopupComponent } from "../../../../shared/components/popups/info-popup/info-popup.component";
import { APP_ROUTES } from 'src/app/shared/routes/app-routes';

@Component({
	selector: 'app-invite-list',
	templateUrl: './invite-list.component.html',
	styleUrls: ['./invite-list.component.scss'],
	providers: [
		MemberInviteComponent
	]
})
export class InviteListComponent implements OnInit {
	page: number = 0;
	count: number = 0;
	temp: any[] = [];
	rows: any[] = [];
	payload: any = {
		offset: 0,
		page: 1,
		page_size: 10,
		search: "",
		ordering: "-created_on"
	};
	emptyMessage: string = "Fetching Data..."
	view!: number;
	@ViewChild(DatatableComponent, { static: false }) table!: DatatableComponent;
	public columns: TableColumn[] = [];
	@ViewChild('actionT', { static: false }) public actionT!: TemplateRef<any>;
	api!: string;

	constructor(private readonly route: ActivatedRoute, private readonly router: Router, private readonly ds: DataService, private readonly ms: NgbModal) { }

	ngOnInit(): void {
		if (!!this.route.snapshot.queryParams && this.route.snapshot.queryParams['view']) {
			this.view = +this.route.snapshot.queryParams['view'];
			this.createColumns();
		} else {
			this.openTab(this.view);
		}
	}

	getId(row: any) {
		return row.id;
	}

	getRowClass = (row: any) => {
		return {
			'dt-row-border': true
		};
	}

	openTab(tab: number): void {
		this.view = tab;
		const queryParams: Params = { view: this.view };
		const data: any = {
			relativeTo: this.route,
			queryParams: queryParams,
			queryParamsHandling: 'merge', // remove to replace all query params by provided
		};
		this.count = 0;
		this.temp = [];
		this.rows = [...this.temp];
		this.router.navigate([], data).then(() => {
			this.payload = {
				offset: 0,
				page: 1,
				page_size: 10,
				ordering: '-created_on'
			};
			this.createColumns();
		});
	}

	private createColumns(): void {
		this.api = this.view == 1 ? ApiRoutes.members : ApiRoutes.memberRequestToJoin;
		setTimeout(() => {
			const cellTemplate: any = {
				actions: this.actionT
			};
			this.columns = [];
			this.columns = columns(this.view, cellTemplate);
			this.getInviteList();
		});
	}

	private getInviteList(): void {
		this.ds.get(this.ds.formUrlParam(this.api, this.payload)).subscribe({
			next: (res) => {
				if (res.count) {
					this.count = res.count;
					this.temp = res.results;
					this.rows = [...this.temp];
				} else {
					this.count = 0;
					this.emptyMessage = "No data available"
				}
			},
			error: (err) => console.error(err),
			complete: () => { }
		});
	}

	onPageChange(page: number): void {
		this.payload.offset = page * 10;
		this.payload.page = page;
		this.getInviteList();
	}

	invite(): void {
		const ngbModalOptions: NgbModalOptions = {
			// backdrop: 'static',
			keyboard: false,
			size: 'lg',
			centered: true
		};
		const modalRef: NgbModalRef = this.ms.open(MemberInviteComponent, ngbModalOptions);
		modalRef.componentInstance.config = {
			title: "Invite",
			isCancelHidden: true
		};
	}

	filter(key: string, data: any): void {
		this.payload[key] = data;
		this.payload.page = 1;
		this.getInviteList();
	}

	action(flag: string, item: any): void {
		const ngbModalOptions: NgbModalOptions = {
			keyboard: false,
			size: 'md',
			centered: true
		};
		let key: string;
		if (this.view == 1) { key = 'status' } else { key = 'approval' }
		if (flag == 'view answers') {
			const modalRef: NgbModalRef = this.ms.open(InfoPopupComponent, ngbModalOptions);
			modalRef.componentInstance.data = {
				info: this.generateHtml(flag, item),
			};
		} else if (flag == 'revoke') {
			const modalRef: NgbModalRef = this.ms.open(InfoPopupComponent, ngbModalOptions);
			modalRef.componentInstance.data = {
				info: this.generateHtml(flag, item),
				btnContainerClass: "mb-4 d-grid m-auto",
				okBtn: "REVOKE",
				okBtnClass: "btn-success fw-bold f-x-small",
				cancelBtn: "CANCEL",
				cancelBtnClass: "btn-secondary-outline fw-bold f-x-small mb-2",
			};
			modalRef.closed.subscribe((data: any) => {
				if (data) {
					this.changeStatus(flag, item, { [key]: "Revoked" });
				}
			});
		} else if (flag == 'remind') {
			const modalRef: NgbModalRef = this.ms.open(InfoPopupComponent, ngbModalOptions);
			modalRef.componentInstance.data = {
				info: this.generateHtml(flag, item),
				btnContainerClass: "mb-4 d-grid m-auto",
				okBtn: "SEND AN EXTRA REMINDER",
				okBtnClass: "btn-success fw-bold f-x-small",
				cancelBtn: "STICK TO THIS SCHEDULE",
				cancelBtnClass: "btn-secondary-outline fw-bold f-x-small mb-2",
			};
			modalRef.closed.subscribe((data: any) => {
				if (data) {
					this.changeStatus(flag, item, { [key]: "Reminder Sent" });
				}
			});
		} else if (flag == 'approve') {
			this.changeStatus(flag, item, { role: 3, [key]: 'Approved' });
		} else if (flag == 'invite sent') {
			this.changeStatus(flag, item, { [key]: "Invite Sent" });
		}
	}

	private changeStatus(flag: string, item: any, payload: any): void {
		console.log(flag)
		let url: string;
		if (this.view == 1) {
			url = ApiRoutes.inviteStatus + item.id + "/status/"
		} else {
			url = ApiRoutes.memberRequestToJoinStatus + item.id + "/status/";
		}
		this.ds.post(url, payload).subscribe({
			next: (res) => {
				// console.log(res)
				if (res === "success") {
					this.getInviteList();
				}
			},
			error: (err) => console.log(err),
			complete: () => { }
		});
	}

	generateHtml(flag: string, item: any): string | void {
		if (flag == "view answers") {
			return `<div class=''>
				<h4 class='text-center mb-4'>${item.full_name}'s Responses</h4>
				<p class='mb-0 f-x-small fw-bold'>
					1. To receive access to the Joy Society community, you must 1st complete your membership purchase at joysociety.com. Did you complete your membership purchase on our Website?
				</p>
				<p class='f-x-small text-muted'>${item.membership_completion}</p>
				<p class='mb-0 f-x-small fw-bold'>
					2. If you completed your membership purchase, what is the email you used when you completed your purchase?
				</p>
				<p class='f-x-small text-muted'>${item.purchase_email}</p>
				<p class='mb-0 f-x-small fw-bold'>
					3. Were you invited to join through a Joy Society partner/group? If so, what is the name of the partner or group? If not, enter N/A.
				</p>
				<p class='f-x-small text-muted'>${item.invite_group_or_partner}</p>
			</div>`
		} else if (flag == "revoke") {
			return `<div class=''>
				<h4 class='text-center mb-4'>You're About To Revoke this ${this.view == 1 ? 'Invite' : 'Request'}</h4>
				<p class='mb-4 f-x-small'>
					If you revoke this invite, the link to join in the original invite will no longer work. They won't get an email saying their invite was revoked.
				</p>
			</div>`
		} else if (flag == "remind") {
			return `<div class=''>
				<h4 class='text-center mb-4'>We're Already Sending Some Reminders for You</h4>
				<p class='mb-4 f-x-small'>
					If a member hasn't accepted your invitation to join, we'll send them a reminder after 3, 10, and 30 days. If you'd like, you can send your own reminders in addition to these.
				</p>
			</div>`
		}
	}

	gotoProfile(item: any): void {
		this.router.navigate([APP_ROUTES.members, item.member_id]);
	}
}