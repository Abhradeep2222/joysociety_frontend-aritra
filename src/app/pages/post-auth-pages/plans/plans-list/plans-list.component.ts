import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatatableComponent, TableColumn } from '@swimlane/ngx-datatable';
import { NgxSpinnerService } from 'ngx-spinner';

import { columns } from "../plans.config";
import { DataService } from '../../../../shared/services/data.service';
import { ApiRoutes } from '../../../../shared/routes/api.routes';
import { APP_ROUTES } from 'src/app/shared/routes/app-routes';

@Component({
	selector: 'app-plans-list',
	templateUrl: './plans-list.component.html',
	styleUrls: ['./plans-list.component.scss']
})

export class PlansListComponent implements OnInit {
	routes: any = APP_ROUTES;
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
	emptyMessage: string = "Fetching Data...";
	@ViewChild(DatatableComponent, { static: false }) table!: DatatableComponent;
	public columns: TableColumn[] = [];
	@ViewChild('actionT', { static: false }) public actionT!: TemplateRef<any>;
	@ViewChild('statusT', { static: false }) public statusT!: TemplateRef<any>;

	constructor(private readonly route: ActivatedRoute, private readonly router: Router, private readonly ds: DataService, private readonly spinner: NgxSpinnerService) { }

	ngOnInit(): void {
		this.createColumns();
	}

	getRowClass = (row: any) => {
		return {
			'dt-row-border': true
		};
	}

	getId(row: any) {
		return row.id;
	}

	private createColumns(): void {
		setTimeout(() => {
			const cellTemplate: any = {
				status: this.statusT,
				actions: this.actionT
			};
			this.columns = [];
			this.columns = columns(cellTemplate);
			this.getPlansList();
		});
	}

	private getPlansList(): void {
		this.ds.get(this.ds.formUrlParam(ApiRoutes.plans, this.payload)).subscribe({
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
		this.getPlansList();
	}

	filter(key: string, data: any): void {
		this.payload[key] = data;
		this.payload.page = 1;
		this.getPlansList();
	}

	action(action: string, data: any): void {
		if (action === 'edit') {
			this.router.navigate([APP_ROUTES.plans, data.id]);
		} else if (action === 'disable') {
			this.spinner.show();
			this.ds.patch(`${ApiRoutes.planDisable + data.id}/`, { is_active: false }).subscribe({
				next: (res: any) => {
					if (!!res && res.is_active == false) {
						this.temp.find(i => i.id == data.id).is_active = res.is_active;
						this.rows = [...this.temp];
					}
					this.spinner.hide();
				},
				error: (err: any) => {
					console.log(err)
					this.spinner.hide();
				},
				complete: () => { }
			});
		} else if (action === 'activate') {
			this.ds.put(`${ApiRoutes.plans + data.id}/`, this.getActivatePayload(data)).subscribe({
				next: (res: any) => {
					if (!!res && res.is_active == true) {
						const index: number = this.temp.findIndex(i => i.id == data.id);
						this.temp[index].is_active = res.is_active;
						this.temp[index].is_draft = res.is_draft;
						this.rows = [...this.temp];
					}
					this.spinner.hide();
				},
				error: (err: any) => {
					console.log(err)
					this.spinner.hide();
				},
				complete: () => { }
			});
		}
	}

	private getActivatePayload(plan: any): FormData {
		const formData: any = new FormData();
		formData.append("name", plan.name);
		formData.append("internal_note", plan.internal_note);
		// formData.append("image", plan.image);
		formData.append("sales_pitch", plan.sales_pitch);
		formData.append("benefits", plan.benefits);
		formData.append("description", plan.description);
		formData.append("is_active", true);
		formData.append("is_draft", false);
		formData.append("display_price", plan.display_price);
		formData.append("discount", plan.discount);
		formData.append("offer_price", plan.offer_price);
		formData.append("payment_type", plan.payment_type);
		if (plan.payment_type == 'CUSTOM') {
			formData.append("days", plan.days);
		}
		return formData;
	}
}
