import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatatableComponent, TableColumn } from '@swimlane/ngx-datatable';
import { NgxSpinnerService } from 'ngx-spinner';

import { DataService } from '../../../shared/services/data.service';
import { ApiRoutes } from '../../../shared/routes/api.routes';
import { APP_ROUTES } from '../../../shared/routes/app-routes';

@Component({
	selector: 'app-subscriptions',
	templateUrl: './subscriptions.component.html',
	styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {
	plans: any[] = [];
	isLoading: boolean = true;
	payload: any = {
		page: 1,
		page_size: 6,
		search: "",
		ordering: "-created_on",
		is_active: true
	};
	collectionSize!: number;

	constructor(private readonly route: ActivatedRoute, private readonly router: Router, private readonly ds: DataService, private readonly spinner: NgxSpinnerService) { }

	ngOnInit(): void {
		this.getPlans();
	}


	private getPlans(): void {
		this.isLoading = true;
		this.plans = [];
		this.ds.get(this.ds.formUrlParam(ApiRoutes.plans, this.payload)).subscribe({
			next: (res: any) => {
				this.collectionSize = res.count;
				if (res.count) {
					res.results = res.results.map((i: any) => {
						i.benefits = i.benefits.split(",");
						return i;
					})
					this.plans = res.results;
				}
			},
			error: (err) => console.error(err),
			complete: () => { this.isLoading = false }
		});
	}

	pageChange(page: number): void {
		this.payload.page = page;
		this.getPlans();
	}

	filter(key: string, data: any): void {
		this.payload[key] = data;
		this.payload.page = 1;
		this.getPlans();
	}

	buyPlan(plan: any): void {
		this.spinner.show();
		this.ds.post(ApiRoutes.subscribe, {product_id: plan.id}).subscribe({
			next: (res: any) => {
				if (!!res && res.data) {
					window.open(res.data, "_blank");
				}
				this.spinner.hide();
			},
			error: (err) => {
				console.error(err)
				this.spinner.hide();
			},
			complete: () => {}
		})
	}
}