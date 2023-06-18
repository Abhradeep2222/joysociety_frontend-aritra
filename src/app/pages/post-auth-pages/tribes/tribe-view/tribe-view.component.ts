import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ApiRoutes } from '../../../../shared/routes/api.routes';
import { DataService } from '../../../../shared/services/data.service';
// import { APP_ROUTES } from '../../../../shared/routes/app-routes';
import { ToastService } from '../../../../shared/services/toastr.service';
import { ContentComponent } from "../../../../shared/modules/post/content/content.component";
import { InfoPopupComponent } from 'src/app/shared/components/popups/info-popup/info-popup.component';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';

@Component({
	selector: 'app-tribe-view',
	templateUrl: './tribe-view.component.html',
	styleUrls: ['./tribe-view.component.scss']
})
export class TribeViewComponent implements OnInit {
	id!: string;
	tribeDetail!: any;
	view: number = 1;
	payload: any = {
		page: 1,
		page_size: 10,
		search: "",
		ordering: "-created_on",
		tribe: null
	};
	feeds: any[] = [];
	feedCount: number = 0;
	isLoading: boolean = true;

	constructor(private readonly toastr: ToastService, private readonly sanitizer: DomSanitizer, private readonly ds: DataService, private readonly route: ActivatedRoute, private readonly ms: NgbModal, private readonly spinner: NgxSpinnerService) { }

	@HostListener('window:scroll', ['$event'])
	onWindowScroll(e: any) {
		const pos: number = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
		const max: number = document.documentElement.scrollHeight;
		if (pos == max) {
			if (this.feeds.length < this.feedCount && !this.isLoading) {
				this.payload.page++;
				this.isLoading = true;
				this.getPosts(true);
			}
		}
	}

	ngOnInit(): void {
		this.id = this.route.snapshot.params['id'];
		this.payload.tribe = this.id;
		this.getTribeDetail();
	}

	private getTribeDetail(): void {
		this.ds.get(ApiRoutes.tribe + `${this.id}/`).subscribe({
			next: (res: any) => {
				if (!!res) {
					this.tribeDetail = res;
					this.openTab(1);
				}
			},
			error: (err: any) => console.log(err),
			complete: () => { }
		});
	}

	openTab(tab: number): void {
		this.view = tab;
		switch (this.view) {
			case 1:
				this.getPosts();
				break;
			// case 2:
			// 	break;
		}
	}

	private getPosts(pagination: boolean = false): void {
		this.isLoading = true;
		this.ds.get(this.ds.formUrlParam(ApiRoutes.timeLine, this.payload)).subscribe({
			next: (res: any) => {
				this.feedCount = res.count;
				if (res.count) {
					res.results = res.results.map((i: any) => {
						i.content.post = this.sanitizer.bypassSecurityTrustHtml(i.content.post);
						i['posted_on'] = moment(i.created_on).fromNow();
						return i;
					});
					if (pagination) {
						this.feeds = [...this.feeds, ...res.results];
					} else {
						this.feeds = res.results;
					}
				}
			},
			error: (err: any) => console.log(err),
			complete: () => this.isLoading = false
		});
	}

	answerListener(e: any): void {
		const payload: any = {
			question: e.data.content.id,
			answer: e.answer,
		};
		this.ds.post(ApiRoutes.answerPoll, payload).subscribe({
			next: (res) => {
				if (!!res && res.id) {
					this.updatePost(e);
					this.toastr.success("Answer submitted successfully!", "Success");
				}
			},
			error: (err: any) => console.log(err),
			complete: () => { }
		});
	}

	private updatePost(data: any): void {
		console.log(data.data.id);
		this.ds.get(`${ApiRoutes.timeLine + data.data.id + '/'}`).subscribe({
			next: (res) => {
				console.log("updated", res);
				res['posted_on'] = moment(res.created_on).fromNow();
				const index: number = this.feeds.findIndex(i => i.id == data.data.id);
				if (index > -1) {
					this.feeds[index] = res;
				}
			},
			error: (err) => console.log(err),
			complete: () => { }
		});
	}

	emitter(data: boolean): void {
		if (data) {
			this.getPosts();
		}
	}
}