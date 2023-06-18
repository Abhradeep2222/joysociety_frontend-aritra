import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
// import * as moment from 'moment';

import { ApiRoutes } from '../../../../shared/routes/api.routes';
import { DataService } from '../../../../shared/services/data.service';
import { EventInviteComponent } from '../event-invite/event-invite.component';
// import { APP_ROUTES } from '../../../../shared/routes/app-routes';
// import { ToastService } from '../../../../shared/services/toastr.service';
// import { dateToObjDate, objToDateObj } from 'src/app/shared/utilities';

@Component({
	selector: 'app-event-detail',
	templateUrl: './event-detail.component.html',
	styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
	id!: string;
	eventDetail!: any;
	active: string = 'about';
	users: any[] = [];

	constructor(private ds: DataService, private readonly spinner: NgxSpinnerService, private readonly route: ActivatedRoute, private readonly ms: NgbModal) { }

	ngOnInit(): void {
		if (!!this.route.snapshot.params && this.route.snapshot.params['id']) {
			this.id = this.route.snapshot.params['id'];
			this.getEventDetail();
		}
	}

	getEventDetail(): void {
		this.ds.get(ApiRoutes.events +`${this.id}/`).subscribe({
			next: (res: any) => {
				if (!!res) {
					this.eventDetail = res;
					if (this.eventDetail.going) {
						this.getMemberList();
					}
				}
			},
			error: (err: any) => console.log(err),
			complete: () => {}
		})
	}

	private getMemberList(): void {
		this.ds.get(this.ds.formUrlParam(ApiRoutes.eventMemberList, {event_id: this.eventDetail.id, search: "GOING"})).subscribe({
			next: (res) => {
				this.users = res.results;
				console.log(this.users)
			},
			error: (err) => console.log(err),
			complete: () => {}
		});
	}

	joinEvent(): void {
		if (this.eventDetail.zoom_link) {
			window.open(this.eventDetail.zoom_link, '_blank');
		}
	}

	invite(): void {
		const ngbModalOptions: NgbModalOptions = {
			backdrop: 'static',
			keyboard: false,
			size: 'md',
			centered: true
		};
		const modalRef: NgbModalRef = this.ms.open(EventInviteComponent, ngbModalOptions);
		modalRef.componentInstance.data = this.eventDetail;
		modalRef.closed.subscribe((data: any) => {
			if (data) {
				this.getEventDetail();
			}
		});
	}

	openTab(tab: string): void {
		this.active = tab;
	}

	onAcceptChange(e: any): void {
		console.log(e.target.value);
		const payload: any = {
			event: this.eventDetail.id,
			status: e.target.value
		}
		this.ds.post(ApiRoutes.acceptInvite, payload).subscribe({
			next: (res) => {
				console.log(res);
				if (res == 'success') {
					this.getEventDetail();
				}
			},
			error: (err) => {
				console.log(err)
				this.spinner.hide();
			},
			complete: () => {}
		})
	}
}