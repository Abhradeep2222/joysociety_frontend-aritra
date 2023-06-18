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
	selector: 'app-workshop-view',
	templateUrl: './workshop-view.component.html',
	styleUrls: ['./workshop-view.component.scss']
})
export class WorkshopViewComponent implements OnInit {
	id!: string;
	workshopDetail!: any;
	view: number = 1;
	lessons: any[] = [];
	content: any[] = [];
	overview: any;

	payload: any = {
		page: 1,
		page_size: 10,
		search: "",
		ordering: "-created_on",
		workshop: null
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
		this.payload.workshop = this.id;
		this.openTab(1);
	}

	openTab(tab: number): void {
		this.view = tab;
		switch (this.view) {
			case 1:
				this.getWorkShop();
				this.getWorkShopContent();
				break;
			case 2:
				this.getPosts();
				break;
		}
	}

	private getWorkShop(): void {
		this.ds.get(ApiRoutes.workshops + `${this.id}/`).subscribe({
			next: (res: any) => {
				if (res.id) {
					this.workshopDetail = res;
				}
			},
			error: (err: any) => console.log(err),
			complete: () => { }
		});
	}

	private getWorkShopContent(): void {
		const queryPayload: any = {
			page: 1,
			page_size: 100,
			workshop_id: this.id
		}
		this.ds.get(this.ds.formUrlParam(ApiRoutes.workshopGetContent, queryPayload)).subscribe({
			next: (res: any) => {
				this.overview = res.results.find((i: any) => i.content_type == 'Overview');
				this.lessons = res.results.filter((i: any) => i.content_type == 'Lesson');
				this.content = res.results;
				console.log("overview", this.overview)
			},
			error: (err: any) => console.log(err),
			complete: () => { }
		})
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
			complete: () => {}
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
			complete: () => {}
		});
	}

	addContent(contentType: string, content: any = null): void {
		const ngbModalOptions: NgbModalOptions = {
			backdrop: 'static',
			keyboard: false,
			size: 'xl',
			centered: true
		};
		const modalRef: NgbModalRef = this.ms.open(ContentComponent, ngbModalOptions);
		modalRef.componentInstance.data = {
			form: this.generateContentForm(contentType, content),
			api: !!content ? ApiRoutes.workshopContent + `${content.id}/` : ApiRoutes.workshopAddContent,
			mode: !!content ? 'edit' : 'create',
			mediaType: 'Workshop'
		};
		modalRef.closed.subscribe((data: any) => {
			if (data) {
				this.getWorkShopContent();
			}
		});
	}

	deleteContent(contentType: string, content: any): void {
		const ngbModalOptions: NgbModalOptions = {
			keyboard: false,
			size: 'md',
			centered: true
		};
		const modalRef: NgbModalRef = this.ms.open(InfoPopupComponent, ngbModalOptions);
		modalRef.componentInstance.data = {
			info: `<div class="text-center"><img src="assets/img/delete-confirmation.png" width="70" height="70" class="mb-4">
			<h5>Do you want to permanently delete this ${contentType}?</h5>
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
				this.ds.delete(ApiRoutes.workshopContent + `${content.id}/`).subscribe({
					next: () => {
						this.getWorkShopContent();
					},
					error: (err: any) => this.spinner.hide(),
					complete: () => this.spinner.hide()
				})
			}
		});
	}

	generateContentForm(contentType: string, content: any): FormGroup {
		return new FormGroup({
			title: new FormControl(content?.title ? content?.title : '', [Validators.required]),
			detail: new FormControl(content?.detail ? content?.detail : ''),
			content_type: new FormControl(contentType, [Validators.required]),
			is_draft: new FormControl(false, [Validators.required]),
			workshop: new FormControl(this.id, [Validators.required]),
		}, { 'updateOn': 'change' });
	}

	emitter(data: boolean): void {
		if (data) {
			this.getPosts();
		}
	}

	// submitListener(e: any): void {

	// }
}