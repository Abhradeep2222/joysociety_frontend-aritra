import { Component, OnInit } from '@angular/core';

import { ApiRoutes } from '../../../../shared/routes/api.routes';
import { APP_ROUTES } from '../../../../shared/routes/app-routes';
import { DataService } from '../../../../shared/services/data.service';

@Component({
	selector: 'app-workshop-order',
	templateUrl: './workshop-order.component.html',
	styleUrls: ['./workshop-order.component.scss']
})
export class WorkshopOrderComponent implements OnInit {
	routes: any = APP_ROUTES;
	workshops: any[] = [];
	isLoading: boolean = true;
	payload: any = {
		page: 1,
		page_size: 25,
		search: "",
		ordering: "-created_on",
	};
	count: number = 0;
	dragItem: any;
	dropItem: any;

	constructor(private readonly ds: DataService) { }

	ngOnInit(): void {
		this.getWorkShops();
	}

	scroll(e: any): void {
		if (e.target.scrollHeight <= e.target.scrollTop + e.target.offsetHeight) {
			if (this.workshops.length + 1 < this.count && !this.isLoading) {
				this.payload.page++;
				this.isLoading = true;
				this.getWorkShops();
			}
		}
	}

	private getWorkShops(): void {
		this.isLoading = true;
		this.ds.get(this.ds.formUrlParam(ApiRoutes.workshops, this.payload)).subscribe({
			next: (res: any) => {
				this.count = res.count;
				if (res.count) {
					this.workshops = [...this.workshops, ...res.results];
				}
			},
			error: (err) => console.error(err),
			complete: () => { this.isLoading = false }
		});
	}

	allowDrop(ev: any): void {
		ev.preventDefault();
	}

	drag(ev: any, item: any, index: number): void {
		this.dragItem = { id: item.id, order: index };
		console.log(window.pageYOffset);
		// ev.dataTransfer.setData("text", ev.target.id);
	}

	drop(ev: any, item: any, index: number): void {
		ev.preventDefault();
		this.dropItem = { id: item.id, order: index };
		if (this.dragItem.id == this.dropItem.id) {
			return;
		}
		const arr: any[] = [
			{ id: this.dragItem.id, order: this.dropItem.order },
			{ id: this.dropItem.id, order: this.dragItem.order },
		];
		this.swap(this.dragItem.order - 1, this.dropItem.order - 1);
		this.ds.post(ApiRoutes.reorderWorkshop, arr).subscribe({
			next: (res: any) => {
				console.log(res);
				if (res.length) { }
			},
			error: (err: any) => console.log(err),
			complete: () => { }
		});
		// var data = ev.dataTransfer.getData("text");
		// ev.target.appendChild(document.getElementById(data));
	}

	private swap(x: number, y: number): void {
		const b = this.workshops[y];
		this.workshops[y] = this.workshops[x];
		this.workshops[x] = b;
	}
}