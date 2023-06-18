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
	selector: 'app-tribe-list',
	templateUrl: './tribe-list.component.html',
	styleUrls: ['./tribe-list.component.scss']
})
export class TribeListComponent implements OnInit {
	routes: any = APP_ROUTES;
	tribes: any[] = [];
	isLoading: boolean = true;
	payload: any = {
		page: 1,
		page_size: 10,
		// search: "",
		ordering: "-created_on",
	};
	collectionSize!: number;

	constructor(private readonly ds: DataService, private readonly router: Router, private readonly ms: NgbModal, private readonly spinner: NgxSpinnerService) { }

	ngOnInit(): void {
		this.getTribes();
	}

	private getTribes(): void {
		this.isLoading = true;
		this.tribes = [];
		this.ds.get(this.ds.formUrlParam(ApiRoutes.tribe, this.payload)).subscribe({
			next: (res: any) => {
				this.collectionSize = res.count;
				if (res.count) {
					res.results = res.results.map((i: any) => {
						if (i.description.length > 50) {
							i.description = i?.description.substring(0, 50) + '...';
						}
						return i;
					});
					this.tribes = res.results;
				}
			},
			error: (err) => console.error(err),
			complete: () => { this.isLoading = false }
		});
	}

	pageChange(page: number): void {
		this.payload.page = page;
		this.getTribes();
	}

	filter(key: string, data: any): void {
		this.payload[key] = data;
		this.payload.page = 1;
		this.getTribes();
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
				<h5>Do you want to permanently delete this Tribe?</h5>
				<p>When you delete this Tribe, you're also deleting all content and posts within it. Members will no longer have access to this Tribe and it will be permanently deleted. This action cannot be reversed.</p>
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
					this.ds.delete(ApiRoutes.tribe + `${item.id}/`).subscribe({
						next: () => {
							this.getTribes();
						},
						error: (err: any) => this.spinner.hide(),
						complete: () => this.spinner.hide()
					})
				}
			});
		} else if (flag == 'edit') {
			this.router.navigate([APP_ROUTES.tribes, item.id]);
		} else if (flag == 'view') {
			this.router.navigate([`${APP_ROUTES.tribes}/detail/`, item.id]);
		}
	}
}
