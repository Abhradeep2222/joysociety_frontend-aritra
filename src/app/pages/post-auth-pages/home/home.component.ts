import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiRoutes } from 'src/app/shared/routes/api.routes';
import * as moment from 'moment';

import { DataService } from '../../../shared/services/data.service';
import { ToastService } from '../../../shared/services/toastr.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	
	payload: any = {
		page: 1,
		page_size: 5,
		search: "",
		ordering: "-created_on",
		topic:"test",
	};
	feeds: any[] = [];
	feedCount: number = 0;
	isLoading: boolean = true;
	paramValue = '';

	constructor(private readonly ds: DataService, private readonly sanitizer: DomSanitizer, private readonly toastr: ToastService,private readonly route : ActivatedRoute) { 
		this.route.params.subscribe(params => {
			this.paramValue =  params['topic']
		  });

		  this.payload.topic = this.paramValue;
	}

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
		this.getPosts();
		
	}

	emitter(data: boolean): void {
 		if (data) {
			this.getPosts();
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
		this.submitAnswer(e);
	}

	private submitAnswer(e: any): void {
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
}