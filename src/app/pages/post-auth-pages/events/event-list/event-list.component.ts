import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';

import { InfoPopupComponent } from '../../../../shared/components/popups/info-popup/info-popup.component';
import { ApiRoutes } from '../../../../shared/routes/api.routes';
import { APP_ROUTES } from '../../../../shared/routes/app-routes';
import { DataService } from '../../../../shared/services/data.service';

@Component({
	selector: 'app-event-list',
	templateUrl: './event-list.component.html',
	styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
	routes: any = APP_ROUTES;
	events: any[] = [];
	isLoading: boolean = true;
	payload: any = {
		page: 1,
		page_size: 10,
		search: "",
		ordering: "-created_on",
		event_type: 0
	};
	collectionSize!: number;
	eventTypes: any[] = [
		{ id: 0, label: 'All events' },
		{ id: 1, label: 'Upcoming' },
		{ id: 2, label: 'Past' },
		{ id: 3, label: 'Yours' },
	];

	constructor(private readonly ds: DataService, private readonly router: Router, private readonly ms: NgbModal, private readonly spinner: NgxSpinnerService) { }

	ngOnInit(): void {
		this.getEvents();
	}

	private getEvents(): void {
		this.isLoading = true;
		this.events = [];
		this.ds.get(this.ds.formUrlParam(ApiRoutes.events, this.payload)).subscribe({
			next: (res: any) => {
				this.collectionSize = res.count;
				if (res.count) {
					res.results = res.results.map((i: any) => {
						if (moment(i.start_datetime).isSame(Date.now(), 'day')) {
							i.isToday = true;
						}
						return i;
					});
					this.events = res.results;
				}
			},
			error: (err) => console.error(err),
			complete: () => { this.isLoading = false }
		});
	}

	pageChange(page: number): void {
		this.payload.page = page;
		this.getEvents();
	}

	filter(key: string, data: any): void {
		this.payload[key] = data;
		this.payload.page = 1;
		this.getEvents();
	}

	action(flag: string, item: any): void {
		if (flag == 'delete') {
			const ngbModalOptions: NgbModalOptions = {
				keyboard: false,
				size: 'md',
				centered: true
			};
			const modalRef: NgbModalRef = this.ms.open(InfoPopupComponent, ngbModalOptions);
			modalRef.componentInstance.data = {
				info: `<div class="text-center"><img src="assets/img/delete-confirmation.png" width="70" height="70" class="mb-4">
				<h5>Do you want to permanently delete this Event?</h5>
				</div>`,
				btnContainerClass: "d-flex gap-4",
				okBtn: "Yes",
				okBtnClass: "btn-success fw-bold f-x-small w-50",
				cancelBtn: "No",
				cancelBtnClass: "btn-secondary-outline fw-bold f-x-small w-50",
			};
			modalRef.closed.subscribe((data: any) => {
				if (data) {
					this.spinner.show();
					this.ds.delete(ApiRoutes.events + `${item.id}/`).subscribe({
						next: () => {
							this.getEvents();
						},
						error: (err: any) => this.spinner.hide(),
						complete: () => this.spinner.hide()
					})
				}
			});
		} else if (flag == 'edit') {
			this.router.navigate([APP_ROUTES.events, item.id]);
		} else if (flag == 'duplicate') {
			this.router.navigate([APP_ROUTES.events, item.id], { queryParams: { duplicate: true } });
		} else if (flag == 'view') {
			this.router.navigate([APP_ROUTES.eventDetail, item.id]);
		}
	}

	joinEvent(item: any): void {
		window.open(item.zoom_link, '_blank');
	}
}